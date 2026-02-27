'use client';

import { useState } from 'react';
import { TransferRequest, Status } from '@/types';
import { useAccounts } from '@/hooks/useAccounts';
import { useTransactions } from '@/hooks/useTransactions';
import { AccountCard } from '@/components/Account/AccountCard';
import { TransactionList } from '@/components/Transfer/TransactionList';

export const TransferForm = () => {
  const [sourceAccountNumber, setSourceAccountNumber] = useState('');
  const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [formState, setFormState] = useState<Status>('idle');

  const { account: sourceAccount, loading: loadingSource, error: errorSource, getAccount: getSourceAccount } = useAccounts();
  const {
    transactions,
    transferLoading,
    transferError,
    transferSuccess,
    transferData,
    transfer,
    getTransactions,
  } = useTransactions();

  const handleGetAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceAccountNumber) {
      await getSourceAccount(sourceAccountNumber);
      await getTransactions();
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sourceAccountNumber || !destinationAccountNumber || !amount) {
      alert('Completa todos los campos');
      return;
    }

    setFormState('loading');

    try {
      await transfer({
        sourceAccountNumber,
        destinationAccountNumber,
        amount: parseFloat(amount),
      });

      setFormState('success');
      setAmount('');
      setDestinationAccountNumber('');

      await getSourceAccount(sourceAccountNumber);

      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      setFormState('error');
      console.error('Error en transferencia:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xl shadow-indigo-100/50 text-black">
        <div className="flex items-center gap-3 mb-6 pb-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold">1</span>
          <h2 className="text-xl font-bold text-gray-800">Consultar Cuenta</h2>
        </div>
        <form onSubmit={handleGetAccount} className="flex gap-5">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Introduce número de cuenta"
              value={sourceAccountNumber}
              onChange={(e) => setSourceAccountNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <button
            type="submit"
            disabled={loadingSource}
            className="px-1 bg-indigo-600 text-white font-normal rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 transition-all shadow-md active:scale-95">
            {loadingSource ? 'Cargando...' : 'Consultar'}
          </button>
        </form>

        {sourceAccount && <AccountCard account={sourceAccount} loading={false} error={null} />}
      </div>

     {sourceAccount && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xl shadow-indigo-100/50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-sm font-bold">2</span>
            <h2 className="text-xl font-bold text-gray-800">Realizar Transferencia</h2>
          </div>


          <form onSubmit={handleTransfer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="sourceAccount" className="block text-xs font-semibold uppercase text-gray-500 mb-1 ml-1">Cuenta Origen</label>
              <input id="sourceAccount"
                type="text"
                disabled
                value={sourceAccountNumber}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-gray-500 font-mono italic cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1 ml-1">Cuenta Destino</label>
              <input
                type="text"
                placeholder="Ej: ACC002"
                value={destinationAccountNumber}
                onChange={(e) => setDestinationAccountNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1 ml-1">Monto ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={transferLoading || formState === 'success'}
              className="md:col-span-2 w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 disabled:bg-gray-300 transition-all font-bold shadow-lg shadow-green-100 active:scale-[0.98]"
            >
              {transferLoading ? '⏳ Procesando...' : 'Confirmar Transferencia →'}
            </button>
          </form>
        </div>
      )}

      {/* HISTORIAL */}
      {transactions.length > 0 && (
        <div className="animate-in fade-in duration-700">
           <TransactionList transactions={transactions} />
        </div>
      )}
    </div>
  );
};