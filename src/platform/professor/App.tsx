import { useState } from 'react';
import { TeacherSidebar } from './components/TeacherSidebar';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentManagement } from './components/StudentManagement';
import { CourseManagement } from './components/CourseManagement';
import { LessonManagement } from './components/LessonManagement';
import { MaterialManagement } from './components/MaterialManagement';
import { ProgressTracking } from './components/ProgressTracking';
import { AssignmentManagement } from './components/AssignmentManagement';
import { AnnouncementManagement } from './components/AnnouncementManagement';
import { ScheduleManagement } from './components/ScheduleManagement';
import { Settings } from './components/Settings';

export type TeacherView = 
  | 'dashboard'
  | 'students'
  | 'courses'
  | 'lessons'
  | 'materials'
  | 'progress'
  | 'assignments'
  | 'announcements'
  | 'schedule'
  | 'settings';

interface TeacherAppProps {
  onLogout?: () => void;
}

export default function App({ onLogout }: TeacherAppProps) {
  const [currentView, setCurrentView] = useState<TeacherView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <TeacherDashboard onNavigate={(view) => setCurrentView(view as TeacherView)} />;
      case 'students':
        return <StudentManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'lessons':
        return <LessonManagement />;
      case 'materials':
        return <MaterialManagement />;
      case 'progress':
        return <ProgressTracking />;
      case 'assignments':
        return <AssignmentManagement />;
      case 'announcements':
        return <AnnouncementManagement />;
      case 'schedule':
        return <ScheduleManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <TeacherDashboard onNavigate={(view) => setCurrentView(view as TeacherView)} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f4f1] overflow-hidden">
      <TeacherSidebar 
        currentView={currentView} 
        onViewChange={(view) => {
          setCurrentView(view);
          setSidebarOpen(false);
        }}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#fbb80f] rounded-full shadow-lg flex items-center justify-center z-30 hover:bg-[#253439] transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}