import React from 'react';
import { Minus, Square, X, Radio } from 'lucide-react';

export const WindowHeader: React.FC = () => {
  const isElectron = typeof window !== 'undefined' && Boolean(window.electronAPI);

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximizeWindow();
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };

  return (
    <header
      className="w-full h-8 shrink-0 flex items-center justify-between px-3 text-xs border-b border-white/[0.06] bg-[#07090b]/80 backdrop-blur-md select-none z-50"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left: Branding & Status Badge */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <Radio className="w-2.5 h-2.5 animate-pulse" />
        </div>
        <span className="font-mono text-[11px] tracking-wider text-white/90 font-medium uppercase">
          Traffic Ops <span className="text-white/30 font-normal">| Central Command</span>
        </span>
        <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/[0.04] border border-white/[0.08] text-white/50">
          SECURE FEED
        </span>
      </div>

      {/* Center: Subtle Indicator */}
      <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-white/40">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
        <span className="tracking-widest uppercase text-white/40">All Systems Operational</span>
      </div>

      {/* Right: Custom Premium Window Controls (non-draggable) */}
      <div
        className="flex items-center gap-1 -mr-1"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <button
          type="button"
          onClick={handleMinimize}
          className="w-7 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors"
          title="Minimize"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleMaximize}
          className="w-7 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors"
          title="Maximize"
        >
          <Square className="w-2.5 h-2.5" />
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="w-7 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-rose-600/80 hover:shadow-[0_0_10px_rgba(225,29,72,0.4)] transition-all"
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
