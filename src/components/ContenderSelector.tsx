import React from 'react';
import { ArrowRight, Swords, Check, Flame, Trophy, Clock, AlertTriangle } from 'lucide-react';
import { ComfortCategory, ContenderCount } from '../types';
import { CATEGORIES_CONFIG } from '../data/foods';
import { sound } from '../utils/sound';

interface ContenderSelectorProps {
  category: ComfortCategory;
  selectedCount: ContenderCount;
  onSelectCount: (count: ContenderCount) => void;
  onStartTournament: () => void;
  onBack: () => void;
}

const CONTENDER_OPTIONS: {
  count: ContenderCount;
  numberDisplay: string;
  name: string;
  badge: string;
  battles: string;
  timeEst: string;
  intensity: string;
  intensityScore: number;
  description: string;
  accentBg: string;
  accentText: string;
}[] = [
  {
    count: 2,
    numberDisplay: '02',
    name: 'QUICK VERDICT',
    badge: 'INSTANT CLASH',
    battles: '1 Single Battle',
    timeEst: '~1 min',
    intensity: 'Mild & Direct',
    intensityScore: 1,
    description: 'Two iconic heavyweights face off in an immediate final showdown. Zero warmups.',
    accentBg: '#FEF3C7',
    accentText: '#8A5B00'
  },
  {
    count: 4,
    numberDisplay: '04',
    name: 'SMALL BATTLE',
    badge: 'A LITTLE COMPETITION',
    battles: '3 Total Battles',
    timeEst: '~2 mins',
    intensity: 'Brisk Tournament',
    intensityScore: 2,
    description: 'Semifinals into the Final. Four elite contenders battling for comfort food supremacy.',
    accentBg: '#FFEDD5',
    accentText: '#843806'
  },
  {
    count: 8,
    numberDisplay: '08',
    name: 'SERIOUS BUSINESS',
    badge: 'GETTING SERIOUS',
    battles: '7 Total Battles',
    timeEst: '~4 mins',
    intensity: 'High Stakes',
    intensityScore: 3,
    description: 'Quarterfinals, Semifinals, and Final. Expect excruciatingly tough decisions.',
    accentBg: '#FEE2E2',
    accentText: '#A22204'
  },
  {
    count: 16,
    numberDisplay: '16',
    name: 'ULTIMATE FOODWAR',
    badge: 'THE GAUNTLET',
    battles: '15 Epic Battles',
    timeEst: '~8 mins',
    intensity: 'Supreme Championship',
    intensityScore: 4,
    description: 'The complete 16-contender gauntlet across four tournament stages. Only the true icon survives.',
    accentBg: '#FCE7F3',
    accentText: '#9C1751'
  }
];

export const ContenderSelector: React.FC<ContenderSelectorProps> = ({
  category,
  selectedCount,
  onSelectCount,
  onStartTournament,
  onBack,
}) => {
  const categoryConfig = CATEGORIES_CONFIG[category];

  const handleSelect = (count: ContenderCount) => {
    sound.playClick();
    onSelectCount(count);
  };

  const handleStart = () => {
    sound.playVerdict();
    onStartTournament();
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between min-h-[calc(100vh-80px)]">
      
      {/* Top Breadcrumb & Step Info */}
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-[#1A1A1A] pb-3 mb-6 gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="bg-[#FF6321] text-white px-2.5 py-0.5 text-[10px] sm:text-xs font-black tracking-wider">
              STEP 02 OF 02
            </span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-stone-600">
              BRACKET SCALE
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#1A1A1A] self-end sm:self-auto">
            <span>DIVISION:</span>
            <span className="bg-[#1A1A1A] text-white px-2.5 py-0.5 flex items-center gap-1">
              <span className="text-xs sm:text-sm">{categoryConfig.emoji}</span>
              <span>{categoryConfig.name}</span>
            </span>
          </div>
        </div>

        {/* Title Header */}
        <div className="max-w-2xl mb-8">
          <h2 className="font-display text-4xl sm:text-7xl text-[#1A1A1A] tracking-tighter leading-[0.9] font-black">
            HOW BIG IS YOUR FOODWAR?
          </h2>
          <p className="mt-2 font-editorial text-lg sm:text-2xl text-[#1A1A1A] font-black uppercase tracking-tight">
            Choose how many contenders enter the judging arena.
          </p>
          <p className="mt-1 text-xs sm:text-sm text-stone-700 font-medium">
            More contenders means deeper tournament brackets and more demanding head-to-head verdicts.
          </p>
        </div>

        {/* Four Big Contender Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CONTENDER_OPTIONS.map((opt) => {
            const isSelected = selectedCount === opt.count;

            return (
              <div
                key={opt.count}
                onClick={() => handleSelect(opt.count)}
                className={`relative cursor-pointer transition-all duration-300 border-3 ${
                  isSelected
                    ? 'border-[#1A1A1A] bg-white scale-[1.03] z-20 shadow-[8px_8px_0px_#FF6321]'
                    : 'border-[#1A1A1A] bg-[#FBFBF2] hover:bg-white hover:scale-[1.01] shadow-[4px_4px_0px_#1A1A1A]'
                }`}
              >
                {/* Stamp if selected */}
                {isSelected && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6321] text-white px-3 py-0.5 border-2 border-[#1A1A1A] text-[11px] font-black tracking-widest uppercase z-30 flex items-center gap-1 shadow-md">
                    <Check className="w-3.5 h-3.5" />
                    <span>CHOSEN BRACKET</span>
                  </div>
                )}

                <div className="p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
                  
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span 
                      className="px-2 py-0.5 border border-[#1A1A1A] font-mono uppercase tracking-wider text-[10px] font-bold"
                      style={{ backgroundColor: opt.accentBg, color: opt.accentText }}
                    >
                      {opt.badge}
                    </span>
                    <span className="flex items-center gap-1 text-stone-600 font-mono text-[11px] font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {opt.timeEst}
                    </span>
                  </div>

                  {/* Giant Number */}
                  <div className="my-2 text-center py-2 border-y-2 border-dashed border-[#1A1A1A]/30">
                    <div 
                      className={`font-display text-7xl sm:text-8xl leading-none tracking-tighter transition-colors font-black ${
                        isSelected ? 'text-[#FF6321]' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {opt.numberDisplay}
                    </div>
                    <div className="font-editorial text-lg font-black text-[#1A1A1A] uppercase tracking-wider mt-1">
                      {opt.name}
                    </div>
                    <div className="text-xs font-bold text-stone-500 uppercase mt-0.5">
                      {opt.battles}
                    </div>
                  </div>

                  {/* Intensity Indicator */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-stone-700">
                      <span>Intensity</span>
                      <span className="text-[#1A1A1A]">{opt.intensity}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-2 flex-grow border border-[#1A1A1A] ${
                            step <= opt.intensityScore
                              ? isSelected ? 'bg-[#FF6321]' : 'bg-[#1A1A1A]'
                              : 'bg-stone-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 font-medium leading-relaxed min-h-[3rem]">
                    {opt.description}
                  </p>

                  {/* Select button preview */}
                  <div
                    className={`w-full py-2.5 px-3 text-center text-xs font-black tracking-widest uppercase border-2 transition-all ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FDE047]'
                    }`}
                  >
                    {isSelected ? '✓ READY TO FIGHT' : 'SELECT BRACKET'}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="mt-8 pt-6 border-t-2 border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="text-xs font-black uppercase tracking-wider text-stone-600 hover:text-[#1A1A1A] underline underline-offset-4 py-2 cursor-pointer"
        >
          ← Change Comfort Category
        </button>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="hidden md:flex flex-col text-right text-xs">
            <span className="font-black text-[#1A1A1A] uppercase">
              {selectedCount} Contenders • {categoryConfig.name} Style
            </span>
            <span className="text-stone-500 font-medium">
              Generating randomized culinary bracket
            </span>
          </div>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FF6321] hover:bg-[#E55315] text-white px-9 py-4 sm:py-5 text-xl sm:text-2xl font-black tracking-widest uppercase border-3 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-sm transition-all cursor-pointer"
          >
            <span>COMMENCE THE FOODWAR</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

    </div>
  );
};

