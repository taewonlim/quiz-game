import React from 'react';
import { Volume2, VolumeX, Music, Music2, BookOpen, Settings, ChevronLeft, Camera } from 'lucide-react';
import { TwinProfile, GameScreenType } from '../types';
import { ZODIAC_MAP } from '../data/zodiacData';
import { soundEngine } from '../utils/soundEngine';

interface HeaderProps {
  currentScreen: GameScreenType;
  activeProfile: TwinProfile;
  soundMuted: boolean;
  bgmMuted: boolean;
  onToggleSound: () => void;
  onToggleBgm: () => void;
  onNavigate: (screen: GameScreenType) => void;
  onOpenSettings: () => void;
  onOpenStickerBook: () => void;
  onOpenPhotoQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  activeProfile,
  soundMuted,
  bgmMuted,
  onToggleSound,
  onToggleBgm,
  onNavigate,
  onOpenSettings,
  onOpenStickerBook,
  onOpenPhotoQuiz
}) => {
  const zodiac = ZODIAC_MAP[activeProfile?.avatarZodiac || 'rat'] || ZODIAC_MAP.rat;

  const handleBack = () => {
    soundEngine.playClick();
    if (currentScreen === 'game') {
      onNavigate('difficulty');
    } else if (currentScreen === 'difficulty') {
      onNavigate('subject');
    } else if (currentScreen === 'subject') {
      onNavigate('zodiac');
    } else if (currentScreen === 'zodiac') {
      onNavigate('profile');
    } else {
      onNavigate('profile');
    }
  };

  return (
    <header className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2 select-none shrink-0 z-30">
      {/* Left: Back Button & Title */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {currentScreen !== 'profile' && (
          <button
            id="header-back-button"
            onClick={handleBack}
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-md border-2 border-amber-300 flex items-center justify-center text-amber-900 active:scale-90 transition-transform cursor-pointer"
            aria-label="뒤로 가기"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
          </button>
        )}

        <div className="flex items-center gap-1.5">
          <button
            id="header-title-badge"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('profile');
            }}
            className="bg-amber-100/95 hover:bg-amber-50 active:scale-95 transition-all border-2 border-amber-300 px-2.5 py-0.5 sm:px-4 sm:py-1.5 rounded-2xl shadow-sm flex items-center gap-1 sm:gap-2 cursor-pointer"
            title="홈 화면으로 이동"
          >
            <span className="text-sm sm:text-lg">🏕️</span>
            <span className="font-black text-amber-950 text-xs sm:text-lg tracking-wider whitespace-nowrap">
              도란도란 숲속탐험대
            </span>
          </button>
        </div>
      </div>

      {/* Right: Twin Badge, Photo Quiz, Sticker Book & Audio Controls */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Active Twin Badge with Avatar / Photo */}
        {currentScreen !== 'profile' && (
          <button
            id="header-twin-badge"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('profile');
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-white/95 rounded-full border-2 border-amber-300 shadow-sm cursor-pointer hover:bg-amber-50 active:scale-95 transition-all"
            title="프로필 변경"
          >
            {Boolean(activeProfile?.customPhotoUrl && activeProfile.customPhotoUrl.trim()) ? (
              <img
                src={activeProfile.customPhotoUrl}
                alt="Twin avatar"
                className="w-5 h-5 rounded-full object-cover border border-amber-400"
              />
            ) : (
              <span className="text-base">{zodiac.emoji}</span>
            )}
            <span className="font-bold text-xs text-amber-900">{activeProfile?.customName || '대원'}</span>
          </button>
        )}

        {/* Photo Quiz Studio Button */}
        <button
          id="header-photo-quiz-button"
          onClick={() => {
            soundEngine.playClick();
            onOpenPhotoQuiz();
          }}
          className="relative px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-90 transition-all border-2 border-emerald-700 shadow-md flex items-center gap-1 text-white font-black text-[11px] sm:text-sm cursor-pointer"
          title="사진 퀴즈 만들기"
        >
          <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">사진 퀴즈</span>
        </button>

        {/* Sticker Book Button */}
        <button
          id="header-sticker-book-button"
          onClick={() => {
            soundEngine.playClick();
            onOpenStickerBook();
          }}
          className="relative px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-90 transition-all border-2 border-amber-600 shadow-md flex items-center gap-1 text-amber-950 font-black text-[11px] sm:text-sm cursor-pointer"
          title="스티커 도감"
        >
          <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">스티커</span>
          <span className="bg-white text-amber-900 rounded-full px-1.5 py-0.2 text-[9px] sm:text-[11px] font-extrabold shadow-sm">
            {activeProfile?.stickersEarned?.length || 0}
          </span>
        </button>

        {/* BGM Toggle */}
        <button
          id="header-bgm-toggle"
          onClick={() => {
            soundEngine.playClick();
            onToggleBgm();
          }}
          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
            bgmMuted
              ? 'bg-stone-200 border-stone-400 text-stone-500'
              : 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-sm'
          }`}
          title={bgmMuted ? '배경음악 켜기' : '배경음악 끄기'}
        >
          {bgmMuted ? <Music2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50" /> : <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
        </button>

        {/* Sound Effects Toggle */}
        <button
          id="header-sound-toggle"
          onClick={() => {
            onToggleSound();
          }}
          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
            soundMuted
              ? 'bg-stone-200 border-stone-400 text-stone-500'
              : 'bg-sky-100 border-sky-400 text-sky-800 shadow-sm'
          }`}
          title={soundMuted ? '효과음 켜기' : '효과음 끄기'}
        >
          {soundMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
        </button>

        {/* Settings / Twin Rename */}
        <button
          id="header-settings-button"
          onClick={() => {
            soundEngine.playClick();
            onOpenSettings();
          }}
          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 border-2 border-stone-300 hover:border-amber-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title="설정 및 대원 사진/이름 변경"
        >
          <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </header>
  );
};
