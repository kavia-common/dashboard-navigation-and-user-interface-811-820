import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Login() {
  /** Simple login form. */
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto", background: "#fff", padding: 24, borderRadius: 12 }}>
      <h2>{mode === "login" ? "Login" : "Sign up"}</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="btn-primary" type="submit">{mode === "login" ? "Login" : "Create Account"}</button>
      </form>
      <div style={{ marginTop: 12 }}>
        {mode === "login" ? (
          <button onClick={() => setMode("signup")}>Need an account? Sign up</button>
        ) : (
          <button onClick={() => setMode("login")}>Have an account? Login</button>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}
