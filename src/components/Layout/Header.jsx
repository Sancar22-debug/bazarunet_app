import React from "react";
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-actions"></div>

      <div className="header-actions">
        <button className="btn-text" style={{ color: "var(--text-muted)" }}>
          <Bell size={20} />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderLeft: "1px solid var(--border-color)",
            paddingLeft: "16px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "#eff6ff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              fontWeight: "bold",
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <button
            onClick={logout}
            className="btn-text flex-between"
            style={{ color: "var(--text-muted)", gap: "4px" }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};