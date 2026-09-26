import React from 'react';
import type { BoosterPackConfig, Rarity } from '../types/card';
import { RARITY_CONFIGS } from '../data/configs';
import { Palette, Percent, Package, Volume2, VolumeX } from 'lucide-react';

interface PackEditorPanelProps {
  config: BoosterPackConfig;
  onChange: (updated: BoosterPackConfig) => void;
}

export const PackEditorPanel: React.FC<PackEditorPanelProps> = ({
  config,
  onChange,
}) => {
  const rarities: Rarity[] = [
    'common',
    'uncommon',
    'rare',
    'super_rare',
    'ultra_rare',
    'secret_rare',
  ];

  const themes = [
    { id: 'gold', name: 'Oro Génesis', color: 'from-amber-600 to-indigo-900' },
    { id: 'cyber', name: 'Cyber Neon', color: 'from-sky-500 to-purple-800' },
    { id: 'cosmic', name: 'Vacío Cósmico', color: 'from-purple-900 to-slate-950' },
    { id: 'emerald', name: 'Esmeralda Mítica', color: 'from-emerald-700 to-teal-950' },
    { id: 'amethyst', name: 'Amatista Real', color: 'from-purple-700 to-fuchsia-950' },
    { id: 'crimson', name: 'Dragón Carmesí', color: 'from-red-600 to-amber-950' },
  ];

  const handleDropRateChange = (rarity: Rarity, value: number) => {
    onChange({
      ...config,
      dropRates: {
        ...config.dropRates,
        [rarity]: Math.max(0, Math.min(100, value)),
      },
    });
  };

  const totalDropRate = Object.values(config.dropRates).reduce((a, b) => a + b, 0);

  const normalizeDropRates = () => {
    if (totalDropRate === 0) return;
    const factor = 100 / totalDropRate;
    const normalized: Record<Rarity, number> = { ...config.dropRates };
    rarities.forEach((r) => {
      normalized[r] = Math.round(config.dropRates[r] * factor * 10) / 10;
    });
    onChange({ ...config, dropRates: normalized });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-400" />
          Personalizador del Sobre Booster
        </h3>
        <button
          type="button"
          onClick={() => onChange({ ...config, soundEnabled: !config.soundEnabled })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
        >
          {config.soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Sonido Activado</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span>Silenciado</span>
            </>
          )}
        </button>
      </div>

      {/* Texts & Branding */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Textos y Marca del Sobre
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Título del Sobre
            </label>
            <input
              type="text"
              value={config.packTitle}
              onChange={(e) => onChange({ ...config, packTitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Subtítulo / Edición
            </label>
            <input
              type="text"
              value={config.packSubtitle}
              onChange={(e) => onChange({ ...config, packSubtitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Nombre de la Serie (Top Bar)
            </label>
            <input
              type="text"
              value={config.seriesName}
              onChange={(e) => onChange({ ...config, seriesName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">
              Insignia de Contenido
            </label>
            <input
              type="text"
              value={config.badgeText}
              onChange={(e) => onChange({ ...config, badgeText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Default Cards per Pack */}
        <div className="pt-2">
          <label className="text-[11px] font-bold text-slate-400 block mb-1.5">
            Cantidad de Cartas por Sobre (Simulación)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 5].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    cardsPerPack: cnt,
                    badgeText: `${cnt} ${cnt === 1 ? 'CARTA' : 'CARTAS'} POR SOBRE`,
                  })
                }
                className={`py-2 rounded-xl text-xs font-black transition-all border ${
                  config.cardsPerPack === cnt
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                {cnt} {cnt === 1 ? 'Carta' : 'Cartas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Foil Themes */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          Tema Visual y Gradiente del Foil
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {themes.map((theme) => {
            const isSelected = config.gradientTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    gradientTheme: theme.id as BoosterPackConfig['gradientTheme'],
                  })
                }
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-amber-400 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-full h-8 rounded-xl bg-gradient-to-r ${theme.color} mb-2 border border-white/10`}
                />
                <span className="text-xs font-bold text-white">{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Probabilities / Drop Rates */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-amber-400" />
            Probabilidades de Aparición (Drop Rates)
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono font-bold ${
                Math.abs(totalDropRate - 100) < 0.1 ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              Total: {totalDropRate.toFixed(1)}%
            </span>
            {Math.abs(totalDropRate - 100) > 0.1 && (
              <button
                type="button"
                onClick={normalizeDropRates}
                className="px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-black"
              >
                Auto-Ajustar a 100%
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          {rarities.map((r) => {
            const cfg = RARITY_CONFIGS[r];
            const rate = config.dropRates[r] || 0;
            return (
              <div key={r} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="font-bold text-white">{cfg.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({cfg.shortName})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={rate}
                      onChange={(e) => handleDropRateChange(r, parseFloat(e.target.value) || 0)}
                      className="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-amber-300 font-mono text-right focus:outline-none"
                    />
                    <span className="text-slate-400 text-xs">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={rate}
                  onChange={(e) => handleDropRateChange(r, parseFloat(e.target.value) || 0)}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
