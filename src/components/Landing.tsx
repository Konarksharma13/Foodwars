import React from 'react';
import { ArrowRight, Trophy, Sparkles, Flame, ShieldAlert, Award, Star } from 'lucide-react';
import { sound } from '../utils/sound';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const handleStart = () => {
    sound.playClick();
    onStart();
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Side margin watermark text in theme */}
      <div className="hidden 2xl:block absolute top-[25%] left-[-4%] -rotate-90 text-[10px] font-black uppercase tracking-[0.5em] opacity-30 select-none pointer-events-none">
        Verdict required • The Final nears • Choose your champion
      </div>

      {/* Top Editorial Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#1A1A1A] pb-3 mb-6 sm:mb-8 text-xs font-black tracking-widest uppercase text-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <span className="bg-[#1A1A1A] text-white px-2.5 py-0.5 text-[11px] font-black tracking-wider">
            SPECIAL ISSUE
          </span>
          <span>THE 2026 COMFORT FOOD CHAMPIONSHIP</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline-block">HEAD-TO-HEAD TOURNAMENTS</span>
          <span className="hidden md:inline-block">•</span>
          <span className="bg-[#FDE047] text-[#1A1A1A] px-2 py-0.5 border border-[#1A1A1A] font-black">
            VERDICT REQUIRED
          </span>
        </div>
      </div>

      {/* Main Magazine Cover Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow">
        
        {/* Left Editorial Text Column (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          
          {/* Magazine Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 self-start border-2 border-[#1A1A1A] bg-[#FF6321] text-white px-4 py-1 text-xs font-black tracking-widest uppercase rotate-[-2deg] shadow-[4px_4px_0px_#1A1A1A]">
            <Flame className="w-3.5 h-3.5" />
            <span>THE ANNUAL COMFORT FOOD EDITION</span>
          </div>

          {/* Main Massive Title */}
          <div>
            <h1 className="font-display text-5xl sm:text-8xl xl:text-9xl text-[#1A1A1A] tracking-tighter leading-[0.85] select-none font-black">
              FOOD<span className="text-[#FF6321]">WARS</span>
            </h1>
            <p className="mt-3 font-editorial text-xl sm:text-2xl md:text-4xl text-[#1A1A1A] font-black tracking-tight leading-tight uppercase">
              Choose your ultimate comfort food.
            </p>
          </div>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base md:text-lg text-stone-700 font-medium max-w-xl leading-relaxed">
            <strong className="text-[#1A1A1A] font-black">You judge. The food competes.</strong>{' '}
            Pick your craving division, choose your tournament bracket, and make decisive head-to-head verdicts to crown your supreme champion and reveal your Food DNA.
          </p>

          {/* Five Categories Strip */}
          <div className="pt-2">
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#1A1A1A]/70 mb-2">
              5 CONTENDER CATEGORIES
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {[
                { name: 'Cheesy', emoji: '🧀', color: 'bg-[#FEF3C7] text-[#8A5B00] border-[#1A1A1A]' },
                { name: 'Spicy', emoji: '🔥', color: 'bg-[#FFEDD5] text-[#A22204] border-[#1A1A1A]' },
                { name: 'Sweet', emoji: '🍯', color: 'bg-[#FCE7F3] text-[#9C1751] border-[#1A1A1A]' },
                { name: 'Warm', emoji: '🍲', color: 'bg-[#FEF3C7] text-[#843806] border-[#1A1A1A]' },
                { name: 'Crispy', emoji: '🥨', color: 'bg-[#D1FAE5] text-[#065F3E] border-[#1A1A1A]' },
              ].map(cat => (
                <div
                  key={cat.name}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 border-2 text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${cat.color} shadow-[2px_2px_0px_#1A1A1A] sm:shadow-[3px_3px_0px_#1A1A1A]`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center gap-3 bg-[#FF6321] hover:bg-[#E55315] text-white px-6 py-4 sm:px-9 sm:py-5 text-lg sm:text-2xl font-black uppercase tracking-widest border-3 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] sm:shadow-[8px_8px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
            >
              <span>COMMENCE FOODWAR</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <div className="text-[10px] sm:text-xs text-stone-600 font-bold flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#10B981] border border-[#1A1A1A]"></span>
              <span>No signup needed • 2 to 16 Contenders</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Visual Hero (5 Cols) */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 px-2 sm:px-0">
          
          {/* Decorative background shape */}
          <div className="absolute -inset-1 sm:-inset-4 bg-[#FF6321] rotate-1 sm:rotate-2 border-3 border-[#1A1A1A] -z-10 opacity-90 shadow-[4px_4px_0px_#1A1A1A] sm:shadow-[6px_6px_0px_#1A1A1A]"></div>
          
          {/* Main Hero Magazine Card */}
          <div className="relative bg-white border-3 border-[#1A1A1A] p-3 sm:p-5 shadow-[6px_6px_0px_#1A1A1A] sm:shadow-[8px_8px_0px_#1A1A1A]">
            
            {/* Image Container with Editorial Frame */}
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-[#1A1A1A] bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85"
                alt="Birria Quesatacos with dipping consommé"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Dark gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent opacity-85"></div>

              {/* Floating Stamps / Stickers */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#FF6321] text-white px-2 py-0.5 sm:px-3.5 sm:py-1 border-2 border-[#1A1A1A] font-black text-[10px] sm:text-xs tracking-widest uppercase rotate-[-2deg] shadow-[2px_2px_0px_#1A1A1A] sm:shadow-[3px_3px_0px_#1A1A1A]">
                Contender #04
              </div>

              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#FDE047] text-[#1A1A1A] w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#1A1A1A] flex flex-col items-center justify-center font-black text-[10px] sm:text-xs tracking-tight rotate-[6deg] shadow-[2px_2px_0px_#1A1A1A] sm:shadow-[3px_3px_0px_#1A1A1A]">
                <span>VS</span>
                <span className="text-[8px] sm:text-[9px] font-black text-[#FF6321]">CLASH</span>
              </div>

              {/* Bottom Image Caption Overlays matching Design Theme */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-1 sm:mb-1.5 block text-[#FF6321]">
                  Mexico / Street Heavyweight
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white">
                  Crispy Birria<br />Quesatacos
                </h2>
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium leading-relaxed opacity-90 max-w-[240px] sm:max-w-[300px]">
                  Griddled Oaxaca cheese crust dipped in 12-hour chile beef broth.
                </p>
              </div>
            </div>

            {/* Editorial Footer Note on Card */}
            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t-2 border-dashed border-[#1A1A1A]/30 flex items-center justify-between text-[10px] sm:text-xs font-black text-[#1A1A1A]">
              <span className="uppercase tracking-widest text-stone-500">JUDGE'S TABLE #01</span>
              <span className="text-[#FF6321] uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                WILL IT ADVANCE?
              </span>
            </div>
          </div>

          {/* Floating Sticker Stamp Bottom Right */}
          <div className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-5 bg-[#1A1A1A] text-white p-2 sm:p-3.5 border-2 border-white max-w-[160px] sm:max-w-[210px] shadow-[4px_4px_0px_#FF6321] rotate-[-4deg]">
            <p className="text-[8px] sm:text-[10px] font-black tracking-widest uppercase text-[#FDE047]">
              OFFICIAL VERDICT RULE:
            </p>
            <p className="text-[10px] sm:text-xs font-bold text-white leading-snug mt-0.5">
              Every decision permanently shapes your tournament bracket.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Editorial Banner */}
      <div className="mt-10 sm:mt-16 pt-4 border-t-2 border-[#1A1A1A] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="sm:border-r-2 border-[#1A1A1A]/20 last:border-r-0 py-1 border-b sm:border-b-0 border-stone-200 sm:pb-0 pb-2">
          <div className="font-black text-lg sm:text-xl text-[#FF6321]">01. SELECT STYLE</div>
          <div className="text-[10px] sm:text-[11px] text-stone-600 font-bold uppercase tracking-wider">Cheesy, Spicy, Sweet, Warm, Crispy</div>
        </div>
        <div className="md:border-r-2 border-[#1A1A1A]/20 last:border-r-0 py-1 border-b md:border-b-0 border-stone-200 sm:pb-0 pb-2">
          <div className="font-black text-lg sm:text-xl text-[#1A1A1A]">02. CHOOSE SIZE</div>
          <div className="text-[10px] sm:text-[11px] text-stone-600 font-bold uppercase tracking-wider">2, 4, 8, or 16 Contenders</div>
        </div>
        <div className="sm:border-r-2 border-[#1A1A1A]/20 last:border-r-0 py-1 border-b sm:border-b-0 border-stone-200 sm:pb-0 pb-2">
          <div className="font-black text-lg sm:text-xl text-[#1A1A1A]">03. PASS VERDICTS</div>
          <div className="text-[10px] sm:text-[11px] text-stone-600 font-bold uppercase tracking-wider">Head-to-head bracket matchups</div>
        </div>
        <div className="py-1">
          <div className="font-black text-lg sm:text-xl text-[#10B981]">04. CROWN CHAMPION</div>
          <div className="text-[10px] sm:text-[11px] text-stone-600 font-bold uppercase tracking-wider">Discover your food personality</div>
        </div>
      </div>

    </div>
  );
};

