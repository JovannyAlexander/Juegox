import questionsData from "@/data/questions.json";
import challengesData from "@/data/challenges.json";
import liquorChallengesData from "@/data/liquorChallenges.json";

export type GameMode = "questions" | "challenges" | "mix" | "competitive" | "extreme";
export type QuestionCategory = keyof typeof questionsData;
export type ChallengeLevel = keyof typeof challengesData;
export type IntensityLevel = "suave" | "moderado" | "extremo" | "insano";
export type LiquorType = "cerveza" | "trago" | null;

export interface Player {
  id: string;
  name: string;
}

export interface LiquorConfig {
  enabled: boolean;
  type: LiquorType;
}

export interface GameState {
  currentPlayerIndex: number;
  usedQuestions: Set<string>;
  usedChallenges: Set<string>;
  mode: GameMode;
}

export function getNextTurn(currentIndex: number, totalPlayers: number): number {
  return (currentIndex + 1) % totalPlayers;
}

export function selectRandomQuestion(
  category: QuestionCategory,
  usedQuestions: Set<string>
): string | null {
  const questions = questionsData[category];
  const available = questions.filter((q) => !usedQuestions.has(q));

  if (available.length === 0) {
    // Si ya se usaron todas, resetear el conjunto de usadas
    usedQuestions.clear();
    return questions[Math.floor(Math.random() * questions.length)];
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  usedQuestions.add(selected);
  return selected;
}

export function selectRandomChallenge(
  level: ChallengeLevel,
  usedChallenges: Set<string>
): string | null {
  const challenges = challengesData[level];
  const available = challenges.filter((c) => !usedChallenges.has(c));

  if (available.length === 0) {
    // Si ya se usaron todas, resetear el conjunto de usadas
    usedChallenges.clear();
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  usedChallenges.add(selected);
  return selected;
}

export function selectRandomLiquorChallenge(
  type: LiquorType,
  usedLiquorChallenges: Set<string>
): string | null {
  if (!type) return null;
  
  const challenges = liquorChallengesData[type as keyof typeof liquorChallengesData];
  if (!challenges || !Array.isArray(challenges)) return null;
  
  const available = challenges.filter((c) => !usedLiquorChallenges.has(c));

  if (available.length === 0) {
    // Si ya se usaron todas, resetear el conjunto de usadas
    usedLiquorChallenges.clear();
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  usedLiquorChallenges.add(selected);
  return selected;
}

export function getRandomCategory(intensity?: IntensityLevel): QuestionCategory {
  const allCategories: QuestionCategory[] = [
    "romanticas",
    "picantes",
    "extremas",
    "tabu",
    "fantasias",
    "historial",
    "preferencias",
    "grupo",
  ];
  
  // Filtrar según intensidad
  let availableCategories: QuestionCategory[] = [];
  
  if (intensity === "suave") {
    availableCategories = ["romanticas", "picantes"];
  } else if (intensity === "moderado") {
    availableCategories = ["romanticas", "picantes", "extremas", "preferencias"];
  } else if (intensity === "extremo") {
    availableCategories = ["picantes", "extremas", "fantasias", "historial", "preferencias"];
  } else if (intensity === "insano") {
    availableCategories = allCategories;
  } else {
    availableCategories = allCategories;
  }
  
  return availableCategories[Math.floor(Math.random() * availableCategories.length)];
}

export function getRandomLevel(intensity?: IntensityLevel): ChallengeLevel {
  const allLevels: ChallengeLevel[] = [
    "suaves",
    "intermedios",
    "extremos",
    "fisico",
    "digital",
    "grupo",
    "tabu",
  ];
  
  // Filtrar según intensidad
  let availableLevels: ChallengeLevel[] = [];
  
  if (intensity === "suave") {
    availableLevels = ["suaves"];
  } else if (intensity === "moderado") {
    availableLevels = ["suaves", "intermedios"];
  } else if (intensity === "extremo") {
    availableLevels = ["intermedios", "extremos", "fisico", "digital"];
  } else if (intensity === "insano") {
    availableLevels = allLevels;
  } else {
    availableLevels = allLevels;
  }
  
  return availableLevels[Math.floor(Math.random() * availableLevels.length)];
}

export function getNextContent(
  mode: GameMode,
  usedQuestions: Set<string>,
  usedChallenges: Set<string>,
  intensity?: IntensityLevel,
  roundType?: { category?: string; type?: string },
  liquorConfig?: LiquorConfig,
  usedLiquorChallenges?: Set<string>
): { type: "question" | "challenge"; content: string; category?: string; level?: string } | null {
  // Si hay una ronda especial activa, seguir sus reglas
  if (roundType?.type === "questions_only") {
    const category = (roundType.category as QuestionCategory) || getRandomCategory(intensity);
    const question = selectRandomQuestion(category, usedQuestions);
    return question ? { type: "question", content: question, category } : null;
  }
  
  if (roundType?.type === "challenges_only") {
    const level = (roundType.category as ChallengeLevel) || getRandomLevel(intensity);
    const challenge = selectRandomChallenge(level, usedChallenges);
    return challenge ? { type: "challenge", content: challenge, level } : null;
  }
  
  // Verificar si debemos incluir desafío de licor (30-40% probabilidad cuando está activo)
  if (liquorConfig?.enabled && liquorConfig.type && usedLiquorChallenges) {
    const shouldIncludeLiquor = Math.random() < 0.35; // 35% probabilidad
    if (shouldIncludeLiquor && (mode === "challenges" || mode === "mix" || mode === "competitive" || mode === "extreme")) {
      const liquorChallenge = selectRandomLiquorChallenge(liquorConfig.type, usedLiquorChallenges);
      if (liquorChallenge) {
        return { type: "challenge", content: liquorChallenge, level: "licor" };
      }
    }
  }
  
  if (mode === "questions" || mode === "competitive") {
    const category = getRandomCategory(intensity);
    const question = selectRandomQuestion(category, usedQuestions);
    return question ? { type: "question", content: question, category } : null;
  } else if (mode === "challenges") {
    const level = getRandomLevel(intensity);
    const challenge = selectRandomChallenge(level, usedChallenges);
    return challenge ? { type: "challenge", content: challenge, level } : null;
  } else {
    // Modo mix: 50% preguntas, 50% desafíos
    const isQuestion = Math.random() < 0.5;
    if (isQuestion) {
      const category = getRandomCategory(intensity);
      const question = selectRandomQuestion(category, usedQuestions);
      if (question) return { type: "question", content: question, category };
    }
    // Si no hay pregunta disponible o es desafío
    const level = getRandomLevel(intensity);
    const challenge = selectRandomChallenge(level, usedChallenges);
    return challenge ? { type: "challenge", content: challenge, level } : null;
  }
}
