import React, { useState, useRef } from 'react';
import { TwinProfile, ZodiacId } from '../types';
import { ZODIAC_LIST } from '../data/zodiacData';
import { soundEngine } from '../utils/soundEngine';
import { X, Save, RotateCcw, User, Camera, Trash2 } from 'lucide-react';

interface TwinCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  twin1: TwinProfile;
  twin2: TwinProfile;
  onSaveProfiles: (updatedTwin1: TwinProfile, updatedTwin2: TwinProfile) => void;
  onResetScoresOnly?: () => void;
  onResetData: () => void;
}

const DEFAULT_TWIN1: TwinProfile = {
  id: 'twin1',
  defaultLabel: '1호기',
  customName: '규민',
  avatarZodiac: 'rabbit',
  levelTitle: '숲속 탐험대장',
  levelNumber: 1,
  hangulHighScore: 0,
  mathHighScore: 0,
  totalGamesPlayed: 0,
  stickersEarned: [],
  themeColor: '#F59E0B',
  customPhotoUrl: undefined
};

const DEFAULT_TWIN2: TwinProfile = {
  id: 'twin2',
  defaultLabel: '2호기',
  customName: '유민',
  avatarZodiac: 'dragon',
  levelTitle: '별빛 탐험대장',
  levelNumber: 1,
  hangulHighScore: 0,
  mathHighScore: 0,
  totalGamesPlayed: 0,
  stickersEarned: [],
  themeColor: '#3B82F6',
  customPhotoUrl: undefined
};

export const TwinCustomizerModal: React.FC<TwinCustomizerModalProps> = ({
  isOpen,
  onClose,
  twin1 = DEFAULT_TWIN1,
  twin2 = DEFAULT_TWIN2,
  onSaveProfiles,
  onResetScoresOnly,
  onResetData
}) => {
  const [twin1Name, setTwin1Name] = useState(twin1?.customName || '1호기');
  const [twin1Zodiac, setTwin1Zodiac] = useState<ZodiacId>(twin1?.avatarZodiac || 'rat');
  const [twin1Photo, setTwin1Photo] = useState<string | undefined>(twin1?.customPhotoUrl);

  const [twin2Name, setTwin2Name] = useState(twin2?.customName || '2호기');
  const [twin2Zodiac, setTwin2Zodiac] = useState<ZodiacId>(twin2?.avatarZodiac || 'ox');
  const [twin2Photo, setTwin2Photo] = useState<string | undefined>(twin2?.customPhotoUrl);

  const twin1FileInputRef = useRef<HTMLInputElement>(null);
  const twin2FileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens or profiles change
  React.useEffect(() => {
    if (isOpen && twin1 && twin2) {
      setTwin1Name(twin1.customName || '1호기');
      setTwin1Zodiac(twin1.avatarZodiac || 'rat');
      setTwin1Photo(twin1.customPhotoUrl);

      setTwin2Name(twin2.customName || '2호기');
      setTwin2Zodiac(twin2.avatarZodiac || 'ox');
      setTwin2Photo(twin2.customPhotoUrl);
    }
  }, [isOpen, twin1, twin2]);

  if (!isOpen) return null;

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPhoto: (url: string | undefined) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('사진 크기는 4MB 이하로 선택해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      setPhoto(dataUrl);
      soundEngine.playPop();
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    soundEngine.playClick();
    const updated1: TwinProfile = {
      ...twin1,
      customName: twin1Name.trim() || '1호기',
      avatarZodiac: twin1Zodiac,
      customPhotoUrl: twin1Photo
    };
    const updated2: TwinProfile = {
      ...twin2,
      customName: twin2Name.trim() || '2호기',
      avatarZodiac: twin2Zodiac,
      customPhotoUrl: twin2Photo
    };
    onSaveProfiles(updated1, updated2);
    soundEngine.speak('대원 정보가 저장되었어요!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs select-none">
      <div
        className="relative w-full max-w-xl bg-[#FDF8EE] rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#C9A86A] flex flex-col max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: '0 20px 45px rgba(0,0,0,0.5)'
        }}
      >
        {/* Close button */}
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
        <div className="flex items-center gap-2 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-xl shadow">
            ⚙️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#5C3610]">
              쌍둥이 대원 설정 및 사진 등록
            </h2>
            <p className="text-xs text-amber-800 font-bold">
              아이들의 이름, 실제 얼굴 사진, 12지신 짝꿍 캐릭터를 설정하세요.
            </p>
          </div>
        </div>

        {/* Twin 1 Settings Card */}
        <div className="bg-amber-100/70 rounded-2xl p-4 mb-4 border-2 border-amber-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-800" />
              <h3 className="text-sm font-black text-amber-950">1호기 대원 정보</h3>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full">
              첫째
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Real Photo Upload Section */}
            <div className="flex flex-col items-center justify-center">
              <input
                ref={twin1FileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoUpload(e, setTwin1Photo)}
              />
              <div className="relative group">
                <div
                  onClick={() => twin1FileInputRef.current?.click()}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-3 border-amber-400 bg-white shadow-md flex items-center justify-center cursor-pointer overflow-hidden relative hover:opacity-90 transition-opacity"
                >
                  {Boolean(twin1Photo && twin1Photo.trim()) ? (
                    <img
                      src={twin1Photo}
                      alt="Twin 1"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-amber-700">
                      <Camera className="w-6 h-6 mb-0.5" />
                      <span className="text-[9px] font-black">사진 등록</span>
                    </div>
                  )}
                </div>

                {/* Clear Photo button */}
                {Boolean(twin1Photo && twin1Photo.trim()) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTwin1Photo(undefined);
                    }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow cursor-pointer border border-white"
                    title="사진 지우기"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-amber-800 font-bold mt-1">대원 실제 사진</span>
            </div>

            {/* Inputs & Zodiac */}
            <div className="sm:col-span-2 space-y-2">
              <div>
                <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                  대원 이름 (또는 별명)
                </label>
                <input
                  type="text"
                  value={twin1Name}
                  onChange={(e) => setTwin1Name(e.target.value)}
                  maxLength={10}
                  placeholder="예: 1호기 또는 민준"
                  className="w-full bg-white px-3 py-1.5 rounded-xl border border-amber-300 font-black text-xs sm:text-sm text-amber-950 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                  12지신 짝꿍 캐릭터
                </label>
                <div className="grid grid-cols-6 gap-1 bg-white p-1.5 rounded-xl border border-amber-200">
                  {ZODIAC_LIST.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playPop();
                        setTwin1Zodiac(z.id);
                      }}
                      className={`p-1 rounded-lg text-lg flex flex-col items-center justify-center transition-transform ${
                        twin1Zodiac === z.id
                          ? 'bg-amber-300 scale-110 ring-2 ring-amber-500 shadow-xs'
                          : 'hover:bg-amber-50'
                      }`}
                      title={z.nameKo}
                    >
                      <span>{z.emoji}</span>
                      <span className="text-[8px] font-bold text-amber-900">{z.nameKo}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Twin 2 Settings Card */}
        <div className="bg-sky-100/70 rounded-2xl p-4 mb-4 border-2 border-sky-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sky-800" />
              <h3 className="text-sm font-black text-sky-950">2호기 대원 정보</h3>
            </div>
            <span className="text-[11px] font-bold text-sky-700 bg-sky-200/80 px-2 py-0.5 rounded-full">
              둘째
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Real Photo Upload Section */}
            <div className="flex flex-col items-center justify-center">
              <input
                ref={twin2FileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoUpload(e, setTwin2Photo)}
              />
              <div className="relative group">
                <div
                  onClick={() => twin2FileInputRef.current?.click()}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-3 border-sky-400 bg-white shadow-md flex items-center justify-center cursor-pointer overflow-hidden relative hover:opacity-90 transition-opacity"
                >
                  {Boolean(twin2Photo && twin2Photo.trim()) ? (
                    <img
                      src={twin2Photo}
                      alt="Twin 2"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-sky-700">
                      <Camera className="w-6 h-6 mb-0.5" />
                      <span className="text-[9px] font-black">사진 등록</span>
                    </div>
                  )}
                </div>

                {/* Clear Photo button */}
                {Boolean(twin2Photo && twin2Photo.trim()) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTwin2Photo(undefined);
                    }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow cursor-pointer border border-white"
                    title="사진 지우기"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-sky-800 font-bold mt-1">대원 실제 사진</span>
            </div>

            {/* Inputs & Zodiac */}
            <div className="sm:col-span-2 space-y-2">
              <div>
                <label className="block text-[11px] font-extrabold text-sky-900 mb-0.5">
                  대원 이름 (또는 별명)
                </label>
                <input
                  type="text"
                  value={twin2Name}
                  onChange={(e) => setTwin2Name(e.target.value)}
                  maxLength={10}
                  placeholder="예: 2호기 또는 연우"
                  className="w-full bg-white px-3 py-1.5 rounded-xl border border-sky-300 font-black text-xs sm:text-sm text-sky-950 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-sky-900 mb-0.5">
                  12지신 짝꿍 캐릭터
                </label>
                <div className="grid grid-cols-6 gap-1 bg-white p-1.5 rounded-xl border border-sky-200">
                  {ZODIAC_LIST.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playPop();
                        setTwin2Zodiac(z.id);
                      }}
                      className={`p-1 rounded-lg text-lg flex flex-col items-center justify-center transition-transform ${
                        twin2Zodiac === z.id
                          ? 'bg-sky-300 scale-110 ring-2 ring-sky-500 shadow-xs'
                          : 'hover:bg-sky-50'
                      }`}
                      title={z.nameKo}
                    >
                      <span>{z.emoji}</span>
                      <span className="text-[8px] font-bold text-sky-900">{z.nameKo}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score & Record Management Section */}
        <div className="bg-amber-100/60 rounded-2xl p-3.5 border border-amber-300/80 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
              <span>📊 점수 및 기록 관리</span>
            </span>
            <span className="text-[10px] text-amber-800 font-bold">오락실 점수가 계속 쌓이지 않도록 리셋할 수 있어요</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('대원 이름과 사진은 유지하고, 점수(최고점수 및 게임기록)만 0점으로 초기화할까요?')) {
                  soundEngine.playPop();
                  if (onResetScoresOnly) {
                    onResetScoresOnly();
                  } else {
                    onResetData();
                  }
                  soundEngine.speak('점수가 0점으로 초기화되었어요!');
                  alert('모든 점수 기록이 0점으로 초기화되었습니다.');
                }
              }}
              className="flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-200 hover:bg-amber-300 active:scale-95 px-3 py-2 rounded-xl border border-amber-400 shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>점수만 0점으로 초기화</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('대원 이름, 사진, 스티커 도감을 포함한 모든 데이터를 처음 상태로 초기화할까요?')) {
                  soundEngine.playPop();
                  onResetData();
                  soundEngine.speak('모든 데이터가 초기화되었어요!');
                  onClose();
                }
              }}
              className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 active:scale-95 px-2.5 py-2 rounded-xl border border-rose-300 transition-all cursor-pointer"
            >
              <Trash2 className="w-3 h-3 text-rose-500" />
              <span>전체 데이터 완전 초기화</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-amber-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Save className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">설정 저장하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
