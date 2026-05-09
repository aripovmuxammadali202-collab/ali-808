import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuessNumber() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setFeedback('1 dan 100 gacha son o\'ylang!');
    setIsWon(false);
    setGuess('');
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);
    if (isNaN(num)) return;

    setAttempts(a => a + 1);
    if (num === target) {
      setFeedback(`Tabriklaymiz! ${attempts + 1} urunishda topdingiz! 🎉`);
      setIsWon(true);
    } else if (num < target) {
      setFeedback('Kattaroq son ayting! ⬆️');
    } else {
      setFeedback('Kichikroq son ayting! ⬇️');
    }
    setGuess('');
  };

  return (
    <div className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto border-4 border-emerald-100">
      <div className="mb-8 p-6 bg-emerald-50 rounded-2xl text-center w-full min-h-[100px] flex items-center justify-center">
        <p className="text-xl font-display font-bold text-emerald-800">{feedback}</p>
      </div>

      {!isWon ? (
        <form onSubmit={handleGuess} className="w-full flex gap-4">
          <input 
            type="number" 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Son..."
            className="flex-1 p-4 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none text-xl font-bold"
          />
          <button 
            type="submit"
            className="px-6 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors"
          >
            Tekshirish
          </button>
        </form>
      ) : (
        <button 
          onClick={initGame}
          className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
        >
          Yangi o'yin
        </button>
      )}

      <div className="mt-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
        Urunishlar: {attempts}
      </div>
    </div>
  );
}
