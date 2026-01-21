import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createApiClient } from '../api/client';
import './pages.css';

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const api = useMemo(() => createApiClient(() => token), [token]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalPosts: 0,
    followers: 0,
    engagementRate: 0,
    growthPercent: 0,
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        // Expected endpoints:
        // GET /analytics/summary -> { totalPosts, followers, engagementRate, growthPercent }
        // GET /analytics/recent -> [{ id, title, likes, comments, shares }]
        const [summary, rec] = await Promise.all([
          api.get('/analytics/summary'),
          api.get('/analytics/recent'),
        ]);
        if (!mounted) return;
        setMetrics({
          totalPosts: summary?.totalPosts ?? 0,
          followers: summary?.followers ?? 0,
          engagementRate: summary?.engagementRate ?? 0,
          growthPercent: summary?.growthPercent ?? 0,
        });
        setRecent(Array.isArray(rec) ? rec.slice(0, 5) : []);
      } catch (e) {
        console.error('Failed to load analytics', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [api]);

  return (
    <div className="sm-page">
      <div className="sm-grid">
        <Widget title="Total Posts" value={metrics.totalPosts} accent="blue" />
        <Widget title="Followers" value={metrics.followers} accent="amber" />
        <Widget title="Engagement Rate" value={`${metrics.engagementRate}%`} accent="green" />
        <Widget title="Growth" value={`${metrics.growthPercent}%`} accent="blue" />
      </div>

      <section className="sm-section">
        <div className="sm-section-header">
          <h2>Recent Performance</h2>
        </div>
        {loading ? (
          <div className="sm-card">Loading analytics...</div>
        ) : (
          <div className="sm-card">
            <div className="sm-table">
              <div className="sm-table-head">
                <div>Post</div>
                <div>Likes</div>
                <div>Comments</div>
                <div>Shares</div>
              </div>
              <div className="sm-table-body">
                {recent.map((r) => (
                  <div className="sm-table-row" key={r.id}>
                    <div className="sm-ellipsis">{r.title}</div>
                    <div>{r.likes}</div>
                    <div>{r.comments}</div>
                    <div>{r.shares}</div>
                  </div>
                ))}
                {recent.length === 0 && (
                  <div className="sm-table-row">
                    <div className="sm-ellipsis" style={{ gridColumn: '1 / -1' }}>No recent posts.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Widget({ title, value, accent }) {
  const cls = `sm-card sm-widget sm-accent-${accent}`;
  return (
    <div className={cls}>
      <div className="sm-widget-title">{title}</div>
      <div className="sm-widget-value">{value}</div>
    </div>
  );
}
