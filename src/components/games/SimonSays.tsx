import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PAD_COLORS = [
  { id: 0, color: 'bg-red-500', active: 'bg-red-300', sound: 'C4' },
  { id: 1, color: 'bg-blue-500', active: 'bg-blue-300', sound: 'D4' },
  { id: 2, color: 'bg-green-500', active: 'bg-green-300', sound: 'E4' },
  { id: 3, color: 'bg-yellow-500', active: 'bg-yellow-300', sound: 'F4' },
];

export default function SimonSays() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'idle' | 'playing' | 'failed'>('idle');

  const startNextRound = (currentSeq: number[]) => {
    const nextSeq = [...currentSeq, Math.floor(Math.random() * 4)];
    setSequence(nextSeq);
    setUserSequence([]);
    playSequence(nextSeq);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlayingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setActivePad(seq[i]);
      await new Promise(r => setTimeout(r, 400));
      setActivePad(null);
    }
    setIsPlayingSequence(false);
  };

  const handlePadClick = (id: number) => {
    if (isPlayingSequence || status !== 'playing') return;

    const nextUserSeq = [...userSequence, id];
    setUserSequence(nextUserSeq);

    // Check correctness
    if (id !== sequence[nextUserSeq.length - 1]) {
      setStatus('failed');
      return;
    }

    if (nextUserSeq.length === sequence.length) {
      setScore(s => s + 1);
      setTimeout(() => startNextRound(sequence), 1000);
    }
  };

  const startGame = () => {
    setScore(0);
    setStatus('playing');
    startNextRound([]);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-slate-900 rounded-[3rem] shadow-2xl w-full max-w-sm mx-auto">
      <div className="mb-8 text-center">
        <div className="text-3xl font-display font-bold text-white mb-2">Score: {score}</div>
        <div className="text-indigo-400 text-sm italic">Ranglarni eslab qoling!</div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full aspect-square">
        {PAD_COLORS.map(pad => (
          <motion.button
            key={pad.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePadClick(pad.id)}
            className={`rounded-3xl shadow-xl transition-colors duration-200 ${
              activePad === pad.id ? pad.active : pad.color
            } h-full w-full`}
          />
        ))}
      </div>

      {status !== 'playing' && (
        <button 
          onClick={startGame}
          className="mt-10 px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:scale-105 transition-transform"
        >
          {status === 'failed' ? "Qayta urinish" : "Boshlash"}
        </button>
      )}
    </div>
  );
}
