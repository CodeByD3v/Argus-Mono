export interface MapViewConfig {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
}

// Development-only Map Debug Flag (Also activatable via ?debug=map query parameter)
export const MAP_DEBUG = false;

// ========================================================
// ABSOLUTE RULE: IMMUTABLE MAP CAMERA CONFIGURATION
// Fixed medium-close aerial reconnaissance scale (zoom 14.0)
// Roads, buildings, terrain, vegetation, water & infrastructure clearly visible
// ========================================================
export const MAP_VIEW: MapViewConfig = {
  center: [-122.484, 37.864],
  zoom: 14.0,
  bearing: 0,
  pitch: 0,
};

export const LOCKED_ZOOM = 14.0;
