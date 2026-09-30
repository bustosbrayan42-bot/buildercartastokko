import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { signInAdminWithPassword, sendAdminMagicLink, type AdminUser } from '../services/adminAuthService';

interface AdminLoginGateProps {
  onLoginSuccess: (admin: AdminUser) => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'password' | 'magic_link'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (authMode === 'password') {
        if (!password) {
          setErrorMessage('Por favor ingresa tu contraseña.');
          setIsLoading(false);
          return;
        }

        const res = await signInAdminWithPassword(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'No se pudo iniciar sesión.');
        } else if (res.user) {
          onLoginSuccess(res.user);
        }
      } else {
        const res = await sendAdminMagicLink(email);
        if (!res.success) {
          setErrorMessage(res.error || 'Error al enviar enlace mágico.');
        } else {
          setSuccessMessage(`¡Enlace enviado a ${email}! Revisa tu bandeja de entrada o spam para acceder.`);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error inesperado al intentar acceder.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-pink-500 selection:text-white relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-amber-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20 mb-3 border border-pink-400/40">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
            TOKKII <span className="text-amber-400">BUILDER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Acceso restringido únicamente a administradores autorizados
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-950/80 p-1 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'password'
                ? 'bg-slate-800 text-amber-400 shadow border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Contraseña</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('magic_link');
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'magic_link'
                ? 'bg-slate-800 text-amber-400 shadow border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Enlace Mágico</span>
          </button>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-4 bg-red-950/70 border border-red-500/50 text-red-200 text-xs p-3 rounded-2xl flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs p-3 rounded-2xl flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ejemplo.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-mono"
              />
            </div>
          </div>

          {authMode === 'password' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:from-amber-400 hover:via-pink-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Verificando autorización...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{authMode === 'password' ? 'Ingresar al Builder' : 'Enviar Enlace de Acceso'}</span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            🛡️ Los permisos de acceso se gestionan en la tabla <span className="font-mono text-amber-400/90">authorized_admins</span> de Supabase.
          </p>
        </div>
      </div>
    </div>
  );
};
