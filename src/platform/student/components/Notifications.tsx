import { useEffect, useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  Trophy,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { announcementsApi } from '../../../api/announcements';

interface Notification {
  id: string;
  type: 'announcement' | 'reminder' | 'achievement' | 'deadline';
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    announcementsApi.list()
      .then((list) => {
        setNotifications(
          list.map((a) => ({
            id: a.id,
            type: 'announcement' as const,
            title: a.title,
            message: a.content,
            date: a.createdAt,
            read: false,
            priority: 'medium' as const,
          }))
        );
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[#7c898b]">Carregando anúncios...</p>
      </div>
    );
  }

  const list = notifications.length ? notifications : [];

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
            <button className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium">
              Marcar todas como lidas
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#b29e84]/20">
          {list.map((notification) => {
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
            <button className="bg-[#fbb80f] text-white px-4 py-2 rounded-lg hover:bg-[#253439] transition-colors text-sm">
              Gerenciar Preferências
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}