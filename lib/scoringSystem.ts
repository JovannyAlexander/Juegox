import type { Player, IntensityLevel } from "./gameLogic";

export interface PlayerScore {
  playerId: string;
  points: number;
  challengesCompleted: number;
  questionsAnswered: number;
  bonuses: number;
  penalties: number;
}

export interface ScoringConfig {
  intensity: IntensityLevel;
  baseQuestionPoints: number;
  baseChallengePoints: {
    suaves: number;
    intermedios: number;
    extremos: number;
    fisico: number;
    digital: number;
    grupo: number;
    tabu: number;
    licor: number;
  };
  multipliers: {
    suave: number;
    moderado: number;
    extremo: number;
    insano: number;
  };
}

const DEFAULT_CONFIG: ScoringConfig = {
  intensity: "moderado",
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

export function calculateQuestionPoints(
  config: ScoringConfig = DEFAULT_CONFIG,
  multiplier: number = 1
): number {
  const base = config.baseQuestionPoints;
  const intensityMultiplier = config.multipliers[config.intensity];
  return Math.round(base * intensityMultiplier * multiplier);
}

export function calculateChallengePoints(
  challengeLevel: keyof ScoringConfig["baseChallengePoints"],
  config: ScoringConfig = DEFAULT_CONFIG,
  multiplier: number = 1
): number {
  const base = config.baseChallengePoints[challengeLevel];
  const intensityMultiplier = config.multipliers[config.intensity];
  return Math.round(base * intensityMultiplier * multiplier);
}

export function addBonusPoints(
  score: PlayerScore,
  bonus: number,
  reason: string = "Bonificación"
): PlayerScore {
  return {
    ...score,
    points: score.points + bonus,
    bonuses: score.bonuses + bonus,
  };
}

export function addPenaltyPoints(
  score: PlayerScore,
  penalty: number,
  reason: string = "Penalización"
): PlayerScore {
  const finalPenalty = Math.min(penalty, score.points); // No puede quedar negativo
  return {
    ...score,
    points: Math.max(0, score.points - finalPenalty),
    penalties: score.penalties + finalPenalty,
  };
}

export function createPlayerScore(playerId: string): PlayerScore {
  return {
    playerId,
    points: 0,
    challengesCompleted: 0,
    questionsAnswered: 0,
    bonuses: 0,
    penalties: 0,
  };
}

export function updateScoreForQuestion(
  score: PlayerScore,
  config: ScoringConfig = DEFAULT_CONFIG,
  multiplier: number = 1
): PlayerScore {
  const points = calculateQuestionPoints(config, multiplier);
  return {
    ...score,
    points: score.points + points,
    questionsAnswered: score.questionsAnswered + 1,
  };
}

export function updateScoreForChallenge(
  score: PlayerScore,
  challengeLevel: keyof ScoringConfig["baseChallengePoints"],
  config: ScoringConfig = DEFAULT_CONFIG,
  multiplier: number = 1,
  completed: boolean = true
): PlayerScore {
  if (!completed) {
    return addPenaltyPoints(score, 10, "Desafío no completado");
  }

  const points = calculateChallengePoints(challengeLevel, config, multiplier);
  return {
    ...score,
    points: score.points + points,
    challengesCompleted: score.challengesCompleted + 1,
  };
}

export function getScoreboard(players: Player[], scores: Map<string, PlayerScore>) {
  return players
    .map((player) => ({
      player,
      score: scores.get(player.id) || createPlayerScore(player.id),
    }))
    .sort((a, b) => b.score.points - a.score.points);
}

export function getWinner(scores: Map<string, PlayerScore>): string | null {
  let maxPoints = -1;
  let winnerId: string | null = null;

  scores.forEach((score, playerId) => {
    if (score.points > maxPoints) {
      maxPoints = score.points;
      winnerId = playerId;
    }
  });

  return winnerId;
}

export function swapPlayerPoints(
  scores: Map<string, PlayerScore>,
  playerId1: string,
  playerId2: string
): Map<string, PlayerScore> {
  const score1 = scores.get(playerId1);
  const score2 = scores.get(playerId2);

  if (!score1 || !score2) return scores;

  const newScores = new Map(scores);
  newScores.set(playerId1, { ...score1, points: score2.points });
  newScores.set(playerId2, { ...score2, points: score1.points });

  return newScores;
}

export function redistributePoints(
  scores: Map<string, PlayerScore>
): Map<string, PlayerScore> {
  const totalPoints = Array.from(scores.values()).reduce(
    (sum, score) => sum + score.points,
    0
  );
  const averagePoints = Math.floor(totalPoints / scores.size);

  const newScores = new Map<string, PlayerScore>();
  scores.forEach((score, playerId) => {
    newScores.set(playerId, {
      ...score,
      points: averagePoints,
    });
  });

  return newScores;
}
