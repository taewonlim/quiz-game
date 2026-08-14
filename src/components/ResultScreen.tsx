import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SubjectMode, TwinProfile, Sticker, DifficultyLevel } from '../types';
import { ZODIAC_MAP } from '../data/zodiacData';
import { DIFFICULTY_MAP } from '../data/difficultyData';
import { soundEngine } from '../utils/soundEngine';
import {
  Star,
  RotateCcw,
  Compass,
  BookOpen,
  Home,
  Trophy,
  Flame,
  Sliders,
  Sparkles,
  Award,
  Crown
} from 'lucide-react';
import { CartoonForestLandscape } from './CartoonForestLandscape';

interface ResultScreenProps {
  subject: SubjectMode;
  difficulty?: DifficultyLevel;
  activeProfile: TwinProfile;
  twin1?: TwinProfile;
  twin2?: TwinProfile;
  score: number;
  maxCombo: number;
  correctCount: number;
  stageReached: number;
  isNewHighScore?: boolean;
  previousHighScore?: number;
  newStickerUnlocked: Sticker | null;
  onReplay: () => void;
  onChangeDifficulty: () => void;
  onChangeSubject: () => void;
  onOpenStickerBook: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  subject,
  difficulty = 'normal',
  activeProfile,
  twin1,
  twin2,
  score,
  maxCombo,
  correctCount,
  stageReached,
  isNewHighScore = false,
  previousHighScore = 0,
  newStickerUnlocked,
  onReplay,
  onChangeDifficulty,
  onChangeSubject,
  onOpenStickerBook,
  onGoHome
}) => {
  const zodiac = ZODIAC_MAP[activeProfile.avatarZodiac] || ZODIAC_MAP.rat;
  const diffInfo = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP.normal;

  // Calculate Stars (1 to 3)
  const starsCount = score >= 150 ? 3 : score >= 80 ? 2 : 1;

  // Calculate current subject high score for active profile
  const subjectHighScore =
    subject === 'hangul' ? activeProfile.hangulHighScore : activeProfile.mathHighScore;
  const currentBestScore = Math.max(subjectHighScore, score);

  useEffect(() => {
    soundEngine.playLevelUp();
    if (isNewHighScore && score > 0) {
      soundEngine.speak(
        `와우! 신기록이에요! ${activeProfile.customName} 대원이 최고 점수 ${score}점을 달성했어요!`
      );
    } else {
      soundEngine.speak(
        `대단해요 ${activeProfile.customName} 대원! ${score}점을 획득했어요! 최고예요!`
      );
    }

    const duration = isNewHighScore ? 3.5 * 1000 : 2.2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: isNewHighScore ? 7 : 4,
        angle: 60,
        spread: 60,
        origin: { x: 0 }
      });
      confetti({
        particleCount: isNewHighScore ? 7 : 4,
        angle: 120,
        spread: 60,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [activeProfile.customName, score, isNewHighScore]);

  // Comparison between twin1 and twin2 for Arcade Hall of Fame
  const t1 = twin1 || activeProfile;
  const t2 = twin2;
  const t1Score = subject === 'hangul' ? t1.hangulHighScore : t1.mathHighScore;
  const t2Score = t2 ? (subject === 'hangul' ? t2.hangulHighScore : t2.mathHighScore) : 0;

  return (
    <div className="relative h-full flex-1 flex flex-col items-center justify-between p-2 sm:p-4 select-none overflow-hidden">
      {/* Whimsical Fairytale Cartoon Forest Scenery Background */}
      <CartoonForestLandscape themeId="sunset" />

      {/* Main Arcade Fairytale Result Board Container */}
      <div
        className="relative w-full max-w-xl bg-[#7C3F1B]/95 backdrop-blur-md rounded-2xl sm:rounded-[36px] p-3 sm:p-5 shadow-2xl border-3 sm:border-4 border-[#4E240D] flex flex-col items-center text-center my-auto"
        style={{
          boxShadow: '0 20px 40px rgba(35, 18, 5, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
        }}
      >
        {/* Top Floating Badge & NEW RECORD Banner */}
        <div className="relative -mt-6 sm:-mt-8 flex flex-col items-center gap-1">
          <div className="bg-amber-400 border-2 sm:border-4 border-amber-600 px-5 sm:px-8 py-1 sm:py-1.5 rounded-full shadow-xl flex items-center gap-2">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950" />
            <span className="text-sm sm:text-lg font-black text-amber-950 tracking-tight">
              숲길 탐험 미션 완료!
            </span>
          </div>

          {/* Arcade NEW RECORD Badge */}
          {isNewHighScore && score > 0 && (
            <div className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 text-amber-950 border-2 border-yellow-500 px-4 py-0.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1 animate-bounce">
              <Crown className="w-3.5 h-3.5 text-amber-800" />
              <span>👑 신기록 달성! (NEW BEST RECORD)</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            </div>
          )}
        </div>

        {/* Mascot Avatar & Profile Tag Header */}
        <div className="flex items-center justify-between w-full bg-black/25 px-3 py-1.5 rounded-xl sm:rounded-2xl border border-white/10 my-1.5">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-inner border border-amber-300 shrink-0"
              style={{ backgroundColor: zodiac.color }}
            >
              {zodiac.emoji}
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-black text-amber-100 flex items-center gap-1.5">
                <span>{activeProfile.customName} 대원</span>
                <span className="text-[10px] sm:text-xs bg-amber-300 text-amber-950 px-2 py-0.2 rounded-full font-bold">
                  {activeProfile.levelTitle}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-amber-200 font-bold flex items-center gap-1 mt-0.5">
                <span>{subject === 'hangul' ? '🌲 가나다숲' : '💎 수리수리동굴'}</span>
                <span>•</span>
                <span className="text-yellow-300">{diffInfo.nameKo}</span>
              </div>
            </div>
          </div>

          {/* Stars Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((star) => (
              <div
                key={star}
                className={`transform transition-transform ${
                  star <= starsCount ? 'scale-110 text-yellow-300 animate-bounce' : 'text-stone-500 scale-90 opacity-60'
                }`}
                style={{ animationDelay: `${star * 150}ms` }}
              >
                <Star
                  className="w-5 h-5 sm:w-7 sm:h-7"
                  fill={star <= starsCount ? '#FBBF24' : 'none'}
                  stroke={star <= starsCount ? '#B45309' : '#78716C'}
                  strokeWidth={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Score Card Display & Arcade High Score Strip */}
        <div className="w-full bg-[#FFFBF0] rounded-2xl p-2.5 sm:p-3.5 my-1 border-2 sm:border-3 border-[#C99863] shadow-inner text-stone-900">
          {/* Arcade HIGH SCORE Header Marquee */}
          <div className="flex items-center justify-between bg-amber-950 text-amber-200 px-3 py-1 rounded-xl border border-amber-800 shadow-sm mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-black">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-amber-100">🏆 최고 기록 (HIGH SCORE)</span>
            </div>
            <div className="text-xs font-black text-yellow-400">
              {currentBestScore}점
            </div>
          </div>

          {/* This Game Score */}
          <div className="text-[11px] font-black text-amber-800 tracking-wide">이번 탐험 획득 점수</div>
          <div className="text-3xl sm:text-5xl font-black text-amber-600 tracking-tight my-0.5 flex items-center justify-center gap-1">
            <span>{score}</span>
            <span className="text-lg sm:text-2xl text-stone-600 font-bold">점</span>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-1.5 mt-1.5 text-xs font-black">
            <div className="bg-amber-100/90 rounded-xl p-1.5 sm:p-2 border border-amber-300">
              <div className="text-amber-800 text-[10px]">맞춘 개수</div>
              <div className="text-amber-950 text-xs sm:text-sm font-black">🎯 {correctCount}개</div>
            </div>
            <div className="bg-orange-100/90 rounded-xl p-1.5 sm:p-2 border border-orange-300">
              <div className="text-orange-800 text-[10px]">최대 콤보</div>
              <div className="text-orange-950 text-xs sm:text-sm font-black flex items-center justify-center gap-0.5">
                <Flame className="w-3 h-3 text-orange-500" />
                <span>x{maxCombo}</span>
              </div>
            </div>
            <div className="bg-purple-100/90 rounded-xl p-1.5 sm:p-2 border border-purple-300">
              <div className="text-purple-800 text-[10px]">도달 단계</div>
              <div className="text-purple-950 text-xs sm:text-sm font-black">✨ {stageReached}단계</div>
            </div>
          </div>
        </div>

        {/* Arcade Hall of Fame Ranking Comparison Bar (1호기 vs 2호기) */}
        {t2 && (
          <div className="w-full bg-black/35 rounded-xl p-2 my-0.5 border border-white/15 text-white flex items-center justify-between px-3 text-xs">
            <div className="flex items-center gap-1 font-bold text-amber-200">
              <span>🕹️ {subject === 'hangul' ? '가나다' : '수리'} 랭킹</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1 ${t1.id === activeProfile.id ? 'text-yellow-300 font-black' : 'text-stone-300'}`}>
                <span>{t1.customName}:</span>
                <span className="font-mono">{t1Score}점</span>
              </div>
              <span className="text-stone-500">|</span>
              <div className={`flex items-center gap-1 ${t2.id === activeProfile.id ? 'text-yellow-300 font-black' : 'text-stone-300'}`}>
                <span>{t2.customName}:</span>
                <span className="font-mono">{t2Score}점</span>
              </div>
            </div>
          </div>
        )}

        {/* New Sticker Unlocked Notification */}
        {newStickerUnlocked && (
          <div className="w-full bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 border border-yellow-500 rounded-xl p-1.5 my-1 shadow flex items-center justify-center gap-2 animate-pulse">
            <span className="text-2xl">{newStickerUnlocked.emoji}</span>
            <div className="text-left">
              <div className="text-[10px] font-black text-amber-900">🎉 새로운 스티커 획득!</div>
              <div className="text-xs font-black text-amber-950">{newStickerUnlocked.nameKo}</div>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 mt-2">
          <button
            id="result-btn-replay"
            onClick={() => {
              soundEngine.playClick();
              onReplay();
            }}
            className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black py-2 sm:py-2.5 px-1.5 rounded-xl shadow-xs border-2 border-amber-500 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all text-xs whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>다시 하기</span>
          </button>

          <button
            id="result-btn-change-diff"
            onClick={() => {
              soundEngine.playClick();
              onChangeDifficulty();
            }}
            className="bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-yellow-950 font-black py-2 sm:py-2.5 px-1.5 rounded-xl shadow-xs border-2 border-yellow-500 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all text-xs whitespace-nowrap"
          >
            <Sliders className="w-4 h-4 shrink-0" />
            <span>난이도 선택</span>
          </button>

          <button
            id="result-btn-change-subject"
            onClick={() => {
              soundEngine.playClick();
              onChangeSubject();
            }}
            className="bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-emerald-950 font-black py-2 sm:py-2.5 px-1.5 rounded-xl shadow-xs border-2 border-emerald-500 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all text-xs whitespace-nowrap"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>과목 선택</span>
          </button>

          <button
            id="result-btn-sticker-book"
            onClick={() => {
              soundEngine.playClick();
              onOpenStickerBook();
            }}
            className="bg-sky-400 hover:bg-sky-300 active:scale-95 text-sky-950 font-black py-2 sm:py-2.5 px-1.5 rounded-xl shadow-xs border-2 border-sky-500 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all text-xs whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>스티커 도감</span>
          </button>

          <button
            id="result-btn-home"
            onClick={() => {
              soundEngine.playClick();
              onGoHome();
            }}
            className="col-span-2 sm:col-span-1 bg-rose-400 hover:bg-rose-300 active:scale-95 text-rose-950 font-black py-2 sm:py-2.5 px-1.5 rounded-xl shadow-xs border-2 border-rose-500 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all text-xs whitespace-nowrap"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>대원 선택</span>
          </button>
        </div>
      </div>
    </div>
  );
};
