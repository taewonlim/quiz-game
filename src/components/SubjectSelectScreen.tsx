import React from 'react';
import { SubjectMode, TwinProfile } from '../types';
import { Trees, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { CartoonForestLandscape } from './CartoonForestLandscape';

interface SubjectSelectScreenProps {
  activeProfile: TwinProfile;
  onSelectSubject: (subject: SubjectMode) => void;
}

export const SubjectSelectScreen: React.FC<SubjectSelectScreenProps> = ({
  activeProfile,
  onSelectSubject
}) => {
  const handleSelect = (mode: SubjectMode) => {
    soundEngine.playClick();
    if (mode === 'hangul') {
      soundEngine.speak('가나다 숲으로 출발!');
    } else {
      soundEngine.speak('수리수리 동굴로 출발!');
    }
    onSelectSubject(mode);
  };

  return (
    <div className="relative h-full flex-1 flex flex-col items-center justify-between p-2.5 sm:p-4 select-none overflow-hidden">
      {/* Whimsical Fairytale Cartoon Forest Scenery Background */}
      <CartoonForestLandscape themeId="morning" />

      {/* Center Top Owl / Explorer Guide with Speech Bubble */}
      <div className="relative z-10 flex flex-col items-center my-1 sm:my-2 shrink-0">
        {/* Guide Avatar Circle */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-yellow-300 bg-amber-100 shadow-lg flex items-center justify-center text-2xl sm:text-3xl animate-bounce">
          🦉
        </div>

        {/* Speech Bubble */}
        <div className="relative -mt-1.5 bg-[#FFFBF0]/95 backdrop-blur-md border-3 border-[#C99863] px-4 sm:px-7 py-1.5 sm:py-2 rounded-2xl sm:rounded-full shadow-lg text-center">
          <div className="font-black text-[#5C3610] text-sm sm:text-lg">
            {activeProfile.customName} 대원, 어디로 탐험을 떠나볼까요?
          </div>
          <div className="text-xs sm:text-sm font-bold text-amber-800">
            신나는 한글 숲과 신비한 숫자 동굴이 기다려요!
          </div>
        </div>
      </div>

      {/* 2 Subject Selection Cards (2 cols on all devices) */}
      <div className="relative z-10 w-full max-w-3xl grid grid-cols-2 gap-3 sm:gap-6 px-1 my-auto">
        {/* Card 1: Hangul Forest (가나다 숲) */}
        <div
          id="btn-select-hangul"
          onClick={() => handleSelect('hangul')}
          className="group relative h-52 sm:h-76 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col items-center justify-between cursor-pointer active:scale-95 transition-all duration-200 shadow-xl border-3 sm:border-4 border-[#8C532B] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(84, 45, 14, 0.92) 0%, rgba(46, 125, 50, 0.88) 100%)',
            boxShadow: '0 16px 32px -6px rgba(45, 25, 10, 0.55)'
          }}
        >
          {/* Subtle soft forest path background inside card */}
          <div className="absolute inset-0 -z-10 opacity-30 group-hover:opacity-40 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
              alt="Hangul Forest Path"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Glowing Tree Icon Badge */}
          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-amber-100/20 border border-amber-300/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-100/30 transition-all shadow-md">
            <Trees className="w-7 h-7 sm:w-9 sm:h-9 text-amber-200" />
          </div>

          {/* Texts: Main Korean title + Korean sub */}
          <div className="text-center z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
              가나다숲
            </h2>
            <p className="text-xs sm:text-sm font-extrabold text-amber-200 tracking-wide mt-1">
              그림 힌트 & 알맞은 낱말 쏙쏙!
            </p>
          </div>

          {/* Mini Action Tag */}
          <div className="w-full bg-emerald-500/95 text-white font-extrabold text-xs sm:text-base py-2 sm:py-2.5 rounded-xl text-center shadow-md group-hover:bg-emerald-400 transition-colors border border-emerald-300/40">
            가나다숲으로 출발! 🌲
          </div>
        </div>

        {/* Card 2: Math Cave (수리수리동굴) */}
        <div
          id="btn-select-math"
          onClick={() => handleSelect('math')}
          className="group relative h-52 sm:h-76 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col items-center justify-between cursor-pointer active:scale-95 transition-all duration-200 shadow-xl border-3 sm:border-4 border-[#374151] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.92) 0%, rgba(14, 116, 144, 0.88) 100%)',
            boxShadow: '0 16px 32px -6px rgba(15, 23, 42, 0.65)'
          }}
        >
          {/* Subtle magical cave background inside card */}
          <div className="absolute inset-0 -z-10 opacity-30 group-hover:opacity-40 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
              alt="Math Cave"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Glowing Mountain / Gem Icon Badge */}
          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cyan-100/20 border border-cyan-300/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-100/30 transition-all shadow-md">
            <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-200" />
          </div>

          {/* Texts: Main Korean title + Korean sub */}
          <div className="text-center z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
              수리수리동굴
            </h2>
            <p className="text-xs sm:text-sm font-extrabold text-cyan-200 tracking-wide mt-1">
              보석 세기 & 신나는 수 놀이!
            </p>
          </div>

          {/* Mini Action Tag */}
          <div className="w-full bg-cyan-500/95 text-white font-extrabold text-xs sm:text-base py-2 sm:py-2.5 rounded-xl text-center shadow-md group-hover:bg-cyan-400 transition-colors border border-cyan-300/40">
            수리수리동굴로 출발! 💎
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer className="relative z-10 w-full max-w-3xl flex items-center justify-between text-xs font-bold text-amber-100 py-2 px-3.5 bg-black/35 backdrop-blur-md rounded-xl border border-white/20 shrink-0">
        <div>© 2026 도란도란 숲속탐험대</div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> 부모 가이드</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 6세 안심 학습</span>
        </div>
      </footer>
    </div>
  );
};
