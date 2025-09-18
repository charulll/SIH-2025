export interface FoodChainElement {
  id: string;
  name: string;
  image: string;
  description: string;
  level: 'producer' | 'primary_consumer' | 'secondary_consumer' | 'tertiary_consumer' | 'decomposer';
}

export interface FoodChain {
  id: string;
  name: string;
  elements: FoodChainElement[];
  description: string;
  ecosystem: string;
}

export interface GameLevel {
  id: string;
  name: string;
  difficulty: 'basic' | 'medium' | 'hard';
  foodChains: FoodChain[];
  maxScore: number;
}

export interface GameScore {
  correct: number;
  total: number;
  percentage: number;
  timeSpent: number;
}

export interface DragDropState {
  draggedElement: FoodChainElement | null;
  draggedFrom: number;
  dropZones: (FoodChainElement | null)[];
}