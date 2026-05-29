import { useState } from "react";

const CHOICES = ["🪨", "📄", "✂️"];

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [aiChoice, setAiChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState({ user: 0, ai: 0 });
  const [isSpinning, setIsSpinning] = useState(false);

  const play = (choice: string) => {
    if (isSpinning) return;
    
    setUserChoice(choice);
    setResult("AI is choosing...");
    setIsSpinning(true);

    let count = 0;
    const interval = setInterval(() => {
      setAiChoice(CHOICES[count % CHOICES.length]);
      count++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const ai = CHOICES[Math.floor(Math.random() * CHOICES.length)];
      setAiChoice(ai);
      setIsSpinning(false);

      if (choice === ai) {
        setResult("Draw!");
      } else if (
        (choice === "🪨" && ai === "✂️") ||
        (choice === "📄" && ai === "🪨") ||
        (choice === "✂️" && ai === "📄")
      ) {
        setResult("You Win!");
        setScore(s => ({ ...s, user: s.user + 1 }));
      } else {
        setResult("AI Wins!");
        setScore(s => ({ ...s, ai: s.ai + 1 }));
      }
    }, 1500);
  };

  return (
    <div className="rps-container">
      <div className="game-status-box" style={{ marginBottom: "1rem" }}>
        Score: You {score.user} - {score.ai} AI
      </div>

      <div className="rps-arena">
        <div className="rps-player">
          <p>You</p>
          <div className="rps-card">{userChoice || "❓"}</div>
        </div>
        <div className="rps-vs">VS</div>
        <div className="rps-player">
          <p>AI</p>
          <div className="rps-card">{aiChoice || "❓"}</div>
        </div>
      </div>

      <div className="game-status-box text-yellow" style={{ margin: "1rem 0" }}>
        {result || "Choose your weapon!"}
      </div>

      <div className="rps-controls">
        {CHOICES.map(c => (
          <button 
            key={c} 
            className="rps-btn" 
            onClick={() => play(c)}
            disabled={isSpinning}
            style={{ opacity: isSpinning ? 0.6 : 1, cursor: isSpinning ? "not-allowed" : "pointer" }}
          >
            {c}
          </button>
        ))}
      </div>
      
      <button className="nb-btn game-reset-btn" onClick={() => setScore({user:0, ai:0})} style={{ marginTop: "1rem" }}>
        Reset Score
      </button>
    </div>
  );
};

export default RockPaperScissors;
