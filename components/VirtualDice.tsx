"use client";

import { useState, useEffect } from "react";
import type { DiceEffect } from "@/lib/diceSystem";

interface VirtualDiceProps {
  onRoll: (effect: DiceEffect) => void;
  disabled?: boolean;
  contentType?: "question" | "challenge" | null;
}

// Iconos eróticos para las caras del dado
const EROTIC_ICONS = {
  question: ["💋", "🔥", "😈", "🍑", "👅", "💦"],
  challenge: ["🔥", "💋", "😈", "🍆", "👄", "💦"],
  default: ["🔥", "💋", "😈", "🍷", "🍑", "👅"],
};

export default function VirtualDice({ onRoll, disabled = false, contentType = null }: VirtualDiceProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentEffect, setCurrentEffect] = useState<DiceEffect | null>(null);
  const [rotation, setRotation] = useState(0);
  const [currentFace, setCurrentFace] = useState(0);
  const [diceRotationX, setDiceRotationX] = useState(0);
  const [diceRotationY, setDiceRotationY] = useState(0);
  
  // Seleccionar iconos según el tipo de contenido
  const icons = contentType 
    ? (contentType === "question" ? EROTIC_ICONS.question : EROTIC_ICONS.challenge)
    : EROTIC_ICONS.default;

  const handleRoll = async () => {
    if (disabled || isRolling) return;

    setIsRolling(true);
    setCurrentEffect(null);

    // Animación de giro 3D más realista
    let spins = 0;
    const maxSpins = 30;
    const spinInterval = setInterval(() => {
      // Rotación en múltiples ejes para efecto 3D
      setDiceRotationX((prev) => prev + Math.random() * 180);
      setDiceRotationY((prev) => prev + Math.random() * 180);
      setRotation((prev) => prev + 60);
      setCurrentFace(Math.floor(Math.random() * icons.length));
      spins++;
      if (spins > maxSpins) {
        clearInterval(spinInterval);
      }
    }, 30);

    // Simular lanzamiento con duración variable
    const rollDuration = 1200 + Math.random() * 400;
    await new Promise((resolve) => setTimeout(resolve, rollDuration));

    // Importar y obtener efecto aleatorio
    const { rollDice } = await import("@/lib/diceSystem");
    const effect = rollDice();
    
    // Seleccionar cara final basada en el efecto
    const finalFace = Math.floor(Math.random() * icons.length);
    setCurrentFace(finalFace);
    
    // Rotación final para mostrar la cara
    setDiceRotationX((prev) => {
      const finalX = Math.floor(Math.random() * 4) * 90;
      return finalX;
    });
    setDiceRotationY((prev) => {
      const finalY = Math.floor(Math.random() * 4) * 90;
      return finalY;
    });
    
    setCurrentEffect(effect);
    setIsRolling(false);
    clearInterval(spinInterval);

    // Llamar callback después de mostrar el efecto
    setTimeout(() => {
      onRoll(effect);
    }, 800);
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
      pink: "bg-pink-500",
      cyan: "bg-cyan-500",
      darkred: "bg-red-800",
      gold: "bg-yellow-400",
    };
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Efecto de resplandor más compacto */}
        <div className="absolute -inset-3 bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 rounded-full blur-xl opacity-60 animate-pulse"></div>
        
        {/* Contenedor 3D del dado - Más compacto */}
        <div 
          className="relative"
          style={{ 
            perspective: '800px',
            width: '100px',
            height: '100px',
          }}
        >
          <button
            onClick={handleRoll}
            disabled={disabled || isRolling}
            className={`relative w-24 h-24 ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isRolling 
                ? `rotateX(${diceRotationX}deg) rotateY(${diceRotationY}deg) rotateZ(${rotation}deg)`
                : `rotateX(${diceRotationX}deg) rotateY(${diceRotationY}deg)`,
              transition: isRolling ? 'none' : 'transform 0.3s ease',
            }}
          >
            {/* Cara frontal */}
            <div 
              className="absolute w-full h-full bg-gradient-to-br from-pink-600 via-purple-600 to-red-600 rounded-2xl shadow-2xl flex items-center justify-center border-2 border-pink-400/50 seductive-glow"
              style={{
                transform: 'translateZ(30px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="text-4xl">
                {isRolling ? icons[currentFace] : icons[0]}
              </span>
            </div>
            
            {/* Cara superior */}
            <div 
              className="absolute w-full h-full bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 rounded-xl shadow-xl flex items-center justify-center border-2 border-rose-400/50"
              style={{
                transform: 'rotateX(90deg) translateZ(25px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="text-4xl">{icons[1]}</span>
            </div>
            
            {/* Cara derecha */}
            <div 
              className="absolute w-full h-full bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 rounded-xl shadow-xl flex items-center justify-center border-2 border-red-400/50"
              style={{
                transform: 'rotateY(90deg) translateZ(25px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="text-4xl">{icons[2]}</span>
            </div>
            
            {/* Cara izquierda */}
            <div 
              className="absolute w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl shadow-xl flex items-center justify-center border-2 border-purple-400/50"
              style={{
                transform: 'rotateY(-90deg) translateZ(25px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="text-4xl">{icons[3]}</span>
            </div>
            
            {/* Cara inferior */}
            <div 
              className="absolute w-full h-full bg-gradient-to-br from-pink-600 via-red-600 to-purple-600 rounded-xl shadow-xl flex items-center justify-center border-2 border-pink-400/50"
              style={{
                transform: 'rotateX(-90deg) translateZ(25px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="text-4xl">{icons[4]}</span>
            </div>
            
            {/* Cara trasera */}
            <div 
              className="absolute w-full h-full bg-gradient-to-br from-rose-600 via-red-600 to-pink-600 rounded-xl shadow-xl flex items-center justify-center border-2 border-rose-400/50"
              style={{
                transform: 'rotateY(180deg) translateZ(25px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="text-4xl">{icons[5]}</span>
            </div>
          </button>
        </div>
      </div>
      
      {isRolling && (
        <div className="text-center mt-2">
          <p className="text-pink-400 font-bold text-xs animate-pulse">
            🔥 Lanzando...
          </p>
        </div>
      )}

      {currentEffect && !isRolling && (
        <div
          className={`mt-2 p-3 rounded-lg shadow-lg border neon-border animate-fadeIn glass-effect ${
            getColorClass(currentEffect.color)
          }`}
        >
          <h3 className="text-white font-black text-xs mb-1 text-center neon-text">
            {currentEffect.name}
          </h3>
          <p className="text-white/95 text-xs text-center">
            {currentEffect.description}
          </p>
        </div>
      )}
    </div>
  );
}
