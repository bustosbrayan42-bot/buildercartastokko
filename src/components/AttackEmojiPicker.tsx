import React, { useState, useMemo } from 'react';
import { ATTACK_EMOJI_CATEGORIES } from '../data/attackEmojis';
import { Search, X, ChevronDown, ChevronUp, Tag } from 'lucide-react';

interface AttackEmojiPickerProps {
  onInsertToName: (emoji: string) => void;
  onInsertToDescription: (emoji: string) => void;
  onSetTag: (emoji: string) => void;
  currentTag?: string;
}

export const AttackEmojiPicker: React.FC<AttackEmojiPickerProps> = ({
  onInsertToName,
  onInsertToDescription,
  onSetTag,
  currentTag,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(ATTACK_EMOJI_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetField, setTargetField] = useState<'name' | 'desc' | 'tag'>('name');

  // Filter emojis based on query or active category
  const filteredEmojis = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const results: Array<{ char: string; name: string }> = [];
      ATTACK_EMOJI_CATEGORIES.forEach((cat) => {
        cat.emojis.forEach((item) => {
          if (
            item.name.toLowerCase().includes(q) ||
            item.tags.some((t) => t.toLowerCase().includes(q)) ||
            item.char.includes(q)
          ) {
            results.push(item);
          }
        });
      });
      return results;
    }

    const currentCat = ATTACK_EMOJI_CATEGORIES.find((c) => c.id === selectedCategory);
    return currentCat ? currentCat.emojis : [];
  }, [searchQuery, selectedCategory]);

  const handleEmojiClick = (char: string) => {
    if (targetField === 'name') {
      onInsertToName(char);
    } else if (targetField === 'desc') {
      onInsertToDescription(char);
    } else if (targetField === 'tag') {
      onSetTag(char);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
      {/* Accordion Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-800/80 transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">✨</span>
          <span className="text-xs font-bold text-amber-300">
            Catálogo de Emojis para Ataques ({ATTACK_EMOJI_CATEGORIES.reduce((acc, c) => acc + c.emojis.length, 0)}+ disponibles)
          </span>
          {currentTag && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono">
              Tag: {currentTag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">
            {isOpen ? 'Ocultar menú' : 'Desplegar emojis'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Expanded Emoji Palette */}
      {isOpen && (
        <div className="p-3 border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
          {/* Destination Selector & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Target Destination Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 w-full sm:w-auto">
              <span className="text-[10px] text-slate-400 font-bold px-1.5">Insertar en:</span>
              <button
                type="button"
                onClick={() => setTargetField('name')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  targetField === 'name'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Nombre
              </button>
              <button
                type="button"
                onClick={() => setTargetField('desc')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  targetField === 'desc'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Efecto
              </button>
              <button
                type="button"
                onClick={() => setTargetField('tag')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                  targetField === 'tag'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Tag className="w-2.5 h-2.5" />
                Badge Tag
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar emoji (fuego, espada, dragón, rayo, escudo...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          {!searchQuery && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {ATTACK_EMOJI_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1 border shrink-0 ${
                      isActive
                        ? 'bg-slate-800 border-amber-400 text-amber-300 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Emojis Grid */}
          <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800 max-h-48 overflow-y-auto pr-1">
            {filteredEmojis.length > 0 ? (
              <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-11 gap-1.5">
                {filteredEmojis.map((item, idx) => (
                  <button
                    key={`${item.char}-${idx}`}
                    type="button"
                    onClick={() => handleEmojiClick(item.char)}
                    title={`${item.char} ${item.name} (Clic para insertar en ${
                      targetField === 'name' ? 'Nombre' : targetField === 'desc' ? 'Efecto' : 'Badge Tag'
                    })`}
                    className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-400 flex items-center justify-center text-lg transition-all transform hover:scale-125 active:scale-95 shadow-sm"
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">
                No se encontraron emojis con el término "{searchQuery}".
              </div>
            )}
          </div>

          {/* Quick presets for Attack Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800/80">
            <span className="text-[10px] font-bold text-slate-400">Tags Rápidos:</span>
            {[
              '⚡ ULTIMATE',
              '🔥 BURST',
              '👑 MYTHIC',
              '🗡️ STRIKE',
              '🛡️ GUARD',
              '✨ SPECIAL',
              '💀 LETHAL',
              '🎯 CRITICAL',
              '💎 APEX',
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSetTag(tag)}
                className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-[10px] font-black text-amber-300 transition-colors"
              >
                {tag}
              </button>
            ))}
            {currentTag && (
              <button
                type="button"
                onClick={() => onSetTag('')}
                className="px-2 py-0.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-700/60 text-[10px] font-bold text-red-300 ml-auto transition-colors"
              >
                Quitar Tag
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
