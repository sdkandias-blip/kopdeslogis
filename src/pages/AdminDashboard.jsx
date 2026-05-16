import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import MiniLineChart from '../components/MiniLineChart';
import ProsumerMap from '../components/ProsumerMap';
import ToastContainer from '../components/ToastContainer';
import { useToast, useColdChainSim, useContractExecution, useDemandForecast } from '../hooks/useAppHooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { forecastData, coldChainUnits, contractQueue, prosumerLocations, sdgImpact } from '../data/mockData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();
  const [activeChart, setActiveChart] = useState('beras');
  const { data: forecast, loading: forecastLoading, refresh: refreshForecast } = useDemandForecast(forecastData);
  const iotUnits = useColdChainSim(coldChainUnits);
  const { pendingContracts, executeContract } = useContractExecution(contractQueue);

  const primaryUnit = iotUnits[0];
  const alertUnit = iotUnits.find(u => u.status === 'warning');

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
        {/* Alert Banner for warning units */}
        {alertUnit && (
          <div className="mb-6 rounded-xl p-4 flex items-center gap-4 shadow-sm animate-fade-up" style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', color: 'var(--text)' }}>
            <span className="material-symbols-outlined text-red-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-red-400">Peringatan Suhu: {alertUnit.name}</p>
              <p className="text-xs mt-0.5 text-gray-300">Suhu tercatat <strong className="text-white">{alertUnit.temp}°C</strong> (Threshold: {alertUnit.threshold}°C). Deviasi: ±{alertUnit.deviation}°C</p>
            </div>
            <button
              onClick={() => navigate('/operations')}
              className="btn-danger"
            >
              Lihat Detail
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
                  <p className="text-xs text-green-400 font-bold mb-1">🌾 Kebutuhan Beras SPPG</p>
                  <p className="font-display text-2xl text-white font-bold tracking-tight">
                    {Math.max(...forecast.beras).toFixed(1)} <span className="text-sm text-green-500 font-normal tracking-normal">Ton</span>
                  </p>
                </div>
                <div className="flex-1 p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.1)' }}>
                  <p className="text-xs text-amber-400 font-bold mb-1">🐓 Daging Ayam</p>
                  <p className="font-display text-2xl text-white font-bold tracking-tight">
                    {Math.max(...forecast.ayam).toFixed(1)} <span className="text-sm text-amber-500 font-normal tracking-normal">Ton</span>
                  </p>
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
              <p className={`font-display text-5xl font-extrabold tracking-tighter mb-2 z-10 transition-colors ${primaryUnit.status === 'warning' ? 'text-red-400' : 'text-blue-400'}`}>
                {primaryUnit.temp.toFixed(1)}°
              </p>
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

          {/* 3. Peta Distribusi Prosumer */}
          <Card className="lg:col-span-5 flex flex-col min-h-[320px]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined text-indigo-400">radar</span>
                Radar Panen Harian
              </CardTitle>
              <CardDescription>(Radius 50 Km dari KDMP)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pt-0 pb-6">
              <div className="flex-1 rounded-xl overflow-hidden border border-gray-800 relative bg-gray-900/30">
                <ProsumerMap locations={prosumerLocations} />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="tag tag-green bg-gray-900/80 backdrop-blur-md">Panen Hari Ini</span>
                </div>
              </div>
            </CardContent>
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
          <Card className="lg:col-span-3 flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined text-blue-400">public</span>
                SDG Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 flex-1 justify-center pt-0 pb-6">
              {sdgImpact.map(sdg => (
                <div key={sdg.id} className="group">
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
