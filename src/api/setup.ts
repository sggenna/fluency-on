/**
 * API for student account setup (validate token, set password).
 * No auth required - uses one-time token from email link.
 */
import { getApiBase } from './client';

async function setupRequest<T>(method: string, path: string, body?: unknown): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { error?: string }).error ?? `HTTP ${res.status}`;
    throw new Error(typeof msg === 'string' ? msg : 'Request failed');
  }
  return data as T;
}

export interface ValidateSetupResponse {
  email: string;
  firstName: string;
  lastName: string;
}

export async function validateSetupToken(token: string): Promise<ValidateSetupResponse> {
  return setupRequest<ValidateSetupResponse>(
    'GET',
    `/api/setup/validate?token=${encodeURIComponent(token)}`
  );
}

export interface CompleteSetupPayload {
  token: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export async function completeSetup(payload: CompleteSetupPayload): Promise<{ success: boolean; message: string }> {
  return setupRequest('POST', '/api/setup', payload);
}
