import { api } from './client';

export interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  maxScore: number;
  lesson?: { id: string; title: string; courseId: string; course?: { title: string } };
  submissions?: unknown[];
}

export const assignmentsApi = {
  listByLesson: (lessonId: string) => api<Assignment[]>('/assignments?lessonId=' + encodeURIComponent(lessonId)),
  get: (id: string) => api<Assignment>('/assignments/' + id),
  create: (data: { lessonId: string; title: string; description?: string; dueDate?: string; maxScore?: number }) =>
    api<Assignment>('/assignments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ title: string; description: string; dueDate: string; maxScore: number }>) =>
    api<Assignment>('/assignments/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/assignments/' + id, { method: 'DELETE' }),
};
