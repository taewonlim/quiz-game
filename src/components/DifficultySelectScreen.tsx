import React, { useState } from 'react';
import { SubjectMode, TwinProfile, DifficultyLevel } from '../types';
import { DIFFICULTY_LIST } from '../data/difficultyData';
import { soundEngine } from '../utils/soundEngine';
import { CartoonForestLandscape } from './CartoonForestLandscape';
import { ArrowLeft, ArrowRight, Sparkles, Clock, Users, Flame, Check } from 'lucide-react';

interface DifficultySelectScreenProps {
  subject: SubjectMode;
  activeProfile: TwinProfile;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
  onBackToSubject: () => void;
}

export const DifficultySelectScreen: React.FC<DifficultySelectScreenProps> = ({
  subject,
  activeProfile,
  onSelectDifficulty,
  onBackToSubject
}) => {
  const [selectedDiff, setSelectedDiff] = useState<DifficultyLevel>('normal');

  const handleCardClick = (id: DifficultyLevel) => {
    setSelectedDiff(id);
    soundEngine.playPop();
  };

  const handleStartGame = () => {
    soundEngine.playClick();
    onSelectDifficulty(selectedDiff);
  };

  return (
    <div className="relative h-full flex-1 flex flex-col items-center justify-between p-2.5 sm:p-4 select-none overflow-hidden">
      {/* Whimsical Fairytale Cartoon Forest Scenery Background */}
      <CartoonForestLandscape themeId="morning" />

      {/* Top Header / Nav */}
      <div className="relative z-20 w-full max-w-3xl flex items-center justify-between my-1 sm:my-2 shrink-0 px-1">
        <button
          id="btn-back-to-subject"
          onClick={() => {
            soundEngine.playClick();
            onBackToSubject();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#FFFBF0]/95 hover:bg-white text-[#5C3610] font-black text-xs sm:text-sm shadow-md border-2 border-amber-300 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>과목 다시 선택</span>
        </button>

        <div className="bg-[#FFFBF0]/95 backdrop-blur-md border-2 border-[#C99863] px-4 py-1.5 rounded-full shadow-md text-center">
          <span className="font-extrabold text-xs sm:text-sm text-[#5C3610] flex items-center gap-1.5">
            <span>{subject === 'hangul' ? '🌲 가나다숲' : '💎 수리수리동굴'}</span>
            <span className="text-amber-700">•</span>
            <span className="text-amber-900 font-black">{activeProfile.customName} 대원</span>
          </span>
        </div>
      </div>

      {/* Center Main Wooden Frame */}
      <div
        className="relative z-10 w-full max-w-3xl bg-[#8A4C22]/95 backdrop-blur-md rounded-2xl sm:rounded-[36px] p-3.5 sm:p-6 shadow-2xl border-3 sm:border-4 border-[#613313] flex flex-col items-center my-auto"
        style={{
          boxShadow: '0 16px 36px rgba(35, 18, 5, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
        }}
      >
        {/* Hanging Rope Holes at Top */}
        <div className="absolute -top-3 left-8 w-3.5 h-5 rounded-full bg-[#42220C] border-2 border-[#613313]" />
        <div className="absolute -top-3 right-8 w-3.5 h-5 rounded-full bg-[#42220C] border-2 border-[#613313]" />

        {/* Title Header Pill */}
        <div className="bg-[#592D11] border-2 border-[#A86432] px-5 sm:px-8 py-1.5 sm:py-2 rounded-full shadow-inner mb-3 sm:mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 shrink-0" />
          <h1 className="text-base sm:text-2xl font-black text-amber-100 tracking-tight">
            숲길 난이도를 선택해 주세요!
          </h1>
        </div>

        {/* 3 Difficulty Cards Grid (3 cols on all devices) */}
        <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
          {DIFFICULTY_LIST.map((diff) => {
            const isSelected = selectedDiff === diff.id;
            return (
              <div
                key={diff.id}
                id={`diff-card-${diff.id}`}
                onClick={() => handleCardClick(diff.id)}
                className={`group relative rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 border-2 sm:border-3 select-none ${
                  isSelected
                    ? 'bg-[#FFFDF7] border-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.55)] scale-102 ring-2 sm:ring-3 ring-yellow-400/40'
                    : 'bg-[#FFF8EB]/90 hover:bg-[#FFFDF7] border-[#D4A373] opacity-90 hover:opacity-100'
                }`}
              >
                {/* Target Age Tag Pill */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {diff.targetTag}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-0.5 text-[10px] sm:text-xs font-black text-amber-950 bg-yellow-400 px-2 py-0.5 rounded-full shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" /> <span className="hidden sm:inline">선택됨</span>
                    </span>
                  )}
                </div>

                {/* Icon & Title */}
                <div className="flex flex-col items-center text-center my-1.5">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-inner mb-1 transition-transform group-hover:scale-110 ${
                      diff.id === 'easy'
                        ? 'bg-emerald-100 border border-emerald-300'
                        : diff.id === 'normal'
                        ? 'bg-amber-100 border border-amber-300'
                        : 'bg-rose-100 border border-rose-300'
                    }`}
                  >
                    {diff.icon}
                  </div>
                  <h2 className="text-sm sm:text-lg font-black text-[#522E15] tracking-tight">
                    {diff.nameKo}
                  </h2>
                  <p className="text-xs sm:text-xs font-bold text-amber-800 hidden sm:block">
                    {diff.subTitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[10px] sm:text-xs font-medium text-stone-700 bg-amber-50/80 rounded-lg p-1.5 my-1 text-center border border-amber-200/70 line-clamp-2">
                  {diff.description}
                </p>

                {/* Feature Specs & Point Rewards */}
                <div className="flex flex-col gap-1 text-[10px] sm:text-xs font-extrabold text-stone-800 pt-1.5 border-t border-amber-200">
                  <div className="flex items-center justify-between gap-1 bg-white/90 px-2 py-0.5 rounded border border-amber-200">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{diff.timeLimit}초</span>
                    </span>
                    <span className={`px-1.5 py-0.2 rounded font-black text-[10px] sm:text-xs ${
                      diff.id === 'hard' ? 'bg-rose-100 text-rose-800' : diff.id === 'normal' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {diff.pointsMultiplier} 득점
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 bg-amber-50/90 px-1.5 py-0.5 rounded border border-amber-200 text-[9px] sm:text-[11px] font-black text-amber-900">
                    <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">{diff.pointsDescription}</span>
                  </div>
                </div>

                {/* Extra info for hard */}
                {diff.id === 'hard' && (
                  <div className="mt-1 flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px] font-black text-rose-700 bg-rose-50 px-1 py-0.5 rounded border border-rose-200 animate-pulse">
                    <Flame className="w-3 h-3 text-rose-500" />
                    <span>최고 보너스 & 3배 피버!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Start Game CTA Button */}
        <button
          id="btn-start-game-stage"
          onClick={handleStartGame}
          className="w-full max-w-sm sm:max-w-md bg-gradient-to-b from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 active:scale-95 text-amber-950 font-black text-base sm:text-xl py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-xl border-3 sm:border-4 border-yellow-200 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          style={{
            boxShadow: '0 8px 20px rgba(234, 179, 8, 0.45), inset 0 2px 4px rgba(255,255,255,0.7)'
          }}
        >
          <span>두더지 잡기 시작! 🐾</span>
          <ArrowRight className="w-5 h-5 stroke-[3] shrink-0" />
        </button>
      </div>

      {/* Subtle guide text */}
      <div className="relative z-10 text-center text-xs font-bold text-white/90 drop-shadow shrink-0 py-0.5">
        6세 아이에게는 <span className="text-yellow-300 font-extrabold">새싹 코스(초급)</span>를 추천해요!
      </div>
    </div>
  );
};
