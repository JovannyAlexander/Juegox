"use client";

import { imageConfig } from "@/lib/imageConfig";

interface QuestionCardProps {
  question: string;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div 
      className="relative rounded-2xl p-4 md:p-6 shadow-xl neon-border seductive-glow overflow-hidden h-full flex flex-col bg-zinc-900/60"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 rounded-2xl"></div>
      
      {/* Header compacto */}
      <div className="flex items-center gap-2 mb-3 relative z-20">
        <div className="bg-gradient-to-br from-pink-600/90 via-red-600/90 to-purple-600/90 rounded-full p-2 seductive-glow border border-white/30">
          <span className="text-lg">💭</span>
        </div>
        <h3 className="text-lg md:text-xl font-black text-rose-200 neon-text">
          Pregunta Picante
        </h3>
      </div>
      
      {/* Contenido */}
      <div className="relative z-20 flex-1 flex items-center">
        <p className="text-white text-base md:text-lg leading-relaxed font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {question}
        </p>
      </div>
      
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000" 
           style={{
             backgroundPosition: '-200% center',
             animation: 'glass-shine 3s infinite'
           }}>
      </div>
    </div>
  );
}
