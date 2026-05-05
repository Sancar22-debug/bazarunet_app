import React from "react";
import { useTransactions } from "../../contexts/TransactionContext";

export const Reports = () => {
  const { getMetrics } = useTransactions();
  const metrics = getMetrics();

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Financial Reports</h1>

      <div className="grid-3">
        <div className="card">
          <p className="metric-title">Total Income</p>
          <p className="metric-value" style={{ color: "var(--success)" }}>
            {metrics.total_income} KGS
          </p>
        </div>
        <div className="card">
          <p className="metric-title">Total Expenses</p>
          <p className="metric-value" style={{ color: "var(--danger)" }}>
            {metrics.total_expenses} KGS
          </p>
        </div>
        <div className="card">
          <p className="metric-title">Net Profit</p>
          <p className="metric-value" style={{ color: "var(--primary)" }}>
            {metrics.profit} KGS
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)" }}>
          More detailed charts will appear here as you add more transactions.
        </p>
      </div>
    </div>
  );
};