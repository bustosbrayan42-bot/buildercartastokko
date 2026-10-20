import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Package,
  RotateCcw,
  ExternalLink,
  Gift,
  Send,
  ShieldCheck,
  LogOut,
  Ticket,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export type BuilderViewMode = 'card_builder' | 'pack_builder' | 'pack_management' | 'gift_cards' | 'gift_codes';

interface HeaderProps {
  currentView: BuilderViewMode;
  onViewChange: (view: BuilderViewMode) => void;
  onResetDefaults: () => void;
  cardCount: number;
  adminEmail?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onResetDefaults,
  cardCount,
  adminEmail,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getCurrentViewLabel = () => {
    switch (currentView) {
      case 'card_builder': return 'Cartas';
      case 'pack_builder': return 'Sobres';
      case 'pack_management': return 'Gestión';
      case 'gift_cards': return 'Regalar';
      case 'gift_codes': return 'Códigos';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg">
        <div className="max-w-[1750px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-black text-sm sm:text-lg text-white tracking-wider leading-none">
                  TOKKII <span className="text-amber-400">BUILDER</span>
                </h1>
                <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.2 rounded border border-emerald-500/40">
                  STUDIO
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium hidden xs:block">
                Editor TCG & Sobres
              </p>
            </div>
          </div>

          {/* View Switch Tabs (Desktop: visible on lg and above - UNTOUCHED FOR PC) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onViewChange('card_builder')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentView === 'card_builder'
                  ? 'bg-slate-800 text-amber-400 shadow border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Editor de Cartas</span>
              <span className="text-[10px] px-1.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {cardCount}
              </span>
            </button>

            <button
              onClick={() => onViewChange('pack_builder')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentView === 'pack_builder'
                  ? 'bg-slate-800 text-amber-400 shadow border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Diseño de Sobres</span>
            </button>

            <button
              onClick={() => onViewChange('pack_management')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentView === 'pack_management'
                  ? 'bg-gradient-to-r from-purple-700 to-pink-700 text-white shadow border border-pink-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Send className="w-4 h-4 text-pink-400" />
              <span>Gestión de Sobres</span>
            </button>

            <button
              onClick={() => onViewChange('gift_cards')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentView === 'gift_cards'
                  ? 'bg-gradient-to-r from-amber-600 to-pink-600 text-white shadow border border-amber-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Regalar Cartas</span>
            </button>

            <button
              onClick={() => onViewChange('gift_codes')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentView === 'gift_codes'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow border border-emerald-400/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4 text-emerald-400" />
              <span>Generar código de regalo</span>
            </button>
          </nav>

          {/* Action Controls & Admin Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Menu Toggle Button (Solo para móviles/tablets: < 1024px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-400/60 hover:border-amber-400 text-amber-300 font-bold text-xs transition-all shadow cursor-pointer active:scale-95"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-[11px] font-black">{getCurrentViewLabel()}</span>
            </button>

            {adminEmail && (
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 sm:px-2.5 sm:py-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-300 truncate max-w-[100px] sm:max-w-[130px] hidden md:inline">
                  {adminEmail}
                </span>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Cerrar sesión de administrador"
                    className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={onResetDefaults}
              title="Restablecer cartas originales"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <a
              href="https://tcg.eviltokkii.online/Home"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Visor Web</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-Out Navigation Drawer (Solo Dispositivos Móviles) */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-xs bg-slate-950 border-l border-slate-800 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="space-y-5">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="font-black text-sm text-white tracking-wider">
                PESTAÑAS DEL BUILDER
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 rounded-xl bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section List (Pestañas disponibles) */}
          <div className="space-y-2">
            <button
              onClick={() => {
                onViewChange('card_builder');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                currentView === 'card_builder'
                  ? 'bg-slate-800 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Editor de Cartas</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                {cardCount}
              </span>
            </button>

            <button
              onClick={() => {
                onViewChange('pack_builder');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                currentView === 'pack_builder'
                  ? 'bg-slate-800 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Diseño de Sobres</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={() => {
                onViewChange('pack_management');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                currentView === 'pack_management'
                  ? 'bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-pink-400 text-white shadow-[0_0_15px_rgba(245,11,140,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4 text-pink-400" />
                <span className="text-sm">Gestión de Sobres</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={() => {
                onViewChange('gift_cards');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                currentView === 'gift_cards'
                  ? 'bg-gradient-to-r from-amber-900/80 to-pink-900/80 border-amber-400 text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Regalar Cartas</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={() => {
                onViewChange('gift_codes');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                currentView === 'gift_codes'
                  ? 'bg-gradient-to-r from-emerald-900/80 to-teal-900/80 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Códigos de Regalo</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Drawer Footer con Sesión y Enlace */}
        <div className="border-t border-slate-800 pt-4 space-y-2.5">
          <a
            href="https://tcg.eviltokkii.online/Home"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Abrir Visor Web TCG</span>
          </a>

          {adminEmail && (
            <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-slate-300 truncate text-[11px]">{adminEmail}</span>
              </div>
              {onLogout && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-red-400 hover:text-red-300 text-xs font-bold pl-2 cursor-pointer"
                >
                  Salir
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
