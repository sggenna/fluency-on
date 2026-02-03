import { useState, useEffect } from 'react';
import { User, Mail, Phone, Bell, Save, Check } from 'lucide-react';

const STORAGE_KEYS = {
  emailNotifications: 'teacher_settings_email_notifications',
  platformNotifications: 'teacher_settings_platform_notifications',
  name: 'teacher_settings_name',
  phone: 'teacher_settings_phone',
};

export function Settings() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [platformNotifications, setPlatformNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem(STORAGE_KEYS.name) ?? 'Jamile Oliveira');
    setPhone(localStorage.getItem(STORAGE_KEYS.phone) ?? '');
    setEmailNotifications(localStorage.getItem(STORAGE_KEYS.emailNotifications) !== 'false');
    setPlatformNotifications(localStorage.getItem(STORAGE_KEYS.platformNotifications) !== 'false');
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEYS.name, name);
    localStorage.setItem(STORAGE_KEYS.phone, phone);
    localStorage.setItem(STORAGE_KEYS.emailNotifications, String(emailNotifications));
    localStorage.setItem(STORAGE_KEYS.platformNotifications, String(platformNotifications));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#253439] mb-2">Configurações</h1>
        <p className="text-[#7c898b]">Gerencie seu perfil e preferências</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Profile */}
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
            <div>
              <label className="block text-sm font-medium text-[#253439] mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                <input
                  type="email"
                  value="jamile@fluencyon.com"
                  readOnly
                  className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/20 rounded-lg bg-[#f6f4f1] text-[#7c898b]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-lg font-semibold text-[#253439] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#fbb80f]" />
            Notificações
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#253439]">Receber notificações por e-mail</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-[#b29e84]/30 text-[#fbb80f] focus:ring-[#fbb80f]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#253439]">Alertas na plataforma (entregas, mensagens)</span>
              <input
                type="checkbox"
                checked={platformNotifications}
                onChange={(e) => setPlatformNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-[#b29e84]/30 text-[#fbb80f] focus:ring-[#fbb80f]"
              />
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439] transition-colors"
        >
          {saved ? (
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
