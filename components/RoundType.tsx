"use client";

import type { RoundType } from "@/lib/roundManager";

interface RoundTypeProps {
  roundType: RoundType;
}

export default function RoundTypeIndicator({ roundType }: RoundTypeProps) {
  return (
    <div className="glass-effect rounded-2xl p-6 mb-4 neon-border seductive-glow shadow-2xl animate-pulse">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1 text-3xl">
          <span>🔥</span>
          <span>🍷</span>
        </div>
        <div className="text-center flex-1">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 neon-text">
            {roundType.name}
          </h3>
          <p className="text-white/95 text-base font-medium">{roundType.description}</p>
          <div className="flex justify-center gap-2 mt-3 text-xl">
            <span>💋</span>
            <span>😈</span>
            <span>🍸</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-3xl">
          <span>🔥</span>
          <span>🍷</span>
        </div>
      </div>
    </div>
  );
}
