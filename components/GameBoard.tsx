"use client";

import { useState, useEffect } from "react";
import type { GameMode, Player, IntensityLevel, LiquorConfig } from "@/lib/gameLogic";
import {
  getNextTurn,
  getNextContent,
} from "@/lib/gameLogic";
import {
  createPlayerScore,
  updateScoreForQuestion,
  updateScoreForChallenge,
  addBonusPoints,
  addPenaltyPoints,
  type PlayerScore,
  type ScoringConfig,
} from "@/lib/scoringSystem";
import { rollDice, type DiceEffect } from "@/lib/diceSystem";
import { getRandomEvent, shouldTriggerEvent } from "@/lib/specialEvents";
import {
  getRandomRoundType,
  shouldActivateSpecialRound,
  isRoundActive,
  type RoundType,
} from "@/lib/roundManager";
import PlayerCard from "./PlayerCard";
import QuestionCard from "./QuestionCard";
import ChallengeCard from "./ChallengeCard";
import ScoreBoard from "./ScoreBoard";
import LuckyWheel from "./LuckyWheel";
import SpecialEventModal from "./SpecialEvent";
import RoundTypeIndicator from "./RoundType";
import { imageConfig } from "@/lib/imageConfig";

interface GameBoardProps {
  players: Player[];
  gameMode: GameMode;
  intensity: IntensityLevel;
  liquorConfig: LiquorConfig;
  onGameEnd: () => void;
}

export default function GameBoard({
  players,
  gameMode,
  intensity,
  liquorConfig,
  onGameEnd,
}: GameBoardProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [usedChallenges, setUsedChallenges] = useState<Set<string>>(new Set());
  const [usedLiquorChallenges, setUsedLiquorChallenges] = useState<Set<string>>(new Set());
  const [scores, setScores] = useState<Map<string, PlayerScore>>(new Map());
  const [currentContent, setCurrentContent] = useState<{
    type: "question" | "challenge";
    content: string;
    category?: string;
    level?: string;
  } | null>(null);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [diceEffect, setDiceEffect] = useState<DiceEffect | null>(null);
  const [specialEvent, setSpecialEvent] = useState<any>(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [activeRound, setActiveRound] = useState<RoundType | null>(null);
  const [roundStart, setRoundStart] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [waitingForSpin, setWaitingForSpin] = useState(true); // Nuevo estado para controlar el flujo

  const currentPlayer = players[currentPlayerIndex];
  const scoringConfig: ScoringConfig = {
    intensity,
    baseQuestionPoints: 10,
    baseChallengePoints: {
      suaves: 20,
      intermedios: 30,
      extremos: 40,
      fisico: 35,
      digital: 30,
      grupo: 50,
      tabu: 60,
      licor: 30,
    },
    multipliers: {
      suave: 1,
      moderado: 1.5,
      extremo: 2,
      insano: 3,
    },
  };

  // Inicializar scores
  useEffect(() => {
    const initialScores = new Map<string, PlayerScore>();
    players.forEach((player) => {
      initialScores.set(player.id, createPlayerScore(player.id));
    });
    setScores(initialScores);

    // El juego comienza esperando el primer giro
    setWaitingForSpin(true);
    setCurrentContent(null);
  }, []);

  // Verificar eventos especiales
  useEffect(() => {
    if (roundNumber > 0 && shouldTriggerEvent(0.15)) {
      const event = getRandomEvent();
      setSpecialEvent(event);
    }
  }, [roundNumber]);

  // Verificar rondas especiales
  useEffect(() => {
    if (shouldActivateSpecialRound(roundNumber) && !activeRound) {
      const round = getRandomRoundType();
      setActiveRound(round);
      setRoundStart(roundNumber);
    }
  }, [roundNumber, activeRound]);

  // Verificar si la ronda especial terminó
  useEffect(() => {
    if (
      activeRound &&
      !isRoundActive(activeRound, roundNumber, roundStart)
    ) {
      setActiveRound(null);
    }
  }, [roundNumber, activeRound, roundStart]);

  const handleDiceRoll = (effect: DiceEffect) => {
    setDiceEffect(effect);
    
    // Aplicar efectos de puntos
    if (effect.type === "multiplier") {
      setCurrentMultiplier(effect.value || 1);
    } else if (effect.type === "bonus") {
      const currentScore = scores.get(currentPlayer.id);
      if (currentScore) {
        const updated = addBonusPoints(currentScore, effect.value || 0);
        setScores(new Map(scores).set(currentPlayer.id, updated));
      }
    } else if (effect.type === "penalty") {
      const currentScore = scores.get(currentPlayer.id);
      if (currentScore) {
        const updated = addPenaltyPoints(currentScore, effect.value || 0);
        setScores(new Map(scores).set(currentPlayer.id, updated));
      }
    }

    // ¡IMPORTANTE!: Ahora que la ruleta paró, cargamos el reto/pregunta
    const roundType = activeRound
      ? {
          category: activeRound.category,
          type: activeRound.type,
        }
      : undefined;

    const content = getNextContent(
      gameMode,
      usedQuestions,
      usedChallenges,
      intensity,
      roundType,
      liquorConfig,
      usedLiquorChallenges
    );

    if (content) {
      setCurrentContent(content);
      setUsedQuestions(new Set(usedQuestions));
      setUsedChallenges(new Set(usedChallenges));
      setUsedLiquorChallenges(new Set(usedLiquorChallenges));
      setWaitingForSpin(false); // Ya no estamos esperando, el reto está visible
    }
  };

  const handleComplete = (completed: boolean = true) => {
    if (!currentContent) return;

    const currentScore = scores.get(currentPlayer.id) || createPlayerScore(currentPlayer.id);
    let updatedScore: PlayerScore;

    if (currentContent.type === "question") {
      const multiplier =
        activeRound?.multiplier || currentMultiplier || 1;
      updatedScore = updateScoreForQuestion(
        currentScore,
        scoringConfig,
        multiplier
      );
      setScores(new Map(scores).set(currentPlayer.id, updatedScore));
      
      // Para preguntas: avanzar automáticamente al siguiente jugador después de un breve delay
      setTimeout(() => {
        handleNext();
      }, 800); // Delay de 800ms para mostrar el feedback visual
    } else {
      const level = (currentContent.level as any) || "intermedios";
      const multiplier =
        activeRound?.multiplier || currentMultiplier || 1;
      updatedScore = updateScoreForChallenge(
        currentScore,
        level,
        scoringConfig,
        multiplier,
        completed
      );
      setScores(new Map(scores).set(currentPlayer.id, updatedScore));
      setChallengeCompleted(true);
    }
  };

  const handleNext = () => {
    setChallengeCompleted(false);
    setDiceEffect(null);
    setCurrentMultiplier(1);
    const nextIndex = getNextTurn(currentPlayerIndex, players.length);
    setCurrentPlayerIndex(nextIndex);
    setRoundNumber((prev) => prev + 1);
    
    // Limpiamos contenido y esperamos al nuevo giro
    setCurrentContent(null);
    setWaitingForSpin(true);
  };

  const handleNewContent = () => {
    const roundType = activeRound
      ? {
          category: activeRound.category,
          type: activeRound.type,
        }
      : undefined;

    const content = getNextContent(
      gameMode,
      usedQuestions,
      usedChallenges,
      intensity,
      roundType,
      liquorConfig,
      usedLiquorChallenges
    );
    if (content) {
      setCurrentContent(content);
      setUsedQuestions(new Set(usedQuestions));
      setUsedChallenges(new Set(usedChallenges));
      setUsedLiquorChallenges(new Set(usedLiquorChallenges));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 h-screen flex flex-col overflow-hidden font-sans">
      
      {/* 1. HEADER ULTRA COMPACTO */}
      <div className="flex items-center justify-between py-2 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            <span className="text-white font-bold text-xs uppercase tracking-tighter">{currentPlayer.name}</span>
          </div>
          {liquorConfig.enabled && (
            <div className="px-2 py-1 bg-amber-500/20 rounded-md border border-amber-500/30 text-[10px] font-black text-amber-200 uppercase tracking-widest">
              {liquorConfig.type === "cerveza" ? "🍺 CERVEZA" : "🥃 TRAGO"}
            </div>
          )}
        </div>
        
        <div className="flex gap-1">
          {activeRound && (
            <div className="px-3 py-1 bg-red-600/40 rounded-full border border-red-500/50 animate-pulse">
              <span className="text-white text-[10px] font-black uppercase tracking-widest italic">{activeRound.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. ÁREA CENTRAL DE JUEGO */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 py-4 min-h-0">
        
        {/* Columna Izquierda: CONTENIDO (TARJETA) */}
        <div className="flex-[1.5] flex flex-col min-h-0">
          <div className="flex-1 bg-black/40 rounded-[2rem] border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
            {/* Fondo con color sólido suave */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-950/20 via-zinc-900 to-red-950/20"></div>
            
            {/* Gradiente interno */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            {/* Contenido de la tarjeta */}
            <div className="relative h-full flex flex-col p-6 md:p-10">
              <div className="mb-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl ${
                  currentContent?.type === 'question' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {currentContent?.type === 'question' ? '💌 PREGUNTA' : '🔥 DESAFÍO'}
                </span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                {waitingForSpin ? (
                  <div className="flex flex-col items-center gap-6 animate-fadeIn">
                    <div className="text-pink-500 text-6xl md:text-8xl animate-bounce">🎯</div>
                    <div className="text-center">
                      <p className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter mb-2">TURNO DE {currentPlayer.name}</p>
                      <p className="text-pink-300 text-sm font-bold tracking-widest animate-pulse">GIRA LA RULETA PARA REVELAR TU DESTINO</p>
                    </div>
                  </div>
                ) : currentContent ? (
                  <p className="text-white text-xl md:text-3xl font-black text-center leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-tight">
                    &quot;{currentContent.content}&quot;
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-white/40 text-xs font-black tracking-widest">PREPARANDO EL DESEO...</span>
                  </div>
                )}
              </div>

              {/* Botones de Acción (Incrustados en la tarjeta) */}
              <div className="mt-6 flex gap-3">
                {!challengeCompleted && currentContent && (
                  <>
                    {currentContent.type === "challenge" ? (
                      <>
                        <button
                          onClick={() => handleComplete(true)}
                          className="flex-1 py-4 bg-white text-black font-black rounded-2xl hover:bg-green-500 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl text-xs uppercase tracking-wider"
                        >
                          Hecho ✓
                        </button>
                        <button
                          onClick={() => handleComplete(false)}
                          className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl text-xs uppercase tracking-wider"
                        >
                          Rechazar ✗
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleComplete(true)}
                        className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl text-xs uppercase tracking-wider"
                      >
                        Respondido →
                      </button>
                    )}
                  </>
                )}
                
                {challengeCompleted && currentContent?.type === "challenge" && (
                  <button
                    onClick={handleNext}
                    className="flex-1 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black rounded-2xl animate-pulse shadow-2xl text-xs uppercase tracking-widest"
                  >
                    Siguiente Turno →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: INTERACCIÓN (RULETA + SCORE) */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          
          {/* Ruleta */}
          <div className="bg-white/5 rounded-[2rem] border border-white/10 p-4 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
            <LuckyWheel
              onRoll={handleDiceRoll}
              disabled={challengeCompleted || !waitingForSpin}
              contentType={currentContent?.type || null}
            />
          </div>

          {/* Marcador */}
          <div className="flex-1 bg-white/5 rounded-[2rem] border border-white/10 p-4 min-h-0 flex flex-col">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3 text-center">Ranking de Pasión</div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <ScoreBoard
                players={players}
                scores={scores}
                currentPlayerId={currentPlayer.id}
              />
            </div>
          </div>

          {/* Controles de Sistema */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleNewContent}
              className="px-4 py-3 bg-white/10 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
            >
              🔄 Re-shuffle
            </button>
            <button
              onClick={onGameEnd}
              className="flex-1 py-3 bg-red-900/40 text-red-200 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-red-800/60 transition-all border border-red-500/20"
            >
              🚪 Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
