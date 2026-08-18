import React, { useState } from 'react';
import { 
  AppScreen, 
  ComfortCategory, 
  ContenderCount, 
  FoodItem, 
  Matchup, 
  FoodPersonality, 
  BattleRecordStats, 
  RankedFood 
} from './types';
import { Header } from './components/Header';
import { Landing } from './components/Landing';
import { ComfortSelector } from './components/ComfortSelector';
import { ContenderSelector } from './components/ContenderSelector';
import { BattleScreen } from './components/BattleScreen';
import { ChampionReveal } from './components/ChampionReveal';
import { ResultsSpread } from './components/ResultsSpread';
import { 
  generateContenderPool, 
  createRoundMatchups, 
  getTotalRounds, 
  calculateFoodPersonality, 
  calculateBattleStats, 
  generateFoodRankings 
} from './utils/tournamentLogic';
import { sound } from './utils/sound';

export default function App() {
  // Screen and Audio state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Setup configuration state
  const [selectedCategory, setSelectedCategory] = useState<ComfortCategory | null>('spicy');
  const [selectedCount, setSelectedCount] = useState<ContenderCount>(8);

  // Tournament execution state
  const [initialContenders, setInitialContenders] = useState<FoodItem[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(1);
  const [totalRounds, setTotalRounds] = useState<number>(3);
  const [currentRoundMatchups, setCurrentRoundMatchups] = useState<Matchup[]>([]);
  const [currentMatchIndexInRound, setCurrentMatchIndexInRound] = useState<number>(0);
  const [nextRoundWinners, setNextRoundWinners] = useState<FoodItem[]>([]);
  const [allCompletedMatchups, setAllCompletedMatchups] = useState<Matchup[]>([]);
  const [champion, setChampion] = useState<FoodItem | null>(null);

  // Toggle audio effects
  const handleToggleSound = () => {
    const isEnabled = sound.toggleMute();
    setSoundEnabled(isEnabled);
  };

  // Reset / New Battle
  const handleResetToLanding = () => {
    setCurrentScreen('landing');
    setInitialContenders([]);
    setCurrentRoundMatchups([]);
    setNextRoundWinners([]);
    setAllCompletedMatchups([]);
    setChampion(null);
    setCurrentMatchIndexInRound(0);
    setCurrentRoundIndex(1);
  };

  // Navigation handlers
  const handleStartFromLanding = () => {
    setCurrentScreen('category_select');
  };

  const handleCategoryChosen = (category: ComfortCategory) => {
    setSelectedCategory(category);
  };

  const handleProceedToContenders = () => {
    setCurrentScreen('contender_select');
  };

  const handleContenderCountChosen = (count: ContenderCount) => {
    setSelectedCount(count);
  };

  // Start the tournament battle
  const handleStartTournament = () => {
    if (!selectedCategory) return;

    // 1. Generate randomized food pool for chosen category and size
    const pool = generateContenderPool(selectedCategory, selectedCount);
    setInitialContenders(pool);

    // 2. Setup round 1 matchups
    const roundsCount = getTotalRounds(selectedCount);
    setTotalRounds(roundsCount);
    setCurrentRoundIndex(1);

    const firstRoundMatchups = createRoundMatchups(pool, 1);
    setCurrentRoundMatchups(firstRoundMatchups);
    setCurrentMatchIndexInRound(0);
    setNextRoundWinners([]);
    setAllCompletedMatchups([]);
    setChampion(null);

    // 3. Enter battle screen
    setCurrentScreen('battle');
  };

  // Handle verdict selection in a battle
  const handleVerdict = (winner: FoodItem, loser: FoodItem) => {
    const currentMatch = currentRoundMatchups[currentMatchIndexInRound];
    if (!currentMatch) return;

    const completedMatch: Matchup = {
      ...currentMatch,
      winner,
      loser,
      chosenAt: Date.now(),
    };

    const updatedCompleted = [...allCompletedMatchups, completedMatch];
    setAllCompletedMatchups(updatedCompleted);

    const updatedRoundWinners = [...nextRoundWinners, winner];
    setNextRoundWinners(updatedRoundWinners);

    // Check if there are more matches in the current round
    if (currentMatchIndexInRound + 1 < currentRoundMatchups.length) {
      // Advance to next match in the current round
      setCurrentMatchIndexInRound(prev => prev + 1);
    } else {
      // Current round is finished!
      if (updatedRoundWinners.length === 1) {
        // Tournament Winner crowned!
        const ultimateChampion = updatedRoundWinners[0];
        setChampion(ultimateChampion);
        setCurrentScreen('champion_reveal');
      } else {
        // Setup next round
        const nextRoundIdx = currentRoundIndex + 1;
        setCurrentRoundIndex(nextRoundIdx);
        const nextMatchups = createRoundMatchups(updatedRoundWinners, nextRoundIdx);
        setCurrentRoundMatchups(nextMatchups);
        setCurrentMatchIndexInRound(0);
        setNextRoundWinners([]);
      }
    }
  };

  // Transition from Champion Reveal to full Results & Personality spread
  const handleProceedToResults = () => {
    setCurrentScreen('results');
  };

  // Restart battle from results
  const handleRestartBattle = () => {
    setCurrentScreen('category_select');
  };

  // Calculate personality, stats, and rankings if champion is crowned
  let foodPersonality: FoodPersonality | null = null;
  let battleStats: BattleRecordStats | null = null;
  let rankings: RankedFood[] = [];

  if (champion && selectedCategory) {
    foodPersonality = calculateFoodPersonality(allCompletedMatchups, champion, selectedCategory);
    battleStats = calculateBattleStats(initialContenders, allCompletedMatchups, champion, selectedCategory);
    rankings = generateFoodRankings(initialContenders, allCompletedMatchups, champion);
  }

  // Calculate total battles in tournament
  const totalTournamentBattles = selectedCount - 1;
  const currentMatchup = currentRoundMatchups[currentMatchIndexInRound];

  return (
    <div className="min-h-screen bg-[#FBFBF2] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#FF6321] selection:text-white">
      
      {/* Editorial Header */}
      <Header
        currentScreen={currentScreen}
        selectedCategory={selectedCategory}
        onReset={handleResetToLanding}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Screen Body */}
      <main className="flex-grow flex flex-col">
        {currentScreen === 'landing' && (
          <Landing onStart={handleStartFromLanding} />
        )}

        {currentScreen === 'category_select' && (
          <ComfortSelector
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChosen}
            onProceed={handleProceedToContenders}
            onBack={handleResetToLanding}
          />
        )}

        {currentScreen === 'contender_select' && selectedCategory && (
          <ContenderSelector
            category={selectedCategory}
            selectedCount={selectedCount}
            onSelectCount={handleContenderCountChosen}
            onStartTournament={handleStartTournament}
            onBack={() => setCurrentScreen('category_select')}
          />
        )}

        {currentScreen === 'battle' && selectedCategory && currentMatchup && (
          <BattleScreen
            category={selectedCategory}
            currentMatchup={currentMatchup}
            roundIndex={currentRoundIndex}
            totalRounds={totalRounds}
            matchIndex={currentMatchIndexInRound + 1}
            totalMatchesInRound={currentRoundMatchups.length}
            totalBattlesCompleted={allCompletedMatchups.length}
            totalTournamentBattles={totalTournamentBattles}
            onVerdict={handleVerdict}
          />
        )}

        {currentScreen === 'champion_reveal' && champion && selectedCategory && (
          <ChampionReveal
            champion={champion}
            category={selectedCategory}
            defeatedCount={selectedCount - 1}
            onProceedToResults={handleProceedToResults}
          />
        )}

        {currentScreen === 'results' && champion && selectedCategory && foodPersonality && battleStats && (
          <ResultsSpread
            champion={champion}
            category={selectedCategory}
            personality={foodPersonality}
            stats={battleStats}
            rankings={rankings}
            onRestart={handleRestartBattle}
          />
        )}
      </main>

    </div>
  );
}
