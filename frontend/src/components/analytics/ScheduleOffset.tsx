import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { scheduleOffsetData } from '../../data';

// Decorative telemetry vertical hatch divider matching UI.png
const ColumnHatchDivider: React.FC = () => (
  <div className="flex items-center justify-center space-x-[2px] opacity-15 px-0.5">
    <div className="w-[1px] h-3 bg-white" />
    <div className="w-[1px] h-3 bg-white" />
    <div className="w-[1px] h-3 bg-white" />
    <div className="w-[1px] h-3 bg-white" />
  </div>
);

export const ScheduleOffset: React.FC = () => {
  return (
    <div className="h-full rounded-[16px] bg-[#161618] border border-[rgba(255,255,255,0.08)] p-3 flex flex-col justify-between select-none shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      {/* 1. Header Row */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#F5F5F4]">
          Schedule Offset
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9A9E] hover:text-[#F5F5F4] transition-colors cursor-pointer" />
      </div>

      {/* 2. Big Stat: ± 2.5 min Average Variance */}
      <div className="flex items-baseline space-x-2 my-0.5">
        <div className="flex items-baseline space-x-1">
          <span className="text-[36px] font-light tracking-tight text-[#F5F5F4] leading-none tabular-nums font-sans">
            ± 2.5
          </span>
          <span className="text-[15px] font-light text-[#9A9A9E] font-sans">
            min
          </span>
        </div>
        <span className="text-[11.5px] text-[#9A9A9E] font-normal ml-1">
          Average Variance
        </span>
      </div>

      {/* 3. Matrix Table */}
      <div className="w-full mt-0.5">
        {/* Table Column Headers */}
        <div className="grid grid-cols-12 text-[11px] text-[#9A9A9E] pb-1 border-b border-[rgba(255,255,255,0.06)] font-sans items-center">
          <div className="col-span-3 pl-1">Route number</div>
          <div className="col-span-9 flex items-center justify-between px-2">
            <span className="w-12 text-center">L1</span>
            <span className="w-12 text-center">L2</span>
            <span className="w-12 text-center">L3</span>
            <span className="w-12 text-center">L5</span>
            <span className="w-12 text-center">L24</span>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[rgba(255,255,255,0.04)] text-[12px]">
          {scheduleOffsetData.rows.map((row) => (
            <div
              key={row.routeNumber}
              className="grid grid-cols-12 py-2 items-center hover:bg-white/[0.02] transition-colors rounded"
            >
              {/* Route Number with Chevron */}
              <div className="col-span-3 flex items-center space-x-1 text-[#F5F5F4] font-mono text-[12px] pl-0.5">
                <ChevronRight className="w-3 h-3 text-[#9A9A9E] stroke-[2]" />
                <span>{row.routeNumber}</span>
              </div>

              {/* Offset values with telemetry hatch dividers */}
              <div className="col-span-9 flex items-center justify-between px-1 font-mono text-[12px]">
                {/* L1 */}
                <span
                  className={`w-11 text-center ${
                    row.offsets.l1.startsWith('+') && !row.offsets.l1.includes('0')
                      ? 'text-[#F5A623] font-medium'
                      : 'text-[#F5F5F4]/90'
                  }`}
                >
                  {row.offsets.l1}
                </span>

                <ColumnHatchDivider />

                {/* L2 */}
                <span
                  className={`w-11 text-center ${
                    row.offsets.l2.startsWith('+') && !row.offsets.l2.includes('0')
                      ? 'text-[#F5A623] font-medium'
                      : 'text-[#F5F5F4]/90'
                  }`}
                >
                  {row.offsets.l2}
                </span>

                <ColumnHatchDivider />

                {/* L3 */}
                <span
                  className={`w-11 text-center ${
                    row.offsets.l3.startsWith('+') && !row.offsets.l3.includes('0')
                      ? 'text-[#F5A623] font-medium'
                      : 'text-[#F5F5F4]/90'
                  }`}
                >
                  {row.offsets.l3}
                </span>

                <ColumnHatchDivider />

                {/* L5 */}
                <span
                  className={`w-11 text-center ${
                    row.offsets.l5.startsWith('+') && !row.offsets.l5.includes('0')
                      ? 'text-[#F5A623] font-medium'
                      : 'text-[#F5F5F4]/90'
                  }`}
                >
                  {row.offsets.l5}
                </span>

                <ColumnHatchDivider />

                {/* L24 */}
                <span
                  className={`w-11 text-center ${
                    row.offsets.l24.startsWith('+') && !row.offsets.l24.includes('0')
                      ? 'text-[#F5A623] font-medium'
                      : 'text-[#F5F5F4]/90'
                  }`}
                >
                  {row.offsets.l24}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleOffset;
