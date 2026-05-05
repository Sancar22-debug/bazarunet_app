import React from "react";
import { AlertTriangle } from "lucide-react";

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div className="metric-icon red">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3>{title}</h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              {message}
            </p>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary"
            style={{ width: "auto", background: "var(--danger)" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};