import type { Rarity, RarityConfig, CardElement } from '../types/card';

export const RARITY_CONFIGS: Record<Rarity, RarityConfig> = {
  common: {
    id: 'common',
    name: 'Común',
    shortName: 'C',
    color: '#94a3b8',
    gradient: 'from-slate-600 to-slate-400',
    glowColor: 'rgba(148, 163, 184, 0.3)',
    borderColor: '#64748b',
    badgeBg: 'bg-slate-700/80 text-slate-200 border-slate-500',
    defaultHoloStyle: 'none',
    stars: 1,
    description: 'Acabado mate estándar con marco balanceado y detalles nítidos.'
  },
  uncommon: {
    id: 'uncommon',
    name: 'Poco Común',
    shortName: 'UC',
    color: '#38bdf8',
    gradient: 'from-sky-500 to-blue-400',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    borderColor: '#0284c7',
    badgeBg: 'bg-sky-950/80 text-sky-300 border-sky-500',
    defaultHoloStyle: 'silver',
    stars: 2,
    description: 'Bordes metálicos plateados con brillo especular sutil en movimiento.'
  },
  rare: {
    id: 'rare',
    name: 'Rara',
    shortName: 'R',
    color: '#a855f7',
    gradient: 'from-purple-600 to-indigo-400',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    borderColor: '#7e22ce',
    badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500',
    defaultHoloStyle: 'prismatic',
    stars: 3,
    description: 'Ilustración con lámina holográfica prismática y reflejo de arcoíris lineal.'
  },
  super_rare: {
    id: 'super_rare',
    name: 'Súper Rara',
    shortName: 'SR',
    color: '#eab308',
    gradient: 'from-amber-500 via-yellow-400 to-amber-600',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    borderColor: '#ca8a04',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500',
    defaultHoloStyle: 'gold_stars',
    defaultFoilOpacity: 0.8,
    defaultGlareOpacity: 0.28,
    stars: 4,
    description: 'Relieve dorado brillante con destellos estelares (80% foil, 28% glare) y marco repujado.'
  },
  ultra_rare: {
    id: 'ultra_rare',
    name: 'Ultra Rara',
    shortName: 'UR',
    color: '#ec4899',
    gradient: 'from-rose-500 via-fuchsia-500 to-cyan-400',
    glowColor: 'rgba(236, 72, 153, 0.7)',
    borderColor: '#db2777',
    badgeBg: 'bg-pink-950/80 text-pink-300 border-pink-500',
    defaultHoloStyle: 'secret_gold',
    defaultFoilOpacity: 0.7,
    defaultGlareOpacity: 0.2,
    stars: 5,
    description: 'Acabado Masterpiece Full-Art con lámina Secret Gold Mythic (70% foil, 20% glare).'
  },
  secret_rare: {
    id: 'secret_rare',
    name: 'Rara Secreta',
    shortName: 'SEC',
    color: '#10b981',
    gradient: 'from-emerald-400 via-amber-300 to-purple-500',
    glowColor: 'rgba(16, 185, 129, 0.85)',
    borderColor: '#059669',
    badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-400',
    defaultHoloStyle: 'prismatic',
    defaultFoilOpacity: 0.9,
    defaultGlareOpacity: 0.2,
    stars: 6,
    description: 'Acabado Masterpiece Full-Art con lámina prismática arcoíris (90% foil, 20% glare) y aura mítica.'
  }
};

export interface ElementConfig {
  id: CardElement;
  name: string;
  symbol: string;
  color: string;
  badgeBg: string;
  borderBg: string;
}

export const ELEMENT_CONFIGS: Record<CardElement, ElementConfig> = {
  arte: {
    id: 'arte',
    name: 'Arte',
    symbol: '🎨',
    color: '#fb7185',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    borderBg: 'border-rose-400',
  },
  impulso: {
    id: 'impulso',
    name: 'Impulso',
    symbol: '⚡',
    color: '#f59e0b',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    borderBg: 'border-amber-400',
  },
  ingenio: {
    id: 'ingenio',
    name: 'Ingenio',
    symbol: '🧠',
    color: '#ec4899',
    badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/50',
    borderBg: 'border-pink-400',
  },
  aura: {
    id: 'aura',
    name: 'Aura',
    symbol: '💖',
    color: '#f43f5e',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    borderBg: 'border-rose-400',
  },
  talento: {
    id: 'talento',
    name: 'Talento',
    symbol: '🛠️',
    color: '#8b5cf6',
    badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/50',
    borderBg: 'border-violet-400',
  },
  estilo: {
    id: 'estilo',
    name: 'Estilo',
    symbol: '✨',
    color: '#38bdf8',
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/50',
    borderBg: 'border-sky-400',
  },
  aventura: {
    id: 'aventura',
    name: 'Aventura',
    symbol: '🌿',
    color: '#22c55e',
    badgeBg: 'bg-green-500/20 text-green-300 border-green-500/50',
    borderBg: 'border-green-500',
  },
  desafio: {
    id: 'desafio',
    name: 'Desafío',
    symbol: '🏆',
    color: '#eab308',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    borderBg: 'border-yellow-400',
  },
  rutina: {
    id: 'rutina',
    name: 'Rutina',
    symbol: '🏠',
    color: '#14b8a6',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/50',
    borderBg: 'border-teal-400',
  },
  leyenda: {
    id: 'leyenda',
    name: 'Leyenda',
    symbol: '🌟',
    color: '#c084fc',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/50',
    borderBg: 'border-purple-300',
  },
};
