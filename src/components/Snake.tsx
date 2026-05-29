import { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [[7, 7], [7, 6]];
const INITIAL_DIRECTION = [0, 1];

const Snake = () => {
  const [snake, setSnake] = useState<number[][]>(INITIAL_SNAKE);
  const [food, setFood] = useState<number[]>([5, 5]);
  const [dir, setDir] = useState<number[]>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const generateFood = useCallback(() => {
    let newFood: number[];
    while (true) {
      newFood = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1])) break;
    }
    return newFood;
  }, [snake]);

  useEffect(() => {
    if (gameOver || !isStarted) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = [prev[0][0] + dir[0], prev[0][1] + dir[1]];
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE || prev.some(s => s[0] === head[0] && s[1] === head[1])) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head[0] === food[0] && head[1] === food[1]) {
          setFood(generateFood());
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [dir, food, gameOver, isStarted, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted && !gameOver && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setIsStarted(true);
        e.preventDefault();
      }
      switch (e.key) {
        case "ArrowUp": if (dir[0] !== 1) setDir([-1, 0]); e.preventDefault(); break;
        case "ArrowDown": if (dir[0] !== -1) setDir([1, 0]); e.preventDefault(); break;
        case "ArrowLeft": if (dir[1] !== 1) setDir([0, -1]); e.preventDefault(); break;
        case "ArrowRight": if (dir[1] !== -1) setDir([0, 1]); e.preventDefault(); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dir, isStarted, gameOver]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDir(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setIsStarted(false);
  };

  return (
    <div className="snake-container">
      <div className="game-status-box" style={{ marginBottom: "1rem" }}>
        {gameOver ? <span className="text-red">Game Over! Score: {snake.length - 2}</span> : <span>Score: {snake.length - 2}</span>}
      </div>
      
      <div className="snake-board" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const r = Math.floor(idx / GRID_SIZE);
          const c = idx % GRID_SIZE;
          const isSnake = snake.some(s => s[0] === r && s[1] === c);
          const isFood = food[0] === r && food[1] === c;
          return <div key={idx} className={`snake-cell ${isSnake ? "snake-body" : isFood ? "snake-food" : ""}`} />;
        })}
      </div>

      <button className="nb-btn game-reset-btn" onClick={resetGame} style={{ marginTop: "1.5rem" }}>
        {gameOver ? "Try Again" : "Reset"}
      </button>
      <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--color-muted)" }}>Use Arrow Keys to play</p>
    </div>
  );
};

export default Snake;
