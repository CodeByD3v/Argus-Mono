import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

export const ReconstructionQualityCard: React.FC = () => {
  const { metricAccuracy, open3DViewer } = useReconstruction();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Confidence timeline points matching Image 1: 00:00 to 04:32
  const timelinePoints = [
    { time: '00:00', val: 94.8, x: 20, y: 52 },
    { time: '01:00', val: 93.9, x: 80, y: 58 },
    { time: '02:00', val: 95.4, x: 150, y: 46 },
    { time: '03:00', val: 96.0, x: 220, y: 42 },
    { time: '04:32', val: 96.8, x: 285, y: 38 },
  ];

  const overallConfidence = metricAccuracy ? metricAccuracy.toFixed(1) : '95.5';

  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.88) 0%, rgba(12, 12, 12, 0.92) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

  return (
    <div
      onClick={() => open3DViewer()}
      style={cardStyle}
      className="group relative overflow-hidden rounded-[18px] p-3.5 flex flex-col justify-between flex-1 min-h-[165px] select-none cursor-pointer border border-white/[0.08] hover:border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(52,211,153,0.10)] transition-all duration-150 hover:-translate-y-0.5"
      title="Inspect Georeferenced Photogrammetric Accuracy"
    >
      {/* Zero-latency pure CSS hover atmospheric sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(26,38,28,0.85)_0%,rgba(14,14,14,0.92)_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col justify-between h-full">
      {/* ─── 1. HEADER (RECONSTRUCTION QUALITY | ● VALIDATED + ↗) ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          {/* Custom Target Crosshair Icon */}
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="22" y1="12" x2="18" y2="12" />
            <line x1="6" y1="12" x2="2" y2="12" />
            <line x1="12" y1="6" x2="12" y2="2" />
            <line x1="12" y1="22" x2="12" y2="18" />
          </svg>
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
            RECONSTRUCTION QUALITY
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
            <span>VALIDATED</span>
          </div>

          <ArrowUpRight className="w-3.5 h-3.5 text-white/35 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
        </div>
      </div>

      {/* ─── 2. BIG METRIC: 95.5 % Overall Confidence ─── */}
      <div className="flex items-baseline space-x-2 my-1">
        <div className="flex items-baseline space-x-0.5">
          <span className="text-[30px] font-bold font-mono tabular-nums tracking-tight text-white leading-none">
            {overallConfidence}
          </span>
          <span className="text-[13px] font-mono text-white/50">%</span>
        </div>
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wide">
          Overall Confidence
        </span>
      </div>

      {/* ─── 3. CONFIDENCE CURVE SVG CHART (00:00 to 04:32) ─── */}
      <div className="relative w-full h-[52px] my-1">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 300 70"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Faint Horizontal Reference Guideline */}
          <line
            x1="10"
            y1="40"
            x2="290"
            y2="40"
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 3"
          />

          {/* Shaded Area Under Curve */}
          <path
            d="M 20 52 Q 80 58 150 46 T 285 38 L 285 70 L 20 70 Z"
            fill="url(#qualityGradient)"
          />

          {/* Smooth Continuous Confidence Curve Line */}
          <path
            d="M 20 52 Q 80 58 150 46 T 285 38"
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.8"
            strokeLinecap="round"
            filter="drop-shadow(0 0 3px rgba(52,211,153,0.5))"
          />

          {/* Key Convergence Nodes along timeline */}
          {timelinePoints.map((pt, i) => {
            const isLast = i === timelinePoints.length - 1;
            const isHovered = hoverIndex === i;

            return (
              <g
                key={pt.time}
                className="cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
              >
                {/* Outer Glow Ring on final validated point */}
                {isLast && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1"
                    className="animate-ping opacity-60"
                  />
                )}
                {/* Node Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 3.5 : isLast ? 2.8 : 2.0}
                  fill={isLast || isHovered ? '#34d399' : '#ffffff'}
                  stroke="#0c1015"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Crosshair Tooltip */}
        {hoverIndex !== null && (
          <div
            className="absolute -top-6 -translate-x-1/2 px-2 py-0.5 rounded bg-[#0b0e14] border border-white/20 text-[8.5px] font-mono text-white pointer-events-none shadow-lg z-20"
            style={{ left: `${(timelinePoints[hoverIndex].x / 300) * 100}%` }}
          >
            {timelinePoints[hoverIndex].time}: {timelinePoints[hoverIndex].val}%
          </div>
        )}
      </div>

      {/* ─── 4. TIMESTAMPS ROW (00:00 · 01:00 · 02:00 · 03:00 · 04:32) ─── */}
      <div className="flex justify-between text-[8.5px] font-mono text-white/35 px-1 pb-1.5 border-b border-white/[0.04]">
        {timelinePoints.map((pt) => (
          <span key={pt.time}>{pt.time}</span>
        ))}
      </div>

      {/* ─── 5. 3-COLUMN METRICS FOOTER (POSE 97.8% · DEPTH 96.4% · COVERAGE 94.2%) ─── */}
      <div className="grid grid-cols-3 gap-2 pt-2 text-center">
        <div>
          <div className="text-[8px] font-mono uppercase text-white/40 tracking-wider">
            POSE
          </div>
          <div className="text-[11.5px] font-mono font-semibold text-white mt-0.5">
            97.8%
          </div>
        </div>
        <div>
          <div className="text-[8px] font-mono uppercase text-white/40 tracking-wider">
            DEPTH
          </div>
          <div className="text-[11.5px] font-mono font-semibold text-white mt-0.5">
            96.4%
          </div>
        </div>
        <div>
          <div className="text-[8px] font-mono uppercase text-white/40 tracking-wider">
            COVERAGE
          </div>
          <div className="text-[11.5px] font-mono font-semibold text-white mt-0.5">
            94.2%
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ReconstructionQualityCard;
