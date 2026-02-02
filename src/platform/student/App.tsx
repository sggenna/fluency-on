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
}

function StudentApp({ onLogout }: StudentAppProps) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [lessonLibraryCourseId, setLessonLibraryCourseId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Fluency On - Student Portal';
    return () => { document.title = 'FluencyOn'; };
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
        return <Calendar />;
      case 'notifications':
        return <Notifications />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f4f1] overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={onLogout} />
      <main className="flex-1 min-w-0 overflow-y-auto">{renderView()}</main>
    </div>
  );
}

export default StudentApp;
