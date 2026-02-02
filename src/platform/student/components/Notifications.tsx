import { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  Trophy,
  AlertCircle,
  Info,
  X,
  Settings
} from 'lucide-react';

const PREF_STORAGE_KEY = 'fluencyon_notification_prefs';

interface Notification {
  id: number;
  type: 'announcement' | 'reminder' | 'achievement' | 'deadline';
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority?: 'high' | 'medium' | 'low';
}

interface NotificationPrefs {
  emailNewAnnouncements: boolean;
  showInPlatform: boolean;
}

function loadPrefs(): NotificationPrefs {
  try {
    const s = localStorage.getItem(PREF_STORAGE_KEY);
    if (s) return JSON.parse(s) as NotificationPrefs;
  } catch (_) {}
  return { emailNewAnnouncements: true, showInPlatform: true };
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'announcement',
      title: 'Nova Lição Disponível',
      message: 'A lição "Conditional Sentences" foi adicionada ao Module 4 do B1 - Intermediate. Clique para começar!',
      date: '2026-01-09T10:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Aula ao Vivo Amanhã',
      message: 'Não esqueça da aula de Grammar Review amanhã às 19:00 com a Prof. Jamile. Link do Google Meet já está disponível.',
      date: '2026-01-09T09:00:00',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Prazo de Entrega Próximo',
      message: 'Sua tarefa "Essay: My Daily Routine" do Student\'s Homework vence em 3 dias. Não deixe para a última hora!',
      date: '2026-01-09T08:00:00',
      read: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Nova Conquista Desbloqueada! 🏆',
      message: 'Parabéns! Você alcançou um streak de 7 dias. Continue assim!',
      date: '2026-01-08T18:00:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'announcement',
      title: 'Feedback da Professora',
      message: 'A Prof. Jamile Oliveira comentou sua tarefa "Reading Comprehension". Nota: 9.5/10. Excelente trabalho!',
      date: '2026-01-08T15:30:00',
      read: true,
      priority: 'high'
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Estudo Diário',
      message: 'Você ainda não completou sua meta de estudo de hoje. Que tal praticar com a Apostila de Games por 15 minutos?',
      date: '2026-01-08T14:00:00',
      read: true,
      priority: 'low'
    },
    {
      id: 7,
      type: 'announcement',
      title: 'Novos Materiais Disponíveis',
      message: 'Foram adicionados novos Slides das Aulas e áudios de pronúncia na biblioteca. Aproveite!',
      date: '2026-01-07T11:00:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 8,
      type: 'reminder',
      title: 'Quiz Disponível',
      message: 'O quiz "Phrasal Verbs Challenge" está disponível. Teste seus conhecimentos!',
      date: '2026-01-07T09:00:00',
      read: true,
      priority: 'low'
    },
  ]);
  const [showPrefsModal, setShowPrefsModal] = useState(false);
  const [prefs, setPrefs] = useState<NotificationPrefs>(() => loadPrefs());

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const savePrefs = (next: Partial<NotificationPrefs>) => {
    const updated = { ...prefs, ...next };
    setPrefs(updated);
    try {
      localStorage.setItem(PREF_STORAGE_KEY, JSON.stringify(updated));
    } catch (_) {}
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return { icon: MessageSquare, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' };
      case 'reminder':
        return { icon: Bell, color: 'bg-[#b29e84]/20 text-[#b29e84]' };
      case 'achievement':
        return { icon: Trophy, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' };
      case 'deadline':
        return { icon: AlertCircle, color: 'bg-[#253439]/10 text-[#253439]' };
      default:
        return { icon: Info, color: 'bg-[#7c898b]/10 text-[#7c898b]' };
    }
  };

  const getNotificationBorder = (priority?: string, read?: boolean) => {
    if (read) return 'border-[#b29e84]/20';
    switch (priority) {
      case 'high':
        return 'border-[#fbb80f]/30 bg-[#fbb80f]/5';
      case 'medium':
        return 'border-[#b29e84]/30 bg-[#b29e84]/5';
      default:
        return 'border-[#253439]/20 bg-[#253439]/5';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `Há ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Há ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Anúncios e Notificações</h1>
            <p className="text-[#7c898b]">Fique por dentro de todas as novidades e lembretes</p>
          </div>
          {unreadCount > 0 && (
            <div className="bg-[#fbb80f] text-white px-4 py-2 rounded-full flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span className="font-semibold">{unreadCount} nova{unreadCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c898b] mb-1">Não Lidas</p>
              <p className="text-3xl font-bold text-[#fbb80f]">{unreadCount}</p>
            </div>
            <div className="w-12 h-12 bg-[#fbb80f]/10 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-[#fbb80f]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c898b] mb-1">Anúncios</p>
              <p className="text-3xl font-bold text-[#253439]">
                {notifications.filter(n => n.type === 'announcement').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#253439]/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#253439]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c898b] mb-1">Lembretes</p>
              <p className="text-3xl font-bold text-[#b29e84]">
                {notifications.filter(n => n.type === 'reminder').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#b29e84]/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#b29e84]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c898b] mb-1">Conquistas</p>
              <p className="text-3xl font-bold text-[#fbee0f]">
                {notifications.filter(n => n.type === 'achievement').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#fbee0f]/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#fbee0f]" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden">
        <div className="p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#253439]">Todas as Notificações</h2>
            <button
              onClick={markAllAsRead}
              className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium"
            >
              Marcar todas como lidas
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#b29e84]/20">
          {notifications.map((notification) => {
            const { icon: Icon, color } = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-6 hover:bg-[#f6f4f1] transition-colors cursor-pointer border-l-4 ${getNotificationBorder(notification.priority, notification.read)}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className={`font-semibold ${notification.read ? 'text-[#7c898b]' : 'text-[#253439]'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#fbb80f] rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${notification.read ? 'text-[#7c898b]' : 'text-[#253439]'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-[#b29e84]">{formatDate(notification.date)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mt-6 bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 border border-[#fbb80f]/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#fbb80f]/20 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6 text-[#fbb80f]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#253439] mb-2">Preferências de Notificação</h3>
            <p className="text-sm text-[#7c898b] mb-4">
              Personalize como e quando você deseja receber notificações
            </p>
            <button
              onClick={() => setShowPrefsModal(true)}
              className="bg-[#fbb80f] text-white px-4 py-2 rounded-lg hover:bg-[#253439] transition-colors text-sm flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Gerenciar Preferências
            </button>
          </div>
        </div>
      </div>

      {/* Preferências modal */}
      {showPrefsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPrefsModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#253439]">Preferências de Notificação</h2>
              <button type="button" onClick={() => setShowPrefsModal(false)} className="p-2 rounded-lg hover:bg-[#f6f4f1] text-[#7c898b]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-[#253439]">Receber novos anúncios por e-mail</span>
                <input
                  type="checkbox"
                  checked={prefs.emailNewAnnouncements}
                  onChange={(e) => savePrefs({ emailNewAnnouncements: e.target.checked })}
                  className="w-5 h-5 rounded border-[#b29e84]/30 text-[#fbb80f] focus:ring-[#fbb80f]"
                />
              </label>
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-[#253439]">Mostrar notificações na plataforma</span>
                <input
                  type="checkbox"
                  checked={prefs.showInPlatform}
                  onChange={(e) => savePrefs({ showInPlatform: e.target.checked })}
                  className="w-5 h-5 rounded border-[#b29e84]/30 text-[#fbb80f] focus:ring-[#fbb80f]"
                />
              </label>
            </div>
            <p className="text-xs text-[#7c898b] mt-4">Suas preferências são salvas automaticamente.</p>
            <button
              type="button"
              onClick={() => setShowPrefsModal(false)}
              className="w-full mt-6 py-2.5 rounded-lg bg-[#253439] text-white font-medium hover:bg-[#fbb80f]"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}