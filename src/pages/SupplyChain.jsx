import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ToastContainer from '../components/ToastContainer';
import { useToast } from '../hooks/useAppHooks';
import { fleetData } from '../data/mockData';
import { Card, CardContent } from "@/components/ui/card";

import { Map, MapMarker, MarkerContent, MapControls } from '../components/ui/map';

const STATUS_COLORS = { normal: '#22c55e', late: '#fbbf24', anomaly: '#f85149' };

const FleetMap = ({ fleet, selected, onSelect }) => {
  const initialViewport = {
    center: [112.74, -7.33],
    zoom: 11,
    pitch: 50,
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-800">
      <Map
        viewport={initialViewport}
        theme="dark"
        className="w-full h-full"
      >
        <MapControls position="bottom-right" showZoom showCompass />

        {/* Center point (Gudang Utama) */}
        <MapMarker longitude={112.74} latitude={-7.25}>
          <MarkerContent className="flex flex-col items-center pointer-events-none">
            <div className="w-5 h-5 rounded-md bg-gray-800 border-2 border-gray-600 shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-300 text-[12px]">warehouse</span>
            </div>
          </MarkerContent>
        </MapMarker>

        {fleet.map((truck) => {
          const color = STATUS_COLORS[truck.status];
          const isSelected = selected?.id === truck.id;
          
          return (
            <MapMarker
              key={truck.id}
              longitude={truck.lng}
              latitude={truck.lat}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(truck);
              }}
            >
              <MarkerContent
                className={`group cursor-pointer ${isSelected ? 'z-50' : 'z-10'}`}
              >
                {/* Wrap the content in a div to ensure click hits the whole area */}
                <div className="relative">
                  {truck.status !== 'normal' && (
                    <span className="absolute inset-0 rounded-full animate-ping opacity-50 pointer-events-none" style={{ backgroundColor: color }} />
                  )}
                  
                  <div className="w-10 h-10 rounded-full border-[3px] shadow-2xl flex items-center justify-center relative z-10 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: isSelected ? 'white' : 'rgba(255,255,255,0.4)',
                      transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: isSelected ? `0 0 25px ${color}80` : `0 4px 10px rgba(0,0,0,0.5)`,
                    }}>
                    <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                  </div>
                  
                  {/* Truck ID Label (Hidden when selected to show popup instead) */}
                  {!isSelected && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-[10px] px-2 py-0.5 rounded-md font-bold shadow-lg border border-white/20 transition-opacity"
                      style={{ backgroundColor: color, opacity: 0.8 }}>
                      {truck.id}
                    </div>
                  )}

                  {/* Selected Popup */}
                  {isSelected && (
                    <div className="absolute bottom-[130%] left-1/2 -translate-x-1/2 w-56 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-3 z-50 animate-fade-up pointer-events-none">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white text-sm">Truk {truck.id}</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${color}20`, color }}>
                          {truck.statusLabel || truck.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1 mb-2">
                        <div className="flex justify-between">
                          <span>Suhu Kabin:</span>
                          <span className={`font-bold ${truck.cabinTemp > 10 ? 'text-red-400' : 'text-blue-400'}`}>{truck.cabinTemp}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ETA:</span>
                          <span className="text-white font-bold">{truck.eta}</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-400 border-t border-gray-800 pt-2 flex flex-col gap-1 mt-1">
                        <span className="text-[9px] text-gray-500 uppercase font-bold">Muatan Aktif:</span>
                        {truck.cargo.map((c, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{c.item}</span>
                            <span className="text-white font-bold">{c.qty}</span>
                          </div>
                        ))}
                      </div>
                      {/* Arrow pointing down */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-b border-r border-gray-700 rotate-45"></div>
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
        {[['normal', 'Normal'], ['late', 'Terlambat'], ['anomaly', 'Anomali']].map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 font-bold" style={{ color: STATUS_COLORS[key] }}>
            <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: STATUS_COLORS[key] }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

const SupplyChain = () => {
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();
  const [selectedTruck, setSelectedTruck] = useState(fleetData[0]);
  const [activeTab, setActiveTab] = useState('tracker');

  const [dapurPOs, setDapurPOs] = useState([
    { id: 'PO-DPR-01', dapur: 'Dapur Umum Rungkut', items: '2 Ton Beras, 500 Kg Ayam', date: 'Besok, 06:00', status: 'pending' },
    { id: 'PO-DPR-02', dapur: 'Dapur Umum Sukolilo', items: '1.5 Ton Beras, 300 Kg Ayam', date: 'Besok, 06:30', status: 'pending' }
  ]);

  const [returQueue, setReturQueue] = useState([
    { id: 'RET-001', batchId: 'MBG-AYM-8829', dapur: 'Dapur Umum Gubeng', reason: 'Suhu drop di atas ambang batas', status: 'pending', amount: 'Rp 2.500.000' }
  ]);

  const handleContact = (truck) => {
    showToast({ message: `Menghubungi pengemudi armada ${truck.id}...`, type: 'info' });
  };

  const handleRevisiPO = (id) => {
    setDapurPOs(prev => prev.filter(po => po.id !== id));
    showToast({ message: `PO ${id} dikembalikan ke Dapur Umum untuk direvisi.`, type: 'info' });
  };

  const handleApprovePO = (id) => {
    setDapurPOs(prev => prev.filter(po => po.id !== id));
    showToast({ message: `PO ${id} disetujui dan disinkronkan ke AI Forecasting.`, type: 'success' });
  };

  const handleInvestigasi = (id) => {
    showToast({ message: `Tim operasional ditugaskan untuk investigasi Retur ${id}.`, type: 'warning' });
  };

  const handleClaimRetur = (id) => {
    setReturQueue(prev => prev.filter(r => r.id !== id));
    showToast({ message: `Klaim asuransi untuk Retur ${id} sedang diproses. Dana akan disesuaikan di Financials.`, type: 'info' });
  };

  const statusTag = (status) => {
    if (status === 'normal') return <span className="tag tag-green">✓ Normal</span>;
    if (status === 'late') return <span className="tag tag-amber">⚠ Terlambat</span>;
    return <span className="tag tag-red">🚨 Anomali</span>;
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <AdminLayout activePage="supply" title="Supply Chain">
        {/* Page header */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Module</p>
          <h1 className="font-display text-2xl font-extrabold text-white">Supply Chain & Distribusi</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-6 border-b border-gray-800 pb-2">
          <button 
            onClick={() => setActiveTab('tracker')} 
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors ${activeTab === 'tracker' ? 'text-white border-b-2 border-green-500 bg-white/5' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Control Tower (Armada)
          </button>
          <button 
            onClick={() => setActiveTab('po')} 
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'po' ? 'text-white border-b-2 border-green-500 bg-white/5' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Purchase Order Dapur
            {dapurPOs.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-[10px] text-white">
                {dapurPOs.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('retur')} 
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'retur' ? 'text-white border-b-2 border-red-500 bg-white/5' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Retur & Kendala
            {returQueue.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-[10px] text-white animate-pulse">
                {returQueue.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'tracker' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-up">
            {/* Fleet Map */}
            <Card className="lg:col-span-8 overflow-hidden flex flex-col" style={{ height: 480 }}>
              <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3 bg-card">
                <span className="material-symbols-outlined text-teal-400">explore</span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">Logistics Live Tracking</h3>
                  <p className="text-xs text-gray-400">Klik ikon armada untuk detail muatan</p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />Live
                </span>
              </div>
              <div className="flex-1 relative">
                <FleetMap fleet={fleetData} selected={selectedTruck} onSelect={setSelectedTruck} />
              </div>
            </Card>

            {/* Right column */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              {/* Truck detail */}
              <Card className="flex-1">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400">local_shipping</span>
                      Status Armada
                    </h3>
                    <div className="flex gap-1.5">
                      {fleetData.map(t => (
                        <button key={t.id} onClick={() => setSelectedTruck(t)}
                          title={t.id}
                          className="w-2.5 h-2.5 rounded-full border-2 transition-all"
                          style={{
                            backgroundColor: STATUS_COLORS[t.status],
                            borderColor: selectedTruck?.id === t.id ? 'white' : 'transparent',
                            transform: selectedTruck?.id === t.id ? 'scale(1.4)' : 'scale(1)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {selectedTruck && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display text-xl font-bold text-white">Truk {selectedTruck.id}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            ETA: <strong className="text-white ml-0.5">{selectedTruck.eta}</strong>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            {selectedTruck.location}
                          </div>
                        </div>
                      </div>

                      {/* Cargo */}
                      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Muatan Aktif</p>
                        <div className="flex flex-col gap-2">
                          {selectedTruck.cargo.map((c, i) => (
                            <div key={i} className={`flex justify-between items-center text-sm ${i > 0 ? 'pt-2 border-t border-gray-800' : ''}`}>
                              <span className="text-gray-300">{c.item}</span>
                              <span className="font-bold text-white">{c.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Temp & Status */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl p-3"
                          style={{
                            background: selectedTruck.cabinTemp > 10 ? 'rgba(248,81,73,0.08)' : 'rgba(88,166,255,0.06)',
                            border: `1px solid ${selectedTruck.cabinTemp > 10 ? 'rgba(248,81,73,0.2)' : 'rgba(88,166,255,0.12)'}`,
                          }}>
                          <p className="text-xs text-gray-400 mb-1">Suhu Kabin</p>
                          <p className={`text-lg font-bold flex items-center gap-1 ${selectedTruck.cabinTemp > 10 ? 'text-red-400' : 'text-blue-400'}`}>
                            <span className="material-symbols-outlined text-sm">ac_unit</span>
                            {selectedTruck.cabinTemp}°C
                          </p>
                        </div>
                        <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-xs text-gray-400 mb-1">Status</p>
                          {statusTag(selectedTruck.status)}
                        </div>
                      </div>

                      <button onClick={() => handleContact(selectedTruck)} className="btn-ghost w-full justify-center text-xs">
                        <span className="material-symbols-outlined text-sm">call</span>
                        Hubungi Pengemudi
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Verification Queue */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400">qr_code_scanner</span>
                      Antrean Verifikasi
                    </h3>
                    <span className="tag tag-amber">1 Pending</span>
                  </div>
                  <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">Batch #MBG-AYM-8829</span>
                      <span className="text-xs text-gray-400">SPPG Rungkut</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-400">
                      <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                      Menunggu Konfirmasi QR
                    </div>
                  </div>
                  <button onClick={() => navigate('/scanner')} className="btn-primary w-full justify-center">
                    <span className="material-symbols-outlined text-sm">qr_code</span>
                    Scan Sekarang
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'po' && (
          <div className="animate-fade-up grid grid-cols-1 gap-5">
            <div className="mb-2">
              <h2 className="font-display text-2xl font-extrabold text-white">Purchase Order Dapur Umum</h2>
              <p className="text-sm text-gray-400">Verifikasi permintaan pasokan dari Dapur Umum sebelum disinkronkan ke AI Forecasting.</p>
            </div>
            
            {dapurPOs.length === 0 ? (
              <Card className="flex flex-col items-center justify-center text-gray-500">
                <CardContent className="p-10 flex flex-col items-center">
                  <span className="material-symbols-outlined text-5xl mb-3">check_circle</span>
                  <p className="font-bold text-white mb-1">Semua PO Terverifikasi</p>
                  <p className="text-sm text-center">Tidak ada request pasokan baru dari dapur umum saat ini.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {dapurPOs.map(po => (
                  <Card key={po.id} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 z-10" />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Request Pengiriman: {po.date}</p>
                          <h4 className="font-display text-lg font-bold text-white">{po.dapur}</h4>
                        </div>
                        <span className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{po.id}</span>
                      </div>
                      
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 mb-5">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Item Dibutuhkan</p>
                        <p className="text-sm font-bold text-blue-400">{po.items}</p>
                      </div>
                      
                      <div className="flex gap-3">
                        <button onClick={() => handleRevisiPO(po.id)} className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors border border-gray-700">Revisi PO</button>
                        <button onClick={() => handleApprovePO(po.id)} className="flex-[2] py-2.5 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex justify-center items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">sync</span>
                          Approve & Sync ke AI
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'retur' && (
          <div className="animate-fade-up grid grid-cols-1 gap-5">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">warning</span>
                  Manajemen Retur & Asuransi
                </h2>
                <p className="text-sm text-gray-400">Pencatatan pengembalian barang dari Dapur Umum akibat kendala rantai dingin.</p>
              </div>
            </div>
            
            {returQueue.length === 0 ? (
              <Card className="flex flex-col items-center justify-center text-gray-500">
                <CardContent className="p-10 flex flex-col items-center">
                  <span className="material-symbols-outlined text-5xl mb-3">shield</span>
                  <p className="font-bold text-white mb-1">Rantai Dingin Terjaga</p>
                  <p className="text-sm text-center">Tidak ada laporan barang retur atau rusak dari dapur umum.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {returQueue.map(retur => (
                  <Card key={retur.id} className="relative overflow-hidden border-red-500/20 shadow-[0_0_15px_rgba(248,81,73,0.05)]">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500 z-10" />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="tag tag-red mb-2 inline-flex">Ditolak oleh {retur.dapur}</span>
                          <h4 className="font-display text-lg font-bold text-white">Batch {retur.batchId}</h4>
                        </div>
                        <span className="text-xs font-mono bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/30">{retur.id}</span>
                      </div>
                      
                      <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/10 mb-5">
                        <p className="text-xs text-gray-400 font-bold mb-1">Alasan Penolakan</p>
                        <p className="text-sm font-bold text-red-400 flex items-start gap-2">
                          <span className="material-symbols-outlined text-[18px]">gpp_bad</span>
                          {retur.reason}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mb-5 border-t border-gray-800 pt-4">
                        <div>
                          <p className="text-xs text-gray-500 font-bold mb-0.5">Estimasi Kerugian</p>
                          <p className="text-lg font-bold text-white">{retur.amount}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button onClick={() => handleInvestigasi(retur.id)} className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors border border-gray-700">Investigasi Armada</button>
                        <button onClick={() => handleClaimRetur(retur.id)} className="flex-[2] py-2.5 rounded-lg text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-colors flex justify-center items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">request_quote</span>
                          Ajukan Klaim Asuransi
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

      </AdminLayout>
    </>
  );
};

export default SupplyChain;
