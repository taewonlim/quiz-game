import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { SubjectMode, TwinProfile, Question, MoleSpot, DifficultyLevel } from '../types';
import { HANGUL_QUESTIONS, MATH_QUESTIONS } from '../data/questionsData';
import { ZODIAC_LIST } from '../data/zodiacData';
import { FOREST_THEMES, ForestTheme } from '../data/forestThemes';
import { ZodiacMole } from './ZodiacMole';
import { CartoonForestLandscape } from './CartoonForestLandscape';
import { soundEngine } from '../utils/soundEngine';
import { Sparkles, Flame, Volume2, ArrowLeft, Palette, Check } from 'lucide-react';

interface GameScreenProps {
  subject: SubjectMode;
  difficulty?: DifficultyLevel;
  activeProfile: TwinProfile;
  customQuestions?: Question[];
  onFinishGame: (finalScore: number, maxCombo: number, correctCount: number, reachedStage: number) => void;
  onExitGame: () => void;
}

const TOTAL_HOLES = 12;

// Extra fallback pools to guarantee variety and 100% unique options
const EXTRA_HANGUL_CHARS = [
  '가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하',
  '고', '노', '도', '로', '모', '보', '소', '오', '조', '초', '코', '토', '포', '호',
  '구', '누', '두', '루', '무', '부', '수', '우', '주', '추', '쿠', '투', '푸', '후',
  '기', '니', '디', '리', '미', '비', '시', '이', '지', '치', '키', '티', '피', '히',
  '개', '새', '배', '대', '래', '매', '태', '패', '해', '재', '채',
  '산', '달', '별', '물', '불', '흙', '풀', '꽃', '새', '해', '눈', '비', '밤', '봄',
  '빵', '밥', '김', '면', '국', '죽', '떡', '옷', '신', '발', '손', '귀', '입', '코',
  '문', '창', '집', '길', '숲', '들', '꿈', '별', '빛', '솔', '돌', '말', '소', '양'
];

// Helper: Fisher-Yates In-Place Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  subject,
  difficulty = 'normal',
  activeProfile,
  customQuestions = [],
  onFinishGame,
  onExitGame
}) => {
  // Determine initial time and base settings by difficulty
  const initialTime = difficulty === 'easy' ? 75 : difficulty === 'hard' ? 45 : 60;
  // 힌트 지연 시간: 5초(5000ms) 동안 아이가 스스로 생각한 뒤 부드럽게 나타남
  const hintDelayMs = difficulty === 'easy' ? 5000 : difficulty === 'hard' ? 6500 : 5000;

  // Game State
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [stageLevel, setStageLevel] = useState<number>(1);
  const [isFever, setIsFever] = useState<boolean>(false);
  const [feverTimer, setFeverTimer] = useState<number>(0);

  // Manual theme override or dynamic theme
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);

  // Non-Repetition Smart Question Deck Manager
  const allMasterQuestionsRef = useRef<Question[]>([]);
  const questionDeckRef = useRef<Question[]>([]);
  const recentQuestionIdsRef = useRef<string[]>([]);

  // Function to initialize and shuffle master questions
  const refillAndShuffleDeck = useCallback((excludeId?: string) => {
    const allQuestions = allMasterQuestionsRef.current;
    if (allQuestions.length === 0) return;

    const shuffled: Question[] = shuffleArray<Question>(allQuestions);
    // Ensure the first question in new deck is not the same as the previous question
    if (excludeId && shuffled.length > 1 && shuffled[0]?.id === excludeId) {
      const swapIdx = Math.floor(Math.random() * (shuffled.length - 1)) + 1;
      const temp = shuffled[0];
      shuffled[0] = shuffled[swapIdx];
      shuffled[swapIdx] = temp;
    }
    questionDeckRef.current = shuffled;
  }, []);

  // Function to pop next distinct question from deck
  const getNextQuestionFromDeck = useCallback((): Question => {
    if (questionDeckRef.current.length === 0) {
      const lastId = recentQuestionIdsRef.current[recentQuestionIdsRef.current.length - 1];
      refillAndShuffleDeck(lastId);
    }

    const nextQ = questionDeckRef.current.pop() || allMasterQuestionsRef.current[0] || (subject === 'hangul' ? HANGUL_QUESTIONS[0] : MATH_QUESTIONS[0]);
    
    // Track recent IDs (keep last 25)
    recentQuestionIdsRef.current = [...recentQuestionIdsRef.current.slice(-24), nextQ.id];
    return nextQ;
  }, [subject, refillAndShuffleDeck]);

  // Current Question state
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => {
    const baseList = subject === 'hangul' ? HANGUL_QUESTIONS : MATH_QUESTIONS;
    const matchingCustom = customQuestions.filter((q) => q.subject === subject);
    const combined = [...matchingCustom, ...baseList];
    allMasterQuestionsRef.current = combined;
    const shuffled = shuffleArray(combined);
    questionDeckRef.current = shuffled.slice(1);
    const initialQ = shuffled[0] || baseList[0];
    recentQuestionIdsRef.current = [initialQ.id];
    return initialQ;
  });

  // Rebuild deck when subject or custom questions change
  useEffect(() => {
    const baseList = subject === 'hangul' ? HANGUL_QUESTIONS : MATH_QUESTIONS;
    const matchingCustom = customQuestions.filter((q) => q.subject === subject);
    const combined = [...matchingCustom, ...baseList];
    allMasterQuestionsRef.current = combined;
    const shuffled = shuffleArray(combined);
    const firstQ = shuffled[0] || baseList[0];
    questionDeckRef.current = shuffled.slice(1);
    recentQuestionIdsRef.current = [firstQ.id];
    setCurrentQuestion(firstQ);
  }, [subject, customQuestions]);

  // Floating score feedback particles
  const [floatingTexts, setFloatingTexts] = useState<
    { id: number; text: string; color: string; x: number; y: number }[]
  >([]);

  // 12 Holes array
  const [moles, setMoles] = useState<MoleSpot[]>(() =>
    Array.from({ length: TOTAL_HOLES }, (_, i) => ({
      holeIndex: i,
      zodiac: ZODIAC_LIST[i % ZODIAC_LIST.length].id,
      text: '',
      isCorrect: false,
      isPopped: false,
      poppedAt: 0,
      status: 'idle',
      accessoryLevel: 0
    }))
  );

  // Inactivity Hint Timer
  const [showHint, setShowHint] = useState<boolean>(false);
  const lastActionTimeRef = useRef<number>(Date.now());

  // Calculate Stage Level based on Score (1~6 levels)
  const calculateLevel = (currentScore: number) => {
    if (currentScore >= 200) return 6; // 8 animals, fast, starry night, crowns
    if (currentScore >= 150) return 5; // 7 animals, fast, sunset
    if (currentScore >= 100) return 4; // 6 animals, medium-fast, adventurer
    if (currentScore >= 60) return 3;  // 5 animals, medium, high noon
    if (currentScore >= 30) return 2;  // 4 animals, slow, hat
    return 1;                          // 4 animals, slow, morning
  };

  // Get active moles count based on level and difficulty
  const getActiveMolesCount = useCallback((lvl: number, fever: boolean) => {
    if (fever) return difficulty === 'easy' ? 6 : 7;
    if (difficulty === 'easy') {
      return lvl <= 2 ? 3 : lvl <= 4 ? 4 : 5;
    }
    if (difficulty === 'hard') {
      return lvl <= 2 ? 6 : lvl <= 4 ? 7 : 8;
    }
    // Normal mode default
    switch (lvl) {
      case 1: return 4;
      case 2: return 4;
      case 3: return 5;
      case 4: return 6;
      case 5: return 7;
      case 6: default: return 8;
    }
  }, [difficulty]);

  // Determine Current Forest Theme by level (or manual choice)
  const getCurrentTheme = (): ForestTheme => {
    if (selectedThemeId) {
      const match = FOREST_THEMES.find((t) => t.id === selectedThemeId);
      if (match) return match;
    }
    if (stageLevel <= 2) return FOREST_THEMES[0]; // morning
    if (stageLevel <= 4) return FOREST_THEMES[1]; // afternoon
    if (stageLevel === 5) return FOREST_THEMES[2]; // sunset
    return FOREST_THEMES[3]; // night
  };

  const currentTheme = getCurrentTheme();

  // Generate 100% STRICTLY UNIQUE distractor pool (NO duplicates among wrong holes, NO collision with correct answer)
  const generateStrictUniqueWrongAnswers = useCallback((q: Question, neededCount: number): string[] => {
    const correct = q.correctAnswer.trim();
    const uniquePool = new Set<string>();

    // 1. Add question's own defined wrong answers (filtering out duplicates & correct answer)
    if (q.wrongAnswers && q.wrongAnswers.length > 0) {
      for (const ans of q.wrongAnswers) {
        const cleaned = ans.trim();
        if (cleaned && cleaned !== correct) {
          uniquePool.add(cleaned);
          if (uniquePool.size >= neededCount) break;
        }
      }
    }

    // 2. If subject is math, generate nearby unique numbers
    const correctNum = parseInt(correct, 10);
    if (!isNaN(correctNum) && q.subject === 'math') {
      const mathCandidates = [
        correctNum + 1,
        correctNum - 1,
        correctNum + 2,
        correctNum - 2,
        correctNum + 3,
        correctNum - 3,
        correctNum + 4,
        correctNum - 4,
        correctNum + 5,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
      ];

      for (const num of mathCandidates) {
        if (num >= 0 && num !== correctNum) {
          uniquePool.add(num.toString());
          if (uniquePool.size >= neededCount + 10) break;
        }
      }
    } else {
      // 3. For hangul or words, draw from large extra hangul syllables
      const shuffledExtra = shuffleArray(EXTRA_HANGUL_CHARS);
      for (const char of shuffledExtra) {
        if (char !== correct) {
          uniquePool.add(char);
          if (uniquePool.size >= neededCount + 10) break;
        }
      }
    }

    // Convert Set to Array and shuffle to guarantee diverse order
    return shuffleArray(Array.from(uniquePool)).slice(0, neededCount);
  }, []);

  // Spawn new wave of moles for current question
  const spawnMoles = useCallback(() => {
    if (!currentQuestion) return;

    const count = getActiveMolesCount(stageLevel, isFever);
    const availableHoleIndexes = shuffleArray(Array.from({ length: TOTAL_HOLES }, (_, i) => i));
    const chosenHoles = availableHoleIndexes.slice(0, count);

    // Randomize 12 Zodiac assignments
    const shuffledZodiacs = shuffleArray(ZODIAC_LIST);

    // Pick target hole(s) for correct answer
    // In Fever mode: 2 target holes (if count >= 2)
    // In Normal mode: exactly 1 target hole
    const targetCount = isFever ? Math.min(2, chosenHoles.length) : 1;
    const targetHoles = chosenHoles.slice(0, targetCount);
    const nonTargetHoles = chosenHoles.slice(targetCount);

    // Prepare strictly unique wrong answers for all non-target holes
    const uniqueWrongAnswers = generateStrictUniqueWrongAnswers(currentQuestion, nonTargetHoles.length);
    let wrongAnswerIndex = 0;

    const newMoles: MoleSpot[] = Array.from({ length: TOTAL_HOLES }, (_, i) => {
      const isChosen = chosenHoles.includes(i);
      if (!isChosen) {
        return {
          holeIndex: i,
          zodiac: shuffledZodiacs[i].id,
          text: '',
          isCorrect: false,
          isPopped: false,
          poppedAt: 0,
          status: 'idle',
          accessoryLevel: stageLevel >= 6 ? 3 : stageLevel >= 4 ? 2 : stageLevel >= 2 ? 1 : 0
        };
      }

      const isTarget = targetHoles.includes(i);
      let answerText = '';

      if (isTarget) {
        answerText = currentQuestion.correctAnswer;
      } else {
        // Assign guaranteed UNIQUE wrong answer
        answerText = uniqueWrongAnswers[wrongAnswerIndex] || '1';
        wrongAnswerIndex++;
      }

      return {
        holeIndex: i,
        zodiac: shuffledZodiacs[i].id,
        text: answerText,
        isCorrect: isTarget,
        isPopped: true,
        poppedAt: Date.now(),
        status: 'up',
        accessoryLevel: stageLevel >= 6 ? 3 : stageLevel >= 4 ? 2 : stageLevel >= 2 ? 1 : 0
      };
    });

    setMoles(newMoles);
    setShowHint(false);
    lastActionTimeRef.current = Date.now();
    soundEngine.playPop();
  }, [currentQuestion, stageLevel, isFever, getActiveMolesCount, generateStrictUniqueWrongAnswers]);

  // Refs to track latest stats safely for game completion without calling parent setState inside local state reducer
  const hasFinishedRef = useRef<boolean>(false);
  const scoreRef = useRef<number>(score);
  const maxComboRef = useRef<number>(maxCombo);
  const correctCountRef = useRef<number>(correctCount);
  const stageLevelRef = useRef<number>(stageLevel);

  useEffect(() => {
    scoreRef.current = score;
    maxComboRef.current = maxCombo;
    correctCountRef.current = correctCount;
    stageLevelRef.current = stageLevel;
  }, [score, maxCombo, correctCount, stageLevel]);

  // Initial spawn when question or stage changes
  useEffect(() => {
    spawnMoles();
  }, [currentQuestion, stageLevel, spawnMoles]);

  // Game Countdown Timer & Clean Finish Handler
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!hasFinishedRef.current) {
        hasFinishedRef.current = true;
        onFinishGame(
          scoreRef.current,
          maxComboRef.current,
          correctCountRef.current,
          stageLevelRef.current
        );
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onFinishGame]);

  // Inactivity hint check (adapted by difficulty)
  useEffect(() => {
    const hintInterval = setInterval(() => {
      if (!showHint && Date.now() - lastActionTimeRef.current >= hintDelayMs) {
        setShowHint(true);
      }
    }, 400);

    return () => clearInterval(hintInterval);
  }, [showHint, hintDelayMs]);

  // Fever Timer Countdown
  useEffect(() => {
    if (!isFever) return;
    const feverInterval = setInterval(() => {
      setFeverTimer((prev) => {
        if (prev <= 1) {
          setIsFever(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(feverInterval);
  }, [isFever]);

  // Add floating text
  const addFloatingText = (text: string, color: string, clientX?: number, clientY?: number) => {
    const id = Date.now() + Math.random();
    const x = clientX || window.innerWidth / 2;
    const y = clientY || window.innerHeight / 2;

    setFloatingTexts((prev) => [...prev, { id, text, color, x, y }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 900);
  };

  // Trigger Fever Mode (3 consecutive hits)
  const triggerFeverMode = () => {
    setIsFever(true);
    setFeverTimer(5);
    soundEngine.playFever();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Whack mole handler
  const handleWhack = (holeIndex: number) => {
    lastActionTimeRef.current = Date.now();
    const targetMole = moles[holeIndex];
    if (!targetMole || !targetMole.isPopped || targetMole.status !== 'up') return;

    if (targetMole.isCorrect) {
      // Correct Whack
      soundEngine.playHit();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }

      // Difficulty Differentiated Scoring Engine
      // Easy (새싹): Base 10 pts, combo +2 pts, Fever x2
      // Normal (신남): Base 15 pts, combo +3 pts, stage bonus +2 pts/lvl, Fever x2
      // Hard (용감): Base 25 pts, combo +5 pts, stage bonus +5 pts/lvl, Fever x3
      const basePoints = difficulty === 'easy' ? 10 : difficulty === 'hard' ? 25 : 15;
      const comboRate = difficulty === 'easy' ? 2 : difficulty === 'hard' ? 5 : 3;
      const comboBonus = newCombo > 1 ? (newCombo - 1) * comboRate : 0;
      const stageBonus = difficulty === 'easy' ? 0 : difficulty === 'hard' ? stageLevel * 5 : stageLevel * 2;
      const feverMultiplier = isFever ? (difficulty === 'hard' ? 3 : 2) : 1;
      const earned = (basePoints + comboBonus + stageBonus) * feverMultiplier;

      const nextScore = score + earned;
      setScore(nextScore);
      setCorrectCount((prev) => prev + 1);

      // Check level up
      const nextLevel = calculateLevel(nextScore);
      if (nextLevel > stageLevel) {
        setStageLevel(nextLevel);
        soundEngine.playLevelUp();
        addFloatingText(`STAGE ${nextLevel}! 🌟`, '#F59E0B');
      }

      // Show floating text with difficulty tag
      const diffTag = difficulty === 'hard' ? '⚡2.5x' : difficulty === 'normal' ? '🌿1.5x' : '';
      addFloatingText(`+${earned}점! ${newCombo > 1 ? `${newCombo}콤보!` : '정답!'} ${diffTag}`, '#10B981');

      // Check Fever threshold
      if (newCombo % 3 === 0 && !isFever) {
        triggerFeverMode();
      }

      // Update mole status to joyful hit
      setMoles((prev) =>
        prev.map((m) =>
          m.holeIndex === holeIndex ? { ...m, status: 'hit' } : m
        )
      );

      // Confetti burst
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.7 }
      });

      // Advance to next distinct question after short delay
      setTimeout(() => {
        const nextQ = getNextQuestionFromDeck();
        setCurrentQuestion(nextQ);
      }, 350);
    } else {
      // Wrong Whack
      soundEngine.playMiss();
      setCombo(0);
      addFloatingText('앗! 다시 찾아보자 💡', '#EF4444');

      setMoles((prev) =>
        prev.map((m) =>
          m.holeIndex === holeIndex ? { ...m, status: 'miss' } : m
        )
      );

      setTimeout(() => {
        setMoles((prev) =>
          prev.map((m) =>
            m.holeIndex === holeIndex ? { ...m, status: 'up' } : m
          )
        );
      }, 500);
    }
  };

  const diffLabel = difficulty === 'easy' ? '새싹' : difficulty === 'hard' ? '용감' : '신남';

  return (
    <div
      id="game-screen-container"
      className="relative h-full flex-1 flex flex-col justify-between p-1.5 sm:p-4 select-none overflow-hidden"
    >
      {/* Whimsical Fairytale Cartoon Forest Scenery Background */}
      <CartoonForestLandscape themeId={currentTheme.id} isFever={isFever} />

      {/* Floating Action Text Feedback */}
      {floatingTexts.map((item) => (
        <div
          key={item.id}
          className="fixed z-50 pointer-events-none font-black text-xl sm:text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-bounce"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            color: item.color,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {item.text}
        </div>
      ))}

      {/* Top Header Bar with Frosted Glass styling */}
      <div className="relative z-30 w-full max-w-3xl mx-auto flex items-center justify-between gap-1.5 px-2.5 sm:px-4 py-1 sm:py-2 bg-black/40 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/25 shadow-lg text-white shrink-0">
        {/* Back button & Subject Title */}
        <div className="flex items-center gap-1.5">
          <button
            id="game-exit-button"
            onClick={() => {
              soundEngine.playClick();
              onExitGame();
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-stone-800 flex items-center justify-center font-black active:scale-90 transition-transform shadow cursor-pointer shrink-0"
            title="게임 나가기"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
          </button>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-xs sm:text-base drop-shadow-md block leading-tight">
                {subject === 'hangul' ? '가나다 숲' : '수리수리동굴'}
              </span>
              <span className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-full border ${
                difficulty === 'hard' ? 'bg-rose-500 text-white border-rose-300' : difficulty === 'normal' ? 'bg-amber-400 text-amber-950 border-amber-200' : 'bg-emerald-500 text-white border-emerald-300'
              }`}>
                {difficulty === 'hard' ? '⚡2.5x' : difficulty === 'normal' ? '🌿1.5x' : '🌱1.0x'}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-amber-200 font-bold hidden sm:inline-block">
              {activeProfile.customName} ({diffLabel} • {currentTheme.timeTag})
            </span>
          </div>
        </div>

        {/* Center: Score & Timer Pills */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Star Score Pill */}
          <div className="bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-black text-xs sm:text-base flex items-center gap-1 shadow-md border border-yellow-200 whitespace-nowrap">
            <span className="text-xs sm:text-base">⭐</span>
            <span>{score.toString().padStart(2, '0')}점</span>
          </div>

          {/* Timer Pill */}
          <div
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-black text-xs sm:text-base flex items-center gap-1 shadow-md border whitespace-nowrap ${
              timeLeft <= 10
                ? 'bg-rose-600 text-white animate-pulse border-rose-300'
                : 'bg-stone-900/85 text-white border-white/20'
            }`}
          >
            <span>⏱️</span>
            <span>{timeLeft}s</span>
          </div>
        </div>

        {/* Right: Theme Switcher & Combo / Fever Badge */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Scenery Theme Switcher Dropdown Button */}
          <div className="relative">
            <button
              id="btn-scenery-theme"
              onClick={() => {
                soundEngine.playClick();
                setShowThemePicker(!showThemePicker);
              }}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all text-xs font-bold flex items-center gap-1 border border-white/30 cursor-pointer shadow-xs whitespace-nowrap"
              title="숲길 풍경 테마 바꾸기"
            >
              <span>{currentTheme.icon}</span>
              <span className="hidden md:inline text-[11px]">{currentTheme.nameKo}</span>
            </button>

            {/* Theme Picker Dropdown */}
            {showThemePicker && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#FFFBF2] rounded-xl p-2 shadow-2xl border-2 border-amber-300 z-50 text-stone-900 select-none animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[11px] font-black text-amber-900 px-2 py-1 flex items-center justify-between border-b border-amber-200 mb-1">
                  <span>🌲 숲길 풍경</span>
                  <Palette className="w-3.5 h-3.5 text-amber-700" />
                </div>
                {FOREST_THEMES.map((theme) => {
                  const isCur = currentTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        soundEngine.playPop();
                        setSelectedThemeId(theme.id);
                        setShowThemePicker(false);
                      }}
                      className={`w-full flex items-center justify-between p-1.5 rounded-lg text-left text-xs font-bold transition-all cursor-pointer ${
                        isCur
                          ? 'bg-amber-300 text-amber-950 font-black shadow-xs'
                          : 'hover:bg-amber-100/70 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{theme.icon}</span>
                        <span>{theme.nameKo}</span>
                      </div>
                      {isCur && <Check className="w-3 h-3 text-amber-950 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Combo / Fever Badge */}
          <div
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-black text-[11px] sm:text-sm flex items-center gap-0.5 sm:gap-1 shadow whitespace-nowrap ${
              isFever
                ? 'bg-gradient-to-r from-pink-500 to-yellow-400 text-white animate-bounce ring-1 sm:ring-2 ring-yellow-300'
                : combo > 1
                ? 'bg-amber-600 text-white'
                : 'bg-stone-800/80 text-stone-200'
            }`}
          >
            {isFever ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-yellow-200 shrink-0" />
                <span>FEVER {feverTimer}s</span>
              </>
            ) : (
              <>
                <Flame className={`w-3.5 h-3.5 shrink-0 ${combo > 0 ? 'text-yellow-400' : 'text-stone-400'}`} />
                <span>x{combo}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Target Question Story Banner (Matching reference image design) */}
      <div className="relative z-20 w-full max-w-2xl mx-auto my-1 px-2 flex flex-col items-center shrink-0">
        <div
          className="relative w-full bg-[#FFFBF0]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-5 sm:py-3 shadow-xl border-3 sm:border-4 border-[#D97706] flex items-center justify-between gap-2 select-none"
          style={{
            boxShadow: '0 8px 20px rgba(30, 15, 5, 0.35), inset 0 2px 4px rgba(255,255,255,0.9)'
          }}
        >
          {/* Question Text & Visual Hint */}
          <div
            className="flex-1 flex items-center gap-2 cursor-pointer min-w-0"
            onClick={() => soundEngine.speak(currentQuestion.voicePrompt)}
          >
            {/* Clue Icon or Photo Thumbnail */}
            {Boolean(currentQuestion?.customPhotoUrl && currentQuestion.customPhotoUrl.trim()) ? (
              <img
                src={currentQuestion.customPhotoUrl}
                alt="Quiz Clue"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-amber-400 shadow-xs shrink-0"
              />
            ) : currentQuestion.imageIcon ? (
              <span className="text-2xl sm:text-3xl filter drop-shadow shrink-0">
                {currentQuestion.imageIcon}
              </span>
            ) : null}

            {/* Prompt text e.g. "어떤 농산물이나 물건을 많이 생산하는 지역" or "가 ( )" */}
            <div className="flex flex-col min-w-0">
              <span className="text-xl sm:text-3xl md:text-4xl font-black text-[#451A03] tracking-tight truncate">
                {currentQuestion.promptText}
              </span>
              {currentQuestion.visualClue && (
                <span className="text-xs sm:text-sm font-bold text-amber-800 truncate">
                  💡 {currentQuestion.visualClue}
                </span>
              )}
            </div>
          </div>

          {/* Orange [ 🔊 읽기 ] Voice speaker button matching reference image */}
          <button
            onClick={() => soundEngine.speak(currentQuestion.voicePrompt)}
            className="shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white rounded-xl sm:rounded-2xl shadow-md border-2 border-amber-300 flex items-center gap-1.5 font-black text-xs sm:text-sm cursor-pointer transition-transform"
            title="문제 다시 듣기"
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>읽기</span>
          </button>
        </div>
      </div>

      {/* 12 Holes Whac-A-Mole Meadow Grass Grid (4 columns x 3 rows = 12 holes) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center px-1 sm:px-4 my-1">
        <div className="w-full relative">
          {/* 4 Columns x 3 Rows naturally distributed across the meadow hill (Exact match to reference photo) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4">
            {moles.map((mole) => (
              <ZodiacMole
                key={mole.holeIndex}
                holeIndex={mole.holeIndex}
                zodiacId={mole.zodiac}
                text={mole.text}
                isPopped={mole.isPopped}
                status={mole.status}
                accessoryLevel={mole.accessoryLevel}
                isHinted={showHint && mole.isCorrect && mole.isPopped}
                onWhack={handleWhack}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Forest Path Stepping Stones Strip */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2.5 py-0.5 shrink-0">
        {(subject === 'hangul' ? ['ㄱ', 'ㄴ', 'ㄷ', 'ㅏ', 'ㅑ', '★'] : ['1', '2', '3', '+', '5', '★']).map(
          (char, idx) => (
            <div
              key={idx}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#FFF9E6]/90 backdrop-blur-xs border border-[#C99863] shadow-xs flex items-center justify-center font-black text-[#5C3610] text-[10px] sm:text-xs transform hover:scale-110 transition-transform select-none"
            >
              {char}
            </div>
          )
        )}
      </div>
    </div>
  );
};
