import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

// Bundled image imports for 100% reliable loading in Vite, Electron (file://), and Web
import videoCaptureImg from '../../assets/reconstruction/video_capture.jpg';
import poseGpsImg from '../../assets/reconstruction/pose_gps.jpg';
import sceneUnderstandingImg from '../../assets/reconstruction/scene_understanding.jpg';
import pipelineMeshImg from '../../assets/reconstruction/pipeline_mesh.jpg';

export const ReconstructionStagesGrid: React.FC = () => {
  const { currentFrame, totalFrames, open3DViewer } = useReconstruction();
  const progress = totalFrames > 0 ? Math.max(0, Math.min(1, currentFrame / totalFrames)) : 0;

  const cardBaseStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.88) 0%, rgba(12, 12, 12, 0.92) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

  const blendMaskStyle: React.CSSProperties = {
    maskImage: 'radial-gradient(ellipse 96% 88% at 50% 50%, black 50%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 96% 88% at 50% 50%, black 50%, transparent 100%)',
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 w-full select-none font-mono flex-[1.25] min-h-[220px]">
      {/* ─── CARD 1: VIDEO CAPTURE (Top-Left) ─── */}
      <div
        style={cardBaseStyle}
        onClick={() => open3DViewer()}
        className="group relative rounded-[18px] p-3 flex flex-col justify-between cursor-pointer overflow-hidden border border-white/[0.08] hover:border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(52,211,153,0.10)] transition-all duration-150 hover:-translate-y-0.5 h-full"
      >
        {/* Atmospheric sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(26,38,28,0.85)_0%,rgba(14,14,14,0.92)_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-wider text-white/70 uppercase font-medium group-hover:text-white transition-colors duration-150">
                Video Capture
              </span>
              <div className="flex items-center space-x-1.5">
                {/* Green Pill Badge */}
                <div
                  className="px-1.5 py-0.5 rounded-full text-[#34d399] text-[7.5px] font-medium flex items-center space-x-1 shadow-[0_0_6px_rgba(52,211,153,0.2)]"
                  style={{
                    background: 'rgba(13, 40, 24, 0.65)',
                    border: '1px solid rgba(34, 197, 94, 0.35)',
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#34d399]" />
                  <span>COMPLETE</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
              </div>
            </div>
            <div className="text-[8px] text-white/50 mt-0.5">
              4K · 30 FPS
            </div>
          </div>

          {/* ─── UNBOXED SEAMLESS BLENDED PHOTO (Matching Drone Map style) ─── */}
          <div className="-mx-3 w-[calc(100%+24px)] h-[64px] my-1 relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-full relative" style={blendMaskStyle}>
              <img
                src={videoCaptureImg}
                alt="Optical Feature Point Tracking HUD"
                loading="eager"
                className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              {/* Soft atmospheric gradient fades to blend seamlessly into card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#141414]/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/80 pointer-events-none" />
            </div>

            {/* Futuristic Floating Telemetry HUD Badge */}
            <div className="absolute bottom-1 right-2 px-1 py-0.2 rounded bg-black/60 backdrop-blur-md text-[6.5px] text-[#34d399] border border-[#34d399]/30 shadow-sm pointer-events-none">
              RAW 4K
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center justify-between text-[8px] border-t border-white/[0.05] pt-1">
            <div>
              <span className="text-white/40">FRAME </span>
              <span className="text-white font-medium">4,826</span>
            </div>
            <div>
              <span className="text-white/40">DURATION </span>
              <span className="text-white font-medium">04:32</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CARD 2: POSE / GPS (Top-Right) ─── */}
      <div
        style={cardBaseStyle}
        onClick={() => open3DViewer()}
        className="group relative rounded-[18px] p-3 flex flex-col justify-between cursor-pointer overflow-hidden border border-white/[0.08] hover:border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(52,211,153,0.10)] transition-all duration-150 hover:-translate-y-0.5 h-full"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(26,38,28,0.85)_0%,rgba(14,14,14,0.92)_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-wider text-white/70 uppercase font-medium group-hover:text-white transition-colors duration-150">
                Pose / GPS
              </span>
              <div className="flex items-center space-x-1.5">
                <div
                  className="px-1.5 py-0.5 rounded-full text-[#34d399] text-[7.5px] font-medium flex items-center space-x-1 shadow-[0_0_6px_rgba(52,211,153,0.2)]"
                  style={{
                    background: 'rgba(13, 40, 24, 0.65)',
                    border: '1px solid rgba(34, 197, 94, 0.35)',
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#34d399]" />
                  <span>VALID</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
              </div>
            </div>
            <div className="text-[8px] text-white/50 mt-0.5">
              GPS FIX: RTK / GPS
            </div>
          </div>

          {/* ─── UNBOXED SEAMLESS BLENDED PHOTO (Matching Drone Map style) ─── */}
          <div className="-mx-3 w-[calc(100%+24px)] h-[64px] my-1 relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-full relative" style={blendMaskStyle}>
              <img
                src={poseGpsImg}
                alt="6-DoF Camera Pose Estimation"
                loading="eager"
                className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#141414]/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/80 pointer-events-none" />
            </div>

            <div className="absolute bottom-1 right-2 px-1 py-0.2 rounded bg-black/60 backdrop-blur-md text-[6.5px] text-white/80 border border-white/20 shadow-sm pointer-events-none">
              RTK FIX
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center justify-between text-[8px] border-t border-white/[0.05] pt-1">
            <div>
              <span className="text-white/40">DRIFT </span>
              <span className="text-[#34d399] font-medium">1.42 m</span>
            </div>
            <div>
              <span className="text-white/40">POSE ERROR </span>
              <span className="text-white font-medium">0.18°</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CARD 3: SCENE UNDERSTANDING (Bottom-Left) ─── */}
      <div
        style={cardBaseStyle}
        onClick={() => open3DViewer()}
        className="group relative rounded-[18px] p-3 flex flex-col justify-between cursor-pointer overflow-hidden border border-white/[0.08] hover:border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(52,211,153,0.10)] transition-all duration-150 hover:-translate-y-0.5 h-full"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(26,38,28,0.85)_0%,rgba(14,14,14,0.92)_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-wider text-white/70 uppercase font-medium group-hover:text-white transition-colors duration-150">
                Scene Understanding
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
            </div>
          </div>

          {/* ─── UNBOXED SEAMLESS BLENDED PHOTO (Matching Drone Map style) ─── */}
          <div className="-mx-3 w-[calc(100%+24px)] h-[64px] my-1 relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-full relative" style={blendMaskStyle}>
              <img
                src={sceneUnderstandingImg}
                alt="LiDAR Semantic Scene Classification"
                loading="eager"
                className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#141414]/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/80 pointer-events-none" />
            </div>

            <div className="absolute bottom-1 right-2 px-1 py-0.2 rounded bg-black/60 backdrop-blur-md text-[6.5px] text-[#34d399] border border-[#34d399]/30 shadow-sm pointer-events-none">
              3D AI BBOX
            </div>
          </div>

          {/* 4 Classification Metrics Grid */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7.5px] border-t border-white/[0.05] pt-1">
            <div className="flex justify-between">
              <span className="text-white/40">BUILDINGS</span>
              <span className="text-white font-medium">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">TERRAIN</span>
              <span className="text-white font-medium">97%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">ROADS</span>
              <span className="text-white font-medium">91%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">VEGETATION</span>
              <span className="text-white font-medium">86%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CARD 4: RECONSTRUCTION PIPELINE (Bottom-Right) ─── */}
      <div
        style={cardBaseStyle}
        onClick={() => open3DViewer()}
        className="group relative rounded-[18px] p-3 flex flex-col justify-between cursor-pointer overflow-hidden border border-white/[0.08] hover:border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(52,211,153,0.10)] transition-all duration-150 hover:-translate-y-0.5 h-full"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(26,38,28,0.85)_0%,rgba(14,14,14,0.92)_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-wider text-white/70 uppercase font-medium group-hover:text-white transition-colors duration-150">
                Reconstruction Pipeline
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
            </div>
          </div>

          {/* ─── UNBOXED SEAMLESS BLENDED PHOTO (Matching Drone Map style) ─── */}
          <div className="-mx-3 w-[calc(100%+24px)] h-[64px] my-1 relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-full relative" style={blendMaskStyle}>
              <img
                src={pipelineMeshImg}
                alt="3D Wireframe Mesh Reconstruction"
                loading="eager"
                className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#141414]/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/80 pointer-events-none" />
            </div>

            <div className="absolute bottom-1 right-2 px-1 py-0.2 rounded bg-black/60 backdrop-blur-md text-[6.5px] text-[#34d399] border border-[#34d399]/30 shadow-sm pointer-events-none">
              MESH 3D
            </div>
          </div>

          {/* Pipeline Active Processing Status & Progress Bar */}
          <div className="space-y-1 border-t border-white/[0.05] pt-1">
            <div className="flex items-center justify-between text-[7.5px]">
              <div className="flex items-center space-x-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34d399]" />
                </span>
                <span className="text-[#34d399] font-medium">MESH PROCESSING</span>
              </div>
              <span className="text-white/60">
                {Math.min(100, Math.round(75 + progress * 25))}%
              </span>
            </div>

            <div className="w-full bg-white/[0.08] h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#10b981] to-[#34d399] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                style={{ width: `${Math.min(100, Math.round(75 + progress * 25))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReconstructionStagesGrid;
