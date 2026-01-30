import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LessonLibrary } from './components/LessonLibrary';
import { Homework } from './components/Homework';
import { InteractiveResources } from './components/InteractiveResources';
import { Materials } from './components/Materials';
import { Calendar } from './components/Calendar';
import { Notifications } from './components/Notifications';
import { Analytics } from './components/Analytics';
import { Sidebar } from './components/Sidebar';

export type View =
  | 'dashboard'
  | 'lessons'
  | 'homework'
  | 'resources'
  | 'materials'
  | 'calendar'
  | 'notifications'
  | 'analytics';

function StudentApp() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'lessons':
        return <LessonLibrary />;
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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="portal-layout">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="portal-main">{renderView()}</main>
    </div>
  );
}

export default StudentApp;
