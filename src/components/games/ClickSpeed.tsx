import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ClickSpeed() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (clicks > bestScore) setBestScore(clicks);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, clicks, bestScore]);

  const handleClick = () => {
    if (!isActive && timeLeft === 10) setIsActive(true);
    if (isActive) setClicks(c => c + 1);
  };

  const reset = () => {
    setClicks(0);
    setTimeLeft(10);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-indigo-50 rounded-3xl shadow-xl w-full max-w-sm mx-auto">
      <div className="w-full flex justify-between mb-8 font-display font-bold text-indigo-900 border-b-2 border-indigo-100 pb-4">
        <span>Vaqt: {timeLeft}s</span>
        <span>Eng yaxshi: {bestScore}</span>
      </div>

      <div className="text-center mb-8">
        <div className="text-7xl font-display font-black text-indigo-600 mb-2">{clicks}</div>
        <div className="text-sm text-indigo-400 uppercase font-bold tracking-widest">Bosishlar soni</div>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        disabled={timeLeft === 0}
        className={`w-48 h-48 rounded-full shadow-2xl flex items-center justify-center text-white transition-all ${
          timeLeft === 0 ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 active:bg-indigo-700 hover:scale-105'
        }`}
      >
        <Zap size={64} fill="currentColor" />
      </motion.button>

      {timeLeft === 0 && (
        <button 
          onClick={reset}
          className="mt-8 px-6 py-2 text-indigo-600 font-bold hover:underline"
        >
          Qayta boshlash
        </button>
      )}

      <p className="mt-6 text-sm text-indigo-300 italic">Qani ko'raylik, 10 soniyada necha marta bosa olasiz?</p>
    </div>
  );
}
