export interface ForestTheme {
  id: string;
  nameKo: string;
  nameEn: string;
  timeTag: string;
  icon: string;
  bgImageUrl: string;
  overlayGradient: string;
  boardBg: string;
  boardBorder: string;
  trailColor: string;
  description: string;
}

export const FOREST_THEMES: ForestTheme[] = [
  {
    id: 'morning',
    nameKo: '아침 햇살 숲길',
    nameEn: 'Sunny Morning Trail',
    timeTag: '아침 햇살 ☀️',
    icon: '☀️',
    bgImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'from-amber-900/20 via-emerald-800/15 to-lime-900/25',
    boardBg: 'bg-[#2D6A4F]/75 shadow-[0_20px_45px_rgba(20,50,30,0.45)]',
    boardBorder: 'border-[#74C69D]/70',
    trailColor: 'from-[#D4A373]/90 via-[#E9C46A]/85 to-[#F4A261]/90',
    description: '따스한 아침 햇살과 몽글몽글 구름이 춤추는 동화 속 초록빛 숲길'
  },
  {
    id: 'afternoon',
    nameKo: '황금빛 들판 숲길',
    nameEn: 'Golden Meadow Trail',
    timeTag: '황금빛 들판 🌾',
    icon: '🌾',
    bgImageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'from-amber-950/20 via-orange-900/15 to-yellow-950/25',
    boardBg: 'bg-[#588157]/75 shadow-[0_20px_45px_rgba(40,40,20,0.45)]',
    boardBorder: 'border-[#DDA15E]/70',
    trailColor: 'from-[#E76F51]/90 via-[#F4A261]/85 to-[#E9C46A]/90',
    description: '황금빛 햇살과 향긋한 풀내음이 번지는 평화로운 들판 언덕'
  },
  {
    id: 'sunset',
    nameKo: '노을빛 낭만 숲길',
    nameEn: 'Sunset Glow Trail',
    timeTag: '노을빛 숲길 🌅',
    icon: '🌅',
    bgImageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'from-rose-950/25 via-purple-950/15 to-amber-950/25',
    boardBg: 'bg-[#4A4E69]/75 shadow-[0_20px_45px_rgba(40,20,40,0.45)]',
    boardBorder: 'border-[#C9ADA7]/70',
    trailColor: 'from-[#DDA15E]/90 via-[#BC6C25]/85 to-[#DDA15E]/90',
    description: '분홍빛 노을과 부드러운 바람이 흩날리는 아늑한 저녁 숲'
  },
  {
    id: 'night',
    nameKo: '달빛 반딧불이 숲길',
    nameEn: 'Moonlit Firefly Trail',
    timeTag: '달빛 숲길 🌙',
    icon: '🌙',
    bgImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'from-slate-950/30 via-indigo-950/20 to-emerald-950/30',
    boardBg: 'bg-[#1D2D44]/80 shadow-[0_20px_45px_rgba(10,20,40,0.6)]',
    boardBorder: 'border-[#48CAE4]/60',
    trailColor: 'from-[#6B705C]/90 via-[#A5A58D]/85 to-[#B7B7A4]/90',
    description: '반짝이는 은하수와 반딧불이가 빛나는 신비로운 요정의 밤'
  }
];

