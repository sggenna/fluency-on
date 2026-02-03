import { apiRequest, getToken, setToken } from './client';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  profile?: { phone?: string | null; bio?: string | null };
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface MeResponse {
  user: AuthUser;
}

export interface UpdateMePayload {
  email?: string;
  currentPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export async function updateMe(payload: UpdateMePayload): Promise<MeResponse> {
  const data = await apiRequest<MeResponse>('PATCH', '/api/auth/me', payload);
  return data;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await apiRequest<LoginResponse>('POST', '/api/auth/login', {
    email: email.trim().toLowerCase(),
    password,
  });
  setToken(data.token);
  return data;
}

export async function getMe(): Promise<AuthUser | null> {
  if (!getToken()) return null;
  try {
    const data = await apiRequest<MeResponse>('GET', '/api/auth/me');
    return data.user;
  } catch {
    setToken(null);
    return null;
  }
}

export function logout(): void {
  setToken(null);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
