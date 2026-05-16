import { useState } from 'react';
import { Map, MapMarker, MarkerContent, MapControls } from './ui/map';

const STATUS_COLORS = {
  ready: '#22c55e',
  transit: '#f59e0b',
  contracted: '#6b7280',
};

const STATUS_LABELS = {
  ready: 'Siap Setor',
  transit: 'Dalam Transit',
  contracted: 'Terkontrak',
};

const StarRating = ({ value }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} className="material-symbols-outlined"
        style={{ fontSize: 13, color: i <= Math.round(value) ? '#fbbf24' : '#374151', fontVariationSettings: "'FILL' 1" }}>
        star
      </span>
    ))}
    <span className="text-xs text-gray-400 ml-1">{value}</span>
  </div>
);

/**
 * Controlled ProsumerMap — parent manages selected state.
 * Props: locations, selected, onSelect
 */
const ProsumerMap = ({ locations, selected, onSelect }) => {
  const [hovered, setHovered] = useState(null);

  const initialViewport = {
    center: [112.7, -7.27],
    zoom: 10,
    pitch: 45,
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-800">
      <Map viewport={initialViewport} theme="dark" className="w-full h-full">
        <MapControls position="bottom-right" showZoom showCompass showLocate />

        {/* KDMP HQ */}
        <MapMarker longitude={112.74} latitude={-7.25}>
          <MarkerContent className="flex flex-col items-center pointer-events-none">
            <div className="absolute -top-6 whitespace-nowrap bg-secondary text-on-secondary text-[9px] px-1.5 py-0.5 rounded font-bold shadow-lg">
              KDMP Surabaya
            </div>
            <div className="w-5 h-5 rounded-md bg-gray-800 border-2 border-gray-600 shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-300 text-[12px]">warehouse</span>
            </div>
          </MarkerContent>
        </MapMarker>

        {/* Prosumer pins */}
        {locations.map(loc => {
          const color = STATUS_COLORS[loc.status];
          const isSelected = selected?.id === loc.id;
          const isHovered = hovered === loc.id;

          return (
            <MapMarker
              key={loc.id}
              longitude={loc.lng}
              latitude={loc.lat}
              onClick={(e) => { e.stopPropagation?.(); onSelect?.(loc); }}
            >
              <MarkerContent
                className={`group cursor-pointer ${isSelected ? 'z-50' : 'z-10'}`}
                onMouseEnter={() => setHovered(loc.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative">
                  {loc.status !== 'contracted' && (
                    <span className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
                      style={{ backgroundColor: color }} />
                  )}
                  <div
                    className="w-10 h-10 rounded-full border-[3px] shadow-2xl flex items-center justify-center relative z-10 transition-all duration-300"
                    style={{
                      backgroundColor: color,
                      borderColor: isSelected ? 'white' : 'rgba(255,255,255,0.4)',
                      transform: isSelected ? 'scale(1.2)' : isHovered ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isSelected ? `0 0 25px ${color}80` : '0 4px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span className="text-white font-bold text-[14px]">{loc.commodity.charAt(0)}</span>
                  </div>

                  {/* Hover label */}
                  {isHovered && !isSelected && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap border border-gray-700 text-white text-[10px] px-2 py-1 rounded-md shadow-xl font-bold pointer-events-none z-20"
                      style={{ backgroundColor: color }}>
                      {loc.name}
                    </div>
                  )}

                  {/* Selected floating popup */}
                  {isSelected && (
                    <div className="absolute bottom-[130%] left-1/2 -translate-x-1/2 w-52 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-3 z-50 animate-fade-up pointer-events-none">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white text-sm">{loc.name}</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${color}20`, color }}>
                          {STATUS_LABELS[loc.status]}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1 mb-2">
                        <div className="flex justify-between">
                          <span>Komoditas:</span>
                          <span className="text-white font-bold">{loc.commodity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Setoran:</span>
                          <span className="font-bold" style={{ color }}>{loc.qty}</span>
                        </div>
                      </div>
                      <StarRating value={loc.rating} />
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-b border-r border-gray-700 rotate-45" />
                    </div>
                  )}
                </div>
              </MarkerContent>
            </MapMarker>
          );
        })}
      </Map>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 p-2.5 rounded-xl flex flex-col gap-2 text-[11px] z-10 shadow-lg"
        style={{ background: 'rgba(13,17,23,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 font-bold" style={{ color: STATUS_COLORS[key] }}>
            <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: STATUS_COLORS[key] }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProsumerMap;
