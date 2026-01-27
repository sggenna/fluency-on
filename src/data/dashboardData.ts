// Dashboard data - Replace with API calls when backend is integrated
// This structure makes it easy to swap with real data later

import { Clock, CheckCircle2, Trophy, TrendingUp } from 'lucide-react';

export interface Stat {
  label: string;
  value: string;
  icon: typeof Clock;
  color: string;
}

export interface EnrolledCourse {
  id: number;
  title: string;
  progress: number;
  nextLesson: string;
  totalLessons: number;
  completedLessons: number;
  color: string;
  level: string;
}

export interface RecentLesson {
  id: number;
  title: string;
  course: string;
  duration: string;
  completed: boolean;
}

export interface UpcomingClass {
  id: number;
  title: string;
  date: string;
  time: string;
  teacher: string;
}

// TODO: Replace with API call: GET /api/student/dashboard/stats
export const getDashboardStats = (): Stat[] => [
  { label: 'Horas de Estudo', value: '42h', icon: Clock, color: 'text-[#253439] bg-[#253439]/10' },
  { label: 'Lições Completas', value: '40', icon: CheckCircle2, color: 'text-[#fbb80f] bg-[#fbb80f]/10' },
  { label: 'Conquistas', value: '12', icon: Trophy, color: 'text-[#fbee0f] bg-[#fbee0f]/10' },
  { label: 'Sequência', value: '7 dias', icon: TrendingUp, color: 'text-[#b29e84] bg-[#b29e84]/10' },
];

// TODO: Replace with API call: GET /api/student/courses
export const getEnrolledCourses = (): EnrolledCourse[] => [
  {
    id: 1,
    title: 'B1 - Intermediate',
    progress: 68,
    nextLesson: 'Module 8: Past Perfect Tense',
    totalLessons: 24,
    completedLessons: 16,
    color: 'from-[#253439] to-[#7c898b]',
    level: 'B1'
  },
  {
    id: 2,
    title: 'Business English',
    progress: 45,
    nextLesson: 'Module 4: Meetings & Presentations',
    totalLessons: 20,
    completedLessons: 9,
    color: 'from-[#b29e84] to-[#7c898b]',
    level: 'Business'
  },
  {
    id: 3,
    title: 'Conversation 1',
    progress: 82,
    nextLesson: 'Session 15: Daily Routines',
    totalLessons: 18,
    completedLessons: 15,
    color: 'from-[#fbb80f] to-[#fbee0f]',
    level: 'Conv. 1'
  }
];

// TODO: Replace with API call: GET /api/student/lessons/recent
export const getRecentLessons = (): RecentLesson[] => [
  { id: 1, title: 'Present Perfect vs Past Simple', course: 'B1 - Intermediate', duration: '24 min', completed: true },
  { id: 2, title: 'Vocabulary: Travel & Tourism', course: 'B1 - Intermediate', duration: '18 min', completed: true },
  { id: 3, title: 'Email Writing Basics', course: 'Business English', duration: '32 min', completed: false },
];

// TODO: Replace with API call: GET /api/student/classes/upcoming
export const getUpcomingClasses = (): UpcomingClass[] => [
  { id: 1, title: 'Aula ao Vivo: Grammar Review', date: '2026-01-10', time: '19:00', teacher: 'Prof. Jamile Oliveira' },
  { id: 2, title: 'Conversation Practice', date: '2026-01-12', time: '19:00', teacher: 'Prof. Jamile Oliveira' },
  { id: 3, title: 'Business English Workshop', date: '2026-01-15', time: '19:00', teacher: 'Prof. Jamile Oliveira' },
];

// TODO: Replace with API call: GET /api/student/profile
export const getStudentName = (): string => 'Ana Maria';
export const getStudentLevel = (): string => 'B1';
export const getStudentInitials = (): string => 'AM';
export const getStreakDays = (): number => 7;
