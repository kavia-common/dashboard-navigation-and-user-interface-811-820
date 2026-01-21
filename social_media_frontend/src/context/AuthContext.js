import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createApiClient } from '../api/client';

// PUBLIC_INTERFACE
export const AuthContext = createContext({
  /** Provides auth state and methods across the app. */
  user: null,
  token: null,
  login: async (_email, _password) => {},
  logout: () => {},
  isAuthenticated: false,
  loading: false,
});

const TOKEN_KEY = 'sm_token';
const USER_KEY = 'sm_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const getToken = useCallback(() => token, [token]);
  const api = useMemo(() => createApiClient(getToken), [getToken]);

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      try {
        // Expected backend route: POST /auth/login { email, password }
        const data = await api.post('/auth/login', { email, password });
        if (data?.access_token) {
          setToken(data.access_token);
        }
        if (data?.user) {
          setUser(data.user);
        } else {
          // Fallback to fetching profile after login if user not returned
          try {
            const profile = await api.get('/users/me');
            setUser(profile);
          } catch {
            // ignore
          }
        }
        return true;
      } catch (e) {
        console.error('Login failed', e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: Boolean(token),
      loading,
    }),
    [user, token, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
