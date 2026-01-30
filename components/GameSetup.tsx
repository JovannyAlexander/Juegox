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
    <div className="max-w-3xl mx-auto">
      {/* Header creativo con efecto glassmorphism */}
      <div className="text-center mb-6 relative">
        <div className="inline-block glass-effect px-8 py-4 rounded-2xl neon-border seductive-glow mb-4">
          <h2 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-pink-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
            🔥 Configura tu Noche 💋
          </h2>
          <p className="text-pink-200 text-sm md:text-base font-semibold">Prepara la experiencia más intensa</p>
        </div>
      </div>

      <div 
        className="rounded-3xl p-6 md:p-8 shadow-2xl neon-border overflow-hidden relative glass-effect backdrop-blur-xl bg-zinc-900/40"
      >
        {/* Overlay mejorado con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-black/70 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>
        <div className="relative z-10">

        {/* Selector de Modo - Rediseñado */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-3 text-pink-200 neon-text">
            🎮 Modo de Juego
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              onClick={() => setGameMode("competitive")}
              className={`px-4 py-3 rounded-xl font-bold transition-all text-sm relative overflow-hidden group ${
                gameMode === "competitive"
                  ? "bg-gradient-to-br from-pink-600 to-red-600 text-white shadow-xl scale-105 neon-border"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              {gameMode === "competitive" && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
              <span className="relative z-10">🏆 Competitivo</span>
            </button>
            <button
              onClick={() => setGameMode("extreme")}
              className={`px-4 py-3 rounded-xl font-bold transition-all text-sm relative overflow-hidden group ${
                gameMode === "extreme"
                  ? "bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-xl scale-105 neon-border"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              {gameMode === "extreme" && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
              <span className="relative z-10">🔥 Extremo</span>
            </button>
            <button
              onClick={() => setGameMode("mix")}
              className={`px-4 py-3 rounded-xl font-bold transition-all text-sm relative overflow-hidden group ${
                gameMode === "mix"
                  ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl scale-105 neon-border"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              {gameMode === "mix" && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
              <span className="relative z-10">🎲 Mixto</span>
            </button>
            <button
              onClick={() => setGameMode("questions")}
              className={`px-4 py-3 rounded-xl font-bold transition-all text-sm relative overflow-hidden group ${
                gameMode === "questions"
                  ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl scale-105 neon-border"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              {gameMode === "questions" && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
              <span className="relative z-10">💭 Preguntas</span>
            </button>
            <button
              onClick={() => setGameMode("challenges")}
              className={`px-4 py-3 rounded-xl font-bold transition-all text-sm relative overflow-hidden group ${
                gameMode === "challenges"
                  ? "bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-xl scale-105 neon-border"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              {gameMode === "challenges" && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
              <span className="relative z-10">⚡ Desafíos</span>
            </button>
          </div>
        </div>

        {/* Selector de Intensidad - Rediseñado */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-3 text-pink-200 neon-text">
            🔥 Nivel de Intensidad
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => setIntensity("suave")}
              className={`px-3 py-2.5 rounded-xl font-bold transition-all text-xs relative overflow-hidden group ${
                intensity === "suave"
                  ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg scale-105 border-2 border-green-400"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              <span className="relative z-10">🌿 Suave</span>
            </button>
            <button
              onClick={() => setIntensity("moderado")}
              className={`px-3 py-2.5 rounded-xl font-bold transition-all text-xs relative overflow-hidden group ${
                intensity === "moderado"
                  ? "bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg scale-105 border-2 border-yellow-400"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              <span className="relative z-10">⚡ Moderado</span>
            </button>
            <button
              onClick={() => setIntensity("extremo")}
              className={`px-3 py-2.5 rounded-xl font-bold transition-all text-xs relative overflow-hidden group ${
                intensity === "extremo"
                  ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg scale-105 border-2 border-orange-400"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              <span className="relative z-10">🔥 Extremo</span>
            </button>
            <button
              onClick={() => setIntensity("insano")}
              className={`px-3 py-2.5 rounded-xl font-bold transition-all text-xs relative overflow-hidden group ${
                intensity === "insano"
                  ? "bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-lg scale-105 border-2 border-red-400 animate-pulse"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
              }`}
            >
              <span className="relative z-10">💀 Insano</span>
            </button>
          </div>
        </div>

        {/* Configuración de Licor */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-gray-300">
            🍷 Configuración de Licor
          </label>
          
          {/* Toggle Con/Sin Licor */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setLiquorEnabled(false);
                  setLiquorType(null);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm ${
                  !liquorEnabled
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Sin Licor
              </button>
              <button
                onClick={() => setLiquorEnabled(true)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm ${
                  liquorEnabled
                    ? "bg-amber-600 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Con Licor
              </button>
            </div>
          </div>

          {/* Selector de Tipo de Licor (solo si Con Licor está activo) */}
          {liquorEnabled && (
            <div className="mt-4">
              <label className="block text-xs font-semibold mb-2 text-gray-400">
                Tipo de Licor
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLiquorType("cerveza")}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all text-sm flex items-center justify-center gap-2 ${
                    liquorType === "cerveza"
                      ? "bg-amber-500 text-white shadow-lg scale-105"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <span className="text-xl">🍺</span>
                  <span>Cerveza</span>
                </button>
                <button
                  onClick={() => setLiquorType("trago")}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all text-sm flex items-center justify-center gap-2 ${
                    liquorType === "trago"
                      ? "bg-amber-500 text-white shadow-lg scale-105"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <span className="text-xl">🥃</span>
                  <span>Trago</span>
                </button>
              </div>
            </div>
          )}

          {/* Advertencia sobre consumo responsable */}
          {liquorEnabled && (
            <div className="mt-4 p-3 bg-amber-900/30 border border-amber-600/50 rounded-lg">
              <p className="text-xs text-amber-200 text-center">
                ⚠️ <strong>Consumo Responsable:</strong> Bebe con moderación. Si eliges jugar con licor, hazlo de forma responsable y respeta tus límites.
              </p>
            </div>
          )}
        </div>

        {/* Agregar Jugadores - Rediseñado */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-3 text-pink-200 neon-text">
            👥 Agregar Jugadores ({players.length}/10)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre del jugador..."
              className="flex-1 px-4 py-3 bg-gray-800/70 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all backdrop-blur-sm"
              maxLength={20}
            />
            <button
              onClick={handleAddPlayer}
              disabled={!playerName.trim() || players.length >= 10}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-lg transform hover:scale-105 disabled:transform-none"
            >
              ➕ Agregar
            </button>
          </div>
        </div>

        {/* Lista de Jugadores - Rediseñada */}
        {players.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3 text-pink-200 neon-text">
              🎯 Jugadores ({players.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-gradient-to-r from-gray-800/70 to-gray-700/70 p-3 rounded-xl border border-gray-600/50 hover:border-pink-500/50 transition-all backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400 font-bold">#{index + 1}</span>
                    <span className="text-white font-semibold">{player.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="text-red-400 hover:text-red-300 font-bold text-xl hover:scale-125 transition-transform"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón Iniciar - Súper Creativo */}
        <div className="relative mt-6">
          {/* Efectos de resplandor animados */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-red-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 rounded-2xl blur-sm opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          <button
            onClick={handleStartGame}
            disabled={players.length < 2 || (liquorEnabled && !liquorType)}
            className="relative w-full py-5 bg-gradient-to-r from-pink-600 via-red-600 via-purple-600 to-pink-600 text-white font-black text-xl rounded-xl disabled:from-gray-700 disabled:via-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none overflow-hidden group"
            style={{
              backgroundSize: '200% 200%',
              animation: players.length >= 2 && (!liquorEnabled || liquorType) ? 'gradient-shift 3s ease infinite' : 'none',
            }}
          >
            {/* Efecto de brillo que se mueve */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Contenido del botón */}
            <div className="relative z-10 flex items-center justify-center gap-3">
              {players.length < 2 ? (
                <>
                  <span className="text-2xl animate-bounce">👥</span>
                  <span>Agrega al menos 2 jugadores ({players.length}/2)</span>
                </>
              ) : liquorEnabled && !liquorType ? (
                <>
                  <span className="text-2xl animate-pulse">🍷</span>
                  <span>Selecciona un tipo de licor</span>
                </>
              ) : (
                <>
                  <span className="text-3xl animate-pulse">🔥</span>
                  <span className="text-2xl font-black tracking-wider">INICIAR LA NOCHE</span>
                  <span className="text-3xl animate-pulse">💋</span>
                </>
              )}
            </div>
            
            {/* Partículas decorativas */}
            {players.length >= 2 && (!liquorEnabled || liquorType) && (
              <>
                <div className="absolute top-2 left-4 text-2xl opacity-70 animate-bounce" style={{ animationDelay: '0s' }}>✨</div>
                <div className="absolute top-2 right-4 text-2xl opacity-70 animate-bounce" style={{ animationDelay: '0.3s' }}>⭐</div>
                <div className="absolute bottom-2 left-8 text-2xl opacity-70 animate-bounce" style={{ animationDelay: '0.6s' }}>💫</div>
                <div className="absolute bottom-2 right-8 text-2xl opacity-70 animate-bounce" style={{ animationDelay: '0.9s' }}>🌟</div>
              </>
            )}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
