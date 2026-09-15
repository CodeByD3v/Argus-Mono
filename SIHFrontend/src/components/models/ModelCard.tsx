import React from 'react';
import { ArrowUpRight, Box, Layers, CheckCircle2 } from 'lucide-react';
import { ReconstructedModel } from '../../types';
import { ModelIllustration } from './ModelIllustration';

interface ModelCardProps {
  model: ReconstructedModel;
  isSelected?: boolean;
  onSelect?: () => void;
  onOpen3D?: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isSelected = false,
  onSelect,
  onOpen3D,
}) => {
  const isReady = model.status === '3D Ready';

  return (
    <div
      onClick={onSelect}
      className={`glass-panel rounded-xl p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-white/[0.14] shadow-[0_0_24px_rgba(0,0,0,0.8)] ring-1 ring-white/20'
          : 'glass-card-hover'
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-white tracking-wide truncate max-w-[105px]">
            {model.name}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpen3D) onOpen3D();
            }}
            title="Inspect 3D Model"
            className="text-white/30 hover:text-emerald-400 transition-colors"
          >
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="text-[8.5px] font-mono text-white/35 mt-0.5 truncate">{model.timestamp}</div>
      </div>

      {/* 3D Model Blueprint Illustration */}
      <div className="my-0.5">
        <ModelIllustration
          modelType={model.modelType}
          isReady={isReady}
        />
      </div>

      {/* Status & Point Cloud Metrics */}
      <div className="flex items-center justify-between pt-0.5 text-[9px]">
        {/* Status Badge */}
        <div
          className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-medium flex items-center space-x-1 ${
            isReady
              ? 'bg-emerald-500/15 text-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.25)]'
              : 'bg-[#F4A62A]/15 text-[#F4A62A]'
          }`}
        >
          <span>{model.status}</span>
        </div>

        {/* Telemetry Point Count */}
        <div className="flex items-center space-x-1 text-white/40 font-mono text-[8px]">
          <span className="text-white/60">{model.pointCount}</span>
          <span className="text-white/30 font-sans text-[7px]">PTS</span>
        </div>
      </div>

      {/* Mini Trajectory & Reconstructed Path Slider */}
      <div className="mt-1 pt-1 border-t border-white/[0.04]">
        <div className="w-full h-8 glass-panel-sub rounded-lg relative overflow-hidden mb-1 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 160 36">
            <line x1="0" y1="18" x2="160" y2="18" stroke="rgba(255,255,255,0.04)" />
            <line x1="80" y1="0" x2="80" y2="36" stroke="rgba(255,255,255,0.04)" />

            <polyline
              points="18,28 52,12 95,22 142,8"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            <polyline
              points="18,28 52,12 88,18"
              fill="none"
              stroke={isReady ? '#34D399' : 'rgba(255,255,255,0.6)'}
              strokeWidth="1.4"
            />

            <circle cx="18" cy="28" r="1.5" fill="white" />
            <circle cx="52" cy="12" r="1.5" fill="white" />
            <circle cx="95" cy="22" r="1.5" fill="white" />
            <circle cx="142" cy="8" r="1.5" fill="white" />

            <g transform="translate(88, 18)">
              <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.15)" />
              <circle cx="0" cy="0" r="2" fill={isReady ? '#34D399' : '#FFFFFF'} />
            </g>
          </svg>
        </div>

        {/* Timeline Slider with Ticks */}
        <div className="flex items-center justify-between text-[8px] font-mono text-white/35 mb-0.5">
          <span>{model.timeRange.start}</span>
          <span>{model.timeRange.end}</span>
        </div>

        <div className="relative w-full h-2 flex items-center px-0.5">
          <div className="w-full flex justify-between items-center opacity-40">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`w-[1px] bg-white ${i % 4 === 0 ? 'h-1.5 bg-white/70' : 'h-1 bg-white/30'}`}
              />
            ))}
          </div>

          <div
            className="absolute top-0 bottom-0 flex items-center -ml-1 cursor-grab"
            style={{ left: `${model.progressPosition}%` }}
          >
            <div
              className={`w-1.5 h-2 rounded-[1.5px] shadow-[0_0_5px_rgba(255,255,255,0.8)] flex items-center justify-center ${
                isReady ? 'bg-emerald-400' : 'bg-white'
              }`}
            >
              <div className="w-[1px] h-1 bg-black/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
