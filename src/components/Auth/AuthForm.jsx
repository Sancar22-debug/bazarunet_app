import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Store } from "lucide-react";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginDemo, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleDemoLogin = async () => {
    await loginDemo();
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <Store size={48} color="var(--primary)" />
        <h2>BazaraNet</h2>
      </div>

      <div className="auth-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div style={{ marginTop: "24px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                borderTop: "1px solid var(--border-color)",
              }}
            ></div>
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            <span
              style={{
                background: "var(--card-bg)",
                padding: "0 8px",
                color: "var(--text-muted)",
              }}
            >
              Or
            </span>
          </div>
        </div>

        <button onClick={handleDemoLogin} disabled={loading} className="btn-primary btn-demo">
          Login as Demo User
        </button>

        <div className="auth-switch">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Sign in to existing account"}
          </button>
        </div>
      </div>
    </div>
  );
};