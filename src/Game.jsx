import React, { useState } from 'react'
import { Board } from './Board.jsx'

const calculateWinner = (squares) => {
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
      return squares[a];
    }
  }
  return null;
}

const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [xIsNext, setNext] = useState(true);
  const [stepNumber, setStep] = useState(0);
  
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move # ${move}` :
      'Go to game start';
    return (
      <li key={move}>
        <button className="btn btn-primary" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
      );
    });
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const jumpTo = (step) => {
    setStep(step);
    setNext(step % 2 === 0);
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = newHistory[newHistory.length - 1].squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
      }
    squares[i] = xIsNext ? 'X' : 'O';
    setNext(!xIsNext);
    setHistory(history.concat([{
      squares: squares,
    }]));
    setStep(newHistory.length);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)} 
        />
      </div>
      <div className="game-info">
        <div className="h4">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export { Game };