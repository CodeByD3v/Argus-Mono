import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

interface MissionStatusCountersProps {
  completedCount?: number;
  progressPercentVal?: number;
}

export const MissionStatusCounters: React.FC<MissionStatusCountersProps> = ({
  completedCount = 3,
  progressPercentVal = 74,
}) => {
  const { open3DViewer, togglePlay } = useReconstruction();

  return (
    <div className="grid grid-cols-2 gap-2 shrink-0 select-none">
      {/* ─── Panel 1 (Left): MODELS RECONSTRUCTED ─── */}
      <div
        onClick={() => open3DViewer()}
        className="rounded-[14px] p-3 flex flex-col justify-between cursor-pointer group transition-all duration-200"
        style={{
          background: 'linear-gradient(180deg, rgba(16, 18, 20, 0.95) 0%, rgba(10, 12, 13, 0.88) 55%, rgba(4, 6, 8, 0.98) 100%)',
          backdropFilter: 'blur(16px)',
          border: 'none',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.65)',
        }}
        title="Inspect Completed Single-Pass Reconstructions"
      >
        {/* Header with Custom Line-Drawn 3D Model SVG Icon & Expand Arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            <span className="text-[11px] font-mono uppercase text-white/55 tracking-wider truncate group-hover:text-white transition-colors">
              MODELS RECONSTRUCTED
            </span>
          </div>
          <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white transition-colors" />
        </div>

        {/* Big Tabular Metric & Sub-label */}
        <div className="flex items-end justify-between mt-2">
          <div className="flex items-center space-x-1.5 pb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#33d17a] shadow-[0_0_6px_#33d17a]" />
            <span className="text-[8.5px] font-mono uppercase text-white/40 tracking-wide">
              FROM SINGLE-PASS VIDEO
            </span>
          </div>

          <div className="text-[26px] font-bold font-mono tabular-nums tracking-tight text-white leading-none">
            {completedCount.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* ─── Panel 1 (Right): PIPELINE STAGE ─── */}
      <div
        onClick={togglePlay}
        className="rounded-[14px] p-3 flex flex-col justify-between cursor-pointer group transition-all duration-200"
        style={{
          background: 'linear-gradient(180deg, rgba(16, 18, 20, 0.95) 0%, rgba(10, 12, 13, 0.88) 55%, rgba(4, 6, 8, 0.98) 100%)',
          backdropFilter: 'blur(16px)',
          border: 'none',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.65)',
        }}
        title="Toggle Real-Time Pipeline Stream"
      >
        {/* Header with Custom Pipeline Node Gear SVG Icon & Expand Arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="18" r="3" />
              <path d="M6 9v12" />
              <path d="M18 9a9 9 0 0 1-9 9H6" />
            </svg>
            <span className="text-[11px] font-mono uppercase text-white/55 tracking-wider truncate group-hover:text-white transition-colors">
              PIPELINE STAGE
            </span>
          </div>
          <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white transition-colors" />
        </div>

        {/* Big Tabular Metric & Sub-label */}
        <div className="flex items-end justify-between mt-2">
          <div className="flex items-center space-x-1.5 pb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2a93c] shadow-[0_0_6px_#f2a93c] animate-pulse" />
            <span className="text-[8.5px] font-mono text-[#f2a93c] uppercase tracking-wide truncate max-w-[85px]">
              DENSE POINT CLOUD
            </span>
          </div>

          <div className="flex items-baseline space-x-0.5 text-white">
            <span className="text-[26px] font-bold font-mono tabular-nums tracking-tight leading-none">
              {progressPercentVal}
            </span>
            <span className="text-[11px] font-mono text-white/40 uppercase">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatusCounters;
