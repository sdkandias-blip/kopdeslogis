import { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import ToastContainer from '../components/ToastContainer';
import { useToast, useColdChainSim } from '../hooks/useAppHooks';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { coldChainUnits, stockItems } from '../data/mockData';

const Operations = () => {
  const { toasts, showToast } = useToast();
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [scheduledUnit, setScheduledUnit] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // QC State
  const [inboundQueue, setInboundQueue] = useState([
    { id: 'IN-001', prosumer: 'Koptan Makmur', commodity: 'Beras Medium', qty: '2 Ton', date: 'Hari ini, 08:00' },
    { id: 'IN-002', prosumer: 'Peternak Sejahtera', commodity: 'Ayam Potong', qty: '800 Kg', date: 'Hari ini, 09:15' }
  ]);

  const iotUnits = useColdChainSim(coldChainUnits);
  const warningUnit = iotUnits.find(u => u.status === 'warning');

  const handleScheduleTech = (unitName) => {
    setScheduledUnit(unitName);
    showToast({ message: `Teknisi dijadwalkan untuk ${unitName}. Tim akan tiba dalam 2 jam.`, type: 'success' });
  };

  const handleQC = (id, grade) => {
    if (grade === 'Reject') {
      showToast({ message: `Penerimaan ${id} ditolak. Barang dikembalikan ke prosumer.`, type: 'error' });
    } else {
      showToast({ message: `Penerimaan ${id} disetujui (Grade ${grade}). Dana dicairkan ke prosumer.`, type: 'success' });
    }
    setInboundQueue(prev => prev.filter(q => q.id !== id));
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <AdminLayout activePage="operations" title="Operations Overview">

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-6 border-b border-gray-800 pb-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors ${activeTab === 'dashboard' ? 'text-white border-b-2 border-green-500 bg-white/5' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Dashboard Operasional
          </button>
          <button 
            onClick={() => setActiveTab('qc')} 
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'qc' ? 'text-white border-b-2 border-green-500 bg-white/5' : 'text-gray-400 hover:text-gray-200'}`}
          >
            QC Inbound & Grading
            {inboundQueue.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-[10px] text-white">
                {inboundQueue.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="animate-fade-up">
            {/* Critical Alert */}
            {!alertDismissed && warningUnit && (
              <div className="mb-6 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm"
                style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.3)' }}>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(248,81,73,0.15)' }}>
                    <span className="material-symbols-outlined text-red-500 text-xl">error</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-400">Critical Alert: {warningUnit.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Suhu <strong className="text-white">{warningUnit.temp.toFixed(1)}°C</strong> (Threshold: {warningUnit.threshold}°C) — Deviasi: ±{warningUnit.deviation.toFixed(1)}°C
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleScheduleTech(warningUnit.name)} className="btn-primary text-xs">
                    Jadwalkan Teknisi
                  </button>
                  <button onClick={() => setAlertDismissed(true)} className="btn-ghost text-xs">Tutup</button>
                </div>
              </div>
            )}

            {/* Page header */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Module</p>
                <h1 className="font-display text-2xl font-extrabold text-white">Operations Overview</h1>
              </div>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', color: 'var(--green-500)' }}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
                System Online
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Stock Items */}
              <section className="lg:col-span-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-gray-400">inventory</span>
                  <h3 className="font-display text-lg font-bold text-white">Manajemen Stok Berjalan (Real-Time)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {stockItems.map(item => {
                    const barColor = item.status === 'optimal' ? '#22c55e' : item.status === 'warning' ? '#f85149' : '#fbbf24';
                    return (
                      <Card key={item.id} className="relative overflow-hidden">
                        {/* Status bar */}
                        <div className="absolute top-0 left-0 w-1 h-full z-10" style={{ backgroundColor: barColor }} />

                        {item.status === 'warning' && (
                          <span className="absolute top-4 right-4 animate-pulse px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase rounded flex items-center gap-1 z-10">
                            <span className="material-symbols-outlined text-[12px]">priority_high</span> FEFO WARNING
                          </span>
                        )}

                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{item.category}</p>
                              <h4 className="font-display text-xl font-bold text-white">{item.name}</h4>
                            </div>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ background: item.status === 'warning' ? 'rgba(248,81,73,0.1)' : 'rgba(34,197,94,0.08)' }}>
                              <span className="material-symbols-outlined text-lg" style={{ color: barColor }}>{item.icon}</span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="font-display text-4xl font-extrabold text-white tracking-tighter">{item.amount}</span>
                            <span className="text-sm text-gray-400 ml-1 font-medium">{item.unit}</span>
                          </div>

                          <div className="progress-track mb-3">
                            <div className="progress-fill" style={{ width: `${item.barPct}%`, backgroundColor: barColor }} />
                          </div>

                          <div className="flex items-center gap-2 text-xs font-bold px-2.5 py-1.5 rounded-lg w-fit"
                            style={{
                              background: item.status === 'warning' ? 'rgba(248,81,73,0.1)' : 'rgba(34,197,94,0.08)',
                              color: barColor,
                            }}>
                            <span className="material-symbols-outlined text-sm">
                              {item.status === 'warning' ? 'warning' : item.status === 'optimal' ? 'check_circle' : 'sync'}
                            </span>
                            {item.statusLabel}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* Cold Chain IoT Table */}
              <section className="lg:col-span-8">
                <Card className="h-full flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-card">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400">ac_unit</span>
                      <h3 className="font-display text-lg font-bold text-white">Status Fasilitas Cold Storage</h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
                      Live IoT
                    </span>
                  </div>
                  <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                          {['Unit Pendingin', 'Suhu (Live)', 'Deviasi (σ)', 'Status', 'Tindakan'].map((col, i) => (
                            <th key={col} className={`py-3 px-5 text-xs text-gray-500 uppercase tracking-widest font-bold ${i === 4 ? 'text-right' : ''}`}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {iotUnits.map(unit => (
                          <tr key={unit.id}
                            className="border-t border-gray-800/60 transition-colors"
                            style={{ background: unit.status === 'warning' ? 'rgba(248,81,73,0.04)' : 'transparent' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = unit.status === 'warning' ? 'rgba(248,81,73,0.04)' : 'transparent'}
                          >
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{ background: unit.status === 'warning' ? 'rgba(248,81,73,0.1)' : 'rgba(88,166,255,0.1)' }}>
                                  <span className="material-symbols-outlined text-sm"
                                    style={{ color: unit.status === 'warning' ? 'var(--error)' : 'var(--info)' }}>
                                    {unit.type === 'chiller' ? 'kitchen' : 'severe_cold'}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-white">{unit.name}</p>
                                  <p className="text-xs text-gray-500">{unit.contents}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-5">
                              <span className={`text-sm font-bold ${unit.status === 'warning' ? 'text-red-400' : 'text-blue-400'}`}>
                                {unit.temp.toFixed(1)}°C
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <span className="text-sm text-gray-300">±{unit.deviation.toFixed(1)}°C</span>
                              {unit.deviation > 1 && <span className="ml-1 tag tag-red">High</span>}
                            </td>
                            <td className="py-4 px-5">
                              <span className={`tag ${unit.status === 'warning' ? 'tag-red' : 'tag-green'}`}>
                                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: unit.status === 'warning' ? 'var(--error)' : 'var(--success)' }} />
                                {unit.status === 'warning' ? 'Warning' : 'Optimal'}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              {unit.status === 'warning' ? (
                                <button
                                  onClick={() => handleScheduleTech(unit.name)}
                                  disabled={scheduledUnit === unit.name}
                                  className="btn-primary text-xs disabled:opacity-50"
                                >
                                  {scheduledUnit === unit.name ? '✓ Dijadwalkan' : 'Jadwalkan Teknisi'}
                                </button>
                              ) : (
                                <button className="btn-ghost text-xs p-2">
                                  <span className="material-symbols-outlined text-sm">more_vert</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </section>

              {/* System Log */}
              <section className="lg:col-span-4">
                <Card className="h-full" style={{ border: '1px solid rgba(248,81,73,0.15)' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="material-symbols-outlined text-red-400">notifications_active</span>
                      <h3 className="font-display text-lg font-bold text-white">Log Peringatan Sistem</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      {/* Urgent entry */}
                      {warningUnit && (
                        <div className="relative pl-6 pb-5 border-l border-red-500/30">
                          <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[7px] top-1 border-2" style={{ borderColor: 'var(--bg)' }} />
                          <div className="flex justify-between items-center mb-1">
                            <span className="tag tag-red">Urgent</span>
                            <span className="text-xs text-gray-500">08:45 WIB</span>
                          </div>
                          <p className="text-sm font-bold text-white mb-1">Fluktuasi Suhu Kritis — {warningUnit.name}</p>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            Suhu {warningUnit.temp.toFixed(1)}°C (Target: {warningUnit.threshold}°C). Deviasi melebihi toleransi.
                          </p>
                        </div>
                      )}
                      <div className="relative pl-6 pb-5 border-l border-gray-800">
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1 border-2" style={{ borderColor: 'var(--bg)' }} />
                        <div className="flex justify-between items-center mb-1">
                          <span className="tag tag-blue">System</span>
                          <span className="text-xs text-gray-500">06:30 WIB</span>
                        </div>
                        <p className="text-sm font-bold text-white mb-1">Sinkronisasi Data Selesai</p>
                        <p className="text-xs text-gray-400 leading-relaxed">Backup data inventaris harian ke server pusat berhasil.</p>
                      </div>
                      <div className="relative pl-6 border-l border-gray-800/30">
                        <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-1 border-2" style={{ borderColor: 'var(--bg)' }} />
                        <div className="flex justify-between items-center mb-1">
                          <span className="tag tag-green">Info</span>
                          <span className="text-xs text-gray-500">05:00 WIB</span>
                        </div>
                        <p className="text-sm font-bold text-white mb-1">Armada Baru Siap Berangkat</p>
                        <p className="text-xs text-gray-400 leading-relaxed">3 armada siap dispatch pengiriman batch MBG pagi hari.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'qc' && (
          <div className="animate-fade-up grid grid-cols-1 gap-5">
            <div className="mb-2">
              <h2 className="font-display text-2xl font-extrabold text-white">Quality Control (Inbound)</h2>
              <p className="text-sm text-gray-400">Verifikasi fisik barang dari prosumer sebelum dimasukkan ke dalam Cold Storage.</p>
            </div>
            
            {inboundQueue.length === 0 ? (
              <Card className="flex flex-col items-center justify-center text-gray-500">
                <CardContent className="p-10 flex flex-col items-center">
                  <span className="material-symbols-outlined text-5xl mb-3">inventory_2</span>
                  <p className="font-bold text-white mb-1">Antrean Inbound Kosong</p>
                  <p className="text-sm text-center">Tidak ada barang masuk yang perlu diinspeksi saat ini.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {inboundQueue.map(item => (
                  <Card key={item.id} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 z-10" />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{item.date}</p>
                          <h4 className="font-display text-lg font-bold text-white">{item.prosumer}</h4>
                        </div>
                        <span className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{item.id}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg border border-gray-800 mb-5">
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                          <span className="material-symbols-outlined text-gray-400">category</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{item.commodity}</p>
                          <p className="text-xs text-green-400 font-bold">Qty: {item.qty}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Hasil Inspeksi Fisik (Grading)</p>
                        <div className="grid grid-cols-4 gap-2">
                          <button onClick={() => handleQC(item.id, 'A')} className="py-2 rounded-lg text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500/20 transition-colors">Grade A</button>
                          <button onClick={() => handleQC(item.id, 'B')} className="py-2 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/30 hover:bg-blue-500/20 transition-colors">Grade B</button>
                          <button onClick={() => handleQC(item.id, 'C')} className="py-2 rounded-lg text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors">Grade C</button>
                          <button onClick={() => handleQC(item.id, 'Reject')} className="py-2 rounded-lg text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 transition-colors">Reject</button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <Card className="mt-4 border border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-5">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-blue-400">info</span>
                  <div>
                    <p className="text-sm font-bold text-blue-400 mb-1">Panduan Grading</p>
                    <ul className="text-xs text-gray-400 space-y-1 ml-4 list-disc marker:text-gray-600">
                      <li><strong className="text-gray-300">Grade A:</strong> Kualitas super, lolos sensor warna & suhu pengiriman stabil. Layak bayar penuh.</li>
                      <li><strong className="text-gray-300">Grade B/C:</strong> Kualitas cukup, penyesuaian harga potong otomatis di sistem keuangan.</li>
                      <li><strong className="text-gray-300">Reject:</strong> Ditolak karena rusak/busuk. Retur ke armada prosumer.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </AdminLayout>
    </>
  );
};

export default Operations;
