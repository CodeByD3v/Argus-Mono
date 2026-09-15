// Traffic Management Dashboard - Ground Truth Mock Dataset

export interface FleetTab {
  id: string;
  label: string;
  count: number;
  type: string;
}

export interface Vehicle {
  id: string;
  name: string;
  timestamp: string;
  badgeSymbol?: string;
  routeCode: string;
  isElectric?: boolean;
  status: 'Online' | 'Offline';
  hasGps: boolean;
  hasLte: boolean;
  hasRouteMap?: boolean;
  timeRange?: {
    start: string;
    end: string;
  };
  sliderPercent?: number;
}

export interface CapacityIncident {
  id: string;
  headline: string;
  timestamp: string;
  affectedStations: Array<{
    name: string;
    waitingCount: number;
  }>;
  recommendation: string;
}

export interface ScheduleDeviation {
  id: string;
  busName: string;
  delayMins: number;
  timestamp: string;
}

export interface ScheduleOffsetRow {
  routeNumber: string;
  offsets: {
    l1: string;
    l2: string;
    l3: string;
    l5: string;
    l24: string;
  };
}

export interface PassengerVolumeBar {
  id: string;
  timeLabel: string;
  volumeK: number;
  volumeDisplay: string;
  deltaPercent: number;
  deltaDisplay: string;
  isPositive: boolean;
}

export const navTabs = [
  'Live Map',
  'Fleet',
  'Routes',
  'Analytics',
  'Maintenance',
  'Incidents',
  'Crew',
];

export const fleetTabs: FleetTab[] = [
  { id: 'bus', label: '24 Bus', count: 24, type: 'Bus' },
  { id: 'taxi', label: '100 Taxi', count: 100, type: 'Taxi' },
  { id: 'trains', label: '12 Trains', count: 12, type: 'Trains' },
  { id: 'trams', label: '13 Trams', count: 13, type: 'Trams' },
];

export const fleetCounters = {
  online: 12,
  offline: 4,
};

export const operationalEfficiency = {
  currentValue: 78.3,
  target: 80,
  targetLabel: '>80%',
  history: [
    { time: '06:00', value: 46, target: 80 },
    { time: '07:00', value: 38, target: 80, isDip: true },
    { time: '07:40', value: 32, target: 80, isDip: true },
    { time: '08:20', value: 39, target: 80, isDip: true },
    { time: '09:00', value: 55, target: 80 },
    { time: '10:00', value: 58, target: 80 },
    { time: '11:00', value: 63, target: 80 },
    { time: '12:00', value: 72, target: 80 },
    { time: '12:30', value: 83, target: 80, isPeak: true },
    { time: '13:00', value: 89, target: 80, isPeak: true },
    { time: '13:30', value: 84, target: 80, isPeak: true },
    { time: '14:00', value: 74, target: 80 },
    { time: '15:00', value: 62, target: 80 },
    { time: '16:00', value: 65, target: 80 },
    { time: '17:00', value: 67, target: 80 },
    { time: '18:00', value: 64, target: 80 },
    { time: '19:00', value: 79, target: 80 },
    { time: '19:30', value: 88, target: 80, isPeak: true },
    { time: '20:00', value: 85, target: 80, isPeak: true },
    { time: '20:30', value: 76, target: 80 },
    { time: '21:00', value: 69, target: 80 },
  ],
};

export const vehicles: Vehicle[] = [
  {
    id: 'bus-6023',
    name: 'Bus 6023',
    timestamp: '10.03.2025, 08:35:55 AM',
    badgeSymbol: 'L',
    routeCode: '6023',
    isElectric: false,
    status: 'Online',
    hasGps: true,
    hasLte: true,
    hasRouteMap: true,
    timeRange: {
      start: '06AM',
      end: '11PM',
    },
    sliderPercent: 68,
  },
  {
    id: 'bus-4120',
    name: 'Bus 4120',
    timestamp: '10.03.2025, 10:22:18',
    badgeSymbol: '1',
    routeCode: '6120',
    isElectric: false,
    status: 'Online',
    hasGps: true,
    hasLte: true,
    hasRouteMap: true,
    timeRange: {
      start: '05AM',
      end: '09PM',
    },
    sliderPercent: 55,
  },
  {
    id: 'bus-2209',
    name: 'Bus 2209',
    timestamp: '10.03.2025, 11:26:40',
    badgeSymbol: '●',
    routeCode: '2209',
    isElectric: false,
    status: 'Online',
    hasGps: true,
    hasLte: true,
    hasRouteMap: false,
  },
  {
    id: 'ebus-07',
    name: 'E-Bus 07',
    timestamp: '10.03.2025, 11:29:32',
    badgeSymbol: '⚡',
    routeCode: '07',
    isElectric: true,
    status: 'Online',
    hasGps: true,
    hasLte: true,
    hasRouteMap: false,
  },
];

export const warningPanelData = {
  capacity: {
    category: 'Capacity Issues',
    lineInfo: '2 line',
    incident: {
      id: 'cap-1',
      headline: '-180 passengers left behind',
      timestamp: '2m ago',
      affectedStations: [
        { name: 'Central Station', waitingCount: 115 },
        { name: 'University Campus', waitingCount: 65 },
      ],
      recommendation: 'Dispatch 2 more buses',
    },
  },
  scheduleDeviations: {
    category: 'Schedule Deviations',
    routeInfo: 'Route 14',
    incident: {
      id: 'dev-1',
      headline: 'Bus 4120 is 15 mins behind schedule',
      timestamp: '7m ago',
    },
  },
};

export const scheduleOffsetData: {
  averageVariance: string;
  columns: string[];
  rows: ScheduleOffsetRow[];
} = {
  averageVariance: '± 2.5 min',
  columns: ['Route number', 'L1', 'L2', 'L3', 'L5', 'L24'],
  rows: [
    {
      routeNumber: '46023',
      offsets: {
        l1: '-2min',
        l2: '+1min',
        l3: '+0min',
        l5: '-1.5min',
        l24: '+2min',
      },
    },
    {
      routeNumber: '34654',
      offsets: {
        l1: '-3min',
        l2: '-2min',
        l3: '+1min',
        l5: '-2.5min',
        l24: '+2min',
      },
    },
  ],
};

export const livePassengerVolumeData: {
  totalToday: string;
  bars: PassengerVolumeBar[];
  timeMarks: string[];
} = {
  totalToday: '142,580',
  bars: [
    {
      id: 'b1',
      timeLabel: '02:00',
      volumeK: 55,
      volumeDisplay: '55k',
      deltaPercent: 8,
      deltaDisplay: '+8%',
      isPositive: true,
    },
    {
      id: 'b2',
      timeLabel: '05:30',
      volumeK: 57,
      volumeDisplay: '57k',
      deltaPercent: -3,
      deltaDisplay: '-3%',
      isPositive: false,
    },
    {
      id: 'b3',
      timeLabel: '09:00',
      volumeK: 56,
      volumeDisplay: '56k',
      deltaPercent: 6,
      deltaDisplay: '+6%',
      isPositive: true,
    },
    {
      id: 'b4',
      timeLabel: '12:00',
      volumeK: 55,
      volumeDisplay: '55k',
      deltaPercent: -1,
      deltaDisplay: '-1%',
      isPositive: false,
    },
    {
      id: 'b5',
      timeLabel: '15:30',
      volumeK: 52,
      volumeDisplay: '52k',
      deltaPercent: -10,
      deltaDisplay: '-10%',
      isPositive: false,
    },
    {
      id: 'b6',
      timeLabel: '19:00',
      volumeK: 52,
      volumeDisplay: '52k',
      deltaPercent: 2,
      deltaDisplay: '+2%',
      isPositive: true,
    },
    {
      id: 'b7',
      timeLabel: '22:30',
      volumeK: 52,
      volumeDisplay: '52k',
      deltaPercent: 4,
      deltaDisplay: '+4%',
      isPositive: true,
    },
  ],
  timeMarks: ['00:00', '06:00', '12:00', '18:00', '24:00'],
};
