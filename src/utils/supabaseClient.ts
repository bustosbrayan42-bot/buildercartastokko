import { createClient } from '@supabase/supabase-js';
import type { CardData } from '../types/card';

export const SUPABASE_URL = 'https://hucjgcodrhjocghcwdrf.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_xQYr4SpATP_vMB3Dt3yqSg_cUiefVhA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface DbCardRow {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  image_zoom: number;
  image_offset_x: number;
  image_offset_y: number;
  image_rotation: number;
  image_fit: 'cover' | 'contain' | 'full_bleed';
  rarity: CardData['rarity'];
  element: CardData['element'];
  hp: number;
  card_number: string;
  total_in_set: string;
  artist: string;
  flavor_text: string;
  attacks: CardData['attacks'];
  retreat_cost: number;
  weakness: CardData['weakness'] | null;
  resistance: CardData['resistance'] | null;
  is_full_art: boolean;
  border_color: string | null;
  custom_holo_style: CardData['customHoloStyle'] | null;
  custom_foil_opacity: number | null;
  custom_mask_opacity: number | null;
  tags: string[];
  date_added?: string;
  updated_at?: string;
}

export const cardToRow = (card: CardData): DbCardRow => ({
  id: card.id,
  title: card.title || 'Sin Título',
  subtitle: card.subtitle || '',
  image: card.image || '/cards/tokkii_photographer.jpg',
  image_zoom: card.imageZoom ?? 1,
  image_offset_x: card.imageOffsetX ?? 0,
  image_offset_y: card.imageOffsetY ?? 0,
  image_rotation: card.imageRotation ?? 0,
  image_fit: card.imageFit || 'cover',
  rarity: card.rarity || 'common',
  element: card.element || 'impulso',
  hp: card.hp || 100,
  card_number: card.cardNumber || '001',
  total_in_set: card.totalInSet || '050',
  artist: card.artist || 'Tokkii Studio',
  flavor_text: card.flavorText || '',
  attacks: card.attacks || [],
  retreat_cost: card.retreatCost ?? 1,
  weakness: card.weakness || null,
  resistance: card.resistance || null,
  is_full_art: !!card.isFullArt,
  border_color: card.borderColor || null,
  custom_holo_style: card.customHoloStyle || null,
  custom_foil_opacity: card.customFoilOpacity ?? null,
  custom_mask_opacity: card.customMaskOpacity ?? null,
  tags: card.tags || [],
  date_added: card.dateAdded || new Date().toISOString(),
});

export const rowToCard = (row: DbCardRow): CardData => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  image: row.image,
  imageZoom: Number(row.image_zoom ?? 1),
  imageOffsetX: Number(row.image_offset_x ?? 0),
  imageOffsetY: Number(row.image_offset_y ?? 0),
  imageRotation: Number(row.image_rotation ?? 0),
  imageFit: row.image_fit || 'cover',
  rarity: row.rarity,
  element: row.element,
  hp: Number(row.hp ?? 100),
  cardNumber: row.card_number,
  totalInSet: row.total_in_set,
  artist: row.artist,
  flavorText: row.flavor_text,
  attacks: Array.isArray(row.attacks) ? row.attacks : [],
  retreatCost: Number(row.retreat_cost ?? 1),
  weakness: row.weakness || undefined,
  resistance: row.resistance || undefined,
  isFullArt: !!row.is_full_art,
  borderColor: row.border_color || undefined,
  customHoloStyle: row.custom_holo_style || undefined,
  customFoilOpacity: row.custom_foil_opacity ? Number(row.custom_foil_opacity) : undefined,
  customMaskOpacity: row.custom_mask_opacity ? Number(row.custom_mask_opacity) : undefined,
  tags: Array.isArray(row.tags) ? row.tags : [],
  dateAdded: row.date_added,
});

/**
 * Fetch all cards from Supabase
 */
export const fetchCardsFromSupabase = async (): Promise<CardData[]> => {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('card_number', { ascending: true });

  if (error) {
    console.error('Error fetching cards from Supabase:', error);
    throw error;
  }

  return (data as DbCardRow[]).map(rowToCard);
};

/**
 * Save / Upsert single card to Supabase
 */
export const saveCardToSupabase = async (card: CardData): Promise<void> => {
  const row = cardToRow(card);
  const { error } = await supabase
    .from('cards')
    .upsert(row, { onConflict: 'id' });

  if (error) {
    console.error('Error saving card to Supabase:', error);
    throw error;
  }
};

/**
 * Save multiple cards to Supabase (Sync all)
 */
export const syncAllCardsToSupabase = async (cards: CardData[]): Promise<void> => {
  const rows = cards.map(cardToRow);
  const { error } = await supabase
    .from('cards')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('Error syncing all cards to Supabase:', error);
    throw error;
  }
};

/**
 * Delete card from Supabase
 */
export const deleteCardFromSupabase = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting card from Supabase:', error);
    throw error;
  }
};
