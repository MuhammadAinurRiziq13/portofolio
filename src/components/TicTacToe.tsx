import { useState } from "react";

type Player = "X" | "O" | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const result = calculateWinner(board);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="tic-tac-toe-container">
      <div className="game-status-box">
        {winner ? (
          <span className={`game-status-text ${winner === "X" ? "text-red" : "text-blue"}`}>
            🏆 Winner: {winner}
          </span>
        ) : isDraw ? (
          <span className="game-status-text text-yellow">🤝 It's a Draw!</span>
        ) : (
          <span className="game-status-text">
            Next Player: <strong className={isXNext ? "text-red" : "text-blue"}>{isXNext ? "X" : "O"}</strong>
          </span>
        )}
      </div>

      <div className="game-board">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine.includes(idx);
          return (
            <button
              key={idx}
              className={`game-cell ${cell === "X" ? "cell-x" : cell === "O" ? "cell-o" : ""} ${isWinningCell ? "cell-winner" : ""}`}
              onClick={() => handleClick(idx)}
              disabled={!!cell || !!winner}
              aria-label={`Tic Tac Toe cell ${idx}`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      <button className="nb-btn game-reset-btn" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
