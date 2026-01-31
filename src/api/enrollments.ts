import { api } from './client';

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: string;
  enrolledAt: string;
  completedAt: string | null;
  course?: {
    id: string;
    title: string;
    level: string;
    _count?: { lessons: number };
  };
}

export const enrollmentsApi = {
  list: (studentId?: string) =>
    api<Enrollment[]>('/enrollments' + (studentId ? '?studentId=' + encodeURIComponent(studentId) : '')),
  create: (studentId: string, courseId: string) =>
    api<Enrollment>('/enrollments', { method: 'POST', body: JSON.stringify({ studentId, courseId }) }),
  update: (id: string, data: { status?: string }) =>
    api<Enrollment>('/enrollments/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/enrollments/' + id, { method: 'DELETE' }),
};
