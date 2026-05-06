import React, { useState } from 'react';
import { useTransactions } from '../../contexts/TransactionContext';
import { TransactionForm } from './TransactionForm';
import { Plus } from 'lucide-react';

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '24px' }}>
        <h1>Transactions</h1>
        <button onClick={() => setShowForm(true)} className="btn-icon">
          <Plus size={20} />
          <span>Add New</span>
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TransactionForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <div className="card" style={{ padding: '0' }}>
        <ul style={{ listStyle: 'none' }}>
          {transactions.map(t => (
            <li key={t.id} className="list-item">
              <div>
                <p style={{ fontWeight: '500' }}>{t.category}</p>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {t.description} • {new Date(t.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span 
                  className={t.type === 'income' ? 'amount-income' : 'amount-expense'}
                >
                  {t.type === 'income' ? '+' : '-'}{t.amount} KGS
                </span>
                <button 
                  onClick={() => deleteTransaction(t.id)} 
                  className="btn-text danger" 
                  style={{ fontSize: '14px' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {transactions.length === 0 && (
            <li 
              style={{ 
                padding: '32px', 
                textAlign: 'center', 
                color: 'var(--text-muted)' 
              }}
            >
              No transactions found. Add one!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};