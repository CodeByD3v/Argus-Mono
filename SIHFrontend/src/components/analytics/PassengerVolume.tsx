import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { livePassengerVolumeData } from '../../data';

export const PassengerVolume: React.FC = () => {
  const { totalToday, bars, timeMarks } = livePassengerVolumeData;

  // Max volume reference is 60k
  const MAX_VOLUME = 60;

  return (
    <div className="h-full rounded-[16px] bg-[#161618] border border-[rgba(255,255,255,0.08)] p-3 flex flex-col justify-between select-none shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#F5F5F4]">
          Live Passenger Volume
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9A9E] hover:text-[#F5F5F4] transition-colors cursor-pointer" />
      </div>

      {/* 2. Big Stat: 142,580 today */}
      <div className="flex items-baseline space-x-1.5 my-0.5">
        <span className="text-[36px] font-light tracking-tight text-[#F5F5F4] leading-none tabular-nums font-sans">
          {totalToday}
        </span>
        <span className="text-[12px] text-[#9A9A9E] font-normal">
          today
        </span>
      </div>

      {/* 3. Bar Chart Area with Equalizer Background, Y-axis and X-axis */}
      <div className="relative w-full flex-1 min-h-0 flex flex-col justify-end">
        {/* Main Chart Stage */}
        <div className="relative w-full flex items-end justify-between pr-9 pl-1 h-[78px]">
          {/* Subtle Equalizer Background Ticks */}
          <div className="absolute inset-0 flex items-end justify-between pr-9 pointer-events-none opacity-15">
            {Array.from({ length: 52 }).map((_, i) => (
              <div
                key={i}
                className="w-[2px] bg-white rounded-full"
                style={{
                  height: `${25 + Math.sin(i * 0.45) * 18 + ((i * 7) % 20)}%`,
                }}
              />
            ))}
          </div>

          {/* 7 Main Volume Bar Columns */}
          {bars.map((bar) => {
            const heightPercent = Math.round((bar.volumeK / MAX_VOLUME) * 100);
            return (
              <div
                key={bar.id}
                className="flex flex-col items-center justify-end h-full z-10 w-9 group cursor-default"
              >
                {/* Value Label above bar */}
                <span className="text-[10px] text-[#9A9A9E] group-hover:text-white font-mono mb-1 transition-colors">
                  {bar.volumeDisplay}
                </span>

                {/* Vertical Bar Capsule */}
                <div className="w-3.5 h-[38px] bg-[#1E1E22] border border-white/15 rounded-full overflow-hidden flex flex-col justify-end p-[1.5px] group-hover:border-white/35 transition-all shadow-sm">
                  <div
                    className="w-full bg-gradient-to-t from-white/25 to-white/60 rounded-full transition-all duration-300"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Percentage Change Label below bar */}
                <span
                  className={`text-[9.5px] font-medium mt-1 font-mono ${
                    bar.isPositive ? 'text-[#3ECF6E]' : 'text-[#E5484D]'
                  }`}
                >
                  {bar.deltaDisplay}
                </span>
              </div>
            );
          })}

          {/* Y-Axis Labels (Right Aligned: 60k top, 0k bottom) */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-[9px] text-[#5C5C60] font-sans pb-5">
            <span>60k</span>
            <span>0k</span>
          </div>
        </div>

        {/* X-Axis Time Labels: 00:00, 06:00, 12:00, 18:00, 24:00 */}
        <div className="flex items-center justify-between text-[9.5px] text-[#5C5C60] px-2 pt-1 border-t border-[rgba(255,255,255,0.06)] font-sans">
          {timeMarks.map((tm) => {
            const isCurrent = tm === '12:00';
            return (
              <span
                key={tm}
                className={isCurrent ? 'text-[#F5F5F4] font-medium' : 'text-[#5C5C60]'}
              >
                {tm}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PassengerVolume;
