import React, { useState } from 'react';
import { ZodiacId, TwinProfile } from '../types';
import { ZODIAC_LIST, ZODIAC_MAP } from '../data/zodiacData';
import { soundEngine } from '../utils/soundEngine';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CartoonForestLandscape } from './CartoonForestLandscape';

interface ZodiacSelectScreenProps {
  activeProfile: TwinProfile;
  onConfirmZodiac: (zodiacId: ZodiacId) => void;
}

export const ZodiacSelectScreen: React.FC<ZodiacSelectScreenProps> = ({
  activeProfile,
  onConfirmZodiac
}) => {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacId>(activeProfile.avatarZodiac || 'rat');

  const handleSelect = (id: ZodiacId) => {
    setSelectedZodiac(id);
    const item = ZODIAC_MAP[id];
    soundEngine.playPop();
    soundEngine.speak(`${item.nameKo}! ${item.tagline}`);
  };

  const handleStart = () => {
    soundEngine.playClick();
    onConfirmZodiac(selectedZodiac);
  };

  const currentSelectedInfo = ZODIAC_MAP[selectedZodiac];

  return (
    <div className="relative h-full flex-1 flex flex-col items-center justify-between p-2.5 sm:p-4 select-none overflow-hidden">
      {/* Whimsical Fairytale Cartoon Forest Scenery Background */}
      <CartoonForestLandscape themeId="sunset" />

      {/* Floating leaves and gentle decor */}
      <div className="absolute top-8 left-8 text-2xl opacity-75 animate-bounce pointer-events-none -z-10" style={{ animationDuration: '6s' }}>🍃</div>
      <div className="absolute top-12 right-10 text-2xl opacity-75 animate-pulse pointer-events-none -z-10">🌸</div>

      {/* Wooden Main Frame */}
      <div
        className="relative w-full max-w-3xl bg-[#8A4C22]/95 backdrop-blur-md rounded-2xl sm:rounded-[36px] p-3.5 sm:p-6 shadow-2xl border-3 sm:border-4 border-[#613313] flex flex-col items-center my-auto"
        style={{
          boxShadow: '0 16px 36px rgba(35, 18, 5, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
        }}
      >
        {/* Hanging Rope Holes at Top */}
        <div className="absolute -top-3 left-8 w-3.5 h-5 rounded-full bg-[#42220C] border-2 border-[#613313]" />
        <div className="absolute -top-3 right-8 w-3.5 h-5 rounded-full bg-[#42220C] border-2 border-[#613313]" />

        {/* Header Title Pill */}
        <div className="bg-[#592D11] border-2 border-[#A86432] px-5 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-inner mb-3 sm:mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 shrink-0" />
          <h1 className="text-base sm:text-2xl font-black text-amber-100 tracking-tight">
            12지신 짝꿍 캐릭터 선택
          </h1>
          <span className="text-xs sm:text-sm font-bold text-amber-300">
            ({activeProfile.customName} 대원의 짝꿍)
          </span>
        </div>

        {/* 12 Zodiac Grid: 3 columns on mobile (3 cols x 4 rows) / 4 cols on desktop */}
        <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3.5 mb-2.5 sm:mb-4">
          {ZODIAC_LIST.map((item) => {
            const isSelected = selectedZodiac === item.id;
            return (
              <button
                key={item.id}
                id={`zodiac-btn-${item.id}`}
                onClick={() => handleSelect(item.id)}
                className={`group flex flex-col items-center justify-center p-1 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer ${
                  isSelected ? 'scale-105' : 'hover:scale-102 opacity-85 hover:opacity-100'
                }`}
              >
                {/* Avatar Circle */}
                <div className="relative">
                  <div
                    className={`w-15 h-15 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-amber-100 ring-3 sm:ring-4 ring-yellow-400 ring-offset-2 ring-offset-[#8A4C22] shadow-[0_0_16px_rgba(250,204,21,0.85)]'
                        : 'bg-[#D9C4A9]/40 hover:bg-[#D9C4A9]/60'
                    }`}
                  >
                    <span className="text-3xl xs:text-4xl filter drop-shadow">
                      {item.emoji}
                    </span>
                  </div>

                  {/* Star decor on selected item */}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 text-yellow-300 text-sm sm:text-base animate-spin" style={{ animationDuration: '6s' }}>
                      ⭐
                    </div>
                  )}
                </div>

                {/* Label pill: 쥐 (Rat) 형식 */}
                <div
                  className={`mt-1.5 px-2.5 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-black transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 shadow-md'
                      : 'bg-black/40 text-amber-100/90'
                  }`}
                >
                  {item.nameKo} ({item.nameEn})
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Companion Tagline Bar */}
        <div className="w-full max-w-lg bg-[#592D11]/90 rounded-xl px-4 py-1.5 sm:py-2 text-center text-amber-200 text-xs sm:text-sm font-bold mb-3 sm:mb-4 border border-amber-800">
          <span className="text-yellow-400 font-extrabold">{currentSelectedInfo.nameKo} ({currentSelectedInfo.hanja})</span>: {currentSelectedInfo.tagline}
        </div>

        {/* Big Yellow Adventure Button */}
        <button
          id="start-adventure-button"
          onClick={handleStart}
          className="w-full max-w-sm sm:max-w-md bg-gradient-to-b from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 active:scale-95 text-amber-950 font-black text-base sm:text-xl py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-xl border-3 sm:border-4 border-yellow-200 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          style={{
            boxShadow: '0 8px 20px rgba(234, 179, 8, 0.45), inset 0 2px 4px rgba(255,255,255,0.7)'
          }}
        >
          <span>모험 시작하기! 🌲</span>
          <ArrowRight className="w-5 h-5 stroke-[3] shrink-0" />
        </button>
      </div>
    </div>
  );
};
