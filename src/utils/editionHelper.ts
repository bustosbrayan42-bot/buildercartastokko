import type { CardData, CardEdition } from '../types/card';
import { DEFAULT_EVIL_CARDS } from '../data/defaultEvilCards';

export interface EditionInfo {
  id: CardEdition;
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  themeColor: string;
  accentBorder: string;
  accentGlow: string;
  gradient: string;
  r2Folder: string;
  storageKey: string;
  iconColor: string;
}

export const EDITIONS: Record<CardEdition, EditionInfo> = {
  goodtokkii: {
    id: 'goodtokkii',
    name: 'Edición GoodTokkii',
    shortName: 'GoodTokkii',
    tagline: 'Colección Génesis Original (140 Cartas)',
    badge: 'Génesis',
    themeColor: '#eab308',
    accentBorder: 'border-amber-500/50',
    accentGlow: 'shadow-[0_0_20px_rgba(234,179,8,0.25)]',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    r2Folder: 'cartas_renderizadas',
    storageKey: 'builder_cards', // Compatible con storage existente
    iconColor: 'text-amber-400',
  },
  eviltokkii: {
    id: 'eviltokkii',
    name: 'Edición EvilTokkii',
    shortName: 'EvilTokkii',
    tagline: 'Expansión Sombra & Caos (140 Cartas)',
    badge: 'Sombra / Caos',
    themeColor: '#f43f5e',
    accentBorder: 'border-rose-500/50',
    accentGlow: 'shadow-[0_0_20px_rgba(244,63,94,0.25)]',
    gradient: 'from-rose-600/25 via-purple-900/20 to-slate-950',
    r2Folder: 'cartas_renderizadas_EvilTokkii',
    storageKey: 'builder_cards_eviltokkii',
    iconColor: 'text-rose-400',
  },
};

/**
 * Retorna las 140 cartas base de EvilTokkii configuradas con las descripciones,
 * títulos y efectos oficiales, preservando la equivalencia de rarezas de GoodTokkii
 * y aplicando la paleta oscura de EvilTokkii.
 */
export const generateEvilTokkiiBaseCards = (_goodCards?: CardData[]): CardData[] => {
  return [...DEFAULT_EVIL_CARDS];
};
