import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function calculateWinner(squares: (string | null)[]) {
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
    return squares.every(s => s !== null) ? 'Durang' : null;
  }

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const nextBoard = board.slice();
    nextBoard[i] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl w-full max-w-sm mx-auto">
      <div className="flex justify-between w-full mb-6 items-center">
        <div className="text-xl font-display font-bold">
          {winner ? (
            <span className={winner === 'Durang' ? 'text-slate-500' : 'text-indigo-600'}>
              {winner === 'Durang' ? 'Durang!' : `${winner} g'olib!`}
            </span>
          ) : (
            <span className="text-slate-600">Navbat: {isXNext ? 'X' : 'O'}</span>
          )}
        </div>
        <button 
          onClick={resetGame}
          className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-all active:scale-95"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full aspect-square">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-xl text-4xl font-display font-bold flex items-center justify-center transition-colors ${
              cell === 'X' ? 'bg-indigo-50 text-indigo-600' : 
              cell === 'O' ? 'bg-amber-50 text-amber-600' : 
              'bg-slate-100'
            }`}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {winner && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 font-display font-bold text-center text-indigo-600"
          >
            Ajoyib o'yin! 🎮
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
