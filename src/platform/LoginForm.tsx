import { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { AuthUser } from '../api/auth';

interface LoginFormProps {
  platformLabel: string;
  onSuccess: (user: AuthUser) => void;
  onBack: () => void;
  /** Error from parent (e.g. wrong role) */
  error?: string | null;
}

export function LoginForm({ platformLabel, onSuccess, onBack, error: parentError }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const displayError = parentError ?? error;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('Preencha email e senha.');
      return;
    }
    setLoading(true);
    try {
      const { login } = await import('../api/auth');
      const { user } = await login(email.trim(), password);
      onSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="platform-portal-enter min-h-screen bg-gradient-to-br from-[#f6f4f1] via-[#f6f4f1] to-[#b29e84]/20 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#7c898b] hover:text-[#253439] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#b29e84]/20 shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold text-[#253439] mb-1">
            Entrar no {platformLabel}
          </h1>
          <p className="text-sm text-[#7c898b] mb-6">
            Use seu email e senha para acessar a plataforma.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {displayError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {displayError}
              </div>
            )}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[#253439] mb-1">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbb80f] focus:border-transparent text-[#253439]"
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-[#253439] mb-1">
                Senha
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbb80f] focus:border-transparent text-[#253439]"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <div className="pt-4 pb-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#fbb80f] text-[#253439] font-semibold hover:bg-[#e5a80d] active:bg-[#d0970c] border-2 border-[#253439] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 min-h-[48px] text-base shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
