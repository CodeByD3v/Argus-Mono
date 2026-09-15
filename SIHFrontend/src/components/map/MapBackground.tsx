import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useReconstruction } from '../../context/ReconstructionContext';

export interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  pitch?: number;
  bearing?: number;
  selectedDrone?: string;
}

// Catmull-Rom Spline Interpolation for silky-smooth continuous flight path motion
function getCatmullRomSpline(points: [number, number][], samplesPerSegment = 32): [number, number][] {
  const result: [number, number][] = [];
  const n = points.length;
  if (n < 2) return points;

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];

    for (let t = 0; t < samplesPerSegment; t++) {
      const u = t / samplesPerSegment;
      const u2 = u * u;
      const u3 = u2 * u;

      // Catmull-Rom basis functions
      const f0 = -0.5 * u3 + u2 - 0.5 * u;
      const f1 = 1.5 * u3 - 2.5 * u2 + 1.0;
      const f2 = -1.5 * u3 + 2.0 * u2 + 0.5 * u;
      const f3 = 0.5 * u3 - 0.5 * u2;

      const lng = f0 * p0[0] + f1 * p1[0] + f2 * p2[0] + f3 * p3[0];
      const lat = f0 * p0[1] + f1 * p1[1] + f2 * p2[1] + f3 * p3[1];
      result.push([lng, lat]);
    }
  }
  result.push(points[n - 1]);
  return result;
}

export const MapBackground: React.FC<MapComponentProps> = ({
  center = [-122.338, 37.525],
  zoom = 12.8,
  pitch = 0,
  bearing = -15,
}) => {
  const recon = useReconstruction();
  const isPlaying = recon?.isPlaying ?? false;
  const currentFrame = recon?.currentFrame ?? 1420;
  const totalFrames = recon?.totalFrames ?? 3840;
  const flightPathCoordinates = recon?.flightPathCoordinates ?? [];

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const arrowElRef = useRef<SVGElement | null>(null);
  const currentPosRef = useRef<[number, number]>(center);
  const smoothFlightPathRef = useRef<[number, number][]>([]);

  const initialCenter = useRef<[number, number]>(center);
  const initialZoom = useRef(zoom);
  const initialPitch = useRef(pitch);
  const initialBearing = useRef(bearing);

  // Initialize MapLibre GL Map with Google Satellite HD & AWS Terrarium DEM Hillshade
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Multi-CDN Google Satellite Stream (Extracted from UI/src/components/map/MissionMap.tsx)
    const googleSatelliteTileUrls = [
      'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      'https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      'https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    ];

    const dpr = typeof window !== 'undefined' ? Math.max(window.devicePixelRatio || 1, 2) : 2;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      pixelRatio: dpr,
      maxTileCacheSize: 500,
      fadeDuration: 0,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          'source-google': {
            type: 'raster',
            tiles: googleSatelliteTileUrls,
            tileSize: 256,
            maxzoom: 22,
            attribution: '© Google',
          },
          'terrain-dem-mesh': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
            ],
            encoding: 'terrarium',
            tileSize: 256,
            maxzoom: 15,
          },
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: {
              'background-color': '#030508',
            },
          },
          {
            id: 'layer-google',
            type: 'raster',
            source: 'source-google',
            paint: {
              'raster-opacity': 1.0,
              // Extracted natural color grading from UI MissionMap.tsx:
              // Preserves rich greenery, natural lake obsidian depth, and sharp rooftops
              'raster-saturation': 0.15,
              'raster-contrast': 0.18,
              'raster-brightness-min': 0.0,
              'raster-brightness-max': 0.96,
              'raster-resampling': 'linear',
            },
          },
          {
            id: 'hillshade-relief',
            type: 'hillshade',
            source: 'terrain-dem-mesh',
            paint: {
              'hillshade-illumination-direction': 315,
              'hillshade-illumination-anchor': 'viewport',
              'hillshade-exaggeration': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                0.35,
                13,
                0.20,
                16,
                0.08,
                18,
                0.0,
              ] as any,
              'hillshade-shadow-color': '#04080e',
              'hillshade-highlight-color': '#3f5838',
              'hillshade-accent-color': '#0b1218',
            },
          },
        ],
      },
      center: initialCenter.current,
      zoom: initialZoom.current,
      pitch: initialPitch.current,
      bearing: initialBearing.current,
      minZoom: 2.0,
      maxZoom: 22.0, // High-res deep zoom enabled
      scrollZoom: true,
      doubleClickZoom: true,
      dragPan: true,
      dragRotate: true,
      touchZoomRotate: true,
      keyboard: true,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('error', (e: any) => {
      // Gracefully ignore normal transient tile cancellations/aborts during pan & zoom
      const err = e?.error || e;
      const msg = String(err?.message || err || '');
      const lowerMsg = msg.toLowerCase();
      const sourceId = String(e?.sourceId || err?.sourceId || '').toLowerCase();

      if (
        lowerMsg.includes('failed to fetch') ||
        lowerMsg.includes('abort') ||
        lowerMsg.includes('network') ||
        lowerMsg.includes('closed') ||
        lowerMsg.includes('connection') ||
        lowerMsg.includes('load') ||
        err?.status === 404 ||
        err?.status === 403 ||
        sourceId.startsWith('terrain') ||
        sourceId.includes('google')
      ) {
        return;
      }
      console.debug('Map notice:', msg);
    });

    map.on('load', () => {
      // 1. High-Precision Continuous Route Control Waypoints (San Mateo / Crystal Springs Corridor)
      const WAYPOINT_CONTROL_POINTS: [number, number][] = [
        [-122.388, 37.582],
        [-122.375, 37.568],
        [-122.358, 37.548],
        [-122.345, 37.534],
        [-122.338, 37.525],
        [-122.324, 37.521],
        [-122.308, 37.514],
        [-122.306, 37.498],
        [-122.316, 37.486],
        [-122.332, 37.478],
        [-122.352, 37.472],
        [-122.368, 37.468],
      ];

      const SMOOTH_FLIGHT_PATH = getCatmullRomSpline(WAYPOINT_CONTROL_POINTS, 32);
      smoothFlightPathRef.current = SMOOTH_FLIGHT_PATH;

      const ROUTE_APPROACH_SOLID = SMOOTH_FLIGHT_PATH.slice(0, 135);
      const ROUTE_LOOP_DASHED = SMOOTH_FLIGHT_PATH.slice(134);

      // Active Flight Segment (Amber Line matching UI.jpeg)
      const ROUTE_AMBER_SEGMENT = [
        [-122.338, 37.525],
        [-122.320, 37.510],
        [-122.305, 37.495],
        [-122.288, 37.478],
      ];

      // Green Shoreline Contour Line (matching UI.jpeg)
      const ROUTE_GREEN_CONTOUR = [
        [-122.360, 37.498],
        [-122.348, 37.488],
        [-122.332, 37.475],
        [-122.308, 37.465],
      ];

      // Solid White Approach Route with soft luminous underglow
      map.addSource('route-approach-source', {
        type: 'geojson',
        data: {
          type: 'Feature' as const,
          properties: {},
          geometry: { type: 'LineString' as const, coordinates: ROUTE_APPROACH_SOLID },
        },
      });

      map.addLayer({
        id: 'route-approach-glow',
        type: 'line',
        source: 'route-approach-source',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 5.5,
          'line-blur': 4,
          'line-opacity': 0.35,
        },
      });

      map.addLayer({
        id: 'route-approach',
        type: 'line',
        source: 'route-approach-source',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 2.6,
          'line-opacity': 1.0,
        },
      });

      // Dashed White Loop Route
      map.addSource('route-loop-source', {
        type: 'geojson',
        data: {
          type: 'Feature' as const,
          properties: {},
          geometry: { type: 'LineString' as const, coordinates: ROUTE_LOOP_DASHED },
        },
      });

      map.addLayer({
        id: 'route-loop-glow',
        type: 'line',
        source: 'route-loop-source',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 4.5,
          'line-blur': 3,
          'line-opacity': 0.25,
          'line-dasharray': [3, 3],
        },
      });

      map.addLayer({
        id: 'route-loop',
        type: 'line',
        source: 'route-loop-source',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 2.2,
          'line-dasharray': [3, 3],
          'line-opacity': 0.95,
        },
      });

      // Active Amber Route Segment (matching UI.jpeg)
      map.addSource('route-amber-source', {
        type: 'geojson',
        data: {
          type: 'Feature' as const,
          properties: {},
          geometry: { type: 'LineString' as const, coordinates: ROUTE_AMBER_SEGMENT },
        },
      });

      map.addLayer({
        id: 'route-amber-glow',
        type: 'line',
        source: 'route-amber-source',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#F5A623',
          'line-width': 4.5,
          'line-blur': 3,
          'line-opacity': 0.40,
        },
      });

      map.addLayer({
        id: 'route-amber',
        type: 'line',
        source: 'route-amber-source',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#F5A623',
          'line-width': 2.2,
          'line-opacity': 0.90,
        },
      });

      // Green Shoreline Contour Route
      map.addSource('route-green-source', {
        type: 'geojson',
        data: {
          type: 'Feature' as const,
          properties: {},
          geometry: { type: 'LineString' as const, coordinates: ROUTE_GREEN_CONTOUR },
        },
      });

      map.addLayer({
        id: 'route-green',
        type: 'line',
        source: 'route-green-source',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#84CC16',
          'line-width': 1.6,
          'line-opacity': 0.75,
        },
      });

      // 2. Navigation Marker: Translucent Frosted Disc + Slate Puck with Heading Delta (matching UI.jpeg)
      const initialPos: [number, number] = [-122.338, 37.525];
      const indicatorEl = document.createElement('div');
      indicatorEl.className = 'relative flex items-center justify-center';
      indicatorEl.innerHTML = `
        <!-- Translucent Frosted Disc with Dashed Ring (104px Diameter matching UI.jpeg) -->
        <div style="
          position: absolute;
          width: 104px;
          height: 104px;
          border-radius: 50%;
          background: rgba(30, 42, 52, 0.38);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1.2px dashed rgba(255, 255, 255, 0.70);
          box-shadow: 0 0 14px rgba(0, 0, 0, 0.45);
          pointer-events: none;
        "></div>

        <!-- Solid Slate-Gray Navigation Marker Disc with White Heading Delta Arrow -->
        <div style="
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #555e67;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.55), 0 0 1px rgba(255, 255, 255, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 20;
        ">
          <!-- White Delta Arrowhead (Heading ~127° base matching UI.jpeg) -->
          <svg id="nav-heading-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" style="transform: rotate(127deg); transition: transform 0.08s linear;">
            <path d="M12 2L20 20L12 16.5L4 20L12 2Z" fill="#FFFFFF"/>
          </svg>
        </div>
      `;

      arrowElRef.current = indicatorEl.querySelector('#nav-heading-arrow') as SVGElement | null;

      markerRef.current = new maplibregl.Marker({ element: indicatorEl })
        .setLngLat(initialPos)
        .addTo(map);

      // Clean Silver Circular Waypoint Nodes along the route (matching UI.jpeg)
      const waypoints: [number, number][] = [
        [-122.375, 37.568],
        [-122.355, 37.545],
        [-122.308, 37.514],
        [-122.316, 37.486],
        [-122.352, 37.472],
      ];

      waypoints.forEach((pt) => {
        const wpEl = document.createElement('div');
        wpEl.style.width = '14px';
        wpEl.style.height = '14px';
        wpEl.style.borderRadius = '50%';
        wpEl.style.backgroundColor = 'rgba(230, 238, 248, 0.95)';
        wpEl.style.border = '2px solid rgba(15, 20, 25, 0.85)';
        wpEl.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.6)';
        new maplibregl.Marker({ element: wpEl }).setLngLat(pt).addTo(map);
      });

      map.resize();
    });

    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync Marker Position & Heading with Video Timeline
  useEffect(() => {
    if (!mapRef.current || !markerRef.current || smoothFlightPathRef.current.length === 0) return;

    const path = smoothFlightPathRef.current;
    const pathLength = path.length;
    const progress = totalFrames > 0 ? Math.max(0, Math.min(1, currentFrame / totalFrames)) : 0;

    const floatIdx = progress * (pathLength - 1);
    const idxA = Math.floor(floatIdx);
    const idxB = Math.min(pathLength - 1, idxA + 1);
    const t = floatIdx - idxA;

    const curLng = path[idxA][0] + t * (path[idxB][0] - path[idxA][0]);
    const curLat = path[idxA][1] + t * (path[idxB][1] - path[idxA][1]);

    currentPosRef.current = [curLng, curLat];

    // 1. Move Marker to current frame location
    markerRef.current.setLngLat([curLng, curLat]);

    // 2. Heading angle calculation
    const lookAheadIdx = Math.min(pathLength - 1, idxA + 2);
    const dLng = path[lookAheadIdx][0] - curLng;
    const dLat = path[lookAheadIdx][1] - curLat;
    const angleRad = Math.atan2(dLng * Math.cos((curLat * Math.PI) / 180), dLat);
    const bearingDeg = ((angleRad * 180) / Math.PI + 360) % 360;

    if (arrowElRef.current) {
      arrowElRef.current.style.transform = `rotate(${bearingDeg}deg)`;
    }
  }, [currentFrame, totalFrames]);

  // Dynamically update map linework and camera when a real backend flight path is loaded
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (flightPathCoordinates && flightPathCoordinates.length >= 2) {
      const smoothed = getCatmullRomSpline(flightPathCoordinates, 16);
      smoothFlightPathRef.current = smoothed;

      if (map.isStyleLoaded()) {
        const source = map.getSource('route-approach-source') as maplibregl.GeoJSONSource | undefined;
        if (source) {
          source.setData({
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: smoothed },
          });
        }

        const centerLng = flightPathCoordinates.reduce((acc, c) => acc + c[0], 0) / flightPathCoordinates.length;
        const centerLat = flightPathCoordinates.reduce((acc, c) => acc + c[1], 0) / flightPathCoordinates.length;

        map.flyTo({
          center: [centerLng, centerLat],
          zoom: 15.5,
          speed: 1.2,
        });

        if (markerRef.current && smoothed.length > 0) {
          markerRef.current.setLngLat(smoothed[0]);
        }
      }
    }
  }, [flightPathCoordinates]);

  return (
    <div
      id="map-wrapper"
      className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#040608] select-none pointer-events-auto"
    >
      {/* 1. Base Google Satellite Map Canvas */}
      <div
        ref={mapContainerRef}
        id="map-canvas-container"
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* 2. Soft Depth-of-Field Peripheral Blur outside the Sharp Focus Area (matching UI.jpeg) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          backdropFilter: 'blur(3.5px)',
          WebkitBackdropFilter: 'blur(3.5px)',
          maskImage:
            'radial-gradient(ellipse 520px 420px at 50% 50%, transparent 0%, transparent 68%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 520px 420px at 50% 50%, transparent 0%, transparent 68%, black 100%)',
        }}
      />

      {/* 3. Deep Background Vignette Blur in Far Periphery / Corners (matching UI.jpeg) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          backdropFilter: 'blur(7px)',
          WebkitBackdropFilter: 'blur(7px)',
          maskImage:
            'radial-gradient(ellipse 760px 600px at 50% 50%, transparent 0%, transparent 60%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 760px 600px at 50% 50%, transparent 0%, transparent 60%, black 100%)',
        }}
      />

      {/* 4. Cinematic Dark Edge Vignette for Floating HUD Contrast (matching UI.jpeg) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 700px 540px at 50% 50%, rgba(2, 4, 8, 0.0) 0%, rgba(2, 4, 8, 0.18) 45%, rgba(2, 4, 8, 0.52) 75%, rgba(1, 2, 4, 0.88) 100%)',
        }}
      />
    </div>
  );
};

export const MapComponent = MapBackground;
export default MapBackground;
