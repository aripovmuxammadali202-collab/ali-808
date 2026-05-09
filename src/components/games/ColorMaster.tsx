import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
const COLOR_VALUES = {
  Red: '#ef4444',
  Blue: '#3b82f6',
  Green: '#10b981',
  Yellow: '#f59e0b',
  Purple: '#a855f7',
  Orange: '#f97316',
};

export default function ColorMaster() {
  const [target, setTarget] = useState({ name: '', text: '' });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateNext = () => {
    const textIdx = Math.floor(Math.random() * COLORS.length);
    const colorIdx = Math.floor(Math.random() * COLORS.length);
    setTarget({ 
      name: COLORS[colorIdx], 
      text: COLORS[textIdx] 
    });
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const start = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    generateNext();
  };

  const handleChoice = (color: string) => {
    // Goal: Pick the color of the TEXT, not what it says
    if (color === target.name) {
      setScore(s => s + 1);
      generateNext();
    } else {
      setScore(s => Math.max(0, s - 1));
      generateNext();
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto border-t-8 border-indigo-500">
      <div className="flex justify-between w-full mb-8 text-indigo-600 font-display font-bold text-lg">
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
      </div>

      {!isPlaying ? (
        <div className="text-center">
          <h3 className="text-2xl font-display font-bold mb-4 text-slate-800">Ranglar Ustasi</h3>
          <p className="text-slate-500 mb-6 italic">Matnning RANGINI tanlang (so'zni emas!)</p>
          <button 
            onClick={start}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-200"
          >
            Boshlash
          </button>
        </div>
      ) : (
        <>
          <motion.div 
            key={target.text + target.name}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-display font-bold mb-12"
            style={{ color: COLOR_VALUES[target.name as keyof typeof COLOR_VALUES] }}
          >
            {target.text}
          </motion.div>

          <div className="grid grid-cols-3 gap-3 w-full">
            {Object.keys(COLOR_VALUES).map((color) => (
              <motion.button
                key={color}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleChoice(color)}
                className="aspect-square rounded-xl shadow-sm border-2 border-slate-50"
                style={{ backgroundColor: COLOR_VALUES[color as keyof typeof COLOR_VALUES] }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
