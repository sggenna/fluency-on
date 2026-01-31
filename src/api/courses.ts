import { api } from './client';

export interface Course {
  id: string;
  title: string;
  description: string | null;
  level: string;
  thumbnail: string | null;
  isActive: boolean;
  _count?: { lessons: number; enrollments: number };
  lessons?: unknown[];
  materials?: unknown[];
}

export const coursesApi = {
  list: () => api<Course[]>('/courses'),
  get: (id: string) => api<Course>(`/courses/${id}`),
  create: (data: { title: string; description?: string; level: string; thumbnail?: string; isActive?: boolean }) =>
    api<Course>('/courses', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ title: string; description: string; level: string; thumbnail: string; isActive: boolean }>) =>
    api<Course>('/courses/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/courses/' + id, { method: 'DELETE' }),
};
