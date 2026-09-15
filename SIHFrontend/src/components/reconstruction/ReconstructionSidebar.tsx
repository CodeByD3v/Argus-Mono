import React from 'react';
import { ReconstructionQualityCard } from './ReconstructionQualityCard';
import { FlightTelemetryCard } from './FlightTelemetryCard';
import { ReconstructionStagesGrid } from './ReconstructionStagesGrid';

export const ReconstructionSidebar: React.FC = () => {
  return (
    <aside className="w-[360px] lg:w-[370px] xl:w-[380px] shrink-0 h-full flex flex-col justify-between gap-2.5 pointer-events-auto select-none font-mono">
      {/* ─── 1. RECONSTRUCTION QUALITY CARD (Overall Confidence 95.5%, Timeline Curve) ─── */}
      <ReconstructionQualityCard />

      {/* ─── 2. FLIGHT TELEMETRY CARD (Capture Duration 04:32, Altitude Curve, Live Metrics) ─── */}
      <FlightTelemetryCard />

      {/* ─── 3. 2x2 OPERATIONAL STAGE CARDS (Video Capture, Pose/GPS, Scene Understanding, Pipeline) ─── */}
      <ReconstructionStagesGrid />
    </aside>
  );
};

export default ReconstructionSidebar;
