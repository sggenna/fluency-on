import {
  Home,
  BookOpen,
  ClipboardList,
  Gamepad2,
  FolderOpen,
  CalendarDays,
  Bell,
  BarChart3,
  Flame,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../../auth/AuthContext';
import type { View } from '../App';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const menuItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'lessons', label: 'Biblioteca de Lições', icon: BookOpen },
  { id: 'homework', label: 'Tarefas', icon: ClipboardList },
  { id: 'resources', label: 'Recursos Interativos', icon: Gamepad2 },
  { id: 'materials', label: 'Materiais', icon: FolderOpen },
  { id: 'calendar', label: 'Calendário', icon: CalendarDays },
  { id: 'notifications', label: 'Anúncios', icon: Bell },
  { id: 'analytics', label: 'Meu Progresso', icon: BarChart3 },
];

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '?';
  const name = user ? `${user.firstName} ${user.lastName}` : '';
  const level = user?.level || '—';

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <BookOpen />
          </div>
          <div>
            <h1>FluencyOn</h1>
            <p>Portal do Aluno</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onViewChange(item.id)}
              className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
            >
              <Icon />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="streak-section">
        <div className="streak-card">
          <div className="streak-card-header">
            <Flame />
            <span>Streak</span>
          </div>
          <p>7 dias</p>
          <p>Continue assim! 🔥</p>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-inner">
          <div className="profile-avatar">{initials}</div>
          <div>
            <p>{name}</p>
            <p>Nível {level}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[#7c898b] hover:bg-[#f6f4f1] transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
