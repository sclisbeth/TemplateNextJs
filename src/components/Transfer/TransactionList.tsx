'use client';

import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">3. Historial de Transacciones</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">De</th>
              <th className="px-4 py-2 text-left font-semibold">Para</th>
              <th className="px-4 py-2 text-right font-semibold">Monto</th>
              <th className="px-4 py-2 text-left font-semibold">Comprobante</th>
              <th className="px-4 py-2 text-left font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{tx.sourceAccountNumber}</td>
                <td className="px-4 py-3">{tx.destinationAccountNumber}</td>
                <td className="px-4 py-3 text-right font-semibold">${tx.amount.toFixed(2)}</td>
                <td className="px-4 py-3 font-mono text-xs">{tx.voucherCode}</td>
                <td className="px-4 py-3">{new Date(tx.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};