import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

export const PhotogrammetricAccuracy: React.FC = () => {
  const { metricAccuracy, open3DViewer } = useReconstruction();

  return (
    <div
      onClick={() => open3DViewer()}
      className="rounded-[14px] p-3.5 flex flex-col justify-between shrink-0 h-[146px] cursor-pointer group select-none transition-all duration-200"
      style={{
        background: 'linear-gradient(180deg, rgba(16, 18, 20, 0.95) 0%, rgba(10, 12, 13, 0.88) 55%, rgba(4, 6, 8, 0.98) 100%)',
        backdropFilter: 'blur(16px)',
        border: 'none',
        boxShadow: '0 14px 36px rgba(0, 0, 0, 0.65)',
      }}
      title="Inspect Georeferenced Photogrammetric Accuracy"
    >
      {/* Header with Custom Target Crosshair SVG Icon & Expand Arrow */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="22" y1="12" x2="18" y2="12" />
            <line x1="6" y1="12" x2="2" y2="12" />
            <line x1="12" y1="6" x2="12" y2="2" />
            <line x1="12" y1="22" x2="12" y2="18" />
          </svg>
          <span className="text-[11px] font-mono uppercase text-white/55 tracking-wider group-hover:text-white transition-colors">
            RECONSTRUCTION QUALITY
          </span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
      </div>

      {/* Primary Metric & Sub-label */}
      <div className="flex items-baseline space-x-2 -mt-0.5">
        <div className="flex items-baseline space-x-0.5">
          <span className="text-[28px] font-bold font-mono tabular-nums tracking-tight text-white leading-none">
            {metricAccuracy ? metricAccuracy.toFixed(1) : '98.2'}
          </span>
          <span className="text-[12px] font-mono text-white/50">%</span>
        </div>
        <span className="text-[9px] font-mono text-white/45 uppercase tracking-wide">
          GEOREFERENCED ACCURACY
        </span>
      </div>

      {/* Target Guideline Callout */}
      <div className="flex items-center justify-between text-[9px] text-white/40 -mt-0.5 font-mono">
        <span>Target</span>
        <span className="text-[#33d17a] font-medium">&gt;90% (SUB-2CM GSD, NO GCP)</span>
      </div>

      {/* Precision Flight-Time SVG Line Chart */}
      <div className="relative w-full h-[48px] mt-0.5">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 320 75" preserveAspectRatio="none">
          <defs>
            <linearGradient id="qualityAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#33d17a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#33d17a" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="18" x2="285" y2="18" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 3" />
          <line x1="0" y1="44" x2="285" y2="44" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 3" />

          {/* Target 90% Guideline */}
          <line x1="0" y1="18" x2="285" y2="18" stroke="#33d17a" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

          {/* Area Fill beneath curve (stop-opacity 0.25 -> 0) */}
          <path
            d="M 0 52 L 25 46 L 55 58 L 85 48 L 120 34 L 155 14 L 185 20 L 220 16 L 255 12 L 285 18 L 285 75 L 0 75 Z"
            fill="url(#qualityAreaGrad)"
          />

          {/* Main Accuracy Curve Line */}
          <path
            d="M 0 52 L 25 46 L 55 58 L 85 48 L 120 34 L 155 14 L 185 20 L 220 16 L 255 12 L 285 18"
            fill="none"
            stroke="#33d17a"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Key Convergence Data Points */}
          <circle cx="155" cy="14" r="2.0" fill="#FFFFFF" />
          <circle cx="220" cy="16" r="1.8" fill="#FFFFFF" />
          <circle cx="255" cy="12" r="2.2" fill="#33d17a" stroke="#FFFFFF" strokeWidth="0.8" />
        </svg>

        {/* Y Axis Right Labels */}
        <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-[7px] font-mono text-white/25 pointer-events-none pl-1">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
        </div>
      </div>

      {/* X Axis Flight Time Duration Labels (Single Flight Pass: 00:00 to 04:32) */}
      <div className="flex justify-between text-[8px] font-mono text-white/30 px-0.5 pt-0.5">
        <span>00:00</span>
        <span>01:00</span>
        <span>02:00</span>
        <span>03:00</span>
        <span>04:32</span>
      </div>
    </div>
  );
};

export default PhotogrammetricAccuracy;
