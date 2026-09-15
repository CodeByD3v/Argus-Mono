import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

export const DiagnosticsPanel: React.FC = () => {
  const { jumpToIncident, gsdCmPx, rtkStatus } = useReconstruction();
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);

  return (
    <div className="w-[260px] lg:w-[275px] instrument-surface rounded-[8px] p-3 flex flex-col justify-between select-none overflow-hidden text-white pointer-events-auto">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/90">
            Pipeline Diagnostics
          </span>
          <ChevronUp className="w-3 h-3 text-white/30 cursor-pointer" />
        </div>

        {/* Section 1: Reconstruction Anomalies (Phase 6) */}
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center space-x-1 text-[8.5px] font-mono text-white/35 uppercase">
            <Layers className="w-2.5 h-2.5 text-white/20" />
            <span>Reconstruction (02 Active)</span>
          </div>

          {/* Incident 1: Motion Blur Detected */}
          <div className="space-y-1">
            <div
              onClick={() => {
                setIsExpanded1(!isExpanded1);
                jumpToIncident('inc-blur');
              }}
              className="flex items-center justify-between cursor-pointer py-0.5 group"
            >
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_3px_#FF3B30]" />
                <span className="text-[10.5px] font-normal text-white/90 group-hover:text-white transition-colors">
                  Motion Blur Detected
                </span>
              </div>
              <div className="flex items-center space-x-1 text-[8px] font-mono text-white/35">
                <span>01:18</span>
                {isExpanded1 ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
              </div>
            </div>

            {/* Indented Details */}
            {isExpanded1 && (
              <div className="pl-3.5 ml-0.5 border-l border-white/10 space-y-1 py-0.5 text-[8px]">
                <div>
                  <div className="text-white/35 text-[7px] font-mono uppercase">Affected Area:</div>
                  <div className="text-white/85 font-medium mt-0.5">North-East Facade</div>
                  <div className="text-white/35 text-[7px]">14 px motion blur</div>
                </div>

                <div>
                  <div className="text-white/85 font-medium">Junction Waypoint 2</div>
                  <div className="text-white/35 text-[7px]">High yaw rate (18.4°/s)</div>
                </div>
              </div>
            )}
          </div>

          {/* Incident 2: GPS Drift */}
          <div
            onClick={() => {
              setIsExpanded2(!isExpanded2);
              jumpToIncident('inc-gps');
            }}
            className="flex items-center justify-between cursor-pointer py-0.5 group"
          >
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4A62A]" />
              <span className="text-[10.5px] font-normal text-white/90 group-hover:text-white transition-colors">
                GPS Drift
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[8px] font-mono text-white/35">
              <span>00:45</span>
              {isExpanded2 ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </div>
          </div>

          {isExpanded2 && (
            <div className="pl-3.5 ml-0.5 border-l border-white/10 py-0.5 text-[7.5px] text-white/35 font-mono">
              0.8 m estimated deviation • VIO active
            </div>
          )}

          {/* Incident 3: Dynamic Objects */}
          <div
            onClick={() => {
              setIsExpanded3(!isExpanded3);
              jumpToIncident('inc-dyn');
            }}
            className="flex items-center justify-between cursor-pointer py-0.5 group"
          >
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#43D66B]" />
              <span className="text-[10.5px] font-normal text-white/90 group-hover:text-white transition-colors">
                Dynamic Objects
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[8px] font-mono text-white/35">
              <span>02:15</span>
              {isExpanded3 ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </div>
          </div>

          {isExpanded3 && (
            <div className="pl-3.5 ml-0.5 border-l border-white/10 py-0.5 text-[7.5px] text-white/35 font-mono">
              312 objects masked • Zero ghosting
            </div>
          )}
        </div>

        {/* Section 2: AI Correction */}
        <div className="mt-2 pt-1.5 border-t border-white/[0.04]">
          <div className="flex items-center space-x-1 text-[#43D66B] font-mono text-[7px] uppercase tracking-wider">
            <Sparkles className="w-2 h-2" />
            <span>AI CORRECTION</span>
          </div>
          <div className="text-white/70 text-[7.5px] mt-0.5 leading-snug">
            Wiener deconvolution &amp; Keyframe interpolation
          </div>
        </div>

        {/* Section 3: Quality Flags */}
        <div className="mt-2 pt-1.5 border-t border-white/[0.04]">
          <div className="flex items-center space-x-1 text-white/30 font-mono text-[7px] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-2 h-2" />
            <span>QUALITY FLAGS</span>
          </div>
          <div className="flex items-center justify-between text-[7.5px] font-mono text-white/60">
            <span>GSD: <span className="text-white">{gsdCmPx} cm/px</span></span>
            <span>•</span>
            <span>RTK: <span className="text-[#43D66B]">{rtkStatus}</span></span>
            <span>•</span>
            <span>ERR: <span className="text-white">0.38 px</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
