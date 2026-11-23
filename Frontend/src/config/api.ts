/**
 * Central API Configuration for CODEX PLUS Frontend
 * Domain: https://codexplus.site
 */

const rawBase = (import.meta.env.VITE_API_URL as string | undefined) || '';
export const API_BASE_URL = rawBase.replace(/\/$/, '');

/**
 * Returns a clean, normalized API endpoint URL.
 * If VITE_API_URL is configured (e.g. 'https://codexplus.site'), it prepends it.
 * If VITE_API_URL is empty, it uses the relative endpoint path (e.g. '/api/contact').
 */
export const apiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;
};

