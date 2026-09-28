import { createClient } from '@supabase/supabase-js';
import { DEFAULT_CARDS } from '../src/data/defaultData';
import type { CardData } from '../src/types/card';

const SUPABASE_URL = 'https://hucjgcodrhjocghcwdrf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xQYr4SpATP_vMB3Dt3yqSg_cUiefVhA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface DbCardRow {
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

const cardToRow = (card: CardData): DbCardRow => ({
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
  total_in_set: card.totalInSet || '140',
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

async function main() {
  console.log(`Starting sync of ${DEFAULT_CARDS.length} cards to Supabase...`);
  
  const rows = DEFAULT_CARDS.map(cardToRow);

  // Upsert in batches of 50
  const BATCH_SIZE = 50;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE);
    console.log(`Uploading batch ${i + 1} to ${Math.min(i + BATCH_SIZE, rows.length)}...`);
    const { error } = await supabase.from('cards').upsert(chunk, { onConflict: 'id' });
    if (error) {
      console.error(`Error in batch ${i}:`, error);
      throw error;
    }
  }

  // Fetch count to verify
  const { data, error: countErr } = await supabase.from('cards').select('id, card_number, title');
  if (countErr) {
    console.error('Error verifying count:', countErr);
  } else {
    console.log(`✅ Success! Total cards currently in Supabase 'cards' table: ${data.length}`);
  }
}

main().catch((err) => {
  console.error('Fatal error syncing cards:', err);
  process.exit(1);
});
