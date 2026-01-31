import { api } from './client';

export interface Material {
  id: string;
  courseId: string | null;
  lessonId: string | null;
  title: string;
  type: string;
  fileUrl: string;
  fileSize: number | null;
  mimeType: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const materialsApi = {
  list: (params?: { courseId?: string; lessonId?: string }) => {
    const search = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    return api<Material[]>('/materials' + (search ? '?' + search : ''));
  },
  get: (id: string) => api<Material>('/materials/' + id),
  create: (data: { courseId?: string; lessonId?: string; title: string; type: string; fileUrl: string; fileSize?: number; mimeType?: string; order?: number }) =>
    api<Material>('/materials', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ title: string; type: string; fileUrl: string; fileSize: number; mimeType: string; order: number; courseId: string; lessonId: string }>) =>
    api<Material>('/materials/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/materials/' + id, { method: 'DELETE' }),
};
