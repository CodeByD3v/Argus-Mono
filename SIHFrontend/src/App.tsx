import React from 'react';
import { ReconstructionProvider, useReconstruction } from './context/ReconstructionContext';
import { MapBackground } from './components/map/MapBackground';
import { MapHeader } from './components/map/MapHeader';
import { VideoUploadButton } from './components/upload/VideoUploadButton';
import { ReconstructionSidebar } from './components/reconstruction/ReconstructionSidebar';
import { FlightTimeline } from './components/timeline/FlightTimeline';
import { Reconstruction3DViewer } from './components/viewer/Reconstruction3DViewer';
import { ReconstructedModel } from './types';

const defaultModel: ReconstructedModel = {
  id: 'uav-pass-6023',
  name: 'UAV Pass 6023 (Crystal Springs Reservoir)',
  sector: 'Sector Alpha',
  timestamp: 'Today, 04:32 PM',
  status: '3D Ready',
  pointCount: '1.73M',
  accuracyPercent: 95.5,
  gsd: '2.4 cm/px',
  format: 'Textured Mesh',
  modelType: 'infrastructure',
  boundingVolume: '840m x 420m x 128m',
  corridorDistance: '4.8 km',
  timeRange: { start: '00:00', end: '04:32' },
  progressPosition: 100,
};

const DashboardContent: React.FC = () => {
  const { viewMode, close3DViewer } = useReconstruction();

  return (
    <div className="h-screen w-screen overflow-hidden text-[#F5F5F4] select-none bg-[#0A0A0B] relative font-sans">
      {/* 1. Fullscreen Google Satellite HD Map Viewport (Matching UI.jpeg) */}
      <MapBackground />

      {/* 2. Floating Control HUD Overlays (Matching UI.jpeg Layout) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 overflow-hidden">
        {/* Top Floating Header Row */}
        <div className="flex items-start justify-between w-full shrink-0">
          <MapHeader />
          <VideoUploadButton />
        </div>

        {/* Middle Stage: Left Overlay Telemetry Column, Center Open for Map */}
        <div className="flex-1 min-h-0 flex items-center my-2 pointer-events-none">
          <div className="h-full flex items-center">
            <ReconstructionSidebar />
          </div>
        </div>

        {/* Bottom Floating Analytics & Timeline Bar */}
        <div className="w-full h-[142px] shrink-0 pointer-events-auto">
          <FlightTimeline />
        </div>
      </div>

      {/* 3. 3D WebGL Reconstructed Model Viewer Modal (if active) */}
      {viewMode === '3d_viewer' && (
        <div className="absolute inset-0 z-50 bg-[#0A0A0B] pointer-events-auto">
          <Reconstruction3DViewer model={defaultModel} onBackToMap={close3DViewer} />
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ReconstructionProvider>
      <DashboardContent />
    </ReconstructionProvider>
  );
};

export default App;
