import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Flame, ShieldAlert } from 'lucide-react';
import { ComfortCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/foods';
import { sound } from '../utils/sound';

interface ComfortSelectorProps {
  selectedCategory: ComfortCategory | null;
  onSelectCategory: (category: ComfortCategory) => void;
  onProceed: () => void;
  onBack: () => void;
}

const CATEGORIES_LIST: ComfortCategory[] = ['cheesy', 'spicy', 'sweet', 'warm', 'crispy'];

export const ComfortSelector: React.FC<ComfortSelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  onProceed,
  onBack,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<ComfortCategory | null>(null);

  const handleCardClick = (cat: ComfortCategory) => {
    sound.playClick();
    onSelectCategory(cat);
  };

  const handleProceedClick = () => {
    if (selectedCategory) {
      sound.playClick();
      onProceed();
    }
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between min-h-[calc(100vh-80px)]">
      
      {/* Header section */}
      <div>
        <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-[#FF6321] text-white px-2.5 py-0.5 text-xs font-black tracking-wider">
              STEP 01 OF 02
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-stone-600">
              DIVISION SELECTION
            </span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] bg-[#FDE047] px-2 py-0.5 border border-[#1A1A1A]">
            CHOOSE EXACTLY ONE CATEGORY
          </span>
        </div>

        <div className="max-w-2xl mb-8">
          <h2 className="font-display text-4xl sm:text-7xl text-[#1A1A1A] tracking-tighter leading-[0.9] font-black">
            WHAT ARE YOU CRAVING?
          </h2>
          <p className="mt-2 font-editorial text-lg sm:text-2xl text-[#1A1A1A] font-black uppercase tracking-tight">
            Select your comfort battlefield.
          </p>
          <p className="mt-1 text-xs sm:text-sm text-stone-700 font-medium">
            Each style generates a tailored tournament bracket featuring 80+ international comfort food icons.
          </p>
        </div>

        {/* 5 Rich Category Cards Grid - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {CATEGORIES_LIST.map((catKey) => {
            const config = CATEGORIES_CONFIG[catKey];
            const isSelected = selectedCategory === catKey;
            const isHovered = hoveredCategory === catKey;

            return (
              <div
                key={catKey}
                onClick={() => handleCardClick(catKey)}
                onMouseEnter={() => setHoveredCategory(catKey)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative cursor-pointer transition-all duration-300 border-3 ${
                  isSelected
                    ? 'border-[#1A1A1A] scale-[1.03] z-20 shadow-[8px_8px_0px_#1A1A1A]'
                    : 'border-[#1A1A1A] hover:scale-[1.02] bg-white opacity-95 hover:opacity-100 shadow-[4px_4px_0px_#1A1A1A]'
                }`}
                style={{
                  boxShadow: isSelected
                    ? `8px 8px 0px 0px #FF6321`
                    : undefined,
                }}
              >
                {/* Selected Ribbon / Stamp */}
                {isSelected && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-3 py-0.5 border-2 border-white text-[11px] font-black tracking-widest uppercase z-30 flex items-center gap-1 shadow-md">
                    <Check className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span>CHOSEN DIVISION</span>
                  </div>
                )}

                {/* Card Container */}
                <div className="flex flex-col h-full overflow-hidden bg-white">
                  
                  {/* Top Image Section */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-900 border-b-2 border-[#1A1A1A]">
                    <img
                      src={config.heroImage}
                      alt={config.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isHovered || isSelected ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent"></div>

                    {/* Emoji Badge on top corner */}
                    <div 
                      className="absolute top-2.5 left-2.5 w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center text-xl bg-white shadow-[2px_2px_0px_#1A1A1A]"
                      style={{ backgroundColor: config.badgeBg }}
                    >
                      <span>{config.emoji}</span>
                    </div>

                    {/* Category Title overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <h3 className="font-display text-3xl sm:text-4xl tracking-wider leading-none text-white drop-shadow font-black">
                        {config.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-stone-200 line-clamp-1">
                        {config.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3.5 sm:p-4 flex-grow flex flex-col justify-between space-y-3 bg-[#FBFBF2]">
                    <p className="text-xs text-stone-700 font-medium leading-relaxed">
                      {config.description}
                    </p>

                    {/* Select Trigger Area */}
                    <div
                      className={`w-full py-2.5 px-3 text-center text-xs font-black tracking-widest uppercase border-2 transition-all ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FDE047]'
                      }`}
                    >
                      {isSelected ? '✓ SELECTED' : 'SELECT CATEGORY'}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation & Continue CTA */}
      <div className="mt-8 pt-6 border-t-2 border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="text-xs font-black uppercase tracking-wider text-stone-600 hover:text-[#1A1A1A] underline underline-offset-4 py-2 cursor-pointer"
        >
          ← Return to Cover
        </button>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {selectedCategory ? (
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-stone-600">
              <span>Ready with</span>
              <span className="font-black text-[#1A1A1A] uppercase bg-[#FDE047] px-2 py-0.5 border border-[#1A1A1A]">
                {CATEGORIES_CONFIG[selectedCategory].name}
              </span>
            </div>
          ) : (
            <span className="text-xs font-bold text-stone-500 italic">
              Please click a category above to proceed
            </span>
          )}

          <button
            onClick={handleProceedClick}
            disabled={!selectedCategory}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-xl font-black tracking-widest uppercase border-3 border-[#1A1A1A] transition-all cursor-pointer ${
              selectedCategory
                ? 'bg-[#FF6321] hover:bg-[#E55315] text-white shadow-[8px_8px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-sm'
                : 'bg-stone-300 text-stone-500 border-stone-400 cursor-not-allowed opacity-60'
            }`}
          >
            <span>PROCEED TO CONTENDERS</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};

