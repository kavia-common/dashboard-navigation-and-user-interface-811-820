import React, { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

// PUBLIC_INTERFACE
export default function Profile() {
  /** Profile view/edit page. */
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    apiFetch("/profile/me")
      .then(setProfile)
      .catch((e) => setErr(e.message || "Failed to load profile"));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    try {
      const updated = await apiFetch("/profile/me", {
        method: "PUT",
        body: JSON.stringify({
          display_name: profile.display_name,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          location: profile.location,
          website: profile.website,
        }),
      });
      setProfile(updated);
      setMsg("Saved");
    } catch (e) {
      setErr(e.message || "Failed to save");
    }
  };

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <h2 style={{ color: "var(--color-primary)" }}>My Profile</h2>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      <form onSubmit={save} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <label>
          Display Name
          <input value={profile.display_name || ""} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} />
        </label>
        <label>
          Bio
          <input value={profile.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        </label>
        <label>
          Location
          <input value={profile.location || ""} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
        </label>
        <label>
          Website
          <input value={profile.website || ""} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
        </label>
        <button className="btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
}
