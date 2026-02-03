import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { LessonLibrary } from './components/LessonLibrary';
import { Homework } from './components/Homework';
import { InteractiveResources } from './components/InteractiveResources';
import { Materials } from './components/Materials';
import { Calendar } from './components/Calendar';
import { Notifications } from './components/Notifications';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';
import type { StudentCalendarEvent } from '../types/schedule';
import type { AuthUser } from '../../api/auth';

export type View =
  | 'dashboard'
  | 'lessons'
  | 'homework'
  | 'resources'
  | 'materials'
  | 'calendar'
  | 'notifications'
  | 'analytics'
  | 'settings';

interface StudentAppProps {
  onLogout?: () => void;
  /** Logged-in user from backend (for display name, etc.) */
  user?: AuthUser | null;
  /** Called when student updates their profile (email, name, phone) so parent can refresh user */
  onUserUpdate?: (user: AuthUser) => void;
  /** Events from shared schedule (teacher-added classes). When provided, student calendar uses these. */
  events?: StudentCalendarEvent[];
}

function StudentApp({ onLogout, user, onUserUpdate, events }: StudentAppProps) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [lessonLibraryCourseId, setLessonLibraryCourseId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = 'Fluency On - Student Portal';
    return () => { document.title = 'Fluency On'; };
  }, []);

  const handleNavigateToLessons = (courseId?: string) => {
    setLessonLibraryCourseId(courseId ?? null);
    setCurrentView('lessons');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigateToLessons={handleNavigateToLessons} />;
      case 'lessons':
        return <LessonLibrary initialCourseId={lessonLibraryCourseId} />;
      case 'homework':
        return <Homework />;
      case 'resources':
        return <InteractiveResources />;
      case 'materials':
        return <Materials />;
      case 'calendar':
        return <Calendar events={events} />;
      case 'notifications':
        return <Notifications />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings user={user} onProfileUpdate={onUserUpdate} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f4f1] overflow-hidden">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div key={currentView} className="main-content-enter min-h-full">
          {renderView()}
        </div>
      </main>
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px)+3.5rem)] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] w-12 h-12 sm:w-14 sm:h-14 bg-[#fbb80f] rounded-full shadow-lg flex items-center justify-center z-30 hover:bg-[#253439] active:bg-[#253439]/90 transition-colors touch-manipulation"
        aria-label="Abrir menu"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}

export default StudentApp;
