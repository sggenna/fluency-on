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

interface SidebarProps {
  currentView: StudentView;
  onViewChange: (view: StudentView) => void;
}

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
    </aside>
  );
}
