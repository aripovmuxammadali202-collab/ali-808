import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function FruitCatch() {
  const [basketPos, setBasketPos] = useState(50);
  const [fruits, setFruits] = useState<{ id: number; x: number; y: number; type: string }[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const FRUIT_TYPES = ['🍎', '🍊', '🍌', '🍇', '🍓'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setFruits(prev => [
          ...prev,
          { id: Date.now(), x: Math.random() * 90 + 5, y: -50, type: FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)] }
        ]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setFruits(prev => {
        const next = prev.map(f => ({ ...f, y: f.y + 5 }));
        const caught = next.filter(f => f.y > 400 && f.y < 450 && Math.abs(f.x - basketPos) < 15);
        if (caught.length > 0) setScore(s => s + caught.length);
        return next.filter(f => f.y < 500 && !caught.includes(f));
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isPlaying, basketPos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketPos(Math.max(5, Math.min(95, x)));
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-xl h-[500px] bg-gradient-to-b from-blue-100 to-green-100 rounded-3xl overflow-hidden mx-auto cursor-none border-8 border-white shadow-2xl"
    >
      <div className="absolute top-4 right-4 bg-white/80 px-4 py-2 rounded-2xl font-bold text-green-600 shadow-sm">
        Savatda: {score} 🍎
      </div>

      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <button 
            onClick={() => setIsPlaying(true)}
            className="px-12 py-6 bg-green-600 text-white rounded-[2rem] font-black text-2xl shadow-xl hover:scale-105 transition-transform"
          >
            MEVALARNI TUT!
          </button>
        </div>
      ) : (
        <>
          {fruits.map(f => (
            <div 
              key={f.id}
              className="absolute text-4xl"
              style={{ left: `${f.x}%`, top: `${f.y}px` }}
            >
              {f.type}
            </div>
          ))}

          <motion.div 
            className="absolute bottom-10 h-16 w-24 flex items-center justify-center text-6xl"
            animate={{ left: `${basketPos}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transform: 'translateX(-50%)' }}
          >
            🧺
          </motion.div>
        </>
      )}
    </div>
  );
}
