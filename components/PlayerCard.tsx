"use client";

import type { Player } from "@/lib/gameLogic";

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
}

export default function PlayerCard({ player, isActive }: PlayerCardProps) {
  return (
    <div
      className={`p-4 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-br from-pink-600 to-purple-600 shadow-lg scale-105 border-2 border-pink-400"
          : "bg-gray-700/50 border border-gray-600 opacity-60"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold ${
            isActive ? "text-white text-lg" : "text-gray-300"
          }`}
        >
          {player.name}
        </span>
        {isActive && (
          <div className="animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
