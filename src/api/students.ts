/**
 * API for teacher-only student creation (sends setup email).
 */
import { apiRequest, getApiBase, getToken } from './client';

export interface CreateStudentConflictError {
  message: string;
  code: string;
  existingStudentId: string;
}

export interface StudentListItem {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  level: string;
  cpf?: string;
  rg?: string;
  dateOfBirth?: string;
  profession?: string;
  notes?: string;
  enrollmentDate: string;
  courses: string[];
  status: 'active';
  progress: number;
}

export interface ListStudentsResponse {
  students: StudentListItem[];
}

export async function listStudents(): Promise<ListStudentsResponse> {
  return apiRequest<ListStudentsResponse>('GET', '/api/students');
}

export interface CreateStudentPayload {
  name: string;
  email: string;
  phone: string;
  level: string;
  courses?: string[];
  cpf?: string;
  rg?: string;
  birthDate?: string;
  profession?: string;
  notes?: string;
  contractUrl?: string;
}

export interface CreateStudentResponse {
  success: boolean;
  student: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: {
      level: string | null;
      phone: string | null;
      cpf: string | null;
      rg: string | null;
      dateOfBirth: string | null;
      profession: string | null;
    } | null;
  };
  setupLink: string;
  emailSent: boolean;
}

export async function createStudent(payload: CreateStudentPayload): Promise<CreateStudentResponse> {
  const url = `${getApiBase()}/api/students`;
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 409 && data.code === 'EMAIL_TAKEN' && data.existingStudentId) {
    const err = new Error(data.error ?? data.message ?? 'E-mail já em uso') as Error & CreateStudentConflictError;
    err.code = data.code;
    err.existingStudentId = data.existingStudentId;
    throw err;
  }
  if (!res.ok) {
    const msg = data.error ?? data.message ?? `HTTP ${res.status}`;
    throw new Error(typeof msg === 'string' ? msg : 'Request failed');
  }
  return data as CreateStudentResponse;
}

export interface ResendSetupResponse {
  success: boolean;
  setupLink: string;
  emailSent: boolean;
}

export async function resendSetupEmail(studentId: string): Promise<ResendSetupResponse> {
  return apiRequest<ResendSetupResponse>('POST', `/api/students/${encodeURIComponent(studentId)}/resend-setup`);
}

export interface UpdateStudentPayload {
  name?: string;
  phone?: string;
  level?: string;
  cpf?: string;
  rg?: string;
  birthDate?: string;
  profession?: string;
  notes?: string;
  contractUrl?: string;
}

export interface UpdateStudentResponse {
  success: boolean;
  student: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: {
      level: string | null;
      phone: string | null;
      cpf: string | null;
      rg: string | null;
      dateOfBirth: string | null;
      profession: string | null;
      notes: string | null;
    } | null;
  };
}

export async function updateStudent(id: string, payload: UpdateStudentPayload): Promise<UpdateStudentResponse> {
  return apiRequest<UpdateStudentResponse>('PATCH', `/api/students/${encodeURIComponent(id)}`, payload);
}
