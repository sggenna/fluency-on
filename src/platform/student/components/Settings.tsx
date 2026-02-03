import { useState, useEffect } from 'react';
import { User, Mail, Phone, Bell, Save, Check, Loader2 } from 'lucide-react';
import { getMe, updateMe, type AuthUser } from '../../../api/auth';

const STORAGE_KEYS = {
  emailNotifications: 'student_settings_email_notifications',
  platformNotifications: 'student_settings_platform_notifications',
};

interface SettingsProps {
  user?: AuthUser | null;
  onProfileUpdate?: (user: AuthUser) => void;
}

function parseName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = (fullName || '').trim();
  if (!trimmed) return { firstName: '', lastName: '' };
  const space = trimmed.indexOf(' ');
  if (space === -1) return { firstName: trimmed, lastName: '' };
  return {
    firstName: trimmed.slice(0, space).trim(),
    lastName: trimmed.slice(space).trim(),
  };
}

export function Settings({ user: initialUser, onProfileUpdate }: SettingsProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [platformNotifications, setPlatformNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    getMe()
      .then((u) => {
        if (cancelled || !u) return;
        const fullName = [u.firstName, u.lastName].filter(Boolean).join(' ').trim();
        setName(fullName || '');
        setEmail(u.email || '');
        setPhone((u.profile as { phone?: string })?.phone ?? '');
      })
      .catch(() => {
        if (!cancelled) setError('Não foi possível carregar o perfil.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (initialUser && !name && !email) {
      const fullName = [initialUser.firstName, initialUser.lastName].filter(Boolean).join(' ').trim();
      setName(fullName || '');
      setEmail(initialUser.email || '');
    }
  }, [initialUser]);

  useEffect(() => {
    setEmailNotifications(localStorage.getItem(STORAGE_KEYS.emailNotifications) !== 'false');
    setPlatformNotifications(localStorage.getItem(STORAGE_KEYS.platformNotifications) !== 'false');
  }, []);

  const handleSave = async () => {
    setError('');
    setSaving(true);
    const emailTrimmed = email.trim().toLowerCase();
    const nameTrimmed = name.trim();
    const emailChanged = initialUser && emailTrimmed !== initialUser.email.trim().toLowerCase();

    if (emailChanged && !currentPassword) {
      setError('Informe sua senha atual para alterar o e-mail.');
      setSaving(false);
      return;
    }

    try {
      const { firstName, lastName } = parseName(nameTrimmed);
      const res = await updateMe({
        firstName: firstName || nameTrimmed,
        lastName,
        phone: phone.trim() || undefined,
        ...(emailTrimmed && { email: emailTrimmed }),
        ...(emailChanged && currentPassword && { currentPassword }),
      });

      localStorage.setItem(STORAGE_KEYS.name, nameTrimmed);
      localStorage.setItem(STORAGE_KEYS.phone, phone);
      localStorage.setItem(STORAGE_KEYS.emailNotifications, String(emailNotifications));
      localStorage.setItem(STORAGE_KEYS.platformNotifications, String(platformNotifications));

      onProfileUpdate?.(res.user);
      setCurrentPassword('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 text-[#fbb80f] animate-spin" />
      </div>
    );
  }

  const emailChanged = initialUser && email.trim().toLowerCase() !== initialUser.email.trim().toLowerCase();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#253439] mb-2">Configurações</h1>
        <p className="text-[#7c898b]">Gerencie seu perfil e preferências</p>
      </div>

      <div className="max-w-2xl space-y-8">
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-lg font-semibold text-[#253439] mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#fbb80f]" />
            Perfil
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#253439] mb-2">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  placeholder="Seu nome"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#253439] mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  placeholder="seu@email.com"
                />
              </div>
              {emailChanged && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-[#253439] mb-1">Senha atual (obrigatória para alterar e-mail)</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#253439] mb-2">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  placeholder="(11) 98765-4321"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-lg font-semibold text-[#253439] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#fbb80f]" />
            Notificações
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#253439]">Receber novos anúncios por e-mail</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-[#b29e84]/30 text-[#fbb80f] focus:ring-[#fbb80f]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#253439]">Mostrar notificações na plataforma</span>
              <input
                type="checkbox"
                checked={platformNotifications}
                onChange={(e) => setPlatformNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-[#b29e84]/30 text-[#fbb80f] focus:ring-[#fbb80f]"
              />
            </label>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439] transition-colors disabled:opacity-70"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : saved ? (
            <>
              <Check className="w-5 h-5" />
              Salvo!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Salvar alterações
            </>
          )}
        </button>
      </div>
    </div>
  );
}
