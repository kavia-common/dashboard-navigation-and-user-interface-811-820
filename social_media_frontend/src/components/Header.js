import React from "react";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
export default function Header() {
  /** Top header with user info and logout. */
  const { user, logout } = useAuth();
  return (
    <header className="header">
      <div style={{ fontWeight: 600 }}>Social Dashboard</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span>{user?.display_name || "User"}</span>
        <button className="btn-accent" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
