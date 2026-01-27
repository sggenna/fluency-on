import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  Gamepad2, 
  FolderOpen, 
  CalendarDays, 
  Bell, 
  BarChart3,
  Trophy,
  Flame
} from 'lucide-react';
import { getStudentName, getStudentLevel, getStudentInitials, getStreakDays } from '../data/dashboardData';

export type StudentView = 
  | 'dashboard' 
  | 'lessons' 
  | 'homework' 
  | 'resources' 
  | 'materials' 
  | 'calendar' 
  | 'notifications' 
  | 'analytics';

interface SidebarProps {
  currentView: StudentView;
  onViewChange: (view: StudentView) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  // Data from centralized data file - easy to replace with API calls
  const studentName = getStudentName();
  const studentLevel = getStudentLevel();
  const studentInitials = getStudentInitials();
  const streakDays = getStreakDays();

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
    <aside className="sidebar-container w-64 bg-white border-r border-[#b29e84]/30 flex flex-col fixed top-0 left-0 h-screen max-h-screen overflow-hidden">
      {/* Sidebar Header */}
      <div className="sidebar-header p-6 border-b border-[#b29e84]/30">
        <div className="sidebar-logo-container flex items-center gap-3">
          <div className="sidebar-logo-icon w-10 h-10 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="sidebar-logo-text">
            <h1 className="sidebar-logo-title font-bold text-[#253439]">FluencyOn</h1>
            <p className="sidebar-logo-subtitle text-xs text-[#7c898b]">Portal do Aluno</p>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation - Fixed spacing, no flex-1 */}
      <nav className="sidebar-nav p-4">
        <div className="sidebar-nav-items-container space-y-3">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`sidebar-nav-item w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#fbb80f] text-white'
                    : 'text-[#253439] hover:bg-[#f6f4f1]'
                }`}
              >
                <Icon className="sidebar-nav-item-icon w-5 h-5" />
                <span className="sidebar-nav-item-label font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section - Streak and Profile at bottom of sidebar */}
      <div className="sidebar-bottom-section mt-auto">
        {/* Streak Section */}
        <div className="sidebar-streak-section p-4 border-t border-[#b29e84]/30">
          <div className="sidebar-streak-card bg-gradient-to-br from-[#fbee0f]/20 to-[#fbb80f]/20 rounded-lg p-4 border border-[#fbb80f]/30">
            <div className="sidebar-streak-header flex items-center gap-2 mb-2">
              <Flame className="sidebar-streak-icon w-5 h-5 text-[#fbb80f]" />
              <span className="sidebar-streak-label font-semibold text-[#253439]">Streak</span>
            </div>
            <p className="sidebar-streak-value text-2xl font-bold text-[#253439] mb-1">{streakDays} dias</p>
            <p className="sidebar-streak-message text-sm text-[#7c898b]">Continue assim! 🔥</p>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="sidebar-user-section p-4 border-t border-[#b29e84]/30">
          <div className="sidebar-user-profile flex items-center gap-3">
            <div className="sidebar-user-avatar w-10 h-10 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {studentInitials}
            </div>
            <div className="sidebar-user-info flex-1">
              <p className="sidebar-user-name font-medium text-[#253439]">{studentName}</p>
              <p className="sidebar-user-level text-sm text-[#7c898b]">Nível {studentLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
