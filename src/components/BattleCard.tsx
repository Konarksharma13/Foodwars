import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FoodItem } from '../types';
import { Trophy, Globe, Sparkles } from 'lucide-react';

interface BattleCardProps {
  food: FoodItem;
  side: 'left' | 'right';
  isSelectedWinner?: boolean;
  isSelectedLoser?: boolean;
  isVerdictAnimating: boolean;
  onChoose: () => void;
  keyboardShortcut: string;
  isFinal: boolean;
}

export const BattleCard: React.FC<BattleCardProps> = ({
  food,
  side,
  isSelectedWinner,
  isSelectedLoser,
  isVerdictAnimating,
  onChoose,
  keyboardShortcut,
  isFinal,
}) => {
  const isLeft = side === 'left';

  return (
    <motion.div
      layout
      initial={{ 
        opacity: 0, 
        x: isLeft ? -45 : 45, 
        rotate: isLeft ? -2.5 : 2.5,
        scale: 0.96 
      }}
      animate={{ 
        opacity: isSelectedLoser ? 0.35 : 1, 
        x: 0, 
        rotate: 0,
        scale: isSelectedWinner ? 1.03 : isSelectedLoser ? 0.95 : 1,
      }}
      exit={{ 
        opacity: 0, 
        x: isLeft ? -50 : 50, 
        scale: 0.94,
        transition: { duration: 0.25, ease: 'easeInOut' }
      }}
      transition={{ 
        duration: 0.45, 
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        !isVerdictAnimating && !isSelectedLoser
          ? { y: -6, transition: { duration: 0.2 } }
          : {}
      }
      whileTap={
        !isVerdictAnimating && !isSelectedLoser
          ? { scale: 0.99, y: -1 }
          : {}
      }
      onClick={!isVerdictAnimating ? onChoose : undefined}
      className={`group relative flex flex-col justify-between overflow-hidden border-3 cursor-pointer select-none ${
        isSelectedWinner
          ? 'border-[#1A1A1A] z-30 ring-4 ring-[#FF6321] shadow-[12px_12px_0px_#1A1A1A]'
          : isSelectedLoser
          ? 'border-stone-400 grayscale z-10 pointer-events-none'
          : 'border-[#1A1A1A] bg-white hover:border-[#FF6321] shadow-[8px_8px_0px_#1A1A1A]'
      }`}
    >
      {/* Winner Stamp Banner with bouncy entrance */}
      <AnimatePresence>
        {isSelectedWinner && (
          <motion.div
            initial={{ scale: 0.5, y: -40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-[#1A1A1A] text-white px-6 py-2.5 border-3 border-white text-sm font-black tracking-widest uppercase flex items-center gap-2 shadow-2xl"
          >
            <Trophy className="w-5 h-5 text-[#FDE047] animate-spin" style={{ animationDuration: '3s' }} />
            <span>{food.name} ADVANCES →</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loser Stamp slammed down */}
      <AnimatePresence>
        {isSelectedLoser && (
          <motion.div
            initial={{ scale: 2.5, opacity: 0, rotate: -35 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-[#1A1A1A]/95 text-white px-7 py-3.5 border-3 border-stone-400 text-xl font-black tracking-widest uppercase shadow-2xl"
          >
            <span>ELIMINATED</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Image Section (Dominates visual) */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-stone-950 border-b-3 border-[#1A1A1A]">
        <motion.img
          src={food.image}
          alt={food.name}
          referrerPolicy="no-referrer"
          animate={{
            scale: isSelectedWinner ? 1.12 : 1,
            filter: isSelectedWinner ? 'saturate(1.25)' : 'saturate(1.05)',
          }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Subtle dark vignette overlay for typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent opacity-85 pointer-events-none"></div>

        {/* Top Stickers Strip */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          
          {/* Contender Side Stamp */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`px-2 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#1A1A1A] sm:shadow-[3px_3px_0px_#1A1A1A] ${
              isLeft
                ? 'bg-[#FF6321] text-white rotate-[-2deg] border-2 border-[#1A1A1A]'
                : 'bg-[#1A1A1A] text-white rotate-[3deg] border-2 border-white'
            }`}
          >
            {isLeft ? 'CONTENDER #01' : 'CONTENDER #02'}
          </motion.div>

          {/* Keyboard shortcut hint */}
          <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] font-mono text-sm font-black shadow-[2px_2px_0px_#1A1A1A]">
            {keyboardShortcut}
          </div>
        </div>

        {/* Origin / Cuisine Tag and Food Name at base of image matching Editorial theme */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-20 pointer-events-none">
          <motion.span 
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-1 sm:mb-1.5 block ${isLeft ? 'text-[#FF6321]' : 'text-[#FDE047]'}`}
          >
            {food.cuisine} ({food.originCountry})
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-2xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-[0.88] drop-shadow-md font-black uppercase"
          >
            {food.name}
          </motion.h3>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-3.5 sm:p-5 flex-grow flex flex-col justify-between space-y-3 sm:space-y-4 bg-[#FBFBF2]">
        
        {/* Subtitle description */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-black text-[#1A1A1A] leading-snug">
            {food.subtitle}
          </p>
          <p className="text-[10px] sm:text-xs text-stone-700 font-medium leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Comfort Highlight Quote */}
        <div className="border-l-3 border-[#FF6321] pl-3 py-1 bg-white text-[10px] sm:text-xs italic text-stone-800 font-medium leading-tight">
          "{food.comfortReason}"
        </div>

        {/* Flavor Attributes Radar Bars */}
        <div className="bg-white border-2 border-[#1A1A1A] p-2 sm:p-2.5 space-y-1.5 shadow-[2px_2px_0px_#1A1A1A]">
          <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-600 flex justify-between">
            <span>FLAVOR PROFILE</span>
            <span className="font-mono text-[#1A1A1A] font-black">DNA RATINGS</span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5 text-[9px] sm:text-[11px] font-mono font-bold">
            {/* Cheesy */}
            <div className="flex items-center justify-between">
              <span className="text-stone-700">Cheesy</span>
              <div className="w-14 bg-stone-100 h-2 border border-[#1A1A1A] overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${food.cheesyLevel}%` }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="bg-[#E5A912] h-full" 
                />
              </div>
            </div>

            {/* Spicy */}
            <div className="flex items-center justify-between">
              <span className="text-stone-700">Spicy</span>
              <div className="w-14 bg-stone-100 h-2 border border-[#1A1A1A] overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${food.spicyLevel}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#FF6321] h-full" 
                />
              </div>
            </div>

            {/* Crispy */}
            <div className="flex items-center justify-between">
              <span className="text-stone-700">Crispy</span>
              <div className="w-14 bg-stone-100 h-2 border border-[#1A1A1A] overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${food.crispyLevel}%` }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="bg-[#10B981] h-full" 
                />
              </div>
            </div>

            {/* Warm */}
            <div className="flex items-center justify-between">
              <span className="text-stone-700">Warm</span>
              <div className="w-14 bg-stone-100 h-2 border border-[#1A1A1A] overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${food.warmLevel}%` }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-[#C86218] h-full" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Verdict Action CTA Button matching design */}
        <motion.button
          type="button"
          disabled={isVerdictAnimating}
          whileHover={!isVerdictAnimating ? { scale: 1.01 } : {}}
          whileTap={!isVerdictAnimating ? { scale: 0.98 } : {}}
          className={`w-full py-3.5 px-4 text-center font-display text-xl sm:text-2xl tracking-widest uppercase border-3 border-[#1A1A1A] transition-all flex items-center justify-center gap-2 cursor-pointer font-black ${
            isSelectedWinner
              ? 'bg-[#FF6321] text-white shadow-none'
              : 'bg-white text-[#1A1A1A] group-hover:bg-[#FDE047] shadow-[4px_4px_0px_#1A1A1A]'
          }`}
        >
          <span>CHOOSE AS WINNER</span>
          <span className="hidden sm:inline text-xs font-mono font-black">
            [{keyboardShortcut}]
          </span>
        </motion.button>

      </div>
    </motion.div>
  );
};


