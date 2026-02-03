import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BookOpen, Lock, User, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { validateSetupToken, completeSetup } from '../api/setup';

export function SetupProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(!!token);
  const [validToken, setValidToken] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!token) {
      setValidating(false);
      return;
    }
    let cancelled = false;
    validateSetupToken(token)
      .then((data) => {
        if (cancelled) return;
        setEmail(data.email || '');
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setValidToken(true);
      })
      .catch(() => {
        if (cancelled) return;
        setValidToken(false);
      })
      .finally(() => {
        if (!cancelled) setValidating(false);
      });
    return () => { cancelled = true; };
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) {
      setError('Link inválido ou expirado. Peça um novo link ao seu professor.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await completeSetup({
        token,
        password,
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        phone: phone.trim() || undefined,
      });
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao ativar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Loader2 className="w-10 h-10 text-[#fbb80f] animate-spin mx-auto mb-4" />
          <p className="text-[#7c898b] text-sm">Validando link…</p>
        </div>
      </div>
    );
  }

  if ((!token || !validToken) && !submitted) {
    return (
      <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#fbb80f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#fbb80f]" />
          </div>
          <h1 className="text-xl font-semibold text-[#253439] mb-2">Link inválido</h1>
          <p className="text-[#7c898b] text-sm">
            Este link de ativação não é válido ou expirou. Peça ao seu professor para reenviar o e-mail de acesso.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#fbb80f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#fbb80f]" />
          </div>
          <h1 className="text-xl font-semibold text-[#253439] mb-2">Perfil ativado!</h1>
          <p className="text-[#7c898b] text-sm mb-6">
            Sua conta foi configurada. Agora você pode fazer login na plataforma com seu e-mail e senha.
          </p>
          <a
            href="/app"
            className="inline-block w-full py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439] transition-colors"
          >
            Ir para o login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#253439]">FluencyOn</h1>
            <p className="text-sm text-[#7c898b]">Complete seu cadastro</p>
          </div>
        </div>

        <p className="text-sm text-[#7c898b] mb-6">
          Você foi adicionado(a) como aluno. Crie sua senha e preencha seus dados para acessar a plataforma.
        </p>
        {email && (
          <p className="text-sm font-medium text-[#253439] mb-4">
            E-mail da conta: <span className="text-[#7c898b]">{email}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#253439] mb-1">Senha *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#253439] mb-1">Confirmar senha *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#253439] mb-1">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nome"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#253439] mb-1">Sobrenome</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sobrenome"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#253439] mb-1">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439] transition-colors disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {loading ? 'Ativando…' : 'Ativar minha conta'}
          </button>
        </form>
      </div>
    </div>
  );
}
