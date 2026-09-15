import React, { useMemo, useState, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ArrowUpRight
} from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

interface WaveformSample {
  index: number;
  height: number; // percentage 0-100
  status: 'nominal' | 'warning' | 'error';
  label: string;
  timestampStr: string;
  confidence: number;
  timeSec: number;
}

interface EventMarker {
  id: string;
  label: string;
  timeStr: string;
  timeSec: number;
  color: string;
  dotColor: string;
}

export const FlightTimeline: React.FC = () => {
  const {
    isPlaying,
    togglePlay,
    currentFrame,
    totalFrames,
    currentSeconds,
    subFrame,
    totalSeconds,
    playbackSpeed,
    setSpeed,
    seekToFrame,
    seekToSeconds,
    altitudeM,
    gsdCmPx,
    reconstructedPointsStr,
    rtkStatus,
  } = useReconstruction();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const NUM_BARS = 150; // Exactly ~150 high-density SVG bars
  const SVG_WIDTH = 1200;
  const SVG_HEIGHT = 68;
  const BAR_WIDTH = 4.6;
  const TOTAL_PITCH = (SVG_WIDTH - BAR_WIDTH) / (NUM_BARS - 1);

  // Pipeline event checkpoints in exact required order from the brief
  const eventMarkers: EventMarker[] = useMemo(
    () => [
      { id: 'ev-0', label: 'TAKEOFF', timeStr: '00:00', timeSec: 0, color: 'text-white/45 hover:text-white', dotColor: '#9CA3AF' },
      { id: 'ev-1', label: 'GPS DRIFT', timeStr: '00:45', timeSec: 45, color: 'text-[#f2a93c]/75 hover:text-[#f2a93c]', dotColor: '#f2a93c' },
      { id: 'ev-2', label: 'MOTION BLUR', timeStr: '01:18', timeSec: 78, color: 'text-[#f0574f]/75 hover:text-[#f0574f]', dotColor: '#f0574f' },
      { id: 'ev-3', label: 'OCCLUSION FILL', timeStr: '02:15', timeSec: 135, color: 'text-[#f2a93c]/75 hover:text-[#f2a93c]', dotColor: '#f2a93c' },
      { id: 'ev-4', label: 'DENSE RECONSTRUCTION', timeStr: '03:45', timeSec: 225, color: 'text-[#33d17a]/75 hover:text-[#33d17a]', dotColor: '#33d17a' },
      { id: 'ev-5', label: 'LANDING', timeStr: '04:32', timeSec: 272, color: 'text-white/45 hover:text-white', dotColor: '#9CA3AF' },
    ],
    []
  );

  // Generate 150 deterministic, data-driven waveform samples with per-frame confidence
  const samples: WaveformSample[] = useMemo(() => {
    return Array.from({ length: NUM_BARS }).map((_, i) => {
      const pos = i / (NUM_BARS - 1);
      const timeSec = Math.round(pos * totalSeconds);
      const m = Math.floor(timeSec / 60);
      const s = timeSec % 60;
      const timestampStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

      // Organic signal curve mapped to reconstruction confidence
      const baseSignal =
        54 +
        Math.sin(pos * Math.PI * 3.4) * 26 +
        Math.cos(pos * Math.PI * 7.2) * 12 +
        ((i % 4) * 2.4);
      const height = Math.max(18, Math.min(94, Math.round(baseSignal)));

      let status: 'nominal' | 'warning' | 'error' = 'nominal';
      let label = 'Nominal Reconstruction (99.4%)';
      let confidence = 99.4 - ((i % 3) * 0.4);

      if (pos >= 0.25 && pos <= 0.32) {
        status = 'error';
        label = 'Motion Blur Detected (14px)';
        confidence = 72.1 + (i % 5);
      } else if (pos >= 0.14 && pos <= 0.19) {
        status = 'warning';
        label = 'GPS Drift & Dilution (PDOP 3.6)';
        confidence = 84.6 + (i % 4);
      } else if (pos >= 0.47 && pos <= 0.53) {
        status = 'warning';
        label = 'Occlusion Fill In-Progress (312 pts)';
        confidence = 88.2 + (i % 4);
      }

      return {
        index: i,
        height,
        status,
        label,
        timestampStr,
        confidence,
        timeSec,
      };
    });
  }, [NUM_BARS, totalSeconds]);

  // Current playhead fractional position [0, 1]
  const currentRatio = totalFrames > 0 ? Math.max(0, Math.min(1, currentFrame / totalFrames)) : 0;
  const playheadSvgX = currentRatio * SVG_WIDTH;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePointerSeek = useCallback(
    (clientX: number) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      seekToFrame(Math.round(ratio * totalFrames));
    },
    [seekToFrame, totalFrames]
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerSeek(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      handlePointerSeek(e.clientX);
    }
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const sampleIdx = Math.min(NUM_BARS - 1, Math.floor(ratio * NUM_BARS));
    setHoveredIndex(sampleIdx);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Jump to Previous Event
  const handlePrevEvent = () => {
    const currentSec = currentSeconds;
    const prev = [...eventMarkers].reverse().find((ev) => ev.timeSec < currentSec - 2);
    if (prev) {
      seekToSeconds(prev.timeSec);
    } else {
      seekToSeconds(0);
    }
  };

  // Jump to Next Event
  const handleNextEvent = () => {
    const currentSec = currentSeconds;
    const next = eventMarkers.find((ev) => ev.timeSec > currentSec + 1);
    if (next) {
      seekToSeconds(next.timeSec);
    } else {
      seekToSeconds(totalSeconds);
    }
  };

  // Speed cycle: 1x -> 2x -> 4x -> 0.5x
  const handleCycleSpeed = () => {
    const speeds = [1, 2, 4, 0.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };

  return (
    <div className="w-full h-full grid grid-cols-12 gap-2.5 select-none text-white">
      {/* ─── Panel 7: METRIC ACCURACY (matching UI.jpeg) ─── */}
      <div
        className="col-span-5 rounded-[14px] p-3.5 flex flex-col justify-between overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(16, 18, 20, 0.95) 0%, rgba(10, 12, 13, 0.88) 55%, rgba(4, 6, 8, 0.98) 100%)',
          backdropFilter: 'blur(16px)',
          border: 'none',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.65)',
        }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-white/55">
            METRIC ACCURACY
          </div>
          <div className="flex items-baseline space-x-1.5 mt-0.5">
            <span className="text-[20px] font-bold tracking-tight text-white leading-none font-mono tabular-nums">
              &plusmn; 1.42
            </span>
            <span className="text-[11px] font-mono text-white/90">cm</span>
            <span className="text-[9.5px] font-normal tracking-wide text-white/45 font-mono ml-1">
              Average Spatial Variance
            </span>
          </div>
        </div>

        {/* Metric Parameters Table (matching UI.jpeg) */}
        <div className="space-y-1 pt-1.5 text-[8.5px] font-mono">
          <div className="flex items-center justify-between text-white/35 font-medium tracking-wider pb-0.5">
            <span>PARAMETER</span>
            <span>VALUE</span>
            <span className="text-right">STATUS</span>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-white/60">GPS ACC.</span>
            <span className="text-white/90 font-medium tabular-nums">1.42 m</span>
            <span className="text-[#34d399] font-medium flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>VALID</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-white/60">ALTITUDE</span>
            <span className="text-white/90 font-medium tabular-nums">128.9 m</span>
            <span className="text-[#34d399] font-medium flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>VALID</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-white/60">CAMERA POSE</span>
            <span className="text-white/90 font-medium tabular-nums">0.18&deg;</span>
            <span className="text-[#34d399] font-medium flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>STABLE</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-white/60">GSD</span>
            <span className="text-white/90 font-medium tabular-nums">2.4 cm</span>
            <span className="text-[#34d399] font-medium flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>VALID</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-white/60">RTK / PPK</span>
            <span className="text-white/90 font-medium">FIXED</span>
            <span className="text-[#34d399] font-medium flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>VALID</span>
            </span>
          </div>
        </div>
      </div>

      {/* ─── Panel 8: RECONSTRUCTED MODEL (matching UI.jpeg) ─── */}
      <div
        className="col-span-7 rounded-[14px] p-3.5 flex flex-col justify-between overflow-hidden relative"
        style={{
          background: 'linear-gradient(180deg, rgba(16, 18, 20, 0.95) 0%, rgba(10, 12, 13, 0.88) 55%, rgba(4, 6, 8, 0.98) 100%)',
          backdropFilter: 'blur(16px)',
          border: 'none',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.65)',
        }}
      >
        {/* Header Row: Title, Big Metric, Stats Cluster (matching UI.jpeg) */}
        <div className="flex items-center justify-between pb-1 shrink-0">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
              RECONSTRUCTED MODEL
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-[20px] font-bold tracking-tight text-white leading-none font-mono tabular-nums">
                1.73M
              </span>
              <span className="text-[9.5px] font-medium tracking-wider text-white/45 uppercase font-mono">
                DENSE POINTS
              </span>
            </div>
          </div>

          {/* Right Header Stats Cluster (matching UI.jpeg) */}
          <div className="flex items-center space-x-4 font-mono text-[8.5px]">
            <div className="flex flex-col">
              <span className="text-white/40 uppercase">POINT CLOUD</span>
              <span className="text-white font-medium">1.73M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 uppercase">MESH</span>
              <span className="text-white font-medium">1.18M TRIANGLES</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 uppercase">TEXTURE</span>
              <span className="text-white font-medium">4K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 uppercase">COVERAGE</span>
              <span className="text-[#34d399] font-medium">94.2%</span>
            </div>
          </div>
            <div className="flex items-center space-x-1.5 pl-1.5">
              {/* Previous Event Button */}
              <button
                type="button"
                onClick={handlePrevEvent}
                className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                title="Previous Pipeline Event"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              {/* Filled Circular Morphing Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(255,255,255,0.3)] relative overflow-hidden"
                title={isPlaying ? 'Pause Timeline' : 'Play Timeline'}
              >
                {/* Smooth crossfade morph between Play triangle and Pause bars */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-out"
                  style={{ opacity: isPlaying ? 1 : 0 }}
                >
                  <Pause className="w-2.5 h-2.5 fill-black text-black" />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-out"
                  style={{ opacity: !isPlaying ? 1 : 0 }}
                >
                  <Play className="w-2.5 h-2.5 fill-black text-black ml-0.5" />
                </div>
              </button>

              {/* Next Event Button */}
              <button
                type="button"
                onClick={handleNextEvent}
                className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                title="Next Pipeline Event"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              {/* Speed Toggle: 1x -> 2x -> 4x -> 0.5x */}
              <button
                type="button"
                onClick={handleCycleSpeed}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono text-white/45 hover:text-white hover:bg-white/[0.08] transition-all tabular-nums"
                title="Cycle Speed (1x -> 2x -> 4x -> 0.5x)"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>

        {/* ─── Custom 150-Bar HD Inline SVG Waveform Track ─── */}
        <div className="relative w-full flex-1 flex flex-col justify-end mt-1 min-h-[58px] select-none">
          {/* Waveform SVG */}
          <div className="relative w-full h-[52px] cursor-ew-resize group">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <defs>
                {/* 1. Green Nominal Gradient (#33d17a palette) */}
                <linearGradient id="wf-nominal-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33d17a" stopOpacity="1.0" />
                  <stop offset="100%" stopColor="#1e7b48" stopOpacity="0.55" />
                </linearGradient>

                {/* 2. Amber Degraded / GPS Drift Gradient (#f2a93c palette) */}
                <linearGradient id="wf-warning-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f2a93c" stopOpacity="1.0" />
                  <stop offset="100%" stopColor="#9e6617" stopOpacity="0.60" />
                </linearGradient>

                {/* 3. Red Motion Blur Gradient (#f0574f palette) */}
                <linearGradient id="wf-error-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0574f" stopOpacity="1.0" />
                  <stop offset="100%" stopColor="#992b25" stopOpacity="0.65" />
                </linearGradient>

                {/* Playhead Halo Glow Filter */}
                <filter id="playhead-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Render 150 Pill-Shaped Glassy Bars */}
              {samples.map((sample) => {
                const x = sample.index * TOTAL_PITCH;
                const barHeight = (sample.height / 100) * (SVG_HEIGHT - 6);
                const y = SVG_HEIGHT - barHeight;

                const isPast = x <= playheadSvgX;
                const isHovered = hoveredIndex === sample.index;
                const isAnyHovered = hoveredIndex !== null;

                let fillUrl = 'url(#wf-nominal-grad)';
                let glowFilter = '';

                if (sample.status === 'error') {
                  fillUrl = 'url(#wf-error-grad)';
                } else if (sample.status === 'warning') {
                  fillUrl = 'url(#wf-warning-grad)';
                }

                // Opacity rules:
                let opacity = isPast ? 0.95 : 0.22;
                if (isAnyHovered) {
                  opacity = isHovered ? 1.0 : 0.15;
                }

                return (
                  <rect
                    key={sample.index}
                    x={x}
                    y={y}
                    width={BAR_WIDTH}
                    height={barHeight}
                    rx={BAR_WIDTH / 2}
                    ry={BAR_WIDTH / 2}
                    fill={fillUrl}
                    opacity={opacity}
                    filter={isHovered ? glowFilter : undefined}
                    style={{
                      transformOrigin: `${x + BAR_WIDTH / 2}px ${SVG_HEIGHT}px`,
                      transform: isHovered ? 'scaleY(1.08)' : 'scaleY(1)',
                      transition: 'transform 120ms ease-out, opacity 120ms ease-out',
                    }}
                  />
                );
              })}

              {/* Real-Time Glowing Playhead Line & Top Knob */}
              <line
                x1={playheadSvgX}
                y1="0"
                x2={playheadSvgX}
                y2={SVG_HEIGHT}
                stroke="#FFFFFF"
                strokeWidth="1.8"
                filter="url(#playhead-glow)"
                className="pointer-events-none"
              />
              <circle
                cx={playheadSvgX}
                cy="3.2"
                r="3.2"
                fill="#FFFFFF"
                filter="url(#playhead-glow)"
                className="pointer-events-none"
              />
            </svg>

            {/* Dynamic Hover Tooltip with Timestamp & Confidence */}
            {hoveredIndex !== null && samples[hoveredIndex] && (
              <div
                className="absolute -top-7 pointer-events-none z-30 px-2.5 py-1 rounded-[6px] text-[9px] font-mono text-white/95 shadow-2xl flex items-center space-x-2"
                style={{
                  left: `${(hoveredIndex / (NUM_BARS - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                  background: 'rgba(6, 8, 10, 0.96)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="text-white/60">{samples[hoveredIndex].timestampStr}</span>
                <span className="text-white/20">|</span>
                <span
                  className={
                    samples[hoveredIndex].status === 'error'
                      ? 'text-[#f0574f] font-semibold'
                      : samples[hoveredIndex].status === 'warning'
                      ? 'text-[#f2a93c] font-semibold'
                      : 'text-[#33d17a] font-semibold'
                  }
                >
                  {samples[hoveredIndex].confidence.toFixed(1)}%
                </span>
                <span className="text-white/80">{samples[hoveredIndex].label}</span>
              </div>
            )}
          </div>

          {/* ─── Event Markers Row (Exact Required Order from Brief) ─── */}
          <div className="relative w-full h-[16px] flex justify-between items-center text-[8.5px] font-mono px-0.5 pt-1">
            {eventMarkers.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => seekToSeconds(ev.timeSec)}
                className={`flex items-center space-x-1.5 ${ev.color} transition-all duration-150 hover:scale-105 active:scale-95`}
                title={`Seek to ${ev.label} (${ev.timeStr})`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: ev.dotColor }}
                />
                <span className="font-medium">
                  {ev.timeStr} [{ev.label}]
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTimeline;
