import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css';

export default function Sidebar() {
  return (
    <aside className="sm-sidebar" aria-label="Sidebar Navigation">
      <div className="sm-brand">
        <span className="sm-logo">S</span>
        <div className="sm-brand-text">
          <span className="sm-brand-title">Social Dashboard</span>
          <span className="sm-brand-sub">Insights & Profiles</span>
        </div>
      </div>
      <nav className="sm-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'sm-link active' : 'sm-link'}>
          <span className="sm-link-icon">📊</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'sm-link active' : 'sm-link'}>
          <span className="sm-link-icon">👤</span>
          <span>Profile</span>
        </NavLink>
      </nav>
      <div className="sm-sidebar-footer">
        <a className="sm-footer-link" href="https://reactjs.org" target="_blank" rel="noreferrer">Help</a>
      </div>
    </aside>
  );
}
