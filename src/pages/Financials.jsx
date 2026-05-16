import { useState } from 'react';
import Chart from 'react-apexcharts';
import AdminLayout from '../layouts/AdminLayout';
import ToastContainer from '../components/ToastContainer';
import { useToast } from '../hooks/useAppHooks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { treasuryMetrics, memberAccounts } from '../data/mockData';

const Financials = () => {
  const { toasts, showToast } = useToast();
  const [processingId, setProcessingId] = useState(null);
  const [clearedIds, setClearedIds] = useState([]);

  const handleCairkan = (member) => {
    setProcessingId(member.id);
    setTimeout(() => {
      setClearedIds(prev => [...prev, member.id]);
      setProcessingId(null);
      showToast({ message: `Dana Rp ${(member.savings / 1000000).toFixed(2)}M untuk ${member.name} berhasil dicairkan!`, type: 'success' });
    }, 1500);
  };

  const handlePotongOtomatis = (member) => {
    setProcessingId(member.id);
    setTimeout(() => {
      setClearedIds(prev => [...prev, member.id]);
      setProcessingId(null);
      showToast({ message: `Cicilan Rp ${(member.credit / 1000000).toFixed(2)}M untuk ${member.name} dipotong otomatis.`, type: 'info' });
    }, 1500);
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <AdminLayout activePage="financials" title="Financials">
        {/* Page header */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Module</p>
          <h1 className="font-display text-2xl font-extrabold text-white">Financial Overview</h1>
          <p className="text-sm text-gray-400 mt-1">Manajemen perbendaharaan, penyelesaian, dan keuangan anggota koperasi.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Treasury Metric Cards */}
          <section className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {treasuryMetrics.map((metric) => {
              const chartOptions = {
                chart: { type: 'area', sparkline: { enabled: true }, animations: { enabled: true, easing: 'easeinout', speed: 800 } },
                stroke: { curve: 'smooth', width: 2 },
                fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.0, stops: [0, 100] } },
                colors: [metric.sparkColor],
                tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } }, marker: { show: false } }
              };
              
              return (
              <Card
                key={metric.id}
                className="relative overflow-hidden group"
              >
                <CardContent className="p-6">
                  {/* Ghost icon */}
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined" style={{ fontSize: 72 }}>{metric.icon}</span>
                  </div>

                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">{metric.label}</p>
                  <div className="font-display text-3xl font-extrabold text-white mb-1">{metric.value}</div>

                  {/* Trend */}
                  <div className={`flex items-center gap-1 text-xs font-bold mb-5 ${metric.trendUp === true ? 'text-green-400' : metric.trendUp === false ? 'text-red-400' : 'text-gray-400'}`}>
                    {metric.trendUp === true && <span className="material-symbols-outlined text-sm">trending_up</span>}
                    {metric.trendUp === false && <span className="material-symbols-outlined text-sm">trending_down</span>}
                    {metric.trendUp === null && <span className="material-symbols-outlined text-sm">pending_actions</span>}
                    <span>{metric.trend}</span>
                  </div>

                  {/* Sparkline */}
                  <div className="h-12 w-full mt-2 relative z-10">
                    <Chart 
                      options={chartOptions} 
                      series={[{ data: metric.sparkData }]} 
                      type="area" 
                      height="100%" 
                      width="100%" 
                    />
                    <div className="flex justify-between mt-1 text-[10px] text-gray-600 uppercase tracking-tighter">
                      <span>7 Hari Lalu</span>
                      <span>Hari Ini</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </section>

          {/* Simpan Pinjam Table */}
          <section className="lg:col-span-12">
            <Card className="overflow-hidden">
              {/* Table header */}
              <div className="px-6 py-4 border-b border-gray-800/80 flex justify-between items-center bg-card">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Modul Simpan Pinjam Anggota</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Kredit Settlement System — KDMP</p>
                </div>
                <button className="btn-ghost text-xs">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Filter
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                      {['Prosumer / Anggota', 'Tabungan', 'Sisa Kredit', 'Tindakan'].map((col, i) => (
                        <th key={col} className={`py-3 px-6 text-xs text-gray-500 uppercase tracking-widest font-bold ${i === 3 ? 'text-right' : ''}`}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {memberAccounts.map(member => {
                      const isCleared = clearedIds.includes(member.id);
                      const isProcessing = processingId === member.id;
                      return (
                        <tr
                          key={member.id}
                          className={`border-t border-gray-800/50 transition-colors ${isCleared ? 'opacity-40' : ''}`}
                          style={{ background: 'transparent' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${member.bgColor} ${member.textColor}`}>
                                {member.initials}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{member.name}</div>
                                <div className="text-xs text-gray-500">ID: {member.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm font-bold text-green-400">
                              Rp {member.savings.toLocaleString('id-ID')}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`text-sm font-medium ${member.credit > 0 ? 'text-red-400' : 'text-gray-500'}`}>
                              {member.credit > 0 ? `Rp ${member.credit.toLocaleString('id-ID')}` : '—'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            {isCleared ? (
                              <span className="inline-flex items-center gap-1 text-green-400 text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                Selesai
                              </span>
                            ) : member.credit > 0 ? (
                              <button
                                onClick={() => handlePotongOtomatis(member)}
                                disabled={isProcessing}
                                className="btn-ghost text-xs disabled:opacity-50"
                              >
                                {isProcessing && <span className="material-symbols-outlined text-sm animate-spin-slow">refresh</span>}
                                Potong Otomatis
                              </button>
                            ) : (
                              <button
                                onClick={() => handleCairkan(member)}
                                disabled={isProcessing}
                                className="btn-primary text-xs disabled:opacity-50"
                              >
                                {isProcessing && <span className="material-symbols-outlined text-sm animate-spin-slow">refresh</span>}
                                Cairkan
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </div>
      </AdminLayout>
    </>
  );
};

export default Financials;
