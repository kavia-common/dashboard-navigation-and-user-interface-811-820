import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './components/layout.css';
import './pages/pages.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

// PUBLIC_INTERFACE
function App() {
  /** Root application mounting routes and layout with theme toggling. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Apply theme attribute to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="sm-app">
          <Sidebar />
          <main className="sm-main">
            <Header />
            <div className="sm-content">
              <button className="sm-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
