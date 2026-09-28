import React from 'react';
import type { BoosterPackConfig } from '../types/card';
import { RARITY_CONFIGS } from '../data/configs';
import { ALL_RARITIES, getPackSizeRule } from '../utils/probabilityEngine';
import { Package, Play, Sparkles, ShieldCheck } from 'lucide-react';

interface PackCanvasProps {
  config: BoosterPackConfig;
  onOpenTest: () => void;
}

export const PackCanvas: React.FC<PackCanvasProps> = ({ config, onOpenTest }) => {
  const packSize = config.cardsPerPack || 1;
  const activeRule = getPackSizeRule(config, packSize);

  const getGradientStyle = () => {
    switch (config.gradientTheme) {
      case 'gold':
        return 'linear-gradient(135deg, #b45309 0%, #d97706 30%, #7e22ce 70%, #312e81 100%)';
      case 'cyber':
        return 'linear-gradient(135deg, #0284c7 0%, #06b6d4 30%, #ec4899 70%, #4c1d95 100%)';
      case 'cosmic':
        return 'linear-gradient(135deg, #4c1d95 0%, #831843 40%, #0f172a 100%)';
      case 'emerald':
        return 'linear-gradient(135deg, #065f46 0%, #059669 40%, #047857 70%, #064e3b 100%)';
      case 'amethyst':
        return 'linear-gradient(135deg, #581c87 0%, #7e22ce 40%, #c026d3 70%, #3b0764 100%)';
      case 'crimson':
        return 'linear-gradient(135deg, #991b1b 0%, #dc2626 40%, #ea580c 70%, #450a0a 100%)';
      case 'custom':
        return `linear-gradient(135deg, ${config.customGradientFrom || '#b45309'} 0%, ${
          config.customGradientVia || '#7e22ce'
        } 50%, ${config.customGradientTo || '#312e81'} 100%)`;
      default:
        return 'linear-gradient(135deg, #b45309 0%, #7e22ce 50%, #312e81 100%)';
    }
  };

  return (
    <div className="flex flex-col items-center select-none py-2 w-full max-w-sm">
      {/* 3D Booster Pack Preview */}
      <div
        onClick={onOpenTest}
        className="relative w-64 sm:w-72 h-[420px] sm:h-[450px] rounded-3xl cursor-pointer select-none transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(217,119,6,0.3)] group overflow-hidden border-2 flex flex-col justify-between p-5"
        style={{
          background: getGradientStyle(),
          borderColor: config.crimpColor || '#f59e0b',
        }}
      >
        {/* Foil Shimmer Sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-foil-sweep pointer-events-none" />

        {/* Dynamic Glare */}
        <div className="card-glare z-20 pointer-events-none" />

        {/* Top Crimp Bar */}
        <div
          className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest uppercase border-b pb-2.5 z-10"
          style={{
            borderColor: `${config.crimpColor || '#f59e0b'}80`,
            color: '#fef08a',
          }}
        >
          <span>{packSize} {packSize === 1 ? 'CARTA' : 'CARTAS'} POR SOBRE</span>
          <span>★ TOKKII ★</span>
        </div>

        {/* Center Artwork & Logo */}
        <div className="my-auto flex flex-col items-center space-y-3 z-10 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-950/80 border-2 border-amber-300/80 flex items-center justify-center shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 animate-bounce" />
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90 drop-shadow">
              {config.seriesName || 'TOKKII TCG SERIES'}
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-wider text-white drop-shadow-md">
              {config.packTitle || 'Sobre de Cartas'}
            </div>
            <div className="text-xs text-amber-200 font-bold tracking-wide">
              {config.packSubtitle || 'Edición Génesis'}
            </div>
          </div>
        </div>

        {/* Bottom Crimp Bar */}
        <div
          className="w-full text-center border-t pt-2.5 text-[10px] font-black uppercase tracking-widest z-10"
          style={{
            borderColor: `${config.crimpColor || '#f59e0b'}80`,
            color: '#fef08a',
          }}
        >
          ¡TOCA PARA ABRIR EL SOBRE!
        </div>
      </div>

      {/* Probability Quick Summary Box */}
      <div className="w-full mt-5 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400 font-bold pb-1 border-b border-slate-800">
          <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Tasas de Sobre ({packSize} {packSize === 1 ? 'Carta' : 'Cartas'})
          </span>
          <span className="text-[10px] font-mono text-amber-400">
            {activeRule.enabledRarities.length} Rarezas
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {ALL_RARITIES.filter((r) => activeRule.enabledRarities.includes(r)).map((r) => {
            const cfg = RARITY_CONFIGS[r];
            const rate = activeRule.dropRates[r] || 0;
            return (
              <div
                key={r}
                className="flex items-center justify-between px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800/60 text-[11px]"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <span className="font-bold text-slate-300">{cfg.shortName}</span>
                </div>
                <span className="font-mono font-bold text-amber-400">{rate}%</span>
              </div>
            );
          })}
        </div>

        {activeRule.guaranteedSlotMinRarity && activeRule.guaranteedSlotMinRarity !== 'none' && (
          <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>
              Última ranura garantizada: {RARITY_CONFIGS[activeRule.guaranteedSlotMinRarity]?.name || activeRule.guaranteedSlotMinRarity}+
            </span>
          </div>
        )}
      </div>

      {/* Open Simulator Button */}
      <button
        onClick={onOpenTest}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/25 transition-all transform hover:scale-102 active:scale-98"
      >
        <Play className="w-4 h-4 fill-current" />
        Probar Simulación de Apertura 3D
      </button>
    </div>
  );
};
