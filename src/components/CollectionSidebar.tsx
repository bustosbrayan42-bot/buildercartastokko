import React, { useState } from 'react';
import type { CardData, Rarity } from '../types/card';
import { RARITY_CONFIGS, ELEMENT_CONFIGS } from '../data/configs';
import {
  Plus,
  Copy,
  Trash2,
  Search,
  Download,
  Upload,
  Layers
} from 'lucide-react';

interface CollectionSidebarProps {
  cards: CardData[];
  selectedCardId: string;
  onSelectCard: (id: string) => void;
  onAddNewCard: () => void;
  onDuplicateCard: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CollectionSidebar: React.FC<CollectionSidebarProps> = ({
  cards,
  selectedCardId,
  onSelectCard,
  onAddNewCard,
  onDuplicateCard,
  onDeleteCard,
  onExportJson,
  onImportJson,
}) => {
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'all'>('all');

  const rarities: Rarity[] = [
    'common',
    'uncommon',
    'rare',
    'super_rare',
    'ultra_rare',
    'secret_rare',
  ];

  const filteredCards = cards.filter((c) => {
    if (rarityFilter !== 'all' && c.rarity !== rarityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.cardNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <aside className="w-80 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col h-full max-h-[88vh]">
      {/* Top Action Header */}
      <div className="space-y-3 pb-3 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="font-black text-sm text-white">Colección de Cartas</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {cards.length} cartas
          </span>
        </div>

        {/* Add New Card Button */}
        <button
          type="button"
          onClick={onAddNewCard}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          + Agregar Nueva Carta
        </button>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filtrar por nombre o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Quick Rarity Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[10px]">
          <button
            type="button"
            onClick={() => setRarityFilter('all')}
            className={`px-2 py-0.5 rounded-lg font-bold shrink-0 transition-colors ${
              rarityFilter === 'all'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          {rarities.map((r) => {
            const cfg = RARITY_CONFIGS[r];
            const isSel = rarityFilter === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRarityFilter(r)}
                className={`px-2 py-0.5 rounded-lg font-bold shrink-0 transition-colors ${
                  isSel ? 'bg-slate-700 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <span style={{ color: cfg.color }}>{cfg.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards List */}
      <div className="flex-1 overflow-y-auto my-3 space-y-2 pr-1">
        {filteredCards.map((card) => {
          const isSelected = card.id === selectedCardId;
          const rCfg = RARITY_CONFIGS[card.rarity] || RARITY_CONFIGS.common;
          const elemCfg = ELEMENT_CONFIGS[card.element] || ELEMENT_CONFIGS.impulso;

          return (
            <div
              key={card.id}
              onClick={() => onSelectCard(card.id)}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 group ${
                isSelected
                  ? 'bg-slate-800 border-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Thumbnail */}
              <div className="w-10 h-14 rounded-lg overflow-hidden border border-slate-700/80 shrink-0 bg-slate-900 relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-0.5 right-0.5 text-[8px] bg-black/80 px-0.5 rounded font-bold" style={{ color: rCfg.color }}>
                  {rCfg.shortName}
                </span>
              </div>

              {/* Title & Stats */}
              <div className="flex-1 min-w-0 text-left">
                <div className="font-bold text-xs text-white truncate leading-tight">
                  {card.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {card.subtitle}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 font-mono">
                  <span>{elemCfg.symbol}</span>
                  <span className="font-bold text-red-400">{card.hp} HP</span>
                  <span>•</span>
                  <span>#{card.cardNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateCard(card.id);
                  }}
                  title="Duplicar carta"
                  className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {cards.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`¿Eliminar la carta "${card.title}"?`)) {
                        onDeleteCard(card.id);
                      }
                    }}
                    title="Eliminar carta"
                    className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* JSON Import/Export Footer */}
      <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onExportJson}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 hover:border-amber-400 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          Exportar JSON
        </button>

        <label className="cursor-pointer flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 hover:border-amber-400 transition-colors">
          <Upload className="w-3.5 h-3.5 text-cyan-400" />
          Importar JSON
          <input
            type="file"
            accept=".json"
            onChange={onImportJson}
            className="hidden"
          />
        </label>
      </div>
    </aside>
  );
};
