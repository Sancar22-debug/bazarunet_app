import React, { useMemo } from "react";
import { useTransactions } from "../../contexts/TransactionContext";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#6366f1', '#14b8a6', '#f97316'];

export const Reports = () => {
  const { transactions, getMetrics } = useTransactions();
  const metrics = getMetrics();

  const incomeByCategory = useMemo(() => {
    const data = {};
    transactions.filter(t => t.type === 'income').forEach(t => {
      data[t.category] = (data[t.category] || 0) + t.amount;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const expensesByCategory = useMemo(() => {
    const data = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      data[t.category] = (data[t.category] || 0) + t.amount;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const dailyData = useMemo(() => {
    const data = {};
    transactions.forEach(t => {
      const date = t.timestamp.split('T')[0];
      if (!data[date]) {
        data[date] = { date, income: 0, expense: 0 };
      }
      if (t.type === 'income') data[date].income += t.amount;
      else data[date].expense += t.amount;
    });
    return Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7);
  }, [transactions]);

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Financial Reports</h1>

      <div className="grid-3">
        <div className="card">
          <p className="metric-title">Total Income</p>
          <p className="metric-value" style={{ color: "var(--success)" }}>
            {metrics.total_income.toLocaleString()} KGS
          </p>
        </div>
        <div className="card">
          <p className="metric-title">Total Expenses</p>
          <p className="metric-value" style={{ color: "var(--danger)" }}>
            {metrics.total_expenses.toLocaleString()} KGS
          </p>
        </div>
        <div className="card">
          <p className="metric-title">Net Profit</p>
          <p className="metric-value" style={{ color: metrics.profit >= 0 ? "var(--success)" : "var(--danger)" }}>
            {metrics.profit.toLocaleString()} KGS
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>Income by Category</h3>
          {incomeByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={incomeByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {incomeByCategory.map((entry, index) => (
                    <Cell key={`income-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "var(--text-muted)", textAlign: "center" }}>No income data</p>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>Expenses by Category</h3>
          {expensesByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={expensesByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`expense-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "var(--text-muted)", textAlign: "center" }}>No expense data</p>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Income vs Expenses (Last 7 Days)</h3>
        {dailyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expense" fill="#ef4444" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: "var(--text-muted)", textAlign: "center" }}>No transaction data</p>
        )}
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Profit Trend</h3>
        {dailyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Expense" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: "var(--text-muted)", textAlign: "center" }}>No transaction data</p>
        )}
      </div>
    </div>
  );
};