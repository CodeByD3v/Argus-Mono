import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Signal, Play, Pause, ChevronRight } from 'lucide-react';
import { DroneVehicle } from '../../types';
import { DroneIllustration } from './DroneIllustration';

interface DroneCardProps {
  drone: DroneVehicle;
  isSelected?: boolean;
  onSelect?: () => void;
  showMapAndSlider?: boolean;
  mapType?: 'diagonal' | 'stepped';
  geoCoordinates?: { lat: number; lng: number; zoom?: number };
}

export const DroneCard: React.FC<DroneCardProps> = ({
  drone,
  isSelected = false,
  onSelect,
  showMapAndSlider = false,
  mapType = 'diagonal',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderPos, setSliderPos] = useState(drone.sliderPosition || 54);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Smooth playhead animation in 100% lockstep with map pin and ticks
  useEffect(() => {
    if (!isPlaying || isDragging) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        setSliderPos((prev) => {
          const next = prev + (delta / 1000) * 10;
          return next > 98 ? 2 : next;
        });
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isDragging]);

  const updatePosFromEvent = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const newPos = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setSliderPos(newPos);
  };

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    updatePosFromEvent(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePosFromEvent(e.clientX);
      }
    };
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // ─── EXACT SYNCHRONIZED PATH COORDINATES MATCHING REFERENCE IMAGE ───
  // Card 1 (diagonal): Starts at pin (65, 25) -> (105, 65) -> (122, 48) -> (130, 56) -> (152, 34)
  // Card 2 (stepped): Starts at pin (80, 24) -> (82, 54) -> (108, 54) -> (108, 38) -> (132, 38) -> (148, 28)
  const getPinCoords = (pct: number) => {
    const t = Math.max(0, Math.min(1, pct / 100));

    if (mapType === 'diagonal') {
      // S1: (65, 25) -> (105, 65) [len = 56.5]
      // S2: (105, 65) -> (122, 48) [len = 24.0]
      // S3: (122, 48) -> (130, 56) [len = 11.3]
      // S4: (130, 56) -> (152, 34) [len = 31.1]
      // Total = 122.9
      const totalLen = 122.9;
      const dist = t * totalLen;

      if (dist <= 56.5) {
        const u = dist / 56.5;
        return { x: 65 + u * (105 - 65), y: 25 + u * (65 - 25) };
      } else if (dist <= 80.5) {
        const u = (dist - 56.5) / 24.0;
        return { x: 105 + u * (122 - 105), y: 65 + u * (48 - 65) };
      } else if (dist <= 91.8) {
        const u = (dist - 80.5) / 11.3;
        return { x: 122 + u * (130 - 122), y: 48 + u * (56 - 48) };
      } else {
        const u = (dist - 91.8) / 31.1;
        return { x: 130 + u * (152 - 130), y: 56 + u * (34 - 56) };
      }
    } else {
      // Stepped:
      // S1: (80, 24) -> (82, 54) [len = 30]
      // S2: (82, 54) -> (108, 54) [len = 26]
      // S3: (108, 54) -> (108, 38) [len = 16]
      // S4: (108, 38) -> (132, 38) [len = 24]
      // S5: (132, 38) -> (148, 28) [len = 18.8]
      // Total = 114.8
      const totalLen = 114.8;
      const dist = t * totalLen;

      if (dist <= 30) {
        const u = dist / 30;
        return { x: 80 + u * (82 - 80), y: 24 + u * (54 - 24) };
      } else if (dist <= 56) {
        const u = (dist - 30) / 26;
        return { x: 82 + u * (108 - 82), y: 54 };
      } else if (dist <= 72) {
        const u = (dist - 56) / 16;
        return { x: 108, y: 54 + u * (38 - 54) };
      } else if (dist <= 96) {
        const u = (dist - 72) / 24;
        return { x: 108 + u * (132 - 108), y: 38 };
      } else {
        const u = (dist - 96) / 18.8;
        return { x: 132 + u * (148 - 132), y: 38 + u * (28 - 38) };
      }
    }
  };

  const pinPos = getPinCoords(sliderPos);

  // USER SPEC: On normal it should be like Image 2, on hover it should be like Image 1
  const activeStyle = isHovered || isSelected;

  const cardStyle: React.CSSProperties = {
    background: activeStyle
      ? 'radial-gradient(ellipse at 15% 15%, rgba(26, 38, 28, 0.82) 0%, rgba(14, 14, 14, 0.92) 75%)' // Like Image 1 (Atmospheric Green Glow)
      : 'linear-gradient(180deg, rgba(20, 20, 20, 0.88) 0%, rgba(12, 12, 12, 0.92) 100%)', // Like Image 2 (Deep Matte Obsidian)
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: activeStyle ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: activeStyle
      ? '0 14px 36px rgba(0, 0, 0, 0.65), 0 0 24px rgba(52, 211, 153, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.10)'
      : '0 10px 28px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    transform: activeStyle ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
      className="group rounded-[20px] p-3 flex flex-col justify-between cursor-pointer overflow-hidden select-none"
    >
      {/* ─── 1. TOP HEADER ─── */}
      <div>
        <div className="flex items-center justify-between">
          <span className={`text-[13px] font-medium tracking-wide transition-colors ${activeStyle ? 'text-white' : 'text-white/90'}`}>
            {drone.name}
          </span>
          <ArrowUpRight
            className={`w-3.5 h-3.5 transition-all duration-200 ${
              activeStyle ? 'text-white translate-x-0.5 -translate-y-0.5' : 'text-white/35'
            }`}
          />
        </div>
        <div className="text-[8.5px] font-mono text-white/35 mt-0.5">
          {drone.timestamp}
        </div>
      </div>

      {/* ─── 2. BETAFLIGHT-STYLE FPV DRONE BLUEPRINT ─── */}
      <div className="my-0.5">
        <DroneIllustration
          droneCode={drone.routeCode}
          badgeSymbol={drone.badgeSymbol}
          isVTOL={drone.type === 'vtol' || drone.type === 'electric'}
          highlightPayload={drone.highlightComponents}
        />
      </div>

      {/* ─── 3. STATUS & TELEMETRY ROW (NO DIVIDER LINE ABOVE ONLINE!) ─── */}
      <div className="flex items-center justify-between pt-1.5 text-[9.5px]">
        {/* Status Pill matching the exact green outline pill from reference */}
        <div
          className="px-2.5 py-0.5 rounded-full text-[#34d399] text-[9px] font-medium flex items-center space-x-1 shadow-[0_0_8px_rgba(52,211,153,0.2)]"
          style={{
            background: 'rgba(13, 40, 24, 0.65)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span>{drone.status}</span>
        </div>

        {/* Telemetry Text: "Ird GPS   LTE" */}
        <div className="flex items-center space-x-2 text-white/45 text-[8.5px]">
          <span className="flex items-center space-x-0.5 font-sans">
            <span className="text-white/35">Ird</span>
            <span className="text-white/60">GPS</span>
          </span>
          <span className="flex items-center space-x-1">
            <Signal className="w-2.5 h-2.5 text-white/50" />
            <span className="text-white/60">LTE</span>
          </span>
        </div>
      </div>

      {/* ─── 4. SEAMLESS UNBOXED MAP & SYNCHRONIZED TIMELINE SCRUBBER ─── */}
      {showMapAndSlider && (
        <div className="mt-2 relative select-none">
          {/* Unboxed Full-Bleed Map Canvas (NO outer box borders! Seamlessly blends with card!) */}
          <div className="-mx-3 w-[calc(100%+24px)] h-[76px] relative overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 160 80" preserveAspectRatio="none">
              {/* ─── REALISTIC PERSPECTIVE STREET NETWORK (Matching Reference Image 2) ─── */}
              <g stroke="rgba(255, 255, 255, 0.055)" strokeWidth="0.8">
                {/* Diagonal primary avenue corridors (35-degree orientation) */}
                <line x1="0" y1="32" x2="160" y2="12" />
                <line x1="0" y1="48" x2="160" y2="28" />
                <line x1="0" y1="64" x2="160" y2="44" />
                <line x1="0" y1="78" x2="160" y2="58" />

                {/* Transverse cross streets */}
                <line x1="24" y1="0" x2="48" y2="80" />
                <line x1="56" y1="0" x2="80" y2="80" />
                <line x1="88" y1="0" x2="112" y2="80" />
                <line x1="120" y1="0" x2="144" y2="80" />
              </g>

              {/* ─── CITY BUILDING PARCELS / BLOCKS (Matching Reference Image 2) ─── */}
              {/* Large angled building block directly behind/beside the route */}
              <polygon
                points="78,22 108,36 88,62 58,48"
                fill="rgba(255, 255, 255, 0.04)"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="0.5"
              />
              {/* Surrounding smaller building blocks */}
              <polygon points="52,58 64,64 58,74 46,68" fill="rgba(255, 255, 255, 0.025)" />
              <polygon points="68,66 78,71 74,80 64,75" fill="rgba(255, 255, 255, 0.03)" />
              <polygon points="112,18 136,28 126,46 102,36" fill="rgba(255, 255, 255, 0.025)" />

              {/* ─── CRISP WHITE FLIGHT CORRIDOR POLYLINE ─── */}
              {mapType === 'diagonal' ? (
                /* Card 1: Exact diagonal route from reference Image 2 */
                <polyline
                  points="65,25 105,65 122,48 130,56 152,34"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 0 2.5px rgba(255,255,255,0.75))"
                />
              ) : (
                /* Card 2: Stepped street corridor */
                <polyline
                  points="80,24 82,54 108,54 108,38 132,38 148,28"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 0 2.5px rgba(255,255,255,0.75))"
                />
              )}

              {/* ─── SYNCHRONIZED WHITE TEARDROP LOCATION PIN ─── */}
              <g transform={`translate(${pinPos.x}, ${pinPos.y})`}>
                {/* White Teardrop Pin Body */}
                <path
                  d="M 0 0 C -3.5 -4, -5 -7, 0 -13 C 5 -7, 3.5 -4, 0 0 Z"
                  fill="#ffffff"
                  filter="drop-shadow(0 0 4px rgba(255,255,255,0.85))"
                />
                {/* Dark Center Dot / Eye (Matching reference Image 2) */}
                <circle cx="0" cy="-8.5" r="2.2" fill="#0d1117" />
                <circle cx="0" cy="-8.5" r="0.8" fill="#ffffff" />
              </g>
            </svg>
          </div>

          {/* ─── TIME BOUNDARY LABELS (DIRECTLY UNDER MAP, UNCLUTTERED) ─── */}
          <div className="flex items-center justify-between text-[11px] font-sans font-normal text-white/65 px-1 mt-1 mb-2">
            <span>{drone.timeRange.start}</span>
            <span>{drone.timeRange.end}</span>
          </div>

          {/* ─── TIMELINE SCRUBBER (NO ENCLOSING PILL WRAPPER - MATCHING REFERENCE IMAGE 2) ─── */}
          <div className="flex items-center space-x-2 px-1">
            {/* Left Circular Play/Pause Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="w-4 h-4 rounded-full bg-white/[0.08] hover:bg-white/[0.18] flex items-center justify-center text-white transition-all shrink-0"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-2 h-2 fill-white text-white" />
              ) : (
                <Play className="w-2 h-2 fill-white text-white translate-x-[0.5px]" />
              )}
            </button>

            {/* Audio Wave / Ruler Ticks Track (Directly on Card Surface) */}
            <div
              ref={sliderRef}
              onMouseDown={handleSliderMouseDown}
              className="relative flex-1 h-4 flex items-center cursor-pointer group/slider"
            >
              {/* Vertical Ticks Bar (Illuminates in 100% lockstep sync directly at the playhead handle) */}
              <div className="w-full flex justify-between items-center pointer-events-none">
                {Array.from({ length: 40 }).map((_, i) => {
                  const tickPct = (i / 39) * 100;
                  const distFromHandle = Math.abs(tickPct - sliderPos);
                  const isDirectlyUnder = distFromHandle < 4.5;
                  const isFlanking = distFromHandle < 8.5;

                  return (
                    <div
                      key={i}
                      className={`w-[1.2px] rounded-full ${
                        isDirectlyUnder
                          ? 'h-3.5 bg-white opacity-95'
                          : isFlanking
                          ? 'h-2.5 bg-white/60 opacity-65'
                          : 'h-2 bg-white/20 opacity-30'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Scrubber Playhead Handle with Subtle Low-Intensity Glow (Zero Lag) */}
              <div
                className="absolute top-0 bottom-0 flex items-center -ml-1.5 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div
                  className="w-2.5 h-3.5 bg-white rounded-[2px] flex items-center justify-center relative"
                  style={{
                    boxShadow: '0 0 3px 0.5px rgba(255, 255, 255, 0.25), 0 1px 2px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {/* Center Vertical Black Notch */}
                  <div className="w-[1px] h-2 bg-black rounded-full" />
                </div>
              </div>
            </div>

            {/* Right Circular Navigation / Arrow Button */}
            <div className="w-4 h-4 rounded-full bg-white/[0.08] hover:bg-white/[0.18] flex items-center justify-center text-white/70 transition-all shrink-0">
              <ChevronRight className="w-2.5 h-2.5 text-white/75" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DroneCard;
