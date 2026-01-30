"use client";

import { useState } from "react";
import type { GameMode, Player, IntensityLevel, LiquorConfig } from "@/lib/gameLogic";
import { imageConfig } from "@/lib/imageConfig";

interface GameSetupProps {
  onGameStart: (
    players: Player[],
    mode: GameMode,
    intensity: IntensityLevel,
    liquorConfig: LiquorConfig
  ) => void;
}

export default function GameSetup({ onGameStart }: GameSetupProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [gameMode, setGameMode] = useState<GameMode>("competitive");
  const [intensity, setIntensity] = useState<IntensityLevel>("moderado");
  const [liquorEnabled, setLiquorEnabled] = useState(false);
  const [liquorType, setLiquorType] = useState<"cerveza" | "trago" | null>(null);

  const handleAddPlayer = () => {
    if (playerName.trim() && players.length < 10) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: playerName.trim(),
      };
      setPlayers([...players, newPlayer]);
      setPlayerName("");
    }
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      const liquorConfig: LiquorConfig = {
        enabled: liquorEnabled,
        type: liquorEnabled ? (liquorType || "cerveza") : null,
      };
      onGameStart(players, gameMode, intensity, liquorConfig);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPlayer();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4">
      {/* Header creativo con efecto glassmorphism */}
      <div className="text-center mb-8 relative">
        <div className="inline-block glass-effect px-6 py-4 md:px-10 md:py-6 rounded-[2rem] neon-border seductive-glow mb-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-pink-400 via-red-400 to-purple-400 bg-clip-text text-transparent leading-none">
            🔥 Configura tu Noche 💋
          </h2>
          <p className="text-pink-200 text-xs md:text-base lg:text-lg font-black tracking-widest uppercase">Prepara la experiencia más intensa</p>
        </div>
      </div>

      <div 
        className="rounded-[2.5rem] p-5 md:p-8 lg:p-10 shadow-2xl neon-border overflow-hidden relative glass-effect backdrop-blur-xl bg-zinc-900/40 border border-white/10"
      >
        {/* Overlay mejorado con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/30 to-black/70 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl"></div>
        <div className="relative z-10 space-y-8">

        {/* Selector de Modo - Rediseñado */}
        <div>
          <label className="block text-xs md:text-sm font-black mb-4 text-pink-200 uppercase tracking-[0.2em] ml-1">
            🎮 Modo de Juego
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              onClick={() => setGameMode("competitive")}
              className={`px-4 py-4 rounded-2xl font-black transition-all text-xs md:text-sm relative overflow-hidden group border ${
                gameMode === "competitive"
                  ? "bg-gradient-to-br from-pink-600 to-red-600 text-white shadow-2xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10">🏆 Competitivo</span>
            </button>
            <button
              onClick={() => setGameMode("extreme")}
              className={`px-4 py-4 rounded-2xl font-black transition-all text-xs md:text-sm relative overflow-hidden group border ${
                gameMode === "extreme"
                  ? "bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-2xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10">🔥 Extremo</span>
            </button>
            <button
              onClick={() => setGameMode("mix")}
              className={`px-4 py-4 rounded-2xl font-black transition-all text-xs md:text-sm relative overflow-hidden group border ${
                gameMode === "mix"
                  ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10">🎲 Mixto</span>
            </button>
            <button
              onClick={() => setGameMode("questions")}
              className={`px-4 py-4 rounded-2xl font-black transition-all text-xs md:text-sm relative overflow-hidden group border ${
                gameMode === "questions"
                  ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10">💭 Preguntas</span>
            </button>
            <button
              onClick={() => setGameMode("challenges")}
              className={`px-4 py-4 rounded-2xl font-black transition-all text-xs md:text-sm relative overflow-hidden group border ${
                gameMode === "challenges"
                  ? "bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10">⚡ Desafíos</span>
            </button>
          </div>
        </div>

        {/* Selector de Intensidad - Rediseñado */}
        <div>
          <label className="block text-xs md:text-sm font-black mb-4 text-pink-200 uppercase tracking-[0.2em] ml-1">
            🔥 Nivel de Intensidad
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => setIntensity("suave")}
              className={`px-4 py-3.5 rounded-2xl font-black transition-all text-[10px] md:text-xs relative overflow-hidden group border ${
                intensity === "suave"
                  ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10 uppercase tracking-widest">🌿 Suave</span>
            </button>
            <button
              onClick={() => setIntensity("moderado")}
              className={`px-4 py-3.5 rounded-2xl font-black transition-all text-[10px] md:text-xs relative overflow-hidden group border ${
                intensity === "moderado"
                  ? "bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10 uppercase tracking-widest">⚡ Moderado</span>
            </button>
            <button
              onClick={() => setIntensity("extremo")}
              className={`px-4 py-3.5 rounded-2xl font-black transition-all text-[10px] md:text-xs relative overflow-hidden group border ${
                intensity === "extremo"
                  ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl scale-105 border-white/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10 uppercase tracking-widest">🔥 Extremo</span>
            </button>
            <button
              onClick={() => setIntensity("insano")}
              className={`px-4 py-3.5 rounded-2xl font-black transition-all text-[10px] md:text-xs relative overflow-hidden group border ${
                intensity === "insano"
                  ? "bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-xl scale-105 border-white/30 animate-pulse"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border-white/5"
              }`}
            >
              <span className="relative z-10 uppercase tracking-widest">💀 Insano</span>
            </button>
          </div>
        </div>

        {/* Configuración de Licor */}
        <div>
          <label className="block text-xs md:text-sm font-black mb-4 text-pink-200 uppercase tracking-[0.2em] ml-1">
            🍷 Configuración de Licor
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
              <button
                onClick={() => {
                  setLiquorEnabled(false);
                  setLiquorType(null);
                }}
                className={`flex-1 sm:px-8 py-3 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${
                  !liquorEnabled
                    ? "bg-white text-black shadow-2xl"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                Sin Licor
              </button>
              <button
                onClick={() => setLiquorEnabled(true)}
                className={`flex-1 sm:px-8 py-3 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${
                  liquorEnabled
                    ? "bg-amber-500 text-white shadow-2xl"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                Con Licor
              </button>
            </div>

            {liquorEnabled && (
              <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto animate-fadeIn">
                <button
                  onClick={() => setLiquorType("cerveza")}
                  className={`flex-1 sm:px-6 py-3 rounded-xl font-black transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${
                    liquorType === "cerveza"
                      ? "bg-amber-500 text-white shadow-2xl"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <span>🍺 CERVEZA</span>
                </button>
                <button
                  onClick={() => setLiquorType("trago")}
                  className={`flex-1 sm:px-6 py-3 rounded-xl font-black transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${
                    liquorType === "trago"
                      ? "bg-amber-600 text-white shadow-2xl"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <span>🥃 TRAGO</span>
                </button>
              </div>
            )}
          </div>

          {liquorEnabled && (
            <div className="mt-4 p-4 bg-amber-900/20 border border-amber-500/20 rounded-2xl animate-slideIn">
              <p className="text-[10px] md:text-xs text-amber-200/80 text-center font-bold uppercase tracking-widest leading-relaxed">
                ⚠️ Consumo Responsable: Si eliges jugar con licor, hazlo respetando tus límites.
              </p>
            </div>
          )}
        </div>

        {/* Agregar Jugadores */}
        <div>
          <label className="block text-xs md:text-sm font-black mb-4 text-pink-200 uppercase tracking-[0.2em] ml-1">
            👥 Jugadores ({players.length}/10)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="NOMBRE DEL JUGADOR..."
              className="flex-1 px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all font-black text-xs uppercase tracking-widest"
              maxLength={20}
            />
            <button
              onClick={handleAddPlayer}
              disabled={!playerName.trim() || players.length >= 10}
              className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-pink-500 hover:text-white disabled:bg-white/10 disabled:text-white/20 disabled:cursor-not-allowed transition-all shadow-2xl uppercase tracking-widest text-xs"
            >
              Agregar +
            </button>
          </div>
        </div>

        {/* Lista de Jugadores */}
        {players.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-pink-500/20 rounded-full text-pink-400 font-black text-[10px]">{index + 1}</span>
                  <span className="text-white font-black text-xs uppercase tracking-widest">{player.name}</span>
                </div>
                <button
                  onClick={() => handleRemovePlayer(player.id)}
                  className="text-white/20 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botón Iniciar - Súper Creativo */}
        <div className="pt-4">
          <button
            onClick={handleStartGame}
            disabled={players.length < 2 || (liquorEnabled && !liquorType)}
            className="relative w-full py-6 bg-gradient-to-r from-pink-600 via-red-600 to-purple-600 text-white font-black text-xl md:text-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(255,23,68,0.3)] hover:shadow-[0_20px_60px_rgba(255,23,68,0.5)] transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] disabled:grayscale disabled:opacity-30 disabled:cursor-not-allowed group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center justify-center gap-4 tracking-[0.2em] uppercase">
              {players.length < 2 ? "AGREGA JUGADORES" : "INICIAR LA NOCHE 🔥"}
            </span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
