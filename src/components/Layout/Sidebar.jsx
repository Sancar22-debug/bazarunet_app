import React from "react";
import {
  Home,
  CreditCard,
  BarChart3,
  Settings,
  Store,
} from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "transactions", icon: CreditCard, label: "Transactions" },
    { id: "reports", icon: BarChart3, label: "Reports" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Store size={24} />
        <span>BazaraNet</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};