import { useState } from 'react';
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from './ui/map';

/**
 * ProsemerMap - Interactive map using Mapcn (MapLibre)
 */
const ProsumerMap = ({ locations }) => {
  const [hovered, setHovered] = useState(null);

  const statusColors = {
    ready: '#1f6c3a',
    transit: '#f59e0b',
    contracted: '#565e74',
  };
  const statusLabels = {
    ready: 'Siap Setor',
    transit: 'Dalam Transit',
    contracted: 'Terkontrak',
  };

  const initialViewport = {
    center: [112.7, -7.27],
    zoom: 10,
    pitch: 45,
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-800">
      <Map
        viewport={initialViewport}
        theme="dark"
        className="w-full h-full"
      >
        <MapControls position="bottom-right" showZoom showCompass showLocate />

        {/* Center point (KDMP Surabaya) */}
        <MapMarker longitude={112.74} latitude={-7.25}>
          <MarkerContent className="flex flex-col items-center">
            <div className="absolute -top-6 whitespace-nowrap bg-secondary text-on-secondary text-[9px] px-1.5 py-0.5 rounded font-bold shadow-lg">
              KDMP Surabaya
            </div>
            <div className="w-6 h-6 rounded-full bg-secondary border-2 border-white shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[12px]">store</span>
            </div>
          </MarkerContent>
        </MapMarker>

        {/* Prosumer pins */}
        {locations.map(loc => (
          <MapMarker
            key={loc.id}
            longitude={loc.lng}
            latitude={loc.lat}
          >
            <MarkerContent
              onMouseEnter={() => setHovered(loc.id)}
              onMouseLeave={() => setHovered(null)}
              className="group"
            >
              {loc.status === 'ready' && (
                <span className="absolute inset-0 rounded-full bg-secondary/40 animate-ping"></span>
              )}
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white z-10 relative transition-transform group-hover:scale-125"
                style={{ backgroundColor: statusColors[loc.status] }}
              >
                {loc.commodity.charAt(0)}
              </div>
            </MarkerContent>
            
            {hovered === loc.id && (
              <MarkerPopup closeButton={false} offset={20} className="bg-gray-900 border-gray-700 text-white p-2 text-xs shadow-xl min-w-[120px]">
                <p className="font-bold text-sm mb-1">{loc.name}</p>
                <div className="flex justify-between items-center text-gray-300">
                  <span>{loc.commodity}</span>
                  <span className="font-mono text-green-400">{loc.qty}</span>
                </div>
                <p className="mt-1 pt-1 border-t border-gray-700 text-[10px] opacity-80" style={{ color: statusColors[loc.status] }}>
                  {statusLabels[loc.status]}
                </p>
              </MarkerPopup>
            )}
          </MapMarker>
        ))}
      </Map>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-gray-900/80 backdrop-blur-md rounded-lg p-2.5 flex flex-col gap-1.5 border border-gray-800 z-10 shadow-lg">
        {Object.entries(statusLabels).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: statusColors[k] }}></span>
            <span className="text-[10px] text-gray-200 font-medium">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProsumerMap;
