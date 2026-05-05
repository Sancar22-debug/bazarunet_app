import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Settings = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>Settings</h1>

      <div className="card">
        <h3 style={{ marginBottom: "16px" }}>Account Information</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <span
              style={{
                color: "var(--text-muted)",
                display: "block",
                fontSize: "14px",
              }}
            >
              Name
            </span>
            <span style={{ fontWeight: "500" }}>{user?.name}</span>
          </div>
          <div>
            <span
              style={{
                color: "var(--text-muted)",
                display: "block",
                fontSize: "14px",
              }}
            >
              Email
            </span>
            <span style={{ fontWeight: "500" }}>{user?.email}</span>
          </div>
          <div>
            <span
              style={{
                color: "var(--text-muted)",
                display: "block",
                fontSize: "14px",
              }}
            >
              Role
            </span>
            <span style={{ fontWeight: "500", textTransform: "capitalize" }}>
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};