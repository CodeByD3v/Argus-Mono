import React from 'react';

interface DroneIllustrationProps {
  droneCode: string;
  badgeSymbol?: string;
  isVTOL?: boolean;
  highlightPayload?: boolean;
}

export const DroneIllustration: React.FC<DroneIllustrationProps> = ({
  droneCode,
  badgeSymbol = 'L',
  isVTOL = false,
  highlightPayload = false,
}) => {
  const strokeColor = 'rgba(255, 255, 255, 0.60)';
  const dimmedStroke = 'rgba(255, 255, 255, 0.25)';
  const orangeAccent = '#f97316';

  return (
    <div className="w-full py-1 flex items-center justify-center select-none">
      <svg
        viewBox="0 0 240 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[52px] overflow-visible"
      >
        <defs>
          {highlightPayload && (
            <filter id="betaflightOrangeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#f97316" floodOpacity="0.9" />
            </filter>
          )}
        </defs>

        {/* ─── 1. CARBON FIBER X-FRAME CHASSIS & MOTOR ARMS ─── */}
        {/* Front-Left Arm (Extending from center plate to Motor 1) */}
        <path
          d="M 98 34 L 46 17 L 38 21 L 94 40 Z"
          fill="rgba(255, 255, 255, 0.03)"
          stroke={strokeColor}
          strokeWidth="0.9"
        />
        {/* Rear-Left Arm (Extending to Motor 2) */}
        <path
          d="M 98 42 L 46 59 L 38 55 L 94 36 Z"
          fill="rgba(255, 255, 255, 0.03)"
          stroke={strokeColor}
          strokeWidth="0.9"
        />
        {/* Front-Right Arm (Extending to Motor 3) */}
        <path
          d="M 142 34 L 194 17 L 202 21 L 146 40 Z"
          fill="rgba(255, 255, 255, 0.03)"
          stroke={strokeColor}
          strokeWidth="0.9"
        />
        {/* Rear-Right Arm (Extending to Motor 4) */}
        <path
          d="M 142 42 L 194 59 L 202 55 L 146 36 Z"
          fill="rgba(255, 255, 255, 0.03)"
          stroke={strokeColor}
          strokeWidth="0.9"
        />

        {/* Arm Carbon Chamfer / Stress-Relief Slot Cuts */}
        <line x1="84" y1="33" x2="52" y2="21" stroke={dimmedStroke} strokeWidth="0.7" strokeDasharray="1.5 2" />
        <line x1="84" y1="43" x2="52" y2="55" stroke={dimmedStroke} strokeWidth="0.7" strokeDasharray="1.5 2" />
        <line x1="156" y1="33" x2="188" y2="21" stroke={dimmedStroke} strokeWidth="0.7" strokeDasharray="1.5 2" />
        <line x1="156" y1="43" x2="188" y2="55" stroke={dimmedStroke} strokeWidth="0.7" strokeDasharray="1.5 2" />

        {/* ─── 2. 4 HIGH-KV MOTORS & BETAFLIGHT TRI-BLADE PROPELLERS ─── */}
        {/* Motor 1: Front-Left (Motor Hub cx=42, cy=19) */}
        <g transform="translate(42, 19)">
          {/* Prop Sweep Outer Guard Ring (Faint) */}
          <ellipse cx="0" cy="0" rx="25" ry="9" stroke={dimmedStroke} strokeWidth="0.6" strokeDasharray="2 2" />
          {/* Tri-Blade 1 (North-East) */}
          <path d="M 0 0 C 8 -3, 16 -8, 24 -4 C 18 1, 10 -1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 2 (South) */}
          <path d="M 0 0 C 2 5, -2 8, -6 7 C -6 3, -3 1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 3 (North-West) */}
          <path d="M 0 0 C -10 -4, -18 -2, -22 -6 C -14 -9, -6 -5, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Motor Bell & Lock Nut */}
          <circle cx="0" cy="0" r="5" fill="#0c1015" stroke={strokeColor} strokeWidth="1.1" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Motor 2: Rear-Left (Motor Hub cx=42, cy=57) */}
        <g transform="translate(42, 57)">
          <ellipse cx="0" cy="0" rx="25" ry="9" stroke={dimmedStroke} strokeWidth="0.6" strokeDasharray="2 2" />
          {/* Tri-Blade 1 */}
          <path d="M 0 0 C 8 3, 16 8, 24 4 C 18 -1, 10 1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 2 */}
          <path d="M 0 0 C 2 -5, -2 -8, -6 -7 C -6 -3, -3 -1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 3 */}
          <path d="M 0 0 C -10 4, -18 2, -22 6 C -14 9, -6 5, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="#0c1015" stroke={strokeColor} strokeWidth="1.1" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Motor 3: Front-Right (Motor Hub cx=198, cy=19) */}
        <g transform="translate(198, 19)">
          <ellipse cx="0" cy="0" rx="25" ry="9" stroke={dimmedStroke} strokeWidth="0.6" strokeDasharray="2 2" />
          {/* Tri-Blade 1 */}
          <path d="M 0 0 C -8 -3, -16 -8, -24 -4 C -18 1, -10 -1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 2 */}
          <path d="M 0 0 C -2 5, 2 8, 6 7 C 6 3, 3 1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 3 */}
          <path d="M 0 0 C 10 -4, 18 -2, 22 -6 C 14 -9, 6 -5, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="#0c1015" stroke={strokeColor} strokeWidth="1.1" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Motor 4: Rear-Right (Motor Hub cx=198, cy=57) */}
        <g transform="translate(198, 57)">
          <ellipse cx="0" cy="0" rx="25" ry="9" stroke={dimmedStroke} strokeWidth="0.6" strokeDasharray="2 2" />
          {/* Tri-Blade 1 */}
          <path d="M 0 0 C -8 3, -16 8, -24 4 C -18 -1, -10 1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 2 */}
          <path d="M 0 0 C -2 -5, 2 -8, 6 -7 C 6 -3, 3 -1, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          {/* Tri-Blade 3 */}
          <path d="M 0 0 C 10 4, 18 2, 22 6 C 14 9, 6 5, 0 0" fill="rgba(255,255,255,0.08)" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="#0c1015" stroke={strokeColor} strokeWidth="1.1" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* ─── 3. CENTRAL FPV QUAD MAIN BODY & FLIGHT CONTROLLER STACK ─── */}
        {/* Bottom Carbon Plate Silhouette */}
        <path
          d="M 88 38 
             C 88 27, 98 22, 120 22 
             C 142 22, 152 27, 152 38 
             C 152 49, 142 54, 120 54 
             C 98 54, 88 49, 88 38 Z"
          fill="#0c1015"
          stroke={strokeColor}
          strokeWidth="1.1"
        />

        {/* Top Carbon Deck Plate with Anodized Standoffs */}
        <rect x="94" y="25" width="52" height="26" rx="3" stroke={strokeColor} strokeWidth="0.85" fill="rgba(255,255,255,0.02)" />
        {/* 4 Standoff Posts */}
        <circle cx="97" cy="28" r="1.5" fill="#ffffff" />
        <circle cx="143" cy="28" r="1.5" fill="#ffffff" />
        <circle cx="97" cy="48" r="1.5" fill="#ffffff" />
        <circle cx="143" cy="48" r="1.5" fill="#ffffff" />

        {/* ─── 4. FPV TILTED NOSE CAMERA POD (Front: x=152 to 166) ─── */}
        {!highlightPayload ? (
          /* Standard FPV Camera Bracket & Lens */
          <g transform="translate(152, 38)">
            {/* Carbon Camera Side Plates */}
            <path d="M 0 -8 L 8 -6 L 10 0 L 8 6 L 0 8 Z" fill="rgba(255,255,255,0.04)" stroke={strokeColor} strokeWidth="0.9" />
            {/* Tilted FPV Camera Barrel & Lens */}
            <rect x="4" y="-5" width="7" height="10" rx="1.5" fill="#080b0e" stroke={strokeColor} strokeWidth="0.8" />
            <circle cx="11" cy="0" r="3.2" fill="#080b0e" stroke={strokeColor} strokeWidth="0.9" />
            <circle cx="11" cy="0" r="1.4" fill="#ffffff" />
            {/* Lens flare ray */}
            <line x1="14" y1="0" x2="20" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="1.5 1" />
          </g>
        ) : (
          /* NEON ORANGE FPV RACING CAMERA & SENSOR POD (For Unit 4 / E-Drone 07) */
          <g transform="translate(152, 38)" stroke={orangeAccent} filter="url(#betaflightOrangeGlow)">
            <path d="M 0 -8 L 9 -6 L 12 0 L 9 6 L 0 8 Z" fill="rgba(249,115,22,0.15)" strokeWidth="1.2" />
            <rect x="4" y="-5" width="8" height="10" rx="1.5" fill="#080b0e" strokeWidth="1" />
            <circle cx="12" cy="0" r="3.8" fill="rgba(249,115,22,0.3)" strokeWidth="1.1" />
            <circle cx="12" cy="0" r="1.8" fill={orangeAccent} />
            <line x1="16" y1="0" x2="24" y2="0" strokeWidth="1.1" strokeDasharray="2 1.5" />
            {/* Left & Right Neon Orange LED Race Wire Strips on Arms */}
            <line x1="-54" y1="-14" x2="-26" y2="-4" strokeWidth="1.4" />
            <line x1="-54" y1="14" x2="-26" y2="4" strokeWidth="1.4" />
          </g>
        )}

        {/* ─── 5. REAR 5.8GHZ VTX LOLLIPOP ANTENNA (Aft: x=88 to 72) ─── */}
        <g transform="translate(88, 38)">
          <line x1="0" y1="0" x2="-14" y2="0" stroke={strokeColor} strokeWidth="1.1" />
          {/* Lollipop Antenna Head */}
          <circle cx="-16" cy="0" r="3.5" fill="#080b0e" stroke={strokeColor} strokeWidth="0.9" />
          <circle cx="-16" cy="0" r="1.2" fill="#ffffff" />
          {/* Dual Immortal-T Crossfire Antenna Whiskers */}
          <line x1="-7" y1="-8" x2="-7" y2="8" stroke={strokeColor} strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* ─── 6. CENTRAL HUD IDENTIFICATION BADGE CAPSULE ─── */}
        <g transform="translate(90, 29)">
          <rect
            x="0"
            y="0"
            width="60"
            height="18"
            rx="3"
            stroke={strokeColor}
            strokeWidth="0.85"
            fill="rgba(0, 0, 0, 0.88)"
          />
          {/* Badge Icon Circle */}
          <circle cx="10.5" cy="9" r="5" stroke={strokeColor} strokeWidth="0.8" fill="rgba(255,255,255,0.06)" />
          <text
            x="10.5"
            y="12"
            fill="rgba(255, 255, 255, 0.92)"
            fontSize="8.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {badgeSymbol}
          </text>
          {/* Drone Route / Callcode */}
          <text
            x="36"
            y="12.5"
            fill="rgba(255, 255, 255, 0.95)"
            fontSize="9.5"
            fontWeight="600"
            fontFamily="monospace"
            letterSpacing="0.8"
            textAnchor="middle"
          >
            {droneCode}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DroneIllustration;
