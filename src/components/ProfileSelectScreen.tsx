import React from 'react';
import { Star, Award, Edit3, Sparkles, ChevronRight } from 'lucide-react';
import { TwinProfile } from '../types';
import { ZODIAC_MAP } from '../data/zodiacData';
import { soundEngine } from '../utils/soundEngine';
import { CartoonForestLandscape } from './CartoonForestLandscape';

interface ProfileSelectScreenProps {
  twin1: TwinProfile;
  twin2: TwinProfile;
  onSelectTwin: (twinId: string) => void;
  onEditProfile: (twinId: string) => void;
  onOpenPhotoQuiz: () => void;
}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({
  twin1,
  twin2,
  onSelectTwin,
  onEditProfile,
  onOpenPhotoQuiz
}) => {
  const handleCardClick = (twin: TwinProfile) => {
    soundEngine.playClick();
    soundEngine.speak(`${twin?.customName || '대원'} 대원, 숲길 탐험을 시작해요!`);
    onSelectTwin(twin?.id || 'twin1');
  };

  const renderProfileCard = (twin: TwinProfile, isPrimary: boolean) => {
    const zodiac = ZODIAC_MAP[twin?.avatarZodiac || 'rat'] || ZODIAC_MAP.rat;
    const totalScore = Math.max(twin?.hangulHighScore || 0, twin?.mathHighScore || 0);

    return (
      <div
        id={`profile-card-${twin.id}`}
        onClick={() => handleCardClick(twin)}
        className={`group relative w-full bg-[#FFFDF7]/95 hover:bg-white active:scale-[0.985] transition-all duration-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xl border-3 sm:border-4 ${
          isPrimary ? 'border-[#F59E0B]' : 'border-[#0EA5E9]'
        } flex items-center gap-3 sm:gap-6 cursor-pointer select-none backdrop-blur-md`}
        style={{
          boxShadow: '0 12px 28px -6px rgba(45, 25, 10, 0.35), inset 0 2px 4px rgba(255,255,255,0.95)'
        }}
      >
        {/* Hanging Rope/Signboard Holes Decor */}
        <div className="absolute -top-3 left-6 w-3 h-5 sm:w-4 sm:h-6 rounded-full bg-[#8C532B] border border-amber-950 shadow-xs" />
        <div className="absolute -top-3 right-6 w-3 h-5 sm:w-4 sm:h-6 rounded-full bg-[#8C532B] border border-amber-950 shadow-xs" />

        {/* Edit Profile Button (Top Right) */}
        <button
          id={`edit-twin-${twin.id}`}
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playClick();
            onEditProfile(twin.id);
          }}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-100/90 hover:bg-amber-200 text-amber-950 flex items-center gap-1 shadow-sm transition-transform active:scale-90 z-20 cursor-pointer border border-amber-300 font-bold text-xs sm:text-sm"
          title="이름, 사진 및 12지신 수정"
        >
          <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800" />
          <span className="hidden xs:inline">수정</span>
        </button>

        {/* Left: Big Avatar Photo or 12 Zodiac Companion */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div
            className={`w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl border-3 sm:border-4 ${
              isPrimary ? 'border-amber-400 bg-amber-100/95' : 'border-sky-400 bg-sky-100/95'
            } flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden relative`}
          >
            {Boolean(twin.customPhotoUrl && twin.customPhotoUrl.trim()) ? (
              <img
                src={twin.customPhotoUrl}
                alt={twin.customName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl sm:text-6xl filter drop-shadow-md">
                {zodiac.emoji}
              </span>
            )}

            {/* Zodiac companion badge in corner if real photo */}
            {Boolean(twin.customPhotoUrl && twin.customPhotoUrl.trim()) && (
              <div className="absolute bottom-1 right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow border border-amber-400 flex items-center justify-center text-xs sm:text-sm">
                {zodiac.emoji}
              </div>
            )}
          </div>

          {/* Zodiac Name Pill Tag */}
          <div className="mt-1 bg-amber-200/90 border border-amber-500 px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black text-amber-950 shadow-xs whitespace-nowrap">
            {zodiac.nameKo} ({zodiac.nameEn})
          </div>
        </div>

        {/* Right: Enlarged Profile Details & Action Button */}
        <div className="flex-1 flex flex-col justify-between min-w-0 pr-1 sm:pr-2">
          {/* Top Info: Name, Level, High Score */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#451A03] tracking-tight truncate">
                {twin?.customName || '대원'}
              </h2>
              <span className="text-xs sm:text-sm font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-300">
                {twin?.defaultLabel || '탐험대원'}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm font-extrabold text-amber-900">
              <div className="inline-flex items-center gap-1 bg-amber-100/90 px-2.5 py-1 rounded-xl border border-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Lv.{twin?.levelNumber || 1} {twin?.levelTitle || '탐험대장'}</span>
              </div>

              <div className="inline-flex items-center gap-1 bg-yellow-100/90 px-2.5 py-1 rounded-xl border border-yellow-300">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                <span>최고 {totalScore.toLocaleString()}점</span>
              </div>
            </div>
          </div>

          {/* Stickers Earned & Large Play Button */}
          <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2 flex-wrap">
            {/* Stickers Collection Strip */}
            <div className="inline-flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
              <span className="text-xs font-black text-[#7A4B23]">스티커</span>
              <span className="bg-amber-500 text-white rounded-full px-1.5 py-0.2 text-[11px] font-black">
                {(twin?.stickersEarned || []).length}
              </span>
              <div className="flex items-center gap-1 ml-1">
                {(twin?.stickersEarned || []).length > 0 ? (
                  (twin?.stickersEarned || []).slice(0, 4).map((_, i) => (
                    <span key={i} className="text-sm">
                      {['🌟', '🏆', '💎', '🌈', '👑'][i % 5]}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-amber-700/80 font-semibold">도전해보세요!</span>
                )}
                {(twin?.stickersEarned || []).length > 4 && (
                  <span className="text-xs font-black text-amber-900">+{(twin?.stickersEarned || []).length - 4}</span>
                )}
              </div>
            </div>

            {/* Big Touchable Start Button */}
            <div
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-white font-black text-sm sm:text-base shadow-md flex items-center gap-1.5 border-2 ${
                isPrimary
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-amber-300'
                  : 'bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 border-sky-300'
              } transition-transform group-hover:scale-105 shrink-0`}
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span>탐험 출발!</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-full flex-1 flex flex-col items-center justify-between p-3 sm:p-6 overflow-hidden select-none">
      {/* Whimsical Fairytale Bright Cartoon Forest Scenery Background */}
      <CartoonForestLandscape themeId="morning" />

      {/* Top Title Banner */}
      <div className="relative z-10 my-1 sm:my-2 text-center shrink-0 w-full max-w-2xl">
        <div className="w-full bg-[#FFFBF0]/95 backdrop-blur-md border-3 sm:border-4 border-[#C99863] px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-3xl shadow-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#5C3610] tracking-wider flex items-center justify-center gap-2">
            <span>🌲</span>
            <span>도란도란 숲속탐험대</span>
            <span>🌲</span>
          </h1>
          <p className="text-xs sm:text-base font-extrabold text-[#8D5826] mt-1">
            오늘 숲길 탐험을 떠날 멋진 대원을 골라주세요!
          </p>
        </div>
      </div>

      {/* Twin 1 & Twin 2 Profile Cards Stacked Vertically (위아래 큼직한 카드 구성) */}
      <div className="relative z-10 w-full max-w-2xl flex-1 flex flex-col justify-center gap-3 sm:gap-5 my-2 px-1">
        {renderProfileCard(twin1, true)}
        {renderProfileCard(twin2, false)}
      </div>

      {/* Photo Quiz Maker Quick Access Floating Button */}
      <div className="relative z-20 my-1 sm:my-2 shrink-0">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onOpenPhotoQuiz();
          }}
          className="bg-[#FFFBF0]/95 hover:bg-white text-amber-950 font-black px-5 py-2.5 sm:px-7 sm:py-3 rounded-2xl shadow-lg border-2 border-amber-400 flex items-center gap-2 text-xs sm:text-sm active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="text-xl sm:text-2xl">📸</span>
          <span>우리 가족 & 낱말 사진 퀴즈 만들기</span>
        </button>
      </div>

      {/* Soft Bottom Forest Grass Meadow Border */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex items-center justify-center gap-2 py-0.5 text-white font-black text-xs sm:text-sm drop-shadow-md shrink-0">
        <span>🌼 향긋한 풀꽃</span>
        <span>•</span>
        <span>☀️ 따스한 햇살</span>
        <span>•</span>
        <span>🐾 12지신 친구들</span>
      </div>
    </div>
  );
};
