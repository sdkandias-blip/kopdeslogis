import { useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import { useToast } from '../hooks/useAppHooks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DapurPortal = () => {
  const { toasts, showToast } = useToast();
  const [activeTab, setActiveTab] = useState('order');
  const [poForm, setPoForm] = useState({ beras: '', ayam: '', sayur: '' });
  const [poHistory, setPoHistory] = useState([
    { id: 'PO-DPR-01', date: '15 Mei 2026', items: '2 Ton Beras, 500 Kg Ayam', status: 'approved' },
  ]);

  const handleSubmitPO = (e) => {
    e.preventDefault();
    if (!poForm.beras && !poForm.ayam && !poForm.sayur) {
      showToast({ message: 'Minimal isi satu kebutuhan komoditas', type: 'warning' });
      return;
    }

    const items = [];
    if (poForm.beras) items.push(`${poForm.beras} Ton Beras`);
    if (poForm.ayam) items.push(`${poForm.ayam} Kg Ayam`);
    if (poForm.sayur) items.push(`${poForm.sayur} Kg Sayur`);

    const newPO = {
      id: `PO-DPR-0${poHistory.length + 2}`,
      date: 'Hari ini',
      items: items.join(', '),
      status: 'pending'
    };

    setPoHistory([newPO, ...poHistory]);
    setPoForm({ beras: '', ayam: '', sayur: '' });
    showToast({ message: 'Purchase Order berhasil dikirim ke Koperasi!', type: 'success' });
    setActiveTab('history');
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <ToastContainer toasts={toasts} />
      
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between sticky top-0 z-40"
        style={{ background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <h1 className="font-display text-base font-bold text-white">Dapur Umum MBG</h1>
          <p className="text-xs text-gray-400 mt-0.5">SPPG Rungkut, Surabaya</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
          <span className="material-symbols-outlined text-blue-400">restaurant</span>
        </div>
      </header>

      <main className="p-4 space-y-5">
        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 bg-gray-900 rounded-xl border border-gray-800">
          <button 
            onClick={() => setActiveTab('order')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'order' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
          >
            Buat PO Baru
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'history' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
          >
            Status Pesanan
          </button>
        </div>

        {activeTab === 'order' && (
          <form onSubmit={handleSubmitPO} className="animate-fade-up space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Input Kebutuhan Harian</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-bold mb-1.5 block uppercase">Kebutuhan Beras (Ton)</label>
                  <input type="number" step="0.1" min="0" value={poForm.beras} onChange={e => setPoForm({...poForm, beras: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Contoh: 1.5" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold mb-1.5 block uppercase">Kebutuhan Ayam Potong (Kg)</label>
                  <input type="number" min="0" value={poForm.ayam} onChange={e => setPoForm({...poForm, ayam: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Contoh: 300" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold mb-1.5 block uppercase">Kebutuhan Sayur Mayur (Kg)</label>
                  <input type="number" min="0" value={poForm.sayur} onChange={e => setPoForm({...poForm, sayur: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Contoh: 150" />
                </div>
              </CardContent>
            </Card>

            <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-colors flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-sm">send</span>
              Kirim PO ke Supply Chain
            </button>
          </form>
        )}

        {activeTab === 'history' && (
          <div className="animate-fade-up space-y-3">
            {poHistory.map((po, idx) => (
              <Card key={idx} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${po.status === 'approved' ? 'bg-green-500' : 'bg-amber-500'}`} />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-white text-sm">{po.id}</p>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${po.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {po.status === 'approved' ? 'Disetujui' : 'Pending Verifikasi'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{po.date}</p>
                  <div className="bg-gray-900 rounded p-2 border border-gray-800">
                    <p className="text-xs font-bold text-blue-400">{po.items}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DapurPortal;
