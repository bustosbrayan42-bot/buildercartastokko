import React, { useState, useEffect } from 'react';
import type { Rarity, RarityConfig, CardEdition } from '../types/card';
import { EDITIONS } from '../utils/editionHelper';
import {
  X,
  Palette,
  RotateCcw,
  Check,
  Sparkles,
  Flame,
  Star
} from 'lucide-react';

interface RarityConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  edition: CardEdition;
  configs: Record<Rarity, RarityConfig>;
  onSave: (updatedConfigs: Record<Rarity, RarityConfig>) => void;
  onReset: () => void;
  onShowToast?: (msg: string) => void;
}

const RARITY_ORDER: Rarity[] = [
  'common',
  'uncommon',
  'rare',
  'super_rare',
  'ultra_rare',
  'secret_rare',
];

export const RarityConfigModal: React.FC<RarityConfigModalProps> = ({
  isOpen,
  onClose,
  edition,
  configs,
  onSave,
  onReset,
  onShowToast,
}) => {
  const [localConfigs, setLocalConfigs] = useState<Record<Rarity, RarityConfig>>(configs);

  useEffect(() => {
    setLocalConfigs(configs);
  }, [configs, isOpen]);

  if (!isOpen) return null;

  const isEvil = edition === 'eviltokkii';
  const editionInfo = EDITIONS[edition];

  const handleFieldChange = (rarity: Rarity, field: keyof RarityConfig, value: any) => {
    setLocalConfigs((prev) => {
      const current = prev[rarity];
      const updated = { ...current, [field]: value };
      
      // Auto synchronize glow color and badgeBg when primary color changes
      if (field === 'color') {
        updated.glowColor = `${value}66`;
        updated.borderColor = value;
      }

      return {
        ...prev,
        [rarity]: updated,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localConfigs);
    onShowToast?.(`¡Paletas y nombres de ${editionInfo.name} guardados con éxito!`);
    onClose();
  };

  const handleResetDefaults = () => {
    if (confirm(`¿Restablecer las rarezas de ${editionInfo.name} a los valores predeterminados?`)) {
      onReset();
      onShowToast?.('Valores de rarezas restaurados');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
              isEvil
                ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400 shadow-rose-500/20'
                : 'bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-amber-500/20'
            }`}>
              {isEvil ? <Flame className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Paletas y Nombres de Rarezas
                </h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  isEvil
                    ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                }`}>
                  {editionInfo.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Personaliza los nombres, siglas y paletas de color. Cada edición es 100% independiente.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable List of 6 Rarities */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RARITY_ORDER.map((rarityKey) => {
              const cfg = localConfigs[rarityKey];
              return (
                <div
                  key={rarityKey}
                  className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-4 space-y-3.5 hover:border-slate-700 transition-colors"
                >
                  {/* Top card preview badge */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono font-black px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: `${cfg.color}25`,
                          borderColor: cfg.color,
                          color: cfg.color,
                        }}
                      >
                        {cfg.shortName || '??'}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {cfg.name || 'Sin nombre'}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: cfg.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Name */}
                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Nombre de Rareza
                      </label>
                      <input
                        type="text"
                        value={cfg.name}
                        onChange={(e) => handleFieldChange(rarityKey, 'name', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-medium focus:border-amber-400 focus:outline-none"
                        placeholder="Ej. Sombra"
                        required
                      />
                    </div>

                    {/* ShortName */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Sigla
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={cfg.shortName}
                        onChange={(e) => handleFieldChange(rarityKey, 'shortName', e.target.value.toUpperCase())}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white font-mono font-bold text-center focus:border-amber-400 focus:outline-none uppercase"
                        placeholder="C"
                        required
                      />
                    </div>
                  </div>

                  {/* Color pickers */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {/* Primary Color */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Palette className="w-3 h-3" />
                        Color Principal
                      </label>
                      <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1">
                        <input
                          type="color"
                          value={cfg.color.startsWith('#') ? cfg.color : '#94a3b8'}
                          onChange={(e) => handleFieldChange(rarityKey, 'color', e.target.value)}
                          className="w-6 h-6 rounded-lg bg-transparent cursor-pointer border-0"
                        />
                        <span className="text-[11px] font-mono text-slate-300 uppercase">
                          {cfg.color}
                        </span>
                      </div>
                    </div>

                    {/* Border Color */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Palette className="w-3 h-3" />
                        Color Borde
                      </label>
                      <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1">
                        <input
                          type="color"
                          value={cfg.borderColor.startsWith('#') ? cfg.borderColor : '#64748b'}
                          onChange={(e) => handleFieldChange(rarityKey, 'borderColor', e.target.value)}
                          className="w-6 h-6 rounded-lg bg-transparent cursor-pointer border-0"
                        />
                        <span className="text-[11px] font-mono text-slate-300 uppercase">
                          {cfg.borderColor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Valores Iniciales</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer ${
                  isEvil
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-600/25 hover:brightness-110'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/25 hover:brightness-110'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
