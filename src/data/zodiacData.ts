import { ZodiacId, ZodiacInfo } from '../types';

export const ZODIAC_LIST: ZodiacInfo[] = [
  {
    id: 'rat',
    nameKo: '쥐',
    nameEn: 'Rat',
    hanja: '子 (자)',
    emoji: '🐭',
    color: '#F59E0B',
    tagline: '꾀돌이 쥐돌이',
    description: '반짝이는 눈과 빠른 발걸음!'
  },
  {
    id: 'ox',
    nameKo: '소',
    nameEn: 'Ox',
    hanja: '丑 (축)',
    emoji: '🐮',
    color: '#D97706',
    tagline: '힘센 음메소',
    description: '듬직하고 씩씩한 친구!'
  },
  {
    id: 'tiger',
    nameKo: '호랑이',
    nameEn: 'Tiger',
    hanja: '寅 (인)',
    emoji: '🐯',
    color: '#EA580C',
    tagline: '용감한 호치',
    description: '어흥! 숲속의 용감한 대장!'
  },
  {
    id: 'rabbit',
    nameKo: '토끼',
    nameEn: 'Rabbit',
    hanja: '卯 (묘)',
    emoji: '🐰',
    color: '#EC4899',
    tagline: '깡충이 토리',
    description: '쫑긋한 귀로 정답을 잘 들어요!'
  },
  {
    id: 'dragon',
    nameKo: '용',
    nameEn: 'Dragon',
    hanja: '辰 (진)',
    emoji: '🐲',
    color: '#06B6D4',
    tagline: '하늘 날개 용용이',
    description: '구름 위를 날아다니는 신비한 친구!'
  },
  {
    id: 'snake',
    nameKo: '뱀',
    nameEn: 'Snake',
    hanja: '巳 (사)',
    emoji: '🐍',
    color: '#10B981',
    tagline: '요술 방울이',
    description: '살랑살랑 부드럽고 똑똑해요!'
  },
  {
    id: 'horse',
    nameKo: '말',
    nameEn: 'Horse',
    hanja: '午 (오)',
    emoji: '🐴',
    color: '#8B5CF6',
    tagline: '달려라 씽씽마',
    description: '바람처럼 신나게 달리는 탐험가!'
  },
  {
    id: 'goat',
    nameKo: '양',
    nameEn: 'Goat',
    hanja: '未 (미)',
    emoji: '🐑',
    color: '#F472B6',
    tagline: '몽실몽실 몽실양',
    description: '따뜻하고 부드러운 순둥이!'
  },
  {
    id: 'monkey',
    nameKo: '원숭이',
    nameEn: 'Monkey',
    hanja: '申 (신)',
    emoji: '🐵',
    color: '#FB923C',
    tagline: '재주꾼 몽키',
    description: '나무를 척척 타는 장난꾸러기!'
  },
  {
    id: 'rooster',
    nameKo: '닭',
    nameEn: 'Rooster',
    hanja: '酉 (유)',
    emoji: '🐔',
    color: '#EF4444',
    tagline: '꼬꼬댁 꼬꼬',
    description: '아침을 깨우는 우렁찬 목소리!'
  },
  {
    id: 'dog',
    nameKo: '개',
    nameEn: 'Dog',
    hanja: '戌 (술)',
    emoji: '🐶',
    color: '#3B82F6',
    tagline: '충성 댕댕이',
    description: '언제나 곁을 지키는 든든한 단짝!'
  },
  {
    id: 'pig',
    nameKo: '돼지',
    nameEn: 'Pig',
    hanja: '亥 (해)',
    emoji: '🐷',
    color: '#F43F5E',
    tagline: '복덩이 꿀꿀이',
    description: '동글동글 언제나 행복한 복돼지!'
  }
];

export const ZODIAC_MAP: Record<ZodiacId, ZodiacInfo> = ZODIAC_LIST.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<ZodiacId, ZodiacInfo>
);
