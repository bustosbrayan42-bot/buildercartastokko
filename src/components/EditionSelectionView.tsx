import React from 'react';
import type { CardEdition } from '../types/card';
import { EDITIONS } from '../utils/editionHelper';
import { Sparkles, Flame, Layers, CloudUpload, ArrowRight, ShieldCheck } from 'lucide-react';

interface EditionSelectionViewProps {
  currentEdition: CardEdition;
  goodCardCount: number;
  evilCardCount: number;
  onSelectEdition: (edition: CardEdition) => void;
  onClose?: () => void;
}

export const EditionSelectionView: React.FC<EditionSelectionViewProps> = ({
  currentEdition,
  goodCardCount,
  evilCardCount,
  onSelectEdition,
  onClose,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 px-2 sm:px-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-400 font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Gestión de Ediciones TCG</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-wide">
          Selecciona la <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-purple-400">Edición a Editar</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Ambas ediciones se gestionan por separado con sus propias carpetas en Cloudflare R2 y configuraciones independientes para no alterar el visor existente.
        </p>
      </div>

      {/* 2 Edition Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* CARD 1: GoodTokkii */}
        <div
          onClick={() => onSelectEdition('goodtokkii')}
          className={`relative group rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between overflow-hidden ${
            currentEdition === 'goodtokkii'
              ? 'bg-gradient-to-b from-amber-500/15 via-slate-900/90 to-slate-950 border-amber-500/60 shadow-[0_0_35px_rgba(234,179,8,0.25)] ring-2 ring-amber-500/30'
              : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]'
          }`}
        >
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

          <div>
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {goodCardCount} Cartas
                </span>
                {currentEdition === 'goodtokkii' && (
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Activa
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
              Edición GoodTokkii
            </h3>
            <p className="text-xs text-amber-400/90 font-medium mt-0.5">
              {EDITIONS.goodtokkii.tagline}
            </p>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              La edición principal que nutre al Visor de Cartas en vivo. Conserva tus 140 cartas existentes, ilustraciones y base de datos sin modificaciones.
            </p>

            {/* Technical details badge */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CloudUpload className="w-3.5 h-3.5 text-amber-400" />
                  Carpeta R2 Bucket:
                </span>
                <code className="text-amber-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  cartas_renderizadas/
                </code>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Supabase:
                </span>
                <span className="text-emerald-400 font-medium">Vinculado (Producción)</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`mt-8 w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              currentEdition === 'goodtokkii'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white'
            }`}
          >
            <span>{currentEdition === 'goodtokkii' ? 'Continuar Editando GoodTokkii' : 'Seleccionar Edición GoodTokkii'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* CARD 2: EvilTokkii */}
        <div
          onClick={() => onSelectEdition('eviltokkii')}
          className={`relative group rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between overflow-hidden ${
            currentEdition === 'eviltokkii'
              ? 'bg-gradient-to-b from-rose-500/15 via-slate-900/90 to-slate-950 border-rose-500/60 shadow-[0_0_35px_rgba(244,63,94,0.25)] ring-2 ring-rose-500/30'
              : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-rose-500/40 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]'
          }`}
        >
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/20 transition-all duration-500" />

          <div>
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                <Flame className="w-7 h-7" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                  {evilCardCount} Cartas
                </span>
                {currentEdition === 'eviltokkii' && (
                  <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    Activa
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-rose-300 transition-colors">
              Edición EvilTokkii
            </h3>
            <p className="text-xs text-rose-400/90 font-medium mt-0.5">
              {EDITIONS.eviltokkii.tagline}
            </p>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nueva expansión independiente. Hereda exactamente la misma distribución de 140 cartas y rarezas de GoodTokkii como base limpia para editar paletas, textos e imágenes.
            </p>

            {/* Technical details badge */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CloudUpload className="w-3.5 h-3.5 text-rose-400" />
                  Carpeta R2 Bucket:
                </span>
                <code className="text-rose-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  cartas_renderizadas_EvilTokkii/
                </code>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Seguridad Visor:
                </span>
                <span className="text-amber-300 font-medium">Aislado (No sobreescribe)</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`mt-8 w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              currentEdition === 'eviltokkii'
                ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white hover:brightness-110 shadow-rose-600/25'
                : 'bg-slate-800 hover:bg-rose-600 hover:text-white text-white'
            }`}
          >
            <span>{currentEdition === 'eviltokkii' ? 'Continuar Editando EvilTokkii' : 'Seleccionar Edición EvilTokkii'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {onClose && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-300 underline font-medium transition-colors"
          >
            Cerrar y volver a la vista actual
          </button>
        </div>
      )}
    </div>
  );
};
