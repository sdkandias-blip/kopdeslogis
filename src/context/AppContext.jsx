import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // 1. PO List (Dapur Umum -> Supply Chain)
  const [poList, setPoList] = useState([
    { id: 'PO-DPR-01', dapur: 'Dapur Umum Rungkut', items: '2 Ton Beras, 500 Kg Ayam', date: 'Besok, 06:00', status: 'pending' },
    { id: 'PO-DPR-02', dapur: 'Dapur Umum Sukolilo', items: '1.5 Ton Beras, 300 Kg Ayam', date: 'Besok, 06:30', status: 'pending' }
  ]);

  const addPO = (po) => setPoList(prev => [po, ...prev]);
  const approvePO = (id) => setPoList(prev => prev.map(po => po.id === id ? { ...po, status: 'approved' } : po));
  const revisePO = (id) => setPoList(prev => prev.map(po => po.id === id ? { ...po, status: 'revised' } : po));

  // 2. Prosumer Wallet (Operations QC -> Prosumer Portal)
  const [prosumerWallet, setProsumerWallet] = useState({
    balance: 14500000,
    transactions: [
      { id: 'TX-8821', date: '12 Mei 2026', desc: 'Pencairan Otomatis (Grade A)', amount: '+Rp 4.500.000' },
      { id: 'TX-8820', date: '10 Mei 2026', desc: 'Penarikan ke Bank Jatim', amount: '-Rp 2.000.000' }
    ]
  });

  const creditWallet = (amount, desc) => {
    setProsumerWallet(prev => ({
      balance: prev.balance + amount,
      transactions: [
        { id: `TX-${Math.floor(Math.random() * 9000) + 1000}`, date: 'Hari Ini', desc, amount: `+Rp ${amount.toLocaleString('id-ID')}` },
        ...prev.transactions
      ]
    }));
  };

  // 3. Ledger List (Scanner -> Audit Ledger)
  const [ledgerList, setLedgerList] = useState([
    { id: 'BLK-00192', timestamp: '16 Mei 2026, 09:12:45', hash: '0x8f3c...9a12', batchId: 'MBG-AYM-8829', status: 'immutable' },
    { id: 'BLK-00191', timestamp: '16 Mei 2026, 08:30:10', hash: '0x1a4b...7b9c', batchId: 'MBG-BRS-7710', status: 'immutable' },
  ]);

  const addLedgerEntry = (batchId) => {
    const newEntry = {
      id: `BLK-0019${ledgerList.length + 3}`,
      timestamp: 'Hari Ini',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      batchId,
      status: 'immutable'
    };
    setLedgerList(prev => [newEntry, ...prev]);
  };

  // 4. Retur List (Scanner Reject -> Supply Chain)
  const [returList, setReturList] = useState([
    { id: 'RET-001', batchId: 'MBG-AYM-8828', dapur: 'Dapur Umum Gubeng', reason: 'Suhu drop di atas ambang batas', status: 'pending', amount: 'Rp 2.500.000' }
  ]);

  const addReturEntry = (batchId, reason) => {
    const newEntry = {
      id: `RET-00${returList.length + 2}`,
      batchId,
      dapur: 'Dapur Umum Terbaru',
      reason,
      status: 'pending',
      amount: 'Rp ' + (Math.floor(Math.random() * 5) + 1) + '.000.000'
    };
    setReturList(prev => [newEntry, ...prev]);
  };
  
  const claimRetur = (id) => setReturList(prev => prev.filter(r => r.id !== id));

  return (
    <AppContext.Provider value={{
      poList, addPO, approvePO, revisePO,
      prosumerWallet, creditWallet,
      ledgerList, addLedgerEntry,
      returList, addReturEntry, claimRetur
    }}>
      {children}
    </AppContext.Provider>
  );
};
