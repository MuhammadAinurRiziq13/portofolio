import { useState, useEffect, useRef } from "react";

const TEXTS = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet, making it a perfect test for typing speed and accuracy.",
  "Programming is not about typing, it's about thinking. However, typing fast allows you to put your thoughts into code much more efficiently without breaking focus.",
  "A journey of a thousand miles begins with a single step. Success is not final, failure is not fatal: it is the courage to continue that counts in the end."
];

const TIME_LIMIT = 30; // 30 seconds

const TypingSpeed = () => {
  const [snippet, setSnippet] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState<number | null>(null);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    pickSnippet();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      endGame(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const pickSnippet = () => {
    const randomSnippet = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    setSnippet(randomSnippet);
    setInput("");
    setTimeLeft(TIME_LIMIT);
    setIsActive(false);
    setIsFinished(false);
    setWpm(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const endGame = (completed: boolean) => {
    setIsActive(false);
    setIsFinished(true);
    
    // Calculate final WPM
    const timeTakenMin = completed ? (TIME_LIMIT - timeLeft) / 60 : TIME_LIMIT / 60;
    // ensure no infinity if completed in 0s
    const safeTime = timeTakenMin <= 0 ? 0.01 : timeTakenMin; 
    
    const correctChars = input.split("").filter((char, i) => char === snippet[i]).length;
    const wordCount = correctChars / 5;
    
    setWpm(Math.round(wordCount / safeTime));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;
    const val = e.target.value;
    
    if (!isActive && val.length > 0) {
      setIsActive(true);
    }
    
    setInput(val);

    if (val === snippet) {
      endGame(true);
    }
  };

  const renderText = () => {
    return snippet.split("").map((char, index) => {
      let color = "var(--color-muted)";
      if (index < input.length) {
        color = input[index] === char ? "var(--accent-blue)" : "var(--accent-red)";
      }
      return <span key={index} style={{ color, background: input[index] === char ? "transparent" : input[index] ? "rgba(255,0,0,0.2)" : "transparent" }}>{char}</span>;
    });
  };

  const progressPercent = (timeLeft / TIME_LIMIT) * 100;

  return (
    <div className="typing-container">
      
      {/* Timer Bar */}
      <div style={{ width: "100%", height: "12px", background: "#ddd", border: "var(--border-thin)", borderRadius: "var(--radius-sm)", overflow: "hidden", marginBottom: "1rem" }}>
        <div style={{ 
          height: "100%", 
          width: `${progressPercent}%`, 
          background: progressPercent > 30 ? "var(--accent-cyan)" : "var(--accent-red)",
          transition: isActive ? "width 1s linear, background 0.3s" : "none"
        }} />
      </div>

      <div className="game-status-box" style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
        <span>Time Left: <strong>{timeLeft}s</strong></span>
        {isFinished ? (
          <span className="text-yellow">🎉 {wpm} WPM</span>
        ) : (
          <span>Type to start</span>
        )}
      </div>

      <div className="typing-display">
        {renderText()}
      </div>
      
      <textarea
        ref={inputRef}
        className="typing-input nb-input"
        value={input}
        onChange={handleChange}
        disabled={isFinished}
        autoComplete="off"
        spellCheck="false"
        rows={3}
        placeholder={isFinished ? "Time's up!" : "Start typing here..."}
        style={{ resize: "none" }}
      />

      <button className="nb-btn game-reset-btn" onClick={pickSnippet} style={{ marginTop: "1rem" }}>
        Try Again
      </button>
    </div>
  );
};

export default TypingSpeed;
