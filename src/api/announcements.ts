import { api } from './client';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const announcementsApi = {
  list: () => api<Announcement[]>('/announcements'),
  get: (id: string) => api<Announcement>('/announcements/' + id),
  create: (data: { title: string; content: string; targetRole?: string; isActive?: boolean }) =>
    api<Announcement>('/announcements', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ title: string; content: string; targetRole: string; isActive: boolean }>) =>
    api<Announcement>('/announcements/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => api<void>('/announcements/' + id, { method: 'DELETE' }),
};
