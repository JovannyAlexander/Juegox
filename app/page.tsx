"use client";

import { useState } from "react";
import Link from "next/link";
import GameSetup from "@/components/GameSetup";
import GameBoard from "@/components/GameBoard";
import type { GameMode, Player, IntensityLevel, LiquorConfig } from "@/lib/gameLogic";
import { imageConfig } from "@/lib/imageConfig";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>("competitive");
  const [intensity, setIntensity] = useState<IntensityLevel>("moderado");
  const [liquorConfig, setLiquorConfig] = useState<LiquorConfig>({
    enabled: false,
    type: null,
  });

  const handleGameStart = (
    newPlayers: Player[],
    mode: GameMode,
    intensityLevel: IntensityLevel,
    config: LiquorConfig
  ) => {
    setPlayers(newPlayers);
    setGameMode(mode);
    setIntensity(intensityLevel);
    setLiquorConfig(config);
    setGameStarted(true);
  };

  const handleGameEnd = () => {
    setGameStarted(false);
    setPlayers([]);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          FONDO PRINCIPAL - HENTAI VOLUPTUOSO CALIENTE
          ═══════════════════════════════════════════════════════════════
          REEMPLAZA esta URL por una imagen de HENTAI:
          ✓ Personaje muy voluptuoso (senos grandes, curvas exageradas)
          ✓ Poca ropa o semi-desnudo (ropa interior mínima, bikini, transparente)
          ✓ Pose provocativa, seductora y caliente
          
          Ejemplos:
          - Danbooru: 'https://cdn.donmai.us/original/XX/XX/[hash].jpg'
          - Gelbooru: 'https://img2.gelbooru.com//images/XX/XX/[hash].jpg'
          - Local: '/images/hentai/fondo.jpg'
          ═══════════════════════════════════════════════════════════════ */}
      <div 
        className="fixed inset-0 z-0 bg-zinc-950"
      >
        {/* Overlay con tonos cálidos y sensuales - mejorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-zinc-950 to-red-950/40"></div>
      </div>

      {/* Efectos de luz ambiente cálidos */}
      <div className="fixed inset-0 pointer-events-none z-1">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-screen flex flex-col">
        {!gameStarted ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 flex-shrink-0 pt-4">
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black mb-2 text-white drop-shadow-[0_0_30px_rgba(255,23,68,0.9)] bg-gradient-to-r from-rose-200 via-pink-200 to-red-200 bg-clip-text text-transparent">
                  🍸 Juego para Grupos 🍷
                </h1>
                <p className="text-rose-100 text-sm md:text-base font-bold flex items-center justify-center md:justify-start gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  <span className="text-xl">💋</span> 
                  <span>Donde la diversión se encuentra con el deseo</span>
                  <span className="text-xl">🔥</span>
                </p>
              </div>
              <Link
                href="/instructions"
                className="px-4 py-2 glass-effect text-white font-bold rounded-xl transition-all seductive-hover shadow-xl border-2 border-pink-500/50 hover:border-pink-400 text-sm"
              >
                📖 Instrucciones
              </Link>
            </div>
            <div className="flex-1 overflow-auto">
              <GameSetup onGameStart={handleGameStart} />
            </div>
          </>
        ) : (
          <GameBoard
            players={players}
            gameMode={gameMode}
            intensity={intensity}
            liquorConfig={liquorConfig}
            onGameEnd={handleGameEnd}
          />
        )}
      </div>
    </main>
  );
}
