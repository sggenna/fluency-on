import { api } from './client';

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileUrl: string | null;
  score: number | null;
  feedback: string | null;
  status: string;
  submittedAt: string;
  gradedAt: string | null;
  assignment?: { id: string; title: string; lesson?: { title: string; course?: { title: string } } };
  student?: { id: string; firstName: string; lastName: string; email: string };
}

export const submissionsApi = {
  listByAssignment: (assignmentId: string) =>
    api<Submission[]>(`/submissions?assignmentId=${encodeURIComponent(assignmentId)}`),
  submit: (assignmentId: string, fileUrl?: string) =>
    api<Submission>('/submissions', { method: 'POST', body: JSON.stringify({ assignmentId, fileUrl }) }),
  grade: (id: string, data: { score?: number; feedback?: string; status?: string }) =>
    api<Submission>('/submissions/' + id, { method: 'PATCH', body: JSON.stringify(data) }),
};
