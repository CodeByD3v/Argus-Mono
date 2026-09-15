# Argus-Mono

> **Continuous Multi-View Drone Video to 3D Photogrammetric Reconstruction & Mission Operations Dashboard**

[![Frontend Build](https://img.shields.io/badge/Frontend-Vite%20%7C%20React%20%7C%20TypeScript-blue)](frontend)
[![Backend API](https://img.shields.io/badge/Backend-Python%20%7C%20SinglePass3D-green)](backend)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Electron-brightgreen)](start.bat)

---

## 🧭 Repository Structure

Argus-Mono is structured as a unified monorepo containing both the frontend client and the photogrammetry backend:

```text
Argus-Mono/
├── frontend/                     # Modern React + TypeScript + MapLibre + Electron dashboard
│   ├── src/
│   │   ├── components/           # Map, HUD, telemetry, timeline, and 3D viewer components
│   │   ├── context/              # ReconstructionContext (state, playback, backend sync)
│   │   ├── services/             # argusApi.ts (HTTP client communicating with backend)
│   │   └── types/                # TypeScript interface definitions
│   ├── public/                   # Satellite map tiles, overlays, and static assets
│   ├── package.json              # Frontend npm dependencies and build scripts
│   ├── vite.config.ts            # Vite bundler & reverse-proxy configuration
│   └── main.js                   # Electron frameless desktop wrapper
│
├── backend/                      # SinglePass3D Python core & HTTP API service
│   ├── singlepass3d/             # Reconstruction pipeline, TSDF surfel fusion, geometry
│   ├── scripts/
│   │   ├── serve_viewer.py       # Multi-threaded HTTP & API server (port 8080)
│   │   ├── missions_manager.py   # State store, video ingestion & pipeline coordinator
│   │   └── run_reconstruction.py # CLI runner for standalone reconstruction jobs
│   ├── Dataset/                  # Ingested missions, ground-truth logs, and flight telemetry
│   ├── demo/                     # Demo drone flight videos and synchronized SRT tracks
│   ├── ui/                       # Standalone fallback WebGL 3D viewer
│   ├── tests/                    # Synthetic flight tests and unit test suite
│   └── requirements.txt          # Python dependencies
│
├── .gitignore                    # Monorepo git ignore rules (builds, caches, node_modules)
├── package.json                  # Root npm scripts for monorepo convenience
├── start.bat                     # One-click Windows launch script (starts backend + frontend)
└── README.md                     # Documentation
```

---

## ⚡ Quickstart

### Prerequisites
- **Node.js** (v18.x or v20.x+) and `npm`
- **Python** (3.10+)

### 1. One-Click Launch (Windows)
Run the automated launcher from the repository root:
```cmd
start.bat
```
This will automatically launch the Argus Backend on `http://localhost:8080` and the Frontend on `http://localhost:5173`.

---

### 2. Manual Startup

#### Step 1: Start the Backend Service
```bash
# From repository root:
python backend/scripts/serve_viewer.py --port 8080 --no-browser
```
The server will start listening on `http://localhost:8080`.

#### Step 2: Start the Frontend UI
```bash
# Open a new terminal:
cd frontend
npm run dev
```
Open your browser at `http://localhost:5173`.

#### Running as Electron Desktop App
```bash
cd frontend
npm run electron:dev
```

---

## 🔗 Frontend ↔ Backend Connection Architecture

The frontend communicates with the backend via REST and Server-Sent Events (SSE) implemented in [`frontend/src/services/argusApi.ts`](frontend/src/services/argusApi.ts):

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint confirming backend readiness |
| `GET` | `/api/missions` | List all historical and active drone flight missions |
| `POST` | `/api/missions` | Create a new reconstruction mission container |
| `POST` | `/api/missions/:id/video` | Upload raw drone video (`.mp4` / `.mov`) with progress tracking |
| `POST` | `/api/missions/:id/process` | Trigger the asynchronous SinglePass3D photogrammetric pipeline |
| `GET` | `/api/missions/:id/status` | Poll real-time stage execution and pipeline progress percentage |
| `GET` | `/api/missions/:id/flight-path` | Retrieve GeoJSON LineString coordinates extracted from telemetry |
| `GET` | `/api/missions/:id/model` | Retrieve reconstructed 3D model metadata and asset URLs |

### Environment Configuration
The frontend automatically defaults to `http://localhost:8080`. You can configure a custom backend endpoint by creating a `frontend/.env` file:
```env
VITE_API_BASE=http://localhost:8080
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, MapLibre GL, Recharts, Lucide Icons, Electron.
- **Backend**: Python 3, OpenCV, NumPy, SciPy, SinglePass3D Photogrammetry Engine.
