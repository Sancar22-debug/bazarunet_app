import React from 'react';
import { useTransactions } from '../../contexts/TransactionContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const Dashboard = ({ onNavigate }) => {
  const { getMetrics, transactions } = useTransactions();
  const metrics = getMetrics();
  
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Dashboard</h1>
      
      <div className="grid-3">
        <div className="card metric-card">
          <div className="metric-icon blue"><Wallet size={24} /></div>
          <div>
            <p className="metric-title">Net Profit</p>
            <p className="metric-value">{metrics.profit} KGS</p>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-icon green"><TrendingUp size={24} /></div>
          <div>
            <p className="metric-title">Income</p>
            <p className="metric-value">{metrics.total_income} KGS</p>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-icon red"><TrendingDown size={24} /></div>
          <div>
            <p className="metric-title">Expenses</p>
            <p className="metric-value">{metrics.total_expenses} KGS</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <h3>Recent Transactions</h3>
          <button onClick={() => onNavigate('transactions')} className="btn-text">
            View All
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentTransactions.length > 0 ? recentTransactions.map(t => (
            <div 
              key={t.id} 
              className="flex-between" 
              style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}
            >
              <div><p style={{ fontWeight: '500' }}>{t.category}</p></div>
              <span 
                className={t.type === 'income' ? 'amount-income' : 'amount-expense'}
              >
                {t.type === 'income' ? '+' : '-'}{t.amount} KGS
              </span>
            </div>
          )) : (
            <p style={{ color: 'var(--text-muted)' }}>No recent transactions.</p>
          )}
        </div>
      </div>
    </div>
  );
};