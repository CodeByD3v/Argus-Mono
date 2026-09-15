import React, { useRef } from 'react';
import { UploadCloud, FileCheck, Loader2 } from 'lucide-react';
import { useReconstruction } from '../../context/ReconstructionContext';

export const VideoUploadButton: React.FC = () => {
  const {
    videoFileName,
    handleFileUpload,
    isUploading,
    uploadProgress,
    isProcessing,
    processingStage,
    pipelineProgress,
    backendOnline,
  } = useReconstruction();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  let buttonText = 'Upload Video';
  let badgeIcon = <UploadCloud className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />;

  if (isUploading) {
    buttonText = `Uploading ${uploadProgress}%...`;
    badgeIcon = <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />;
  } else if (isProcessing) {
    buttonText = `${processingStage} (${pipelineProgress}%)`;
    badgeIcon = <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />;
  } else if (videoFileName && videoFileName !== 'UAV_PASS_01_4K_RECON.mp4') {
    buttonText = videoFileName.length > 20 ? `${videoFileName.slice(0, 18)}...` : videoFileName;
    badgeIcon = <FileCheck className="w-3.5 h-3.5 text-[#34d399]" />;
  }

  return (
    <div className="select-none pointer-events-auto flex items-center space-x-2 justify-end">
      {/* Backend Status Indicator */}
      <div
        className="hidden md:flex items-center space-x-1 px-2 py-1 rounded-[6px] text-[9.5px] font-mono"
        style={{
          background: 'rgba(6, 8, 12, 0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
        title={backendOnline ? 'Connected to Argus Backend (localhost:8080)' : 'Argus Backend Offline (using fallback)'}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            backendOnline ? 'bg-[#34d399] shadow-[0_0_6px_#34d399]' : 'bg-amber-400'
          }`}
        />
        <span className="text-white/60">{backendOnline ? 'ARGUS 8080' : 'OFFLINE'}</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/x-matroska"
        className="hidden"
        onChange={onFileChange}
      />

      <button
        type="button"
        disabled={isUploading || isProcessing}
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-[6px] text-[11px] text-white/85 hover:text-white transition-all shadow-md group disabled:opacity-80 cursor-pointer"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(12, 16, 22, 0.90) 0%, rgba(8, 10, 14, 0.75) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
        }}
        title={videoFileName ? `Active Stream: ${videoFileName}` : 'Upload UAV Video Stream to Argus'}
      >
        {badgeIcon}
        <span className="font-medium tracking-wide">{buttonText}</span>
      </button>
    </div>
  );
};

export default VideoUploadButton;
