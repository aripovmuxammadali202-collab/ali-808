import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐮', '🐷'];

export default function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].emoji === cards[secondId].emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto">
      <div className="flex justify-between w-full mb-4 px-2">
        <span className="text-lg font-display font-bold text-indigo-600">Yurishlar: {moves}</span>
        <button 
          onClick={initGame}
          className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full">
        {cards.map(card => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square flex items-center justify-center text-3xl cursor-pointer rounded-xl transition-all duration-300 ${
              card.isFlipped || card.isMatched 
                ? 'bg-indigo-500 scale-100 rotate-0' 
                : 'bg-indigo-100 -rotate-3 hover:rotate-0'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isWon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl font-display font-bold text-center w-full"
          >
            Tabriklaymiz! Siz g'alaba qozondingiz! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
