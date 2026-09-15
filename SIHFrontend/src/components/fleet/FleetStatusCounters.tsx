import React from 'react';

interface FleetStatusCountersProps {
  onlineCount?: number;
  offlineCount?: number;
}

export const FleetStatusCounters: React.FC<FleetStatusCountersProps> = ({
  onlineCount = 12,
  offlineCount = 4,
}) => {
  const glassStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.88) 0%, rgba(12, 12, 12, 0.92) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 w-full shrink-0 select-none">
      {/* Online Card */}
      <div
        style={glassStyle}
        className="group relative rounded-[18px] p-3.5 flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[0_14px_36px_rgba(0,0,0,0.6)] cursor-default"
      >
        {/* Left: Radar Icon + Label */}
        <div className="flex items-center space-x-2.5">
          {/* Concentric Radar / Target Dot Icon */}
          <div className="relative flex items-center justify-center w-5 h-5">
            <span className="absolute w-4 h-4 rounded-full border border-[#3cd070] opacity-80 animate-ping duration-1000" />
            <span className="w-3.5 h-3.5 rounded-full border border-[#3cd070]/70 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3cd070] shadow-[0_0_6px_#3cd070]" />
            </span>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/75 group-hover:text-white transition-colors">
            Online
          </span>
        </div>

        {/* Right: Big Metric */}
        <span className="text-[30px] font-mono font-light tracking-tight text-white leading-none tabular-nums">
          {onlineCount.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Offline Card */}
      <div
        style={glassStyle}
        className="group relative rounded-[18px] p-3.5 flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[0_14px_36px_rgba(0,0,0,0.6)] cursor-default"
      >
        {/* Left: Red Triangle Warning Icon + Label */}
        <div className="flex items-center space-x-2.5">
          {/* Red Warning Triangle Icon */}
          <div className="w-4 h-4 flex items-center justify-center text-[#ef4444]">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" stroke="none">
              <path d="M12 3L2 21h20L12 3z" />
            </svg>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/75 group-hover:text-white transition-colors">
            Offline
          </span>
        </div>

        {/* Right: Big Metric */}
        <span className="text-[30px] font-mono font-light tracking-tight text-white leading-none tabular-nums">
          {offlineCount.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default FleetStatusCounters;
