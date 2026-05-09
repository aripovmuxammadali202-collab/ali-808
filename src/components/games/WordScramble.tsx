import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WORDS = ['OLMA', 'ANOR', 'KITOB', 'MAKTAB', 'DUNYO', 'QUYOSH', 'VATAN', 'DOST'];

export default function WordScramble() {
  const [original, setOriginal] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const initGame = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setOriginal(word);
    setScrambled(word.split('').sort(() => Math.random() - 0.5).join(''));
    setGuess('');
    setFeedback('');
  };

  useEffect(() => {
    initGame();
  }, []);

  const check = () => {
    if (guess.toUpperCase() === original) {
      setScore(s => s + 1);
      setFeedback('To\'g\'ri! 🎉');
      setTimeout(initGame, 1000);
    } else {
      setFeedback('Xato, qayta urinib ko\'ring ❌');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto">
      <div className="text-sm font-bold text-slate-400 mb-4 uppercase">Ball: {score}</div>
      <div className="text-4xl font-display font-black tracking-[0.5em] mb-10 text-indigo-600 bg-indigo-50 p-6 rounded-2xl w-full text-center">
        {scrambled}
      </div>
      
      <input 
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="So'zni toping..."
        className="w-full p-4 border-2 border-slate-100 rounded-xl mb-4 text-center text-xl font-bold uppercase"
      />
      
      <button 
        onClick={check}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
      >
        Tekshirish
      </button>
      
      <div className="mt-4 font-bold text-indigo-500">{feedback}</div>
    </div>
  );
}
