import { getApiBase, getToken } from './client';

const API_BASE = () => `${getApiBase().replace(/\/$/, '')}/api`;

export interface UploadResponse {
  url: string;
  filename: string;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const form = new FormData();
  form.append('file', file);
  const token = getToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE()}/upload`, {
    method: 'POST',
    headers,
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error || data.message || `HTTP ${res.status}`;
    throw new Error(typeof msg === 'string' ? msg : 'Upload failed');
  }
  return data as UploadResponse;
}

export function uploadsUrl(filename: string): string {
  const base = getApiBase().replace(/\/$/, '');
  return `${base}/api/uploads/${filename}`;
}
