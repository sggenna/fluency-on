import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Eye, EyeOff } from "lucide-react";

// Social Icons as SVG components
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DA1F2">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

export function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual authentication
    console.log("Login attempt:", { email, password });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Navigate to student dashboard on success
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f6f4f1] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 border-2 border-[#fbb80f]/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-72 h-72 border-2 border-[#b29e84]/20 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 border-2 border-[#fbb80f]/10 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 border-2 border-[#b29e84]/15 rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10"
      >
        {/* Left Section - Login Form */}
        <Card className="border-2 border-[#b29e84]/30 shadow-2xl bg-white">
          <CardHeader className="space-y-4 pb-6">
            <CardTitle className="text-4xl font-bold text-[#253439]">
              Espaço do Aluno
            </CardTitle>
            <CardDescription className="text-lg text-[#7c898b]">
              Acesse sua área de estudos e continue aprendendo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Social Login Options */}
            <div className="flex gap-4 mb-6">
              <button className="flex-1 p-3 rounded-lg hover:bg-[#fbb80f]/10 transition-colors flex items-center justify-center">
                <GoogleIcon />
              </button>
              <button className="flex-1 p-3 rounded-lg hover:bg-[#fbb80f]/10 transition-colors flex items-center justify-center">
                <FacebookIcon />
              </button>
              <button className="flex-1 p-3 rounded-lg hover:bg-[#fbb80f]/10 transition-colors flex items-center justify-center">
                <TwitterIcon />
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#b29e84]/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#7c898b]">ou use seu email para entrar</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#253439] font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-[#b29e84]/30 focus:border-[#fbb80f] focus:ring-[#fbb80f]/50 h-12"
                />
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="password" className="text-[#253439] font-semibold">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 bg-white border-[#b29e84]/30 focus:border-[#fbb80f] focus:ring-[#fbb80f]/50 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7c898b] hover:text-[#253439] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#fbb80f] border-[#b29e84]/30 rounded focus:ring-[#fbb80f]"
                  />
                  <span className="text-sm text-[#7c898b]">Lembrar-me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-[#fbb80f] hover:text-[#253439] font-medium transition-colors"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ backgroundColor: '#fbb80f', color: '#ffffff' }}
                  className="w-full hover:bg-[#253439] py-4 text-base font-semibold transition-all duration-500 hover:shadow-xl disabled:opacity-50 rounded-md"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-[#7c898b]">
                Acesso exclusivo para alunos matriculados
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Section - Simple Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center space-y-8 p-12 bg-white/50 backdrop-blur-sm rounded-lg border-2 border-[#b29e84]/20"
        >
          <div className="text-center space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-[#253439]"
            >
              Sua Jornada de Aprendizado
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-[#7c898b] max-w-sm"
            >
              Acesse suas aulas, acompanhe seu progresso e alcance a fluência em inglês
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to landing page link - Bottom of page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto mb-8 z-10"
      >
        <a
          href="/"
          className="text-sm text-[#7c898b] hover:text-[#253439] transition-colors inline-flex items-center gap-2"
        >
          ← Voltar para a página inicial
        </a>
      </motion.div>
    </div>
  );
}
