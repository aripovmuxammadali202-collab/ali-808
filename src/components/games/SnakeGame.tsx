import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment.x === newFood!.x && segment.y === newFood!.y)) break;
    }
    setFood(newFood);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    // Wall collision
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      setIsGameOver(true);
      return;
    }

    // Body collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setIsGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(s => s + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver, generateFood]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, 200);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
      case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
      case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
      case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-6 rounded-3xl shadow-2xl w-full max-w-sm mx-auto">
      <div className="flex justify-between w-full mb-4 text-white font-display font-bold">
        <span className="text-xl">Score: {score}</span>
        {isGameOver && <span className="text-red-400">O'yin tugadi!</span>}
      </div>

      <div 
        className="grid bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-700 relative"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(100%, 300px)',
          aspectRatio: '1/1'
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div key={i} className="w-full h-full p-[1px]">
              <div className={`w-full h-full rounded-sm ${
                isHead ? 'bg-indigo-400' : 
                isSnake ? 'bg-indigo-600' : 
                isFood ? 'bg-red-500 animate-pulse' : 'bg-transparent'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        <div />
        <button onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })} className="p-4 bg-slate-700 rounded-xl text-white"><ChevronUp /></button>
        <div />
        <button onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })} className="p-4 bg-slate-700 rounded-xl text-white"><ChevronLeft /></button>
        <button onClick={resetGame} className="p-4 bg-indigo-600 rounded-xl text-white"><RotateCcw /></button>
        <button onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })} className="p-4 bg-slate-700 rounded-xl text-white"><ChevronRight /></button>
        <div />
        <button onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })} className="p-4 bg-slate-700 rounded-xl text-white"><ChevronDown /></button>
        <div />
      </div>
    </div>
  );
}
