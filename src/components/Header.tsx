import React from 'react';
import { Volume2, VolumeX, RotateCcw, Award, Flame, Scale } from 'lucide-react';
import { AppScreen, ComfortCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/foods';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentScreen: AppScreen;
  selectedCategory: ComfortCategory | null;
  onReset: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  selectedCategory,
  onReset,
  soundEnabled,
  onToggleSound,
}) => {
  const categoryConfig = selectedCategory ? CATEGORIES_CONFIG[selectedCategory] : null;

  return (
    <header className="w-full border-b-2 border-[#1A1A1A] bg-[#FBFBF2] sticky top-0 z-50">
      {/* Top micro-banner */}
      <div className="w-full bg-[#1A1A1A] text-[#FBFBF2] px-4 py-1.5 sm:py-1 flex items-center justify-between text-[9px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF6321] animate-pulse"></span>
          <span>THE ULTIMATE COMFORT FOOD TOURNAMENT</span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[10px] tracking-[0.25em] text-stone-300 font-bold">
          <span>ISSUE NO. 001</span>
          <span>•</span>
          <span>THE JUDGE’S TABLE</span>
          <span>•</span>
          <span>80+ GLOBAL CONTENDERS</span>
        </div>
      </div>

      {/* Main Masthead matching Editorial / Magazine Hero Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={currentScreen !== 'landing' ? onReset : undefined}
          className={`flex items-center gap-3 cursor-pointer group ${currentScreen === 'landing' ? 'pointer-events-none' : ''}`}
        >
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#1A1A1A]/70">
              The Comfort Edition
            </span>
            <h1 className="text-2xl sm:text-4xl font-black italic tracking-tighter leading-none text-[#1A1A1A] flex items-center gap-1">
              FOODWARS
              <span className="text-[#FF6321] text-sm sm:text-base not-italic font-black">★</span>
            </h1>
          </div>
        </div>

        {/* Center active category indicator if active */}
        {categoryConfig && currentScreen !== 'landing' && currentScreen !== 'category_select' && (
          <div className="hidden md:flex items-center gap-2 border-2 border-[#1A1A1A] px-3.5 py-1 bg-[#FDE047] shadow-[3px_3px_0px_#1A1A1A] rounded-none rotate-[-1deg]">
            <span className="text-base">{categoryConfig.emoji}</span>
            <span className="text-xs font-black tracking-widest uppercase text-[#1A1A1A]">
              {categoryConfig.name} BATTLE
            </span>
          </div>
        )}

        {/* Right Section: Location Badge, Round Badge & Utility Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase font-black tracking-widest opacity-50">
              Location
            </span>
            <span className="text-xs font-black tracking-wider text-[#1A1A1A]">
              JUDGE'S TABLE
            </span>
          </div>

          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FF4444] rounded-full flex items-center justify-center text-white font-black text-sm sm:text-base border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            {currentScreen === 'battle' ? 'VS' : '01'}
          </div>

          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            title={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
            className="p-2 border-2 border-[#1A1A1A] bg-white hover:bg-[#FDE047] text-[#1A1A1A] transition-colors shadow-[2px_2px_0px_#1A1A1A] cursor-pointer"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF6321]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {currentScreen !== 'landing' && (
            <button
              onClick={() => {
                sound.playClick();
                onReset();
              }}
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-2 border-2 border-[#1A1A1A] bg-white hover:bg-[#FF6321] hover:text-white transition-all shadow-[3px_3px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Battle</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

