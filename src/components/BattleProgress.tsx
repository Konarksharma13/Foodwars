import React from 'react';
import { Trophy, ShieldCheck, Flame, Scale } from 'lucide-react';
import { ComfortCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/foods';

interface BattleProgressProps {
  category: ComfortCategory;
  roundIndex: number;
  totalRounds: number;
  roundName: string;
  matchIndex: number;
  totalMatchesInRound: number;
  totalBattlesCompleted: number;
  totalTournamentBattles: number;
  isFinal: boolean;
}

export const BattleProgress: React.FC<BattleProgressProps> = ({
  category,
  roundIndex,
  totalRounds,
  roundName,
  matchIndex,
  totalMatchesInRound,
  totalBattlesCompleted,
  totalTournamentBattles,
  isFinal,
}) => {
  const categoryConfig = CATEGORIES_CONFIG[category];
  const progressPercent = Math.min(
    100,
    Math.round(((totalBattlesCompleted + 1) / totalTournamentBattles) * 100)
  );

  return (
    <div className="w-full bg-white border-2 border-[#1A1A1A] p-3 sm:p-4 mb-4 sm:mb-6 shadow-[4px_4px_0px_#1A1A1A]">
      
      {/* Top row: Stage Title & Counters */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b-2 border-[#1A1A1A]/20">
        
        {/* Left: Round & Division Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span 
            className="px-3 py-1 text-xs font-black tracking-widest uppercase border-2 border-[#1A1A1A] text-white flex items-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A]"
            style={{ backgroundColor: isFinal ? '#FF4444' : '#1A1A1A' }}
          >
            {isFinal ? <Trophy className="w-3.5 h-3.5 text-[#FDE047]" /> : <Scale className="w-3.5 h-3.5 text-[#FF6321]" />}
            <span>{roundName}</span>
          </span>

          <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
            STAGE {roundIndex} OF {totalRounds}
          </span>
        </div>

        {/* Right: Match Position & Total Progress */}
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono font-bold text-[#1A1A1A]">
          <span className="bg-[#FBFBF2] px-2 py-1 sm:px-2.5 sm:py-1 border-2 border-[#1A1A1A]">
            MATCH {matchIndex}/{totalMatchesInRound}
          </span>
          <span className="text-[#1A1A1A]/40 hidden sm:inline">•</span>
          <span className="bg-[#FDE047] text-[#1A1A1A] px-2.5 py-1 border-2 border-[#1A1A1A] font-black hidden lg:inline">
            BATTLE {totalBattlesCompleted + 1} OF {totalTournamentBattles}
          </span>
        </div>
      </div>

      {/* Bottom row: Thick Magazine Progress Bar */}
      <div className="mt-2.5 flex items-center gap-3">
        <div className="flex-grow bg-stone-100 h-3 sm:h-3.5 border-2 border-[#1A1A1A] overflow-hidden relative">
          <div
            className="h-full transition-all duration-500 ease-out border-r-2 border-[#1A1A1A]"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: isFinal ? '#FF4444' : '#FF6321',
            }}
          />
        </div>

        <span className="text-[10px] sm:text-xs font-black text-[#1A1A1A] shrink-0 font-mono">
          {progressPercent}%
        </span>
      </div>

      {/* Editorial subtitle label */}
      <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[11px] font-black text-stone-600 uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF6321] inline-block animate-pulse"></span>
          <span>JUDGE'S BENCH ACTIVE</span>
        </span>
        <span className="hidden md:inline text-stone-500 font-mono font-bold">
          SHORTCUTS: [1] LEFT OR [2] RIGHT
        </span>
      </div>

    </div>
  );
};

