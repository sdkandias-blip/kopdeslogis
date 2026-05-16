import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ProsumerPortal from './pages/ProsumerPortal';
import SupplyChain from './pages/SupplyChain';
import Operations from './pages/Operations';
import TraceabilityScanner from './pages/TraceabilityScanner';
import Financials from './pages/Financials';
import DapurPortal from './pages/DapurPortal';
import AuditLedger from './pages/AuditLedger';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/prosumer" element={<ProsumerPortal />} />
        <Route path="/supply-chain" element={<SupplyChain />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/scanner" element={<TraceabilityScanner />} />
        <Route path="/financials" element={<Financials />} />
        <Route path="/dapur" element={<DapurPortal />} />
        <Route path="/audit" element={<AuditLedger />} />
      </Routes>
    </Router>
  );
}

export default App;
