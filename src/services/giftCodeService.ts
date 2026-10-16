import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { supabaseAuth } from '../utils/authSupabaseClient';
import { getR2Config } from '../utils/r2Storage';

export type PackType = 'pack_1' | 'pack_3' | 'pack_5';

export interface GiftCode {
  id: string;
  code: string;
  pack_type: PackType;
  pack_quantity: number;
  max_total_uses: number | null; // null = unlimited, 1 = single-use, N = limited
  max_uses_per_user: number; // default 1
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  description?: string;
}

export interface CodeRedemptionRecord {
  id: string;
  user_id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  redeemed_at: string;
  count: number;
}

export interface GiftCodeWithStats extends GiftCode {
  total_used: number;
  is_exhausted: boolean;
  redemptions: CodeRedemptionRecord[];
}

const R2_GIFT_CODES_KEY = 'gift_codes.json';

/**
 * Fetch all gift codes from Cloudflare R2 (with Supabase fallback check)
 */
export const fetchGiftCodesFromStorage = async (): Promise<GiftCode[]> => {
  const config = getR2Config();
  const publicUrl = `${config.publicDomain.replace(/\/+$/, '')}/${R2_GIFT_CODES_KEY}?t=${Date.now()}`;

  try {
    const res = await fetch(publicUrl, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return [];
      console.warn(`R2 fetch returned status ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching gift codes from R2:', err);
    // Fallback: check localStorage
    try {
      const local = localStorage.getItem('tokkii_gift_codes_backup');
      if (local) return JSON.parse(local);
    } catch {
      // ignore
    }
    return [];
  }
};

/**
 * Save all gift codes to Cloudflare R2
 */
export const saveGiftCodesToStorage = async (codes: GiftCode[]): Promise<void> => {
  const config = getR2Config();
  if (!config.accountId || !config.accessKeyId || !config.secretAccessKey) {
    console.warn('R2 credentials not fully configured, saving to localStorage backup.');
    localStorage.setItem('tokkii_gift_codes_backup', JSON.stringify(codes));
    return;
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: R2_GIFT_CODES_KEY,
    Body: JSON.stringify(codes, null, 2),
    ContentType: 'application/json',
    CacheControl: 'no-cache, no-store, must-revalidate',
  });

  await s3.send(command);
  localStorage.setItem('tokkii_gift_codes_backup', JSON.stringify(codes));

  // Also try to mirror in Supabase if gift_codes table exists
  try {
    for (const c of codes) {
      await supabaseAuth.from('gift_codes').upsert(c, { onConflict: 'id' });
    }
  } catch {
    // ignore if table does not exist
  }
};

/**
 * Fetch redemptions from Supabase user_cards for all codes
 */
export const fetchAllRedemptions = async (): Promise<Map<string, CodeRedemptionRecord[]>> => {
  const redemptionsMap = new Map<string, CodeRedemptionRecord[]>();

  try {
    // 1. Fetch all redemption logs from user_cards
    const { data: logs, error } = await supabaseAuth
      .from('user_cards')
      .select('id, user_id, card_id, count, obtained_at')
      .eq('source', 'code_redemption');

    if (error) {
      console.warn('Could not fetch redemption logs:', error);
      return redemptionsMap;
    }

    if (!logs || logs.length === 0) return redemptionsMap;

    // 2. Fetch profiles for user details
    const userIds = Array.from(new Set(logs.map((l) => l.user_id)));
    const { data: profiles } = await supabaseAuth
      .from('profiles')
      .select('id, username, display_name, avatar_url')
      .in('id', userIds);

    const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

    // 3. Map into redemptions
    logs.forEach((log) => {
      // card_id format is "GIFT_CODE:<CODE>"
      if (log.card_id && log.card_id.startsWith('GIFT_CODE:')) {
        const codeKey = log.card_id.replace('GIFT_CODE:', '').toUpperCase();
        const prof = profileMap.get(log.user_id);

        const record: CodeRedemptionRecord = {
          id: log.id,
          user_id: log.user_id,
          username: prof?.username || 'Usuario',
          display_name: prof?.display_name || prof?.username || 'Usuario',
          avatar_url: prof?.avatar_url || '',
          redeemed_at: log.obtained_at,
          count: log.count || 1,
        };

        if (!redemptionsMap.has(codeKey)) {
          redemptionsMap.set(codeKey, []);
        }
        redemptionsMap.get(codeKey)!.push(record);
      }
    });
  } catch (err) {
    console.error('Error fetching redemptions:', err);
  }

  return redemptionsMap;
};

/**
 * Fetch all gift codes enriched with real-time stats
 */
export const fetchGiftCodesWithStats = async (): Promise<GiftCodeWithStats[]> => {
  const [codes, redemptionsMap] = await Promise.all([
    fetchGiftCodesFromStorage(),
    fetchAllRedemptions(),
  ]);

  return codes.map((code) => {
    const codeKey = code.code.toUpperCase();
    const redemptions = redemptionsMap.get(codeKey) || [];
    const total_used = redemptions.reduce((acc, r) => acc + (r.count || 1), 0);
    const is_exhausted = code.max_total_uses !== null && total_used >= code.max_total_uses;

    return {
      ...code,
      total_used,
      is_exhausted,
      redemptions,
    };
  });
};

/**
 * Create a new gift code
 */
export const createGiftCode = async (params: {
  code: string;
  pack_type: PackType;
  pack_quantity: number;
  max_total_uses: number | null;
  max_uses_per_user: number;
  description?: string;
}): Promise<GiftCode> => {
  const cleanCode = params.code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');

  if (!cleanCode) {
    throw new Error('El código no puede estar vacío y debe contener caracteres alfanuméricos válidos.');
  }

  const existingCodes = await fetchGiftCodesFromStorage();
  if (existingCodes.some((c) => c.code.toUpperCase() === cleanCode)) {
    throw new Error(`El código "${cleanCode}" ya existe. Elige otro nombre o código.`);
  }

  const newCode: GiftCode = {
    id: `code_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    code: cleanCode,
    pack_type: params.pack_type,
    pack_quantity: Math.max(1, Math.floor(params.pack_quantity)),
    max_total_uses: params.max_total_uses === null ? null : Math.max(1, Math.floor(params.max_total_uses)),
    max_uses_per_user: Math.max(1, Math.floor(params.max_uses_per_user || 1)),
    is_active: true,
    created_at: new Date().toISOString(),
    description: params.description?.trim() || undefined,
  };

  const updatedList = [newCode, ...existingCodes];
  await saveGiftCodesToStorage(updatedList);

  return newCode;
};

/**
 * Toggle active status of a gift code
 */
export const toggleGiftCodeActive = async (codeId: string, isActive: boolean): Promise<void> => {
  const codes = await fetchGiftCodesFromStorage();
  const updated = codes.map((c) => (c.id === codeId ? { ...c, is_active: isActive, updated_at: new Date().toISOString() } : c));
  await saveGiftCodesToStorage(updated);
};

/**
 * Delete a gift code
 */
export const deleteGiftCode = async (codeId: string): Promise<void> => {
  const codes = await fetchGiftCodesFromStorage();
  const targetCode = codes.find((c) => c.id === codeId);
  const updated = codes.filter((c) => c.id !== codeId);
  await saveGiftCodesToStorage(updated);

  // Optional: delete from Supabase table if it exists
  if (targetCode) {
    try {
      await supabaseAuth.from('gift_codes').delete().eq('id', codeId);
    } catch {
      // ignore
    }
  }
};
