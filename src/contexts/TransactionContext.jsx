import React, { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext(undefined);

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('bazaranet_transactions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const stored = localStorage.getItem('bazaranet_transactions');
            if (stored) {
                setTransactions(JSON.parse(stored));
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        const stored = localStorage.getItem('bazaranet_transactions');
        if (stored) {
            setTransactions(JSON.parse(stored));
        }
        
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        localStorage.setItem('bazaranet_transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transactionData) => {
        const newTransaction = {
            ...transactionData,
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        };
        setTransactions(prev => [newTransaction, ...prev]);
        return newTransaction;
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const getMetrics = () => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return {
            total_income: income,
            total_expenses: expenses,
            profit: income - expenses,
            transaction_count: transactions.length
        };
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, getMetrics }}>
        {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (!context) throw new Error('useTransactions must be used within TransactionProvider');
    return context;
};
