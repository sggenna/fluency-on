const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : '/api');

function getToken(): string | null {
  return typeof localStorage !== 'undefined' ? localStorage.getItem('fluencyon_token') : null;
}

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

  const res = await fetch(`${API_BASE}/upload`, {
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

const UPLOADS_BASE = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : '/api')).replace(/\/api\/?$/, '');

export function uploadsUrl(filename: string): string {
  return `${UPLOADS_BASE}/api/uploads/${filename}`;
}
