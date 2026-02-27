import { Account, Transaction, TransferRequest, TransferResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const api = {
  getAccount: async (accountNumber: string): Promise<Account> => {
    const response = await fetch(
      `${API_BASE_URL}/Accounts/${accountNumber}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error('Cuenta no encontrada');
    }

    return response.json();
  },

  transfer: async (request: TransferRequest): Promise<TransferResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/Transactions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error en la transferencia');
    }

    return response.json();
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await fetch(
      `${API_BASE_URL}/Transactions`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error('Error obteniendo transacciones');
    }

    return response.json();
  },
};