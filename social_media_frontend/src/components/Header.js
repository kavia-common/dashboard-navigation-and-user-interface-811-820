import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './layout.css';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const name = user?.name || user?.username || 'User';
  const email = user?.email || '';

  return (
    <header className="sm-header" aria-label="Top Header">
      <div className="sm-header-left">
        <h1 className="sm-page-title">Social Media Dashboard</h1>
      </div>
      <div className="sm-header-right">
        <button className="sm-icon-btn" title="Settings" aria-label="Settings" onClick={() => setOpen(o => !o)}>
          ⚙️
        </button>
        <div className="sm-avatar" onClick={() => setOpen(o => !o)} role="button" tabIndex={0} aria-label="User menu">
          <span>{(name?.[0] || 'U').toUpperCase()}</span>
        </div>
        {open && (
          <div className="sm-menu" role="menu" aria-label="User menu dropdown">
            <div className="sm-menu-header">
              <div className="sm-menu-avatar">{(name?.[0] || 'U').toUpperCase()}</div>
              <div>
                <div className="sm-menu-name">{name}</div>
                <div className="sm-menu-email">{email}</div>
              </div>
            </div>
            <a className="sm-menu-item" href="/profile">View Profile</a>
            <button className="sm-menu-item sm-danger" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
