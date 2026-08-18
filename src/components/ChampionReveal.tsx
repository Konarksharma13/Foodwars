import React, { useEffect } from 'react';
import { FoodItem, ComfortCategory } from '../types';
import { Trophy, ArrowRight, Sparkles, Award, Globe, Flame, Star, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { CATEGORIES_CONFIG } from '../data/foods';

interface ChampionRevealProps {
  champion: FoodItem;
  category: ComfortCategory;
  defeatedCount: number;
  onProceedToResults: () => void;
}

export const ChampionReveal: React.FC<ChampionRevealProps> = ({
  champion,
  category,
  defeatedCount,
  onProceedToResults,
}) => {
  const categoryConfig = CATEGORIES_CONFIG[category];

  useEffect(() => {
    // Play sound fanfare
    sound.playChampionFanfare();

    // Trigger celebratory confetti burst
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF6321', '#FDE047', '#1A1A1A', '#10B981', '#FFFFFF'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF6321', '#FDE047', '#1A1A1A', '#10B981', '#FFFFFF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const handleProceed = () => {
    sound.playClick();
    onProceedToResults();
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-[#FF6321] text-white px-2.5 py-0.5 text-xs font-black tracking-wider animate-pulse">
            CHAMPIONSHIP CONCLUDED
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-stone-600">
            OFFICIAL CROWNING
          </span>
        </div>
        <div className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>{defeatedCount} CONTENDERS ELIMINATED</span>
        </div>
      </div>

      {/* Main Champion Hero Magazine Cover */}
      <div className="relative flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        
        {/* Left Visual Poster (7 Cols) */}
        <div className="lg:col-span-7 relative">
          
          {/* Decorative Offset Backdrop */}
          <div className="absolute -inset-3 bg-[#FDE047] rotate-1 border-3 border-[#1A1A1A] -z-10 shadow-[6px_6px_0px_#1A1A1A]"></div>

          {/* Main Poster Container */}
          <div className="relative bg-white border-3 border-[#1A1A1A] p-4 sm:p-5 shadow-[8px_8px_0px_#1A1A1A] overflow-hidden">
            
            {/* Image Box */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden border-2 border-[#1A1A1A] bg-stone-950 group">
              <img
                src={champion.image}
                alt={champion.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* High contrast gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent opacity-85"></div>

              {/* Gold Champion Medallion */}
              <div className="absolute top-3 left-3 bg-[#FDE047] text-[#1A1A1A] px-4 py-1.5 border-2 border-[#1A1A1A] font-display text-base sm:text-lg tracking-wider uppercase rotate-[-3deg] shadow-[4px_4px_0px_#1A1A1A] flex items-center gap-1.5 font-black">
                <Trophy className="w-5 h-5 text-[#1A1A1A]" />
                <span>TOURNAMENT CHAMPION</span>
              </div>

              {/* Cuisine Tag */}
              <div className="absolute top-3 right-3 bg-white text-[#1A1A1A] px-3 py-1 border-2 border-[#1A1A1A] font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#1A1A1A] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>{champion.cuisine}</span>
              </div>

              {/* Bottom Image Headline */}
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <span className="bg-[#FF6321] text-white text-[10px] font-black uppercase px-2 py-0.5 tracking-widest">
                  YOUR VERDICT WINNER
                </span>
                <h3 className="font-display text-4xl sm:text-6xl text-white tracking-tight leading-none drop-shadow-md font-black uppercase">
                  {champion.name}
                </h3>
              </div>
            </div>

            {/* Sub-quote on poster */}
            <div className="mt-3 pt-3 border-t-2 border-dashed border-[#1A1A1A]/30 flex items-center justify-between text-xs text-[#1A1A1A]">
              <span className="font-serif text-sm italic text-stone-700">
                "{champion.comfortReason}"
              </span>
              <span className="font-mono font-black text-[#FF6321] uppercase shrink-0 ml-2">
                100% UNCONTESTED
              </span>
            </div>
          </div>
        </div>

        {/* Right Editorial Verdict Summary Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-[#FEF3C7] px-3 py-1 text-xs font-black tracking-wider text-[#8A5B00] uppercase shadow-[2px_2px_0px_#1A1A1A]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>THE VERDICT IS IN</span>
            </div>

            <h2 className="font-display text-5xl sm:text-7xl text-[#1A1A1A] tracking-tighter leading-[0.88] font-black">
              YOUR ULTIMATE COMFORT FOOD
            </h2>
            
            <p className="font-editorial text-2xl text-[#FF6321] font-black uppercase tracking-tight">
              {champion.name}
            </p>
          </div>

          <p className="text-stone-700 text-base leading-relaxed font-medium">
            Out of <strong>{defeatedCount + 1}</strong> elite {categoryConfig.name.toLowerCase()} contenders, you passed the final verdict. Through every matchup, {champion.name} emerged supreme as your undisputed comfort sanctuary.
          </p>

          {/* Quick Highlight Stats Box */}
          <div className="bg-white border-2 border-[#1A1A1A] p-4 shadow-[4px_4px_0px_#1A1A1A] space-y-3">
            <div className="text-xs font-mono font-black uppercase tracking-widest text-stone-500">
              CHAMPIONSHIP RECORD
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-[#FBFBF2] border-2 border-[#1A1A1A] p-2.5">
                <div className="font-display text-4xl text-[#FF6321] font-black">
                  {defeatedCount}
                </div>
                <div className="text-[10px] font-black text-stone-600 uppercase tracking-wider">
                  Contenders Defeated
                </div>
              </div>

              <div className="bg-[#FBFBF2] border-2 border-[#1A1A1A] p-2.5">
                <div className="font-display text-4xl text-[#10B981] font-black">
                  #1
                </div>
                <div className="text-[10px] font-black text-stone-600 uppercase tracking-wider">
                  Global Bracket Rank
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-700 font-medium">
              <strong className="text-[#1A1A1A]">Origin Insight:</strong> {champion.highlightFact}
            </p>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="group inline-flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#FF6321] text-white px-8 py-4 sm:py-5 text-xl sm:text-2xl font-black tracking-widest uppercase border-3 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <span>VIEW FOOD PERSONALITY & RESULTS</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>

        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="mt-8 pt-4 border-t-2 border-[#1A1A1A] flex items-center justify-between text-xs text-stone-600 font-black uppercase tracking-wider">
        <span>FOODWARS VERDICT ARCHIVE • CERTIFIED CULINARY JUDGMENT</span>
        <span>NEXT: FOOD DNA & PERSONALITY BREAKDOWN →</span>
      </div>

    </div>
  );
};

