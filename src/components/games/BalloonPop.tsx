import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BalloonPop() {
  const [balloons, setBalloons] = useState<{ id: number; x: number; color: string }[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && missed < 5) {
      interval = setInterval(() => {
        setBalloons(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            x: Math.random() * 80 + 10, 
            color: `hsl(${Math.random() * 360}, 70%, 60%)` 
          }
        ]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, missed]);

  const pop = (id: number) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
  };

  return (
    <div className="relative w-full max-w-xl h-[500px] bg-sky-50 rounded-3xl shadow-inner overflow-hidden mx-auto border-4 border-white">
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <span className="bg-white/80 px-3 py-1 rounded-full text-sm font-bold text-sky-600">Ball: {score}</span>
        <span className="bg-white/80 px-3 py-1 rounded-full text-sm font-bold text-rose-600">Xato: {missed}/5</span>
      </div>

      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-20">
          <button 
            onClick={() => { setIsPlaying(true); setScore(0); setMissed(0); setBalloons([]); }}
            className="px-10 py-5 bg-sky-600 text-white rounded-2xl font-bold text-xl shadow-xl"
          >
            Boshlash
          </button>
        </div>
      ) : (
        <AnimatePresence>
          {balloons.map(b => (
            <motion.div
              key={b.id}
              initial={{ y: 550 }}
              animate={{ y: -100 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              onAnimationComplete={() => {
                setBalloons(prev => prev.filter(ball => ball.id !== b.id));
                setMissed(m => m + 1);
              }}
              onClick={() => pop(b.id)}
              className="absolute w-16 h-20 rounded-[50%] cursor-pointer flex items-center justify-center text-2xl"
              style={{ left: `${b.x}%`, backgroundColor: b.color }}
            >
              🎈
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {missed >= 5 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-500/90 text-white z-30">
          <h2 className="text-4xl font-display font-bold mb-4">O'yin Tugadi!</h2>
          <p className="text-xl mb-8">Natijangiz: {score}</p>
          <button 
            onClick={() => { setIsPlaying(false); }}
            className="px-8 py-3 bg-white text-rose-600 rounded-xl font-bold"
          >
            Yana bir bor
          </button>
        </div>
      )}
    </div>
  );
}
