# Flowchart Sistem KopdesLog

```mermaid
flowchart TD

%% =========================
%% Definisi Style
%% =========================
classDef prosumer fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
classDef admin fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
classDef dapur fill:#fff3e0,stroke:#e65100,stroke-width:2px;
classDef backend fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px;

%% =========================
%% Aktor 1: Prosumer (PWA Mobile)
%% =========================
subgraph Portal_Prosumer["Portal Prosumer"]
    P_Register["Registrasi Prosumer"]
    P_Cuaca["Halaman Cuaca"]
    P_Home["Dashboard Prosumer"]
    P_Wallet["Dompet Digital"]
end

class P_Register,P_Cuaca,P_Home,P_Wallet prosumer;

%% =========================
%% Backend & AI Engine
%% =========================
subgraph Backend["Backend & AI Engine"]
    AI_Forecast["AI Forecasting"]
    AI_Match["AI Supply Matching"]
    IoT_MQTT["IoT MQTT Broker"]
    DB_Ledger["Blockchain Ledger"]
end

class AI_Forecast,AI_Match,IoT_MQTT,DB_Ledger backend;

%% =========================
%% Aktor 2: Admin Koperasi
%% =========================
subgraph Admin["Admin Koperasi"]
    A_Home["Dashboard Admin"]
    A_Ops["Operations: QC & FEFO/FIFO"]
    A_SC["Supply Chain & Distribusi"]
    A_Fin["Keuangan & Pembayaran"]
    A_Rep["Laporan & Audit"]
end

class A_Home,A_Ops,A_SC,A_Fin,A_Rep admin;

%% =========================
%% Aktor 3: Dapur Umum MBG
%% =========================
subgraph Traceability_Dapur_Umum["Traceability Dapur Umum"]
    Dapur_PO["Input Purchase Order"]
    T_Scan["Scan QR Pengiriman"]
    T_Audit["Audit Rantai Dingin"]
    T_Confirm{"Konfirmasi Penerimaan?"}
end

class Dapur_PO,T_Scan,T_Audit,T_Confirm dapur;

%% =========================
%% ALUR PROSES
%% =========================

%% 0. Fase Onboarding & Demand
P_Register -->|"Validasi Lahan/HACCP"| A_Home
A_Home -->|"Akun Aktif"| P_Home
Dapur_PO -->|"Verifikasi Kuota"| A_SC
A_SC -->|"Sinkronisasi Data"| AI_Forecast

%% 1. Fase Prediksi & Input
P_Cuaca -.->|"Panduan Jadwal"| P_Home
P_Home -->|"Input Estimasi Panen"| AI_Match
AI_Forecast -->|"Prediksi vs PO Dapur"| AI_Match

%% 2. Fase Agregasi, QC, & Keuangan
AI_Match -->|"Rekomendasi Agregasi"| A_Home
A_Home -->|"Barang Dikirim ke Gudang"| A_Ops
A_Ops -->|"Quality Control & Grading Fisik"| A_Fin
A_Fin -->|"Lolos QC: Dana Cair"| P_Wallet

%% 3. Fase Logistik & Cold Chain
A_Ops -->|"Rotasi Stok FEFO/FIFO"| A_SC
IoT_MQTT -->|"Update Suhu Gudang"| A_Ops
A_SC -->|"Muat ke Armada Truk"| T_Scan
IoT_MQTT -->|"Update Suhu Kabin Truk"| A_SC

%% 4. Fase Traceability & Audit
T_Scan -->|"Tarik Data Perjalanan"| T_Audit
T_Audit -->|"Cek Log Suhu"| T_Confirm

T_Confirm -->|"Terima (Kondisi Baik)"| DB_Ledger
T_Confirm -->|"Tolak/Retur (Rusak/Suhu Drop)"| A_SC

A_SC -.->|"Pencatatan Kerugian/Asuransi"| A_Fin
DB_Ledger -->|"Generate Bukti Anti-Manipulasi"| A_Rep