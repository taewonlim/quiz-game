import { DifficultyInfo } from '../types';

export const DIFFICULTY_LIST: DifficultyInfo[] = [
  {
    id: 'easy',
    nameKo: '새싹 숲길 (쉬움)',
    nameEn: 'Sprout Trail (Easy)',
    subTitle: '천천히 꼭꼭 누르는 즐거운 첫걸음',
    description: '두더지 3~4마리가 천천히 출현해요. 넉넉한 시간과 빠른 반짝임 힌트가 주어져요!',
    icon: '🌱',
    badgeColor: 'bg-emerald-500 text-white border-emerald-300',
    timeLimit: 75,
    moleCountRange: '3~4마리 출현 (느림)',
    targetTag: '5~6세 처음 시작',
    pointsMultiplier: 'x1.0',
    pointsDescription: '기본 10점 + 콤보 보너스'
  },
  {
    id: 'normal',
    nameKo: '신나는 숲길 (보통)',
    nameEn: 'Happy Trail (Normal)',
    subTitle: '가장 신나게 즐기는 기본 모험 (추천)',
    description: '두더지 4~6마리가 적당한 속도로 나와요. 3연속 정답 시 피버 타임이 발동해요!',
    icon: '🌿',
    badgeColor: 'bg-amber-500 text-amber-950 border-amber-300',
    timeLimit: 60,
    moleCountRange: '4~6마리 출현 (보통)',
    targetTag: '6~7세 추천 모드',
    pointsMultiplier: 'x1.5',
    pointsDescription: '기본 15점 + 스테이지 & 콤보 UP'
  },
  {
    id: 'hard',
    nameKo: '용감한 숲길 (도전)',
    nameEn: 'Brave Trail (Hard)',
    subTitle: '번개처럼 빠른 쏙쏙 스피드 퀴즈',
    description: '두더지 6~8마리가 빠르게 출현해요! 최고 득점과 짜릿한 피버 3배에 도전해요!',
    icon: '⚡',
    badgeColor: 'bg-rose-600 text-white border-rose-300',
    timeLimit: 45,
    moleCountRange: '6~8마리 출현 (빠름)',
    targetTag: '스피드 고수 도전',
    pointsMultiplier: 'x2.5',
    pointsDescription: '기본 25점 + 피버 3배 대박 보너스!'
  }
];

export const DIFFICULTY_MAP: Record<string, DifficultyInfo> = DIFFICULTY_LIST.reduce(
  (acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  },
  {} as Record<string, DifficultyInfo>
);
