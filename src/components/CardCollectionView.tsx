import React, { useState } from 'react';
import type { CardData, CardElement, Rarity } from '../types/card';
import { RARITY_CONFIGS, ELEMENT_CONFIGS } from '../data/configs';
import { CardCanvas } from './CardCanvas';
import {
  Plus,
  Copy,
  Trash2,
  Search,
  Download,
  Upload,
  Layers,
  Edit3,
  Sparkles,
  X,
  Database,
  CloudUpload,
  FileText,
  Loader2
} from 'lucide-react';

interface CardCollectionViewProps {
  cards: CardData[];
  onSelectAndEditCard: (id: string) => void;
  onAddNewCard: () => void;
  onDuplicateCard: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSyncSupabase?: () => void;
  onExportSql?: () => void;
  isSyncingSupabase?: boolean;
}

export const CardCollectionView: React.FC<CardCollectionViewProps> = ({
  cards,
  onSelectAndEditCard,
  onAddNewCard,
  onDuplicateCard,
  onDeleteCard,
  onExportJson,
  onImportJson,
  onSyncSupabase,
  onExportSql,
  isSyncingSupabase,
}) => {
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'all'>('all');
  const [elementFilter, setElementFilter] = useState<CardElement | 'all'>('all');

  const rarities: Rarity[] = [
    'common',
    'uncommon',
    'rare',
    'super_rare',
    'ultra_rare',
    'secret_rare',
  ];

  const elements: CardElement[] = [
    'arte',
    'impulso',
    'ingenio',
    'aura',
    'talento',
    'estilo',
    'aventura',
    'desafio',
    'rutina',
    'leyenda',
  ];

  const filteredCards = cards.filter((c) => {
    if (rarityFilter !== 'all' && c.rarity !== rarityFilter) return false;
    if (elementFilter !== 'all' && c.element !== elementFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.cardNumber.toLowerCase().includes(q) ||
        c.flavorText?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Top Controls Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-wide">
                  Colección de Cartas TCG
                </h2>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400">
                  {filteredCards.length} de {cards.length} cartas
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Diseño completo y renderizado real de cada carta. Haz clic en cualquiera para abrir el editor y su vista 3D.
              </p>
            </div>
          </div>

          {/* Action Buttons: Add Card & JSON & Supabase */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onAddNewCard}
              className="flex items-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              + Nueva Carta
            </button>

            {/* Sync with Supabase Button */}
            {onSyncSupabase && (
              <button
                type="button"
                onClick={onSyncSupabase}
                disabled={isSyncingSupabase}
                className="flex items-center gap-1.5 py-2.5 px-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                title="Guardar y respaldar todas las cartas en Supabase"
              >
                {isSyncingSupabase ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CloudUpload className="w-3.5 h-3.5" />
                )}
                <span>{isSyncingSupabase ? 'Guardando...' : 'Respaldar en Supabase'}</span>
              </button>
            )}

            {/* Export SQL */}
            {onExportSql && (
              <button
                type="button"
                onClick={onExportSql}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-colors cursor-pointer"
                title="Generar y descargar archivo SQL con todas las cartas"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generar SQL</span>
              </button>
            )}

            <button
              type="button"
              onClick={onExportJson}
              className="flex items-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 hover:border-amber-400 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              JSON
            </button>

            <label className="cursor-pointer flex items-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 hover:border-amber-400 transition-colors">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              Importar
              <input
                type="file"
                accept=".json"
                onChange={onImportJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Filter Toolbar: Search, Rarity & Element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3 border-t border-slate-800/80 items-center">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, subtítulo o N° (#001)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Rarity Filter Chips */}
          <div className="lg:col-span-8 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1">Rareza:</span>
            <button
              type="button"
              onClick={() => setRarityFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all border ${
                rarityFilter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              Todas ({cards.length})
            </button>
            {rarities.map((r) => {
              const cfg = RARITY_CONFIGS[r];
              const count = cards.filter((c) => c.rarity === r).length;
              const isSel = rarityFilter === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRarityFilter(r)}
                  className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all border flex items-center gap-1.5 ${
                    isSel
                      ? 'bg-slate-800 border-amber-400 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span style={{ color: cfg.color }}>{cfg.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Element Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs pt-1 border-t border-slate-800/40">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1">Elemento:</span>
          <button
            type="button"
            onClick={() => setElementFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all border ${
              elementFilter === 'all'
                ? 'bg-slate-800 text-white border-slate-600'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            Todos
          </button>
          {elements.map((elem) => {
            const cfg = ELEMENT_CONFIGS[elem];
            const isSel = elementFilter === elem;
            const count = cards.filter((c) => c.element === elem).length;
            return (
              <button
                key={elem}
                type="button"
                onClick={() => setElementFilter(elem)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all border flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-slate-800 text-amber-300 border-amber-400/80 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{cfg.symbol}</span>
                <span>{cfg.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards 4-Column Grid Centered */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredCards.map((card) => {
            return (
              <div
                key={card.id}
                onClick={() => onSelectAndEditCard(card.id)}
                className="group relative bg-slate-900/85 hover:bg-slate-850 border border-slate-800/90 hover:border-amber-400/90 rounded-3xl p-3.5 shadow-xl hover:shadow-[0_0_30px_rgba(234,179,8,0.25)] transition-all duration-300 cursor-pointer flex flex-col items-center justify-between w-full max-w-[320px]"
              >
                {/* 100% Real Rendered TCG Card (Scalable 0.76x Preview) */}
                <div className="relative overflow-hidden rounded-[18px] mb-2.5 flex items-center justify-center pointer-events-none group-hover:scale-[1.03] transition-transform duration-300">
                  <CardCanvas
                    card={card}
                    scale={0.76}
                    interactive={false}
                    showControls={false}
                  />
                </div>

                {/* Card Info & Quick Actions Footer */}
                <div className="w-full space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between gap-1 text-[11px] px-0.5">
                    <span className="font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </span>
                    <span className="font-mono text-slate-400 shrink-0 text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                      #{card.cardNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAndEditCard(card.id);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 hover:border-amber-400 transition-all shadow cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateCard(card.id);
                      }}
                      title="Duplicar carta"
                      className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
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
                        className="p-1.5 rounded-xl bg-slate-950 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-800/50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No se encontraron cartas</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No hay cartas que coincidan con los filtros de búsqueda o rareza seleccionados.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setRarityFilter('all');
              setElementFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 border border-slate-700 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};
