import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { operationalEfficiency } from '../../data';

export const OperationalEfficiency: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; time: string; value: number } | null>(null);

  // SVG Chart Dimensions: width 280, height 85
  // Y coordinates:
  // 100% -> y = 8
  // 75%  -> y = 28
  // 50%  -> y = 48
  // 25%  -> y = 68
  // Target 80% -> y = 8 + (100 - 80) * (60 / 75) = 24
  // X range: 06:00 (x = 10) to 21:00 (x = 260)

  // Handcrafted spline points closely mapping UI.png:
  // 06:00: 46% -> x:10, y:51
  // 07:00: 38% -> x:26, y:57.6
  // 07:40: 32% -> x:37, y:62.4 (Dip lowest)
  // 08:20: 39% -> x:48, y:56.8
  // 09:00: 55% -> x:58, y:44
  // 10:30: 58% -> x:82, y:41.6
  // 11:30: 64% -> x:98, y:36.8
  // 12:15: 80% -> x:110, y:24 (Target crossover 1)
  // 13:00: 89% -> x:122, y:16.8 (Peak 1)
  // 13:45: 80% -> x:134, y:24 (Target crossover 2)
  // 15:00: 62% -> x:154, y:38.4
  // 16:30: 66% -> x:178, y:35.2
  // 18:00: 64% -> x:202, y:36.8
  // 19:15: 80% -> x:222, y:24 (Target crossover 3)
  // 19:50: 88% -> x:230, y:17.6 (Peak 2)
  // 20:30: 80% -> x:240, y:24 (Target crossover 4)
  // 21:00: 69% -> x:260, y:32.8

  return (
    <div className="rounded-[14px] bg-[#161618] border border-[rgba(255,255,255,0.08)] p-3 flex flex-col justify-between select-none">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#F5F5F4]">
          Operational Efficiency
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#9A9A9E] hover:text-[#F5F5F4] transition-colors cursor-pointer" />
      </div>

      {/* 2. Big Stat */}
      <div className="flex items-baseline space-x-1 my-0.5">
        <span className="text-[36px] font-light tracking-tight text-[#F5F5F4] leading-none tabular-nums font-sans">
          {operationalEfficiency.currentValue}
        </span>
        <span className="text-[16px] font-light text-[#9A9A9E] font-sans">
          %
        </span>
      </div>

      {/* 3. Target / Axis Header line */}
      <div className="flex items-center justify-between text-[11px] text-[#9A9A9E] mb-0.5">
        <span>Target</span>
        <div className="flex items-center space-x-4">
          <span className="text-[#9A9A9E]">&gt;80%</span>
          <span className="text-[#5C5C60]">100%</span>
        </div>
      </div>

      {/* 4. Telemetry Sparkline SVG */}
      <div className="relative w-full h-[88px] mt-0.5">
        <svg
          viewBox="0 0 280 85"
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            {/* Soft Amber Glow for Peaks */}
            <linearGradient id="amberPeakGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0.0" />
            </linearGradient>

            {/* Faint Gridline Pattern */}
            <linearGradient id="gridLineFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="90%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
            </linearGradient>
          </defs>

          {/* Horizontal Dashed Grid Lines at 100%, 75%, 50%, 25% */}
          {/* 100% Line (y = 8) */}
          <line x1="10" y1="8" x2="260" y2="8" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
          
          {/* Target Line at 80% (y = 24) */}
          <line x1="10" y1="24" x2="260" y2="24" stroke="rgba(255,255,255,0.14)" strokeDasharray="2 2" strokeWidth="0.9" />

          {/* 75% Line (y = 28) */}
          <line x1="10" y1="28" x2="260" y2="28" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
          <text x="278" y="31" fill="#5C5C60" fontSize="9" textAnchor="end" fontFamily="Inter, sans-serif">
            75%
          </text>

          {/* 50% Line (y = 48) */}
          <line x1="10" y1="48" x2="260" y2="48" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
          <text x="278" y="51" fill="#5C5C60" fontSize="9" textAnchor="end" fontFamily="Inter, sans-serif">
            50%
          </text>

          {/* 25% Line (y = 68) */}
          <line x1="10" y1="68" x2="260" y2="68" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
          <text x="278" y="71" fill="#5C5C60" fontSize="9" textAnchor="end" fontFamily="Inter, sans-serif">
            25%
          </text>

          {/* Amber Peak 1 Fill (Over 80% Target from x=110 to x=134) */}
          <path
            d="M 110 24 Q 122 14, 134 24 Z"
            fill="url(#amberPeakGradient)"
          />

          {/* Amber Peak 2 Fill (Over 80% Target from x=222 to x=240) */}
          <path
            d="M 222 24 Q 231 15, 240 24 Z"
            fill="url(#amberPeakGradient)"
          />

          {/* Early Morning Amber Dip Indicator (x=26 to x=48) */}
          <path
            d="M 26 57.6 Q 37 64, 48 56.8"
            fill="none"
            stroke="#F5A623"
            strokeWidth="1.2"
            strokeDasharray="1.5 1.5"
          />
          {/* Dip dots */}
          <circle cx="26" cy="57.6" r="1.5" fill="#F5A623" />
          <circle cx="37" cy="62.4" r="1.8" fill="#F5A623" />
          <circle cx="48" cy="56.8" r="1.5" fill="#F5A623" />

          {/* Main Telemetry Line */}
          <path
            d="M 10 51 
               L 18 49 
               L 26 57.6 
               L 37 62.4 
               L 48 56.8 
               L 58 44 
               L 70 43 
               L 82 41.6 
               L 90 39 
               L 98 36.8 
               L 105 32 
               L 110 24 
               Q 122 14, 134 24 
               L 142 32 
               L 154 38.4 
               L 166 36 
               L 178 35.2 
               L 190 37 
               L 202 36.8 
               L 214 30 
               L 222 24 
               Q 231 15, 240 24 
               L 248 30 
               L 260 32.8"
            fill="none"
            stroke="#F5F5F4"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />

          {/* Peak Highlight Points */}
          <circle cx="110" cy="24" r="2" fill="#F5F5F4" />
          <circle cx="122" cy="16.8" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 3px rgba(255,255,255,0.8))" />
          <circle cx="134" cy="24" r="2" fill="#F5F5F4" />

          <circle cx="222" cy="24" r="2" fill="#F5F5F4" />
          <circle cx="231" cy="17.2" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 3px rgba(255,255,255,0.8))" />
          <circle cx="240" cy="24" r="2" fill="#F5F5F4" />

          {/* Hover interactive overlay */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1="8"
                x2={hoveredPoint.x}
                y2="75"
                stroke="rgba(255,255,255,0.3)"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="3.5"
                fill="#3ECF6E"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>

        {/* X-Axis Time Labels */}
        <div className="flex items-center justify-between text-[9px] text-[#5C5C60] px-1 -mt-1 font-sans">
          <span>06:00</span>
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
          <span>21:00</span>
        </div>
      </div>
    </div>
  );
};

export default OperationalEfficiency;
