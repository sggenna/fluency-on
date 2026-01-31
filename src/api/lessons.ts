import { api } from './client';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  order: number;
  duration: number | null;
  isPublished: boolean;
  course?: { id: string; title: string; level: string };
  assignments?: unknown[];
  materials?: unknown[];
}

export const lessonsApi = {
  listByCourse: (courseId: string) => api<Lesson[]>(`/lessons?courseId=${encodeURIComponent(courseId)}`),
  get: (id: string) => api<Lesson>(`/lessons/${id}`),
  create: (data: { courseId: string; title: string; description?: string; videoUrl?: string; order?: number; duration?: number; isPublished?: boolean }) =>
    api<Lesson>('/lessons', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ title: string; description: string; videoUrl: string; order: number; duration: number; isPublished: boolean }>) =>
    api<Lesson>('/lessons/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/lessons/' + id, { method: 'DELETE' }),
};
