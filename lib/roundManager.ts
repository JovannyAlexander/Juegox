import roundTypesData from "@/data/roundTypes.json";

export interface RoundType {
  id: string;
  name: string;
  description: string;
  multiplier?: number;
  intensity?: string;
  type?: string;
  category?: string;
  bonus?: number;
  duration: number;
}

export function getRandomRoundType(): RoundType {
  const rounds = roundTypesData.rounds as RoundType[];
  const randomIndex = Math.floor(Math.random() * rounds.length);
  return rounds[randomIndex];
}

export function getRoundTypeById(id: string): RoundType | null {
  const rounds = roundTypesData.rounds as RoundType[];
  return rounds.find((round) => round.id === id) || null;
}

export function shouldActivateSpecialRound(roundNumber: number): boolean {
  // Activar cada 5-7 rondas
  return roundNumber > 0 && roundNumber % Math.floor(Math.random() * 3 + 5) === 0;
}

export function isRoundActive(roundType: RoundType, currentRound: number, startRound: number): boolean {
  return currentRound >= startRound && currentRound < startRound + roundType.duration;
}
