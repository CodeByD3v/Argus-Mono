import React, { useState } from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

export const FlightTelemetryCard: React.FC = () => {
  const { currentFrame, totalFrames } = useReconstruction();

  // Compute live duration from current frame if playing, or display mission 04:32
  const progress = totalFrames > 0 ? Math.min(1, currentFrame / totalFrames) : 0;
  const currentSecs = Math.floor(progress * 272); // 4m 32s = 272s
  const mins = Math.floor(currentSecs / 60).toString().padStart(2, '0');
  const secs = (currentSecs % 60).toString().padStart(2, '0');
  const displayTime = currentFrame > 0 ? `${mins}:${secs}` : '04:32';

  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.88) 0%, rgba(12, 12, 12, 0.92) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

  // Drone position along the altitude curve: x from 40 to 260
  const droneX = 40 + progress * (260 - 40);
  // Parabolic arc equation for altitude curve
  const normalizedX = (droneX - 150) / 110;
  const droneY = 32 + normalizedX * normalizedX * 18;

  return (
    <div
      style={cardStyle}
      className="group relative overflow-hidden rounded-[18px] p-3.5 flex flex-col justify-between flex-1 min-h-[160px] select-none cursor-default border border-white/[0.08] hover:border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(52,211,153,0.10)] transition-all duration-150 hover:-translate-y-0.5"
    >
      {/* Zero-latency pure CSS hover atmospheric sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(26,38,28,0.85)_0%,rgba(14,14,14,0.92)_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col justify-between h-full">
      {/* ─── 1. HEADER (FLIGHT TELEMETRY | ● GPS LOCKED + ↗) ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
            FLIGHT TELEMETRY
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Glowing Green Status Pill Badge (Matching Image 2) */}
          <div
            className="px-2 py-0.5 rounded-full text-[#34d399] text-[8.5px] font-medium flex items-center space-x-1.5 shadow-[0_0_8px_rgba(52,211,153,0.2)]"
            style={{
              background: 'rgba(13, 40, 24, 0.65)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            <span>GPS LOCKED</span>
          </div>

          <ArrowUpRight className="w-3.5 h-3.5 text-white/35 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
        </div>
      </div>

      {/* ─── 2. BIG METRIC: 04:32 Capture Duration ─── */}
      <div className="flex items-baseline space-x-2 my-1">
        <span className="text-[30px] font-bold font-mono tabular-nums tracking-tight text-white leading-none">
          {displayTime}
        </span>
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wide">
          Capture Duration
        </span>
      </div>

      {/* ─── 3. ALTITUDE TRAJECTORY CURVE WITH DRONE MARKER ─── */}
      <div className="relative w-full h-[48px] my-1">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 65" preserveAspectRatio="none">
          {/* Ground Baseline with Waypoint Tick Marks */}
          <line x1="30" y1="56" x2="270" y2="56" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          {[30, 90, 150, 210, 270].map((tx) => (
            <g key={tx}>
              <line x1={tx} y1="53" x2={tx} y2="59" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <circle cx={tx} cy="56" r="1.2" fill="rgba(255,255,255,0.4)" />
            </g>
          ))}

          {/* Smooth Flight Elevation Arc */}
          <path
            d="M 30 52 Q 150 18 270 52"
            fill="none"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Vertical Drop Guideline from Drone to Ground */}
          <line
            x1={droneX}
            y1={droneY}
            x2={droneX}
            y2="56"
            stroke="#34d399"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.7"
          />
          <circle cx={droneX} cy="56" r="1.5" fill="#34d399" />

          {/* Active FPV Drone Crosshair Indicator at Current Position */}
          <g transform={`translate(${droneX}, ${droneY})`}>
            {/* Pulsating Green Target Ping */}
            <circle cx="0" cy="0" r="6" fill="none" stroke="#34d399" strokeWidth="0.7" strokeDasharray="2 1.5" className="animate-spin" />
            {/* Central Drone Dot */}
            <circle cx="0" cy="0" r="2.2" fill="#34d399" stroke="#ffffff" strokeWidth="0.7" />
            {/* Drone Rotor Blades Arms Icon */}
            <line x1="-5" y1="-3" x2="5" y2="3" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="-5" y1="3" x2="5" y2="-3" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* ─── 4. 5 HORIZONTAL TELEMETRY VALUES STRIP ─── */}
      <div className="grid grid-cols-5 gap-1 pt-2 border-t border-white/[0.05] text-[8px] font-mono">
        {/* Col 1: VIDEO */}
        <div>
          <div className="text-white/40 uppercase">VIDEO</div>
          <div className="text-white font-medium mt-0.5">4K · 30 FPS</div>
        </div>

        {/* Col 2: GPS */}
        <div>
          <div className="text-white/40 uppercase">GPS</div>
          <div className="text-[#34d399] font-medium mt-0.5">LOCKED</div>
        </div>

        {/* Col 3: ALTITUDE */}
        <div>
          <div className="text-white/40 uppercase">ALTITUDE</div>
          <div className="text-white font-medium mt-0.5">128.9 m</div>
        </div>

        {/* Col 4: SPEED */}
        <div>
          <div className="text-white/40 uppercase">SPEED</div>
          <div className="text-white font-medium mt-0.5">8.4 m/s</div>
        </div>

        {/* Col 5: HEADING */}
        <div>
          <div className="text-white/40 uppercase">HEADING</div>
          <div className="text-white font-medium mt-0.5">127°</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FlightTelemetryCard;
