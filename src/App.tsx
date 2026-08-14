import { useState, useEffect } from 'react';
import { GameScreenType, SubjectMode, TwinProfile, ZodiacId, Sticker, Question, DifficultyLevel } from './types';
import { STICKERS_DATA } from './data/stickersData';
import { Header } from './components/Header';
import { ProfileSelectScreen } from './components/ProfileSelectScreen';
import { ZodiacSelectScreen } from './components/ZodiacSelectScreen';
import { SubjectSelectScreen } from './components/SubjectSelectScreen';
import { DifficultySelectScreen } from './components/DifficultySelectScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { StickerBookModal } from './components/StickerBookModal';
import { TwinCustomizerModal } from './components/TwinCustomizerModal';
import { PhotoQuizModal } from './components/PhotoQuizModal';
import { soundEngine } from './utils/soundEngine';

const STORAGE_KEY_TWIN1 = 'zodiac_twin_quest_twin1_v2';
const STORAGE_KEY_TWIN2 = 'zodiac_twin_quest_twin2_v2';
const STORAGE_KEY_CUSTOM_Q = 'zodiac_twin_quest_custom_q_v2';

const INITIAL_TWIN1: TwinProfile = {
  id: 'twin1',
  defaultLabel: '1호기',
  customName: '규민',
  avatarZodiac: 'rabbit',
  levelTitle: '숲속 탐험대장',
  levelNumber: 5,
  hangulHighScore: 120,
  mathHighScore: 90,
  totalGamesPlayed: 3,
  stickersEarned: ['stk_zodiac_rabbit', 'stk_hangul_master'],
  themeColor: '#F59E0B'
};

const INITIAL_TWIN2: TwinProfile = {
  id: 'twin2',
  defaultLabel: '2호기',
  customName: '유민',
  avatarZodiac: 'dragon',
  levelTitle: '별빛 탐험대장',
  levelNumber: 6,
  hangulHighScore: 140,
  mathHighScore: 110,
  totalGamesPlayed: 4,
  stickersEarned: ['stk_zodiac_dragon', 'stk_math_wizard', 'stk_fever_star'],
  themeColor: '#3B82F6'
};

const SAMPLE_PHOTO_QUESTIONS: Question[] = [
  {
    id: 'sample_mom',
    subject: 'hangul',
    promptText: '엄 ( )',
    fullWordOrSolution: '엄마',
    correctAnswer: '마',
    wrongAnswers: ['바', '사', '가', '다'],
    hintCategory: '우리 가족',
    imageIcon: '👩‍👧',
    voicePrompt: '사랑하는 우리 엄마! 알맞은 글자를 찾아보세요!'
  },
  {
    id: 'sample_dad',
    subject: 'hangul',
    promptText: '아 ( )',
    fullWordOrSolution: '아빠',
    correctAnswer: '빠',
    wrongAnswers: ['싸', '까', '따', '짜'],
    hintCategory: '우리 가족',
    imageIcon: '👨‍👧',
    voicePrompt: '멋쟁이 우리 아빠! 알맞은 글자는?'
  },
  {
    id: 'sample_dog',
    subject: 'hangul',
    promptText: '강 ( ) 지',
    fullWordOrSolution: '강아지',
    correctAnswer: '아',
    wrongAnswers: ['어', '오', '우', '으'],
    hintCategory: '귀여운 동물',
    imageIcon: '🐶',
    voicePrompt: '멍멍 귀여운 강아지!'
  }
];

export default function App() {
  // Profiles State with safe default merging & upgrade
  const [twin1, setTwin1] = useState<TwinProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TWIN1);
      if (saved) {
        const parsed = JSON.parse(saved);
        const name = parsed.customName || parsed.name || '';
        const isOldDefault = !name || name.includes('Twin 1') || name === '1호기';
        return {
          ...INITIAL_TWIN1,
          ...parsed,
          customName: isOldDefault ? '규민' : name,
          stickersEarned: Array.isArray(parsed.stickersEarned) ? parsed.stickersEarned : INITIAL_TWIN1.stickersEarned
        };
      }
      return INITIAL_TWIN1;
    } catch {
      return INITIAL_TWIN1;
    }
  });

  const [twin2, setTwin2] = useState<TwinProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TWIN2);
      if (saved) {
        const parsed = JSON.parse(saved);
        const name = parsed.customName || parsed.name || '';
        const isOldDefault = !name || name.includes('Twin 2') || name === '2호기';
        return {
          ...INITIAL_TWIN2,
          ...parsed,
          customName: isOldDefault ? '유민' : name,
          stickersEarned: Array.isArray(parsed.stickersEarned) ? parsed.stickersEarned : INITIAL_TWIN2.stickersEarned
        };
      }
      return INITIAL_TWIN2;
    } catch {
      return INITIAL_TWIN2;
    }
  });

  // Custom Photo Quizzes State
  const [customQuestions, setCustomQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_Q);
      return saved ? JSON.parse(saved) : SAMPLE_PHOTO_QUESTIONS;
    } catch {
      return SAMPLE_PHOTO_QUESTIONS;
    }
  });

  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<GameScreenType>('profile');
  const [activeTwinId, setActiveTwinId] = useState<string>('twin1');
  const [selectedSubject, setSelectedSubject] = useState<SubjectMode>('hangul');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('normal');

  // Game Session Result State
  const [lastGameScore, setLastGameScore] = useState<number>(0);
  const [lastMaxCombo, setLastMaxCombo] = useState<number>(0);
  const [lastCorrectCount, setLastCorrectCount] = useState<number>(0);
  const [lastStageReached, setLastStageReached] = useState<number>(1);
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);
  const [previousHighScore, setPreviousHighScore] = useState<number>(0);
  const [newStickerUnlocked, setNewStickerUnlocked] = useState<Sticker | null>(null);

  // Modals
  const [isStickerBookOpen, setIsStickerBookOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isPhotoQuizOpen, setIsPhotoQuizOpen] = useState<boolean>(false);

  // Audio State
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [bgmMuted, setBgmMuted] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TWIN1, JSON.stringify(twin1));
    } catch {
      // ignore
    }
  }, [twin1]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TWIN2, JSON.stringify(twin2));
    } catch {
      // ignore
    }
  }, [twin2]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_Q, JSON.stringify(customQuestions));
    } catch {
      // ignore
    }
  }, [customQuestions]);

  const activeProfile = (activeTwinId === 'twin1' ? twin1 : twin2) || INITIAL_TWIN1;

  // Toggle Sound & BGM
  const handleToggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    soundEngine.setSoundMuted(next);
  };

  const handleToggleBgm = () => {
    const next = !bgmMuted;
    setBgmMuted(next);
    soundEngine.setBgmMuted(next);
    if (!next) {
      soundEngine.startBgm();
    } else {
      soundEngine.stopBgm();
    }
  };

  // Start background music on user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!bgmMuted) {
        soundEngine.startBgm();
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
    window.addEventListener('pointerdown', handleFirstInteraction);
    return () => window.removeEventListener('pointerdown', handleFirstInteraction);
  }, [bgmMuted]);

  // Profile Selection (Screen 1)
  const handleSelectTwin = (twinId: string) => {
    setActiveTwinId(twinId);
    setCurrentScreen('zodiac');
  };

  // Zodiac Selection (Screen 2)
  const handleConfirmZodiac = (zodiacId: ZodiacId) => {
    if (activeTwinId === 'twin1') {
      setTwin1((prev) => ({ ...prev, avatarZodiac: zodiacId }));
    } else {
      setTwin2((prev) => ({ ...prev, avatarZodiac: zodiacId }));
    }
    setCurrentScreen('subject');
  };

  // Subject Selection (Screen 3) -> Move to Difficulty Screen
  const handleSelectSubject = (subject: SubjectMode) => {
    setSelectedSubject(subject);
    setCurrentScreen('difficulty');
  };

  // Difficulty Selection (Screen 3.5) -> Move to Game Screen
  const handleSelectDifficulty = (difficulty: DifficultyLevel) => {
    setSelectedDifficulty(difficulty);
    setCurrentScreen('game');
  };

  // Finish Game (Screen 4 -> Screen 5)
  const handleFinishGame = (
    finalScore: number,
    maxCombo: number,
    correctCount: number,
    stageReached: number
  ) => {
    setLastGameScore(finalScore);
    setLastMaxCombo(maxCombo);
    setLastCorrectCount(correctCount);
    setLastStageReached(stageReached);

    const isHangul = selectedSubject === 'hangul';
    const curHighScore = isHangul ? activeProfile.hangulHighScore : activeProfile.mathHighScore;
    setPreviousHighScore(curHighScore);
    const isNewBest = finalScore > curHighScore;
    setIsNewHighScore(isNewBest);

    const nextLevelNum = Math.min(10, activeProfile.levelNumber + (finalScore >= 100 ? 1 : 0));
    const nextLevelTitle =
      nextLevelNum >= 8 ? '숲속 마스터 히어로' : nextLevelNum >= 6 ? '빛나는 모험대장' : '씩씩한 탐험대원';

    const newStickers: string[] = [];
    let justUnlocked: Sticker | null = null;

    const checkAndAwardSticker = (stickerId: string) => {
      if (!activeProfile.stickersEarned.includes(stickerId)) {
        newStickers.push(stickerId);
        const match = STICKERS_DATA.find((s) => s.id === stickerId);
        if (match && !justUnlocked) {
          justUnlocked = match;
        }
      }
    };

    if (activeProfile.avatarZodiac === 'rat') checkAndAwardSticker('stk_zodiac_rat');
    if (activeProfile.avatarZodiac === 'tiger') checkAndAwardSticker('stk_zodiac_tiger');
    if (activeProfile.avatarZodiac === 'dragon') checkAndAwardSticker('stk_zodiac_dragon');
    if (activeProfile.avatarZodiac === 'rabbit') checkAndAwardSticker('stk_zodiac_rabbit');

    if (selectedSubject === 'hangul' && finalScore >= 50) checkAndAwardSticker('stk_hangul_master');
    if (selectedSubject === 'hangul' && finalScore >= 100) checkAndAwardSticker('stk_hangul_king');
    if (selectedSubject === 'math' && finalScore >= 50) checkAndAwardSticker('stk_math_wizard');
    if (selectedSubject === 'math' && finalScore >= 100) checkAndAwardSticker('stk_math_gem');
    if (maxCombo >= 3) checkAndAwardSticker('stk_fever_star');
    if (maxCombo >= 5) checkAndAwardSticker('stk_combo_champion');
    if (stageReached >= 6) checkAndAwardSticker('stk_stage6_night');

    setNewStickerUnlocked(justUnlocked);

    const updateProfileData = (prev: TwinProfile): TwinProfile => {
      return {
        ...prev,
        levelNumber: nextLevelNum,
        levelTitle: nextLevelTitle,
        hangulHighScore: isHangul ? Math.max(prev.hangulHighScore, finalScore) : prev.hangulHighScore,
        mathHighScore: !isHangul ? Math.max(prev.mathHighScore, finalScore) : prev.mathHighScore,
        totalGamesPlayed: prev.totalGamesPlayed + 1,
        stickersEarned: Array.from(new Set([...prev.stickersEarned, ...newStickers]))
      };
    };

    if (activeTwinId === 'twin1') {
      setTwin1(updateProfileData);
    } else {
      setTwin2(updateProfileData);
    }

    setCurrentScreen('result');
  };

  // Replay Game
  const handleReplay = () => {
    setCurrentScreen('game');
  };

  // Reset scores only (keeps names and photos)
  const handleResetScoresOnly = () => {
    const resetScoreProfile = (prev: TwinProfile): TwinProfile => ({
      ...prev,
      hangulHighScore: 0,
      mathHighScore: 0,
      totalGamesPlayed: 0,
      levelNumber: 1,
      levelTitle: '숲속 탐험대장'
    });
    setTwin1(resetScoreProfile);
    setTwin2(resetScoreProfile);
  };

  // Reset all records completely
  const handleResetData = () => {
    setTwin1(INITIAL_TWIN1);
    setTwin2(INITIAL_TWIN2);
    setCustomQuestions(SAMPLE_PHOTO_QUESTIONS);
    localStorage.removeItem(STORAGE_KEY_TWIN1);
    localStorage.removeItem(STORAGE_KEY_TWIN2);
    localStorage.removeItem(STORAGE_KEY_CUSTOM_Q);
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#7FB77E] via-[#B1D7B4] to-[#EBF3E8] text-stone-900 font-sans flex flex-col justify-between selection:bg-amber-300 selection:text-amber-950">
      {/* Universal Kid-Friendly Header */}
      <Header
        currentScreen={currentScreen}
        activeProfile={activeProfile}
        soundMuted={soundMuted}
        bgmMuted={bgmMuted}
        onToggleSound={handleToggleSound}
        onToggleBgm={handleToggleBgm}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenStickerBook={() => setIsStickerBookOpen(true)}
        onOpenPhotoQuiz={() => setIsPhotoQuizOpen(true)}
      />

      {/* Screen Views */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {currentScreen === 'profile' && (
          <ProfileSelectScreen
            twin1={twin1}
            twin2={twin2}
            onSelectTwin={handleSelectTwin}
            onEditProfile={(id) => {
              setActiveTwinId(id);
              setIsSettingsOpen(true);
            }}
            onOpenPhotoQuiz={() => setIsPhotoQuizOpen(true)}
          />
        )}

        {currentScreen === 'zodiac' && (
          <ZodiacSelectScreen
            activeProfile={activeProfile}
            onConfirmZodiac={handleConfirmZodiac}
          />
        )}

        {currentScreen === 'subject' && (
          <SubjectSelectScreen
            activeProfile={activeProfile}
            onSelectSubject={handleSelectSubject}
          />
        )}

        {currentScreen === 'difficulty' && (
          <DifficultySelectScreen
            subject={selectedSubject}
            activeProfile={activeProfile}
            onSelectDifficulty={handleSelectDifficulty}
            onBackToSubject={() => setCurrentScreen('subject')}
          />
        )}

        {currentScreen === 'game' && (
          <GameScreen
            key={`${selectedSubject}-${selectedDifficulty}-${Date.now()}`}
            subject={selectedSubject}
            difficulty={selectedDifficulty}
            activeProfile={activeProfile}
            customQuestions={customQuestions}
            onFinishGame={handleFinishGame}
            onExitGame={() => setCurrentScreen('difficulty')}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            subject={selectedSubject}
            difficulty={selectedDifficulty}
            activeProfile={activeProfile}
            twin1={twin1}
            twin2={twin2}
            score={lastGameScore}
            maxCombo={lastMaxCombo}
            correctCount={lastCorrectCount}
            stageReached={lastStageReached}
            isNewHighScore={isNewHighScore}
            previousHighScore={previousHighScore}
            newStickerUnlocked={newStickerUnlocked}
            onReplay={handleReplay}
            onChangeDifficulty={() => setCurrentScreen('difficulty')}
            onChangeSubject={() => setCurrentScreen('subject')}
            onOpenStickerBook={() => setIsStickerBookOpen(true)}
            onGoHome={() => setCurrentScreen('profile')}
          />
        )}
      </main>

      {/* Sticker Album Modal */}
      <StickerBookModal
        isOpen={isStickerBookOpen}
        onClose={() => setIsStickerBookOpen(false)}
        twin1={twin1}
        twin2={twin2}
        activeTwinId={activeTwinId}
      />

      {/* Twin Profile Customizer & Score Reset Modal */}
      <TwinCustomizerModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        twin1={twin1}
        twin2={twin2}
        onSaveProfiles={(u1, u2) => {
          setTwin1(u1);
          setTwin2(u2);
        }}
        onResetScoresOnly={handleResetScoresOnly}
        onResetData={handleResetData}
      />

      {/* Photo Quiz Creator Modal */}
      <PhotoQuizModal
        isOpen={isPhotoQuizOpen}
        onClose={() => setIsPhotoQuizOpen(false)}
        customQuestions={customQuestions}
        onSaveCustomQuestions={(updatedList) => setCustomQuestions(updatedList)}
      />
    </div>
  );
}
