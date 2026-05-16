import AdminLayout from '../layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockLedger = [
  { id: 'BLK-00192', timestamp: '16 Mei 2026, 09:12:45', hash: '0x8f3c...9a12', batchId: 'MBG-AYM-8829', status: 'immutable' },
  { id: 'BLK-00191', timestamp: '16 Mei 2026, 08:30:10', hash: '0x1a4b...7b9c', batchId: 'MBG-BRS-7710', status: 'immutable' },
  { id: 'BLK-00190', timestamp: '15 Mei 2026, 14:22:05', hash: '0x5c9e...2f8a', batchId: 'MBG-SYR-6651', status: 'immutable' },
];

const AuditLedger = () => {
  return (
    <AdminLayout activePage="audit" title="Audit & Ledger">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Module</p>
          <h1 className="font-display text-2xl font-extrabold text-white">Blockchain Ledger Audit</h1>
        </div>
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500/10 border border-green-500/20 text-green-500">
          <span className="material-symbols-outlined text-sm">enhanced_encryption</span>
          Terdesentralisasi
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-up">
        {/* Ledger Summary */}
        <div className="lg:col-span-4 space-y-5">
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-6">
              <span className="material-symbols-outlined text-green-400 text-3xl mb-3">gpp_good</span>
              <h3 className="text-xl font-bold text-white mb-1">Bukti Anti-Manipulasi</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Setiap penerimaan barang oleh Dapur Umum yang telah lolos QC dan Audit Suhu dicatat ke dalam buku besar digital (Blockchain). Data ini tidak dapat diubah (Immutable) dan dienkripsi.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ledger Table */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400">receipt_long</span>
                Log Transaksi (Smart Contracts)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-900 border-y border-gray-800">
                  <tr>
                    <th className="py-3 px-5 text-xs text-gray-500 uppercase font-bold">Block ID</th>
                    <th className="py-3 px-5 text-xs text-gray-500 uppercase font-bold">Waktu</th>
                    <th className="py-3 px-5 text-xs text-gray-500 uppercase font-bold">Batch Ref</th>
                    <th className="py-3 px-5 text-xs text-gray-500 uppercase font-bold">Tx Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLedger.map((ledger, idx) => (
                    <tr key={idx} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5">
                        <span className="text-sm font-bold text-white">{ledger.id}</span>
                      </td>
                      <td className="py-4 px-5 text-sm text-gray-400">{ledger.timestamp}</td>
                      <td className="py-4 px-5">
                        <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
                          {ledger.batchId}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                          <span className="material-symbols-outlined text-green-500 text-[14px]">lock</span>
                          {ledger.hash}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuditLedger;
