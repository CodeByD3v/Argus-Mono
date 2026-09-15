import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface OperationalModule {
  id: string;
  title: string;
  type: 'sfm' | 'gaussians' | 'metrology' | 'masking';
  metric1Value: string;
  metric1Label: string;
  metric2Value: string;
  metric2Label: string;
  metric3Value: string;
  metric3Label: string;
  statusBadge: string;
  statusColor: 'green' | 'amber' | 'red' | 'blue';
  categories?: string[];
  timeRange?: { start: string; end: string };
  sliderPosition?: number;
}

interface OperationalModuleCardProps {
  module: OperationalModule;
  isSelected?: boolean;
  onSelect?: () => void;
  onInspect?: () => void;
}

export const OperationalModuleCard: React.FC<OperationalModuleCardProps> = ({
  module,
  isSelected = false,
  onSelect,
  onInspect,
}) => {
  const [outputMode, setOutputMode] = useState<'MESH' | 'POINT CLOUD' | 'GAUSSIAN SPLATS'>('MESH');

  return (
    <div
      onClick={onSelect}
      className={`rounded-[14px] p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer overflow-hidden group select-none ${
        isSelected
          ? 'bg-white/[0.12] shadow-xl'
          : 'hover:bg-white/[0.04]'
      }`}
      style={{
        background: 'linear-gradient(180deg, rgba(16, 18, 20, 0.95) 0%, rgba(10, 12, 13, 0.88) 55%, rgba(4, 6, 8, 0.98) 100%)',
        backdropFilter: 'blur(16px)',
        border: 'none',
        boxShadow: '0 14px 36px rgba(0, 0, 0, 0.65)',
      }}
    >
      {/* Header with Custom SVG Line-Drawn Glyphs & Expand Arrow */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            {/* Custom SVG Line-Drawn Glyph per Subject */}
            {module.type === 'sfm' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            )}

            {module.type === 'gaussians' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}

            {module.type === 'metrology' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M4 19L10 5" />
                <path d="M14 5L20 19" />
                <path d="M12 8v2" />
                <path d="M12 14v2" />
              </svg>
            )}

            {module.type === 'masking' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            )}

            <span className="text-[10px] font-mono uppercase text-white/55 tracking-wider truncate group-hover:text-white transition-colors">
              {module.title}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onInspect) onInspect();
            }}
            title="Inspect Subsystem"
            className="text-white/30 hover:text-white transition-colors shrink-0"
          >
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dual-Mode Output Selector for Textured 3D Reconstruction */}
        {module.type === 'gaussians' && (
          <div className="flex items-center space-x-1 mt-1">
            {(['MESH', 'POINT CLOUD', 'GAUSSIAN SPLATS'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOutputMode(mode);
                }}
                className={`px-1.5 py-0.2 text-[7px] font-mono rounded transition-colors ${
                  outputMode === mode
                    ? 'bg-white/20 text-white font-medium shadow-sm'
                    : 'text-white/35 hover:text-white/70 bg-white/[0.03]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom SVG Mini-Visualization with Gradient Fill beneath lines */}
      <div className="my-0.5">
        <div className="w-full py-0.5 flex items-center justify-center">
          <svg
            viewBox="0 0 240 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[36px] select-none overflow-visible"
          >
            <defs>
              <linearGradient id={`mod-grad-${module.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#33d17a" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#33d17a" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Module 1: Neural SfM & Pose */}
            {module.type === 'sfm' && (
              <g transform="translate(18, 0)">
                <path d="M 0 38 L 30 28 L 65 32 L 100 16 L 140 12 L 180 8 L 180 48 L 0 48 Z" fill={`url(#mod-grad-${module.id})`} />
                <path d="M 0 38 L 30 28 L 65 32 L 100 16 L 140 12 L 180 8" stroke="#33d17a" strokeWidth="1.4" strokeLinecap="round" />
                <polygon points="26,24 34,24 30,30" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="0.8" />
                <polygon points="96,12 104,12 100,18" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="0.8" />
                <polygon points="176,4 184,4 180,10" fill="rgba(51,209,122,0.3)" stroke="#33d17a" strokeWidth="0.8" />
                <circle cx="180" cy="8" r="1.6" fill="#33d17a" />
              </g>
            )}

            {/* Module 2: Textured 3D Reconstruction */}
            {module.type === 'gaussians' && (
              <g transform="translate(20, 0)">
                <path d="M 0 42 L 35 30 L 70 18 L 105 24 L 140 14 L 175 10 L 175 48 L 0 48 Z" fill={`url(#mod-grad-${module.id})`} />
                <path d="M 0 42 L 35 30 L 70 18 L 105 24 L 140 14 L 175 10" stroke="#33d17a" strokeWidth="1.4" strokeLinecap="round" />
                <polygon points="65,14 75,14 70,20" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" fill="none" />
                <polygon points="135,10 145,10 140,16" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" fill="none" />
                <circle cx="175" cy="10" r="1.6" fill="#33d17a" />
              </g>
            )}

            {/* Module 3: Roads & Infrastructure */}
            {module.type === 'metrology' && (
              <g transform="translate(20, 0)">
                <path d="M 0 36 L 40 32 L 80 20 L 120 16 L 160 12 L 180 10 L 180 48 L 0 48 Z" fill={`url(#mod-grad-${module.id})`} />
                <path d="M 0 36 L 40 32 L 80 20 L 120 16 L 160 12 L 180 10" stroke="#33d17a" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="80" y1="16" x2="80" y2="24" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="120" y1="12" x2="120" y2="20" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="180" cy="10" r="1.6" fill="#33d17a" />
              </g>
            )}

            {/* Module 4: Dynamic Object Masking */}
            {module.type === 'masking' && (
              <g transform="translate(20, 0)">
                <path d="M 0 40 L 35 36 L 70 22 L 105 18 L 140 14 L 175 8 L 175 48 L 0 48 Z" fill={`url(#mod-grad-${module.id})`} />
                <path d="M 0 40 L 35 36 L 70 22 L 105 18 L 140 14 L 175 8" stroke="#33d17a" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="70" cy="22" r="1.5" fill="#f0574f" />
                <circle cx="105" cy="18" r="1.5" fill="#f2a93c" />
                <circle cx="175" cy="8" r="1.8" fill="#33d17a" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="flex items-center justify-between text-[8.5px] pt-0.5">
        <div className="flex items-baseline space-x-1">
          <span className="text-white font-mono font-bold tabular-nums text-[11px]">{module.metric1Value}</span>
          <span className="text-white/40 text-[7.5px] font-mono uppercase">{module.metric1Label}</span>
        </div>

        <span
          className={`font-mono text-[8px] font-bold uppercase ${
            module.statusColor === 'green'
              ? 'text-[#33d17a]'
              : module.statusColor === 'blue'
              ? 'text-[#5fb8ff]'
              : module.statusColor === 'red'
              ? 'text-[#f0574f]'
              : 'text-[#f2a93c]'
          }`}
        >
          {module.statusBadge}
        </span>
      </div>

      {/* Secondary Metrics Row */}
      <div className="flex items-center justify-between text-[8px] font-mono text-white/40 pt-0.5">
        <span>
          <span className="text-white/85 font-medium tabular-nums">{module.metric2Value}</span> {module.metric2Label}
        </span>
        <span>
          <span className="text-white/85 font-medium tabular-nums">{module.metric3Value}</span> {module.metric3Label}
        </span>
      </div>

      {/* Categories Row */}
      {module.categories && (
        <div className="flex items-center space-x-1 pt-1 text-[7px] font-mono text-white/35 overflow-hidden">
          {module.categories.map((cat) => (
            <span key={cat} className="bg-white/[0.04] px-1 py-0.2 rounded whitespace-nowrap">
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default OperationalModuleCard;
