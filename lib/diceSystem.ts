import diceEffectsData from "@/data/diceEffects.json";

export interface DiceEffect {
  id: string;
  name: string;
  description: string;
  type: string;
  value?: number;
  bonus?: number;
  color: string;
}

export function rollDice(): DiceEffect {
  const effects = diceEffectsData.effects as DiceEffect[];
  const randomIndex = Math.floor(Math.random() * effects.length);
  return effects[randomIndex];
}

export function getDiceEffectById(id: string): DiceEffect | null {
  const effects = diceEffectsData.effects as DiceEffect[];
  return effects.find((effect) => effect.id === id) || null;
}

export function applyDiceEffect(
  effect: DiceEffect,
  currentMultiplier: number = 1
): number {
  switch (effect.type) {
    case "multiplier":
      return currentMultiplier * (effect.value || 1);
    case "bonus":
      return currentMultiplier; // Bonus se aplica aparte
    case "penalty":
      return currentMultiplier; // Penalty se aplica aparte
    default:
      return currentMultiplier;
  }
}

export function shouldRollDice(probability: number = 0.5): boolean {
  return Math.random() < probability;
}
