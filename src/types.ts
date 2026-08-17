export type SubjectMode = 'hangul' | 'math';

export type DifficultyLevel = 'easy' | 'normal' | 'hard';

export type GameScreenType = 'profile' | 'zodiac' | 'subject' | 'difficulty' | 'game' | 'result' | 'stickers';

export interface DifficultyInfo {
  id: DifficultyLevel;
  nameKo: string;
  nameEn: string;
  subTitle: string;
  description: string;
  icon: string;
  badgeColor: string;
  timeLimit: number;
  moleCountRange: string;
  targetTag: string;
  pointsMultiplier: string;
  pointsDescription: string;
}

export type ZodiacId =
  | 'rat'
  | 'ox'
  | 'tiger'
  | 'rabbit'
  | 'dragon'
  | 'snake'
  | 'horse'
  | 'goat'
  | 'monkey'
  | 'rooster'
  | 'dog'
  | 'pig';

export interface ZodiacInfo {
  id: ZodiacId;
  nameKo: string;
  nameEn: string;
  hanja: string;
  emoji: string;
  color: string;
  tagline: string;
  description: string;
}

export interface TwinProfile {
  id: string; // 'twin1' | 'twin2'
  defaultLabel: string; // '1호기' | '2호기'
  customName: string; // '1호기' or '민준'
  avatarZodiac: ZodiacId;
  customPhotoUrl?: string; // Optional real photo of the twin
  levelTitle: string;
  levelNumber: number;
  hangulHighScore: number;
  mathHighScore: number;
  totalGamesPlayed: number;
  stickersEarned: string[]; // sticker ids
  themeColor: string;
}

export interface Question {
  id: string;
  subject: SubjectMode;
  promptText: string; // e.g. "가( )" or "2 + 3 = ?"
  fullWordOrSolution: string; // e.g. "가방" or "5"
  correctAnswer: string; // e.g. "방" or "5"
  wrongAnswers: string[]; // e.g. ["나", "다", "라"]
  hintCategory: string; // e.g. "물건", "동물", "더하기", "가족"
  imageIcon: string; // emoji or high quality illustrative image
  customPhotoUrl?: string; // Optional user uploaded photo for custom question
  voicePrompt: string; // speech synthesis text
  visualClue?: string; // visual dots/emojis for math e.g. "🍎🍎 + 🍎"
}

export interface MoleSpot {
  holeIndex: number;
  zodiac: ZodiacId;
  text: string;
  isCorrect: boolean;
  isPopped: boolean;
  poppedAt: number;
  status: 'idle' | 'up' | 'hit' | 'miss' | 'down';
  accessoryLevel: number; // 0: none, 1: hat, 2: cape, 3: crown/party
}

export interface Sticker {
  id: string;
  nameKo: string;
  description: string;
  emoji: string;
  category: 'zodiac' | 'hangul' | 'math' | 'combo' | 'explorer';
  requirement: string;
}
