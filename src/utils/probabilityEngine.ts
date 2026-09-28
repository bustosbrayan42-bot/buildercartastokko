import type { CardData, BoosterPackConfig, PackSizeRule, Rarity } from '../types/card';

export const ALL_RARITIES: Rarity[] = [
  'common',
  'uncommon',
  'rare',
  'super_rare',
  'ultra_rare',
  'secret_rare',
];

/**
 * Returns the rule for a given pack size, or generates a sensible fallback
 */
export function getPackSizeRule(config: BoosterPackConfig, packSize: number): PackSizeRule {
  if (config.packSizeRules && config.packSizeRules[packSize]) {
    return config.packSizeRules[packSize];
  }

  // Fallback based on global dropRates
  const enabledRarities = ALL_RARITIES.filter((r) => {
    // By default, secret rare is disabled in 1-card and 3-card packs unless configured
    if (packSize < 5 && r === 'secret_rare') return false;
    return true;
  });

  return {
    enabledRarities,
    dropRates: { ...config.dropRates },
    guaranteedSlotMinRarity: packSize >= 5 ? 'super_rare' : packSize >= 3 ? 'rare' : 'none',
  };
}

/**
 * Normalizes rates across enabled rarities to sum precisely to 100%
 */
export function normalizeRates(
  rates: Record<Rarity, number>,
  enabledRarities: Rarity[]
): Record<Rarity, number> {
  const result: Record<Rarity, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    super_rare: 0,
    ultra_rare: 0,
    secret_rare: 0,
  };

  const activeSum = enabledRarities.reduce((sum, r) => sum + (rates[r] || 0), 0);

  if (activeSum <= 0) {
    // Distribute equally among enabled
    const equalShare = enabledRarities.length > 0 ? 100 / enabledRarities.length : 0;
    for (const r of enabledRarities) {
      result[r] = Math.round(equalShare * 10) / 10;
    }
    return result;
  }

  const factor = 100 / activeSum;
  let runningSum = 0;

  enabledRarities.forEach((r, idx) => {
    if (idx === enabledRarities.length - 1) {
      // Ensure exact 100% on the last item
      result[r] = Math.max(0, Math.round((100 - runningSum) * 10) / 10);
    } else {
      const val = Math.round((rates[r] || 0) * factor * 10) / 10;
      result[r] = val;
      runningSum += val;
    }
  });

  return result;
}

/**
 * Pulls a single card using the active pack size rule, slot rules, and individual card weights.
 */
export function drawCardFromPack(
  cards: CardData[],
  packSize: number,
  slotIndex: number,
  config: BoosterPackConfig
): CardData {
  if (!cards || cards.length === 0) {
    throw new Error('No cards available to draw from.');
  }

  const rule = getPackSizeRule(config, packSize);
  const isGuaranteedSlot =
    slotIndex === packSize - 1 &&
    rule.guaranteedSlotMinRarity &&
    rule.guaranteedSlotMinRarity !== 'none';

  let ratesToUse: Record<Rarity, number>;

  if (isGuaranteedSlot && rule.guaranteedSlotRates) {
    ratesToUse = rule.guaranteedSlotRates;
  } else {
    ratesToUse = rule.dropRates;
  }

  // Filter weights by enabled rarities for this pack size
  const enabledSet = new Set(rule.enabledRarities || ALL_RARITIES);
  const effectiveWeights: Record<Rarity, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    super_rare: 0,
    ultra_rare: 0,
    secret_rare: 0,
  };

  let totalWeight = 0;
  for (const r of ALL_RARITIES) {
    if (enabledSet.has(r)) {
      const w = Math.max(0, ratesToUse[r] || 0);
      effectiveWeights[r] = w;
      totalWeight += w;
    }
  }

  // If all enabled have 0 weight, fall back to any enabled
  if (totalWeight <= 0) {
    for (const r of rule.enabledRarities) {
      effectiveWeights[r] = 1;
      totalWeight += 1;
    }
  }

  // Roll rarity
  let randomVal = Math.random() * totalWeight;
  let chosenRarity: Rarity = rule.enabledRarities[0] || 'common';

  for (const r of ALL_RARITIES) {
    const weight = effectiveWeights[r];
    if (weight > 0) {
      if (randomVal <= weight) {
        chosenRarity = r;
        break;
      }
      randomVal -= weight;
    }
  }

  // Filter cards by chosen rarity
  let pool = cards.filter((c) => c.rarity === chosenRarity);

  // If no card exists in this rarity pool, search closest available rarity
  if (pool.length === 0) {
    pool = cards;
  }

  // Pick individual card from pool based on cardWeights (default weight = 1)
  const cardWeights = config.cardWeights || {};
  let totalCardWeight = 0;
  const weightsList: number[] = pool.map((c) => {
    const w = Math.max(0.1, cardWeights[c.id] ?? 1);
    totalCardWeight += w;
    return w;
  });

  let cardRoll = Math.random() * totalCardWeight;
  for (let i = 0; i < pool.length; i++) {
    if (cardRoll <= weightsList[i]) {
      return pool[i];
    }
    cardRoll -= weightsList[i];
  }

  return pool[0];
}

export interface SimulationResult {
  totalPacks: number;
  totalCards: number;
  rarityCounts: Record<Rarity, number>;
  rarityPercentages: Record<Rarity, number>;
  cardsDrawn: Array<{ card: CardData; count: number; percentage: number }>;
}

/**
 * Runs a Monte Carlo simulation of opening N packs with the given config
 */
export function simulatePacks(
  cards: CardData[],
  packSize: number,
  packCount: number,
  config: BoosterPackConfig
): SimulationResult {
  const rarityCounts: Record<Rarity, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    super_rare: 0,
    ultra_rare: 0,
    secret_rare: 0,
  };

  const cardCounter: Record<string, { card: CardData; count: number }> = {};

  const totalCards = packCount * packSize;

  for (let p = 0; p < packCount; p++) {
    for (let slot = 0; slot < packSize; slot++) {
      const drawn = drawCardFromPack(cards, packSize, slot, config);
      rarityCounts[drawn.rarity] = (rarityCounts[drawn.rarity] || 0) + 1;

      if (!cardCounter[drawn.id]) {
        cardCounter[drawn.id] = { card: drawn, count: 0 };
      }
      cardCounter[drawn.id].count += 1;
    }
  }

  const rarityPercentages: Record<Rarity, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    super_rare: 0,
    ultra_rare: 0,
    secret_rare: 0,
  };

  for (const r of ALL_RARITIES) {
    rarityPercentages[r] =
      totalCards > 0 ? Math.round(((rarityCounts[r] || 0) / totalCards) * 1000) / 10 : 0;
  }

  const cardsDrawn = Object.values(cardCounter)
    .map((item) => ({
      card: item.card,
      count: item.count,
      percentage: totalCards > 0 ? Math.round((item.count / totalCards) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalPacks: packCount,
    totalCards,
    rarityCounts,
    rarityPercentages,
    cardsDrawn,
  };
}
