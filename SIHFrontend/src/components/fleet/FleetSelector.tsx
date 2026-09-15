import React from 'react';

export type DroneCategory = 'drone' | 'vtol' | 'fixed_wing' | 'quad';

interface FleetSelectorProps {
  selected?: DroneCategory;
  onChange?: (category: DroneCategory) => void;
}

export const FleetSelector: React.FC<FleetSelectorProps> = ({
  selected = 'drone',
  onChange = () => {},
}) => {
  const options: { id: DroneCategory; label: string }[] = [
    { id: 'drone', label: '24 Drone' },
    { id: 'vtol', label: '100 VTOL' },
    { id: 'fixed_wing', label: '12 Fixed-Wing' },
    { id: 'quad', label: '13 Quad' },
  ];

  return (
    <div className="w-full shrink-0 select-none">
      {/* Pill Container matching the reference design */}
      <div
        style={{
          background: 'rgba(18, 18, 18, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        }}
        className="grid grid-cols-4 gap-1 p-1 rounded-full"
      >
        {options.map((opt) => {
          const isActive = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`py-1.5 px-1 text-center rounded-full text-[11px] font-medium transition-all duration-200 truncate ${
                isActive
                  ? 'bg-[#2a2a2a] text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)] border border-white/10'
                  : 'text-white/45 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FleetSelector;
