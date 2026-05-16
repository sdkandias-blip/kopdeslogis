import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmSlider from '../components/ConfirmSlider';
import ToastContainer from '../components/ToastContainer';
import { useToast } from '../hooks/useAppHooks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { traceabilityBatches } from '../data/mockData';

const BATCHES = Object.keys(traceabilityBatches);

const TraceabilityScanner = () => {
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();
  const [inputCode, setInputCode] = useState('');
  const [scanState, setScanState] = useState('idle');
  const [batchData, setBatchData] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleScan = (code) => {
    const query = (code || inputCode).toUpperCase().trim();
    setScanState('scanning');
    setTimeout(() => {
      const found = traceabilityBatches[query];
      if (found) { setBatchData({ ...found, code: query }); setScanState('found'); }
      else { setScanState('invalid'); showToast({ message: `Kode "${query}" tidak ditemukan.`, type: 'error' }); }
    }, 800);
  };

  const handleReset = () => { 
    setScanState('idle'); 
    setBatchData(null); 
    setInputCode(''); 
    setConfirmed(false); 
    setRejected(false);
    setShowRejectForm(false);
    setRejectReason('');
  };

  const handleRejectSubmit = () => {
    if (!rejectReason) {
      showToast({ message: 'Harap isi alasan retur', type: 'error' });
      return;
    }
    setRejected(true);
    setShowRejectForm(false);
    showToast({ message: `Batch ${batchData.code} telah diretur/ditolak!`, type: 'error', duration: 4000 });
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <div className="min-h-screen pb-32" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        {/* Header */}
        <header className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
          style={{ background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl btn-ghost">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="font-display text-base font-bold text-white">Traceability Scanner</h1>
            <p className="text-xs text-gray-400">Digital HACCP • KopdesLogis</p>
          </div>
          <div className="w-10" />
        </header>

        <main className="p-4 space-y-5 max-w-lg mx-auto">
          {/* Idle: Scan Input */}
          {scanState === 'idle' && (
            <Card className="animate-fade-up">
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400">qr_code_scanner</span>
                  Scan Kode Batch
                </h2>
                <div className="flex gap-2 mb-4">
                  <input type="text" value={inputCode}
                    onChange={e => setInputCode(e.target.value.toUpperCase())}
                    onKeyDown={e => e.key === 'Enter' && inputCode && handleScan()}
                    placeholder="Contoh: MBG-AYM-8829"
                    className="flex-1 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text)' }}
                  />
                  <button onClick={() => inputCode && handleScan()} className="btn-primary px-4">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
                <button onClick={() => { setInputCode(BATCHES[0]); handleScan(BATCHES[0]); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-green-400 transition-colors"
                  style={{ border: '2px dashed rgba(34,197,94,0.3)' }}>
                  <span className="material-symbols-outlined text-sm">qr_code</span>
                  Demo Scan: MBG-AYM-8829
                </button>
              </CardContent>
            </Card>
          )}

          {/* Scanning */}
          {scanState === 'scanning' && (
            <Card>
              <CardContent className="p-12 flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-green-400 animate-spin-slow" style={{ fontSize: 56 }}>qr_code_scanner</span>
                <p className="text-sm text-gray-400">Memvalidasi kode di buku besar...</p>
              </CardContent>
            </Card>
          )}

          {/* Invalid */}
          {scanState === 'invalid' && (
            <section className="rounded-xl p-6 flex flex-col items-center gap-4 animate-fade-up"
              style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)' }}>
              <span className="material-symbols-outlined text-red-400 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
              <p className="font-display text-lg font-bold text-white">Kode Tidak Valid</p>
              <button onClick={handleReset} className="btn-danger">Coba Lagi</button>
            </section>
          )}

          {/* Found */}
          {scanState === 'found' && batchData && (
            <>
              <div className="rounded-xl p-4 flex items-center gap-3 animate-fade-up"
                style={{ 
                  background: rejected ? 'rgba(248,81,73,0.06)' : 'rgba(34,197,94,0.06)', 
                  border: rejected ? '1px solid rgba(248,81,73,0.2)' : '1px solid rgba(34,197,94,0.2)' 
                }}>
                <span className="material-symbols-outlined text-2xl" 
                  style={{ 
                    fontVariationSettings: "'FILL' 1", 
                    color: rejected ? '#f85149' : '#4ade80' 
                  }}>
                  {rejected ? 'gpp_bad' : confirmed ? 'lock' : 'check_circle'}
                </span>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest ${rejected ? 'text-red-400' : 'text-green-400'}`}>
                    {rejected ? 'DITOLAK / RETUR' : confirmed ? 'DIKUNCI KE BUKU BESAR' : 'KODE VALID'}
                  </p>
                  <p className="text-sm text-white font-mono">#{batchData.code}</p>
                </div>
                <button onClick={handleReset} className="ml-auto text-gray-500 hover:text-white">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <Card className="space-y-4">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold text-white border-b border-gray-800 pb-4 mb-4">Detail Komoditas</h2>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Produk</p>
                    <p className="text-lg font-bold text-white">{batchData.product}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(88,166,255,0.1)' }}>
                      <span className="material-symbols-outlined text-blue-400">scale</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">Berat Bersih</p>
                      <span className="tag tag-blue">{batchData.weight}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-4 mt-4 border-t border-gray-800">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mt-0.5" style={{ background: 'rgba(34,197,94,0.08)' }}>
                      <span className="material-symbols-outlined text-green-400">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold mb-1">Tujuan Pengiriman</p>
                      <p className="text-sm text-white">{batchData.destination}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold text-white mb-6">Audit Trail Logistik</h3>
                  <div className="relative space-y-4 pl-6" style={{ borderLeft: '2px solid rgba(34,197,94,0.3)' }}>
                    {batchData.trail.map((step, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[29px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10"
                          style={{ backgroundColor: step.active ? '#22c55e' : '#1c2330', borderColor: step.active ? '#22c55e' : '#374151' }}>
                          <span className="material-symbols-outlined text-white text-[12px]">{step.icon}</span>
                        </div>
                        <div className="p-4 rounded-xl"
                          style={{ background: step.active ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${step.active ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)'}`, opacity: step.active ? 1 : 0.65 }}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-bold ${step.active ? 'text-green-400' : 'text-gray-500'}`}>{step.time}</span>
                            {step.temp != null && <span className="tag tag-blue text-[10px]"><span className="material-symbols-outlined text-[11px]">device_thermostat</span>{step.temp}°C Aman</span>}
                          </div>
                          <p className="text-sm font-bold text-white">{step.event}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{step.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>

        {/* Bottom Confirm */}
        {scanState === 'found' && batchData && (
          <div className="fixed bottom-0 left-0 w-full p-4 z-50"
            style={{ background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="max-w-lg mx-auto">
              {confirmed ? (
                <div className="flex items-center justify-center gap-3 py-3 text-green-400">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  <span className="text-sm font-bold">Data dikunci ke buku besar digital</span>
                </div>
              ) : rejected ? (
                <div className="flex flex-col items-center justify-center gap-1 py-3 text-red-400">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_bad</span>
                    <span className="text-sm font-bold">Kiriman Diretur / Ditolak</span>
                  </div>
                  <span className="text-xs text-red-400/80">Alasan: {rejectReason}</span>
                </div>
              ) : showRejectForm ? (
                <div className="animate-fade-up bg-gray-900 rounded-xl p-4 border border-red-500/30">
                  <p className="text-sm font-bold text-white mb-3">Formulir Retur / Penolakan</p>
                  <select
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white mb-3"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  >
                    <option value="">-- Pilih Alasan --</option>
                    <option value="Suhu drop di atas ambang batas">Suhu drop di atas ambang batas</option>
                    <option value="Kondisi fisik barang rusak/busuk">Kondisi fisik barang rusak/busuk</option>
                    <option value="Kemasan terbuka/rusak">Kemasan terbuka/rusak</option>
                    <option value="Barang tidak sesuai pesanan">Barang tidak sesuai pesanan</option>
                  </select>
                  <div className="flex gap-2">
                    <button onClick={() => setShowRejectForm(false)} className="flex-1 py-2 rounded-lg text-sm font-bold bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors">Batal</button>
                    <button onClick={handleRejectSubmit} className="flex-1 py-2 rounded-lg text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-colors">Submit Retur</button>
                  </div>
                </div>
              ) : (
                <>
                  <ConfirmSlider onConfirm={() => { setConfirmed(true); showToast({ message: `Batch ${batchData.code} dikunci ke buku besar!`, type: 'success', duration: 4000 }); }} label="Geser untuk Konfirmasi Penerimaan" />
                  
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-[11px] font-medium text-gray-500 tracking-wide">🔒 KONFIRMASI PENERIMAAN KOMODITAS</p>
                    <button 
                      onClick={() => setShowRejectForm(true)}
                      className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      Retur Barang
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TraceabilityScanner;
