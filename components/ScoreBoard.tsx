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
      className="rounded-xl p-3 neon-border shadow-lg seductive-glow overflow-hidden relative glass-effect bg-zinc-900/40"
    >
      <div className="relative z-10">
        <div className="text-center mb-2">
          <h2 className="text-lg font-black neon-text text-pink-400">
            🏆 Clasificación
          </h2>
        </div>
        <div className="space-y-1.5">
          {scoreboard.map((entry, index) => {
            const isCurrentPlayer = entry.player.id === currentPlayerId;
            return (
              <div
                key={entry.player.id}
                className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                  isCurrentPlayer
                    ? "bg-gradient-to-r from-pink-600/60 to-purple-600/60 border border-pink-400"
                    : "bg-gray-700/40 border border-gray-600/50"
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-lg flex-shrink-0">{getRankEmoji(index)}</span>
                  <span
                    className={`font-bold truncate ${
                      isCurrentPlayer ? "text-white neon-text" : "text-gray-300"
                    }`}
                  >
                    {entry.player.name}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <div
                    className={`text-base font-bold ${
                      index === 0
                        ? "text-yellow-400"
                        : index === 1
                        ? "text-gray-300"
                        : index === 2
                        ? "text-orange-400"
                        : "text-gray-400"
                    }`}
                  >
                    {entry.score.points}
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
