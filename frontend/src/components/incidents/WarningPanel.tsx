import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Bus, Clock, ArrowRightLeft } from 'lucide-react';
import { warningPanelData } from '../../data';

export const WarningPanel: React.FC = () => {
  const [isWarningOpen, setIsWarningOpen] = useState(true);
  const [isCapacityExpanded, setIsCapacityExpanded] = useState(true);

  if (!isWarningOpen) {
    return (
      <div className="w-[280px] bg-[#161618]/95 backdrop-blur-md rounded-[14px] p-3 border border-[rgba(255,255,255,0.08)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] select-none">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsWarningOpen(true)}
        >
          <span className="text-[13px] font-medium text-[#F5F5F4]">Warning</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#9A9A9E]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[290px] xl:w-[300px] bg-[#161618]/95 backdrop-blur-md rounded-[16px] p-3 flex flex-col justify-between select-none border border-[rgba(255,255,255,0.08)] shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
      {/* 1. Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)] shrink-0">
        <span className="text-[13px] font-medium text-[#F5F5F4]">Warning</span>
        <ChevronUp
          className="w-3.5 h-3.5 text-[#9A9A9E] cursor-pointer hover:text-white transition-colors"
          onClick={() => setIsWarningOpen(false)}
        />
      </div>

      {/* 2. Capacity Issues Section */}
      <div className="space-y-1.5 mt-2 shrink-0">
        {/* Category Header */}
        <div className="flex items-center space-x-1.5 text-[#9A9A9E] text-[11px]">
          <Bus className="w-3.5 h-3.5 stroke-[1.6]" />
          <span>
            {warningPanelData.capacity.category}{' '}
            <span className="text-[#5C5C60]">({warningPanelData.capacity.lineInfo})</span>
          </span>
        </div>

        {/* Red Warning Alert Box */}
        <div className="rounded-[12px] bg-[#221517]/85 border border-[#E5484D]/35 p-2.5 space-y-2 shadow-[0_0_16px_rgba(229,72,77,0.12)]">
          {/* Main Incident Row */}
          <div
            className="flex items-start justify-between cursor-pointer"
            onClick={() => setIsCapacityExpanded(!isCapacityExpanded)}
          >
            <div className="flex items-start space-x-2">
              {/* Red Circle with Minus */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#E5484D] flex items-center justify-center text-white text-[10px] font-bold mt-0.5 shadow-[0_0_8px_rgba(229,72,77,0.6)]">
                −
              </div>
              <div>
                <div className="text-[11.5px] font-medium text-[#F5F5F4] leading-tight">
                  {warningPanelData.capacity.incident.headline}
                </div>
                <div className="text-[9px] text-[#9A9A9E] mt-0.5 font-sans">
                  {warningPanelData.capacity.incident.timestamp}
                </div>
              </div>
            </div>
            <button className="text-[#9A9A9E] hover:text-white transition-colors">
              {isCapacityExpanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Expanded Stations & Recommendation */}
          {isCapacityExpanded && (
            <>
              {/* Affected Stations */}
              <div className="pt-0.5">
                <div className="text-[9.5px] text-[#9A9A9E] mb-1.5">Affected stations:</div>
                <div className="space-y-2 pl-0.5">
                  {warningPanelData.capacity.incident.affectedStations.map((station) => (
                    <div key={station.name} className="flex items-start space-x-2">
                      <div className="w-[2px] h-6 bg-[#E5484D] rounded-full shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] text-[#F5F5F4] font-medium leading-tight">
                          {station.name}
                        </div>
                        <div className="text-[9px] text-[#9A9A9E]">
                          {station.waitingCount} passengers waiting
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation Row */}
              <div className="bg-[#121214]/90 border border-white/[0.06] rounded-[8px] p-2 flex items-center space-x-2">
                <div className="p-1 rounded bg-white/[0.06] text-[#9A9A9E]">
                  <ArrowRightLeft className="w-3 h-3 stroke-[1.75]" />
                </div>
                <div>
                  <div className="text-[8.5px] uppercase tracking-wider text-[#9A9A9E] font-medium">
                    Recommend
                  </div>
                  <div className="text-[10.5px] text-[#F5F5F4] font-medium leading-tight">
                    {warningPanelData.capacity.incident.recommendation}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Schedule Deviations Section */}
      <div className="space-y-1.5 pt-2 mt-2 border-t border-[rgba(255,255,255,0.06)] shrink-0">
        {/* Category Header */}
        <div className="flex items-center space-x-1.5 text-[#9A9A9E] text-[11px]">
          <Clock className="w-3.5 h-3.5 stroke-[1.6]" />
          <span>
            {warningPanelData.scheduleDeviations.category}{' '}
            <span className="text-[#5C5C60]">({warningPanelData.scheduleDeviations.routeInfo})</span>
          </span>
        </div>

        {/* Deviation Row */}
        <div className="rounded-[10px] bg-[#1D1D20] p-2 flex items-start justify-between cursor-pointer hover:border-white/10 transition-all border border-transparent">
          <div className="flex items-start space-x-2">
            {/* Red Alert Dot */}
            <div className="w-2 h-2 rounded-full bg-[#E5484D] mt-1 shadow-[0_0_6px_rgba(229,72,77,0.7)] shrink-0" />
            <div>
              <div className="text-[11px] text-[#F5F5F4] font-medium leading-tight">
                {warningPanelData.scheduleDeviations.incident.headline}
              </div>
              <div className="text-[9px] text-[#9A9A9E] mt-0.5 font-sans">
                {warningPanelData.scheduleDeviations.incident.timestamp}
              </div>
            </div>
          </div>
          <ChevronDown className="w-3 h-3 text-[#9A9A9E] shrink-0 mt-0.5" />
        </div>
      </div>
    </div>
  );
};

export default WarningPanel;
