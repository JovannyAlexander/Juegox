"use client";

import type { Player } from "@/lib/gameLogic";

interface ChallengeVotingProps {
  players: Player[];
  onVote: (playerId: string, approved: boolean) => void;
  votes: Map<string, boolean>;
}

export default function ChallengeVoting({
  players,
  onVote,
  votes,
}: ChallengeVotingProps) {
  const approvedCount = Array.from(votes.values()).filter((v) => v).length;
  const totalVotes = votes.size;
  const allVoted = totalVotes === players.length - 1; // Excluyendo al jugador actual

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
      <h3 className="text-xl font-bold text-center mb-4 text-pink-400">
        Votación del Grupo
      </h3>
      <p className="text-center text-gray-300 mb-4">
        ¿El desafío fue completado correctamente?
      </p>
      <div className="space-y-2 mb-4">
        {players.map((player) => {
          const hasVoted = votes.has(player.id);
          const vote = votes.get(player.id);
          return (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
            >
              <span className="text-white">{player.name}</span>
              <div className="flex gap-2">
                {!hasVoted ? (
                  <>
                    <button
                      onClick={() => onVote(player.id, true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => onVote(player.id, false)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      ✗
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-4 py-2 rounded-lg ${
                      vote
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {vote ? "✓ Aprobado" : "✗ Rechazado"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {allVoted && (
        <div className="text-center">
          <p className="text-lg font-bold text-white">
            Resultado: {approvedCount >= players.length / 2 ? "✓ Aprobado" : "✗ Rechazado"}
          </p>
        </div>
      )}
    </div>
  );
}
