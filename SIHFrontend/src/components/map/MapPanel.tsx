import React from 'react';
import { MapBackground } from './MapBackground';

export interface MapPanelProps {
  selectedBus?: string;
  selectedDrone?: string;
}

/**
 * MapPanel - Google Satellite HD Map Viewport
 * Implemented with multi-CDN Google Satellite streams, Terrarium 3D DEM relief,
 * and high-resolution drone pass overlays matching UI.jpeg.
 */
export const MapPanel: React.FC<MapPanelProps> = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <MapBackground />
    </div>
  );
};

export default MapPanel;
