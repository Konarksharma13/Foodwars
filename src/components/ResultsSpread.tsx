import React from 'react';
import { FoodItem, ComfortCategory, FoodPersonality, BattleRecordStats, RankedFood } from '../types';
import { Trophy, RotateCcw, Award, Globe, Flame, Star, Sparkles, Scale, Heart, ShieldCheck, Share2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { CATEGORIES_CONFIG } from '../data/foods';

interface ResultsSpreadProps {
  champion: FoodItem;
  category: ComfortCategory;
  personality: FoodPersonality;
  stats: BattleRecordStats;
  rankings: RankedFood[];
  onRestart: () => void;
}

export const ResultsSpread: React.FC<ResultsSpreadProps> = ({
  champion,
  category,
  personality,
  stats,
  rankings,
  onRestart,
}) => {
  const categoryConfig = CATEGORIES_CONFIG[category];

  const handleRestartClick = () => {
    sound.playClick();
    onRestart();
  };

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-14">
      
      {/* Magazine Issue Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-[#1A1A1A] pb-3 text-xs font-black tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="bg-[#1A1A1A] text-white px-2.5 py-0.5 text-[11px] font-black">
            OFFICIAL DOSSIER
          </span>
          <span>THE JUDGE’S VERDICT SPREAD</span>
        </div>
        <div className="flex items-center gap-4 text-stone-700">
          <span>{categoryConfig.name.toUpperCase()} DIVISION</span>
          <span>•</span>
          <span className="text-[#FF6321]">{stats.contendersCount} CONTENDER BRACKET</span>
        </div>
      </div>

      {/* Hero Section: Champion Feature & Verdict Header */}
      <div className="bg-white border-3 border-[#1A1A1A] p-4 sm:p-8 shadow-[6px_6px_0px_#1A1A1A] sm:shadow-[8px_8px_0px_#1A1A1A]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Champion Visual Feature (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden border-2 border-[#1A1A1A] bg-stone-950">
              <img
                src={champion.image}
                alt={champion.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent"></div>

              {/* Champion Badge */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#FDE047] text-[#1A1A1A] px-2.5 py-0.5 sm:px-3.5 sm:py-1 border-2 border-[#1A1A1A] font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1A1A1A] sm:shadow-[3px_3px_0px_#1A1A1A] flex items-center gap-1.5">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-[#1A1A1A]" />
                <span>ULTIMATE CHAMPION</span>
              </div>

              {/* Bottom Image Tag */}
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#FF6321]">
                  {champion.cuisine} • {champion.originCountry}
                </div>
                <h3 className="font-display text-2xl sm:text-4xl text-white leading-none font-black uppercase mt-0.5">
                  {champion.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Right Verdict Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF6321]">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>THE SUPREME VERDICT</span>
            </div>

            <h2 className="font-display text-3xl sm:text-6xl text-[#1A1A1A] tracking-tighter leading-[0.9] font-black uppercase">
              YOUR COMFORT FOOD CROWN GOES TO {champion.name}
            </h2>

            <p className="text-sm sm:text-lg text-stone-800 font-serif italic leading-relaxed">
              "{champion.comfortReason}"
            </p>

            <div className="border-t-2 border-dashed border-[#1A1A1A]/30 pt-3 text-[10px] sm:text-xs text-stone-700 space-y-1 font-medium leading-relaxed">
              <p>
                <strong className="text-[#1A1A1A] font-black uppercase">Culinary Profile:</strong> {champion.description}
              </p>
              <p>
                <strong className="text-[#1A1A1A] font-black uppercase">Heritage Note:</strong> {champion.highlightFact}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2-Column Spread: Food Personality & Food DNA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Food Personality Card (7 Cols) */}
        <div 
          className="lg:col-span-7 border-3 border-[#1A1A1A] p-6 sm:p-8 shadow-[8px_8px_0px_#1A1A1A] relative overflow-hidden flex flex-col justify-between"
          style={{ backgroundColor: personality.bgLight }}
        >
          {/* Watermark badge */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div 
                className="px-3.5 py-1 border-2 border-[#1A1A1A] text-xs font-black tracking-widest uppercase shadow-[2px_2px_0px_#1A1A1A]"
                style={{ backgroundColor: personality.color, color: '#FFFFFF' }}
              >
                {personality.badge}
              </div>
              <span className="text-xs font-mono font-black text-stone-600 uppercase tracking-widest">
                VERDICT PSYCHOLOGY
              </span>
            </div>

            <div>
              <div className="text-xs font-black text-stone-700 uppercase tracking-wider">
                WHAT YOUR VERDICTS SAY ABOUT YOU:
              </div>
              <h3 className="font-display text-4xl sm:text-5xl text-[#1A1A1A] tracking-tighter mt-1 leading-none font-black uppercase">
                {personality.title}
              </h3>
              <p className="font-editorial text-lg sm:text-xl text-[#FF6321] font-black mt-1.5 uppercase">
                "{personality.tagline}"
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
              {personality.description}
            </p>
          </div>

          {/* Bottom Personality Insight Box */}
          <div className="mt-6 pt-4 border-t-2 border-[#1A1A1A]/20 bg-white/90 border border-[#1A1A1A]/40 p-3.5 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
              JUDGE’S HABIT ANALYSIS:
            </div>
            <p className="text-xs text-stone-700 font-medium">
              {personality.verdictAnalysis}
            </p>
          </div>
        </div>

        {/* Right: Food DNA Attribute Bars (5 Cols) */}
        <div className="lg:col-span-5 bg-white border-3 border-[#1A1A1A] p-6 sm:p-8 shadow-[8px_8px_0px_#1A1A1A] space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#1A1A1A]/20 pb-2">
              <h3 className="font-display text-3xl text-[#1A1A1A] tracking-tight leading-none font-black uppercase">
                YOUR FOOD DNA
              </h3>
              <span className="text-xs font-mono font-black text-[#FF6321] uppercase">
                CALCULATED RATINGS
              </span>
            </div>

            <p className="text-xs text-stone-700 font-medium mt-2">
              Mathematical synthesis of flavor attributes from the contenders you advanced throughout the competition.
            </p>
          </div>

          {/* Thick Expressive Bars */}
          <div className="space-y-3.5 my-2">
            {[
              { name: 'CHEESY', emoji: '🧀', score: stats.flavorDNA.cheesy, color: '#E5A912' },
              { name: 'SPICY', emoji: '🔥', score: stats.flavorDNA.spicy, color: '#FF6321' },
              { name: 'SWEET', emoji: '🍯', score: stats.flavorDNA.sweet, color: '#E04886' },
              { name: 'WARM', emoji: '🍲', score: stats.flavorDNA.warm, color: '#C86218' },
              { name: 'CRISPY', emoji: '🥨', score: stats.flavorDNA.crispy, color: '#10B981' },
            ].map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                  <span className="flex items-center gap-1.5">
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className="font-mono">{item.score}%</span>
                </div>
                
                {/* Thick Bar */}
                <div className="h-4 w-full bg-stone-100 border-2 border-[#1A1A1A] overflow-hidden">
                  <div
                    className="h-full border-r-2 border-[#1A1A1A] transition-all duration-700"
                    style={{
                      width: `${Math.max(8, item.score)}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-stone-600 font-mono font-bold italic text-center">
            ★ Dominant Dimension: {stats.topAttributeName} ({stats.topAttributeScore}%)
          </div>
        </div>

      </div>

      {/* Battle Record Stats (Editorial Infographic Numbers) */}
      <div className="bg-[#1A1A1A] text-[#FBFBF2] border-3 border-[#1A1A1A] p-6 sm:p-8 shadow-[8px_8px_0px_#FF6321] space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-stone-700 pb-3">
          <h3 className="font-display text-3xl sm:text-4xl text-white tracking-tight leading-none flex items-center gap-2 font-black uppercase">
            <Scale className="w-6 h-6 text-[#FF6321]" />
            <span>YOUR FOODWARS RECORD</span>
          </h3>
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase font-black">
            TOURNAMENT AUDIT
          </span>
        </div>

        {/* 4 Big Number Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="border-2 border-stone-700 bg-stone-900/90 p-4">
            <div className="font-display text-5xl sm:text-6xl text-[#FF6321] leading-none font-black">
              {stats.contendersCount < 10 ? `0${stats.contendersCount}` : stats.contendersCount}
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-stone-300 mt-1">
              Contenders
            </div>
          </div>

          <div className="border-2 border-stone-700 bg-stone-900/90 p-4">
            <div className="font-display text-5xl sm:text-6xl text-[#FDE047] leading-none font-black">
              {stats.eliminatedCount < 10 ? `0${stats.eliminatedCount}` : stats.eliminatedCount}
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-stone-300 mt-1">
              Eliminated
            </div>
          </div>

          <div className="border-2 border-stone-700 bg-stone-900/90 p-4">
            <div className="font-display text-5xl sm:text-6xl text-[#10B981] leading-none font-black">
              {stats.totalBattles < 10 ? `0${stats.totalBattles}` : stats.totalBattles}
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-stone-300 mt-1">
              Battles Judged
            </div>
          </div>

          <div className="border-2 border-stone-700 bg-stone-900/90 p-4">
            <div className="font-display text-5xl sm:text-6xl text-white leading-none font-black">
              01
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-stone-300 mt-1">
              Supreme Champion
            </div>
          </div>
        </div>

        {/* Toughest Decision & Upset Sidebars */}
        {(stats.toughestDecision || stats.biggestUpset) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {stats.toughestDecision && (
              <div className="bg-stone-900 border border-stone-700 p-4 space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#FDE047]">
                  ⚡ TOUGHEST CLASH
                </div>
                <div className="text-sm font-black text-white">
                  {stats.toughestDecision.foodA.name} <span className="text-[#FF6321]">vs</span> {stats.toughestDecision.foodB.name}
                </div>
                <p className="text-xs text-stone-400 font-medium">
                  {stats.toughestDecision.notes}
                </p>
              </div>
            )}

            {stats.biggestUpset && (
              <div className="bg-stone-900 border border-stone-700 p-4 space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  ★ DECISIVE STATEMENT
                </div>
                <div className="text-sm font-black text-white">
                  {stats.biggestUpset.winner.name} defeated {stats.biggestUpset.loser.name}
                </div>
                <p className="text-xs text-stone-400 font-medium">
                  {stats.biggestUpset.notes}
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Top Food Ranking Section */}
      <div className="bg-white border-3 border-[#1A1A1A] p-6 sm:p-8 shadow-[8px_8px_0px_#1A1A1A] space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1A1A1A]/20 pb-3">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight leading-none font-black uppercase">
              YOUR FOOD RANKING
            </h3>
            <p className="text-xs text-stone-700 font-medium mt-1">
              Top contenders ranked strictly by your actual judging verdicts.
            </p>
          </div>
          <span className="text-xs font-mono font-black text-stone-600 uppercase">
            TOP {rankings.length} STANDINGS
          </span>
        </div>

        {/* Ranked Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rankings.map((item) => {
            const isRank1 = item.rank === 1;

            return (
              <div
                key={item.food.id}
                className={`relative flex flex-col justify-between border-2 overflow-hidden p-3 sm:p-4 transition-all ${
                  isRank1
                    ? 'border-[#1A1A1A] bg-[#FEFCE8] ring-2 ring-[#FF6321] sm:col-span-2 lg:col-span-1 shadow-[4px_4px_0px_#1A1A1A]'
                    : 'border-[#1A1A1A] bg-[#FBFBF2] hover:bg-white shadow-[3px_3px_0px_#1A1A1A]'
                }`}
              >
                {/* Rank Number Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span 
                      className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-display text-base sm:text-lg border-2 font-black ${
                        isRank1
                          ? 'bg-[#FDE047] text-[#1A1A1A] border-[#1A1A1A]'
                          : 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      }`}
                    >
                      #{item.rank}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-stone-700">
                      {item.food.cuisine}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-black uppercase text-[#FF6321]">
                    {item.wins} {item.wins === 1 ? 'WIN' : 'WINS'}
                  </span>
                </div>

                {/* Thumbnail and Title */}
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 overflow-hidden border-2 border-[#1A1A1A] bg-stone-900">
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-display text-lg sm:text-xl text-[#1A1A1A] leading-tight font-black uppercase">
                      {item.food.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-stone-600 line-clamp-2 font-medium">
                      {item.food.subtitle}
                    </p>
                  </div>
                </div>

                {/* Stage eliminated footer */}
                <div className="mt-3 pt-2 border-t border-[#1A1A1A]/20 text-[9px] sm:text-[10px] font-mono uppercase text-stone-600 flex justify-between font-bold">
                  <span>{item.stageEliminated}</span>
                  {isRank1 && <span className="text-[#FF6321] font-black">★ VERDICT CROWN</span>}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Final Action CTA Block */}
      <div className="text-center py-6 sm:py-10 space-y-4">
        <h3 className="font-display text-3xl sm:text-5xl text-[#1A1A1A] tracking-tight font-black uppercase">
          READY FOR ANOTHER FOODWAR?
        </h3>
        <p className="text-stone-700 text-sm max-w-md mx-auto font-medium">
          Test another comfort category or expand your contender bracket to discover new culinary insights.
        </p>

        <div className="pt-2">
          <button
            onClick={handleRestartClick}
            className="inline-flex items-center justify-center gap-3 bg-[#FF6321] hover:bg-[#E55315] text-white px-10 py-5 text-2xl font-black tracking-widest uppercase border-3 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <RotateCcw className="w-6 h-6" />
            <span>START ANOTHER BATTLE</span>
          </button>
        </div>
      </div>

    </div>
  );
};

