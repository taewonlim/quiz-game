import React, { useState, useRef } from 'react';
import { Question, SubjectMode } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { X, Plus, Trash2, Camera, Image as ImageIcon, Volume2, Sparkles, Check } from 'lucide-react';

interface PhotoQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  customQuestions: Question[];
  onSaveQuestions: (questions: Question[]) => void;
}

export const PhotoQuizModal: React.FC<PhotoQuizModalProps> = ({
  isOpen,
  onClose,
  customQuestions,
  onSaveQuestions
}) => {
  const [questions, setQuestions] = useState<Question[]>(customQuestions);
  const [activeTab, setActiveTab] = useState<SubjectMode>('hangul');

  // New question form state
  const [promptText, setPromptText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState('');
  const [fullWord, setFullWord] = useState('');
  const [hintCategory, setHintCategory] = useState('가족');
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('사진 크기는 3MB 이하로 선택해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      setCustomPhotoUrl(dataUrl);
      soundEngine.playPop();
    };
    reader.readAsDataURL(file);
  };

  const handleAddQuestion = () => {
    if (!promptText.trim() || !correctAnswer.trim() || !fullWord.trim()) {
      alert('문제, 정답 글자, 완성 단어를 모두 입력해주세요!');
      return;
    }

    const wrongList = wrongAnswers
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newQ: Question = {
      id: `custom_${Date.now()}`,
      subject: activeTab,
      promptText: promptText.trim(),
      fullWordOrSolution: fullWord.trim(),
      correctAnswer: correctAnswer.trim(),
      wrongAnswers: wrongList.length > 0 ? wrongList : ['가', '나', '다', '라'],
      hintCategory: hintCategory || '사진 퀴즈',
      imageIcon: '📸',
      customPhotoUrl: customPhotoUrl || undefined,
      voicePrompt: voicePrompt.trim() || `${fullWord.trim()}! 알맞은 글자를 찾아보세요!`
    };

    const updated = [newQ, ...questions];
    setQuestions(updated);
    onSaveQuestions(updated);
    soundEngine.playClick();
    soundEngine.speak('새로운 사진 퀴즈가 등록되었어요!');

    // Reset inputs
    setPromptText('');
    setCorrectAnswer('');
    setWrongAnswers('');
    setFullWord('');
    setCustomPhotoUrl(null);
    setVoicePrompt('');
  };

  const handleDeleteQuestion = (id: string) => {
    soundEngine.playClick();
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
    onSaveQuestions(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs select-none">
      <div
        className="relative w-full max-w-2xl bg-[#FDF8EE] rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#C9A86A] flex flex-col max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 20px 45px rgba(0,0,0,0.5)' }}
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
        <div className="flex items-center gap-2 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 flex items-center justify-center text-2xl shadow">
            📸
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#5C3610]">
              우리 가족 & 낱말 사진 퀴즈 만들기
            </h2>
            <p className="text-xs text-amber-800 font-bold">
              직접 찍은 사진(엄마, 아빠, 강아지, 장난감)을 넣어 두더지 게임 퀴즈로 만들어보세요!
            </p>
          </div>
        </div>

        {/* Subject Tab Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('hangul')}
            className={`flex-1 py-2 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'hangul'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
            }`}
          >
            <span>🌲 한글 낱말 퀴즈</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('math')}
            className={`flex-1 py-2 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'math'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-cyan-100 text-cyan-900 hover:bg-cyan-200'
            }`}
          >
            <span>💎 산수/수세기 퀴즈</span>
          </button>
        </div>

        {/* New Question Creator Card */}
        <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300 mb-5">
          <h3 className="text-sm font-black text-amber-950 mb-3 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-amber-700" />
            <span>새로운 사진 퀴즈 등록</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Photo Uploader */}
            <div className="flex flex-col items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 rounded-2xl border-2 border-dashed border-amber-400 bg-white hover:bg-amber-100/50 flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all shadow-inner overflow-hidden relative group"
              >
                {Boolean(customPhotoUrl && customPhotoUrl.trim()) ? (
                  <>
                    <img
                      src={customPhotoUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold transition-opacity">
                      사진 변경
                    </div>
                  </>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-amber-500 mb-1" />
                    <span className="text-xs font-extrabold text-amber-900">사진 등록하기</span>
                    <span className="text-[10px] text-amber-700">클릭하여 사진 첨부</span>
                  </>
                )}
              </div>
            </div>

            {/* Inputs */}
            <div className="sm:col-span-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                    완성 단어 (예: 엄마 / 사과)
                  </label>
                  <input
                    type="text"
                    value={fullWord}
                    onChange={(e) => setFullWord(e.target.value)}
                    placeholder="예: 엄마"
                    className="w-full bg-white px-2.5 py-1.5 rounded-xl border border-amber-300 font-black text-xs text-amber-950 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                    문제 텍스트 (예: 엄 ( ) / 1+2)
                  </label>
                  <input
                    type="text"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="예: 엄 ( )"
                    className="w-full bg-white px-2.5 py-1.5 rounded-xl border border-amber-300 font-black text-xs text-amber-950 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                    정답 글자 (예: 마 / 3)
                  </label>
                  <input
                    type="text"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="예: 마"
                    className="w-full bg-white px-2.5 py-1.5 rounded-xl border-2 border-emerald-400 font-black text-xs text-emerald-950 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                    오답 글자들 (쉼표로 구분)
                  </label>
                  <input
                    type="text"
                    value={wrongAnswers}
                    onChange={(e) => setWrongAnswers(e.target.value)}
                    placeholder="예: 바, 사, 나, 라"
                    className="w-full bg-white px-2.5 py-1.5 rounded-xl border border-amber-300 font-bold text-xs text-amber-950 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                    힌트 카테고리 (예: 가족, 동물)
                  </label>
                  <input
                    type="text"
                    value={hintCategory}
                    onChange={(e) => setHintCategory(e.target.value)}
                    placeholder="예: 우리 가족"
                    className="w-full bg-white px-2.5 py-1.5 rounded-xl border border-amber-300 font-bold text-xs text-amber-950 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-amber-900 mb-0.5">
                    음성 안내 문구
                  </label>
                  <input
                    type="text"
                    value={voicePrompt}
                    onChange={(e) => setVoicePrompt(e.target.value)}
                    placeholder="예: 사랑하는 우리 엄마!"
                    className="w-full bg-white px-2.5 py-1.5 rounded-xl border border-amber-300 font-bold text-xs text-amber-950 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddQuestion}
                className="w-full py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>사진 퀴즈 추가하기</span>
              </button>
            </div>
          </div>
        </div>

        {/* Existing Custom Questions List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black text-amber-950 uppercase tracking-wider">
              등록된 맞춤 퀴즈 ({questions.filter((q) => q.subject === activeTab).length}개)
            </h3>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {questions
              .filter((q) => q.subject === activeTab)
              .map((q) => (
                <div
                  key={q.id}
                  className="bg-white p-3 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {Boolean(q.customPhotoUrl && q.customPhotoUrl.trim()) ? (
                      <img
                        src={q.customPhotoUrl}
                        alt="Question Thumbnail"
                        className="w-12 h-12 rounded-xl object-cover border border-amber-300 shadow-xs"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-2xl flex items-center justify-center border border-amber-300">
                        {q.imageIcon}
                      </div>
                    )}

                    <div>
                      <div className="font-black text-sm text-amber-950">
                        {q.promptText} ➔ <span className="text-emerald-700">[{q.correctAnswer}]</span> ({q.fullWordOrSolution})
                      </div>
                      <div className="text-[11px] font-bold text-amber-800 flex items-center gap-2">
                        <span className="bg-amber-100 px-1.5 py-0.5 rounded text-[10px]">
                          {q.hintCategory}
                        </span>
                        <span>오답: {q.wrongAnswers.slice(0, 3).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => soundEngine.speak(q.voicePrompt)}
                      className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 cursor-pointer"
                      title="음성 미리듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 cursor-pointer"
                      title="삭제하기"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

            {questions.filter((q) => q.subject === activeTab).length === 0 && (
              <div className="text-center py-6 text-xs text-amber-800/80 font-bold bg-amber-50 rounded-2xl border border-dashed border-amber-300">
                아직 등록된 사진 퀴즈가 없어요. 위에서 사진과 단어를 추가해보세요! 📸
              </div>
            )}
          </div>
        </div>

        {/* Done Button */}
        <div className="mt-5 pt-3 border-t border-amber-200 flex justify-end">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>완료 및 게임 적용</span>
          </button>
        </div>
      </div>
    </div>
  );
};
