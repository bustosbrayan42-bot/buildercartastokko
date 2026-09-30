import React from 'react';
import {
  Sparkles,
  Layers,
  Package,
  RotateCcw,
  ExternalLink,
  Gift,
  Send
} from 'lucide-react';

export type BuilderViewMode = 'card_builder' | 'pack_builder' | 'pack_management' | 'gift_cards';

interface HeaderProps {
  currentView: BuilderViewMode;
  onViewChange: (view: BuilderViewMode) => void;
  onResetDefaults: () => void;
  cardCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onResetDefaults,
  cardCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg">
      <div className="max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg text-white tracking-wider leading-none">
                TOKKII <span className="text-amber-400">BUILDER</span>
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded border border-emerald-500/40">
                STUDIO PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Editor y Creador Avanzado de Cartas TCG & Sobres
            </p>
          </div>
        </div>

        {/* View Switch Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
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
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetDefaults}
            title="Restablecer cartas originales"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Abrir Visor Web</span>
          </a>
        </div>
      </div>
    </header>
  );
};
