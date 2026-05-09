import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function MathChallenge() {
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', answer: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const op = Math.random() > 0.5 ? '+' : '-';
    const answer = op === '+' ? a + b : a - b;
    
    let opts = [answer];
    while (opts.length < 4) {
      const wrong = answer + (Math.floor(Math.random() * 10) - 5);
      if (!opts.includes(wrong) && wrong !== undefined) opts.push(wrong);
    }
    
    setProblem({ a, b, op, answer });
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleAnswer = (selected: number) => {
    if (selected === problem.answer) {
      setScore(s => s + 1);
      setFeedback('correct');
      setTimeout(generateProblem, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto">
      <div className="w-full flex justify-between mb-8">
        <span className="text-sm font-display font-bold uppercase tracking-wider text-slate-400">Score: {score}</span>
        <button onClick={() => { setScore(0); generateProblem(); }} className="text-indigo-600 hover:rotate-180 transition-transform duration-500">
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="text-6xl font-display font-bold mb-12 flex items-center gap-4 text-slate-800">
        <span>{problem.a}</span>
        <span className="text-indigo-500">{problem.op}</span>
        <span>{problem.b}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(opt)}
            className="p-6 bg-slate-100 rounded-2xl text-2xl font-bold hover:bg-indigo-500 hover:text-white transition-colors shadow-sm"
          >
            {opt}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            {feedback === 'correct' ? (
              <CheckCircle className="text-green-500" size={120} />
            ) : (
              <XCircle className="text-red-500" size={120} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
