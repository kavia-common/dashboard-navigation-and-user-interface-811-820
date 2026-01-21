import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Left sidebar navigation. */
  return (
    <aside className="sidebar">
      <nav style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16 }}>
        <Link className="link" to="/dashboard">Dashboard</Link>
        <Link className="link" to="/profile" style={{ marginTop: 8 }}>Profile</Link>
      </nav>
    </aside>
  );
}
