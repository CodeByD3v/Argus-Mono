import React from 'react';

interface ModelIllustrationProps {
  modelType: 'infrastructure' | 'outpost' | 'runway' | 'bridge';
  isReady?: boolean;
}

export const ModelIllustration: React.FC<ModelIllustrationProps> = ({
  modelType,
  isReady = true,
}) => {
  const strokeColor = isReady ? 'rgba(52, 211, 153, 0.65)' : 'rgba(244, 166, 42, 0.7)';
  const fillColor = isReady ? 'rgba(52, 211, 153, 0.05)' : 'rgba(244, 166, 42, 0.05)';

  return (
    <div className="w-full py-0.5 px-1 flex items-center justify-center">
      <svg
        viewBox="0 0 240 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[46px] select-none"
      >
        {modelType === 'infrastructure' && (
          <g transform="translate(40, 10)">
            {/* 3D Isometric Building Facade & Rooftop */}
            {/* Top Roof Polygon */}
            <polygon
              points="80,5 130,18 80,31 30,18"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.2"
            />
            {/* Left Facade */}
            <polygon
              points="30,18 80,31 80,55 30,42"
              fill="rgba(255, 255, 255, 0.02)"
              stroke={strokeColor}
              strokeWidth="1.2"
            />
            {/* Right Facade */}
            <polygon
              points="80,31 130,18 130,42 80,55"
              fill="rgba(255, 255, 255, 0.03)"
              stroke={strokeColor}
              strokeWidth="1.2"
            />
            {/* Facade Window Grid Lines */}
            <line x1="45" y1="22" x2="45" y2="46" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="1 1" />
            <line x1="65" y1="27" x2="65" y2="51" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="1 1" />
            <line x1="95" y1="27" x2="95" y2="51" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="1 1" />
            <line x1="115" y1="22" x2="115" y2="46" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="1 1" />
            {/* Rooftop Unit */}
            <polygon points="75,12 85,15 75,18 65,15" fill={strokeColor} opacity="0.6" />
            {/* Point Cloud Sparkle Nodes */}
            <circle cx="80" cy="5" r="1.5" fill="#FFFFFF" />
            <circle cx="130" cy="18" r="1.5" fill="#FFFFFF" />
            <circle cx="30" cy="18" r="1.5" fill="#FFFFFF" />
            <circle cx="80" cy="55" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {modelType === 'outpost' && (
          <g transform="translate(40, 10)">
            {/* Mountain Contour Terrain Base */}
            <path
              d="M 10 50 Q 50 20 80 32 T 150 48"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            {/* Outpost Complex Dome */}
            <ellipse cx="80" cy="30" rx="28" ry="14" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
            <path d="M 52 30 C 52 14, 108 14, 108 30" fill="none" stroke={strokeColor} strokeWidth="1.2" />
            {/* Radar / Comm Mast */}
            <line x1="80" y1="14" x2="80" y2="2" stroke={strokeColor} strokeWidth="1.2" />
            <circle cx="80" cy="2" r="2.5" fill="#FFFFFF" />
            <ellipse cx="80" cy="30" rx="12" ry="6" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 1" />
          </g>
        )}

        {modelType === 'runway' && (
          <g transform="translate(40, 10)">
            {/* Strategic Runway Perspective Strip */}
            <polygon
              points="60,4 100,4 140,55 20,55"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1.2"
            />
            {/* Runway Center Dash Lines */}
            <line x1="80" y1="8" x2="80" y2="52" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="4 3" />
            {/* Left Hangar */}
            <polygon points="25,35 45,28 45,45 25,52" fill="none" stroke={strokeColor} strokeWidth="1" />
            {/* Right Hangar */}
            <polygon points="135,35 115,28 115,45 135,52" fill="none" stroke={strokeColor} strokeWidth="1" />
          </g>
        )}

        {modelType === 'bridge' && (
          <g transform="translate(40, 10)">
            {/* Valley Canyon Ridge */}
            <path d="M 5 52 L 40 28 L 50 52 M 155 52 L 120 28 L 110 52" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {/* Suspension Pylon Towers */}
            <line x1="45" y1="10" x2="45" y2="45" stroke={strokeColor} strokeWidth="1.4" />
            <line x1="115" y1="10" x2="115" y2="45" stroke={strokeColor} strokeWidth="1.4" />
            {/* Suspension Cables */}
            <path d="M 5 35 Q 45 10 80 28 Q 115 10 155 35" fill="none" stroke={strokeColor} strokeWidth="1" />
            {/* Bridge Deck */}
            <line x1="5" y1="32" x2="155" y2="32" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        )}

        {/* Bottom Technical Grid Line */}
        <line x1="15" y1="70" x2="225" y2="70" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.75" />
      </svg>
    </div>
  );
};
