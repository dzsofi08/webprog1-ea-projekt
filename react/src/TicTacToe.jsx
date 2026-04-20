import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const status = winner ? `Nyertes: ${winner}` : `Következő játékos: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <h2>Amőba Játék</h2>
      <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{status}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '5px' }}>
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer',
              backgroundColor: '#fff', border: '1px solid #999'
            }}
          >
            {square}
          </button>
        ))}
      </div>
      <button 
        onClick={() => { setBoard(Array(9).fill(null)); setXIsNext(true); }} 
        style={{ marginTop: '15px' }}
      >
        Újraindítás
      </button>
    </div>
  );
}