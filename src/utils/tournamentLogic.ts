import { FoodItem, ComfortCategory, ContenderCount, Matchup, FoodPersonality, BattleRecordStats, RankedFood } from '../types';
import { FOOD_DATABASE } from '../data/foods';

// Helper to shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate contender pool based on category and count
export function generateContenderPool(category: ComfortCategory, count: ContenderCount): FoodItem[] {
  // Primary pool: foods belonging directly to the chosen comfort category
  const categoryFoods = FOOD_DATABASE.filter(f => f.category === category);
  
  const shuffled = shuffleArray(categoryFoods);
  
  if (shuffled.length >= count) {
    return shuffled.slice(0, count);
  }
  
  // In the unlikely case count > category foods, pull from related
  const remaining = FOOD_DATABASE.filter(f => f.category !== category);
  const shuffledRemaining = shuffleArray(remaining);
  return [...shuffled, ...shuffledRemaining.slice(0, count - shuffled.length)];
}

// Helper to get descriptive round name
export function getRoundName(totalContendersInRound: number): string {
  switch (totalContendersInRound) {
    case 16:
      return 'ROUND 01 — ROUND OF 16';
    case 8:
      return 'QUARTERFINAL';
    case 4:
      return 'SEMIFINAL';
    case 2:
      return 'THE FINAL';
    default:
      return `ROUND OF ${totalContendersInRound}`;
  }
}

// Generate matchups for a list of contenders
export function createRoundMatchups(contenders: FoodItem[], roundIndex: number): Matchup[] {
  const matchups: Matchup[] = [];
  const totalMatches = Math.floor(contenders.length / 2);
  const roundName = getRoundName(contenders.length);

  for (let i = 0; i < contenders.length; i += 2) {
    const foodA = contenders[i];
    const foodB = contenders[i + 1];
    if (foodA && foodB) {
      matchups.push({
        id: `r${roundIndex}-m${i / 2 + 1}-${foodA.id}-vs-${foodB.id}`,
        roundIndex,
        roundName,
        matchIndex: i / 2 + 1,
        totalMatchesInRound: totalMatches,
        foodA,
        foodB
      });
    }
  }

  return matchups;
}

// Calculate total rounds for a given contender count
export function getTotalRounds(count: ContenderCount): number {
  return Math.log2(count);
}

// Calculate Food Personality from completed matchups and choices
export function calculateFoodPersonality(
  completedMatchups: Matchup[],
  champion: FoodItem,
  category: ComfortCategory
): FoodPersonality {
  const chosenWinners = completedMatchups.map(m => m.winner).filter((f): f is FoodItem => !!f);
  
  // Calculate aggregate scores
  const avgScores = chosenWinners.reduce(
    (acc, food) => {
      acc.cheesy += food.cheesyLevel;
      acc.spicy += food.spicyLevel;
      acc.sweet += food.sweetLevel;
      acc.warm += food.warmLevel;
      acc.crispy += food.crispyLevel;
      return acc;
    },
    { cheesy: 0, spicy: 0, sweet: 0, warm: 0, crispy: 0 }
  );

  const count = Math.max(1, chosenWinners.length);
  const cheeseAvg = Math.round(avgScores.cheesy / count);
  const spicyAvg = Math.round(avgScores.spicy / count);
  const sweetAvg = Math.round(avgScores.sweet / count);
  const warmAvg = Math.round(avgScores.warm / count);
  const crispyAvg = Math.round(avgScores.crispy / count);

  // Find dominant attribute
  const attributes = [
    { name: 'Cheesy', score: cheeseAvg, key: 'cheesy' },
    { name: 'Spicy', score: spicyAvg, key: 'spicy' },
    { name: 'Sweet', score: sweetAvg, key: 'sweet' },
    { name: 'Warm', score: warmAvg, key: 'warm' },
    { name: 'Crispy', score: crispyAvg, key: 'crispy' },
  ];

  attributes.sort((a, b) => b.score - a.score);
  const dominant = attributes[0];

  // Specific personality archetypes based on category and dominant behaviors
  if (category === 'spicy' || dominant.key === 'spicy') {
    return {
      id: 'spice-chaser',
      title: 'THE SPICE CHASER',
      archetype: 'The Thrill Seeker',
      badge: '🔥 ENDORPHIN PURIST',
      tagline: 'You don\'t just eat food — you want it to bite back.',
      description: 'You consistently gravitated toward vibrant aromatics, capsaicin kicks, and intense chile profiles. For you, comfort isn\'t mild or mellow; it\'s an exhilarating sensory adventure that awakens the palate and gets the adrenaline pumping.',
      dominantTrait: 'Bold Capsaicin & Herbal Heat',
      verdictAnalysis: `Your crowning of ${champion.name} proves your palate craves punchy, unapologetic depth over subtle simplicity.`,
      statsHighlight: `${spicyAvg}% Heat Intensity Preference`,
      color: '#E84824',
      bgLight: '#FEF2F2'
    };
  }

  if (category === 'cheesy' || dominant.key === 'cheesy') {
    return {
      id: 'cheese-loyalist',
      title: 'THE CHEESE LOYALIST',
      archetype: 'The Melt Mastermind',
      badge: '🧀 FONDUE DEVOTEE',
      tagline: 'If it doesn\'t stretch for at least twelve inches, is it even comfort food?',
      description: 'You believe molten, bubbling cheese is the highest form of culinary therapy. Throughout the tournament, foods with rich dairy decadence, gratinéed crusts, and stretchy mozzarella textures dominated your verdicts with unmatched loyalty.',
      dominantTrait: 'Decadent Dairy & Golden Melts',
      verdictAnalysis: `Selecting ${champion.name} as your champion confirms that rich, creamy indulgence is your ultimate reset button.`,
      statsHighlight: `${cheeseAvg}% Molten Dairy Affinity`,
      color: '#E5A912',
      bgLight: '#FEFCE8'
    };
  }

  if (category === 'crispy' || dominant.key === 'crispy') {
    return {
      id: 'crunch-addict',
      title: 'THE CRUNCH ADDICT',
      archetype: 'The Texture Purist',
      badge: '🥨 ACOUSTIC GOURMET',
      tagline: 'If you can\'t hear the first bite across the room, it\'s not done right.',
      description: 'You judge food with your ears as much as your tastebuds. You continuously prioritized shatteringly crisp crusts, golden double-fried batters, and crackling blisters over soft or mushy alternatives. Texture is your non-negotiable holy grail.',
      dominantTrait: 'Acoustic Snap & Shattering Batter',
      verdictAnalysis: `Crowning ${champion.name} reveals an obsession with structural integrity, precision frying, and golden acoustic satisfaction.`,
      statsHighlight: `${crispyAvg}% Crispness Index`,
      color: '#109968',
      bgLight: '#F0FDF4'
    };
  }

  if (category === 'sweet' || dominant.key === 'sweet') {
    return {
      id: 'sweet-soul',
      title: 'THE SWEET SOUL',
      archetype: 'The Serotonin Alchemist',
      badge: '🍯 DESSERT-FIRST VISIONARY',
      tagline: 'Life is too short to save the sweetest moments for last.',
      description: 'You know that genuine comfort comes from warm caramelization, velvety cocoa, and buttery dough. You bypassed bitter and savory compromises in favor of rich sugary warmth that triggers immediate childhood joy and blissful dopamine.',
      dominantTrait: 'Caramelized Bliss & Velvet Cocoa',
      verdictAnalysis: `Your verdict for ${champion.name} highlights your appreciation for craftsmanship in pastry, sugar balance, and decadent warmth.`,
      statsHighlight: `${sweetAvg}% Sweetness Quotient`,
      color: '#E04886',
      bgLight: '#FDF2F8'
    };
  }

  // Warm category or default
  return {
    id: 'cozy-eater',
    title: 'THE COZY SOUL',
    archetype: 'The Hearth Keeper',
    badge: '🍲 SOUL RESTORER',
    tagline: 'Warmth isn\'t just a temperature; it\'s a feeling of home.',
    description: 'You consistently chose steaming bowls, slow-simmered broths, and rich restorative braises. You value the patient craft of 12-hour bone stocks, tender meats, and aromatics that soothe the spirit from the inside out.',
    dominantTrait: 'Slow-Simmered Soul & Warmth',
    verdictAnalysis: `By electing ${champion.name}, you proved that deep, slow-cooked patience and heartwarming comfort are what truly ground you.`,
    statsHighlight: `${warmAvg}% Hearth Warmth Score`,
    color: '#C86218',
    bgLight: '#FFF7ED'
  };
}

// Calculate battle stats and highlights
export function calculateBattleStats(
  initialContenders: FoodItem[],
  completedMatchups: Matchup[],
  champion: FoodItem,
  category: ComfortCategory
): BattleRecordStats {
  const contendersCount = initialContenders.length;
  const eliminatedCount = contendersCount - 1;
  const totalBattles = completedMatchups.length;

  // Calculate toughest decision (e.g. final matchup or match where both foods had closest attribute totals)
  let toughestDecision: BattleRecordStats['toughestDecision'] = undefined;
  
  if (completedMatchups.length > 0) {
    // The final matchup is usually the most dramatic
    const finalMatch = completedMatchups[completedMatchups.length - 1];
    if (finalMatch.winner && finalMatch.loser) {
      toughestDecision = {
        foodA: finalMatch.foodA,
        foodB: finalMatch.foodB,
        notes: `The championship showdown: ${finalMatch.foodA.name} clashed with ${finalMatch.foodB.name} for the ultimate crown.`
      };
    }
  }

  // Calculate biggest upset: match where winner had lower category rating or lower overall score but still advanced
  let biggestUpset: BattleRecordStats['biggestUpset'] = undefined;
  for (const m of completedMatchups) {
    if (m.winner && m.loser) {
      const winnerScore = m.winner.cheesyLevel + m.winner.spicyLevel + m.winner.warmLevel + m.winner.crispyLevel + m.winner.sweetLevel;
      const loserScore = m.loser.cheesyLevel + m.loser.spicyLevel + m.loser.warmLevel + m.loser.crispyLevel + m.loser.sweetLevel;
      if (loserScore > winnerScore + 20) {
        biggestUpset = {
          winner: m.winner,
          loser: m.loser,
          notes: `${m.winner.name} (${m.winner.cuisine}) knocked out heavyweight favorite ${m.loser.name}!`
        };
        break;
      }
    }
  }

  // If no metric-based upset found, pick a notable early round knockout
  if (!biggestUpset && completedMatchups.length > 1) {
    const firstRoundMatch = completedMatchups[0];
    if (firstRoundMatch.winner && firstRoundMatch.loser) {
      biggestUpset = {
        winner: firstRoundMatch.winner,
        loser: firstRoundMatch.loser,
        notes: `${firstRoundMatch.winner.name} made an early statement by defeating ${firstRoundMatch.loser.name}.`
      };
    }
  }

  // Aggregate chosen foods flavor DNA
  const chosenWinners = completedMatchups.map(m => m.winner).filter((f): f is FoodItem => !!f);
  const count = Math.max(1, chosenWinners.length);
  
  const flavorDNA = {
    cheesy: Math.round(chosenWinners.reduce((s, f) => s + f.cheesyLevel, 0) / count),
    spicy: Math.round(chosenWinners.reduce((s, f) => s + f.spicyLevel, 0) / count),
    sweet: Math.round(chosenWinners.reduce((s, f) => s + f.sweetLevel, 0) / count),
    warm: Math.round(chosenWinners.reduce((s, f) => s + f.warmLevel, 0) / count),
    crispy: Math.round(chosenWinners.reduce((s, f) => s + f.crispyLevel, 0) / count),
  };

  const topAttribute = Object.entries(flavorDNA).sort((a, b) => b[1] - a[1])[0];

  return {
    contendersCount,
    eliminatedCount,
    totalBattles,
    category,
    toughestDecision,
    biggestUpset,
    topAttributeName: topAttribute[0].toUpperCase(),
    topAttributeScore: topAttribute[1],
    flavorDNA
  };
}

// Generate tournament ranking
export function generateFoodRankings(
  initialContenders: FoodItem[],
  completedMatchups: Matchup[],
  champion: FoodItem
): RankedFood[] {
  const ranked: RankedFood[] = [];
  const winCounts = new Map<string, number>();

  // Count wins
  completedMatchups.forEach(m => {
    if (m.winner) {
      winCounts.set(m.winner.id, (winCounts.get(m.winner.id) || 0) + 1);
    }
  });

  // Track elimination round for each food
  const eliminationRound = new Map<string, string>();

  completedMatchups.forEach(m => {
    if (m.loser) {
      eliminationRound.set(m.loser.id, m.roundName);
    }
  });

  // 1. Champion
  ranked.push({
    rank: 1,
    food: champion,
    stageEliminated: 'TOURNAMENT CHAMPION 🏆',
    wins: winCounts.get(champion.id) || 0
  });

  // 2. Finalist (Runner Up)
  const finalMatch = completedMatchups[completedMatchups.length - 1];
  if (finalMatch && finalMatch.loser && finalMatch.loser.id !== champion.id) {
    ranked.push({
      rank: 2,
      food: finalMatch.loser,
      stageEliminated: 'FINALIST (2ND PLACE)',
      wins: winCounts.get(finalMatch.loser.id) || 0
    });
  }

  // 3. Other foods sorted by wins descending, then by overall stats
  const remainingFoods = initialContenders.filter(
    f => f.id !== champion.id && (!finalMatch || f.id !== finalMatch.loser?.id)
  );

  remainingFoods.sort((a, b) => {
    const winsA = winCounts.get(a.id) || 0;
    const winsB = winCounts.get(b.id) || 0;
    if (winsB !== winsA) return winsB - winsA;
    return (b.cheesyLevel + b.spicyLevel + b.warmLevel + b.crispyLevel) - (a.cheesyLevel + a.spicyLevel + a.warmLevel + a.crispyLevel);
  });

  let currentRank = 3;
  remainingFoods.forEach(food => {
    const stage = eliminationRound.get(food.id) || 'CONTENDER';
    ranked.push({
      rank: currentRank++,
      food,
      stageEliminated: `ELIMINATED IN ${stage}`,
      wins: winCounts.get(food.id) || 0
    });
  });

  // Return appropriate top N based on contender count
  if (initialContenders.length === 2) {
    return ranked.slice(0, 2);
  } else if (initialContenders.length === 4) {
    return ranked.slice(0, 4);
  } else {
    return ranked.slice(0, 5); // Show top 5 for 8 and 16
  }
}
