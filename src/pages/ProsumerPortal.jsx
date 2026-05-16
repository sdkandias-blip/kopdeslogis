import { useState, useRef } from 'react';
import ToastContainer from '../components/ToastContainer';
import { useToast } from '../hooks/useAppHooks';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent } from "@/components/ui/card";
import Counter from '../components/ui/Counter';

const COMMODITIES = [
  { emoji: '🌾', label: 'Beras',  unit: 'kg', pricePerKg: 12000 },
  { emoji: '🐓', label: 'Ayam',   unit: 'kg', pricePerKg: 28000 },
  { emoji: '🐟', label: 'Ikan',   unit: 'kg', pricePerKg: 35000 },
  { emoji: '🌽', label: 'Sayur',  unit: 'kg', pricePerKg: 8000  },
];

const fmt = (n) => `Rp ${n.toLocaleString('id-ID')}`;

const ProsumerPortal = () => {
  const { toasts, showToast } = useToast();
  const { prosumerWallet, creditWallet } = useAppContext();
  // Onboarding State
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [kycData, setKycData] = useState({ name: '', nib: '', type: 'petani' });

  // Dashboard State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [qty, setQty] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const recordTimerRef = useRef(null);
  const [isOffline] = useState(true);
  const [pendingSubmissions, setPendingSubmissions] = useState([]);

  // --- Handlers for Onboarding ---
  const nextStep = () => {
    if (onboardingStep === 1 && !kycData.name) {
      showToast({ message: 'Mohon isi nama kelompok/badan usaha Anda.', type: 'warning' });
      return;
    }
    if (onboardingStep < 3) setOnboardingStep(prev => prev + 1);
    else finishOnboarding();
  };

  const prevStep = () => {
    if (onboardingStep > 1) setOnboardingStep(prev => prev - 1);
  };

  const finishOnboarding = () => {
    showToast({ message: 'Verifikasi KYC & HACCP berhasil. Akun Anda aktif!', type: 'success' });
    setIsOnboarded(true);
  };

  const handleUploadClick = () => {
    showToast({ message: 'Mensimulasikan unggahan dokumen...', type: 'info' });
    setTimeout(() => {
      showToast({ message: 'Dokumen berhasil dianalisis oleh AI.', type: 'success' });
    }, 1500);
  };

  const handleSubmitHarvest = () => {
    if (!selectedCommodity || !qty || isNaN(qty) || Number(qty) <= 0) {
      showToast({ message: 'Pilih komoditas dan masukkan jumlah yang valid.', type: 'warning' }); return;
    }
    const totalValue = Number(qty) * selectedCommodity.pricePerKg;
    if (isOffline) {
      setPendingSubmissions(prev => [...prev, { id: Date.now(), commodity: selectedCommodity.label, qty: Number(qty), unit: selectedCommodity.unit, value: totalValue, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }]);
      showToast({ message: `${qty} ${selectedCommodity.unit} ${selectedCommodity.label} disimpan lokal.`, type: 'info', duration: 4000 });
    } else {
      creditWallet(totalValue, `Setor ${qty}${selectedCommodity.unit} ${selectedCommodity.label}`);
      showToast({ message: `${qty} ${selectedCommodity.unit} ${selectedCommodity.label} berhasil disetor!`, type: 'success' });
    }
    setSelectedCommodity(null); setQty('');
  };

  const handleVoiceHold = () => {
    setIsRecording(true); setVoiceText('Mendengarkan...');
    recordTimerRef.current = setTimeout(() => {
      setIsRecording(false); setVoiceText('"Setor ayam lima puluh kilo"');
      setTimeout(() => { setSelectedCommodity(COMMODITIES[1]); setQty('50'); setVoiceText(''); showToast({ message: 'Input suara: 50 kg Ayam', type: 'success' }); }, 1200);
    }, 2500);
  };

  const handleVoiceRelease = () => {
    if (isRecording) { clearTimeout(recordTimerRef.current); setIsRecording(false); setVoiceText(''); }
  };

  const TABS = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'wallet', icon: 'account_balance_wallet', label: 'Wallet' },
    { id: 'weather', icon: 'partly_cloudy_day', label: 'Cuaca' },
    { id: 'profile', icon: 'person', label: 'Profile' },
  ];

  // ==========================================
  // RENDER: ONBOARDING / KYC FLOW
  // ==========================================
  if (!isOnboarded) {
    return (
      <div className="min-h-screen p-6 flex flex-col justify-center animate-fade-up" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <ToastContainer toasts={toasts} />
        <div className="max-w-md w-full mx-auto relative">
          
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              KopdesLogis
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map(step => (
                <div key={step} className={`h-2 rounded-full transition-all duration-300 ${onboardingStep === step ? 'w-8 bg-green-500' : onboardingStep > step ? 'w-4 bg-green-500/50' : 'w-4 bg-gray-800'}`} />
              ))}
            </div>
          </div>

          <Card className="rounded-2xl p-6 shadow-2xl relative overflow-hidden border border-gray-800 bg-[rgba(13,17,23,0.95)]">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* STEP 1: Identitas */}
            {onboardingStep === 1 && (
              <div className="animate-fade-up relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 border border-blue-500/20">
                  <span className="material-symbols-outlined text-blue-400">badge</span>
                </div>
                <h2 className="font-display text-2xl font-extrabold text-white mb-2">Pendaftaran Mitra Prosumer</h2>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Untuk menjaga kualitas pasokan MBG, kami perlu melakukan verifikasi identitas (KYC) Anda terlebih dahulu.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Nama Lengkap / Kelompok Tani</label>
                    <input type="text" value={kycData.name} onChange={e => setKycData({...kycData, name: e.target.value})}
                      className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Contoh: Koptan Makmur Jaya" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">NIK / NIB Badan Usaha</label>
                    <input type="text" value={kycData.nib} onChange={e => setKycData({...kycData, nib: e.target.value})}
                      className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Masukkan 16 digit NIK/NIB" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Kategori Mitra</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['petani', 'peternak', 'nelayan'].map(type => (
                        <button key={type} onClick={() => setKycData({...kycData, type})}
                          className={`capitalize py-2 rounded-lg text-xs font-bold border ${kycData.type === type ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Validasi Lahan / HACCP */}
            {onboardingStep === 2 && (
              <div className="animate-fade-up relative z-10">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5 border border-orange-500/20">
                  <span className="material-symbols-outlined text-orange-400">landscape</span>
                </div>
                <h2 className="font-display text-2xl font-extrabold text-white mb-2">Validasi {kycData.type === 'petani' ? 'Lahan' : 'HACCP & Sanitasi'}</h2>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {kycData.type === 'petani' 
                    ? 'Sistem membutuhkan foto lahan dan pemetaan koordinat untuk audit jejak karbon (Traceability).' 
                    : 'Unggah sertifikat sanitasi atau hasil lab HACCP untuk memastikan higienitas rantai dingin.'}
                </p>

                <div className="space-y-3">
                  <button onClick={handleUploadClick} className="w-full border-2 border-dashed border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-gray-500 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-gray-400">cloud_upload</span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-white mb-1">Upload Dokumen / Foto</p>
                      <p className="text-xs text-gray-500">Mendukung format JPG, PNG, PDF (Max 5MB)</p>
                    </div>
                  </button>

                  <div className="rounded-xl p-4 bg-blue-500/5 border border-blue-500/10 flex items-start gap-3 mt-4">
                    <span className="material-symbols-outlined text-blue-400">my_location</span>
                    <div>
                      <p className="text-xs font-bold text-blue-400 mb-0.5">Izin Lokasi (GPS)</p>
                      <p className="text-[10px] text-gray-400">KopdesLogis otomatis memetakan koordinat Anda (-7.312, 112.654) sebagai titik poin origin Traceability.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Tanda Tangan Smart Contract */}
            {onboardingStep === 3 && (
              <div className="animate-fade-up relative z-10">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-5 border border-green-500/20">
                  <span className="material-symbols-outlined text-green-400">verified_user</span>
                </div>
                <h2 className="font-display text-2xl font-extrabold text-white mb-2">Verifikasi & Smart Contract</h2>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Data Anda telah dianalisis oleh sistem AI KopdesLogis. Tinjau kesepakatan kerjasama penyediaan logistik MBG.
                </p>

                <div className="rounded-xl p-4 bg-gray-900 border border-gray-800 mb-5">
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-800">
                    <span className="text-xs text-gray-500">Nama Mitra</span>
                    <span className="text-sm font-bold text-white">{kycData.name || 'Cak Naryo'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-800">
                    <span className="text-xs text-gray-500">Status Validasi</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-400">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Lolos Standar HACCP
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Tipe Kontrak</span>
                    <span className="text-sm font-bold text-white">Prosumer Dinamis</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-gray-400">
                  <input type="checkbox" className="mt-0.5 accent-green-500" defaultChecked />
                  <p>Saya menyetujui syarat & ketentuan pengikatan kontrak cerdas (Smart Contract) Koperasi Logistik yang berlaku.</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3 pt-6 border-t border-gray-800/60 relative z-10">
              {onboardingStep > 1 && (
                <button onClick={prevStep} className="px-5 py-3 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
                  Kembali
                </button>
              )}
              <button onClick={nextStep} className="flex-1 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all flex justify-center items-center gap-2">
                {onboardingStep === 3 ? 'Selesaikan Registrasi' : 'Lanjutkan'}
                {onboardingStep < 3 && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: DASHBOARD PROSUMER
  // ==========================================
  return (
    <>
      <ToastContainer toasts={toasts} />
      <div className="min-h-screen pb-24 flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>

        {/* Header */}
        <header className="px-4 py-4 flex items-center justify-between sticky top-0 z-40"
          style={{ background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h1 className="font-display text-base font-bold text-white">👋 Halo, {kycData.name || 'Cak Naryo'}!</h1>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Sidoarjo | Cerah, 32°C
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${isOffline ? 'text-red-400 border-red-500/20' : 'text-green-400 border-green-500/20'}`}
            style={{ background: isOffline ? 'rgba(248,81,73,0.08)' : 'rgba(34,197,94,0.08)' }}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-red-500' : 'bg-green-500 animate-pulse-dot'}`} />
            {isOffline ? 'Mode Luring' : 'Online'}
          </div>
        </header>

        {/* Pending offline sync notice */}
        {isOffline && (
          <div className="mx-4 mt-3 rounded-xl p-3 flex items-center gap-2 animate-fade-up"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-sm">☁️</span>
            <p className="text-xs text-gray-300 flex-1">
              <strong className="text-white">Mode Luring Aktif</strong> - Data otomatis disinkronkan saat sinyal tersedia
              {pendingSubmissions.length > 0 && (
                <span className="block mt-1 text-[10px] text-green-400 font-bold">
                  {pendingSubmissions.length} hasil panen antre disinkronisasi.
                </span>
              )}
            </p>
          </div>
        )}

        <main className="flex-1 p-4 flex flex-col gap-5">
          {/* Home Tab */}
          {activeTab === 'home' && (
            <>
              {/* Wallet Card */}
              <Card className="animate-fade-up">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-green-400 text-xl">account_balance_wallet</span>
                    <h2 className="text-xs text-gray-400 font-bold uppercase tracking-widest">Dompet Koperasi Anda</h2>
                  </div>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-sm text-gray-400 font-medium">Rp</span>
                    <Counter
                      value={prosumerWallet.balance}
                      fontSize={28}
                      gap={2}
                      horizontalPadding={0}
                      textColor="white"
                      fontWeight={800}
                      gradientFrom="transparent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setActiveTab('wallet'); showToast({ message: 'Proses penarikan dimulai.', type: 'info' }); }}
                      className="btn-primary flex-1 justify-center">
                      <span className="material-symbols-outlined text-sm">arrow_downward</span>
                      Tarik Dana
                    </button>
                    <button onClick={() => setActiveTab('wallet')} className="btn-ghost flex-1 justify-center">
                      <span className="material-symbols-outlined text-sm">receipt_long</span>
                      Riwayat
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Commodity Selection */}
              <section className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="font-display text-lg font-bold text-white px-1">Pilih Hasil Panen Hari Ini</h2>
                <div className="grid grid-cols-2 gap-3">
                  {COMMODITIES.map(c => {
                    const isSelected = selectedCommodity?.label === c.label;
                    return (
                      <button key={c.label} onClick={() => { setSelectedCommodity(c); setQty(''); }}
                        className="rounded-xl p-5 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all border-2"
                        style={{
                          background: isSelected ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
                          borderColor: isSelected ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.06)',
                        }}>
                        <span className="text-5xl">{c.emoji}</span>
                        <span className="text-sm font-bold text-white">{c.label}</span>
                        <span className="text-[10px] text-gray-400">Rp {c.pricePerKg.toLocaleString()}/{c.unit}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quantity input */}
                {selectedCommodity && (
                  <Card className="animate-fade-up border border-green-500/20">
                    <CardContent className="p-4">
                      <p className="text-sm font-bold text-green-400 mb-3">
                        {selectedCommodity.emoji} {selectedCommodity.label} — berapa {selectedCommodity.unit}?
                      </p>
                      <input type="number" min="0" placeholder={`Jumlah (${selectedCommodity.unit})`}
                        value={qty} onChange={e => setQty(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-lg font-mono mb-3 focus:outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text)' }}
                      />
                      {qty && !isNaN(qty) && Number(qty) > 0 && (
                        <p className="text-xs text-green-400 font-semibold mb-3">
                          Estimasi nilai: <strong>{fmt(Number(qty) * selectedCommodity.pricePerKg)}</strong>
                        </p>
                      )}
                      <button onClick={handleSubmitHarvest} className="btn-primary w-full justify-center">
                        <span className="material-symbols-outlined text-sm">upload</span>
                        {isOffline ? 'Simpan Lokal (Offline)' : 'Kirim ke Koperasi'}
                      </button>
                    </CardContent>
                  </Card>
                )}
              </section>
            </>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <>
              {/* Wallet Card Overview */}
              <Card className="animate-fade-up">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-green-400 text-xl">account_balance_wallet</span>
                    <h2 className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total Saldo Aktif</h2>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 mb-4">
                    <span className="text-xl font-bold text-white">Rp</span>
                    <Counter
                      value={prosumerWallet.balance}
                      fontSize={36}
                      gap={2}
                      horizontalPadding={0}
                      textColor="white"
                      fontWeight={800}
                      gradientFrom="transparent"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Transaction History */}
              <section className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="font-display text-lg font-bold text-white px-1">Riwayat Transaksi</h2>
                {prosumerWallet.transactions.map(txn => (
                  <Card key={txn.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: txn.type === 'income' ? 'rgba(34,197,94,0.1)' : 'rgba(248,81,73,0.1)' }}>
                          <span className="material-symbols-outlined text-sm"
                            style={{ color: txn.type === 'income' ? 'var(--success)' : 'var(--error)' }}>
                            {txn.type === 'income' ? 'arrow_downward' : 'arrow_upward'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{txn.label}</p>
                          <p className="text-xs text-gray-400">{txn.date}</p>
                        </div>
                      </div>
                      <p className={`font-display text-base font-bold ${txn.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                        {txn.type === 'income' ? '+' : '-'}{(txn.amount / 1000).toFixed(0)}k
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </section>
            </>
          )}

          {/* Weather Tab */}
          {activeTab === 'weather' && (
            <section className="flex flex-col gap-4 animate-fade-up">
              <h2 className="font-display text-xl font-bold text-white px-1">Prakiraan Cuaca Lokal</h2>
              <Card className="flex flex-col gap-4">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-300">Sidoarjo, Jawa Timur</h3>
                      <p className="text-xs text-gray-500">Cerah Berawan</p>
                    </div>
                    <span className="material-symbols-outlined text-4xl text-yellow-400">partly_cloudy_day</span>
                  </div>
                  <div className="flex items-end gap-2 mt-4">
                    <span className="text-5xl font-extrabold text-white">32°</span>
                    <span className="text-lg text-gray-400 mb-1">C</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="material-symbols-outlined text-sm text-blue-400">water_drop</span>
                      <p className="text-xs text-gray-400 mt-1">Kelembapan</p>
                      <p className="text-sm font-bold text-white">65%</p>
                    </div>
                    <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="material-symbols-outlined text-sm text-gray-400">air</span>
                      <p className="text-xs text-gray-400 mt-1">Angin</p>
                      <p className="text-sm font-bold text-white">12 km/j</p>
                    </div>
                    <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="material-symbols-outlined text-sm text-orange-400">wb_twilight</span>
                      <p className="text-xs text-gray-400 mt-1">UV Index</p>
                      <p className="text-sm font-bold text-white">Tinggi (7)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-400">tips_and_updates</span>
                  <p className="text-xs text-gray-300">Cuaca ideal untuk panen sayur hari ini. Hindari penyemprotan pupuk siang hari.</p>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <section className="flex flex-col gap-4 animate-fade-up">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-green-900/40 to-transparent" />
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center mb-4 relative z-10 border-4 border-[rgba(13,17,23,0.9)] shadow-lg">
                    <span className="material-symbols-outlined text-5xl text-white">person</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white z-10">{kycData.name || 'Cak Naryo'}</h3>
                  <p className="text-sm text-green-400 font-semibold mb-2 z-10">ID: KOP-8829-SDA</p>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-green-300 bg-green-500/10 border border-green-500/20 z-10">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    Anggota Premium
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-2 flex flex-col gap-1">
                   <button className="flex items-center gap-3 p-3 rounded-lg active:scale-95 transition-all text-left hover:bg-white/5">
                     <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                       <span className="material-symbols-outlined text-sm text-gray-300">settings</span>
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-bold text-white">Pengaturan Akun</p>
                       <p className="text-xs text-gray-400">Keamanan dan preferensi</p>
                     </div>
                     <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                   </button>
                   <button className="flex items-center gap-3 p-3 rounded-lg active:scale-95 transition-all text-left hover:bg-white/5">
                     <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                       <span className="material-symbols-outlined text-sm text-gray-300">help</span>
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-bold text-white">Bantuan & Laporan</p>
                       <p className="text-xs text-gray-400">Hubungi petugas lapangan</p>
                     </div>
                     <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                   </button>
                   <button className="flex items-center gap-3 p-3 rounded-lg active:scale-95 transition-all text-left hover:bg-red-500/10">
                     <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-sm text-red-400">logout</span>
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-bold text-red-400">Keluar Sistem</p>
                     </div>
                   </button>
                </CardContent>
              </Card>
            </section>
          )}
        </main>

        {/* Voice FAB */}
        <div className="fixed bottom-20 left-0 w-full flex flex-col items-center gap-2 z-40 pointer-events-none px-4">
          {(voiceText || isRecording) && (
            <div className="pointer-events-auto rounded-xl p-3 text-center max-w-xs"
              style={{ background: 'rgba(13,17,23,0.95)', border: `1px solid ${isRecording ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`, backdropFilter: 'blur(20px)' }}>
              <p className="text-sm text-gray-300 italic">{voiceText || 'Mendengarkan...'}</p>
            </div>
          )}
          {!voiceText && !isRecording && (
            <div className="pointer-events-auto rounded-lg px-4 py-2 text-center max-w-xs"
              style={{ background: 'rgba(13,17,23,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
              <p className="text-[11px] text-gray-400 italic">Sistem mengerti bahasa daerah</p>
              <p className="text-[11px] text-white font-bold">'Setor ayam lima puluh kilo'</p>
            </div>
          )}
          <button
            className="pointer-events-auto rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-2xl border-4 transition-all active:scale-90"
            style={{
              background: isRecording ? 'var(--error)' : 'linear-gradient(135deg,#16a34a,#065f46)',
              borderColor: isRecording ? 'rgba(248,81,73,0.3)' : 'rgba(34,197,94,0.3)',
              transform: isRecording ? 'scale(1.1)' : 'scale(1)',
            }}
            onMouseDown={handleVoiceHold} onMouseUp={handleVoiceRelease}
            onTouchStart={handleVoiceHold} onTouchEnd={handleVoiceRelease}
          >
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
            <span className="text-white text-[10px] font-bold mt-0.5">{isRecording ? 'Bicara!' : 'Tahan'}</span>
          </button>
        </div>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2"
          style={{ height: 64, background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-150 active:scale-90"
                style={{ minWidth: 52, background: isActive ? 'rgba(34,197,94,0.1)' : 'transparent', color: isActive ? 'var(--green-500)' : 'var(--muted)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{tab.icon}</span>
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default ProsumerPortal;
