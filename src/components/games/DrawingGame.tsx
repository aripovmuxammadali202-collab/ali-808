import { useRef, useState, useEffect } from 'react';
import type { MouseEvent, TouchEvent } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Download, Eraser, Pen } from 'lucide-react';

export default function DrawingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#6366f1');
  const [brushSize, setBrushSize] = useState(5);
  const [mode, setMode] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = mode === 'eraser' ? '#ffffff' : color;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-auto border-4 border-indigo-100">
      <div className="flex flex-wrap items-center justify-between w-full mb-4 gap-4 bg-slate-50 p-4 rounded-2xl">
        <div className="flex gap-2">
          {['#6366f1', '#ef4444', '#10b981', '#f59e0b', '#000000'].map(c => (
            <button 
              key={c}
              onClick={() => { setColor(c); setMode('pen'); }}
              className={`w-8 h-8 rounded-full border-2 ${color === c && mode === 'pen' ? 'border-slate-800 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-24 accent-indigo-600"
          />
          <span className="text-xs font-bold w-6">{brushSize}</span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setMode('pen')} 
            className={`p-2 rounded-lg ${mode === 'pen' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border'}`}
          >
            <Pen size={18} />
          </button>
          <button 
            onClick={() => setMode('eraser')} 
            className={`p-2 rounded-lg ${mode === 'eraser' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border'}`}
          >
            <Eraser size={18} />
          </button>
          <button onClick={clear} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={18} /></button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-auto rounded-xl shadow-inner cursor-crosshair touch-none border"
      />
      
      <p className="mt-4 text-slate-400 text-sm italic">O'z tasavvuringizni chizing!</p>
    </div>
  );
}
