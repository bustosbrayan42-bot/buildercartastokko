import React, { useState, useMemo } from 'react';
import type { BoosterPackConfig, CardData, Rarity, PackSizeRule } from '../types/card';
import { RARITY_CONFIGS } from '../data/configs';
import {
  ALL_RARITIES,
  getPackSizeRule,
  normalizeRates,
  simulatePacks,
  type SimulationResult,
} from '../utils/probabilityEngine';
import {
  Sliders,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Layers,
  Award,
  BarChart3,
  Flame,
} from 'lucide-react';
import { resolveImageUrl } from '../utils/imageHelper';

interface PackEditorPanelProps {
  config: BoosterPackConfig;
  cards: CardData[];
  onChange: (updated: BoosterPackConfig) => void;
  onOpenVisualTest?: () => void;
}

export const PackEditorPanel: React.FC<PackEditorPanelProps> = ({
  config,
  cards,
  onChange,
  onOpenVisualTest,
}) => {
  // Main tabs: 'rates_by_size' | 'card_weights' | 'simulation' | 'presets'
  const [activeTab, setActiveTab] = useState<'rates_by_size' | 'card_weights' | 'simulation' | 'presets'>('rates_by_size');

  // Selected pack size tab: 1, 3, or 5
  const [selectedPackSize, setSelectedPackSize] = useState<number>(config.cardsPerPack || 1);

  // Filter for card weights tab
  const [cardWeightRarityFilter, setCardWeightRarityFilter] = useState<Rarity>('secret_rare');

  // Simulation state
  const [simResults, setSimResults] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Get or ensure active rule for selected pack size
  const activeRule: PackSizeRule = useMemo(() => {
    return getPackSizeRule(config, selectedPackSize);
  }, [config, selectedPackSize]);

  // Update rule for the active pack size
  const updateActiveRule = (updatedRule: Partial<PackSizeRule>) => {
    const currentRules = config.packSizeRules || {
      1: getPackSizeRule(config, 1),
      3: getPackSizeRule(config, 3),
      5: getPackSizeRule(config, 5),
    };

    const newRule: PackSizeRule = {
      ...activeRule,
      ...updatedRule,
    };

    const newPackSizeRules = {
      ...currentRules,
      [selectedPackSize]: newRule,
    };

    onChange({
      ...config,
      cardsPerPack: selectedPackSize,
      dropRates: newRule.dropRates,
      packSizeRules: newPackSizeRules,
    });
  };

  // Toggle rarity enabled/disabled for active pack size
  const handleToggleRarity = (rarity: Rarity) => {
    const isCurrentlyEnabled = activeRule.enabledRarities.includes(rarity);
    let newEnabled: Rarity[];

    if (isCurrentlyEnabled) {
      // Must keep at least 1 rarity enabled
      if (activeRule.enabledRarities.length <= 1) return;
      newEnabled = activeRule.enabledRarities.filter((r) => r !== rarity);
    } else {
      newEnabled = [...activeRule.enabledRarities, rarity];
    }

    const newRates = { ...activeRule.dropRates };
    if (isCurrentlyEnabled) {
      newRates[rarity] = 0;
    } else if (newRates[rarity] === 0) {
      newRates[rarity] = rarity === 'secret_rare' ? 1 : 10;
    }

    // Auto-normalize
    const normalized = normalizeRates(newRates, newEnabled);

    updateActiveRule({
      enabledRarities: newEnabled,
      dropRates: normalized,
    });
  };

  // Change drop rate for a specific rarity in the active pack size
  const handleRateChange = (rarity: Rarity, value: number) => {
    const cleanVal = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    const newRates = {
      ...activeRule.dropRates,
      [rarity]: cleanVal,
    };
    updateActiveRule({ dropRates: newRates });
  };

  // Auto-normalize active rates to sum to 100%
  const handleNormalize = () => {
    const normalized = normalizeRates(activeRule.dropRates, activeRule.enabledRarities);
    updateActiveRule({ dropRates: normalized });
  };

  // Guaranteed slot toggle & min rarity
  const handleGuaranteedMinRarityChange = (minRarity: Rarity | 'none') => {
    if (minRarity === 'none') {
      updateActiveRule({ guaranteedSlotMinRarity: 'none' });
      return;
    }

    // Calculate default guaranteed slot rates starting from minRarity
    const minIndex = ALL_RARITIES.indexOf(minRarity);
    const eligibleRarities = ALL_RARITIES.slice(minIndex).filter((r) =>
      activeRule.enabledRarities.includes(r)
    );

    const slotRates: Record<Rarity, number> = {
      common: 0,
      uncommon: 0,
      rare: 0,
      super_rare: 0,
      ultra_rare: 0,
      secret_rare: 0,
    };

    if (eligibleRarities.length === 1) {
      slotRates[eligibleRarities[0]] = 100;
    } else if (minRarity === 'rare') {
      slotRates.rare = 70;
      slotRates.super_rare = 20;
      slotRates.ultra_rare = 8;
      slotRates.secret_rare = activeRule.enabledRarities.includes('secret_rare') ? 2 : 0;
    } else if (minRarity === 'super_rare') {
      slotRates.super_rare = 65;
      slotRates.ultra_rare = 25;
      slotRates.secret_rare = activeRule.enabledRarities.includes('secret_rare') ? 10 : 0;
    } else {
      eligibleRarities.forEach((r) => {
        slotRates[r] = Math.round(100 / eligibleRarities.length);
      });
    }

    const normalizedSlotRates = normalizeRates(slotRates, eligibleRarities);

    updateActiveRule({
      guaranteedSlotMinRarity: minRarity,
      guaranteedSlotRates: normalizedSlotRates,
    });
  };

  // Change individual card weight
  const handleCardWeightChange = (cardId: string, weight: number) => {
    const currentWeights = config.cardWeights || {};
    const newWeights = {
      ...currentWeights,
      [cardId]: Math.max(0.1, Math.min(10, weight)),
    };
    onChange({
      ...config,
      cardWeights: newWeights,
    });
  };

  // Reset all card weights to equal (1.0)
  const handleResetCardWeights = () => {
    onChange({
      ...config,
      cardWeights: {},
    });
  };

  // Run Monte Carlo pull simulation
  const handleRunSimulation = (count: number) => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = simulatePacks(cards, selectedPackSize, count, config);
      setSimResults(result);
      setIsSimulating(false);
    }, 100);
  };

  // Presets
  const applyPreset = (presetName: 'standard' | 'generous' | 'hardcore' | 'secret_rush') => {
    let newRules: Record<number, PackSizeRule>;

    if (presetName === 'standard') {
      newRules = {
        1: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare'],
          dropRates: { common: 55, uncommon: 30, rare: 11, super_rare: 3.5, ultra_rare: 0.5, secret_rare: 0 },
          guaranteedSlotMinRarity: 'none',
        },
        3: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare'],
          dropRates: { common: 48, uncommon: 32, rare: 14, super_rare: 5, ultra_rare: 1, secret_rare: 0 },
          guaranteedSlotMinRarity: 'rare',
          guaranteedSlotRates: { common: 0, uncommon: 0, rare: 75, super_rare: 20, ultra_rare: 5, secret_rare: 0 },
        },
        5: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare', 'secret_rare'],
          dropRates: { common: 40, uncommon: 32, rare: 17, super_rare: 7, ultra_rare: 3, secret_rare: 1 },
          guaranteedSlotMinRarity: 'super_rare',
          guaranteedSlotRates: { common: 0, uncommon: 0, rare: 45, super_rare: 38, ultra_rare: 13, secret_rare: 4 },
        },
      };
    } else if (presetName === 'generous') {
      newRules = {
        1: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare', 'secret_rare'],
          dropRates: { common: 35, uncommon: 30, rare: 20, super_rare: 10, ultra_rare: 4, secret_rare: 1 },
          guaranteedSlotMinRarity: 'none',
        },
        3: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare', 'secret_rare'],
          dropRates: { common: 25, uncommon: 30, rare: 25, super_rare: 12, ultra_rare: 6, secret_rare: 2 },
          guaranteedSlotMinRarity: 'rare',
          guaranteedSlotRates: { common: 0, uncommon: 0, rare: 40, super_rare: 35, ultra_rare: 18, secret_rare: 7 },
        },
        5: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare', 'secret_rare'],
          dropRates: { common: 20, uncommon: 25, rare: 25, super_rare: 18, ultra_rare: 8, secret_rare: 4 },
          guaranteedSlotMinRarity: 'super_rare',
          guaranteedSlotRates: { common: 0, uncommon: 0, rare: 20, super_rare: 45, ultra_rare: 25, secret_rare: 10 },
        },
      };
    } else if (presetName === 'hardcore') {
      newRules = {
        1: {
          enabledRarities: ['common', 'uncommon', 'rare'],
          dropRates: { common: 75, uncommon: 22, rare: 3, super_rare: 0, ultra_rare: 0, secret_rare: 0 },
          guaranteedSlotMinRarity: 'none',
        },
        3: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare'],
          dropRates: { common: 65, uncommon: 28, rare: 6, super_rare: 1, ultra_rare: 0, secret_rare: 0 },
          guaranteedSlotMinRarity: 'none',
        },
        5: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare', 'secret_rare'],
          dropRates: { common: 55, uncommon: 32, rare: 9, super_rare: 3, ultra_rare: 0.8, secret_rare: 0.2 },
          guaranteedSlotMinRarity: 'rare',
          guaranteedSlotRates: { common: 0, uncommon: 0, rare: 85, super_rare: 12, ultra_rare: 2.5, secret_rare: 0.5 },
        },
      };
    } else {
      // Secret Rush (5 cartas con altas secretas)
      newRules = {
        1: {
          enabledRarities: ['common', 'uncommon', 'rare'],
          dropRates: { common: 60, uncommon: 30, rare: 10, super_rare: 0, ultra_rare: 0, secret_rare: 0 },
          guaranteedSlotMinRarity: 'none',
        },
        3: {
          enabledRarities: ['common', 'uncommon', 'rare', 'super_rare'],
          dropRates: { common: 45, uncommon: 35, rare: 15, super_rare: 5, ultra_rare: 0, secret_rare: 0 },
          guaranteedSlotMinRarity: 'rare',
          guaranteedSlotRates: { common: 0, uncommon: 0, rare: 70, super_rare: 30, ultra_rare: 0, secret_rare: 0 },
        },
        5: {
          enabledRarities: ['super_rare', 'ultra_rare', 'secret_rare'],
          dropRates: { common: 0, uncommon: 0, rare: 0, super_rare: 50, ultra_rare: 35, secret_rare: 15 },
          guaranteedSlotMinRarity: 'secret_rare',
          guaranteedSlotRates: { common: 0, uncommon: 0, rare: 0, super_rare: 0, ultra_rare: 40, secret_rare: 60 },
        },
      };
    }

    const activePresetRule = newRules[selectedPackSize] || newRules[1];
    onChange({
      ...config,
      dropRates: activePresetRule.dropRates,
      packSizeRules: newRules,
    });
  };

  // Active rate sum calculation
  const totalActiveRate = activeRule.enabledRarities.reduce(
    (sum, r) => sum + (activeRule.dropRates[r] || 0),
    0
  );
  const isRateBalanced = Math.abs(totalActiveRate - 100) < 0.1;

  // Filter cards for the weights tab
  const filteredCardsForWeights = useMemo(() => {
    return cards.filter((c) => c.rarity === cardWeightRarityFilter);
  }, [cards, cardWeightRarityFilter]);

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto text-slate-200">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            Configurador de Probabilidades de Sobres
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Personaliza el porcentaje de aparición de rarezas y cartas según el tamaño del sobre.
          </p>
        </div>

        {onOpenVisualTest && (
          <button
            type="button"
            onClick={onOpenVisualTest}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-md transition-all transform hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Probar Apertura
          </button>
        )}
      </div>

      {/* Main Tab Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800/80">
        <button
          type="button"
          onClick={() => setActiveTab('rates_by_size')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
            activeTab === 'rates_by_size'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Por Cantidad</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('card_weights')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
            activeTab === 'card_weights'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Ratio de Cartas</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('simulation')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
            activeTab === 'simulation'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Simulador</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
            activeTab === 'presets'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plantillas</span>
        </button>
      </div>

      {/* TAB 1: PROBABILITIES & RULES BY PACK SIZE */}
      {activeTab === 'rates_by_size' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Pack Size Selector Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Selecciona la Cantidad de Cartas por Sobre:
              </label>
              <span className="text-[11px] font-mono text-amber-400 font-bold">
                Configurando sobre de {selectedPackSize} {selectedPackSize === 1 ? 'carta' : 'cartas'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 3, 5].map((size) => {
                const isSelected = selectedPackSize === size;
                const sizeRule = getPackSizeRule(config, size);
                const hasSecret = sizeRule.enabledRarities.includes('secret_rare');

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedPackSize(size);
                      onChange({
                        ...config,
                        cardsPerPack: size,
                        badgeText: `${size} ${size === 1 ? 'CARTA' : 'CARTAS'} POR SOBRE`,
                      });
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-800 border-amber-400 text-white shadow-xl ring-2 ring-amber-400/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-sm font-black text-white">
                        {size} {size === 1 ? 'Carta' : 'Cartas'}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>Rarezas activas:</span>
                      <span className="font-bold text-amber-300">
                        {sizeRule.enabledRarities.length}
                      </span>
                    </div>

                    {hasSecret ? (
                      <span className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 inline-block w-fit">
                        ★ Incluye Rara Secreta
                      </span>
                    ) : (
                      <span className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 inline-block w-fit">
                        Sin Secreta
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rarity Activation Matrix & Drop Rates */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Rarezas Permitidas y Porcentajes (%)
                </span>
                <p className="text-[11px] text-slate-400">
                  Activa o desactiva qué rarezas pueden aparecer en sobres de {selectedPackSize}{' '}
                  {selectedPackSize === 1 ? 'carta' : 'cartas'}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border ${
                    isRateBalanced
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80'
                      : 'bg-amber-950/60 text-amber-400 border-amber-800/80 animate-pulse'
                  }`}
                >
                  Suma: {totalActiveRate.toFixed(1)}%
                </span>

                {!isRateBalanced && (
                  <button
                    type="button"
                    onClick={handleNormalize}
                    className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black shadow transition-all"
                  >
                    Auto-Ajustar a 100%
                  </button>
                )}
              </div>
            </div>

            {/* Rarity Sliders List */}
            <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {ALL_RARITIES.map((rarity) => {
                const cfg = RARITY_CONFIGS[rarity];
                const isEnabled = activeRule.enabledRarities.includes(rarity);
                const rate = isEnabled ? activeRule.dropRates[rarity] || 0 : 0;

                return (
                  <div
                    key={rarity}
                    className={`p-3 rounded-xl border transition-all ${
                      isEnabled
                        ? 'bg-slate-900/80 border-slate-800'
                        : 'bg-slate-950/40 border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      {/* Checkbox + Title */}
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => handleToggleRarity(rarity)}
                          className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-400 focus:ring-offset-slate-900 cursor-pointer"
                        />
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full shadow"
                            style={{ backgroundColor: cfg.color }}
                          />
                          <span className="text-xs font-black text-white">{cfg.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({cfg.shortName})
                          </span>
                        </div>
                      </label>

                      {/* Numeric Input */}
                      {isEnabled ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={rate}
                            onChange={(e) => handleRateChange(rarity, parseFloat(e.target.value))}
                            className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-right font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                          />
                          <span className="text-xs font-bold text-slate-400">%</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                          Desactivada
                        </span>
                      )}
                    </div>

                    {/* Range Slider */}
                    {isEnabled && (
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={rate}
                          onChange={(e) => handleRateChange(rarity, parseFloat(e.target.value))}
                          className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guaranteed Slot Rules (Only applicable for packs >= 2 cards) */}
          {selectedPackSize > 1 && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Ranura Final Garantizada (Última Carta del Sobre)
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Garantiza una rareza mínima especial en la última carta del sobre de{' '}
                    {selectedPackSize} cartas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Sin Garantía (Aleatorio Puro)' },
                  { id: 'rare', label: 'Mínimo Rara (R+)' },
                  { id: 'super_rare', label: 'Mínimo Súper Rara (SR+)' },
                  { id: 'ultra_rare', label: 'Mínimo Ultra Rara (UR+)' },
                ].map((opt) => {
                  const isSelected =
                    (activeRule.guaranteedSlotMinRarity || 'none') === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        handleGuaranteedMinRarityChange(opt.id as Rarity | 'none')
                      }
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INDIVIDUAL CARD WEIGHTS / RATE-UP */}
      {activeTab === 'card_weights' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Multiplicador de Probabilidad por Carta (Rate-Up)
              </span>
              <p className="text-[11px] text-slate-400">
                Ajusta el peso individual de cada carta dentro de su grupo de rareza.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetCardWeights}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              Restablecer Todos a 1.0x
            </button>
          </div>

          {/* Filter by Rarity Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
            {ALL_RARITIES.map((r) => {
              const cfg = RARITY_CONFIGS[r];
              const count = cards.filter((c) => c.rarity === r).length;
              const isSelected = cardWeightRarityFilter === r;

              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setCardWeightRarityFilter(r)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-slate-800 text-white border border-amber-400/60 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <span>{cfg.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Cards List in Selected Rarity */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {filteredCardsForWeights.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No hay cartas registradas con esta rareza en tu colección.
              </div>
            ) : (
              filteredCardsForWeights.map((card) => {
                const weight = config.cardWeights?.[card.id] ?? 1;
                return (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-3 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all gap-3"
                  >
                    {/* Card Thumbnail & Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-14 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                        <img
                          src={resolveImageUrl(card.image)}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {card.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          #{card.cardNumber} • {card.subtitle || 'Sin subtítulo'}
                        </div>
                      </div>
                    </div>

                    {/* Weight Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={weight}
                        onChange={(e) =>
                          handleCardWeightChange(card.id, parseFloat(e.target.value))
                        }
                        className="w-24 accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <span
                        className={`text-xs font-mono font-bold w-12 text-right ${
                          weight > 1
                            ? 'text-emerald-400 font-black'
                            : weight < 1
                            ? 'text-amber-400'
                            : 'text-slate-300'
                        }`}
                      >
                        {weight.toFixed(1)}x
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MONTE CARLO SIMULATOR */}
      {activeTab === 'simulation' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              Simulador Estadístico de Sorteos (Monte Carlo)
            </span>
            <p className="text-[11px] text-slate-400">
              Prueba la distribución real abriendo paquetes en lote para comprobar las probabilidades.
            </p>
          </div>

          {/* Action Simulation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[10, 50, 100, 500].map((count) => (
              <button
                key={count}
                type="button"
                disabled={isSimulating}
                onClick={() => handleRunSimulation(count)}
                className="py-2.5 px-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/80 hover:bg-slate-900 text-xs font-black text-amber-300 transition-all flex flex-col items-center justify-center gap-1 shadow-sm"
              >
                <span>Simular {count} Sobres</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  ({count * selectedPackSize} cartas)
                </span>
              </button>
            ))}
          </div>

          {/* Simulation Results Breakdown */}
          {simResults && (
            <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">
                  Resultados: {simResults.totalPacks} sobres abiertos ({simResults.totalCards}{' '}
                  cartas totales)
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  Sobres de {selectedPackSize} {selectedPackSize === 1 ? 'carta' : 'cartas'}
                </span>
              </div>

              {/* Rarity Bar Chart */}
              <div className="space-y-2">
                {ALL_RARITIES.map((r) => {
                  const cfg = RARITY_CONFIGS[r];
                  const count = simResults.rarityCounts[r] || 0;
                  const pct = simResults.rarityPercentages[r] || 0;
                  const expectedPct = activeRule.dropRates[r] || 0;

                  return (
                    <div key={r} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: cfg.color }}
                          />
                          <span className="font-bold text-white">{cfg.name}</span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-slate-400">{count} cartas</span>
                          <span className="font-bold text-amber-400">{pct}% obtenido</span>
                          <span className="text-slate-500">({expectedPct}% esperado)</span>
                        </div>
                      </div>

                      {/* Visual Bar */}
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, pct)}%`,
                            backgroundColor: cfg.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Top Pulled Cards */}
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Cartas más obtenidas en la prueba
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {simResults.cardsDrawn.slice(0, 6).map((item) => (
                    <div
                      key={item.card.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor: RARITY_CONFIGS[item.card.rarity]?.color || '#fff',
                          }}
                        />
                        <span className="font-bold text-slate-200 truncate">
                          {item.card.title}
                        </span>
                      </div>
                      <span className="font-mono text-amber-400 font-bold shrink-0">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PRESETS & BALANCING TEMPLATES */}
      {activeTab === 'presets' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Plantillas de Balanceo Preconfiguradas
            </span>
            <p className="text-[11px] text-slate-400">
              Aplica configuraciones equilibradas oficiales con un solo clic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => applyPreset('standard')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-left transition-all space-y-1.5"
            >
              <div className="text-sm font-black text-amber-300">
                ⚖️ Estándar Equilibrado (Recomendado)
              </div>
              <p className="text-xs text-slate-400">
                Raras Secretas exclusivas en sobres de 5 cartas (1%). Garantía de R+ en sobres de 3
                y SR+ en sobres de 5.
              </p>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('generous')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-400 text-left transition-all space-y-1.5"
            >
              <div className="text-sm font-black text-emerald-300">
                🎁 Generoso / Eventos Especiales
              </div>
              <p className="text-xs text-slate-400">
                Probabilidades aumentadas para Ultra Raras y Secretas en todos los sobres.
              </p>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('hardcore')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-400 text-left transition-all space-y-1.5"
            >
              <div className="text-sm font-black text-rose-300">
                🏆 Hardcore Competitivo
              </div>
              <p className="text-xs text-slate-400">
                Cartas de alta rareza muy escasas (0.2% Secreta en 5 cartas). Alta presencia de Comunes.
              </p>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('secret_rush')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-400 text-left transition-all space-y-1.5"
            >
              <div className="text-sm font-black text-purple-300">
                💎 Lluvia de Secretas (Pack Dios)
              </div>
              <p className="text-xs text-slate-400">
                Sobres de 5 cartas garantizan únicamente Súper Raras, Ultra Raras y Secretas (15% base / 60% en ranura garantizada).
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
