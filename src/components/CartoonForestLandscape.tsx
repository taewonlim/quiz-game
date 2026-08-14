import React from 'react';

interface CartoonForestLandscapeProps {
  themeId?: 'morning' | 'afternoon' | 'sunset' | 'night' | string;
  isFever?: boolean;
  customBackgroundUrl?: string;
}

export const CartoonForestLandscape: React.FC<CartoonForestLandscapeProps> = ({
  isFever = false,
  customBackgroundUrl
}) => {
  // If user provided a custom photo/background image URL
  if (Boolean(customBackgroundUrl && customBackgroundUrl.trim())) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none warm-forest-filter">
        <img
          src={customBackgroundUrl}
          alt="Custom Background"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-amber-100/10" />
      </div>
    );
  }

  return (
    <div
      id="forest-landscape-canvas"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#74B753] warm-forest-filter"
    >
      {/* 1. Base Sky Gradient with Soft Morning Warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#80D4FA] via-[#C9EEBA] to-[#72BA46]" />

      {/* 2. Detailed SVG Fairytale Forest Art with Swaying Leaves & Swaying Tree Tops */}
      <svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Canopy & Tree Gradients */}
          <linearGradient id="skySunbeamGrad" x1="20%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#FFF9C4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="trunkGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5D4037" />
            <stop offset="40%" stopColor="#8D6E63" />
            <stop offset="85%" stopColor="#BCAAA4" />
            <stop offset="100%" stopColor="#4E342E" />
          </linearGradient>

          <linearGradient id="trunkGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4E342E" />
            <stop offset="40%" stopColor="#795548" />
            <stop offset="80%" stopColor="#A1887F" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>

          <linearGradient id="distTreeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#80CBC4" />
            <stop offset="50%" stopColor="#4DB6AC" />
            <stop offset="100%" stopColor="#26A69A" />
          </linearGradient>

          <linearGradient id="pineCanopy1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#43A047" />
            <stop offset="60%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>

          <linearGradient id="pineCanopy2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#66BB6A" />
            <stop offset="60%" stopColor="#388E3C" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>

          <linearGradient id="mossyRockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9E9D24" />
            <stop offset="30%" stopColor="#827717" />
            <stop offset="70%" stopColor="#558B2F" />
            <stop offset="100%" stopColor="#37474F" />
          </linearGradient>

          <linearGradient id="stoneStepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D7CCC8" />
            <stop offset="40%" stopColor="#BCAAA4" />
            <stop offset="80%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#5D4037" />
          </linearGradient>

          <linearGradient id="pavedPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="40%" stopColor="#FFCA28" />
            <stop offset="80%" stopColor="#E0A926" />
            <stop offset="100%" stopColor="#C98A19" />
          </linearGradient>

          <linearGradient id="hydrangeaPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="50%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>

          <linearGradient id="hydrangeaBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient id="hydrangeaPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
        </defs>

        {/* 1. Deep Distant Forest Silhouettes & Soft Sky Haze */}
        <g id="distant-deep-forest" opacity="0.6">
          {/* Distant vertical tree pillars */}
          <rect x="380" y="80" width="24" height="420" fill="url(#distTreeGrad)" opacity="0.5" />
          <rect x="440" y="60" width="30" height="440" fill="url(#distTreeGrad)" opacity="0.6" />
          <rect x="520" y="90" width="28" height="410" fill="url(#distTreeGrad)" opacity="0.55" />
          <rect x="620" y="50" width="36" height="450" fill="url(#distTreeGrad)" opacity="0.7" />
          <rect x="740" y="70" width="32" height="430" fill="url(#distTreeGrad)" opacity="0.65" />
          <rect x="840" y="90" width="28" height="410" fill="url(#distTreeGrad)" opacity="0.55" />
          <rect x="920" y="60" width="34" height="440" fill="url(#distTreeGrad)" opacity="0.6" />
          <rect x="1000" y="80" width="26" height="420" fill="url(#distTreeGrad)" opacity="0.5" />
        </g>

        {/* 2. Radiant Sunbeams streaming diagonally from forest canopy (Gently Pulsing with Warmth) */}
        <g id="sunlight-rays" className="animate-sunbeam" opacity="0.85">
          <polygon points="120,0 240,0 680,900 480,900" fill="url(#skySunbeamGrad)" />
          <polygon points="320,0 480,0 960,900 760,900" fill="url(#skySunbeamGrad)" />
          <polygon points="680,0 820,0 1280,900 1100,900" fill="url(#skySunbeamGrad)" />
        </g>

        {/* 3. Mid-ground Cedar/Fir Trees with Tiered Pine Canopies (With Gentle Wind Sway) */}
        <g id="midground-cedars">
          {/* Mid Left Cedar Trunk & Layers */}
          <rect x="220" y="0" width="65" height="520" fill="#6D4C41" />
          <g className="animate-canopy-left">
            <path d="M 160 120 L 252 20 L 344 120 L 310 130 L 252 70 L 194 130 Z" fill="url(#pineCanopy1)" />
            <path d="M 140 200 L 252 100 L 364 200 L 320 210 L 252 140 L 184 210 Z" fill="url(#pineCanopy2)" />
            <path d="M 120 280 L 252 180 L 384 280 L 330 290 L 252 210 L 174 290 Z" fill="url(#pineCanopy1)" />
          </g>

          {/* Mid Right Cedar Trunk & Layers */}
          <rect x="1140" y="0" width="70" height="520" fill="#5D4037" />
          <g className="animate-canopy-right">
            <path d="M 1080 120 L 1175 20 L 1270 120 L 1235 130 L 1175 70 L 1115 130 Z" fill="url(#pineCanopy1)" />
            <path d="M 1060 200 L 1175 100 L 1290 200 L 1245 210 L 1175 140 L 1105 210 Z" fill="url(#pineCanopy2)" />
            <path d="M 1040 280 L 1175 180 L 1310 280 L 1255 290 L 1175 210 L 1095 290 Z" fill="url(#pineCanopy1)" />
          </g>
        </g>

        {/* 4. Center Winding Path & Stone Steps (Matching image perspective) */}
        <g id="winding-stone-path-and-steps">
          {/* Distant clearing meadow */}
          <path d="M 520 420 Q 720 380 920 420 L 980 500 Q 720 470 460 500 Z" fill="#9CCC65" />

          {/* Stone Steps Leading down (Tier 1 to 5) */}
          <path d="M 540 480 L 900 480 L 890 510 L 550 510 Z" fill="url(#stoneStepGrad)" stroke="#4E342E" strokeWidth="2" />
          <path d="M 545 482 L 895 482" stroke="#FFF8E1" strokeWidth="2" opacity="0.6" />

          <path d="M 510 510 L 930 510 L 920 545 L 520 545 Z" fill="url(#stoneStepGrad)" stroke="#4E342E" strokeWidth="2" />
          <path d="M 515 512 L 925 512" stroke="#FFF8E1" strokeWidth="2.5" opacity="0.6" />

          <path d="M 480 545 L 960 545 L 950 585 L 490 585 Z" fill="url(#stoneStepGrad)" stroke="#4E342E" strokeWidth="2.5" />
          <path d="M 485 547 L 955 547" stroke="#FFF8E1" strokeWidth="3" opacity="0.7" />

          <path d="M 440 585 L 1000 585 L 990 635 L 450 635 Z" fill="url(#stoneStepGrad)" stroke="#4E342E" strokeWidth="3" />
          <path d="M 445 588 L 995 588" stroke="#FFF8E1" strokeWidth="3.5" opacity="0.75" />

          {/* Lower Foreground Paved Cobblestone Road */}
          <path
            d="M 450 635 Q 720 620 990 635 L 1180 900 L 260 900 Z"
            fill="url(#pavedPathGrad)"
            stroke="#D97706"
            strokeWidth="3"
          />

          {/* Cobblestone paving patterns */}
          <g fill="#FFF9C4" stroke="#B45309" strokeWidth="2" opacity="0.75">
            <ellipse cx="560" cy="670" rx="34" ry="16" />
            <ellipse cx="640" cy="665" rx="38" ry="18" />
            <ellipse cx="730" cy="668" rx="42" ry="19" />
            <ellipse cx="820" cy="665" rx="38" ry="18" />
            <ellipse cx="900" cy="672" rx="34" ry="16" />

            <ellipse cx="480" cy="735" rx="42" ry="20" />
            <ellipse cx="580" cy="730" rx="48" ry="22" />
            <ellipse cx="690" cy="738" rx="54" ry="24" />
            <ellipse cx="800" cy="730" rx="50" ry="23" />
            <ellipse cx="910" cy="740" rx="44" ry="21" />

            <ellipse cx="380" cy="820" rx="58" ry="26" />
            <ellipse cx="510" cy="815" rx="64" ry="28" />
            <ellipse cx="650" cy="825" rx="72" ry="30" />
            <ellipse cx="790" cy="818" rx="66" ry="29" />
            <ellipse cx="930" cy="830" rx="58" ry="27" />
            <ellipse cx="1060" cy="825" rx="50" ry="24" />
          </g>

          {/* Moss patches on stones */}
          <ellipse cx="590" cy="690" rx="16" ry="7" fill="#84CC16" opacity="0.8" />
          <ellipse cx="750" cy="760" rx="20" ry="9" fill="#84CC16" opacity="0.8" />
          <ellipse cx="450" cy="850" rx="26" ry="11" fill="#65A30D" opacity="0.8" />
          <ellipse cx="860" cy="850" rx="22" ry="10" fill="#65A30D" opacity="0.8" />
        </g>

        {/* 5. Left Side: Massive Ancient Cedar Tree & Mossy Rock Terraces */}
        <g id="left-foreground-giant-tree">
          <path
            d="M -20 480 Q 220 440 450 560 L 360 800 L -20 800 Z"
            fill="url(#mossyRockGrad)"
            stroke="#2E7D32"
            strokeWidth="4"
          />

          <path
            d="M -40 0 C 180 180, 160 520, -10 900 L -160 900 L -160 0 Z"
            fill="url(#trunkGradLeft)"
            stroke="#3E2723"
            strokeWidth="5"
          />
          <path d="M 20 80 C 140 260, 110 500, 10 740" stroke="#3E2723" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 60 120 C 170 300, 140 560, 50 820" stroke="#FFF8E1" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M 90 220 C 150 360, 130 520, 80 680" stroke="#3E2723" strokeWidth="7" strokeLinecap="round" fill="none" />

          <path d="M 0 520 C 80 540, 140 680, 40 840 L -40 840 Z" fill="#65A30D" opacity="0.85" />
          <path d="M 40 600 C 90 640, 120 740, 60 820" fill="#84CC16" opacity="0.7" />

          {/* Overhead Lush Cedar Foliage Canopy with Breeze Animation */}
          <g className="animate-canopy-left">
            <path d="M -60 160 L 60 20 L 220 160 L 160 180 L 60 90 L -20 180 Z" fill="url(#pineCanopy2)" />
            <path d="M -80 280 L 80 120 L 260 280 L 190 300 L 80 190 L -30 300 Z" fill="url(#pineCanopy1)" />
          </g>

          {/* Foreground Mossy Boulders at bottom left */}
          <ellipse cx="140" cy="800" rx="90" ry="55" fill="#78909C" stroke="#455A64" strokeWidth="4" />
          <ellipse cx="130" cy="780" rx="60" ry="30" fill="#90A4AE" />
          <ellipse cx="150" cy="770" rx="45" ry="18" fill="#84CC16" opacity="0.85" />

          <ellipse cx="280" cy="850" rx="105" ry="60" fill="#607D8B" stroke="#37474F" strokeWidth="4" />
          <ellipse cx="270" cy="830" rx="70" ry="32" fill="#B0BEC5" />
          <ellipse cx="290" cy="820" rx="55" ry="20" fill="#65A30D" opacity="0.9" />
        </g>

        {/* 6. Right Side: Massive Ancient Cedar Tree & Layered Rock Terraces */}
        <g id="right-foreground-giant-tree">
          <path
            d="M 1460 460 Q 1200 430 960 560 L 1060 820 L 1460 820 Z"
            fill="url(#mossyRockGrad)"
            stroke="#2E7D32"
            strokeWidth="4"
          />

          <path
            d="M 1480 0 C 1260 180, 1280 520, 1450 900 L 1600 900 L 1600 0 Z"
            fill="url(#trunkGradRight)"
            stroke="#3E2723"
            strokeWidth="5"
          />
          <path d="M 1420 80 C 1300 260, 1330 500, 1430 740" stroke="#2E1C14" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 1380 120 C 1270 300, 1300 560, 1390 820" stroke="#FFE082" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.45" />

          <path d="M 1440 520 C 1360 540, 1300 680, 1400 840 L 1480 840 Z" fill="#65A30D" opacity="0.85" />

          {/* Overhead Lush Canopy on right with Breeze Animation */}
          <g className="animate-canopy-right">
            <path d="M 1500 160 L 1380 20 L 1220 160 L 1280 180 L 1380 90 L 1460 180 Z" fill="url(#pineCanopy2)" />
            <path d="M 1520 280 L 1360 120 L 1180 280 L 1250 300 L 1360 190 L 1470 300 Z" fill="url(#pineCanopy1)" />
          </g>

          {/* Foreground Mossy Boulders at bottom right */}
          <ellipse cx="1320" cy="800" rx="95" ry="60" fill="#78909C" stroke="#455A64" strokeWidth="4" />
          <ellipse cx="1310" cy="780" rx="65" ry="32" fill="#90A4AE" />
          <ellipse cx="1330" cy="770" rx="50" ry="20" fill="#84CC16" opacity="0.85" />

          <ellipse cx="1160" cy="850" rx="100" ry="58" fill="#607D8B" stroke="#37474F" strokeWidth="4" />
          <ellipse cx="1150" cy="830" rx="68" ry="30" fill="#B0BEC5" />
          <ellipse cx="1170" cy="820" rx="50" ry="18" fill="#65A30D" opacity="0.9" />
        </g>

        {/* 7. Beautiful Blooming Hydrangeas & Chamomile Wildflowers with Flower Sway */}
        <g id="left-hydrangeas-and-flowers" className="animate-flower-sway">
          {/* Blue Hydrangeas */}
          <circle cx="180" cy="620" r="28" fill="url(#hydrangeaBlue)" />
          <circle cx="215" cy="605" r="24" fill="url(#hydrangeaBlue)" />
          <circle cx="230" cy="635" r="26" fill="url(#hydrangeaBlue)" />
          <circle cx="195" cy="645" r="22" fill="url(#hydrangeaBlue)" />

          {/* Pink Hydrangeas */}
          <circle cx="290" cy="630" r="26" fill="url(#hydrangeaPink)" />
          <circle cx="325" cy="615" r="24" fill="url(#hydrangeaPink)" />
          <circle cx="335" cy="645" r="25" fill="url(#hydrangeaPink)" />
          <circle cx="300" cy="655" r="22" fill="url(#hydrangeaPink)" />

          {/* White Daisies */}
          <circle cx="90" cy="760" r="8" fill="#FFFFFF" />
          <circle cx="90" cy="760" r="3.5" fill="#FBBF24" />
          <circle cx="120" cy="740" r="9" fill="#FFFFFF" />
          <circle cx="120" cy="740" r="4" fill="#FBBF24" />
          <circle cx="160" cy="735" r="8.5" fill="#FFFFFF" />
          <circle cx="160" cy="735" r="3.8" fill="#FBBF24" />

          {/* Baby Bluebells near bottom left */}
          <circle cx="50" cy="850" r="11" fill="#60A5FA" />
          <circle cx="80" cy="870" r="13" fill="#3B82F6" />
          <circle cx="120" cy="880" r="12" fill="#60A5FA" />
        </g>

        {/* Right Side: Hydrangeas & Red Mushroom */}
        <g id="right-hydrangeas-and-mushroom">
          <g className="animate-flower-sway">
            {/* Big Pink Hydrangea Cluster */}
            <circle cx="1240" cy="640" r="32" fill="url(#hydrangeaPink)" />
            <circle cx="1285" cy="625" r="28" fill="url(#hydrangeaPink)" />
            <circle cx="1310" cy="655" r="30" fill="url(#hydrangeaPink)" />
            <circle cx="1265" cy="670" r="26" fill="url(#hydrangeaPink)" />
            <circle cx="1225" cy="670" r="24" fill="url(#hydrangeaPink)" />

            {/* Purple Hydrangea Cluster */}
            <circle cx="1150" cy="660" r="26" fill="url(#hydrangeaPurple)" />
            <circle cx="1185" cy="645" r="24" fill="url(#hydrangeaPurple)" />
            <circle cx="1195" cy="675" r="25" fill="url(#hydrangeaPurple)" />

            {/* White Chamomile flowers */}
            <circle cx="1090" cy="770" r="8" fill="#FFFFFF" />
            <circle cx="1090" cy="770" r="3.5" fill="#FBBF24" />
            <circle cx="1125" cy="755" r="9" fill="#FFFFFF" />
            <circle cx="1125" cy="755" r="4" fill="#FBBF24" />
            <circle cx="1240" cy="760" r="8.5" fill="#FFFFFF" />
            <circle cx="1240" cy="760" r="3.8" fill="#FBBF24" />
            <circle cx="1290" cy="780" r="9" fill="#FFFFFF" />
            <circle cx="1290" cy="780" r="4" fill="#FBBF24" />
          </g>

          {/* 🍄 Big Red Storybook Mushroom */}
          <g id="bottom-right-storybook-mushroom" transform="translate(1330, 770)">
            <path d="M 28 50 C 25 75, 20 95, 22 110 L 48 110 C 50 95, 45 75, 42 50 Z" fill="#FFF9C4" stroke="#D7CCC8" strokeWidth="2" />
            <ellipse cx="35" cy="110" rx="14" ry="5" fill="#84CC16" />

            <path
              d="M -10 50 C -8 10, 78 10, 80 50 C 80 58, -10 58, -10 50 Z"
              fill="#E53935"
              stroke="#B71C1C"
              strokeWidth="2.5"
            />
            <circle cx="12" cy="36" r="6.5" fill="#FFFFFF" />
            <circle cx="34" cy="24" r="7.5" fill="#FFFFFF" />
            <circle cx="58" cy="34" r="6.5" fill="#FFFFFF" />
            <circle cx="26" cy="46" r="5" fill="#FFFFFF" />
            <circle cx="48" cy="46" r="5" fill="#FFFFFF" />
          </g>
        </g>
      </svg>

      {/* 3. Floating Drifting Leaves Particles (🍃 바람에 흩날리는 나뭇잎 효과) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Leaf 1 */}
        <div className="absolute top-[8%] left-[5%] animate-leaf-1">
          <div className="text-xl sm:text-2xl filter drop-shadow-sm rotate-12">
            🍃
          </div>
        </div>

        {/* Leaf 2 */}
        <div className="absolute top-[20%] left-[-20px] animate-leaf-2">
          <div className="text-lg sm:text-xl filter drop-shadow-sm -rotate-45">
            🌿
          </div>
        </div>

        {/* Leaf 3 */}
        <div className="absolute top-[5%] left-[25%] animate-leaf-3">
          <div className="text-xl sm:text-2xl filter drop-shadow-sm rotate-45">
            🍂
          </div>
        </div>
      </div>

      {/* 4. Floating Animated Butterfly & Shimmering Magic Dust */}
      <div className="absolute left-6 sm:left-14 top-[22%] pointer-events-none z-10">
        <div className="text-3xl sm:text-4xl animate-flutter filter drop-shadow-lg">
          🦋
        </div>
      </div>

      <div className="absolute right-8 sm:right-20 top-[30%] pointer-events-none hidden sm:block z-10">
        <div className="text-2xl sm:text-3xl animate-pulse filter drop-shadow-md" style={{ animationDuration: '3.5s' }}>
          ✨
        </div>
      </div>

      {/* 5. Fever Mode Golden Rainbow Glow */}
      {isFever && (
        <div className="absolute inset-0 bg-radial from-yellow-300/40 via-pink-400/25 to-transparent animate-pulse pointer-events-none z-20" />
      )}
    </div>
  );
};
