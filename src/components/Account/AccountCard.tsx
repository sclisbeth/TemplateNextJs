'use client';

import { Account } from '@/types';

interface AccountCardProps {
  account: Account | null;
  loading: boolean;
  error: string | null;
}

export const AccountCard = ({ account, loading, error }: AccountCardProps) => {
  if (loading) {
    return <div className="p-4 bg-blue-50 rounded-lg">Cargando...</div>;
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>;
  }

  if (!account) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Cuenta: {account.accountNumber}</h3>
      <p className="text-3xl font-bold text-green-600">${account.balance.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mt-2">
        Actualizado: {new Date(account.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};