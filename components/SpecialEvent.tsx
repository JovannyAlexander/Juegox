"use client";

import type { SpecialEvent } from "@/lib/specialEvents";

interface SpecialEventProps {
  event: SpecialEvent;
  onClose: () => void;
}

export default function SpecialEventModal({ event, onClose }: SpecialEventProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-red-900/90 via-purple-900/90 to-pink-900/90 rounded-2xl p-8 max-w-md w-full border-2 border-red-500/50 shadow-2xl animate-slideIn">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-pulse">⚡</div>
          <h2 className="text-3xl font-bold text-white mb-2">{event.name}</h2>
          <p className="text-gray-200 text-lg">{event.description}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
