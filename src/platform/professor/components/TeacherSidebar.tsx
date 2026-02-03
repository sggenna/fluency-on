import { 
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  FolderOpen,
  TrendingUp,
  ClipboardCheck,
  Megaphone,
  Calendar,
  GraduationCap,
  LogOut,
  Settings,
  X
} from 'lucide-react';
import { TeacherView } from '../App';
import type { AuthUser } from '../../../api/auth';

interface TeacherSidebarProps {
  currentView: TeacherView;
  onViewChange: (view: TeacherView) => void;
  onLogout?: () => void;
  /** Logged-in user (for display name) */
  user?: AuthUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherSidebar({ currentView, onViewChange, onLogout, user, isOpen, onClose }: TeacherSidebarProps) {
  const displayName = user ? `${user.firstName} ${user.lastName}` : 'Jamile Oliveira';
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'JO';
  const menuItems = [
    { id: 'dashboard' as TeacherView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students' as TeacherView, label: 'Alunos', icon: Users },
    { id: 'courses' as TeacherView, label: 'Cursos', icon: BookOpen },
    { id: 'lessons' as TeacherView, label: 'Lições', icon: Video },
    { id: 'materials' as TeacherView, label: 'Materiais', icon: FolderOpen },
    { id: 'assignments' as TeacherView, label: 'Tarefas', icon: ClipboardCheck },
    { id: 'progress' as TeacherView, label: 'Progresso', icon: TrendingUp },
    { id: 'schedule' as TeacherView, label: 'Calendário', icon: Calendar },
    { id: 'announcements' as TeacherView, label: 'Anúncios', icon: Megaphone },
    { id: 'settings' as TeacherView, label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className={`
      fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#b29e84]/30 flex flex-col
      transform transition-transform duration-400 ease-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-4 lg:p-6 border-b border-[#b29e84]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-[#253439]">FluencyOn</h1>
              <p className="text-xs text-[#7c898b]">Portal do Professor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 flex items-center justify-center text-[#7c898b] hover:bg-[#f6f4f1] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#fbb80f] text-white'
                  : 'text-[#253439] hover:bg-[#f6f4f1]'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#b29e84]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[#253439] truncate">{displayName}</p>
            <p className="text-sm text-[#7c898b]">Professora</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            onLogout?.();
          }}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-[#7c898b] hover:bg-[#f6f4f1] transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}