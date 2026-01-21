const API_BASE = process.env.REACT_APP_API_BASE_URL || "";
const TOKEN_KEY = process.env.REACT_APP_AUTH_TOKEN_KEY || "auth_token";

// PUBLIC_INTERFACE
export function setToken(token) {
  /** Save JWT token to localStorage. */
  localStorage.setItem(TOKEN_KEY, token);
}

// PUBLIC_INTERFACE
export function getToken() {
  /** Retrieve JWT token from localStorage. */
  return localStorage.getItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export async function apiFetch(path, options = {}) {
  /** Fetch wrapper that injects Authorization header if token is present. */
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const resp = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!resp.ok) {
    let detail = "";
    try {
      detail = await resp.text();
    } catch {}
    throw new Error(`API ${resp.status}: ${detail}`);
  }
  const ct = resp.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return resp.json();
  }
  return resp.text();
}
