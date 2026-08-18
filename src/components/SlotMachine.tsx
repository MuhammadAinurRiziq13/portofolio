import { useState, useRef, useEffect, useCallback } from "react";

// ── Symbols ──────────────────────────────────────────────────
interface SlotSymbol {
  emoji: string;
  name: string;
  value4: number; // multiplier for 4-of-a-kind on a payline
  value3: number; // multiplier for 3-of-a-kind (first 3 reels)
  weight: number; // relative spawn weight (lower = rarer)
}

const SYMBOLS: SlotSymbol[] = [
  { emoji: "💎", name: "Diamond", value4: 500, value3: 100, weight: 1 },
  { emoji: "⭐", name: "Star",    value4: 200, value3: 50,  weight: 2 },
  { emoji: "🔔", name: "Bell",   value4: 100, value3: 25,  weight: 3 },
  { emoji: "🍒", name: "Cherry", value4: 50,  value3: 10,  weight: 5 },
  { emoji: "🍋", name: "Lemon",  value4: 30,  value3: 7,   weight: 7 },
  { emoji: "🍇", name: "Grape",  value4: 20,  value3: 5,   weight: 8 },
  { emoji: "🍊", name: "Orange", value4: 15,  value3: 3,   weight: 9 },
  { emoji: "🃏", name: "Wild",   value4: 0,   value3: 0,   weight: 2 },
];
const WILD = "🃏";

// Weighted random pick
const weightedRandom = (): string => {
  const total = SYMBOLS.reduce((s, sym) => s + sym.weight, 0);
  let r = Math.random() * total;
  for (const sym of SYMBOLS) {
    r -= sym.weight;
    if (r <= 0) return sym.emoji;
  }
  return SYMBOLS[SYMBOLS.length - 2].emoji;
};

// Build a long strip for each reel (emoji repeated many times)
const buildStrip = () => {
  const arr: string[] = [];
  for (let i = 0; i < 32; i++) arr.push(weightedRandom());
  return arr;
};

const ROWS        = 3;
const COLS        = 4;
const CELL_H      = 80;   // px per cell

const INITIAL_COINS = 200;
const BET_OPTIONS   = [10, 25, 50, 100];

// ── Payline definitions (row indices per col, length 4) ──────
// Row index: 0=top, 1=mid, 2=bot
const PAYLINES = [
  { id: 0, label: "Middle",        rows: [1, 1, 1, 1], color: "#f59e0b" },
  { id: 1, label: "Top",           rows: [0, 0, 0, 0], color: "#22d3ee" },
  { id: 2, label: "Bottom",        rows: [2, 2, 2, 2], color: "#a78bfa" },
  { id: 3, label: "Diagonal ↘",   rows: [0, 1, 2, 2], color: "#fb7185" },
  { id: 4, label: "Diagonal ↗",   rows: [2, 1, 0, 0], color: "#34d399" },
];

// ── Sound helpers (Web Audio API) ────────────────────────────
const getAudioCtx = (() => {
  let ctx: AudioContext | null = null;
  return () => {
    if (!ctx) ctx = new AudioContext();
    return ctx;
  };
})();

const playBeep = (freq: number, duration: number, vol = 0.15, type: OscillatorType = "square") => {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(); osc.stop(ctx.currentTime + duration);
  } catch { /* AudioContext blocked — silent fallback */ }
};

const playSpinSound  = () => playBeep(180, 0.08, 0.1, "sawtooth");
const playStopSound  = () => playBeep(440, 0.12, 0.15, "sine");
const playWinSound   = () => { playBeep(660, 0.15, 0.2, "sine"); setTimeout(() => playBeep(880, 0.2, 0.2, "sine"), 160); };
const playJackpotSnd = () => {
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playBeep(f, 0.25, 0.25, "sine"), i * 120));
};

// ── Reel Component ───────────────────────────────────────────
interface ReelProps {
  reelIdx: number;
  finalRows: string[]; // [top, mid, bot]
  isSpinning: boolean;
  winningRows: Set<number>; // row indices that are part of a winning payline
  paylineColors: Record<number, string>; // rowIdx → color
  speed: "slow" | "normal" | "fast";
}

const Reel = ({ reelIdx, finalRows, isSpinning, winningRows, paylineColors, speed }: ReelProps) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef<number>(0);
  const stripSymbols = useRef<string[]>(buildStrip());

  const SPEEDS: Record<string, number> = { slow: 8, normal: 14, fast: 22 };
  const SCROLL_SPEED = SPEEDS[speed] ?? 14;

  // Fast spinning animation
  useEffect(() => {
    if (!isSpinning) return;
    const LOOP = stripSymbols.current.length * CELL_H;
    const id = setInterval(() => {
      posRef.current -= SCROLL_SPEED;
      if (posRef.current < -LOOP * 0.75) posRef.current += LOOP * 0.5;
      if (stripRef.current) {
        stripRef.current.style.transition = "none";
        stripRef.current.style.transform  = `translateY(${posRef.current}px)`;
      }
    }, 16);
    return () => clearInterval(id);
  }, [isSpinning, SCROLL_SPEED]);

  // Snap to final position when stopped
  useEffect(() => {
    if (isSpinning) return;
    // We need to place finalRows[0]=top, [1]=mid, [2]=bot in view
    // Put them at the start of the strip and snap translateY to 0
    if (stripRef.current) {
      // Override first 5 cells with: ..., finalRows[0], finalRows[1], finalRows[2], ...
      // We'll snap so that cell index 1,2,3 are in view
      const targetY = -CELL_H; // show cells 1, 2, 3 (0-indexed)
      stripRef.current.style.transition = `transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)`;
      stripRef.current.style.transform  = `translateY(${targetY}px)`;
      posRef.current = targetY;
    }
  }, [isSpinning, finalRows]);

  // Build display strip: pad → top → mid → bot → pad
  const displayStrip = isSpinning
    ? stripSymbols.current
    : ["🎰", ...finalRows, "🎰", ...finalRows, "🎰"];

  return (
    <div className="cs-reel-window" style={{ animationDelay: `${reelIdx * 0.05}s` }}>
      <div ref={stripRef} className="cs-reel-strip" style={{ transform: isSpinning ? undefined : `translateY(-${CELL_H}px)` }}>
        {displayStrip.map((sym, i) => (
          <div key={i} className="cs-reel-cell">{sym}</div>
        ))}
      </div>
      {/* Row highlight overlays */}
      {[0, 1, 2].map(rowIdx => {
        const isWin = winningRows.has(rowIdx);
        const color = paylineColors[rowIdx];
        return (
          <div
            key={rowIdx}
            className={`cs-row-highlight${isWin ? " cs-row-highlight--win" : ""}`}
            style={{
              top: rowIdx * CELL_H,
              borderColor: isWin ? color : "transparent",
              boxShadow: isWin ? `0 0 12px ${color}88` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

// ── Win evaluation ────────────────────────────────────────────
interface WinResult {
  paylineId: number;
  label: string;
  color: string;
  symbols: string[];
  multiplier: number;
  coins: number;
  matchLen: number; // 3 or 4
}

const evaluatePaylines = (grid: string[][], bet: number): WinResult[] => {
  // grid[colIdx][rowIdx]
  const results: WinResult[] = [];
  for (const pl of PAYLINES) {
    const line = pl.rows.map((row, col) => grid[col]?.[row] ?? "");
    // Check 4-of-a-kind (with wilds)
    const nonWild = line.filter(s => s !== WILD);
    const base = nonWild[0];
    if (!base) continue;
    const sym = SYMBOLS.find(s => s.emoji === base);
    if (!sym) continue;
    const allMatch4 = line.every(s => s === base || s === WILD);
    const allMatch3 = line.slice(0, 3).every(s => s === base || s === WILD);
    if (allMatch4) {
      results.push({ paylineId: pl.id, label: pl.label, color: pl.color, symbols: line, multiplier: sym.value4, coins: sym.value4 * bet, matchLen: 4 });
    } else if (allMatch3) {
      results.push({ paylineId: pl.id, label: pl.label, color: pl.color, symbols: line.slice(0, 3), multiplier: sym.value3, coins: sym.value3 * bet, matchLen: 3 });
    }
  }
  return results;
};

// ── Main Component ────────────────────────────────────────────
const SlotMachine = () => {
  // grid[colIdx][rowIdx] — 4 cols × 3 rows
  const initGrid = (): string[][] => Array.from({ length: COLS }, () => ["🍒", "🍋", "🍇"]);
  const [grid,         setGrid]         = useState<string[][]>(initGrid);
  const [spinningCols, setSpinningCols] = useState<boolean[]>(Array(COLS).fill(false));
  const [coins,        setCoins]        = useState(INITIAL_COINS);
  const [bet,          setBet]          = useState(10);
  const [isSpinning,   setIsSpinning]   = useState(false);
  const [wins,         setWins]         = useState<WinResult[]>([]);
  const [totalWin,     setTotalWin]     = useState<number | null>(null);
  const [showBigWin,   setShowBigWin]   = useState(false);
  const [soundOn,      setSoundOn]      = useState(true);
  const [speed,        setSpeed]        = useState<"slow" | "normal" | "fast">("normal");
  const [showSettings, setShowSettings] = useState(false);
  const [autoSpin,     setAutoSpin]     = useState(false);
  const autoRef = useRef(false);

  const sound = useCallback((fn: () => void) => { if (soundOn) fn(); }, [soundOn]);

  // Derive which row indices per col are "winning" for highlight
  const winColRows: Record<number, { rows: Set<number>; colors: Record<number, string> }> = {};
  wins.forEach(w => {
    const pl = PAYLINES.find(p => p.id === w.paylineId)!;
    pl.rows.forEach((row, col) => {
      if (!winColRows[col]) winColRows[col] = { rows: new Set(), colors: {} };
      winColRows[col].rows.add(row);
      winColRows[col].colors[row] = w.color;
    });
  });

  const spin = useCallback(() => {
    if (isSpinning || coins < bet) return;
    setIsSpinning(true);
    setWins([]);
    setTotalWin(null);
    setShowBigWin(false);
    setCoins(c => c - bet);

    const newGrid: string[][] = Array.from({ length: COLS }, () =>
      Array.from({ length: ROWS }, () => weightedRandom())
    );

    // Start all reels
    setSpinningCols(Array(COLS).fill(true));
    sound(playSpinSound);

    const DELAYS: Record<string, number[]> = {
      slow:   [1200, 1800, 2400, 3000],
      normal: [800,  1300, 1800, 2300],
      fast:   [500,  800,  1100, 1400],
    };
    const delays = DELAYS[speed];

    // Stop reels one by one
    delays.forEach((delay, colIdx) => {
      setTimeout(() => {
        setSpinningCols(prev => { const next = [...prev]; next[colIdx] = false; return next; });
        setGrid(prev => { const next = [...prev]; next[colIdx] = newGrid[colIdx]; return next; });
        sound(playStopSound);

        // After last reel stops
        if (colIdx === COLS - 1) {
          setTimeout(() => {
            const winResults = evaluatePaylines(newGrid, bet);
            const total = winResults.reduce((s, w) => s + w.coins, 0);
            setWins(winResults);
            setTotalWin(total > 0 ? total : null);
            if (total > 0) {
              setCoins(c => c + total);
              sound(total >= bet * 50 ? playJackpotSnd : playWinSound);
              if (total >= bet * 50) setShowBigWin(true);
            }
            setIsSpinning(false);
          }, 300);
        }
      }, delay);
    });
  }, [isSpinning, coins, bet, speed, sound]);

  // Auto-spin loop
  useEffect(() => {
    autoRef.current = autoSpin;
  }, [autoSpin]);

  useEffect(() => {
    if (!isSpinning && autoRef.current && coins >= bet) {
      const t = setTimeout(() => { if (autoRef.current) spin(); }, 600);
      return () => clearTimeout(t);
    }
    if (coins < bet && autoRef.current) setAutoSpin(false);
  }, [isSpinning, coins, bet, spin]);

  const reset = () => {
    setCoins(INITIAL_COINS);
    setWins([]);
    setTotalWin(null);
    setShowBigWin(false);
    setAutoSpin(false);
    setGrid(initGrid());
    setSpinningCols(Array(COLS).fill(false));
  };

  return (
    <div className="cs-wrapper">
      {/* Big Win Overlay */}
      {showBigWin && (
        <div className="cs-bigwin-overlay" onClick={() => setShowBigWin(false)}>
          <div className="cs-bigwin-banner">
            <div className="cs-bigwin-emoji">🎉</div>
            <div className="cs-bigwin-text">BIG WIN!</div>
            <div className="cs-bigwin-amount">+{totalWin} coins</div>
            <div className="cs-bigwin-sub">Click anywhere to continue</div>
          </div>
        </div>
      )}

      <div className="cs-layout">
        {/* ── Left: Machine ── */}
        <div className="cs-machine">
          {/* Header */}
          <div className="cs-marquee">🎰 CASINO SLOTS 🎰</div>

          <div className="cs-body">
            {/* HUD */}
            <div className="cs-hud">
              <div className="cs-hud-item">
                <span className="cs-hud-label">COINS</span>
                <span className="cs-hud-value" style={{ color: "var(--accent-yellow)" }}>💰 {coins}</span>
              </div>
              <div className="cs-hud-item">
                <span className="cs-hud-label">BET</span>
                <span className="cs-hud-value" style={{ color: "var(--accent-cyan)" }}>🎲 {bet}</span>
              </div>
              <div className="cs-hud-item">
                <span className="cs-hud-label">WIN</span>
                <span className="cs-hud-value" style={{ color: "var(--accent-green, #34d399)" }}>
                  {totalWin !== null ? `+${totalWin}` : "—"}
                </span>
              </div>
            </div>

            {/* Payline indicators (left side labels) */}
            <div className="cs-grid-area">
              <div className="cs-payline-labels">
                {PAYLINES.map(pl => (
                  <div key={pl.id} className="cs-pl-dot" style={{ background: pl.color }} title={pl.label} />
                ))}
              </div>

              {/* Reel Grid */}
              <div className="cs-reels">
                {Array.from({ length: COLS }, (_, colIdx) => (
                  <Reel
                    key={colIdx}
                    reelIdx={colIdx}
                    finalRows={grid[colIdx]}
                    isSpinning={spinningCols[colIdx]}
                    winningRows={winColRows[colIdx]?.rows ?? new Set()}
                    paylineColors={winColRows[colIdx]?.colors ?? {}}
                    speed={speed}
                  />
                ))}
              </div>
            </div>

            {/* Win lines display */}
            <div className="cs-win-lines">
              {wins.length > 0
                ? wins.map(w => (
                    <div key={w.paylineId} className="cs-win-line" style={{ borderColor: w.color }}>
                      <span style={{ color: w.color }}>{w.label}</span>
                      <span className="cs-win-symbols">{w.symbols.join(" ")}</span>
                      <span className="cs-win-coins">+{w.coins}</span>
                    </div>
                  ))
                : <div className="cs-win-empty">{isSpinning ? "⏳ Spinning..." : totalWin === null ? "Good luck! 🍀" : "😭 No match"}</div>
              }
            </div>

            {/* Spin & Auto */}
            <div className="cs-btn-row">
              <button
                className="cs-spin-btn"
                onClick={spin}
                disabled={isSpinning || coins < bet}
              >
                {isSpinning ? "⏳" : "🎰 SPIN"}
              </button>
              <button
                className={`cs-auto-btn${autoSpin ? " cs-auto-btn--on" : ""}`}
                onClick={() => setAutoSpin(a => !a)}
                disabled={coins < bet}
                title="Auto spin"
              >
                {autoSpin ? "⏹ Stop" : "▶▶ Auto"}
              </button>
            </div>

            {coins < bet && (
              <button className="cs-reset-btn" onClick={reset}>🔄 Reset Coins</button>
            )}

            {/* Settings toggle */}
            <button className="cs-settings-toggle" onClick={() => setShowSettings(s => !s)}>
              ⚙️ Settings {showSettings ? "▲" : "▼"}
            </button>

            {showSettings && (
              <div className="cs-settings">
                <div className="cs-setting-row">
                  <span className="cs-setting-label">🎲 Bet</span>
                  <div className="cs-setting-opts">
                    {BET_OPTIONS.map(b => (
                      <button
                        key={b}
                        className={`cs-opt-btn${bet === b ? " cs-opt-btn--active" : ""}`}
                        onClick={() => setBet(b)}
                        disabled={isSpinning}
                      >{b}</button>
                    ))}
                  </div>
                </div>
                <div className="cs-setting-row">
                  <span className="cs-setting-label">⚡ Speed</span>
                  <div className="cs-setting-opts">
                    {(["slow", "normal", "fast"] as const).map(s => (
                      <button
                        key={s}
                        className={`cs-opt-btn${speed === s ? " cs-opt-btn--active" : ""}`}
                        onClick={() => setSpeed(s)}
                        disabled={isSpinning}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <div className="cs-setting-row">
                  <span className="cs-setting-label">🔊 Sound</span>
                  <div className="cs-setting-opts">
                    <button
                      className={`cs-opt-btn${soundOn ? " cs-opt-btn--active" : ""}`}
                      onClick={() => setSoundOn(s => !s)}
                    >{soundOn ? "ON" : "OFF"}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cs-base" />
        </div>

        {/* ── Right: Paytable + Paylines ── */}
        <div className="cs-sidebar">
          <div className="cs-panel">
            <p className="cs-panel-title">💎 Paytable</p>
            <table className="cs-paytable">
              <thead>
                <tr><th>Symbol</th><th>×3</th><th>×4</th></tr>
              </thead>
              <tbody>
                {SYMBOLS.filter(s => s.name !== "Wild").map(sym => (
                  <tr key={sym.emoji}>
                    <td>{sym.emoji} {sym.name}</td>
                    <td>{sym.value3}×</td>
                    <td>{sym.value4}×</td>
                  </tr>
                ))}
                <tr>
                  <td>🃏 Wild</td>
                  <td colSpan={2} style={{ textAlign: "center", fontSize: "0.65rem" }}>Substitutes any symbol</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cs-panel">
            <p className="cs-panel-title">📐 Paylines</p>
            <div className="cs-paylines-list">
              {PAYLINES.map(pl => (
                <div key={pl.id} className="cs-pl-item">
                  <span className="cs-pl-swatch" style={{ background: pl.color }} />
                  <span className="cs-pl-name">{pl.label}</span>
                </div>
              ))}
            </div>
            <p className="cs-panel-note">Wins on 3 or 4 matching symbols (L→R). Wild substitutes any.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
