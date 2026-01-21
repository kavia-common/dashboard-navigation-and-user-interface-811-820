import React, { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard page: loads analytics summary. */
  const [summary, setSummary] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiFetch("/analytics/summary")
      .then(setSummary)
      .catch((e) => setErr(e.message || "Failed to load analytics"));
  }, []);

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!summary) return <div>Loading analytics...</div>;

  return (
    <div>
      <h2 style={{ color: "var(--color-primary)" }}>Analytics Summary</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <Card title="Posts" value={summary.posts_count} />
        <Card title="Likes" value={summary.likes_count} />
        <Card title="Comments" value={summary.comments_count} />
        <Card title="Shares" value={summary.shares_count} />
        <Card title="Views" value={summary.views_count} />
        <Card title="Followers" value={summary.followers_count} />
        <Card title="Following" value={summary.following_count} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 16 }}>
      <div style={{ color: "var(--color-accent)", fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
