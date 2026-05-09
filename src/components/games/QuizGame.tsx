import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Star } from 'lucide-react';

const QUESTIONS = [
  { q: "Qaysi sayyorada hayot bor?", opts: ["Mars", "Venera", "Yer", "Yupiter"], a: "Yer" },
  { q: "O'zbekiston poytaxti qaysi shahar?", opts: ["Samarqand", "Buxoro", "Toshkent", "Xiva"], a: "Toshkent" },
  { q: "Quyosh nima?", opts: ["Sayyora", "Yulduz", "Yo'ldosh", "Komet"], a: "Yulduz" },
  { q: "Eng katta hayvon qaysi?", opts: ["Fil", "Zirafa", "Ko'k kit", "Sher"], a: "Ko'k kit" }
];

export default function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAns = (opt: string) => {
    if (opt === QUESTIONS[current].a) setScore(s => s + 1);
    
    if (current + 1 < QUESTIONS.length) {
      setCurrent(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl w-full max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
        <motion.div 
          className="h-full bg-indigo-600" 
          animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full mt-6"
          >
            <div className="flex items-center gap-3 mb-6 text-indigo-600">
              <HelpCircle size={32} />
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Savol {current + 1}/{QUESTIONS.length}</span>
            </div>
            
            <h3 className="text-2xl font-display font-bold text-slate-800 mb-10 leading-tight">
              {QUESTIONS[current].q}
            </h3>

            <div className="grid gap-3">
              {QUESTIONS[current].opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAns(opt)}
                  className="p-4 text-left bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-700"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full mb-6">
              <Star size={48} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">Ajoyib natija!</h2>
            <p className="text-slate-500 mb-8 whitespace-pre-wrap">Siz {QUESTIONS.length} ta savoldan {score} tasiga to'g'ri javob berdingiz.</p>
            <button 
              onClick={reset}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100"
            >
              Qayta urinish
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
