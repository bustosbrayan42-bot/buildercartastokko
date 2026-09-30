import { supabaseAuth } from '../utils/authSupabaseClient';

export interface AdminUserProfile {
  id: string;
  twitch_id?: string;
  username: string;
  display_name: string;
  avatar_url: string;
  created_at?: string;
  updated_at?: string;
  packs?: {
    pack_1: number;
    pack_3: number;
    pack_5: number;
  };
  cardsCount?: number;
}

/**
 * Fetch all registered users from Supabase 2 profiles table
 */
export const fetchAllUsers = async (): Promise<AdminUserProfile[]> => {
  const { data: profiles, error: profError } = await supabaseAuth
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (profError) {
    console.error('Error fetching users from Supabase 2:', profError);
    return [];
  }

  // Also fetch packs and card counts
  const { data: packsData } = await supabaseAuth.from('user_packs').select('*');
  const { data: cardsData } = await supabaseAuth.from('user_cards').select('user_id, count');

  const packsMap = new Map<string, { pack_1: number; pack_3: number; pack_5: number }>();
  (packsData || []).forEach((row: { user_id: string; pack_type: string; quantity: number }) => {
    if (!packsMap.has(row.user_id)) {
      packsMap.set(row.user_id, { pack_1: 0, pack_3: 0, pack_5: 0 });
    }
    const current = packsMap.get(row.user_id)!;
    if (row.pack_type === 'pack_1') current.pack_1 = Number(row.quantity || 0);
    if (row.pack_type === 'pack_3') current.pack_3 = Number(row.quantity || 0);
    if (row.pack_type === 'pack_5') current.pack_5 = Number(row.quantity || 0);
  });

  const cardsCountMap = new Map<string, number>();
  (cardsData || []).forEach((row: { user_id: string; count: number }) => {
    cardsCountMap.set(row.user_id, (cardsCountMap.get(row.user_id) || 0) + (row.count || 1));
  });

  return (profiles || []).map((prof: AdminUserProfile) => ({
    ...prof,
    packs: packsMap.get(prof.id) || { pack_1: 0, pack_3: 0, pack_5: 0 },
    cardsCount: cardsCountMap.get(prof.id) || 0,
  }));
};

/**
 * Grant / Add packs to a user
 */
export const grantPacksToUser = async (
  userId: string,
  packType: 'pack_1' | 'pack_3' | 'pack_5',
  quantity: number
): Promise<void> => {
  if (!userId || quantity <= 0) return;

  // Check if row exists
  const { data: existing } = await supabaseAuth
    .from('user_packs')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('pack_type', packType)
    .maybeSingle();

  if (existing) {
    const newQty = (existing.quantity || 0) + quantity;
    const { error } = await supabaseAuth
      .from('user_packs')
      .update({
        quantity: newQty,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id);

    if (error) throw error;
  } else {
    const { error } = await supabaseAuth
      .from('user_packs')
      .insert({
        user_id: userId,
        pack_type: packType,
        quantity: quantity,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
  }
};

/**
 * Gift a specific card directly to a user
 */
export const giftCardToUser = async (
  userId: string,
  cardId: string,
  count: number = 1
): Promise<void> => {
  if (!userId || !cardId) return;

  const { data: existing } = await supabaseAuth
    .from('user_cards')
    .select('id, count')
    .eq('user_id', userId)
    .eq('card_id', cardId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabaseAuth
      .from('user_cards')
      .update({
        count: (existing.count || 1) + count,
        obtained_at: new Date().toISOString(),
      })
      .eq('id', existing.id);

    if (error) throw error;
  } else {
    const { error } = await supabaseAuth
      .from('user_cards')
      .insert({
        user_id: userId,
        card_id: cardId,
        count: count,
        obtained_at: new Date().toISOString(),
        source: 'gift',
      });

    if (error) throw error;
  }
};
