import React, { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { fleetTabs, fleetCounters, vehicles } from '../../data';
import { OperationalEfficiency } from './OperationalEfficiency';
import { BusCard } from './BusCard';

interface FleetSidebarProps {
  selectedVehicleId?: string;
  onSelectVehicle?: (id: string) => void;
}

export const FleetSidebar: React.FC<FleetSidebarProps> = ({
  selectedVehicleId = 'bus-6023',
  onSelectVehicle,
}) => {
  const [activeFleetTab, setActiveFleetTab] = useState<string>('bus');

  return (
    <aside className="w-[335px] xl:w-[345px] shrink-0 h-full flex flex-col justify-between gap-2.5 select-none overflow-hidden">
      {/* 1. Fleet Type Tabs (Row of 4 Pill Buttons) */}
      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {fleetTabs.map((tab) => {
          const isActive = activeFleetTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFleetTab(tab.id)}
              className={`py-1.5 px-1.5 rounded-full text-[11px] transition-all duration-150 text-center truncate ${
                isActive
                  ? 'bg-[#2A2A2E] text-[#F5F5F4] font-medium shadow-sm'
                  : 'bg-[#1F1F22] text-[#9A9A9E] hover:text-[#F5F5F4] font-normal'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Online / Offline Split Card */}
      <div className="rounded-[14px] bg-[#161618] border border-[rgba(255,255,255,0.08)] grid grid-cols-2 p-3 shrink-0">
        {/* Left: Online */}
        <div className="pr-3 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 text-[12px] text-[#9A9A9E]">
            <span className="w-2 h-2 rounded-full bg-[#3ECF6E] shadow-[0_0_8px_rgba(62,207,110,0.6)]" />
            <span>Online</span>
          </div>
          <div className="text-[34px] font-light tracking-tight text-[#F5F5F4] leading-none mt-2.5 tabular-nums font-sans">
            {fleetCounters.online}
          </div>
        </div>

        {/* Vertical Hairline Divider */}
        <div className="pl-3 border-l border-[rgba(255,255,255,0.06)] flex flex-col justify-between">
          {/* Right: Offline */}
          <div className="flex items-center space-x-1.5 text-[12px] text-[#9A9A9E]">
            <TriangleAlert className="w-3.5 h-3.5 text-[#E5484D] stroke-[2]" />
            <span>Offline</span>
          </div>
          <div className="text-[34px] font-light tracking-tight text-[#F5F5F4] leading-none mt-2.5 tabular-nums font-sans">
            {fleetCounters.offline}
          </div>
        </div>
      </div>

      {/* 3. Operational Efficiency Card */}
      <div className="shrink-0">
        <OperationalEfficiency />
      </div>

      {/* 4. Vehicle Tiles (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        {vehicles.map((v) => (
          <BusCard
            key={v.id}
            vehicle={v}
            isSelected={v.id === selectedVehicleId}
            onSelect={() => onSelectVehicle?.(v.id)}
          />
        ))}
      </div>
    </aside>
  );
};

export default FleetSidebar;
