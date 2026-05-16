// ===== MOCK DATA LAYER FOR KOPDESLOGIS =====

// --- AI Demand Forecasting ---
export const forecastData = {
  labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  beras: [3.8, 4.0, 4.2, 3.9, 4.5, 4.1, 4.3],
  ayam: [1.2, 1.4, 1.5, 1.3, 1.6, 1.4, 1.5],
  ikan: [0.8, 0.9, 0.7, 1.0, 0.8, 0.9, 1.1],
  reorderPoint: { beras: 3.5, ayam: 1.0 },
};

export const summaryMetrics = [
  { label: 'Kebutuhan Beras SPPG Surabaya', value: '4.2', unit: 'Ton', color: 'secondary' },
  { label: 'Daging Ayam', value: '1.5', unit: 'Ton', color: 'tertiary' },
];

// --- Cold Chain IoT ---
export const coldChainUnits = [
  {
    id: 'A1',
    name: 'Cold Storage #A1',
    type: 'cold_storage',
    temp: -18.2,
    threshold: -18.0,
    deviation: 0.2,
    status: 'optimal',
    contents: 'Daging Ayam Grade A',
    lastUpdated: '08:39 WIB',
  },
  {
    id: 'B1',
    name: 'Freezer B',
    type: 'freezer',
    temp: -17.8,
    threshold: -20.0,
    deviation: 2.2,
    status: 'warning',
    contents: 'Daging Sapi & Ikan',
    lastUpdated: '08:45 WIB',
  },
  {
    id: 'C1',
    name: 'Chiller A',
    type: 'chiller',
    temp: 4.1,
    threshold: 5.0,
    deviation: 0.5,
    status: 'optimal',
    contents: 'Sayur Mayur & Buah',
    lastUpdated: '08:38 WIB',
  },
];

// --- Prosumer Contracts (Smart Matching Queue) ---
export const contractQueue = [
  {
    id: 'CTR-001',
    prosumer: 'Koptan Makmur',
    batchId: 'Batch A',
    commodity: 'Beras Premium',
    amount: 2,
    unit: 'Ton',
    pricePerKg: 12000,
    status: 'pending',
    prosumerId: 'PRO-005',
  },
  {
    id: 'CTR-002',
    prosumer: 'Peternak Sejahtera',
    batchId: 'Batch B',
    commodity: 'Ayam Potong',
    amount: 0.8,
    unit: 'Ton',
    pricePerKg: 28000,
    status: 'pending',
    prosumerId: 'PRO-012',
  },
  {
    id: 'CTR-003',
    prosumer: 'Nelayan Barokah',
    batchId: 'Batch C',
    commodity: 'Ikan Laut Segar',
    amount: 0.5,
    unit: 'Ton',
    pricePerKg: 35000,
    status: 'pending',
    prosumerId: 'PRO-033',
  },
];

// --- Prosumer Map Data ---
export const prosumerLocations = [
  {
    id: 1, name: 'Kelompok Tani Subur', lat: -7.312, lng: 112.654,
    commodity: '🌾 Beras', qty: '2.5 Ton', status: 'ready',
    type: 'Petani', location: 'Krian, Sidoarjo',
    contact: '+62 812-3456-7890', nib: 'NIB-0042-SBY',
    grade: 'Grade A', rating: 4.8, totalSetor: '18.5 Ton',
    totalPencairan: 'Rp 12.400.000', lastTransaction: '14 Mei 2026',
    certifications: ['HACCP', 'SNI'],
  },
  {
    id: 2, name: 'Peternak Sejahtera', lat: -7.214, lng: 112.782,
    commodity: '🐓 Ayam', qty: '0.8 Ton', status: 'ready',
    type: 'Peternak', location: 'Tandes, Surabaya',
    contact: '+62 813-9876-5432', nib: 'NIB-0089-SBY',
    grade: 'Grade A', rating: 4.6, totalSetor: '9.2 Ton',
    totalPencairan: 'Rp 8.750.000', lastTransaction: '15 Mei 2026',
    certifications: ['Halal MUI', 'HACCP'],
  },
  {
    id: 3, name: 'Nelayan Berkah', lat: -7.195, lng: 112.748,
    commodity: '🐟 Ikan', qty: '0.5 Ton', status: 'transit',
    type: 'Nelayan', location: 'Kenjeran, Surabaya',
    contact: '+62 857-1122-3344', nib: 'NIB-0117-KNJ',
    grade: 'Grade B', rating: 4.2, totalSetor: '5.8 Ton',
    totalPencairan: 'Rp 5.200.000', lastTransaction: '13 Mei 2026',
    certifications: ['SNI Perikanan'],
  },
  {
    id: 4, name: 'Koptan Makmur', lat: -7.385, lng: 112.610,
    commodity: '🌾 Beras', qty: '2 Ton', status: 'contracted',
    type: 'Koperasi Tani', location: 'Gresik',
    contact: '+62 821-5566-7788', nib: 'NIB-0023-GRK',
    grade: 'Grade A', rating: 4.9, totalSetor: '32.0 Ton',
    totalPencairan: 'Rp 28.500.000', lastTransaction: '16 Mei 2026',
    certifications: ['HACCP', 'SNI', 'ISO 22000'],
  },
  {
    id: 5, name: 'Tani Mandiri', lat: -7.288, lng: 112.705,
    commodity: '🌽 Sayur', qty: '300 Kg', status: 'ready',
    type: 'Petani', location: 'Mojokerto',
    contact: '+62 878-4433-2211', nib: 'NIB-0055-MJK',
    grade: 'Grade B', rating: 4.0, totalSetor: '3.2 Ton',
    totalPencairan: 'Rp 1.800.000', lastTransaction: '12 Mei 2026',
    certifications: ['GAP'],
  },
];

// --- SDG Impact ---
export const sdgImpact = [
  { id: 1, label: 'SDG 1: No Poverty', value: 'Rp 45.000.000,-', sublabel: 'tersalurkan langsung ke petani minggu ini', progress: 80, color: 'bg-secondary' },
  { id: 9, label: 'SDG 9: Industry & Innovation', value: '1.2 Ton', sublabel: 'food waste berhasil dicegah berkat inovasi infrastruktur logistik cerdas (AI reorder point).', progress: 65, color: 'bg-on-tertiary-container' },
  { id: 17, label: 'SDG 17: Partnerships', value: '50+', sublabel: 'mitra prosumer aktif', progress: 90, color: 'bg-primary-container' },
];

// --- Operations: Stock Management ---
export const stockItems = [
  {
    id: 1, name: 'Beras Medium', category: 'Kategori Utama',
    amount: 12.5, unit: 'Ton', icon: 'grain',
    status: 'optimal', statusLabel: 'Level Optimal', statusColor: 'secondary',
    barColor: 'bg-secondary', barPct: 72,
  },
  {
    id: 2, name: 'Daging Ayam', category: 'Perishable Goods',
    amount: 2.1, unit: 'Ton', icon: 'set_meal',
    status: 'warning', statusLabel: '300 Kg mendekati batas shelf-life (24 Jam)',
    statusColor: 'error', barColor: 'bg-error', barPct: 28,
  },
  {
    id: 3, name: 'Sayur Mayur', category: 'Fresh Produce',
    amount: 850, unit: 'Kg', icon: 'eco',
    status: 'ok', statusLabel: 'FIFO Active - Rotasi Lancar', statusColor: 'surface-tint',
    barColor: 'bg-secondary-fixed-dim', barPct: 55,
  },
];

// --- Supply Chain: Fleet ---
export const fleetData = [
  { id: 'L-9921-XX', lat: -7.295, lng: 112.781, status: 'normal', statusLabel: 'Normal', eta: '09:45', cargo: [{ item: 'Ayam', qty: '500 kg' }, { item: 'Beras', qty: '1 Ton' }], cabinTemp: -4, location: 'Jl. Ir. H. Soekarno' },
  { id: 'W-1244-AB', lat: -7.322, lng: 112.731, status: 'late', statusLabel: 'Terlambat', eta: '10:30', cargo: [{ item: 'Beras', qty: '2 Ton' }], cabinTemp: 3, location: 'Jl. Ahmad Yani' },
  { id: 'B-1010-P', lat: -7.361, lng: 112.640, status: 'anomaly', statusLabel: 'Anomali Suhu', eta: '—', cargo: [{ item: 'Ikan', qty: '400 kg' }], cabinTemp: 12, location: 'Tol Sumo Km 22' },
];

// --- Financials ---
export const treasuryMetrics = [
  { id: 1, label: 'Dana Subsidi', value: 'Rp 850M', trend: '+5.2%', trendUp: true, icon: 'account_balance', sparkColor: '#22c55e', sparkData: [40, 45, 42, 50, 48, 60, 75] },
  { id: 2, label: 'Pembayaran Eksekusi', value: 'Rp 320M', trend: 'Awaiting clearance', trendUp: null, icon: 'receipt_long', sparkColor: '#9ca3af', sparkData: [20, 35, 25, 40, 30, 20, 25] },
  { id: 3, label: 'Saldo Likuiditas', value: 'Rp 530M', trend: 'Healthy status', trendUp: true, icon: 'savings', sparkColor: '#3b82f6', sparkData: [30, 35, 45, 40, 55, 60, 70] },
];

export const memberAccounts = [
  { id: 'PRO-001', initials: 'KT', name: 'Kelompok Tani Subur', savings: 15000000, credit: 0, bgColor: 'bg-primary-container', textColor: 'text-on-primary-container' },
  { id: 'PRO-084', initials: 'NB', name: 'Nelayan Berkah', savings: 4250000, credit: 2000000, bgColor: 'bg-tertiary-container', textColor: 'text-on-tertiary-container' },
  { id: 'PRO-005', initials: 'KM', name: 'Koptan Makmur', savings: 8750000, credit: 0, bgColor: 'bg-secondary-container', textColor: 'text-on-secondary-container' },
];

// --- Traceability / Audit Trail ---
export const traceabilityBatches = {
  'MBG-AYM-8829': {
    valid: true,
    product: 'Daging Ayam Utuh (Grade A)',
    weight: '50 Kg',
    destination: 'Dapur Umum MBG Sukolilo, Surabaya',
    trail: [
      { time: '05:30 WIB', event: 'Panen & Sortir', icon: 'agriculture', location: 'Peternakan Mandiri Krian', temp: null, active: false },
      { time: '06:45 WIB', event: 'Masuk Cold Storage', icon: 'ac_unit', location: 'Gudang KDMP Sidoarjo', temp: -18, active: false },
      { time: '07:30 WIB', event: 'Loading ke Armada', icon: 'local_shipping', location: 'Dock #3', temp: -4, active: false },
      { time: '08:39 WIB', event: 'Transit & Pengiriman', icon: 'radio_button_checked', location: 'Jl. Ir. H. Soekarno', temp: -4, active: true },
    ],
    status: 'in_transit',
  },
};

// --- Prosumer Wallet ---
export const prosumerWallet = {
  balance: 4250000,
  transactions: [
    { id: 'TXN-001', label: 'Penjualan 50kg Ayam', date: '12 Mei 2024', type: 'income', amount: 850000 },
    { id: 'TXN-002', label: 'Cicilan Alat Tani', date: '10 Mei 2024', type: 'expense', amount: 500000 },
    { id: 'TXN-003', label: 'Penjualan 100kg Beras', date: '08 Mei 2024', type: 'income', amount: 1200000 },
    { id: 'TXN-004', label: 'Pembayaran Pupuk', date: '05 Mei 2024', type: 'expense', amount: 300000 },
  ],
};
