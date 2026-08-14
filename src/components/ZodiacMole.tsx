import React from 'react';
import { ZodiacId } from '../types';
import { ZODIAC_MAP } from '../data/zodiacData';

interface ZodiacMoleProps {
  holeIndex: number;
  zodiacId: ZodiacId;
  text: string;
  isPopped: boolean;
  status: 'idle' | 'up' | 'hit' | 'miss' | 'down';
  accessoryLevel: number;
  isHinted?: boolean;
  onWhack: (holeIndex: number) => void;
}

export const ZodiacMole: React.FC<ZodiacMoleProps> = ({
  holeIndex,
  zodiacId,
  text,
  isPopped,
  status,
  accessoryLevel,
  isHinted = false,
  onWhack
}) => {
  const zodiac = ZODIAC_MAP[zodiacId] || ZODIAC_MAP.rat;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (isPopped && status === 'up') {
      onWhack(holeIndex);
    }
  };

  // High quality, vibrant 12 Zodiac Vector Animals with 3D Gradients, Fur Highlights & Storybook Craftsmanship
  const renderZodiacAnimal = () => {
    switch (zodiacId) {
      case 'rat': // 1. 쥐 (Rat / Mouse)
        return (
          <g>
            {/* Big Expressive Round Ears with Gradient & Fluffy Inner Depth */}
            <circle cx="24" cy="18" r="14" fill="url(#ratEarOuter)" stroke="#B45309" strokeWidth="1.8" />
            <circle cx="24" cy="18" r="9" fill="url(#pinkBlushGrad)" />
            <path d="M 20 22 Q 25 14 28 20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />

            <circle cx="76" cy="18" r="14" fill="url(#ratEarOuter)" stroke="#B45309" strokeWidth="1.8" />
            <circle cx="76" cy="18" r="9" fill="url(#pinkBlushGrad)" />
            <path d="M 72 22 Q 77 14 80 20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="25" ry="17" fill="url(#ratBodyGrad)" stroke="#B45309" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="15" ry="12" fill="#FFFBEB" opacity="0.9" />

            {/* Head & Cheeks */}
            <ellipse cx="50" cy="38" rx="24" ry="20" fill="url(#ratBodyGrad)" stroke="#B45309" strokeWidth="2" />
            <ellipse cx="50" cy="30" rx="14" ry="7" fill="#FFFDE7" opacity="0.4" />

            {/* Pink Button Nose */}
            <ellipse cx="50" cy="40" rx="4.5" ry="3.5" fill="#F43F5E" />
            <ellipse cx="48.5" cy="39" rx="1.5" ry="1" fill="#FFFFFF" />

            {/* Whiskers */}
            <path d="M 22 38 Q 32 40 40 41" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 22 43 Q 32 43 40 42" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 78 38 Q 68 40 60 41" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 78 43 Q 68 43 60 42" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />

            {/* Rosy Cheeks */}
            <circle cx="33" cy="42" r="5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="67" cy="42" r="5" fill="#FDA4AF" opacity="0.8" />
          </g>
        );

      case 'ox': // 2. 소 (Ox / Cow)
        return (
          <g>
            {/* Golden Curved Horns with Ridges */}
            <path d="M 28 24 Q 10 10 28 4 Q 35 14 36 24 Z" fill="url(#goldHornGrad)" stroke="#92400E" strokeWidth="1.8" />
            <path d="M 22 14 Q 26 12 28 17" stroke="#78350F" strokeWidth="1.2" fill="none" />
            <path d="M 72 24 Q 90 10 72 4 Q 65 14 64 24 Z" fill="url(#goldHornGrad)" stroke="#92400E" strokeWidth="1.8" />
            <path d="M 78 14 Q 74 12 72 17" stroke="#78350F" strokeWidth="1.2" fill="none" />

            {/* Drooping Fluffy Ears */}
            <ellipse cx="20" cy="28" rx="9" ry="5.5" fill="url(#oxBodyGrad)" stroke="#78350F" strokeWidth="1.5" transform="rotate(-15 20 28)" />
            <ellipse cx="20" cy="28" rx="6" ry="3" fill="#FDA4AF" transform="rotate(-15 20 28)" />
            <ellipse cx="80" cy="28" rx="9" ry="5.5" fill="url(#oxBodyGrad)" stroke="#78350F" strokeWidth="1.5" transform="rotate(15 80 28)" />
            <ellipse cx="80" cy="28" rx="6" ry="3" fill="#FDA4AF" transform="rotate(15 80 28)" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="26" ry="18" fill="url(#oxBodyGrad)" stroke="#78350F" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="14" ry="12" fill="#FEF3C7" />

            {/* Head */}
            <ellipse cx="50" cy="36" rx="25" ry="20" fill="url(#oxBodyGrad)" stroke="#78350F" strokeWidth="2" />
            <ellipse cx="50" cy="28" rx="12" ry="6" fill="#FDE68A" opacity="0.5" />

            {/* Cow Muzzle & Nose */}
            <ellipse cx="50" cy="45" rx="17" ry="11" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.8" />
            <circle cx="43" cy="44" r="2.5" fill="#78350F" />
            <circle cx="57" cy="44" r="2.5" fill="#78350F" />
            <path d="M 46 49 Q 50 52 54 49" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="31" cy="39" r="4.5" fill="#FCA5A5" opacity="0.75" />
            <circle cx="69" cy="39" r="4.5" fill="#FCA5A5" opacity="0.75" />
          </g>
        );

      case 'tiger': // 3. 호랑이 (Tiger)
        return (
          <g>
            {/* Round Striped Ears */}
            <circle cx="26" cy="20" r="10" fill="url(#tigerGrad)" stroke="#7C2D12" strokeWidth="1.8" />
            <circle cx="26" cy="20" r="6" fill="#FFF7ED" />
            <path d="M 20 16 L 24 20" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

            <circle cx="74" cy="20" r="10" fill="url(#tigerGrad)" stroke="#7C2D12" strokeWidth="1.8" />
            <circle cx="74" cy="20" r="6" fill="#FFF7ED" />
            <path d="M 80 16 L 76 20" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="25" ry="17" fill="url(#tigerGrad)" stroke="#7C2D12" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="15" ry="12" fill="#FFFBEB" />

            {/* Head */}
            <ellipse cx="50" cy="37" rx="25" ry="20" fill="url(#tigerGrad)" stroke="#7C2D12" strokeWidth="2" />

            {/* Tiger King Mark (王) on Forehead */}
            <path d="M 44 20 L 56 20 M 50 20 L 50 29 M 45 24 L 55 24 M 43 29 L 57 29" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

            {/* Side Stripes */}
            <path d="M 26 34 Q 34 35 28 39" stroke="#7C2D12" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 74 34 Q 66 35 72 39" stroke="#7C2D12" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* White Muzzle */}
            <ellipse cx="50" cy="44" rx="14" ry="9" fill="#FFFBEB" stroke="#C2410C" strokeWidth="1" />
            <polygon points="50,40 45,36 55,36" fill="#C2410C" />
            <ellipse cx="48.5" cy="37.5" rx="1.5" ry="0.8" fill="#FFFFFF" />

            {/* Cute mini tiger fangs */}
            <polygon points="46,47 48,47 47,49.5" fill="#FFFFFF" />
            <polygon points="52,47 54,47 53,49.5" fill="#FFFFFF" />

            {/* Cheeks */}
            <circle cx="33" cy="42" r="5" fill="#F97316" opacity="0.45" />
            <circle cx="67" cy="42" r="5" fill="#F97316" opacity="0.45" />
          </g>
        );

      case 'rabbit': // 4. 토끼 (Rabbit / Bunny)
        return (
          <g>
            {/* Long Upright Bunny Ears with Gradient & Pastel Core */}
            <ellipse cx="34" cy="14" rx="8.5" ry="19" fill="url(#rabbitWhiteGrad)" stroke="#FB7185" strokeWidth="1.8" transform="rotate(-6 34 14)" />
            <ellipse cx="34" cy="14" rx="4.5" ry="13" fill="url(#pinkBlushGrad)" transform="rotate(-6 34 14)" />
            <ellipse cx="66" cy="14" rx="8.5" ry="19" fill="url(#rabbitWhiteGrad)" stroke="#FB7185" strokeWidth="1.8" transform="rotate(6 66 14)" />
            <ellipse cx="66" cy="14" rx="4.5" ry="13" fill="url(#pinkBlushGrad)" transform="rotate(6 66 14)" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="24" ry="17" fill="url(#rabbitWhiteGrad)" stroke="#FB7185" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="14" ry="11" fill="#FFF1F2" />

            {/* Head */}
            <ellipse cx="50" cy="38" rx="24" ry="20" fill="url(#rabbitWhiteGrad)" stroke="#FB7185" strokeWidth="2" />

            {/* Pink Cute Heart Nose & Mouth */}
            <polygon points="50,40 46,36 54,36" fill="#F43F5E" />
            <path d="M 46 43 Q 50 47 54 43" stroke="#BE123C" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Sparkling Star Blush Cheeks */}
            <circle cx="33" cy="42" r="5.5" fill="#FDA4AF" opacity="0.85" />
            <circle cx="67" cy="42" r="5.5" fill="#FDA4AF" opacity="0.85" />
            <path d="M 33 40 L 33 44 M 31 42 L 35 42" stroke="#FFF" strokeWidth="1" opacity="0.9" />
            <path d="M 67 40 L 67 44 M 65 42 L 69 42" stroke="#FFF" strokeWidth="1" opacity="0.9" />
          </g>
        );

      case 'dragon': // 5. 용 (Dragon / Azure Dragon)
        return (
          <g>
            {/* Golden Dragon Antlers / Horns with Pearlescent sheen */}
            <path d="M 32 20 Q 18 4 36 2 Q 38 12 40 20 Z" fill="url(#goldHornGrad)" stroke="#D97706" strokeWidth="1.8" />
            <path d="M 26 10 Q 20 8 22 14" stroke="#D97706" strokeWidth="1.5" fill="none" />
            <path d="M 68 20 Q 82 4 64 2 Q 62 12 60 20 Z" fill="url(#goldHornGrad)" stroke="#D97706" strokeWidth="1.8" />
            <path d="M 74 10 Q 80 8 78 14" stroke="#D97706" strokeWidth="1.5" fill="none" />

            {/* Soft Ear Fins */}
            <polygon points="22,32 14,24 24,26" fill="#2DD4BF" stroke="#0F766E" strokeWidth="1.5" />
            <polygon points="78,32 86,24 76,26" fill="#2DD4BF" stroke="#0F766E" strokeWidth="1.5" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="25" ry="17" fill="url(#dragonGrad)" stroke="#0E7490" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="14" ry="12" fill="#CFFAFE" />
            {/* Belly scale ridges */}
            <path d="M 42 60 Q 50 64 58 60 M 42 66 Q 50 70 58 66" stroke="#0891B2" strokeWidth="1.2" fill="none" />

            {/* Head */}
            <ellipse cx="50" cy="36" rx="25" ry="20" fill="url(#dragonGrad)" stroke="#0E7490" strokeWidth="2" />

            {/* Golden Flowing Whiskers */}
            <path d="M 32 41 Q 14 44 24 53" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 68 41 Q 86 44 76 53" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Snout with small cute fangs */}
            <ellipse cx="50" cy="42" rx="12" ry="7" fill="#A5F3FC" opacity="0.7" />
            <polygon points="46,45 48,45 47,47.5" fill="#FFFFFF" />
            <polygon points="52,45 54,45 53,47.5" fill="#FFFFFF" />

            {/* Cheeks */}
            <circle cx="34" cy="40" r="4.5" fill="#67E8F9" opacity="0.8" />
            <circle cx="66" cy="40" r="4.5" fill="#67E8F9" opacity="0.8" />
          </g>
        );

      case 'snake': // 6. 뱀 (Snake)
        return (
          <g>
            {/* Cute coiled body */}
            <ellipse cx="50" cy="62" rx="23" ry="17" fill="url(#snakeGrad)" stroke="#047857" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="13" ry="11" fill="#DCFCE7" />

            {/* Diamond pattern on body */}
            <polygon points="50,56 54,60 50,64 46,60" fill="#FDE047" opacity="0.85" />

            {/* Smooth rounded Head */}
            <ellipse cx="50" cy="36" rx="23" ry="19" fill="url(#snakeGrad)" stroke="#047857" strokeWidth="2" />
            <ellipse cx="50" cy="28" rx="11" ry="5" fill="#A7F3D0" opacity="0.5" />

            {/* Little Red Ribbon Bow on head */}
            <g transform="translate(50, 18)">
              <circle cx="0" cy="0" r="3" fill="#EF4444" />
              <polygon points="0,0 -8,-5 -8,5" fill="#EF4444" />
              <polygon points="0,0 8,-5 8,5" fill="#EF4444" />
            </g>

            {/* Forked Tongue */}
            <path d="M 50 44 L 50 51 L 46 56 M 50 51 L 54 56" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="34" cy="40" r="4.5" fill="#A7F3D0" />
            <circle cx="66" cy="40" r="4.5" fill="#A7F3D0" />
          </g>
        );

      case 'horse': // 7. 말 (Horse / Pegasus)
        return (
          <g>
            {/* Perky Ears */}
            <polygon points="30,20 22,4 38,14" fill="url(#horseGrad)" stroke="#5B21B6" strokeWidth="1.8" />
            <polygon points="29,18 25,8 35,14" fill="#DDD6FE" />
            <polygon points="70,20 78,4 62,14" fill="url(#horseGrad)" stroke="#5B21B6" strokeWidth="1.8" />
            <polygon points="71,18 75,8 65,14" fill="#DDD6FE" />

            {/* Golden / Lilac Mane Crest */}
            <path d="M 42 6 Q 50 0 58 6 L 54 18 Q 50 14 46 18 Z" fill="url(#goldHornGrad)" stroke="#D97706" strokeWidth="1.2" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="25" ry="17" fill="url(#horseGrad)" stroke="#5B21B6" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="14" ry="12" fill="#EDE9FE" />

            {/* Head */}
            <ellipse cx="50" cy="36" rx="24" ry="20" fill="url(#horseGrad)" stroke="#5B21B6" strokeWidth="2" />

            {/* Muzzle with Nostrils */}
            <ellipse cx="50" cy="45" rx="16" ry="9.5" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="1.5" />
            <circle cx="44" cy="44" r="2.5" fill="#5B21B6" />
            <circle cx="56" cy="44" r="2.5" fill="#5B21B6" />
            <path d="M 46 49 Q 50 52 54 49" stroke="#6D28D9" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="32" cy="39" r="4.5" fill="#C084FC" opacity="0.6" />
            <circle cx="68" cy="39" r="4.5" fill="#C084FC" opacity="0.6" />
          </g>
        );

      case 'goat': // 8. 양 (Goat / Sheep)
        return (
          <g>
            {/* Golden Ridged Spiral Horns */}
            <path d="M 28 20 C 14 8, 20 -2, 32 4 C 36 8, 34 16, 32 20 Z" fill="url(#goldHornGrad)" stroke="#D97706" strokeWidth="1.8" />
            <path d="M 22 10 Q 26 8 28 14" stroke="#B45309" strokeWidth="1.2" fill="none" />
            <path d="M 72 20 C 86 8, 80 -2, 68 4 C 64 8, 66 16, 68 20 Z" fill="url(#goldHornGrad)" stroke="#D97706" strokeWidth="1.8" />
            <path d="M 78 10 Q 74 8 72 14" stroke="#B45309" strokeWidth="1.2" fill="none" />

            {/* Drooping soft pink ears */}
            <ellipse cx="20" cy="28" rx="8" ry="5" fill="#FFF1F2" stroke="#FB7185" strokeWidth="1.5" transform="rotate(-15 20 28)" />
            <ellipse cx="20" cy="28" rx="5" ry="3" fill="#FDA4AF" transform="rotate(-15 20 28)" />
            <ellipse cx="80" cy="28" rx="8" ry="5" fill="#FFF1F2" stroke="#FB7185" strokeWidth="1.5" transform="rotate(15 80 28)" />
            <ellipse cx="80" cy="28" rx="5" ry="3" fill="#FDA4AF" transform="rotate(15 80 28)" />

            {/* Fluffy Marshmallow Cloud Body */}
            <ellipse cx="50" cy="62" rx="26" ry="18" fill="url(#sheepWoolGrad)" stroke="#94A3B8" strokeWidth="2" />

            {/* Cloud Fleece Texture puffs */}
            <circle cx="34" cy="58" r="8" fill="#FFFFFF" />
            <circle cx="50" cy="60" r="9" fill="#FFFFFF" />
            <circle cx="66" cy="58" r="8" fill="#FFFFFF" />

            {/* Head */}
            <ellipse cx="50" cy="36" rx="23" ry="19" fill="#FFFBEB" stroke="#94A3B8" strokeWidth="1.8" />

            {/* Forehead wool cloud puff */}
            <circle cx="44" cy="18" r="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="56" cy="18" r="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="50" cy="15" r="7.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

            {/* Pink triangular nose */}
            <polygon points="50,40 46,36 54,36" fill="#F43F5E" />
            <path d="M 47 43 Q 50 46 53 43" stroke="#BE123C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="34" cy="40" r="5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="66" cy="40" r="5" fill="#FDA4AF" opacity="0.8" />
          </g>
        );

      case 'monkey': // 9. 원숭이 (Monkey)
        return (
          <g>
            {/* Big Cupped Round Ears with inner Peach glow */}
            <circle cx="18" cy="34" r="12" fill="url(#monkeyGrad)" stroke="#9A3412" strokeWidth="1.8" />
            <circle cx="18" cy="34" r="7" fill="#FED7AA" />
            <circle cx="82" cy="34" r="12" fill="url(#monkeyGrad)" stroke="#9A3412" strokeWidth="1.8" />
            <circle cx="82" cy="34" r="7" fill="#FED7AA" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="25" ry="17" fill="url(#monkeyGrad)" stroke="#9A3412" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="14" ry="12" fill="#FFEDD5" />

            {/* Head */}
            <ellipse cx="50" cy="36" rx="24" ry="19" fill="url(#monkeyGrad)" stroke="#9A3412" strokeWidth="2" />

            {/* Head hair tuft */}
            <path d="M 47 18 Q 50 10 53 18" stroke="#9A3412" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Peach Mask Face (Heart-shaped monkey mask) */}
            <path d="M 35 26 C 42 20, 50 24, 50 27 C 50 24, 58 20, 65 26 C 70 36, 60 48, 50 48 C 40 48, 30 36, 35 26 Z" fill="#FFEDD5" stroke="#F97316" strokeWidth="1" />

            {/* Small button nose */}
            <ellipse cx="50" cy="38" rx="3.5" ry="2.5" fill="#9A3412" />

            {/* Big smiling mouth */}
            <path d="M 44 42 Q 50 47 56 42" stroke="#7C2D12" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="36" cy="39" r="4.5" fill="#FB7185" opacity="0.7" />
            <circle cx="64" cy="39" r="4.5" fill="#FB7185" opacity="0.7" />
          </g>
        );

      case 'rooster': // 10. 닭 (Rooster / Chicken)
        return (
          <g>
            {/* Emerald-Teal Tail Feathers on the side */}
            <path d="M 68 55 Q 92 42 86 28 Q 78 44 66 52 Z" fill="#0D9488" stroke="#115E59" strokeWidth="2" />
            <path d="M 72 60 Q 96 56 88 38 Q 80 50 70 58 Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="1.8" />
            <path d="M 74 65 Q 96 70 88 52 Q 80 60 72 64 Z" fill="#2DD4BF" stroke="#0D9488" strokeWidth="1.5" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="26" ry="18" fill="url(#roosterBodyGrad)" stroke="#C2410C" strokeWidth="2" />

            {/* Wings on Sides */}
            <path d="M 28 58 Q 18 64 28 72 Q 38 68 36 58 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
            <path d="M 72 58 Q 82 64 72 72 Q 62 68 64 58 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />

            {/* Brilliant Red Crown Comb (3 Lobes) */}
            <path d="M 38 24 C 34 10, 44 6, 46 16 C 50 6, 58 6, 58 16 C 62 10, 68 12, 64 24 Z" fill="url(#redCombGrad)" stroke="#991B1B" strokeWidth="2" />

            {/* Head */}
            <ellipse cx="50" cy="38" rx="22" ry="18" fill="url(#roosterBodyGrad)" stroke="#C2410C" strokeWidth="2" />

            {/* Golden 3D Beak */}
            <polygon points="50,37 42,44 58,44" fill="url(#goldHornGrad)" stroke="#D97706" strokeWidth="1.8" />
            <polygon points="50,44 45,44 50,47 55,44" fill="#F59E0B" />

            {/* Red Wattle under beak */}
            <path d="M 47 45 C 44 54, 56 54, 53 45 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />

            {/* Cheeks */}
            <circle cx="34" cy="40" r="4.5" fill="#F87171" opacity="0.65" />
            <circle cx="66" cy="40" r="4.5" fill="#F87171" opacity="0.65" />
          </g>
        );

      case 'dog': // 11. 개 (Dog / Puppy)
        return (
          <g>
            {/* Floppy Chocolate Ears with bouncy curve */}
            <path d="M 28 24 C 12 28, 14 50, 26 48 C 32 40, 34 30, 28 24 Z" fill="url(#dogEarGrad)" stroke="#78350F" strokeWidth="2" />
            <path d="M 72 24 C 88 28, 86 50, 74 48 C 68 40, 66 30, 72 24 Z" fill="url(#dogEarGrad)" stroke="#78350F" strokeWidth="2" />

            {/* Body */}
            <ellipse cx="50" cy="64" rx="25" ry="17" fill="url(#dogBodyGrad)" stroke="#B45309" strokeWidth="2" />
            {/* White Chest Patch */}
            <ellipse cx="50" cy="66" rx="14" ry="12" fill="#FFFBEB" />

            {/* Shiny Blue Collar with Gold Star Tag */}
            <rect x="36" y="52" width="28" height="5.5" rx="2.5" fill="#2563EB" stroke="#1E40AF" strokeWidth="1.5" />
            <circle cx="50" cy="58" r="3.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />

            {/* Head */}
            <ellipse cx="50" cy="36" rx="24" ry="20" fill="url(#dogBodyGrad)" stroke="#B45309" strokeWidth="2" />

            {/* White Muzzle */}
            <ellipse cx="50" cy="42" rx="14" ry="10" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />

            {/* Shiny Black Nose */}
            <ellipse cx="50" cy="38" rx="4.5" ry="3.2" fill="#1E293B" />
            <ellipse cx="48.5" cy="37" rx="1.5" ry="1" fill="#FFFFFF" />

            {/* Smiling mouth with cute pink tongue peeking out */}
            <path d="M 46 42 Q 50 46 54 42" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <ellipse cx="50" cy="44.5" rx="2.5" ry="3" fill="#FB7185" />

            {/* Rosy Cheeks */}
            <circle cx="33" cy="40" r="5" fill="#FCA5A5" opacity="0.75" />
            <circle cx="67" cy="40" r="5" fill="#FCA5A5" opacity="0.75" />
          </g>
        );

      case 'pig': // 12. 돼지 (Pig / Piggy)
      default:
        return (
          <g>
            {/* Cute Folded Pink Ears */}
            <polygon points="28,20 16,6 36,12" fill="url(#pigGrad)" stroke="#E11D48" strokeWidth="1.8" />
            <polygon points="27,18 19,9 33,13" fill="#FDA4AF" />
            <polygon points="72,20 84,6 64,12" fill="url(#pigGrad)" stroke="#E11D48" strokeWidth="1.8" />
            <polygon points="73,18 81,9 67,13" fill="#FDA4AF" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="25" ry="17" fill="url(#pigGrad)" stroke="#E11D48" strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="14" ry="12" fill="#FFE4E6" />

            {/* Head */}
            <ellipse cx="50" cy="36" rx="25" ry="20" fill="url(#pigGrad)" stroke="#E11D48" strokeWidth="2" />

            {/* 3D Piggy Snout with Highlights */}
            <ellipse cx="50" cy="42" rx="12" ry="8.5" fill="url(#pigSnoutGrad)" stroke="#BE123C" strokeWidth="1.8" />
            <ellipse cx="46" cy="42" rx="2.2" ry="3.5" fill="#991B1B" />
            <ellipse cx="54" cy="42" rx="2.2" ry="3.5" fill="#991B1B" />
            <ellipse cx="48" cy="38" rx="6" ry="2" fill="#FFE4E6" opacity="0.7" />

            {/* Cheeks */}
            <circle cx="33" cy="38" r="5" fill="#FB7185" opacity="0.85" />
            <circle cx="67" cy="38" r="5" fill="#FB7185" opacity="0.85" />
          </g>
        );
    }
  };

  // Expressive Anime Eyes with Multi-tier Sparkle Highlights & Catchlights
  const renderEyesAndMouth = () => {
    if (status === 'hit') {
      return (
        <g>
          {/* Happy Closed Winking Star Eyes ^_^ */}
          <path d="M 33 33 Q 40 23 47 33" stroke="#1E293B" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M 53 33 Q 60 23 67 33" stroke="#1E293B" strokeWidth="3.2" fill="none" strokeLinecap="round" />

          {/* Big Open Joyful Mouth */}
          <path d="M 43 47 Q 50 56 57 47 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
          <ellipse cx="50" cy="51" rx="3.5" ry="2" fill="#FDA4AF" />

          {/* Hit Golden Sparkle Stars */}
          <polygon points="12,14 15,18 20,20 15,22 12,26 9,22 4,20 9,18" fill="#FBBF24" />
          <polygon points="88,14 91,18 96,20 91,22 88,26 85,22 80,20 85,18" fill="#FBBF24" />
        </g>
      );
    }

    if (status === 'miss') {
      return (
        <g>
          {/* Dizzy / Miss X Eyes */}
          <line x1="36" y1="28" x2="44" y2="36" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="44" y1="28" x2="36" y2="36" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="56" y1="28" x2="64" y2="36" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="64" y1="28" x2="56" y2="36" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />

          {/* Blue Sweat Drop */}
          <path d="M 76 20 Q 82 28 76 34 Q 70 28 76 20 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        </g>
      );
    }

    // Default: Crystal-Clear Sparkling Anime Eyes with Multiple Catchlights
    return (
      <g>
        {/* Left Eye */}
        <ellipse cx="39" cy="32" rx="4.5" ry="5.5" fill="#0F172A" />
        <ellipse cx="39" cy="33" rx="3.5" ry="4" fill="#334155" />
        {/* Primary Sparkle */}
        <circle cx="37.5" cy="30" r="1.8" fill="#FFFFFF" />
        {/* Secondary Catchlight */}
        <circle cx="41" cy="34" r="0.9" fill="#FFFFFF" />

        {/* Right Eye */}
        <ellipse cx="61" cy="32" rx="4.5" ry="5.5" fill="#0F172A" />
        <ellipse cx="61" cy="33" rx="3.5" ry="4" fill="#334155" />
        {/* Primary Sparkle */}
        <circle cx="59.5" cy="30" r="1.8" fill="#FFFFFF" />
        {/* Secondary Catchlight */}
        <circle cx="63" cy="34" r="0.9" fill="#FFFFFF" />

        {/* Happy curved mouth */}
        <path d="M 46 44 Q 50 48 54 44" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    );
  };

  // Fun accessories (Level 1: Explorer Hat, Level 2: Goggles, Level 3: Royal Crown)
  const renderAccessory = () => {
    if (accessoryLevel === 1) {
      return (
        <g transform="translate(18, -6)">
          <ellipse cx="32" cy="16" rx="26" ry="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.8" />
          <path d="M 18 16 Q 32 2 46 16 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.8" />
          <rect x="22" y="13" width="20" height="3" fill="#EF4444" rx="1" />
        </g>
      );
    }
    if (accessoryLevel === 2) {
      return (
        <g transform="translate(18, -6)">
          <ellipse cx="32" cy="16" rx="26" ry="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.8" />
          <path d="M 18 16 Q 32 2 46 16 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.8" />
          <circle cx="26" cy="15" r="4.5" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.8" />
          <circle cx="38" cy="15" r="4.5" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.8" />
          <line x1="30.5" y1="15" x2="33.5" y2="15" stroke="#0F172A" strokeWidth="2" />
        </g>
      );
    }
    if (accessoryLevel >= 3) {
      return (
        <g transform="translate(26, -10)">
          <polygon points="24,2 30,12 38,4 46,12 52,2 49,18 27,18" fill="url(#goldHornGrad)" stroke="#B45309" strokeWidth="2" />
          <circle cx="38" cy="11" r="3" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
          <circle cx="28" cy="14" r="2" fill="#3B82F6" />
          <circle cx="48" cy="14" r="2" fill="#10B981" />
        </g>
      );
    }
    return null;
  };

  return (
    <div
      id={`hole-container-${holeIndex}`}
      className="relative flex flex-col items-center justify-end select-none w-full h-[90px] sm:h-[120px] md:h-[135px]"
      onPointerDown={handlePointerDown}
      style={{ touchAction: 'manipulation' }}
    >
      {/* 1. Hole Cavity Background (Dark tunnel behind the animal) - Layer z-0 */}
      <div className="absolute bottom-2.5 sm:bottom-3 w-[88%] max-w-[130px] h-7 sm:h-9 z-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-full h-full rounded-[50%] bg-[#1E0F07] border-2 border-[#381E0E]"
          style={{
            boxShadow: 'inset 0 8px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* 2. Animal Sprite - Layer z-10 (Rises up out of the hole smoothly with Pop-Up spring motion) */}
      <div
        id={`mole-sprite-${holeIndex}`}
        className={`absolute bottom-3.5 sm:bottom-5 z-10 flex flex-col items-center cursor-pointer transform origin-bottom pointer-events-auto ${
          isPopped
            ? status === 'hit'
              ? 'translate-y-[-16px] sm:translate-y-[-22px] scale-110 rotate-1'
              : status === 'miss'
              ? 'translate-y-[8px] sm:translate-y-[12px] scale-95 -rotate-2 opacity-85'
              : 'translate-y-0 scale-100 hover:scale-105 active:scale-95'
            : 'translate-y-[85px] sm:translate-y-[115px] scale-70 opacity-0 pointer-events-none'
        }`}
        style={{
          transitionProperty: 'transform, opacity',
          transitionTimingFunction: isPopped
            ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            : 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: isPopped ? '380ms' : '300ms',
          willChange: 'transform, opacity'
        }}
      >
        {/* Full Animal Character Head & Body - Large, High-Def SVG */}
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 filter drop-shadow-lg overflow-visible">
          <svg viewBox="0 0 100 85" className="w-full h-full overflow-visible">
            <defs>
              {/* Universal Shading & Color Gradients */}
              <linearGradient id="goldHornGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF59D" />
                <stop offset="40%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="pinkBlushGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE4E6" />
                <stop offset="100%" stopColor="#FDA4AF" />
              </linearGradient>

              <linearGradient id="ratEarOuter" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              <linearGradient id="ratBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="60%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="oxBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="60%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>

              <linearGradient id="tigerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="60%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>

              <linearGradient id="rabbitWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFF1F2" />
                <stop offset="100%" stopColor="#FECDD3" />
              </linearGradient>

              <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0891B2" />
              </linearGradient>

              <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              <linearGradient id="horseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="60%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>

              <linearGradient id="sheepWoolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              <linearGradient id="monkeyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="60%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>

              <linearGradient id="roosterBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="60%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              <linearGradient id="redCombGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>

              <linearGradient id="dogBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="dogEarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>

              <linearGradient id="pigGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FECDD3" />
                <stop offset="60%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#FB7185" />
              </linearGradient>

              <linearGradient id="pigSnoutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="50%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
            </defs>

            {renderZodiacAnimal()}
            {renderEyesAndMouth()}
            {renderAccessory()}
          </svg>
        </div>

        {/* Small Cute Paws Resting on Dirt Rim */}
        <div className="absolute bottom-1 w-full flex justify-between px-3 sm:px-5 pointer-events-none z-20">
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-amber-50 border sm:border-2 border-amber-800 shadow-xs" />
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-amber-50 border sm:border-2 border-amber-800 shadow-xs" />
        </div>
      </div>

      {/* 3. Front Dirt Mound & Clods Rim - Layer z-20 */}
      <div className="relative z-20 w-[94%] max-w-[140px] h-6 sm:h-8 -mb-1 pointer-events-none flex flex-col items-center justify-end">
        <div
          className="relative w-full h-5 sm:h-6 rounded-[50%] bg-gradient-to-b from-[#5C3218] via-[#4A2510] to-[#34180A] border sm:border-2 border-[#6D3D20] shadow-md flex items-center justify-around px-1"
          style={{
            boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.2)'
          }}
        >
          <div className="w-2 h-1.5 rounded-full bg-[#7C4828] opacity-80" />
          <div className="w-3 h-2 rounded-full bg-[#3B1C0A] opacity-90 -mt-1" />
          <div className="w-2.5 h-1.5 rounded-full bg-[#7C4828] opacity-80" />
          <div className="w-1.5 h-1 rounded-full bg-[#A06038] opacity-70" />
        </div>

        {/* Grass Tufts & Mini Wildflowers */}
        <div className="absolute -bottom-1 w-[104%] h-3 sm:h-4 flex items-center justify-between px-1.5 -z-10">
          <span className="text-[9px] sm:text-xs transform -translate-y-0.5 filter drop-shadow">
            {['🌱', '🌿', '🌼', '🍀', '🌸'][holeIndex % 5]}
          </span>
          <div className="flex gap-0.5">
            <div className="w-1 h-2 sm:h-3 bg-[#4CAF50] rounded-t-full rotate-[-15deg]" />
            <div className="w-1.2 h-2.5 sm:h-3.5 bg-[#81C784] rounded-t-full" />
            <div className="w-1 h-2 sm:h-3 bg-[#388E3C] rounded-t-full rotate-[15deg]" />
          </div>
          <span className="text-[9px] sm:text-xs transform -translate-y-0.5 filter drop-shadow">
            {['🍄', '🌸', '🌱', '🌼', '🍀'][(holeIndex + 2) % 5]}
          </span>
        </div>
      </div>

      {/* 4. Front Signboard Capsule - Layer z-30 */}
      <div
        id={`sign-board-${holeIndex}`}
        className={`relative z-30 -mt-1 sm:-mt-1.5 px-2.5 sm:px-4 py-0.5 sm:py-1 min-w-[56px] sm:min-w-[80px] max-w-[94%] text-center rounded-full font-black text-sm sm:text-lg transition-all duration-200 select-none shadow-md border-2 sm:border-3 ${
          isHinted
            ? 'bg-amber-300 border-amber-500 text-amber-950 ring-2 sm:ring-4 ring-yellow-400 ring-offset-1 animate-bounce scale-105'
            : isPopped
            ? 'bg-white border-slate-700 text-slate-900 shadow-lg'
            : 'bg-white/90 border-amber-900/30 text-amber-950/70 shadow-xs'
        }`}
        style={{
          boxShadow: isHinted
            ? '0 0 16px rgba(250, 204, 21, 0.95), 0 4px 8px rgba(0,0,0,0.3)'
            : '0 3px 6px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.9)'
        }}
      >
        <span className="truncate block font-black tracking-tight">{text || zodiac.name}</span>
      </div>
    </div>
  );
};
