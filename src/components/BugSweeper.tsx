import { useState, useEffect } from "react";

const GRID_SIZE = 8;
const MINES_COUNT = 10;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

const BugSweeper = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initBoard();
  }, []);

  const initBoard = () => {
    let newBoard: Cell[][] = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill({ isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0 })
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      if (!newBoard[r][c].isMine) {
        newBoard[r][c] = { ...newBoard[r][c], isMine: true };
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!newBoard[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (r + dr >= 0 && r + dr < GRID_SIZE && c + dc >= 0 && c + dc < GRID_SIZE) {
                if (newBoard[r + dr][c + dc].isMine) count++;
              }
            }
          }
          newBoard[r][c] = { ...newBoard[r][c], neighborMines: count };
        }
      }
    }
    setBoard(newBoard);
    setGameOver(false);
    setWon(false);
  };

  const revealCell = (r: number, c: number) => {
    if (gameOver || won || board[r][c].isRevealed || board[r][c].isFlagged) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));

    if (newBoard[r][c].isMine) {
      setGameOver(true);
      newBoard.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      }));
      setBoard(newBoard);
      return;
    }

    const floodFill = (row: number, col: number) => {
      if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || newBoard[row][col].isRevealed) return;
      newBoard[row][col].isRevealed = true;
      if (newBoard[row][col].neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            floodFill(row + dr, col + dc);
          }
        }
      }
    };

    floodFill(r, c);
    setBoard(newBoard);
    checkWin(newBoard);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || won || board[r][c].isRevealed) return;
    const newBoard = [...board];
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  };

  const checkWin = (b: Cell[][]) => {
    let unrevealedSafe = 0;
    b.forEach(row => row.forEach(cell => {
      if (!cell.isMine && !cell.isRevealed) unrevealedSafe++;
    }));
    if (unrevealedSafe === 0) setWon(true);
  };

  return (
    <div className="bugsweeper-container">
      <div className="game-status-box" style={{ marginBottom: "1rem" }}>
        {gameOver ? <span className="text-red">💥 You found a Bug!</span> : won ? <span className="text-yellow">🎉 Code is clean!</span> : <span>Find the 10 Bugs 🐛</span>}
      </div>

      <div className="bugsweeper-board" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
        {board.map((row, r) => row.map((cell, c) => (
          <button
            key={`${r}-${c}`}
            className={`bugsweeper-cell ${cell.isRevealed ? "revealed" : ""} ${cell.isMine && cell.isRevealed ? "mine" : ""}`}
            onClick={() => revealCell(r, c)}
            onContextMenu={(e) => toggleFlag(e, r, c)}
            disabled={gameOver || won}
          >
            {cell.isRevealed ? (cell.isMine ? "🐛" : (cell.neighborMines > 0 ? cell.neighborMines : "")) : (cell.isFlagged ? "🚩" : "")}
          </button>
        )))}
      </div>

      <button className="nb-btn game-reset-btn" onClick={initBoard} style={{ marginTop: "1.5rem" }}>
        Reset
      </button>
      <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--color-muted)" }}>Right click to flag bugs</p>
    </div>
  );
};

export default BugSweeper;
