import { useState, useCallback } from 'react';
import { Transaction, TransferRequest, TransferResponse } from '@/types';
import { api } from '@/services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferData, setTransferData] = useState<TransferResponse | null>(null);

  const transfer = useCallback(async (request: TransferRequest) => {
    setTransferLoading(true);
    setTransferError(null);
    setTransferSuccess(false);
    setTransferData(null);

    try {
      const response = await api.transfer(request);
      setTransferData(response);
      setTransferSuccess(true);
      await getTransactions();
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      setTransferError(errorMsg);
      throw err;
    } finally {
      setTransferLoading(false);
    }
  }, []);

  const getTransactions = useCallback(async () => {
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error('Error cargando transacciones:', err);
    }
  }, []);

  return {
    transactions,
    transferLoading,
    transferError,
    transferSuccess,
    transferData,
    transfer,
    getTransactions,
  };
};