<<<<<<< HEAD
import React from 'react';
import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  Gamepad2, 
  FolderOpen, 
  CalendarDays, 
  Bell, 
  BarChart3
} from 'lucide-react';
import { getStudentName, getStudentLevel, getStudentInitials } from '../data/dashboardData';

export type StudentView = 
  | 'dashboard' 
  | 'lessons' 
  | 'homework' 
  | 'resources' 
  | 'materials' 
  | 'calendar' 
  | 'notifications' 
  | 'analytics';
=======
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  FolderOpen, 
  Calendar, 
  Bell, 
  BarChart3 
} from 'lucide-react';
import { StudentView } from '../student/StudentApp';
>>>>>>> 03436260565eca764d8abd62b60220c6f434c003

interface SidebarProps {
  currentView: StudentView;
  onViewChange: (view: StudentView) => void;
}

<<<<<<< HEAD
export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  // Data from centralized data file - easy to replace with API calls
  const studentName = getStudentName();
  const studentLevel = getStudentLevel();
  const studentInitials = getStudentInitials();

  const sidebarNavItems = [
    { id: 'dashboard' as StudentView, label: 'Dashboard', icon: Home },
    { id: 'lessons' as StudentView, label: 'Biblioteca de Lições', icon: BookOpen },
    { id: 'homework' as StudentView, label: 'Tarefas', icon: ClipboardList },
    { id: 'resources' as StudentView, label: 'Recursos Interativos', icon: Gamepad2 },
    { id: 'materials' as StudentView, label: 'Materiais', icon: FolderOpen },
    { id: 'calendar' as StudentView, label: 'Calendário', icon: CalendarDays },
    { id: 'notifications' as StudentView, label: 'Anúncios', icon: Bell },
    { id: 'analytics' as StudentView, label: 'Meu Progresso', icon: BarChart3 },
  ];

  return (
    <aside
      className="sidebar-container flex flex-col w-64 min-w-[16rem] border-r border-[#b29e84]/25"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: '#F9FAFB',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar Header - generous padding */}
      <div className="sidebar-header px-6 py-6 border-b border-[#b29e84]/25">
        <div className="sidebar-logo-container flex items-center gap-3">
          <div className="sidebar-logo-icon w-10 h-10 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="sidebar-logo-text min-w-0">
            <h1 className="sidebar-logo-title font-bold text-[#253439] text-base">FluencyOn</h1>
            <p className="sidebar-logo-subtitle text-xs text-[#7c898b]">Portal do Aluno</p>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation - 16px horizontal, 12px vertical padding, gap between items */}
      <nav className="sidebar-nav px-4 py-6">
        <div className="sidebar-nav-items-container flex flex-col gap-2">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                type="button"
                className={`sidebar-nav-item w-full flex items-center gap-3 rounded-lg text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#FDB022]/50 ${
                  isActive ? 'shadow-sm' : 'text-[#253439] hover:bg-[#e8e4df] active:bg-[#ddd8d2]'
                }`}
                style={{
                  padding: '12px 16px',
                  ...(isActive ? { backgroundColor: '#FDB022', color: '#1f2937' } : {}),
                }}
              >
                <Icon className="sidebar-nav-item-icon w-5 h-5 flex-shrink-0" aria-hidden />
                <span className="sidebar-nav-item-label font-medium text-sm truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer so bottom section sits at bottom of viewport */}
      <div className="sidebar-spacer flex-1 min-h-0" aria-hidden />

      {/* Bottom Section - User profile */}
      <div className="sidebar-bottom-section flex-shrink-0 border-t border-[#b29e84]/25">
        <div className="sidebar-user-section px-5 py-4">
          <div className="sidebar-user-profile flex items-center gap-3">
            <div
              className="sidebar-user-avatar w-10 h-10 rounded-full flex items-center justify-center text-[#253439] font-semibold text-sm flex-shrink-0"
              style={{ backgroundColor: '#FDB022', color: '#253439' }}
            >
              {studentInitials}
            </div>
            <div className="sidebar-user-info min-w-0 flex-1">
              <p className="sidebar-user-name font-medium text-[#253439] text-sm truncate">{studentName}</p>
              <p className="sidebar-user-level text-xs text-[#6b7280]">Nível {studentLevel}</p>
            </div>
          </div>
        </div>
      </div>
=======
const sidebarNavItems = [
  { id: 'dashboard' as StudentView, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'lessons' as StudentView, label: 'Lições', icon: BookOpen },
  { id: 'homework' as StudentView, label: 'Tarefas', icon: FileText },
  { id: 'resources' as StudentView, label: 'Recursos', icon: Gamepad2 },
  { id: 'materials' as StudentView, label: 'Materiais', icon: FolderOpen },
  { id: 'calendar' as StudentView, label: 'Calendário', icon: Calendar },
  { id: 'notifications' as StudentView, label: 'Notificações', icon: Bell },
  { id: 'analytics' as StudentView, label: 'Analytics', icon: BarChart3 },
];

// Placeholder Sidebar - will be enhanced in sidebar feature
export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="sidebar-container w-64 bg-card border-r border-border flex flex-col">
      <div className="sidebar-header p-6 border-b border-border">
        <h2 className="sidebar-header-title text-xl font-bold text-card-foreground">
          FluencyOn
        </h2>
        <p className="sidebar-header-subtitle text-sm text-muted-foreground">
          Portal do Aluno
        </p>
      </div>
      
      <nav className="sidebar-nav flex-1 p-4">
        <ul className="sidebar-nav-list space-y-2">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`sidebar-nav-item w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="sidebar-nav-item-icon w-5 h-5" />
                  <span className="sidebar-nav-item-label font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
>>>>>>> 03436260565eca764d8abd62b60220c6f434c003
    </aside>
  );
}
