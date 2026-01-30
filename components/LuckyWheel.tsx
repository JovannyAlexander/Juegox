"use client";

import { useState, useRef, useEffect } from "react";
import type { DiceEffect } from "@/lib/diceSystem";

interface LuckyWheelProps {
  onRoll: (effect: DiceEffect) => void;
  disabled?: boolean;
  contentType?: "question" | "challenge" | null;
}

const EROTIC_ICONS = {
  question: ["💋", "🔥", "😈", "🍑", "👅", "💦", "🔞", "💄"],
  challenge: ["🔥", "💋", "😈", "🍆", "👄", "💦", "⛓️", "👠"],
  default: ["🔥", "💋", "😈", "🍷", "🍑", "👅", "🔞", "🍸"],
};

export default function LuckyWheel({ onRoll, disabled = false, contentType = null }: LuckyWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentEffect, setCurrentEffect] = useState<DiceEffect | null>(null);
  const [rotation, setRotation] = useState(0);
  const totalRotationRef = useRef(0);
  
  const icons = contentType 
    ? (contentType === "question" ? EROTIC_ICONS.question : EROTIC_ICONS.challenge)
    : EROTIC_ICONS.default;

  const sections = icons.length;
  const anglePerSection = 360 / sections;

  const handleSpin = async () => {
    if (disabled || isSpinning) return;

    setIsSpinning(true);
    setCurrentEffect(null);

    const { rollDice } = await import("@/lib/diceSystem");
    const effect = rollDice();

    // Giro fluido acumulativo
    const extraSpins = 5 + Math.random() * 5; // 5-10 vueltas
    const randomAngle = Math.random() * 360;
    totalRotationRef.current += (extraSpins * 360) + randomAngle;
    
    setRotation(totalRotationRef.current);

    // Esperar a que termine la animación (coincide con duration-5000 en CSS)
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentEffect(effect);
      onRoll(effect);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative group">
        {/* Luces de neón externas */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
        
        {/* Contenedor principal de la ruleta */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
          
          {/* La Ruleta Física */}
          <div 
            className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-white/20 shadow-[0_0_50px_rgba(255,23,68,0.5)] overflow-hidden relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)' : 'transform 0.5s ease-out',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {icons.map((icon, i) => {
                const startAngle = (i * 360) / sections;
                const endAngle = ((i + 1) * 360) / sections;
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
                
                return (
                  <g key={i}>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                      fill={i % 2 === 0 ? "rgba(255, 23, 68, 0.8)" : "rgba(194, 24, 91, 0.8)"}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                    />
                    <text
                      x="75"
                      y="50"
                      transform={`rotate(${(startAngle + endAngle) / 2}, 50, 50)`}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                      className="drop-shadow-md"
                    >
                      {icon}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Puntero Superior */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-yellow-400"></div>
          </div>

          {/* Botón Central de Disparo */}
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <button
              onClick={handleSpin}
              disabled={disabled || isSpinning}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center transition-all duration-300 active:scale-90 ${
                isSpinning ? 'scale-110 blur-sm' : 'hover:scale-110'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white font-black text-xl border-2 border-white/20">
                {isSpinning ? "🔥" : "GO"}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Efecto Resultante Compacto */}
      <div className="mt-2 h-16 flex items-center justify-center overflow-hidden w-full">
        {isSpinning ? (
          <div className="text-pink-400 font-black text-sm animate-pulse tracking-widest uppercase">
            Sintiendo el destino...
          </div>
        ) : currentEffect ? (
          <div className="animate-fadeIn bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-pink-500/30 text-center">
            <div className="text-pink-300 font-bold text-xs uppercase tracking-tighter">{currentEffect.name}</div>
            <div className="text-white text-[10px] leading-tight opacity-80">{currentEffect.description}</div>
          </div>
        ) : (
          <div className="text-white/20 text-[10px] uppercase font-bold tracking-widest italic">
            Gira para activar bonus
          </div>
        )}
      </div>
    </div>
  );
}
