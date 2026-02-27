import { useState, useCallback } from 'react';
import { Account } from '@/types';
import { api } from '@/services/api';

export const useAccounts = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccount = useCallback(async (accountNumber: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.getAccount(accountNumber);
      setAccount(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { account, loading, error, getAccount };
};