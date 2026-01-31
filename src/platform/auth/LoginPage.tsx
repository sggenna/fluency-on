import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, User } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

type Role = 'student' | 'professor';

interface LoginPageProps {
  role: Role;
  onBack: () => void;
}

export function LoginPage({ role, onBack }: LoginPageProps) {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email.trim(), password, role === 'student' ? 'STUDENT' : 'TEACHER');
  };

  const isStudent = role === 'student';
  const title = isStudent ? 'Portal do Aluno' : 'Portal do Professor';
  const subtitle = isStudent
    ? 'Entre para acessar suas aulas, materiais e progresso'
    : 'Entre para gerenciar alunos, cursos e lições';

  return (
    <div className="selector-page">
      <div className="selector-container" style={{ maxWidth: '28rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#7c898b] hover:text-[#253439] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <div className="selector-header">
          <div
            className="selector-logo"
            style={{
              background: isStudent
                ? 'linear-gradient(to bottom right, #fbb80f, #fbee0f)'
                : 'linear-gradient(to bottom right, #253439, #7c898b)',
            }}
          >
            {isStudent ? <User className="w-8 h-8 text-white" /> : <GraduationCap className="w-8 h-8 text-white" />}
          </div>
          <h1 className="selector-title">{title}</h1>
          <p className="selector-subtitle">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border-2 border-[#b29e84]/20 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#253439] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl border border-[#b29e84]/30 focus:border-[#fbb80f] focus:ring-2 focus:ring-[#fbb80f]/20 outline-none transition"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#253439] mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl border border-[#b29e84]/30 focus:border-[#fbb80f] focus:ring-2 focus:ring-[#fbb80f]/20 outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-[#253439] hover:bg-[#1a282c] disabled:opacity-60 transition"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
