export type Rarity = 'common' | 'uncommon' | 'rare' | 'super_rare' | 'ultra_rare' | 'secret_rare';

export type CardElement =
  | 'arte'
  | 'impulso'
  | 'ingenio'
  | 'aura'
  | 'talento'
  | 'estilo'
  | 'aventura'
  | 'desafio'
  | 'rutina'
  | 'leyenda';

export type HoloStyle = 'none' | 'silver' | 'prismatic' | 'gold_stars' | 'cosmic' | 'secret_gold' | 'glitter' | 'wave';

export interface CardAttack {
  id: string;
  name: string;
  cost: CardElement[];
  damage: string;
  description: string;
  tag?: string;
}

export interface CardData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageZoom?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
  imageRotation?: number; // 0 to 360 degrees
  imageFit?: 'cover' | 'contain' | 'full_bleed';
  rarity: Rarity;
  element: CardElement;
  hp: number;
  cardNumber: string;
  totalInSet: string;
  artist: string;
  flavorText: string;
  attacks: CardAttack[];
  retreatCost: number;
  weakness?: CardElement;
  resistance?: CardElement;
  isFullArt: boolean;
  borderColor?: string;
  customHoloStyle?: HoloStyle;
  customFoilOpacity?: number; // 0 to 1
  customGlareOpacity?: number; // 0 to 1
  customMaskOpacity?: number; // 0 to 1
  dateAdded?: string;
  tags: string[];
}

export interface BoosterPackConfig {
  packTitle: string;
  packSubtitle: string;
  seriesName: string;
  badgeText: string;
  gradientTheme: 'gold' | 'cyber' | 'cosmic' | 'emerald' | 'amethyst' | 'crimson' | 'custom';
  customGradientFrom?: string;
  customGradientVia?: string;
  customGradientTo?: string;
  cardsPerPack: number;
  crimpColor: string;
  soundEnabled: boolean;
  dropRates: Record<Rarity, number>;
}

export interface RarityConfig {
  id: Rarity;
  name: string;
  shortName: string;
  color: string;
  gradient: string;
  glowColor: string;
  borderColor: string;
  badgeBg: string;
  defaultHoloStyle: HoloStyle;
  stars: number;
  description: string;
}
