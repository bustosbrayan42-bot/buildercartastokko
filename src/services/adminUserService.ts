import { supabaseAuth } from '../utils/authSupabaseClient';

export interface AdminUserProfile {
  id: string;
  twitch_id?: string;
  username: string;
  display_name: string;
  avatar_url: string;
  tokkiipass_premium_expires_at?: string | null;
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
  const { data: cardsData } = await supabaseAuth.from('user_cards').select('user_id, card_id, count, obtained_at');

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
  const fallbackPremiumMap = new Map<string, string>();

  (cardsData || []).forEach((row: { user_id: string; card_id?: string; count: number; obtained_at?: string }) => {
    if (row.card_id === 'TOKKIIPASS_PREMIUM') {
      if (row.obtained_at) {
        fallbackPremiumMap.set(row.user_id, row.obtained_at);
      }
    } else if (!row.card_id || (!row.card_id.startsWith('GIFT_CODE:') && !row.card_id.startsWith('DAILY_LOGIN:'))) {
      cardsCountMap.set(row.user_id, (cardsCountMap.get(row.user_id) || 0) + (row.count || 1));
    }
  });

  return (profiles || []).map((prof: AdminUserProfile) => {
    const expiresAt = prof.tokkiipass_premium_expires_at || fallbackPremiumMap.get(prof.id) || null;
    return {
      ...prof,
      tokkiipass_premium_expires_at: expiresAt,
      packs: packsMap.get(prof.id) || { pack_1: 0, pack_3: 0, pack_5: 0 },
      cardsCount: cardsCountMap.get(prof.id) || 0,
    };
  });
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

/**
 * Activate or extend TokkiiPass Premium for a user (default: 30 days)
 * If already active, adds 30 days onto current expiration date.
 */
export const activateTokkiiPassPremium = async (
  userId: string,
  days: number = 30,
  currentExpiresAt?: string | null
): Promise<{ expiresAt: string; daysAdded: number }> => {
  if (!userId) throw new Error('Usuario inválido.');

  const now = new Date();
  let baseDate = now;

  if (currentExpiresAt) {
    const existingDate = new Date(currentExpiresAt);
    if (existingDate > now) {
      baseDate = existingDate;
    }
  }

  // Calculate new expiration date (exact 24 hours * days)
  const newExpirationDate = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);
  const newExpirationIso = newExpirationDate.toISOString();

  // 1. Try to update profiles table column
  let profilesUpdated = false;
  try {
    const { error: profErr } = await supabaseAuth
      .from('profiles')
      .update({
        tokkiipass_premium_expires_at: newExpirationIso,
        updated_at: now.toISOString(),
      })
      .eq('id', userId);

    if (!profErr) {
      profilesUpdated = true;
    } else {
      console.warn('Could not update tokkiipass_premium_expires_at in profiles (column might not exist yet):', profErr.message);
    }
  } catch (err) {
    console.warn('profiles update error:', err);
  }

  // 2. Also upsert in user_cards as fallback redundancy
  try {
    const { data: existingRow } = await supabaseAuth
      .from('user_cards')
      .select('id')
      .eq('user_id', userId)
      .eq('card_id', 'TOKKIIPASS_PREMIUM')
      .maybeSingle();

    if (existingRow) {
      await supabaseAuth
        .from('user_cards')
        .update({
          obtained_at: newExpirationIso,
          source: 'tokkiipass_premium',
        })
        .eq('id', existingRow.id);
    } else {
      await supabaseAuth.from('user_cards').insert({
        user_id: userId,
        card_id: 'TOKKIIPASS_PREMIUM',
        count: 1,
        source: 'tokkiipass_premium',
        obtained_at: newExpirationIso,
      });
    }
  } catch (err) {
    console.warn('user_cards fallback error:', err);
    if (!profilesUpdated) {
      throw new Error('No se pudo guardar la activación en Supabase. Verifica la conexión o ejecuta el comando SQL.');
    }
  }

  return { expiresAt: newExpirationIso, daysAdded: days };
};

/**
 * Revoke / Cancel TokkiiPass Premium for a user
 */
export const revokeTokkiiPassPremium = async (userId: string): Promise<void> => {
  if (!userId) return;

  // 1. Clear in profiles
  try {
    await supabaseAuth
      .from('profiles')
      .update({
        tokkiipass_premium_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  } catch (err) {
    console.warn('Error clearing profile premium:', err);
  }

  // 2. Delete or clear fallback in user_cards
  try {
    await supabaseAuth
      .from('user_cards')
      .delete()
      .eq('user_id', userId)
      .eq('card_id', 'TOKKIIPASS_PREMIUM');
  } catch (err) {
    console.warn('Error deleting user_cards premium fallback:', err);
  }
};
