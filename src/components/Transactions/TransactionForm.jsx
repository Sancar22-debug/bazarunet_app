import React, { useState } from 'react';
import { useTransactions } from '../../contexts/TransactionContext';

export const TransactionForm = ({ onClose }) => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    onClose();
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>
        Add Transaction
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Type</label>
          <select 
            value={formData.type} 
            onChange={e => setFormData({...formData, type: e.target.value})}
            className="input-field"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Amount (KGS)</label>
          <input 
            type="number" 
            required 
            value={formData.amount} 
            onChange={e => setFormData({...formData, amount: e.target.value})} 
            className="input-field" 
          />
        </div>
        <div className="input-group">
          <label className="input-label">Category</label>
          <input 
            type="text" 
            required 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})} 
            className="input-field" 
          />
        </div>
        <div className="input-group">
          <label className="input-label">Description</label>
          <input 
            type="text" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            className="input-field" 
          />
        </div>
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: '8px', 
            marginTop: '24px' 
          }}
        >
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary" style={{ width: 'auto' }}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};