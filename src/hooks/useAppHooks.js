import { useState, useEffect, useCallback } from 'react';

/**
 * useToast - Simple toast notification hook
 * Returns { toasts, showToast }
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ message, type = 'success', duration = 3500 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  return { toasts, showToast };
}

/**
 * useColdChainSim - Simulates live IoT temperature fluctuation
 * Returns array of unit readings that update every 3s
 */
export function useColdChainSim(initialUnits) {
  const [units, setUnits] = useState(initialUnits);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(prev =>
        prev.map(unit => {
          const delta = (Math.random() - 0.5) * 0.3;
          const newTemp = parseFloat((unit.temp + delta).toFixed(1));
          const deviation = parseFloat(Math.abs(newTemp - unit.threshold).toFixed(1));
          const status = unit.type === 'chiller'
            ? (newTemp <= unit.threshold ? 'optimal' : 'warning')
            : (newTemp >= unit.threshold ? 'optimal' : 'warning');
          return { ...unit, temp: newTemp, deviation, status };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return units;
}

/**
 * useContractExecution - Manages contract queue state with execute action
 */
export function useContractExecution(initialContracts) {
  const [contracts, setContracts] = useState(initialContracts);

  const executeContract = useCallback((contractId) => {
    setContracts(prev =>
      prev.map(c =>
        c.id === contractId ? { ...c, status: 'executed' } : c
      )
    );
  }, []);

  const pendingContracts = contracts.filter(c => c.status === 'pending');
  const executedContracts = contracts.filter(c => c.status === 'executed');

  return { contracts, pendingContracts, executedContracts, executeContract };
}

/**
 * useDemandForecast - Manages the AI forecast chart with simulated refresh
 */
export function useDemandForecast(initialData) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        beras: prev.beras.map(v => parseFloat((v + (Math.random() - 0.5) * 0.4).toFixed(1))),
        ayam: prev.ayam.map(v => parseFloat((v + (Math.random() - 0.5) * 0.2).toFixed(1))),
      }));
      setLoading(false);
    }, 1200);
  }, []);

  return { data, loading, refresh };
}
