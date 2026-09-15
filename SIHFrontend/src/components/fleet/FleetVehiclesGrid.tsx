import React, { useState, useEffect } from 'react';
import { DroneVehicle } from '../../types';
import { DroneCard } from './DroneCard';

export const FleetVehiclesGrid: React.FC = () => {
  const [selectedDroneId, setSelectedDroneId] = useState<string>('drone-6023');
  const [currentTime, setCurrentTime] = useState<string>('11:29:32 AM');

  // Live real-time seconds ticking for bottom footer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const droneUnits: DroneVehicle[] = [
    {
      id: 'drone-6023',
      name: 'Drone 6023',
      type: 'standard',
      timestamp: '10.03.2025, 08:35:55 AM',
      routeCode: '6023',
      badgeSymbol: 'L',
      status: 'Online',
      gpsStatus: 'active',
      lteStatus: 'connected',
      timeRange: {
        start: '06AM',
        end: '11PM',
      },
      sliderPosition: 68,
    },
    {
      id: 'drone-4120',
      name: 'Drone 4120',
      type: 'standard',
      timestamp: '10.03.2025, 10:22:18',
      routeCode: '6120',
      badgeSymbol: 'A',
      status: 'Online',
      gpsStatus: 'active',
      lteStatus: 'connected',
      timeRange: {
        start: '05AM',
        end: '09PM',
      },
      sliderPosition: 54,
    },
    {
      id: 'drone-2209',
      name: 'Drone 2209',
      type: 'standard',
      timestamp: '10.03.2025, 11:26:40',
      routeCode: '2209',
      badgeSymbol: 'λ',
      status: 'Online',
      gpsStatus: 'active',
      lteStatus: 'connected',
      timeRange: {
        start: '06AM',
        end: '10PM',
      },
      sliderPosition: 35,
    },
    {
      id: 'edrone-07',
      name: 'E-Drone 07',
      type: 'electric',
      timestamp: '10.03.2025, 11:29:32',
      routeCode: '07',
      badgeSymbol: '⚡',
      highlightComponents: true, // Orange illuminated payload sensor pod
      status: 'Online',
      gpsStatus: 'active',
      lteStatus: 'connected',
      timeRange: {
        start: '07AM',
        end: '11PM',
      },
      sliderPosition: 42,
    },
  ];

  return (
    <div className="flex flex-col space-y-2 select-none">
      {/* 2x2 Drone Unit Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {droneUnits.map((drone, idx) => (
          <DroneCard
            key={drone.id}
            drone={drone}
            isSelected={selectedDroneId === drone.id}
            onSelect={() => setSelectedDroneId(drone.id)}
            showMapAndSlider={idx < 2} // First row has mini route map and timeline scrubber
            mapType={idx === 0 ? 'diagonal' : 'stepped'}
            geoCoordinates={
              idx === 0
                ? { lat: 37.525, lng: -122.338, zoom: 14 }
                : { lat: 37.542, lng: -122.315, zoom: 14 }
            }
          />
        ))}
      </div>

      {/* Footer: Live Last Updated status with pulsating green dot */}
      <div className="flex items-center space-x-2 pt-1 px-1 text-[10px] font-mono text-white/40">
        <span>Last updated: Today, {currentTime}</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3cd070] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3cd070] shadow-[0_0_6px_#3cd070]" />
        </span>
      </div>
    </div>
  );
};

export default FleetVehiclesGrid;
