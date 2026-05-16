# KopdesLogis 🌾
**Sistem Orkestrasi Rantai Pasok MBG Berbasis Koperasi Desa Merah Putih**

KopdesLogis adalah aplikasi manajemen rantai pasok cerdas yang didesain untuk menjembatani Koperasi Desa Merah Putih (KDMP) dalam mengelola alokasi Program Makan Bergizi Gratis (MBG). Sistem ini mendemonstrasikan kompleksitas logika bisnis (Business Process Re-engineering) untuk menjamin akurasi tinggi sebagai agregator bahan pangan.

---

## 🌍 Integrasi Tema SDG
Sistem ini memonitor dampak sosial secara *real-time* di tingkat pedesaan:
- **SDG 1 (Tanpa Kemiskinan)**: Menjamin penyaluran dana langsung ke prosumer (petani/nelayan).
- **SDG 9 (Inovasi Infrastruktur)**: Menggunakan teknologi cerdas untuk mencegah *food waste* dan mengoptimalkan rantai dingin (*cold chain*).
- **SDG 17 (Kemitraan)**: Membangun agregasi pasokan kolaboratif dengan ratusan prosumer.

---

## ⚙️ Mekanisme Fitur Aplikasi

### 1. AI-Driven Demand Forecasting Engine
Sebuah layanan backend yang menelan data demografis siswa, jadwal menu MBG, dan musim panen lokal, kemudian menggunakan algoritma pembelajaran mesin (*Time Series Forecasting*) untuk menghasilkan kalender proyeksi kebutuhan komoditas harian yang dapat diakses oleh manajemen koperasi secara prediktif.

### 2. Portal Kemitraan Prosumer (Petani & Nelayan)
Antarmuka asinkron (PWA - Progressive Web App) yang dirancang untuk perangkat berkapasitas rendah. Petani mendaftarkan estimasi kapasitas panen mereka. Koperasi kemudian merilis kontrak penyelesaian pembayaran di muka, yang langsung dikonversi menjadi kredit pada sistem simpan-pinjam (*Credit Settlement System*) di modul perbankan mini KDMP.
- **Indikator Offline-First**: Mode Luring aktif untuk sistem toleransi kegagalan (*fault tolerance*) di area *blank spot*. Data disinkronkan otomatis saat koneksi pulih.
- **Aksesibilitas Multi-Input**: Menggunakan *Interactive Voice Response* (IVR) melalui tombol mikrofon sehingga petani dapat melaporkan panen menggunakan instruksi suara daerah.

### 3. Real-Time Cold Chain Dashboard
Modul web terintegrasi IoT. Menerima data telemetri via WebSockets dari sensor suhu (*thermistor*) di kotak penyimpan/gudang pendingin. Sistem akan memicu webhook notifikasi langsung untuk petugas jika batas deviasi suhu terlampaui.

### 4. Buku Besar Transparansi Distribusi (Traceability)
Mengubah catatan fisik menjadi buku besar digital yang secara otomatis menyelaraskan arus pasokan dengan klaim pendanaan. Satgas dapat melacak jejak audit vertikal (*Digital HACCP*) dari titik panen, suhu armada, hingga konfirmasi penerimaan yang terenkripsi.

---

## 🎨 Arsitektur Interaksi & UI/UX (Komputasi 2026)

### Dasbor Utama Admin (Web Desktop)
- **Bento Grid Layout & Glassmorphism**: Tata letak dominan tahun 2026 yang menyajikan metrik padat secara bersih dan visual memikat.
- **Law of Proximity**: Elemen informasi operasional yang berkaitan (prediksi AI, sisa stok, peringatan suhu) diletakkan berdekatan, meminimalkan beban kognitif untuk pengambilan keputusan cepat.

### Portal Prosumer (Mobile PWA)
- **High-Contrast & Fitts's Law**: Menempatkan aksi utama (tombol mikrofon pelaporan suara) di zona jangkauan alami ibu jari (*thumb zone*) bagian tengah bawah untuk kemudahan ergonomis petani di lapangan.
- **Transparansi Dompet**: Petani mendapatkan akses visibilitas absolut atas hasil panen yang terkonversi menjadi saldo.

### Modul Traceability Dapur Umum (Mobile Scanner)
- **Action-Oriented Timeline UI**: Pemetaan informasi rantai pasokan dari awal hingga tiba secara interaktif.
- **Konfirmasi Interaktif**: Aksi persetujuan kedatangan menggunakan komponen *slider* geser yang mengunci data ke database pusat untuk mencegah manipulasi klaim fiktif.

---

*Ide **KopdesLogis** memiliki tingkat orisinalitas tinggi yang memecahkan rintangan operasional kebijakan terbaru secara komprehensif, mengintegrasikan IoT, AI, serta Rekayasa Proses Bisnis.*
