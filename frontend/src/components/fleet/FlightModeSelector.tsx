import React from 'react';

export type ReconstructionLayer = 'all' | 'terrain' | 'facades' | 'infrastructure' | 'vegetation' | 'pointcloud';

interface FlightModeSelectorProps {
  selected: ReconstructionLayer;
  onChange: (mode: ReconstructionLayer) => void;
}

export const FlightModeSelector: React.FC<FlightModeSelectorProps> = ({
  selected,
  onChange,
}) => {
  const modes: { id: ReconstructionLayer; label: string }[] = [
    { id: 'all', label: 'All Layers' },
    { id: 'terrain', label: 'Terrain & DSM' },
    { id: 'facades', label: 'Facades' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  return (
    <div
      className="flex items-center space-x-1 p-1 rounded-[14px] shrink-0 select-none overflow-x-auto shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, rgba(16, 18, 20, 0.95) 0%, rgba(10, 12, 13, 0.88) 55%, rgba(4, 6, 8, 0.98) 100%)',
        backdropFilter: 'blur(16px)',
        border: 'none',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.60)',
      }}
    >
      {modes.map((m) => {
        const isActive = selected === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={`px-3 py-1.5 rounded-[10px] text-[10.5px] transition-all whitespace-nowrap ${
              isActive
                ? 'bg-white/[0.16] text-white font-medium shadow-md'
                : 'text-white/45 hover:text-white/80 hover:bg-white/[0.05]'
            }`}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
};

export default FlightModeSelector;
