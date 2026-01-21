import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createApiClient } from '../api/client';
import './pages.css';

export default function Profile() {
  const { user, token, logout } = useContext(AuthContext);
  const api = useMemo(() => createApiClient(() => token), [token]);

  const [profile, setProfile] = useState(user || {});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Ensure we have the latest profile
        const data = await api.get('/users/me');
        if (mounted) setProfile(data || {});
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    })();
    return () => { mounted = false; };
  }, [api]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      // Expected endpoint: PUT /users/me with profile fields
      await api.put('/users/me', profile);
      setStatus('Profile saved successfully.');
    } catch (e) {
      console.error('Save failed', e);
      setStatus('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="sm-page">
      <section className="sm-section">
        <div className="sm-section-header">
          <h2>Your Profile</h2>
          <button className="sm-btn sm-btn-outline" onClick={logout}>Logout</button>
        </div>
        <div className="sm-card">
          <form className="sm-form" onSubmit={onSave}>
            <div className="sm-form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={profile.name || ''} onChange={onChange} placeholder="Your name" />
            </div>
            <div className="sm-form-row">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" value={profile.username || ''} onChange={onChange} placeholder="Username" />
            </div>
            <div className="sm-form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" value={profile.email || ''} onChange={onChange} placeholder="Email" type="email" />
            </div>
            <div className="sm-form-actions">
              <button className="sm-btn sm-btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
            {status && <div className="sm-status">{status}</div>}
          </form>
        </div>
      </section>
    </div>
  );
}
