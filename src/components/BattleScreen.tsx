import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Matchup, ComfortCategory, FoodItem } from '../types';
import { BattleProgress } from './BattleProgress';
import { BattleCard } from './BattleCard';
import { sound } from '../utils/sound';
import { Trophy, Flame, Swords, Award, AlertCircle } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/foods';

interface BattleScreenProps {
  category: ComfortCategory;
  currentMatchup: Matchup;
  roundIndex: number;
  totalRounds: number;
  matchIndex: number;
  totalMatchesInRound: number;
  totalBattlesCompleted: number;
  totalTournamentBattles: number;
  onVerdict: (winner: FoodItem, loser: FoodItem) => void;
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  category,
  currentMatchup,
  roundIndex,
  totalRounds,
  matchIndex,
  totalMatchesInRound,
  totalBattlesCompleted,
  totalTournamentBattles,
  onVerdict,
}) => {
  const [selectedWinnerId, setSelectedWinnerId] = useState<string | null>(null);
  const [isVerdictAnimating, setIsVerdictAnimating] = useState(false);

  const categoryConfig = CATEGORIES_CONFIG[category];
  const isFinal = roundIndex === totalRounds || currentMatchup.roundName.includes('FINAL');

  const handleMakeVerdict = useCallback((winner: FoodItem, loser: FoodItem) => {
    if (isVerdictAnimating) return;

    sound.playVerdict();
    setSelectedWinnerId(winner.id);
    setIsVerdictAnimating(true);

    // Brief delay to showcase winner scaling and "ADVANCES" animation before advancing
    setTimeout(() => {
      onVerdict(winner, loser);
      setSelectedWinnerId(null);
      setIsVerdictAnimating(false);
    }, 1100);
  }, [isVerdictAnimating, onVerdict]);

  // Keyboard shortcut listener for fast judging (1 or LeftArrow = FoodA, 2 or RightArrow = FoodB)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVerdictAnimating) return;

      if (e.key === '1' || e.key === 'ArrowLeft') {
        handleMakeVerdict(currentMatchup.foodA, currentMatchup.foodB);
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        handleMakeVerdict(currentMatchup.foodB, currentMatchup.foodA);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVerdictAnimating, currentMatchup, handleMakeVerdict]);

  return (
    <div className={`py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between min-h-[calc(100vh-80px)] ${isFinal ? 'bg-[#1A1A1A] text-white -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-8' : ''}`}>
      
      {/* Top Tournament Progress bar */}
      <BattleProgress
        category={category}
        roundIndex={roundIndex}
        totalRounds={totalRounds}
        roundName={currentMatchup.roundName}
        matchIndex={matchIndex}
        totalMatchesInRound={totalMatchesInRound}
        totalBattlesCompleted={totalBattlesCompleted}
        totalTournamentBattles={totalTournamentBattles}
        isFinal={isFinal}
      />

      {/* Center Stage Header */}
      <motion.div 
        key={`header-${currentMatchup.roundName}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-center my-2"
      >
        {isFinal ? (
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-[#FF4444] text-white px-4 py-1 border-2 border-white text-xs font-black tracking-widest uppercase animate-pulse shadow-[4px_4px_0px_#FF6321]">
              <Trophy className="w-4 h-4 text-[#FDE047]" />
              <span>THE GRAND FINAL SHOWDOWN</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight leading-none mt-1 font-black">
              CHOOSE YOUR CHAMPION
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-medium">
              Only one dish will be crowned your Ultimate Comfort Food.
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6321]">
              HEAD-TO-HEAD JUDGMENT
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-[#1A1A1A] tracking-tight leading-none font-black">
              WHICH ONE ADVANCES?
            </h2>
          </div>
        )}
      </motion.div>

      {/* Main Battle Grid with AnimatePresence keyed to current matchup ID */}
      <div className="relative my-4 flex-grow flex items-center justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMatchup.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="w-full relative flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch"
          >
            {/* Left Contender (Food A) */}
            <BattleCard
              key={`foodA-${currentMatchup.foodA.id}`}
              food={currentMatchup.foodA}
              side="left"
              isSelectedWinner={selectedWinnerId === currentMatchup.foodA.id}
              isSelectedLoser={selectedWinnerId === currentMatchup.foodB.id}
              isVerdictAnimating={isVerdictAnimating}
              onChoose={() => handleMakeVerdict(currentMatchup.foodA, currentMatchup.foodB)}
              keyboardShortcut="1"
              isFinal={isFinal}
            />

            {/* Center VS Starburst / Stamp Badge matching Design */}
            <div className="flex lg:absolute top-1/2 left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-30 pointer-events-none items-center justify-center my-[-20px] lg:my-0">
              <div className="relative flex items-center justify-center">
                
                {/* Pulsing ring */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#FF6321] animate-ping opacity-25 absolute"></div>
                
                {/* Main VS Medallion with bounce entrance */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: -5, opacity: 1 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
                  className="w-14 h-14 sm:w-20 lg:w-24 sm:h-20 lg:h-24 bg-[#FF6321] rounded-full flex flex-col items-center justify-center border-4 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] sm:shadow-[8px_8px_0px_#1A1A1A]"
                >
                  <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white italic leading-none">
                    VS
                  </span>
                  <span className="text-[6px] sm:text-[8px] font-black tracking-widest text-[#1A1A1A] uppercase bg-[#FDE047] px-1 sm:px-1.5 py-0.2 mt-0.5 border border-[#1A1A1A]">
                    CLASH
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Right Contender (Food B) */}
            <BattleCard
              key={`foodB-${currentMatchup.foodB.id}`}
              food={currentMatchup.foodB}
              side="right"
              isSelectedWinner={selectedWinnerId === currentMatchup.foodB.id}
              isSelectedLoser={selectedWinnerId === currentMatchup.foodA.id}
              isVerdictAnimating={isVerdictAnimating}
              onChoose={() => handleMakeVerdict(currentMatchup.foodB, currentMatchup.foodA)}
              keyboardShortcut="2"
              isFinal={isFinal}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Editorial Magazine Action & Status Bar matching Design Theme */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mt-8 pt-8 pb-3 px-4 sm:px-6 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A]"
      >
        {/* Floating verdict stamp above footer */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FDE047] text-[#1A1A1A] px-6 sm:px-12 py-1.5 sm:py-2 border-2 border-[#1A1A1A] font-black uppercase tracking-[0.3em] text-xs sm:text-sm shadow-[4px_4px_0px_#1A1A1A] whitespace-nowrap">
          VERDICT REQUIRED
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          {/* Round / Stage indicators with capsules */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black tracking-widest opacity-60 text-stone-300">
                CURRENT ROUND
              </span>
              <span className="text-sm font-black tracking-wider uppercase text-white">
                {currentMatchup.roundName}
              </span>
            </div>

            <div className="flex items-center gap-1.5 pl-3 border-l border-stone-700">
              {[...Array(totalMatchesInRound)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i + 1 === matchIndex ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ repeat: i + 1 === matchIndex ? Infinity : 0, duration: 2 }}
                  className={`h-2.5 rounded-full border border-white/40 transition-all ${
                    i + 1 < matchIndex
                      ? 'w-2.5 bg-[#FF6321]'
                      : i + 1 === matchIndex
                      ? 'w-5 bg-[#FDE047]'
                      : 'w-2.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Category Division */}
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-stone-400">CATEGORY:</span>
              <span className="text-[#FF6321]">{categoryConfig.name} BATTLE</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-stone-400 text-[11px] font-mono">
              <span>PRESS [1] OR [2] TO DECIDE</span>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};


