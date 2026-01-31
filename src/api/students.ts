import { api } from './client';

export interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  level: string | null;
  phone: string | null;
  notes: string | null;
  createdAt?: string;
  enrollments?: { id: string; courseId: string; courseTitle: string; courseLevel: string; status: string; enrolledAt: string }[];
}

export const studentsApi = {
  list: () => api<Student[]>('/students'),
  get: (id: string) => api<Student>(`/students/${id}`),
  create: (data: { email: string; password?: string; firstName: string; lastName: string; level?: string; phone?: string; notes?: string; courseIds?: string[] }) =>
    api<Student>('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ firstName: string; lastName: string; level: string; phone: string; notes: string; password: string }>) =>
    api<Student>('/students/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/students/' + id, { method: 'DELETE' }),
};
