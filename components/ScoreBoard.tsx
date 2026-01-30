"use client";

import type { Player } from "@/lib/gameLogic";
import type { PlayerScore } from "@/lib/scoringSystem";
import { imageConfig } from "@/lib/imageConfig";

interface ScoreBoardProps {
  players: Player[];
  scores: Map<string, PlayerScore>;
  currentPlayerId?: string;
}

export default function ScoreBoard({
  players,
  scores,
  currentPlayerId,
}: ScoreBoardProps) {
  const scoreboard = players
    .map((player) => ({
      player,
      score: scores.get(player.id) || {
        playerId: player.id,
        points: 0,
        challengesCompleted: 0,
        questionsAnswered: 0,
        bonuses: 0,
        penalties: 0,
      },
    }))
    .sort((a, b) => b.score.points - a.score.points);

  const getRankEmoji = (index: number) => {
    const emojis = ["🥇", "🥈", "🥉"];
    return emojis[index] || `${index + 1}°`;
  };

  return (
    <div 
      className="rounded-2xl p-4 neon-border shadow-lg seductive-glow overflow-hidden relative glass-effect bg-zinc-900/40 border border-white/10"
    >
      <div className="relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-sm md:text-base font-black neon-text text-pink-400 uppercase tracking-widest">
            🏆 Clasificación
          </h2>
        </div>
        <div className="space-y-2">
          {scoreboard.map((entry, index) => {
            const isCurrentPlayer = entry.player.id === currentPlayerId;
            return (
              <div
                key={entry.player.id}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  isCurrentPlayer
                    ? "bg-white text-black shadow-xl scale-[1.02] border-white/20"
                    : "bg-white/5 text-gray-300 border border-white/5"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-lg md:text-xl flex-shrink-0">{getRankEmoji(index)}</span>
                  <span
                    className={`font-black truncate text-xs md:text-sm uppercase tracking-tighter ${
                      isCurrentPlayer ? "text-black" : "text-white"
                    }`}
                  >
                    {entry.player.name}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <div
                    className={`text-sm md:text-base font-black ${
                      isCurrentPlayer 
                        ? "text-black" 
                        : index === 0
                        ? "text-yellow-400"
                        : index === 1
                        ? "text-gray-300"
                        : index === 2
                        ? "text-orange-400"
                        : "text-gray-500"
                    }`}
                  >
                    {entry.score.points} PTS
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
