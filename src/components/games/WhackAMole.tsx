import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhackAMole() {
  const [holes, setHoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        const nextHoles = new Array(9).fill(false);
        const randomHole = Math.floor(Math.random() * 9);
        nextHoles[randomHole] = true;
        setHoles(nextHoles);
      }, 800);
      
      const gameTimer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => {
        clearInterval(timer);
        clearTimeout(gameTimer);
      };
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setHoles(new Array(9).fill(false));
    }
  }, [isPlaying, timeLeft]);

  const hit = (idx: number) => {
    if (holes[idx]) {
      setScore(s => s + 1);
      const nextHoles = [...holes];
      nextHoles[idx] = false;
      setHoles(nextHoles);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-amber-50 rounded-3xl shadow-xl w-full max-w-md mx-auto">
      <div className="flex justify-between w-full mb-6 font-display font-bold text-amber-700">
        <span className="text-xl">Ball: {score}</span>
        <span className="text-xl">Vaqt: {timeLeft}s</span>
      </div>

      {!isPlaying ? (
        <div className="text-center py-10">
          <h3 className="text-3xl font-display font-bold mb-6 text-amber-800">Krotni Urish! 🔨</h3>
          <button 
            onClick={startGame}
            className="px-10 py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 shadow-lg shadow-amber-200"
          >
            Boshlash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full">
          {holes.map((isUp, i) => (
            <div 
              key={i} 
              className="aspect-square bg-amber-200 rounded-full border-b-8 border-amber-300 relative overflow-hidden"
              onClick={() => hit(i)}
            >
              <AnimatePresence>
                {isUp && (
                  <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    exit={{ y: 50 }}
                    className="absolute inset-0 flex items-center justify-center text-4xl cursor-pointer select-none"
                  >
                    🐹
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
