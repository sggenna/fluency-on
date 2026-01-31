import { api } from './client';

export interface Progress {
  id: string;
  studentId: string;
  lessonId: string;
  completed: boolean;
  watched: boolean;
  watchTime: number;
  completedAt: string | null;
  lesson?: { id: string; title: string; courseId: string; course?: { title: string } };
}

export const progressApi = {
  list: (studentId?: string) =>
    api<Progress[]>('/progress' + (studentId ? '?studentId=' + encodeURIComponent(studentId) : '')),
  upsert: (lessonId: string, data: { completed?: boolean; watched?: boolean; watchTime?: number }) =>
    api<Progress>('/progress', { method: 'POST', body: JSON.stringify({ lessonId, ...data }) }),
  update: (id: string, data: { completed?: boolean; watched?: boolean; watchTime?: number }) =>
    api<Progress>('/progress/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
};
