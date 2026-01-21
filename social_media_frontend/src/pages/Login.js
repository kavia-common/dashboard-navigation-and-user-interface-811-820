import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './pages.css';

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Redirect via router handled externally by ProtectedRoute usage.
      // Alternatively, window.location = '/dashboard';
      window.location.assign('/dashboard');
    } catch (err) {
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="sm-login-wrap">
      <div className="sm-login-card">
        <div className="sm-login-header">
          <div className="sm-login-logo">S</div>
          <div className="sm-login-title">Sign in to Social Dashboard</div>
          <div className="sm-login-subtitle">Use your account to continue</div>
        </div>
        <form className="sm-form" onSubmit={onSubmit}>
          <div className="sm-form-row">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="sm-form-row">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="sm-error">{error}</div>}
          <div className="sm-form-actions">
            <button className="sm-btn sm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
