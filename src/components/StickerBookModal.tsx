import React, { useState } from 'react';
import { STICKERS_DATA } from '../data/stickersData';
import { TwinProfile } from '../types';
import { ZODIAC_MAP } from '../data/zodiacData';
import { soundEngine } from '../utils/soundEngine';
import { X, Lock, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface StickerBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  twin1: TwinProfile;
  twin2: TwinProfile;
  activeTwinId: string;
}

export const StickerBookModal: React.FC<StickerBookModalProps> = ({
  isOpen,
  onClose,
  twin1,
  twin2,
  activeTwinId
}) => {
  const [selectedTwinId, setSelectedTwinId] = useState<string>(activeTwinId);

  if (!isOpen) return null;

  const currentTwin = (selectedTwinId === 'twin1' ? twin1 : twin2) || twin1;
  const zodiac = ZODIAC_MAP[currentTwin?.avatarZodiac || 'rat'] || ZODIAC_MAP.rat;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div
        className="relative w-full max-w-2xl bg-[#FDF8EE] rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#C9A86A] flex flex-col max-h-[90vh] overflow-hidden"
        style={{
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-950 flex items-center justify-center border-2 border-amber-400 active:scale-90 transition-transform cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-xl shadow">
            📖
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#5C3610]">
              쌍둥이 탐험대 스티커 도감
            </h2>
            <p className="text-xs text-amber-800 font-bold">
              모험을 완수하고 획득한 보물 스티커들을 모아보세요!
            </p>
          </div>
        </div>

        {/* Twin Selector Tabs */}
        <div className="flex items-center gap-3 mb-4 bg-amber-100/70 p-1.5 rounded-2xl border border-amber-300">
          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedTwinId('twin1');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedTwinId === 'twin1'
                ? 'bg-amber-400 text-amber-950 shadow-md border border-amber-500'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <span>{ZODIAC_MAP[twin1?.avatarZodiac || 'rat']?.emoji || '🐭'}</span>
            <span>{twin1?.customName || '1호기'} ({twin1?.defaultLabel || '1호기'})</span>
            <span className="text-[11px] bg-white px-1.5 py-0.2 rounded-full text-amber-900">
              {twin1?.stickersEarned?.length || 0}개
            </span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedTwinId('twin2');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedTwinId === 'twin2'
                ? 'bg-sky-400 text-sky-950 shadow-md border border-sky-500'
                : 'text-sky-900 hover:bg-sky-200/60'
            }`}
          >
            <span>{ZODIAC_MAP[twin2?.avatarZodiac || 'ox']?.emoji || '🐮'}</span>
            <span>{twin2?.customName || '2호기'} ({twin2?.defaultLabel || '2호기'})</span>
            <span className="text-[11px] bg-white px-1.5 py-0.2 rounded-full text-sky-900">
              {twin2?.stickersEarned?.length || 0}개
            </span>
          </button>
        </div>

        {/* Summary Card for Selected Twin */}
        <div className="bg-amber-50 rounded-2xl p-3 mb-4 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center text-2xl shadow-inner">
              {zodiac.emoji}
            </div>
            <div>
              <div className="text-sm font-black text-amber-950">
                {currentTwin?.customName || '대원'} 대원의 보물함
              </div>
              <div className="text-xs text-amber-800 font-bold flex items-center gap-2 mt-0.5">
                <span>한글 최고 {currentTwin?.hangulHighScore || 0}점</span>
                <span>•</span>
                <span>산수 최고 {currentTwin?.mathHighScore || 0}점</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>수집률 {Math.round(((currentTwin?.stickersEarned?.length || 0) / STICKERS_DATA.length) * 100)}%</span>
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STICKERS_DATA.map((sticker) => {
              const isUnlocked = currentTwin.stickersEarned.includes(sticker.id);

              return (
                <div
                  key={sticker.id}
                  className={`relative rounded-2xl p-3 border-2 flex flex-col items-center text-center transition-all ${
                    isUnlocked
                      ? 'bg-white border-amber-300 shadow-md hover:scale-102'
                      : 'bg-stone-100 border-stone-300 opacity-60'
                  }`}
                >
                  {/* Sticker Badge */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-2 shadow-inner ${
                      isUnlocked
                        ? 'bg-amber-100 border-2 border-amber-400 ring-2 ring-yellow-200'
                        : 'bg-stone-200 border-2 border-stone-300 text-stone-400'
                    }`}
                  >
                    {isUnlocked ? sticker.emoji : <Lock className="w-5 h-5 text-stone-400" />}
                  </div>

                  {/* Name & Requirement */}
                  <h3 className="text-xs sm:text-sm font-black text-stone-900 leading-tight mb-1">
                    {sticker.nameKo}
                  </h3>
                  <p className="text-[10px] text-stone-600 font-medium line-clamp-2">
                    {isUnlocked ? sticker.description : `🔒 ${sticker.requirement}`}
                  </p>

                  {/* Status Indicator */}
                  {isUnlocked && (
                    <div className="absolute top-2 right-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>탐험을 계속하면 새로운 칭호와 스티커가 열려요!</span>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-black hover:bg-amber-300 active:scale-95 transition-transform cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
