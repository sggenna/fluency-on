const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3001/api');

function getToken(): string | null {
  return localStorage.getItem('fluencyon_token');
}

export async function api<T>(
  path: string,
  options: RequestInit & { params?: Record<string, string> } = {}
): Promise<T> {
  const { params, ...init } = options;
  const url = params
    ? `${API_BASE}${path}?${new URLSearchParams(params).toString()}`
    : `${API_BASE}${path}`;
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error || data.message || data.detail;
    const extra = data.message && data.message !== msg ? ' ' + data.message : (data.detail && data.detail !== msg ? ' ' + data.detail : '');
    throw new Error((typeof msg === 'string' ? msg + extra : null) || `HTTP ${res.status}`);
  }
  return data as T;
}

export const authApi = {
  login: (email: string, password: string, role: 'STUDENT' | 'TEACHER') =>
    api<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    }),
  register: (email: string, password: string, firstName: string, lastName: string, level?: string, phone?: string) =>
    api<{ token: string; user: AuthUser }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName, level, phone }),
    }),
  me: () => api<AuthUser>('/auth/me'),
};

export interface AuthUser {
  id: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  firstName: string;
  lastName: string;
  studentProfileId?: string;
  teacherProfileId?: string;
  level?: string;
  phone?: string;
  bio?: string;
}

export { getToken };
export function setToken(token: string | null) {
  if (token) localStorage.setItem('fluencyon_token', token);
  else localStorage.removeItem('fluencyon_token');
}
