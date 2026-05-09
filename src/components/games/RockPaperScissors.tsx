import { useState } from 'react';
import { motion } from 'framer-motion';

const CHOICES = [
  { id: 'rock', emoji: '✊', beats: 'scissors' },
  { id: 'paper', emoji: '✋', beats: 'rock' },
  { id: 'scissors', emoji: '✌️', beats: 'paper' }
];

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState<any>(null);
  const [compChoice, setCompChoice] = useState<any>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState({ user: 0, comp: 0 });

  const play = (choice: any) => {
    const comp = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setUserChoice(choice);
    setCompChoice(comp);

    if (choice.id === comp.id) {
      setResult('Durang!');
    } else if (choice.beats === comp.id) {
      setResult('Siz yutdingiz! 🎉');
      setScore(s => ({ ...s, user: s.user + 1 }));
    } else {
      setResult('Kompyuter yutdi! 🤖');
      setScore(s => ({ ...s, comp: s.comp + 1 }));
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto">
      <div className="flex justify-between w-full mb-10 px-4">
        <div className="text-center">
          <div className="text-xs uppercase font-bold text-slate-400">Siz</div>
          <div className="text-4xl font-display font-bold text-indigo-600">{score.user}</div>
        </div>
        <div className="text-center">
          <div className="text-xs uppercase font-bold text-slate-400">Robot</div>
          <div className="text-4xl font-display font-bold text-rose-600">{score.comp}</div>
        </div>
      </div>

      <div className="flex justify-center gap-20 mb-12 h-32 items-center">
        <div className="text-6xl">{userChoice?.emoji || '?'}</div>
        <div className="text-2xl font-bold text-slate-300">VS</div>
        <div className="text-6xl">{compChoice?.emoji || '?'}</div>
      </div>

      {result && <div className="mb-10 text-xl font-display font-bold text-slate-800">{result}</div>}

      <div className="flex gap-4 w-full">
        {CHOICES.map(c => (
          <motion.button
            key={c.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => play(c)}
            className="flex-1 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-4xl hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            {c.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
