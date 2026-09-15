import React, { useState } from 'react';
import { Crosshair, Layers, ChevronDown, Check, Activity } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

export const MapHeader: React.FC = () => {
  const { missions, activeMissionId, selectMission } = useReconstruction();
  const [isDroneDropdownOpen, setIsDroneDropdownOpen] = useState(false);
  const [isLayerDropdownOpen, setIsLayerDropdownOpen] = useState(false);
  const [activeLayerName, setActiveLayerName] = useState('OBJ');

  const defaultDrones = [
    { id: 'uav-6023', name: 'UAV Pass 6023', tag: 'Sector Alpha (Crystal Springs 4K)', isBackend: false, status: 'demo' },
    { id: 'uav-4120', name: 'UAV Pass 4120', tag: 'Sector Bravo (VTOL 4K HDR)', isBackend: false, status: 'demo' },
  ];

  // Combine default passes with live Argus missions
  const allMissions = [
    ...defaultDrones,
    ...missions.map((m) => ({
      id: m.id,
      name: m.name.length > 24 ? `${m.name.slice(0, 22)}...` : m.name,
      tag: `Argus Server [${m.status}]`,
      isBackend: true,
      status: m.status,
    })),
  ];

  const activeMissionItem = allMissions.find((m) => m.id === activeMissionId) || defaultDrones[0];

  const outputFormats = [
    { id: 'pointcloud', name: 'Point Cloud', tag: 'Dense LAS / GeoTIFF' },
    { id: 'mesh', name: 'Textured Mesh', tag: 'Textured 3D Surface' },
    { id: 'obj', name: 'OBJ', tag: 'Wavefront OBJ + MTL' },
    { id: 'gltf', name: 'GLTF', tag: 'GLTF / GLB Binary' },
  ];

  return (
    <div className="flex flex-col space-y-2 pointer-events-auto select-none relative">
      {/* Title */}
      <h1 className="text-[26px] font-extralight tracking-tight text-white/95 leading-none">
        Single-Pass 3D Reconstruction
      </h1>

      {/* Floating Control Dropdown Pills */}
      <div className="flex items-center space-x-1.5">
        {/* 1. Mission Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsDroneDropdownOpen(!isDroneDropdownOpen);
              setIsLayerDropdownOpen(false);
            }}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-[6px] text-[11px] text-white/85 hover:text-white transition-all shadow-md cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(6, 8, 12, 0.78) 0%, rgba(10, 13, 17, 0.45) 55%, rgba(15, 20, 26, 0.02) 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: 'none',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Crosshair className="w-3 h-3 text-emerald-400 stroke-[1.75]" />
            <span>{activeMissionItem.name}</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>

          {isDroneDropdownOpen && (
            <div
              className="absolute top-8 left-0 w-72 max-h-72 overflow-y-auto rounded-[8px] p-1 shadow-2xl z-50 flex flex-col space-y-0.5"
              style={{
                background: 'rgba(10, 14, 18, 0.96)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.75)',
              }}
            >
              <div className="px-2 py-1 text-[8.5px] font-mono uppercase text-white/40 border-b border-white/[0.06]">
                Select Mission / UAV Pass
              </div>

              {allMissions.map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    selectMission(d.id);
                    setIsDroneDropdownOpen(false);
                  }}
                  className={`p-1.5 rounded-[6px] cursor-pointer transition-all flex items-center justify-between ${
                    activeMissionId === d.id ? 'bg-white/[0.14]' : 'hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10.5px] font-medium text-white/90">{d.name}</span>
                      {d.isBackend && (
                        <span className="px-1 py-0.2 rounded text-[7.5px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {d.status || 'live'}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] font-mono text-white/40">{d.tag}</span>
                  </div>
                  {activeMissionId === d.id && (
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Output Format Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsLayerDropdownOpen(!isLayerDropdownOpen);
              setIsDroneDropdownOpen(false);
            }}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-[6px] text-[11px] text-white/85 hover:text-white transition-all shadow-md cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(6, 8, 12, 0.78) 0%, rgba(10, 13, 17, 0.45) 55%, rgba(15, 20, 26, 0.02) 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: 'none',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Layers className="w-3 h-3 text-amber-400 stroke-[1.75]" />
            <span>{activeLayerName}</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>

          {isLayerDropdownOpen && (
            <div
              className="absolute top-8 left-0 w-52 rounded-[8px] p-1 shadow-2xl z-50 flex flex-col space-y-0.5"
              style={{
                background: 'rgba(10, 14, 18, 0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.70)',
              }}
            >
              {outputFormats.map((l) => (
                <div
                  key={l.id}
                  onClick={() => {
                    setActiveLayerName(l.name);
                    setIsLayerDropdownOpen(false);
                  }}
                  className={`p-1.5 rounded-[6px] cursor-pointer transition-all flex items-center justify-between ${
                    activeLayerName === l.name ? 'bg-white/[0.14]' : 'hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10.5px] font-medium text-white/90">{l.name}</span>
                    <span className="text-[8px] font-mono text-white/40">{l.tag}</span>
                  </div>
                  {activeLayerName === l.name && (
                    <Check className="w-3 h-3 text-amber-400" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapHeader;
