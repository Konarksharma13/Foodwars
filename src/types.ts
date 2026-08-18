export type ComfortCategory = 'cheesy' | 'spicy' | 'sweet' | 'warm' | 'crispy';

export interface FoodItem {
  id: string;
  name: string;
  subtitle: string;
  category: ComfortCategory;
  cuisine: string;
  originCountry: string;
  description: string;
  image: string;
  spicyLevel: number;   // 0 - 100
  sweetLevel: number;   // 0 - 100
  cheesyLevel: number;  // 0 - 100
  warmLevel: number;    // 0 - 100
  crispyLevel: number;  // 0 - 100
  tags: string[];
  comfortReason: string;
  highlightFact: string;
}

export type ContenderCount = 2 | 4 | 8 | 16;

export interface Matchup {
  id: string;
  roundIndex: number;
  roundName: string;
  matchIndex: number;
  totalMatchesInRound: number;
  foodA: FoodItem;
  foodB: FoodItem;
  winner?: FoodItem;
  loser?: FoodItem;
  chosenAt?: number;
}

export interface FoodPersonality {
  id: string;
  title: string;
  archetype: string;
  badge: string;
  tagline: string;
  description: string;
  dominantTrait: string;
  verdictAnalysis: string;
  statsHighlight: string;
  color: string;
  bgLight: string;
}

export interface BattleRecordStats {
  contendersCount: number;
  eliminatedCount: number;
  totalBattles: number;
  category: ComfortCategory;
  toughestDecision?: {
    foodA: FoodItem;
    foodB: FoodItem;
    notes: string;
  };
  biggestUpset?: {
    winner: FoodItem;
    loser: FoodItem;
    notes: string;
  };
  topAttributeName: string;
  topAttributeScore: number;
  flavorDNA: {
    cheesy: number;
    spicy: number;
    sweet: number;
    warm: number;
    crispy: number;
  };
}

export interface RankedFood {
  rank: number;
  food: FoodItem;
  stageEliminated: string;
  wins: number;
}

export type AppScreen = 
  | 'landing'
  | 'category_select'
  | 'contender_select'
  | 'battle'
  | 'champion_reveal'
  | 'results';
