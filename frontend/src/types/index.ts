export type MissionMode = 'surveillance' | 'recon' | 'mapping' | 'disaster';
export type ModelFormatType = 'all' | 'mesh' | 'pointcloud' | 'digital_twin';

export interface ReconstructedModel {
  id: string;
  name: string;
  sector: string;
  timestamp: string;
  status: 'In-Flight' | 'Processing' | '3D Ready' | 'Archived';
  pointCount: string;
  accuracyPercent: number;
  gsd: string;
  format: 'Textured Mesh' | 'Dense Point Cloud' | 'Digital Twin';
  modelType: 'infrastructure' | 'outpost' | 'runway' | 'bridge';
  boundingVolume: string;
  corridorDistance: string;
  timeRange: {
    start: string;
    end: string;
  };
  progressPosition: number;
}

export interface DroneTelemetry {
  droneId: string;
  missionName: string;
  status: 'Ingesting' | 'Reconstructing' | 'Completed' | 'Idle';
  rtkStatus: 'FIXED' | 'FLOAT' | 'NO_LOCK';
  battery: number;
  altitudeM: number;
  speedMs: number;
  pitch: number;
  roll: number;
  yaw: number;
  lat: number;
  lng: number;
  gsdCmPx: number;
  reconstructedPoints: string;
  fps: number;
  resolution: string;
  totalDurationSec: number;
  currentSec: number;
}

export interface ProcessingErrorAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  frameIndex?: number;
  category: 'Motion Blur' | 'GPS Drift' | 'Shadow / Illumination' | 'Dynamic Object' | 'Occlusion' | 'RTK Loss';
  title: string;
  description: string;
  autoResolution?: string;
}

export type TransportType = 'drone' | 'vtol' | 'fixed_wing' | 'quad' | 'bus' | 'taxi' | 'train' | 'tram';

export interface DroneVehicle {
  id: string;
  name: string;
  type: 'standard' | 'vtol' | 'electric';
  timestamp: string;
  routeCode: string;
  badgeSymbol?: string;
  status: 'Online' | 'Offline';
  gpsStatus: 'active' | 'inactive';
  lteStatus: 'connected' | 'disconnected';
  highlightComponents?: boolean;
  timeRange: {
    start: string;
    end: string;
  };
  sliderPosition: number;
  routeCoords?: [number, number][];
}

export type BusVehicle = DroneVehicle;

export interface RouteVariance {
  routeNumber: string;
  L1: string;
  L2: string;
  L3: string;
  L5: string;
  L24: string;
  highlightCols?: string[];
}

export interface HourlyPassengerVolume {
  hour: string;
  volumeK: string;
  percentage: string;
  isPositive: boolean;
  barHeightPercentage: number;
}
