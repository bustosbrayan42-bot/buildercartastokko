import type { Rarity, RarityConfig, CardElement, CardEdition } from '../types/card';

export const DEFAULT_GOOD_RARITY_CONFIGS: Record<Rarity, RarityConfig> = {
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
    defaultHoloStyle: 'wave',
    defaultFoilOpacity: 0.65,
    defaultGlareOpacity: 0.28,
    stars: 2,
    description: 'Lámina holográfica Wave Refraction (65% foil, 28% glare).'
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
    defaultHoloStyle: 'glitter',
    defaultFoilOpacity: 1.0,
    defaultGlareOpacity: 0.18,
    stars: 3,
    description: 'Ilustración con lámina Holo Glitter Spark (100% foil, 18% glare).'
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

export const DEFAULT_EVIL_RARITY_CONFIGS: Record<Rarity, RarityConfig> = {
  common: {
    id: 'common',
    name: 'Sombra',
    shortName: 'S',
    color: '#64748b',
    gradient: 'from-slate-800 to-slate-600',
    glowColor: 'rgba(100, 116, 139, 0.4)',
    borderColor: '#475569',
    badgeBg: 'bg-slate-900/90 text-slate-300 border-slate-700',
    defaultHoloStyle: 'none',
    stars: 1,
    description: 'Esencia base sombría nacida de las penumbras.'
  },
  uncommon: {
    id: 'uncommon',
    name: 'Maldita',
    shortName: 'M',
    color: '#8b5cf6',
    gradient: 'from-violet-900 via-purple-700 to-indigo-950',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    borderColor: '#7c3aed',
    badgeBg: 'bg-purple-950/90 text-purple-300 border-purple-600',
    defaultHoloStyle: 'wave',
    defaultFoilOpacity: 0.7,
    defaultGlareOpacity: 0.3,
    stars: 2,
    description: 'Impregnada de una maldición sutil que distorsiona la luz.'
  },
  rare: {
    id: 'rare',
    name: 'Abisal',
    shortName: 'AB',
    color: '#f43f5e',
    gradient: 'from-rose-800 to-red-950',
    glowColor: 'rgba(244, 63, 94, 0.6)',
    borderColor: '#e11d48',
    badgeBg: 'bg-rose-950/90 text-rose-300 border-rose-600',
    defaultHoloStyle: 'glitter',
    defaultFoilOpacity: 1.0,
    defaultGlareOpacity: 0.22,
    stars: 3,
    description: 'Forjada en el abismo profundo con reflejos sangrientos.'
  },
  super_rare: {
    id: 'super_rare',
    name: 'Siniestra',
    shortName: 'SIN',
    color: '#ea580c',
    gradient: 'from-orange-700 via-red-800 to-stone-950',
    glowColor: 'rgba(234, 88, 12, 0.65)',
    borderColor: '#c2410c',
    badgeBg: 'bg-orange-950/90 text-orange-300 border-orange-600',
    defaultHoloStyle: 'gold_stars',
    defaultFoilOpacity: 0.85,
    defaultGlareOpacity: 0.3,
    stars: 4,
    description: 'Poder destructivo con fuego oscuro y acabados incandescentes.'
  },
  ultra_rare: {
    id: 'ultra_rare',
    name: 'Caótica',
    shortName: 'CAO',
    color: '#d946ef',
    gradient: 'from-fuchsia-700 via-pink-900 to-purple-950',
    glowColor: 'rgba(217, 70, 239, 0.75)',
    borderColor: '#c026d3',
    badgeBg: 'bg-fuchsia-950/90 text-fuchsia-300 border-fuchsia-600',
    defaultHoloStyle: 'secret_gold',
    defaultFoilOpacity: 0.75,
    defaultGlareOpacity: 0.25,
    stars: 5,
    description: 'Caos puro que quebranta el orden del juego.'
  },
  secret_rare: {
    id: 'secret_rare',
    name: 'Pesadilla Mítica',
    shortName: 'PM',
    color: '#e11d48',
    gradient: 'from-rose-600 via-purple-900 to-amber-600',
    glowColor: 'rgba(225, 29, 72, 0.9)',
    borderColor: '#be123c',
    badgeBg: 'bg-black/90 text-rose-400 border-rose-500',
    defaultHoloStyle: 'prismatic',
    defaultFoilOpacity: 0.95,
    defaultGlareOpacity: 0.25,
    stars: 6,
    description: 'La cumbre de la oscuridad: una manifestación legendaria sin límites.'
  }
};

/**
 * Mantiene compatibilidad total con la configuración original de GoodTokkii
 */
export const RARITY_CONFIGS: Record<Rarity, RarityConfig> = DEFAULT_GOOD_RARITY_CONFIGS;

export const getRarityConfigsForEdition = (edition: CardEdition): Record<Rarity, RarityConfig> => {
  const key = `tokkii_rarity_configs_${edition}`;
  const baseDefaults = edition === 'eviltokkii' ? DEFAULT_EVIL_RARITY_CONFIGS : DEFAULT_GOOD_RARITY_CONFIGS;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...baseDefaults, ...parsed };
    }
  } catch (e) {
    console.error(`Error loading rarity configs for ${edition}:`, e);
  }
  return baseDefaults;
};

export const saveRarityConfigsForEdition = (edition: CardEdition, configs: Record<Rarity, RarityConfig>) => {
  const key = `tokkii_rarity_configs_${edition}`;
  try {
    localStorage.setItem(key, JSON.stringify(configs));
  } catch (e) {
    console.error(`Error saving rarity configs for ${edition}:`, e);
  }
};

export const resetRarityConfigsForEdition = (edition: CardEdition): Record<Rarity, RarityConfig> => {
  const key = `tokkii_rarity_configs_${edition}`;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error resetting rarity configs for ${edition}:`, e);
  }
  return edition === 'eviltokkii' ? DEFAULT_EVIL_RARITY_CONFIGS : DEFAULT_GOOD_RARITY_CONFIGS;
};

export interface ElementConfig {
  id: CardElement;
  name: string;
  symbol: string;
  color: string;
  badgeBg: string;
  borderBg: string;
}

export const DEFAULT_GOOD_ELEMENT_CONFIGS: Record<CardElement, ElementConfig> = {
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

export const DEFAULT_EVIL_ELEMENT_CONFIGS: Record<CardElement, ElementConfig> = {
  arte: {
    id: 'arte',
    name: 'Arte Oscuro',
    symbol: '🩸',
    color: '#b91c1c',
    badgeBg: 'bg-red-950/80 text-red-300 border-red-700/60',
    borderBg: 'border-red-600',
  },
  impulso: {
    id: 'impulso',
    name: 'Furia',
    symbol: '🔥',
    color: '#ea580c',
    badgeBg: 'bg-orange-950/80 text-orange-300 border-orange-700/60',
    borderBg: 'border-orange-600',
  },
  ingenio: {
    id: 'ingenio',
    name: 'Maquinación',
    symbol: '🕷️',
    color: '#a21caf',
    badgeBg: 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-700/60',
    borderBg: 'border-fuchsia-600',
  },
  aura: {
    id: 'aura',
    name: 'Corrupción',
    symbol: '🌑',
    color: '#475569',
    badgeBg: 'bg-slate-900/90 text-slate-300 border-slate-700/70',
    borderBg: 'border-slate-500',
  },
  talento: {
    id: 'talento',
    name: 'Destrucción',
    symbol: '⚒️',
    color: '#dc2626',
    badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
    borderBg: 'border-rose-600',
  },
  estilo: {
    id: 'estilo',
    name: 'Elegancia Siniestra',
    symbol: '🦇',
    color: '#7c3aed',
    badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-700/60',
    borderBg: 'border-purple-600',
  },
  aventura: {
    id: 'aventura',
    name: 'Acecho',
    symbol: '🕯️',
    color: '#ca8a04',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
    borderBg: 'border-amber-600',
  },
  desafio: {
    id: 'desafio',
    name: 'Dominio',
    symbol: '⛓️',
    color: '#4338ca',
    badgeBg: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60',
    borderBg: 'border-indigo-600',
  },
  rutina: {
    id: 'rutina',
    name: 'Caos Doméstico',
    symbol: '🥀',
    color: '#be123c',
    badgeBg: 'bg-pink-950/80 text-pink-300 border-pink-700/60',
    borderBg: 'border-pink-600',
  },
  leyenda: {
    id: 'leyenda',
    name: 'Apocalipsis',
    symbol: '😈',
    color: '#991b1b',
    badgeBg: 'bg-red-950/90 text-rose-300 border-red-600',
    borderBg: 'border-red-500',
  },
};

/**
 * Elementos por defecto (compatibilidad total con GoodTokkii)
 */
export const ELEMENT_CONFIGS: Record<CardElement, ElementConfig> = DEFAULT_GOOD_ELEMENT_CONFIGS;

export const getElementConfigsForEdition = (edition: CardEdition): Record<CardElement, ElementConfig> => {
  return edition === 'eviltokkii' ? DEFAULT_EVIL_ELEMENT_CONFIGS : DEFAULT_GOOD_ELEMENT_CONFIGS;
};
