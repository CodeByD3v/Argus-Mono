import React from 'react';
import { useReconstruction } from '../../context/ReconstructionContext';

export const FlightStagesGrid: React.FC = () => {
  const { currentFrame, totalFrames } = useReconstruction();
  const progress = totalFrames > 0 ? Math.max(0, Math.min(1, currentFrame / totalFrames)) : 0;

  const panelStyle = {
    background: 'radial-gradient(ellipse at 50% 50%, rgba(6, 8, 12, 0.78) 0%, rgba(10, 13, 17, 0.45) 55%, rgba(15, 20, 26, 0.02) 100%)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: 'none',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
  };

  return (
    <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 select-none">
      {/* ─── SLOT 3: VIDEO CAPTURE (Top-Left of 2x2 Grid) ─── */}
      <div className="rounded-[14px] p-2.5 flex flex-col justify-between overflow-hidden" style={panelStyle}>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-mono tracking-wider text-white/50 uppercase font-medium">
              Video Capture
            </span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33d17a]" />
              <span className="text-[7.5px] font-mono text-[#33d17a] font-medium">COMPLETE</span>
            </div>
          </div>
          <div className="text-[8px] font-mono text-white/70 mt-0.5">
            4K · 30 FPS
          </div>
        </div>

        {/* Technical SVG: Camera Frustum → Frame Sequence */}
        <div className="w-full flex-1 min-h-[46px] my-1 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 130 40">
            {/* Camera Optical Center */}
            <circle cx="16" cy="20" r="3.2" fill="#040608" stroke="#FFFFFF" strokeWidth="0.8" />
            <circle cx="16" cy="20" r="1.2" fill="#33d17a" />
            <line x1="8" y1="17" x2="8" y2="23" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
            <line x1="8" y1="20" x2="13" y2="20" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />

            {/* Frustum Raycast Lines */}
            <line x1="16" y1="20" x2="48" y2="8" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" strokeDasharray="2 2" />
            <line x1="16" y1="20" x2="48" y2="32" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" strokeDasharray="2 2" />

            {/* Frame Sequence 1 */}
            <rect x="48" y="10" width="18" height="20" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" rx="1" />
            <line x1="57" y1="10" x2="57" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

            {/* Connecting Frame Optical Axis */}
            <line x1="16" y1="20" x2="120" y2="20" stroke="rgba(51, 209, 122, 0.4)" strokeWidth="0.8" strokeDasharray="1.5 2" />

            {/* Frame Sequence 2 */}
            <rect x="74" y="8" width="20" height="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" rx="1" />
            <line x1="84" y1="8" x2="84" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

            {/* Frame Sequence 3 (Active Captured Keyframe) */}
            <rect x="102" y="6" width="22" height="28" fill="rgba(51,209,122,0.08)" stroke="#33d17a" strokeWidth="0.9" rx="1" />
            <circle cx="113" cy="20" r="3" fill="none" stroke="#33d17a" strokeWidth="0.6" />
            <line x1="113" y1="13" x2="113" y2="27" stroke="#33d17a" strokeWidth="0.5" />
            <line x1="106" y1="20" x2="120" y2="20" stroke="#33d17a" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Slot 3 Metrics Footer */}
        <div className="flex items-center justify-between text-[7.5px] font-mono border-t border-white/[0.06] pt-1">
          <div>
            <span className="text-white/40">FRAME </span>
            <span className="text-white font-medium">4,826</span>
          </div>
          <div>
            <span className="text-white/40">DURATION </span>
            <span className="text-white font-medium">04:32</span>
          </div>
        </div>
      </div>

      {/* ─── SLOT 4: POSE / GPS (Top-Right of 2x2 Grid) ─── */}
      <div className="rounded-[14px] p-2.5 flex flex-col justify-between overflow-hidden" style={panelStyle}>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-mono tracking-wider text-white/50 uppercase font-medium">
              Pose / GPS
            </span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33d17a]" />
              <span className="text-[7.5px] font-mono text-[#33d17a] font-medium">VALID</span>
            </div>
          </div>
          <div className="text-[8px] font-mono text-white/70 mt-0.5">
            GPS FIX: RTK / GPS
          </div>
        </div>

        {/* Technical SVG: UAV → Position Node → Trajectory + Uncertainty Ellipse */}
        <div className="w-full flex-1 min-h-[46px] my-1 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 130 40">
            {/* Trajectory Axis */}
            <path
              d="M 10 30 Q 45 12 80 20 T 122 15"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="0.9"
            />

            {/* Position Nodes */}
            <circle cx="10" cy="30" r="1.4" fill="rgba(255,255,255,0.4)" />
            <circle cx="45" cy="16" r="1.4" fill="rgba(255,255,255,0.4)" />
            <circle cx="122" cy="15" r="1.4" fill="rgba(255,255,255,0.4)" />

            {/* Current UAV Position (Node 80, 20) with Dynamic Uncertainty Circle (Green = Valid) */}
            <g transform="translate(80, 20)">
              {/* Uncertainty Circle Boundary */}
              <circle
                cx="0"
                cy="0"
                r="7.5"
                fill="rgba(51, 209, 122, 0.12)"
                stroke="#33d17a"
                strokeWidth="0.7"
                strokeDasharray="2 1.5"
              />

              {/* Minimal UAV Silhouette */}
              <circle cx="0" cy="0" r="2.0" fill="#33d17a" stroke="#FFFFFF" strokeWidth="0.6" />
              <line x1="-4" y1="-2" x2="4" y2="2" stroke="#FFFFFF" strokeWidth="0.6" />
              <line x1="-4" y1="2" x2="4" y2="-2" stroke="#FFFFFF" strokeWidth="0.6" />
            </g>

            {/* Altitude Drop Tick to Ground Line */}
            <line x1="80" y1="20" x2="80" y2="36" stroke="rgba(51, 209, 122, 0.4)" strokeWidth="0.6" strokeDasharray="1 2" />
            <circle cx="80" cy="36" r="1.2" fill="#33d17a" />
          </svg>
        </div>

        {/* Slot 4 Metrics Footer */}
        <div className="flex items-center justify-between text-[7.5px] font-mono border-t border-white/[0.06] pt-1">
          <div>
            <span className="text-white/40">DRIFT </span>
            <span className="text-[#33d17a] font-medium">1.42 m</span>
          </div>
          <div>
            <span className="text-white/40">POSE ERROR </span>
            <span className="text-white font-medium">0.18°</span>
          </div>
        </div>
      </div>

      {/* ─── SLOT 5: SCENE UNDERSTANDING (Bottom-Left of 2x2 Grid) ─── */}
      <div className="rounded-[14px] p-2.5 flex flex-col justify-between overflow-hidden" style={panelStyle}>
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-mono tracking-wider text-white/50 uppercase font-medium">
            Scene Understanding
          </span>
        </div>

        {/* Minimal Technical SVG: Terrain + Building Volumes + Road + Vegetation */}
        <div className="w-full flex-1 min-h-[46px] my-1 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 130 40">
            {/* Terrain Surface Contours */}
            <path d="M 4 30 Q 35 22 68 26 T 126 28" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
            <path d="M 4 36 Q 40 28 75 32 T 126 34" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />

            {/* Road Corridor Line */}
            <path d="M 6 34 Q 50 24 124 30" fill="none" stroke="#F4A62A" strokeWidth="1.0" strokeDasharray="3 2" opacity="0.8" />

            {/* Vegetation Canopy Points */}
            <polygon points="10,27 18,21 24,24 16,30" fill="rgba(51,209,122,0.2)" stroke="#33d17a" strokeWidth="0.6" />
            <circle cx="17" cy="24" r="1.0" fill="#33d17a" />
            <polygon points="106,24 114,19 120,22 112,27" fill="rgba(51,209,122,0.2)" stroke="#33d17a" strokeWidth="0.6" />
            <circle cx="113" cy="21" r="1.0" fill="#33d17a" />

            {/* Building 1 Isometric Volume */}
            <g transform="translate(30, 8)">
              <polygon points="0,18 14,11 28,15 14,22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
              <line x1="0" y1="18" x2="0" y2="7" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
              <line x1="14" y1="22" x2="14" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="0.7" />
              <line x1="28" y1="15" x2="28" y2="4" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
              <polygon points="0,7 14,0 28,4 14,11" fill="rgba(51,209,122,0.12)" stroke="#33d17a" strokeWidth="0.8" />
            </g>

            {/* Building 2 Isometric Volume */}
            <g transform="translate(68, 5)">
              <polygon points="0,20 12,14 24,18 12,24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
              <line x1="0" y1="20" x2="0" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />
              <line x1="12" y1="24" x2="12" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
              <line x1="24" y1="18" x2="24" y2="6" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />
              <polygon points="0,8 12,2 24,6 12,12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.7" />
            </g>
          </svg>
        </div>

        {/* 4 Reconstruction Classes */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7.5px] font-mono border-t border-white/[0.06] pt-1">
          <div className="flex justify-between">
            <span className="text-white/40">BUILDINGS</span>
            <span className="text-white font-medium">94%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">TERRAIN</span>
            <span className="text-white font-medium">97%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">ROADS</span>
            <span className="text-white font-medium">91%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">VEGETATION</span>
            <span className="text-white font-medium">86%</span>
          </div>
        </div>
      </div>

      {/* ─── SLOT 6: RECONSTRUCTION PIPELINE (Bottom-Right of 2x2 Grid) ─── */}
      <div className="rounded-[14px] p-2.5 flex flex-col justify-between overflow-hidden" style={panelStyle}>
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-mono tracking-wider text-white/50 uppercase font-medium">
            Reconstruction Pipeline
          </span>
        </div>

        {/* Functional Pipeline Statuses */}
        <div className="flex-1 flex flex-col justify-center space-y-1 my-0.5 px-1">
          {/* Stage 1: VIDEO */}
          <div className="flex items-center justify-between text-[8px] font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33d17a]" />
              <span className="text-white/80 font-medium">VIDEO</span>
            </div>
            <span className="text-[#33d17a] font-medium text-[7.5px]">COMPLETE</span>
          </div>

          {/* Stage 2: POSE */}
          <div className="flex items-center justify-between text-[8px] font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33d17a]" />
              <span className="text-white/80 font-medium">POSE</span>
            </div>
            <span className="text-[#33d17a] font-medium text-[7.5px]">COMPLETE</span>
          </div>

          {/* Stage 3: DEPTH */}
          <div className="flex items-center justify-between text-[8px] font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33d17a]" />
              <span className="text-white/80 font-medium">DEPTH</span>
            </div>
            <span className="text-[#33d17a] font-medium text-[7.5px]">COMPLETE</span>
          </div>

          {/* Stage 4: MESH (Active Processing) */}
          <div className="flex items-center justify-between text-[8px] font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#33d17a] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#33d17a]" />
              </span>
              <span className="text-[#33d17a] font-medium">MESH</span>
            </div>
            <span className="text-[#33d17a] font-medium text-[7.5px]">PROCESSING</span>
          </div>

          {/* Stage 5: TEXTURE */}
          <div className="flex items-center justify-between text-[8px] font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full border border-white/40" />
              <span className="text-white/45">TEXTURE</span>
            </div>
            <span className="text-white/40 text-[7.5px]">PENDING</span>
          </div>
        </div>

        {/* Minimal Pipeline Accent */}
        <div className="w-full bg-white/[0.06] h-0.5 rounded-full overflow-hidden">
          <div className="bg-[#33d17a] h-full rounded-full" style={{ width: `${Math.min(100, Math.round(75 + progress * 25))}%` }} />
        </div>
      </div>
    </div>
  );
};

export const DroneUnitCard = FlightStagesGrid;
export default FlightStagesGrid;
