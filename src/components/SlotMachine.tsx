import { useState, useRef, useEffect } from "react";

const SYMBOLS = ["⚛️", "🐍", "🦊", "🚀", "🔥", "🐘", "🐬", "🦀"];
// 4x repetition so the strip is long enough to scroll through
const STRIP = [...SYMBOLS, ...SYMBOLS, ...SYMBOLS, ...SYMBOLS];
const CELL_SIZE = 80;       // px — height of each symbol cell
const SCROLL_SPEED = 14;    // px per frame (16ms)
const INITIAL_COINS = 100;
const SPIN_COST = 10;

const randomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

/* ── Individual Reel Component ── */
interface ReelProps {
  finalSymbol: string;
  isSpinning: boolean;
}

const Reel = ({ finalSymbol, isSpinning }: ReelProps) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef<number>(0);

  /* Scroll fast while spinning (JS interval → no CSS keyframe jump issue) */
  useEffect(() => {
    if (!isSpinning) return;
    const LOOP = SYMBOLS.length * CELL_SIZE; // wrap every 8 cells
    const id = setInterval(() => {
      posRef.current -= SCROLL_SPEED;
      // Wrap so we never scroll past the strip start
      if (posRef.current < -LOOP * 2) posRef.current += LOOP;
      if (stripRef.current) {
        stripRef.current.style.transition = "none";
        stripRef.current.style.transform  = `translateY(${posRef.current}px)`;
      }
    }, 16);
    return () => clearInterval(id);
  }, [isSpinning]);

  /* Snap to final symbol with ease-out when spin ends */
  useEffect(() => {
    if (isSpinning) return;
    // Target index = 3rd repetition offset + symbol position
    const symIdx   = SYMBOLS.indexOf(finalSymbol);
    const targetPos = -(SYMBOLS.length * 2 + symIdx) * CELL_SIZE;
    if (stripRef.current) {
      stripRef.current.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
      stripRef.current.style.transform  = `translateY(${targetPos}px)`;
      posRef.current = targetPos;
    }
  }, [isSpinning, finalSymbol]);

  return (
    <div className="slot-reel-window">
      <div ref={stripRef} className="slot-reel-strip">
        {STRIP.map((sym, i) => (
          <div key={i} className="slot-reel-cell">{sym}</div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Slot Machine ── */
const SlotMachine = () => {
  const [finals,       setFinals]       = useState(["⚛️", "🚀", "🐍"]);
  const [spinningReel, setSpinningReel] = useState([false, false, false]);
  const [coins,        setCoins]        = useState(INITIAL_COINS);
  const [jackpot,      setJackpot]      = useState(500);
  const [spinCount,    setSpinCount]    = useState(0);
  const [jackpotRate,  setJackpotRate]  = useState(0); // extra % chance, starts 0
  const [result,       setResult]       = useState<string | null>(null);
  const [isSpinning,   setIsSpinning]   = useState(false);

  const spin = () => {
    if (isSpinning || coins < SPIN_COST) return;
    setIsSpinning(true);
    setResult(null);
    setCoins(c => c - SPIN_COST);
    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);
    // Jackpot rate naik +5% setiap 3 spin
    const newRate = newSpinCount % 3 === 0 ? jackpotRate + 5 : jackpotRate;
    if (newSpinCount % 3 === 0) setJackpotRate(newRate);
    setSpinningReel([true, true, true]);

    const f = [randomSymbol(), randomSymbol(), randomSymbol()];

    // Stop reels one by one
    setTimeout(() => { setFinals(p => [f[0], p[1], p[2]]); setSpinningReel([false, true,  true]);  }, 900);
    setTimeout(() => { setFinals(p => [f[0], f[1], p[2]]); setSpinningReel([false, false, true]);  }, 1500);
    setTimeout(() => {
      setFinals(f);
      setSpinningReel([false, false, false]);
      setIsSpinning(false);
      const [a, b, c] = f;
      // Natural jackpot (3 sama) OR bonus rate jackpot
      const isJackpot = (a === b && b === c) || (Math.random() * 100 < newRate);
      if (isJackpot)                              { setResult("jackpot"); setCoins(p => p + jackpot); setJackpotRate(0); setSpinCount(0); }
      else if (a === b || b === c || a === c)     { setResult("two");     setCoins(p => p + 10);  }
      else                                        { setResult("none"); }
    }, 2100);
  };

  const reset = () => {
    setCoins(INITIAL_COINS);
    setResult(null);
    setJackpot(500);
    setSpinCount(0);
    setJackpotRate(0);
    setFinals(["⚛️", "🚀", "🐍"]);
    setSpinningReel([false, false, false]);
  };

  return (
    <div className="slot-game-layout">
      {/* Left: Machine */}
      <div className="slot-machine-wrapper">
        <div className="slot-marquee">🎰 SLOT MACHINE 🎰</div>
        <div className="slot-machine-body">
          {/* Jackpot Meter */}
          <div className="slot-jackpot-meter">
            <span className="jackpot-label">JACKPOT</span>
            <span className="jackpot-value">🏆 {jackpot} <span style={{fontSize:"0.7rem", color: jackpotRate > 0 ? "var(--accent-red)" : "var(--accent-yellow)"}}>[{jackpotRate}% rate]</span></span>
          </div>
          <div className="slot-coin-display">💰 {coins} coins</div>

          <div className="slot-window">
            <div className="slot-payline slot-payline-top" />
            <div className="slot-reels">
              {finals.map((sym, i) => (
                <Reel key={i} finalSymbol={sym} isSpinning={spinningReel[i]} />
              ))}
            </div>
          </div>

          <div className="slot-result-box">
            {result === "jackpot" && <span className="slot-result-jackpot">🎉 JACKPOT! +{jackpot > 500 ? jackpot : 500} coins</span>}
            {result === "two"     && <span className="slot-result-two">✨ Match! +10 coins</span>}
            {result === "none"    && <span className="slot-result-none">😭 No match...</span>}
            {!result              && <span style={{ color: "var(--color-muted)" }}>Good luck!</span>}
          </div>

          <button className="slot-spin-btn" onClick={spin} disabled={isSpinning || coins < SPIN_COST}>
            {isSpinning ? "⏳ Spinning..." : coins < SPIN_COST ? "No Coins!" : "🎰 SPIN"}
          </button>

          {coins < SPIN_COST && (
            <button className="nb-btn game-reset-btn" onClick={reset} style={{ marginTop: "0.75rem" }}>
              Reset Coins
            </button>
          )}
        </div>
        <div className="slot-machine-base" />
      </div>

      {/* Right: How to Play */}
      <div className="slot-rules">
        <p className="slot-rules-title">📖 How to Play</p>
        <ul className="slot-rules-list">
          <li>🎰 Setiap spin habis <strong>10 coins</strong></li>
          <li>🟰 2 simbol sama → <strong>+10 coins</strong></li>
          <li>💎 3 simbol sama → <strong>JACKPOT!</strong></li>
          <li>📈 Rate jackpot naik <strong>+5%</strong> tiap 3 spin</li>
          <li>🎯 {3 - (spinCount % 3)} spin lagi → rate <strong>{jackpotRate + (spinCount % 3 === 0 && spinCount > 0 ? 0 : 5)}%</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default SlotMachine;
