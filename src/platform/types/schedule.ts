/** Shared class schedule (teacher source of truth). Used for teacher calendar and derived student events. */
export interface ClassSchedule {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  course: string;
  students: number;
  maxStudents: number;
  meetLink: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  isIndividual?: boolean;
  studentName?: string;
}

/** Student calendar event (derived from ClassSchedule or standalone). */
export interface StudentCalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  teacher: string;
  type: 'live' | 'recording';
  meetLink?: string;
  recordingLink?: string;
}

export const DEFAULT_SCHEDULES: ClassSchedule[] = [
  {
    id: 1,
    title: 'Aula ao Vivo: Grammar Review',
    date: '2026-01-10',
    time: '19:00',
    duration: 60,
    course: 'B1 - Intermediate',
    students: 12,
    maxStudents: 15,
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'scheduled',
  },
  {
    id: 2,
    title: 'Conversation Practice',
    date: '2026-01-12',
    time: '19:00',
    duration: 45,
    course: 'Conversation 1',
    students: 8,
    maxStudents: 10,
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    status: 'scheduled',
  },
  {
    id: 3,
    title: 'Business English Workshop',
    date: '2026-01-15',
    time: '19:00',
    duration: 90,
    course: 'Business English',
    students: 10,
    maxStudents: 12,
    meetLink: 'https://meet.google.com/123-4567-890',
    status: 'scheduled',
  },
  {
    id: 4,
    title: 'Grammar Basics',
    date: '2026-01-08',
    time: '19:00',
    duration: 60,
    course: 'A2 - Elementary',
    students: 10,
    maxStudents: 10,
    meetLink: 'https://meet.google.com/past-class-001',
    status: 'completed',
  },
];

const STORAGE_KEY = 'fluencyon_schedules';

export function loadSchedulesFromStorage(): ClassSchedule[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ClassSchedule[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveSchedulesToStorage(schedules: ClassSchedule[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  } catch {
    // ignore
  }
}
