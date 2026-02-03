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
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import type { View } from '../App';
import type { AuthUser } from '../../../api/auth';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout?: () => void;
  /** Logged-in user (for display name) */
  user?: AuthUser | null;
  isOpen?: boolean;
  onClose?: () => void;
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
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export function Sidebar({ currentView, onViewChange, onLogout, user, isOpen = true, onClose }: SidebarProps) {
  const displayName = user ? [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || user.email : 'Aluno';
  const initials = user
    ? [user.firstName, user.lastName]
        .filter(Boolean)
        .map((s) => s[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || user.email[0]?.toUpperCase() || 'A'
    : 'A';
  return (
    <aside
      className={`
        fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#b29e84]/30 flex flex-col
        transform transition-transform duration-400 ease-out
        md:sidebar-slide-in md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="p-4 lg:p-6 border-b border-[#b29e84]/30 flex-shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-[#253439] truncate">FluencyOn</h1>
              <p className="text-xs text-[#7c898b]">Portal do Aluno</p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="md:hidden w-8 h-8 flex items-center justify-center text-[#7c898b] hover:bg-[#f6f4f1] rounded-lg flex-shrink-0"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onViewChange(item.id);
                onClose?.();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left min-w-0 ${
                isActive
                  ? 'bg-[#fbb80f] text-white'
                  : 'text-[#253439] hover:bg-[#f6f4f1]'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium truncate min-w-0" title={item.label}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#b29e84]/30">
        <div className="bg-[#f6f4f1] rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[#253439]">
            <Flame className="w-4 h-4 text-[#fbb80f]" />
            <span>Streak</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-[#253439]">7 dias</p>
          <p className="text-xs text-[#7c898b]">Continue assim! 🔥</p>
        </div>
      </div>

      <div className="p-4 border-t border-[#b29e84]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#253439] to-[#7c898b] flex items-center justify-center text-white text-sm font-semibold">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#253439] truncate">{displayName}</p>
            <p className="text-xs text-[#7c898b]">Nível B1</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose?.();
            onLogout?.();
          }}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-[#7c898b] hover:bg-[#f6f4f1] hover:text-[#253439] transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
