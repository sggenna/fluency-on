/**
 * Shared API client for FluencyOn backend.
 * Uses VITE_API_URL in production, or Vite proxy /api in dev (see vite.config.ts).
 */
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3001' : '');

export function getApiBase(): string {
  return API_BASE.replace(/\/$/, '');
}

export function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('fluencyon_token');
}

export function setToken(token: string | null): void {
  if (typeof localStorage === 'undefined') return;
  if (token) localStorage.setItem('fluencyon_token', token);
  else localStorage.removeItem('fluencyon_token');
}

export interface ApiError {
  error?: string;
  message?: string;
}

export async function apiRequest<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as ApiError).error ?? (data as ApiError).message ?? `HTTP ${res.status}`;
    throw new Error(typeof msg === 'string' ? msg : 'Request failed');
  }
  return data as T;
}
