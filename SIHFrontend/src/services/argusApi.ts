/**
 * SinglePass3D / Argus Backend API Service
 * Connects SIHFrontend to the Python HTTP server running on localhost:8080.
 */

export const API_BASE = 'http://localhost:8080';

export interface BackendMission {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  video?: {
    filename: string;
    size: number;
    duration: number;
  } | null;
  location?: {
    center: { lat: number; lng: number };
    altitude: number;
    coordinateSystem: string;
  } | null;
  flight?: {
    path: {
      type: 'LineString';
      coordinates: [number, number][];
    };
    points: Array<{ lat: number; lng: number; altitude: number }>;
    altitude: number;
    duration: number;
  } | null;
  processing?: {
    jobId?: string | null;
    stage?: string;
    progress?: number;
    message?: string;
  };
  reconstruction?: {
    status?: string;
    modelId?: string | null;
    modelUrl?: string | null;
    viewerUrl?: string | null;
    footprint?: any;
  };
  error?: string | null;
}

export interface MissionStatusResponse {
  missionId: string;
  status: string;
  stage: string;
  progress: number;
  message: string;
}

/** Check if Argus Python backend is online */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}

/** Retrieve all missions from backend */
export async function listBackendMissions(): Promise<BackendMission[]> {
  try {
    const res = await fetch(`${API_BASE}/api/missions`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const list = await res.json();
      return Array.isArray(list) ? list : [];
    }
  } catch (err) {
    console.warn('Failed to fetch backend missions:', err);
  }
  return [];
}

/** Retrieve a single mission by ID */
export async function getBackendMission(id: string): Promise<BackendMission | null> {
  try {
    const res = await fetch(`${API_BASE}/api/missions/${id}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Failed to fetch mission ${id}:`, err);
  }
  return null;
}

/** Create a new mission */
export async function createBackendMission(name: string): Promise<{ id: string; status: string }> {
  const res = await fetch(`${API_BASE}/api/missions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    throw new Error(`Mission creation failed: ${res.statusText}`);
  }
  const data = await res.json();
  return { id: data.id || data.missionId, status: data.status };
}

/**
 * Upload UAV Drone Video with XMLHttpRequest for real-time progress tracking
 */
export function uploadMissionVideo(
  missionId: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ missionId: string; filename: string; size: number; status: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('video', file, file.name);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const pct = Math.round((e.loaded / e.total) * 100);
        onProgress(pct);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve(res);
        } catch {
          resolve({ missionId, filename: file.name, size: file.size, status: 'uploaded' });
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during video upload'));
    });

    xhr.open('POST', `${API_BASE}/api/missions/${missionId}/video`);
    xhr.send(formData);
  });
}

/** Start single-pass 3D reconstruction pipeline on backend */
export async function startMissionProcessing(missionId: string): Promise<{ jobId: string; status: string }> {
  const res = await fetch(`${API_BASE}/api/missions/${missionId}/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Start processing failed: ${res.statusText}`);
  }
  return await res.json();
}

/** Poll processing status of a mission */
export async function pollMissionStatus(missionId: string): Promise<MissionStatusResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/missions/${missionId}/status`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Polling mission status error for ${missionId}:`, err);
  }
  return null;
}

/** Retrieve real GeoJSON flight path */
export async function getMissionFlightPath(missionId: string): Promise<{
  type: 'LineString';
  coordinates: [number, number][];
} | null> {
  try {
    const res = await fetch(`${API_BASE}/api/missions/${missionId}/flight-path`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Flight path fetch error for ${missionId}:`, err);
  }
  return null;
}

/** Retrieve reconstructed 3D model metadata */
export async function getMissionModel(missionId: string): Promise<{
  id: string;
  status: string;
  modelUrl?: string;
  viewerUrl?: string;
  footprint?: any;
  origin?: { lat: number; lng: number };
} | null> {
  try {
    const res = await fetch(`${API_BASE}/api/missions/${missionId}/model`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Model metadata fetch error for ${missionId}:`, err);
  }
  return null;
}
