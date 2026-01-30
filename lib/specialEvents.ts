import specialEventsData from "@/data/specialEvents.json";

export interface SpecialEvent {
  id: string;
  name: string;
  description: string;
  effect: string;
  value?: number;
}

export function getRandomEvent(): SpecialEvent {
  const events = specialEventsData.events as SpecialEvent[];
  const randomIndex = Math.floor(Math.random() * events.length);
  return events[randomIndex];
}

export function shouldTriggerEvent(probability: number = 0.15): boolean {
  return Math.random() < probability;
}

export function getEventById(id: string): SpecialEvent | null {
  const events = specialEventsData.events as SpecialEvent[];
  return events.find((event) => event.id === id) || null;
}
