import React, { createContext, useState, useEffect, useContext } from "react";
import { apiFetch, setToken, getToken } from "../api/client";

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth context. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state and helpers (login, logout, register). */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to fetch profile on mount if token exists
  useEffect(() => {
    const t = getToken();
    if (!t) {
      setLoading(false);
      return;
    }
    apiFetch("/profile/me")
      .then((u) => setUser(u))
      .catch(() => {
        setToken("");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const form = new URLSearchParams();
    form.set("username", email);
    form.set("password", password);
    const resp = await fetch(
      `${process.env.REACT_APP_API_BASE_URL || ""}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
      }
    );
    if (!resp.ok) {
      throw new Error("Login failed");
    }
    const data = await resp.json();
    setToken(data.access_token);
    const profile = await apiFetch("/profile/me");
    setUser(profile);
  };

  const register = async (email, password) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.access_token);
    const profile = await apiFetch("/profile/me");
    setUser(profile);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
