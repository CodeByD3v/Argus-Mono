import React from 'react';

export const StatusFooter: React.FC = () => {
  return (
    <footer className="w-full h-7 shrink-0 flex items-center justify-between px-5 text-[11px] text-[#5C5C60] select-none z-40 bg-[#0A0A0B]">
      {/* Left: Last updated followed by pulsing green dot */}
      <div className="flex items-center space-x-1.5">
        <span>Last updated: Today, 11:29:32 AM</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF6E] inline-block animate-live-dot shadow-[0_0_6px_rgba(62,207,110,0.6)]" />
      </div>

      {/* Right: Data sync: Real-time followed by pulsing green dot */}
      <div className="flex items-center space-x-1.5">
        <span>Data sync: Real-time</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF6E] inline-block animate-live-dot shadow-[0_0_6px_rgba(62,207,110,0.6)]" />
      </div>
    </footer>
  );
};

export default StatusFooter;
