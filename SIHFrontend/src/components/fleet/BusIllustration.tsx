import React from 'react';

interface BusIllustrationProps {
  routeCode: string;
  badgeSymbol?: string;
  isElectric?: boolean;
  highlightDoors?: boolean;
}

export const BusIllustration: React.FC<BusIllustrationProps> = ({
  routeCode,
  badgeSymbol = 'L',
  isElectric = false,
  highlightDoors = false,
}) => {
  const strokeColor = 'rgba(255, 255, 255, 0.45)';
  const orangeDoorColor = '#f59e0b';
  const doorColor = isElectric || highlightDoors ? orangeDoorColor : strokeColor;

  return (
    <div className="w-full py-0.5 flex items-center justify-center select-none">
      <svg
        viewBox="0 0 240 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[42px]"
      >
        <defs>
          {(isElectric || highlightDoors) && (
            <filter id="doorOrangeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#f59e0b" floodOpacity="0.6" />
            </filter>
          )}
        </defs>

        {/* Ground Reference Line */}
        <line x1="16" y1="64" x2="228" y2="64" stroke="rgba(255, 255, 255, 0.10)" strokeWidth="0.8" />

        {/* Bus Body Silhouette */}
        <path
          d="M 22 18 
             C 22 13, 27 11, 36 11 
             L 216 11 
             C 224 11, 228 14, 228 20 
             L 228 52 
             C 228 56, 224 58, 218 58 
             L 194 58 
             C 192 48, 172 48, 170 58 
             L 78 58 
             C 76 48, 56 48, 54 58 
             L 26 58 
             C 22 58, 20 54, 20 48 
             L 20 26 
             C 20 20, 21 18, 22 18 Z"
          stroke={strokeColor}
          strokeWidth="1.1"
          fill="rgba(255, 255, 255, 0.02)"
        />

        {/* Roof Unit (HVAC / Battery Pod) */}
        <rect
          x="70"
          y="6.5"
          width="96"
          height="5"
          rx="1.5"
          stroke={isElectric ? 'rgba(245, 158, 11, 0.6)' : strokeColor}
          strokeWidth="0.8"
          fill={isElectric ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255, 255, 255, 0.03)'}
        />
        <line x1="82" y1="9" x2="154" y2="9" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Front Windshield / Driver Cab */}
        <path
          d="M 23 18 C 23 14, 27 13, 34 13 L 44 13 L 44 38 L 23 38 Z"
          stroke={strokeColor}
          strokeWidth="0.9"
          fill="rgba(255, 255, 255, 0.04)"
        />

        {/* Route Code LED Badge Capsule */}
        <g>
          <rect
            x="48"
            y="15"
            width="60"
            height="18"
            rx="3"
            stroke={strokeColor}
            strokeWidth="0.8"
            fill="rgba(0, 0, 0, 0.7)"
          />
          {/* Badge Icon Circle */}
          <circle cx="58" cy="24" r="4.5" stroke={strokeColor} strokeWidth="0.8" fill="rgba(255,255,255,0.06)" />
          <text
            x="58"
            y="27"
            fill="rgba(255, 255, 255, 0.9)"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
          >
            {badgeSymbol}
          </text>
          {/* Route Number Text */}
          <text
            x="86"
            y="27"
            fill="rgba(255, 255, 255, 0.9)"
            fontSize="9"
            fontWeight="500"
            fontFamily="monospace"
            letterSpacing="0.8"
            textAnchor="middle"
          >
            {routeCode}
          </text>
        </g>

        {/* Passenger Side Windows */}
        <rect
          x="114"
          y="15"
          width="46"
          height="18"
          rx="2"
          stroke={strokeColor}
          strokeWidth="0.8"
          fill="rgba(255, 255, 255, 0.03)"
        />
        <line x1="137" y1="15" x2="137" y2="33" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="1 1" />

        <rect
          x="166"
          y="15"
          width="56"
          height="18"
          rx="2"
          stroke={strokeColor}
          strokeWidth="0.8"
          fill="rgba(255, 255, 255, 0.03)"
        />
        <line x1="194" y1="15" x2="194" y2="33" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="1 1" />

        {/* Front Passenger Door */}
        <rect
          x="26"
          y="20"
          width="17"
          height="35"
          rx="1"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
        />

        {/* Middle / Rear Passenger Doors */}
        {isElectric ? (
          <g stroke={doorColor} strokeWidth="1.1" filter="url(#doorOrangeGlow)">
            {/* Double Door Leaf 1 */}
            <rect x="144" y="17" width="14" height="38" rx="1.5" fill="rgba(245, 158, 11, 0.12)" />
            <line x1="151" y1="17" x2="151" y2="55" stroke={doorColor} strokeWidth="0.7" />
            <rect x="146" y="20" width="10" height="15" rx="1" stroke={doorColor} strokeWidth="0.7" fill="none" />

            {/* Double Door Leaf 2 */}
            <rect x="160" y="17" width="14" height="38" rx="1.5" fill="rgba(245, 158, 11, 0.12)" />
            <line x1="167" y1="17" x2="167" y2="55" stroke={doorColor} strokeWidth="0.7" />
            <rect x="162" y="20" width="10" height="15" rx="1" stroke={doorColor} strokeWidth="0.7" fill="none" />
          </g>
        ) : (
          <g stroke={strokeColor} strokeWidth="0.8">
            <rect x="144" y="18" width="28" height="36" rx="1.5" fill="rgba(255,255,255,0.02)" />
            <line x1="158" y1="18" x2="158" y2="54" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="2 1.5" />
          </g>
        )}

        {/* Rear Wheel */}
        <g transform="translate(182, 56)">
          <circle cx="0" cy="0" r="9" fill="#0b0d10" stroke={strokeColor} strokeWidth="1" />
          <circle cx="0" cy="0" r="5" stroke={strokeColor} strokeWidth="0.7" strokeDasharray="2 1.5" />
          <circle cx="0" cy="0" r="2" fill="rgba(255, 255, 255, 0.7)" />
        </g>

        {/* Front Wheel */}
        <g transform="translate(66, 56)">
          <circle cx="0" cy="0" r="9" fill="#0b0d10" stroke={strokeColor} strokeWidth="1" />
          <circle cx="0" cy="0" r="5" stroke={strokeColor} strokeWidth="0.7" strokeDasharray="2 1.5" />
          <circle cx="0" cy="0" r="2" fill="rgba(255, 255, 255, 0.7)" />
        </g>
      </svg>
    </div>
  );
};

export default BusIllustration;
