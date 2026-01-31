import { api } from './client';

export interface ClassSchedule {
  id: string;
  dayOfWeek: string;
  time: string;
  level: string;
  maxStudents: number;
  currentStudents: number;
  meetUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const schedulesApi = {
  list: () => api<ClassSchedule[]>('/schedules'),
  get: (id: string) => api<ClassSchedule>(`/schedules/${id}`),
  create: (data: { dayOfWeek: string; time: string; level: string; maxStudents?: number; meetUrl?: string; isActive?: boolean }) =>
    api<ClassSchedule>('/schedules', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ dayOfWeek: string; time: string; level: string; maxStudents: number; currentStudents: number; meetUrl: string; isActive: boolean }>) =>
    api<ClassSchedule>('/schedules/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/schedules/' + id, { method: 'DELETE' }),
};
