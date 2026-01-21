//
// API client for the social media frontend.
// Uses REACT_APP_API_BASE_URL environment variable for the backend base URL.
// Provides helper methods for GET, POST, PUT with auth token support.
//

// PUBLIC_INTERFACE
export const getApiBaseUrl = () => {
  /**
   * Returns the API base URL from environment variables.
   * Uses REACT_APP_API_BASE_URL; callers should ensure .env contains it.
   */
  const base = process.env.REACT_APP_API_BASE_URL || '';
  return base.replace(/\/+$/, '');
};

// PUBLIC_INTERFACE
export function createApiClient(getToken) {
  /**
   * Creates a simple API client bound to the provided getToken function.
   * getToken is a function that returns the current auth token string or null.
   */
  const base = getApiBaseUrl();

  const withAuthHeaders = (headers = {}) => {
    const token = getToken ? getToken() : null;
    return {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    };
  };

  // PUBLIC_INTERFACE
  async function get(path) {
    /** Performs a GET request to `${base}${path}` and returns parsed JSON. */
    const res = await fetch(`${base}${path}`, {
      method: 'GET',
      headers: withAuthHeaders(),
    });
    if (!res.ok) {
      const msg = await safeText(res);
      throw new Error(`GET ${path} failed: ${res.status} ${msg}`);
    }
    return res.json();
  }

  // PUBLIC_INTERFACE
  async function post(path, body) {
    /** Performs a POST request with JSON body; returns parsed JSON. */
    const res = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: withAuthHeaders(),
      body: JSON.stringify(body ?? {}),
    });
    if (!res.ok) {
      const msg = await safeText(res);
      throw new Error(`POST ${path} failed: ${res.status} ${msg}`);
    }
    return res.json();
  }

  // PUBLIC_INTERFACE
  async function put(path, body) {
    /** Performs a PUT request with JSON body; returns parsed JSON. */
    const res = await fetch(`${base}${path}`, {
      method: 'PUT',
      headers: withAuthHeaders(),
      body: JSON.stringify(body ?? {}),
    });
    if (!res.ok) {
      const msg = await safeText(res);
      throw new Error(`PUT ${path} failed: ${res.status} ${msg}`);
    }
    return res.json();
  }

  return { get, post, put };
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}
