import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Brain, 
  Calculator, 
  Palette, 
  Zap, 
  Grid, 
  X, 
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Rocket,
  Search
} from 'lucide-react';

// Games
import MemoryGame from './components/games/MemoryGame';
import TicTacToe from './components/games/TicTacToe';
import MathChallenge from './components/games/MathChallenge';
import SnakeGame from './components/games/SnakeGame';
import DrawingGame from './components/games/DrawingGame';
import ColorMaster from './components/games/ColorMaster';
import WhackAMole from './components/games/WhackAMole';
import SimonSays from './components/games/SimonSays';
import RockPaperScissors from './components/games/RockPaperScissors';
import ClickSpeed from './components/games/ClickSpeed';
import GuessNumber from './components/games/GuessNumber';
import QuizGame from './components/games/QuizGame';
import WordScramble from './components/games/WordScramble';
import BalloonPop from './components/games/BalloonPop';
import FruitCatch from './components/games/FruitCatch';

type Game = {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  component: any;
  category: 'logic' | 'math' | 'creative' | 'action';
};

const GAME_TEMPLATES = [
  { component: MemoryGame, icon: Brain, color: 'bg-indigo-500', name: 'Xotira', desc: 'Juftliklarni toping' },
  { component: TicTacToe, icon: Grid, color: 'bg-amber-500', name: 'X va O', desc: 'Strategik jang' },
  { component: MathChallenge, icon: Calculator, color: 'bg-emerald-500', name: 'Hisob', desc: 'Tezkor matematika' },
  { component: SnakeGame, icon: Gamepad2, color: 'bg-rose-500', name: 'Iloncha', desc: 'Klassik sarguzasht' },
  { component: DrawingGame, icon: Palette, color: 'bg-fuchsia-500', name: 'Rasm', desc: 'Ijodkorlik olami' },
  { component: ColorMaster, icon: Zap, color: 'bg-orange-500', name: 'Ranglar', desc: 'Diqqat testi' },
  { component: WhackAMole, icon: Zap, color: 'bg-amber-600', name: 'Urish', desc: 'Tezkor reaksiya' },
  { component: SimonSays, icon: Brain, color: 'bg-slate-800', name: 'Saymon', desc: 'Ketma-ketlik' },
  { component: RockPaperScissors, icon: Grid, color: 'bg-blue-500', name: 'Tosh-Qaychi', desc: 'Omad o\'yini' },
  { component: ClickSpeed, icon: Zap, color: 'bg-indigo-600', name: 'Bosish', desc: 'Tezlik rekordi' },
  { component: GuessNumber, icon: Calculator, color: 'bg-emerald-600', name: 'Topishmoq', desc: 'Sonni toping' },
  { component: QuizGame, icon: Search, color: 'bg-fuchsia-600', name: 'Quiz', desc: 'Bilim sinovi' },
  { component: WordScramble, icon: Brain, color: 'bg-violet-500', name: 'So\'z', desc: 'Harflar jangi' },
  { component: BalloonPop, icon: Gamepad2, color: 'bg-sky-500', name: 'Sharlar', desc: 'Pufash vaqti' },
  { component: FruitCatch, icon: Palette, color: 'bg-green-500', name: 'Savat', desc: 'Meva yig\'ish' },
];

const VARIANT_NAMES = [
  'Koinot', 'Oila', 'O\'rmon', 'Dengiz', 'Sahro', 'Shahar', 'Robot', 'Superqahramon', 'Sehrli', 'Qishloq',
  'Rang-barang', 'Uchar', 'Muzli', 'Yashirin', 'Kattalar uchun', 'Bolalar uchun', 'Maktab', 'Bayram', 'Sport', 'Musiqa'
];

const ALL_GAMES: Game[] = Array.from({ length: 100 }).map((_, i) => {
  const templateIdx = i % GAME_TEMPLATES.length;
  const variantIdx = Math.floor(i / GAME_TEMPLATES.length) % VARIANT_NAMES.length;
  
  const template = GAME_TEMPLATES[templateIdx];
  const variant = VARIANT_NAMES[variantIdx];
  
  const categories: Game['category'][] = ['logic', 'math', 'creative', 'action'];

  return {
    id: `game-${i}`,
    title: `${variant} ${template.name}`,
    description: `${variant} uslubidagi qiziqarli ${template.name.toLowerCase()} o'yini.`,
    icon: template.icon,
    color: template.color,
    category: categories[i % categories.length],
    component: template.component,
  };
});

export default function App() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | Game['category']>('all');

  const filteredGames = ALL_GAMES.filter(g => 
    (filter === 'all' || g.category === filter) &&
    (g.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Sparkles size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold tracking-tight text-slate-900">Creativ Bolalar</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Ijod va Bilim</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {['all', 'logic', 'math', 'creative', 'action'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    filter === cat 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'Hammasi' : cat === 'logic' ? 'Mantiq' : cat === 'math' ? 'Matematika' : cat === 'creative' ? 'Ijodiy' : 'Aksiya'}
                </button>
              ))}
            </nav>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="O'yin qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-xl w-48 lg:w-64 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-2">Salom, Yosh Do'stim! 👋</h2>
          <p className="text-lg text-slate-600">Bugun qaysi o'yinni tanlaysan? Senda 100 dan ortiq tanlov bor!</p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden flex flex-col justify-end min-h-[320px]"
          >
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Hafta O'yini</span>
              <h3 className="text-4xl lg:text-5xl font-display font-bold mb-4">Xotira Mashqi</h3>
              <p className="text-indigo-100 text-lg mb-8 max-w-md">Diqqatingizni jamlang va mahoratingizni ko'rsatib bal to'plang!</p>
              <button 
                onClick={() => setActiveGame(ALL_GAMES[0])}
                className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 w-fit"
              >
                Hozir O'yna <ChevronRight size={20} />
              </button>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none flex items-center justify-center">
              <Brain size={240} className="stroke-[1px]" />
            </div>
          </motion.div>

          <div className="lg:col-span-4 grid grid-rows-2 gap-6 text-white ">
            <div className="bg-amber-500 rounded-3xl p-6 relative overflow-hidden group">
              <h4 className="text-xl font-display font-bold mb-1">Mantiqiy Savollar</h4>
              <p className="text-amber-100 text-sm">Miyyangizni charxlang</p>
              <ArrowLeft className="rotate-180 absolute bottom-6 right-6 text-white/50 group-hover:translate-x-2 transition-transform" />
            </div>
            <div className="bg-emerald-500 rounded-3xl p-6 relative overflow-hidden group">
              <h4 className="text-xl font-display font-bold mb-1">Yangi O'yinlar</h4>
              <p className="text-emerald-100 text-sm">Har kuni yangi sarguzasht</p>
              <Rocket className="absolute bottom-6 right-6 text-white/50 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>

        {/* Categories (Mobile only) */}
        <div className="flex md:hidden overflow-x-auto gap-2 mb-8 pb-2 no-scrollbar">
          {['all', 'logic', 'math', 'creative', 'action'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                filter === cat ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border'
              }`}
            >
              {cat === 'all' ? 'Hammasi' : cat}
            </button>
          ))}
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, idx) => (
              <motion.div
                layout
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (idx % 12) * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveGame(game)}
                className="group cursor-pointer bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all border border-slate-100 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform shadow-lg`}>
                  <game.icon size={32} />
                </div>
                <h4 className="font-display font-bold text-slate-800 mb-2 truncate w-full">{game.title}</h4>
                <div className="flex flex-col gap-2 mt-auto w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 py-1 px-2 rounded-full">{game.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {activeGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10"
          >
            <div 
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" 
              onClick={() => setActiveGame(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-fit max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${activeGame.color} rounded-xl flex items-center justify-center text-white`}>
                    <activeGame.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900">{activeGame.title}</h3>
                    <p className="text-sm text-slate-500">{activeGame.category} o'yini</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveGame(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                {activeGame.component ? (
                  <activeGame.component />
                ) : (
                  <div className="text-center py-20">
                    <Rocket className="mx-auto text-slate-300 mb-4" size={64} />
                    <h2 className="text-2xl font-bold text-slate-400 underline decoration-slate-200">Ushbu o'yin ustida ishlanmoqda</h2>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white border-t flex justify-between items-center text-sm text-slate-500">
                <p>{activeGame.description}</p>
                <div className="flex gap-4 font-bold">
                  <span>Yulduzlar: ⭐ 5.0</span>
                  <span>O'ynaganlar: 1.2k+</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-indigo-600">
            <Sparkles size={24} />
            <span className="font-display font-bold text-xl uppercase tracking-widest">Creativ Bolalar</span>
          </div>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            Bolalar rivojlanishi va xavfsiz o'yin muhiti uchun eng yaxshi tanlov. 
            © 2026 Barcha huquqlar himoyalangan.
          </p>
          <div className="flex justify-center gap-6 text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Biz haqimizda</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Maxfiylik</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Yordam</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
