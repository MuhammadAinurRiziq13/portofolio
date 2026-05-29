import { useState, useEffect } from "react";

const CARDS = ["⚛️", "🐍", "🦊", "🚀", "🔥", "🐘", "🐬", "🦀"];

const MemoryMatch = () => {
  const [deck, setDeck] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...CARDS, ...CARDS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (deck[first] === deck[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isWon = matched.length === deck.length && deck.length > 0;

  return (
    <div className="memory-game-container">
      <div className="game-status-box" style={{ marginBottom: "1rem" }}>
        {isWon ? <span className="text-yellow">🎉 You Won in {moves} moves!</span> : <span>Moves: {moves}</span>}
      </div>
      
      <div className="memory-grid">
        {deck.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <button
              key={index}
              className={`memory-card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front">?</div>
                <div className="memory-card-back">{card}</div>
              </div>
            </button>
          );
        })}
      </div>

      <button className="nb-btn game-reset-btn" onClick={startNewGame} style={{ marginTop: "1.5rem" }}>
        Restart
      </button>
    </div>
  );
};

export default MemoryMatch;
