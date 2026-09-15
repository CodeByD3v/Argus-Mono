import React from 'react';
import { ArrowUpRight, Signal, Navigation, Play } from 'lucide-react';
import { Vehicle } from '../../data';
import { BusIllustration } from './BusIllustration';

interface BusCardProps {
  vehicle: Vehicle;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const BusCard: React.FC<BusCardProps> = ({
  vehicle,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`rounded-[12px] p-2.5 flex flex-col justify-between transition-all duration-150 cursor-pointer overflow-hidden border ${
        isSelected
          ? 'bg-[#1D1D20] border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.06)]'
          : 'bg-[#161618] border-[rgba(255,255,255,0.08)] hover:border-white/15'
      }`}
    >
      {/* 1. Header Row: Name & Expand Arrow */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#F5F5F4] tracking-tight">
            {vehicle.name}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9A9E] hover:text-[#F5F5F4] transition-colors" />
        </div>
        <div className="text-[9px] text-[#9A9A9E] mt-0.5 font-sans">
          {vehicle.timestamp}
        </div>
      </div>

      {/* 2. Bus Illustration */}
      <div className="my-1">
        <BusIllustration
          routeCode={vehicle.routeCode}
          badgeSymbol={vehicle.badgeSymbol}
          isElectric={vehicle.isElectric}
        />
      </div>

      {/* 3. Status & Telemetry Row */}
      <div className="flex items-center justify-between pt-1 border-t border-[rgba(255,255,255,0.05)] text-[9.5px]">
        {/* Status indicator: Online with green dot */}
        <div className="flex items-center space-x-1.5 text-[#3ECF6E]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF6E] inline-block shadow-[0_0_6px_rgba(62,207,110,0.5)]" />
          <span className="font-normal text-[10px]">{vehicle.status}</span>
        </div>

        {/* GPS & LTE Telemetry */}
        <div className="flex items-center space-x-2 text-[#9A9A9E] text-[9px]">
          <span className="flex items-center space-x-0.5">
            <span className="text-[#5C5C60] text-[8px]">!rd</span>
            <Navigation className="w-2.5 h-2.5 text-[#9A9A9E] fill-none" />
            <span className="text-[#F5F5F4]/90">GPS</span>
          </span>
          <span className="flex items-center space-x-0.5">
            <Signal className="w-2.5 h-2.5 text-[#9A9A9E]" />
            <span className="text-[#F5F5F4]/90">LTE</span>
          </span>
        </div>
      </div>

      {/* 4. Mini Route Map & Scrubber Bar (Only on Bus 6023 and Bus 4120) */}
      {vehicle.hasRouteMap && (
        <div className="mt-1 pt-1.5 border-t border-[rgba(255,255,255,0.05)]">
          {/* Mini Street Map & Polyline */}
          <div className="w-full h-[42px] rounded-md bg-[#0D0E10] border border-white/[0.04] relative overflow-hidden mb-1 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 140 42">
              {/* Subtle background street grid lines */}
              <line x1="0" y1="21" x2="140" y2="21" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="70" y1="0" x2="70" y2="42" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="30" y1="0" x2="30" y2="42" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="110" y1="0" x2="110" y2="42" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

              {/* Vehicle Route Polyline */}
              {vehicle.id === 'bus-6023' ? (
                <>
                  <polyline
                    points="15,34 52,14 85,30 120,8"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <polyline
                    points="15,34 52,14 78,25"
                    fill="none"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.3"
                  />
                  {/* Waypoint dots */}
                  <circle cx="15" cy="34" r="1.5" fill="white" />
                  <circle cx="52" cy="14" r="1.5" fill="white" />
                  {/* Active Pin with Halo */}
                  <circle cx="78" cy="25" r="4" fill="rgba(255,255,255,0.2)" />
                  <circle cx="78" cy="25" r="1.8" fill="#FFFFFF" />
                </>
              ) : (
                <>
                  <polyline
                    points="16,12 55,32 92,16 125,28"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <polyline
                    points="16,12 55,32 76,22"
                    fill="none"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.3"
                  />
                  {/* Active Pin */}
                  <circle cx="76" cy="22" r="4" fill="rgba(255,255,255,0.2)" />
                  <circle cx="76" cy="22" r="1.8" fill="#FFFFFF" />
                </>
              )}
            </svg>
          </div>

          {/* Time range labels */}
          <div className="flex items-center justify-between text-[8.5px] text-[#9A9A9E] mb-0.5 px-0.5">
            <span>{vehicle.timeRange?.start}</span>
            <span>{vehicle.timeRange?.end}</span>
          </div>

          {/* Waveform / Ticks Scrubber Bar with Play button */}
          <div className="flex items-center space-x-1.5 px-0.5">
            <button
              type="button"
              className="w-3.5 h-3.5 rounded-full bg-white/[0.08] hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors shrink-0"
              title="Play telemetry playback"
            >
              <Play className="w-2 h-2 fill-white text-white translate-x-[0.5px]" />
            </button>

            <div className="relative flex-1 h-3 flex items-center">
              {/* Ticks Bar */}
              <div className="w-full flex justify-between items-center opacity-40">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[1px] ${
                      i % 4 === 0 ? 'h-2.5 bg-white/70' : 'h-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Scrubber Playhead Thumb */}
              <div
                className="absolute top-0 bottom-0 flex items-center -ml-1 cursor-grab"
                style={{ left: `${vehicle.sliderPercent || 50}%` }}
              >
                <div className="w-1.5 h-3 bg-white rounded-[1.5px] shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusCard;
