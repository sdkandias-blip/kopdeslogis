import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import MiniLineChart from '../components/MiniLineChart';
import ProsumerMap from '../components/ProsumerMap';
import ToastContainer from '../components/ToastContainer';
import { useToast, useColdChainSim, useContractExecution, useDemandForecast } from '../hooks/useAppHooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { forecastData, coldChainUnits, contractQueue, prosumerLocations, sdgImpact } from '../data/mockData';
import Counter from '../components/ui/Counter';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();
  const [activeChart, setActiveChart] = useState('beras');
  const { data: forecast, loading: forecastLoading, refresh: refreshForecast } = useDemandForecast(forecastData);
  const iotUnits = useColdChainSim(coldChainUnits);
  const { pendingContracts, executeContract } = useContractExecution(contractQueue);

  const primaryUnit = iotUnits[0];
  const alertUnit = iotUnits.find(u => u.status === 'warning');

  const [selectedProsumer, setSelectedProsumer] = useState(prosumerLocations[0]);

  const chartColors = { beras: '#22c55e', ayam: '#fbbf24', ikan: '#58a6ff' };
  const chartData = { beras: forecast.beras, ayam: forecast.ayam };

  const handleExecuteContract = (contract) => {
    executeContract(contract.id);
    showToast({ message: `Kontrak ${contract.id} untuk ${contract.prosumer} berhasil dieksekusi!`, type: 'success' });
  };

  const handleScanBatch = () => navigate('/scanner');

  return (
    <>
      <ToastContainer toasts={toasts} />
      <AdminLayout activePage="home" title="Dashboard Overview">

        {/* Page Intro */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white mb-1">Selamat Datang 👋</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Monitor rantai pasok MBG secara real-time — Surabaya Region</p>
        </div>

        {/* Alert Banner for warning units */}
        {alertUnit && (
          <div className="mb-6 rounded-xl p-4 flex items-center gap-4 animate-fade-up"
            style={{ background: 'rgba(248,81,73,0.07)', border: '1px solid rgba(248,81,73,0.2)' }}>
            <span className="material-symbols-outlined text-red-500 flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-400 mb-0.5">Peringatan: {alertUnit.name}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Suhu <strong className="text-white">{alertUnit.temp}°C</strong> — Threshold: {alertUnit.threshold}°C · Deviasi: ±{alertUnit.deviation}°C</p>
            </div>
            <button onClick={() => navigate('/operations')} className="btn-danger text-xs py-1.5 px-3 flex-shrink-0">
              Lihat
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          
          {/* 1. AI Demand Forecasting */}
          <Card className="lg:col-span-8 flex flex-col">
            <CardHeader className="flex flex-row justify-between items-start pb-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="material-symbols-outlined text-teal-400">trending_up</span>
                  Proyeksi Kebutuhan Dapur Umum
                </CardTitle>
                <CardDescription>
                  (7 Hari ke Depan — AI Forecast)
                </CardDescription>
              </div>
              <button
                onClick={refreshForecast}
                disabled={forecastLoading}
                className="btn-ghost disabled:opacity-50 text-xs mt-0"
              >
                <span className={`material-symbols-outlined text-sm ${forecastLoading ? 'animate-spin-slow' : ''}`}>refresh</span>
                {forecastLoading ? 'Memuat...' : 'Refresh AI'}
              </button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pt-0">
              {/* Chart tabs */}
              <div className="flex gap-2 mb-4">
                {Object.entries(chartColors).filter(([k]) => k !== 'ikan').map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => setActiveChart(key)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold transition-all border"
                    style={{
                      backgroundColor: activeChart === key ? color : 'transparent',
                      borderColor: activeChart === key ? 'transparent' : 'var(--border)',
                      color: activeChart === key ? '#000' : 'var(--muted)',
                    }}
                  >
                    {key === 'beras' ? '🌾 Beras' : '🐓 Ayam'}
                  </button>
                ))}
              </div>

              {/* Chart */}
              <div className="flex-1 min-h-[180px] rounded-xl overflow-hidden bg-gray-900/50 border border-gray-800 mb-5 relative">
                {forecastLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 skeleton">
                    <span className="material-symbols-outlined animate-spin-slow mr-2">refresh</span>
                    <span className="text-sm font-medium">Menghitung proyeksi AI...</span>
                  </div>
                ) : (
                  <div className="w-full h-full p-2">
                    <div style={{ height: '100%', minHeight: '160px' }}>
                      <MiniLineChart
                        data={chartData[activeChart] || forecast.beras}
                        categories={forecast.labels}
                        color={chartColors[activeChart]}
                        reorderPoint={forecast.reorderPoint[activeChart]}
                        label={activeChart}
                        showDots
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Summary metrics */}
              <div className="flex gap-4">
                <div className="flex-1 p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)' }}>
                  <p className="text-xs text-green-400 font-bold mb-2">🌾 Kebutuhan Beras SPPG</p>
                  <div className="flex items-end gap-1">
                    <Counter
                      value={parseFloat(Math.max(...forecast.beras).toFixed(1))}
                      fontSize={28}
                      gap={2}
                      horizontalPadding={0}
                      textColor="white"
                      fontWeight={700}
                      gradientFrom="transparent"
                    />
                    <span className="text-sm text-green-500 font-normal mb-0.5">Ton</span>
                  </div>
                </div>
                <div className="flex-1 p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.1)' }}>
                  <p className="text-xs text-amber-400 font-bold mb-2">🐓 Daging Ayam</p>
                  <div className="flex items-end gap-1">
                    <Counter
                      value={parseFloat(Math.max(...forecast.ayam).toFixed(1))}
                      fontSize={28}
                      gap={2}
                      horizontalPadding={0}
                      textColor="white"
                      fontWeight={700}
                      gradientFrom="transparent"
                    />
                    <span className="text-sm text-amber-500 font-normal mb-0.5">Ton</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Real-Time Cold Chain IoT */}
          <Card className={`lg:col-span-4 flex flex-col ${primaryUnit.status === 'warning' ? 'border-red-500/50 shadow-[0_0_15px_rgba(248,81,73,0.1)]' : ''}`}>
            <CardHeader className="flex flex-row justify-between items-start pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className={`material-symbols-outlined ${primaryUnit.status === 'warning' ? 'text-red-500' : 'text-blue-400'}`}>ac_unit</span>
                {primaryUnit.name}
              </CardTitle>
              <span className={`w-2.5 h-2.5 rounded-full mt-1.5 animate-pulse-dot ${primaryUnit.status === 'warning' ? 'bg-red-500' : 'bg-green-500'}`}></span>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center pt-0 pb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className={`z-10 flex items-center transition-colors`}>
                {primaryUnit.temp < 0 && (
                  <span className="font-bold mr-0.5" style={{ fontSize: 48, color: primaryUnit.status === 'warning' ? '#f87171' : '#60a5fa', lineHeight: 1 }}>−</span>
                )}
                <Counter
                  value={parseFloat(Math.abs(primaryUnit.temp).toFixed(1))}
                  fontSize={48}
                  gap={2}
                  horizontalPadding={0}
                  textColor={primaryUnit.status === 'warning' ? '#f87171' : '#60a5fa'}
                  fontWeight={800}
                  gradientFrom="transparent"
                />
                <span className="font-bold ml-0.5" style={{ fontSize: 28, color: primaryUnit.status === 'warning' ? '#f87171' : '#60a5fa', lineHeight: 1, alignSelf: 'flex-start', marginTop: 4 }}>°</span>
              </div>
              <div className="z-10 bg-gray-800/50 border border-gray-700/50 px-3 py-1.5 rounded-full mb-4">
                <p className="text-[11px] text-gray-300 font-medium">
                  Threshold: <span className="text-white">{primaryUnit.threshold}°C</span> <span className="mx-1 text-gray-600">|</span> Deviasi: <span className="text-white">±{primaryUnit.deviation}°C</span>
                </p>
              </div>
              <p className="text-xs text-gray-400 font-medium z-10">{primaryUnit.contents}</p>
            </CardContent>

            {/* Mini unit status list */}
            <CardFooter className="border-t border-gray-800 pt-5 flex flex-col gap-3">
              {iotUnits.map(unit => (
                <div key={unit.id} className="flex justify-between items-center text-sm w-full">
                  <span className="text-gray-300 font-medium">{unit.name}</span>
                  <span className={`stat-badge ${unit.status === 'warning' ? 'stat-badge-red' : 'stat-badge-green'}`}>
                    {unit.temp.toFixed(1)}°C
                  </span>
                </div>
              ))}
            </CardFooter>
          </Card>

          {/* 3. Radar Panen — Supply Chain Style */}
          <Card className="lg:col-span-8 flex flex-col overflow-hidden" style={{ height: 420 }}>
            <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3 bg-card flex-shrink-0">
              <span className="material-symbols-outlined text-indigo-400">radar</span>
              <div>
                <h3 className="font-display text-base font-bold text-white">Radar Panen Harian</h3>
                <p className="text-xs text-gray-400">Klik pin mitra untuk melihat detail setoran</p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />Live
              </span>
            </div>
            <div className="flex flex-1 overflow-hidden">
              {/* Map (left) */}
              <div className="flex-1 relative">
                <ProsumerMap
                  locations={prosumerLocations}
                  selected={selectedProsumer}
                  onSelect={setSelectedProsumer}
                />
              </div>
              {/* Detail panel (right) */}
              <div className="w-72 flex-shrink-0 border-l border-gray-800 flex flex-col overflow-y-auto" style={{ background: '#0a0c10' }}>
                {/* Mitra selector dots */}
                <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Detail Mitra</h4>
                  <div className="flex gap-1.5">
                    {prosumerLocations.map(loc => (
                      <button key={loc.id} onClick={() => setSelectedProsumer(loc)}
                        title={loc.name}
                        className="w-2.5 h-2.5 rounded-full border-2 transition-all"
                        style={{
                          backgroundColor: { ready: '#22c55e', transit: '#f59e0b', contracted: '#6b7280' }[loc.status],
                          borderColor: selectedProsumer?.id === loc.id ? 'white' : 'transparent',
                          transform: selectedProsumer?.id === loc.id ? 'scale(1.4)' : 'scale(1)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {selectedProsumer ? (
                  <div className="flex flex-col flex-1">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-800/60">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: { ready: '#22c55e', transit: '#f59e0b', contracted: '#6b7280' }[selectedProsumer.status] }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: { ready: '#22c55e', transit: '#f59e0b', contracted: '#9ca3af' }[selectedProsumer.status] }}>
                          {{ ready: 'Siap Setor', transit: 'Dalam Transit', contracted: 'Terkontrak' }[selectedProsumer.status]}
                        </span>
                      </div>
                      <h3 className="text-[14px] font-bold text-white leading-tight">{selectedProsumer.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{selectedProsumer.type} · {selectedProsumer.location}</p>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4 flex-1">
                      {/* Setoran */}
                      <div className="p-3 rounded-xl" style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.12)' }}>
                        <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest mb-1.5">Setoran Hari Ini</p>
                        <div className="flex justify-between items-end">
                          <p className="text-xl font-extrabold text-white">{selectedProsumer.qty}</p>
                          <p className="text-sm text-gray-300">{selectedProsumer.commodity}</p>
                        </div>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Grade', value: selectedProsumer.grade, color: selectedProsumer.grade === 'Grade A' ? '#22c55e' : '#fbbf24' },
                          { label: 'Rating', value: `★ ${selectedProsumer.rating}`, color: '#fbbf24' },
                          { label: 'Total Setor', value: selectedProsumer.totalSetor, color: '#e6edf3' },
                          { label: 'Pencairan', value: selectedProsumer.totalPencairan, color: '#4ade80' },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">{label}</p>
                            <p className="text-xs font-bold" style={{ color }}>{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Identitas */}
                      <div className="space-y-1.5">
                        {[{ icon: 'badge', label: selectedProsumer.nib }, { icon: 'call', label: selectedProsumer.contact }].map(({ icon, label }) => (
                          <div key={icon} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-600" style={{ fontSize: 14 }}>{icon}</span>
                            <span className="text-xs text-gray-300">{label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Sertifikasi */}
                      <div className="flex flex-wrap gap-1">
                        {selectedProsumer.certifications.map(cert => (
                          <span key={cert} className="px-1.5 py-0.5 rounded text-[9px] font-bold text-blue-300"
                            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-gray-800 space-y-2 flex-shrink-0">
                      <button className="w-full py-2 rounded-xl text-xs font-bold bg-green-500 hover:bg-green-400 text-black transition-colors flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">handshake</span>
                        Buat Kontrak
                      </button>
                      <button
                        className="w-full py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.color='#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='var(--muted)'; }}
                      >
                        <span className="material-symbols-outlined text-sm">groups</span>
                        Portal Prosumer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-600 text-sm">Pilih mitra dari peta</div>
                )}
              </div>
            </div>
          </Card>

          {/* 4. Smart Matching & Kontrak */}
          <Card className="lg:col-span-4 flex flex-col">
            <CardHeader className="flex flex-row justify-between items-center pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined text-green-400">handshake</span>
                Antrean Agregasi
              </CardTitle>
              <span className="tag tag-blue mt-0">
                {pendingContracts.length} Pending
              </span>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 pt-0 pb-6">
              {pendingContracts.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 py-6">
                  <span className="material-symbols-outlined text-4xl mb-3 text-gray-700">task_alt</span>
                  <p className="text-sm font-medium">Semua kontrak telah dieksekusi</p>
                </div>
              ) : (
                pendingContracts.map(contract => (
                  <div key={contract.id} className="p-3.5 border border-gray-800 rounded-xl bg-gray-900/40 flex justify-between items-center gap-3 hover:border-gray-700 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-bold truncate mb-0.5">{contract.prosumer}</p>
                      <p className="text-xs text-gray-400">{contract.commodity} • <span className="text-green-400 font-semibold">{contract.amount} {contract.unit}</span></p>
                    </div>
                    <button
                      onClick={() => handleExecuteContract(contract)}
                      className="btn-primary py-2 px-3 text-xs"
                    >
                      <span className="material-symbols-outlined text-sm">play_arrow</span>
                      Eksekusi
                    </button>
                  </div>
                ))
              )}

              {/* Scan shortcut */}
              <button
                onClick={handleScanBatch}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800/50 transition-all text-sm font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                Scan Batch QR Baru
              </button>
            </CardContent>
          </Card>

          {/* 5. SDG Impact Tracker */}
          <Card className="lg:col-span-12 flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined text-blue-400">public</span>
                SDG Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6 flex-1 pt-0 pb-6">
              {sdgImpact.map(sdg => (
                <div key={sdg.id} className="group flex-1">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{sdg.label}</span>
                    <span className="text-[10px] text-gray-500">{sdg.progress}%</span>
                  </div>
                  <p className="text-lg text-white font-bold mb-2">
                    {sdg.value} <span className="text-xs font-medium text-gray-500 ml-0.5">{sdg.sublabel}</span>
                  </p>
                  <div className="progress-track">
                    <div
                      className={`progress-fill ${sdg.color.replace('bg-', 'bg-gradient-to-r from-gray-800 to-')}`}
                      style={{ width: `${sdg.progress}%`, backgroundColor: sdg.id === 'sdg2' ? '#fbbf24' : sdg.id === 'sdg8' ? '#22c55e' : '#58a6ff' }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
