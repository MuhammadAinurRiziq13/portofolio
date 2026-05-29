import { useState } from "react";
import TicTacToe from "./TicTacToe";
import MemoryMatch from "./MemoryMatch";
import TypingSpeed from "./TypingSpeed";
import Snake from "./Snake";
import SlotMachine from "./SlotMachine";
import RockPaperScissors from "./RockPaperScissors";

interface GamesProps {
  onBack: () => void;
}

const GAMES_LIST = [
  { id: "tictactoe", name: "Tic Tac Toe", icon: "❌⭕", desc: "Classic 2-player game" },
  { id: "memory", name: "Memory Match", icon: "🃏", desc: "Tech stack edition" },
  { id: "typing", name: "Typing Test", icon: "⌨️", desc: "Paragraph typing test (WPM)" },
  { id: "slotmachine", name: "Slot Machine", icon: "🎰", desc: "Try your luck!" },
  { id: "snake", name: "Snake", icon: "🐍", desc: "Classic arcade action" },
  { id: "rps", name: "R.P.S", icon: "🪨", desc: "Rock Paper Scissors vs AI" },
];

const Games = ({ onBack }: GamesProps) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const renderActiveGame = () => {
    switch (activeGame) {
      case "tictactoe": return <TicTacToe />;
      case "memory": return <MemoryMatch />;
      case "typing": return <TypingSpeed />;
      case "slotmachine": return <SlotMachine />;
      case "snake": return <Snake />;
      case "rps": return <RockPaperScissors />;
      default: return null;
    }
  };

  return (
    <div className="games-page-wrapper" style={{ minHeight: "100vh", background: "var(--color-bg)", padding: "2rem 0" }}>
      <div className="container">
        
        {activeGame ? (
          <button className="nb-btn back-btn" onClick={() => setActiveGame(null)} style={{ marginBottom: "2rem" }}>
            ← Back to Arcade
          </button>
        ) : (
          <button className="nb-btn back-btn" onClick={onBack} style={{ marginBottom: "2rem" }}>
            ← Back to Home
          </button>
        )}

        <section id="playground" className="section" style={{ paddingTop: 0 }}>
          {!activeGame && (
            <>
              <p className="section-label">Fun & Interactive</p>
              <h2 className="section-title">
                The <span>Arcade.</span>
              </h2>
              <p style={{ color: "var(--color-muted)", fontSize: "var(--text-lg)", maxWidth: "600px", marginBottom: "var(--gap-xl)", lineHeight: 1.7 }}>
                Pilih game yang ingin Anda mainkan.
              </p>
            </>
          )}

          {activeGame ? (
            <div className="active-game-container">
              <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>
                {GAMES_LIST.find(g => g.id === activeGame)?.name}
              </h2>
              <div className="game-body" style={{ background: "transparent", padding: 0 }}>
                {renderActiveGame()}
              </div>
            </div>
          ) : (
            <div className="playground-grid">
              {GAMES_LIST.map((game) => (
                <div 
                  key={game.id} 
                  className="game-card arcade-card" 
                  onClick={() => setActiveGame(game.id)}
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                >
                  <div className="arcade-icon" style={{ fontSize: "4rem", textAlign: "center", padding: "2rem 0", background: "var(--color-surface)", borderBottom: "var(--border-thick)" }}>
                    {game.icon}
                  </div>
                  <div className="game-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                    <h3>{game.name}</h3>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-text)" }}>{game.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Games;
