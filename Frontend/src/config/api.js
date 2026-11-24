/**
 * Central API Configuration for CODEX PLUS Frontend
 * Connects Frontend seamlessly to Backend across Local, Docker, and Production VPS (https://codexplus.site)
 */
const rawBase = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';
export const API_BASE_URL = rawBase.replace(/\/$/, '');

/**
 * Returns normalized API endpoint URL.
 * If VITE_API_URL is configured (e.g. 'https://codexplus.site'), it prepends it.
 * If empty, it uses relative endpoint path (e.g. '/api/contact') which Vite proxies or Express serves.
 */
export const apiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;
};

export default { API_BASE_URL, apiUrl };

