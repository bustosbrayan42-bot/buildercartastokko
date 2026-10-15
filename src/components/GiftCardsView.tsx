import React, { useState, useEffect } from 'react';
import type { CardData, CardElement, Rarity } from '../types/card';
import { RARITY_CONFIGS, ELEMENT_CONFIGS } from '../data/configs';
import { CardCanvas } from './CardCanvas';
import {
  Gift,
  Search,
  Users,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import {
  fetchAllUsers,
  giftCardToUser,
  type AdminUserProfile,
} from '../services/adminUserService';

interface GiftCardsViewProps {
  cards: CardData[];
  onShowToast: (msg: string) => void;
}

export const GiftCardsView: React.FC<GiftCardsViewProps> = ({
  cards,
  onShowToast,
}) => {
  const [users, setUsers] = useState<AdminUserProfile[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [cardToGift, setCardToGift] = useState<CardData | null>(null);
  const [giftUserId, setGiftUserId] = useState<string>('');
  const [isGifting, setIsGifting] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [dropdownSearch, setDropdownSearch] = useState<string>('');

  // Filters for cards
  const [search, setSearch] = useState<string>('');
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

  const loadUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const data = await fetchAllUsers();
      setUsers(data);
      if (data.length > 0 && !giftUserId) {
        setGiftUserId(data[0].id);
      }
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleConfirmGift = async () => {
    if (!cardToGift) return;
    if (!giftUserId) {
      alert('Por favor selecciona un usuario destinatario.');
      return;
    }

    const targetUser = users.find((u) => u.id === giftUserId);
    const userName = targetUser?.display_name || targetUser?.username || 'Usuario';

    try {
      setIsGifting(true);
      await giftCardToUser(giftUserId, cardToGift.id, 1);
      onShowToast(`✨ ¡Carta "${cardToGift.title}" (#${cardToGift.cardNumber}) regalada a ${userName}!`);
      // Update user count in memory
      setUsers((prev) =>
        prev.map((u) => (u.id === giftUserId ? { ...u, cardsCount: (u.cardsCount || 0) + 1 } : u))
      );
      setCardToGift(null);
    } catch (err: any) {
      console.error('Error gifting card:', err);
      alert(`Error al regalar carta: ${err?.message || 'Error de conexión'}`);
    } finally {
      setIsGifting(false);
    }
  };

  const filteredCards = cards.filter((c) => {
    if (rarityFilter !== 'all' && c.rarity !== rarityFilter) return false;
    if (elementFilter !== 'all' && c.element !== elementFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.cardNumber.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with Filters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.35)] shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-wide">
                  Regalar Cartas Individuales
                </h2>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  {cards.length} Cartas Disponibles
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Filtra por rareza o elemento y haz clic en "Regalar Carta" para elegir al espectador en la ventana emergente.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar: Search & Rarity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3 border-t border-slate-800/80 items-center">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar carta por nombre o N°..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
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
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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

      {/* CARDS VISOR: 5 HORIZONTAL COLUMNS GRID */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {filteredCards.map((card) => {
            const rConfig = RARITY_CONFIGS[card.rarity] || RARITY_CONFIGS.common;
            const elemConfig = ELEMENT_CONFIGS[card.element] || ELEMENT_CONFIGS.impulso;

            return (
              <div
                key={card.id}
                className="bg-slate-900/85 border border-slate-800/90 rounded-2xl p-3 shadow-xl hover:border-amber-400/80 transition-all flex flex-col justify-between items-center group"
              >
                {/* 100% Real Rendered TCG Card Preview */}
                <div className="relative overflow-hidden rounded-[14px] mb-2 flex items-center justify-center pointer-events-none group-hover:scale-[1.03] transition-transform duration-200">
                  <CardCanvas
                    card={card}
                    scale={0.62}
                    interactive={false}
                    showControls={false}
                  />
                </div>

                {/* Card Info & Gift Button */}
                <div className="w-full space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white truncate max-w-[130px]">
                      {card.title}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800">
                      #{card.cardNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span
                      className="px-1.5 py-0.2 rounded font-black border"
                      style={{
                        color: rConfig.color,
                        borderColor: `${rConfig.color}40`,
                        backgroundColor: `${rConfig.color}15`,
                      }}
                    >
                      {rConfig.shortName} ★
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-medium">
                      <span>{elemConfig.symbol}</span>
                      <span className="capitalize">{card.element}</span>
                    </span>
                  </div>

                  {/* Gift Button (Abre ventana emergente) */}
                  <button
                    type="button"
                    onClick={() => {
                      setCardToGift(card);
                      if (!giftUserId && users.length > 0) {
                        setGiftUserId(users[0].id);
                      }
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Regalar Carta</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-400 text-sm bg-slate-900/60 rounded-3xl border border-slate-800">
          No se encontraron cartas con los filtros seleccionados.
        </div>
      )}

      {/* VENTANA EMERGENTE: SELECCIONAR DESTINATARIO Y REGALAR CARTA */}
      {cardToGift && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-7 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative">
            {/* Botón Cerrar */}
            <button
              type="button"
              onClick={() => {
                if (!isGifting) setCardToGift(null);
              }}
              className="absolute right-5 top-5 text-slate-400 hover:text-white p-2 rounded-2xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Encabezado del Modal */}
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
                <Gift className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-wide">
                  Regalar Carta a Espectador
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">
                  Selecciona al usuario de Twitch que recibirá esta carta directamente en su álbum.
                </p>
              </div>
            </div>

            {/* Vista Previa Grande de la Carta Seleccionada */}
            <div className="p-4 bg-slate-950 border border-slate-800/90 rounded-2xl flex flex-col sm:flex-row items-center gap-5">
              <div className="w-32 h-44 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/80 shrink-0 flex items-center justify-center shadow-lg">
                <CardCanvas
                  card={cardToGift}
                  scale={0.52}
                  interactive={false}
                  showControls={false}
                />
              </div>
              <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <span className="font-black text-lg text-white truncate">
                    {cardToGift.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0 self-center sm:self-auto">
                    #{cardToGift.cardNumber}
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs">
                  <span
                    className="px-2.5 py-1 rounded-lg font-black border text-xs shadow-sm"
                    style={{
                      color: (RARITY_CONFIGS[cardToGift.rarity] || RARITY_CONFIGS.common).color,
                      borderColor: `${(RARITY_CONFIGS[cardToGift.rarity] || RARITY_CONFIGS.common).color}50`,
                      backgroundColor: `${(RARITY_CONFIGS[cardToGift.rarity] || RARITY_CONFIGS.common).color}20`,
                    }}
                  >
                    {(RARITY_CONFIGS[cardToGift.rarity] || RARITY_CONFIGS.common).shortName} ★ {(RARITY_CONFIGS[cardToGift.rarity] || RARITY_CONFIGS.common).name}
                  </span>
                  <span className="text-slate-300 capitalize text-xs bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <span>{(ELEMENT_CONFIGS[cardToGift.element] || ELEMENT_CONFIGS.impulso).symbol}</span>
                    <span>{cardToGift.element}</span>
                  </span>
                </div>

                {cardToGift.subtitle && (
                  <p className="text-xs text-slate-400 italic line-clamp-2 pt-1 border-t border-slate-900">
                    "{cardToGift.subtitle}"
                  </p>
                )}
              </div>
            </div>

            {/* Selector de Destinatario */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  Seleccionar Destinatario (Twitch):
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {users.length} usuarios registrados
                </span>
              </label>

              {users.length === 0 && !isLoadingUsers ? (
                <div className="text-sm text-slate-400 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                  Aún no hay usuarios registrados con Twitch en el Visor.
                </div>
              ) : (
                <div className="relative">
                  {/* Botón Desplegable */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full bg-slate-950 border border-slate-700 hover:border-slate-600 rounded-2xl px-4 py-3 text-sm text-white flex items-center justify-between cursor-pointer transition-all shadow-inner focus:outline-none focus:border-amber-400"
                  >
                    <div className="flex items-center gap-3 truncate">
                      {(() => {
                        const target = users.find((u) => u.id === giftUserId);
                        if (!target) {
                          return <span className="text-slate-400">Seleccionar destinatario...</span>;
                        }
                        return (
                          <>
                            <div className="w-7 h-7 rounded-lg overflow-hidden bg-purple-900 border border-purple-500/40 shrink-0">
                              {target.avatar_url ? (
                                <img src={target.avatar_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs font-bold text-white flex items-center justify-center h-full">
                                  {target.display_name?.charAt(0) || 'U'}
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-white truncate">
                              {target.display_name}
                            </span>
                            <span className="text-xs text-purple-400 font-mono">
                              @{target.username}
                            </span>
                            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                              • [{target.cardsCount || 0} cartas en álbum]
                            </span>
                          </>
                        );
                      })()}
                    </div>
                    {isDropdownOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {/* Menú Desplegable con altura limitada (máx 4-5 usuarios a la vez, nunca se sale de pantalla) */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-slate-950 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                      {/* Buscador de usuarios dentro del desplegable */}
                      <div className="p-2.5 border-b border-slate-800 bg-slate-900/90 flex items-center gap-2">
                        <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                        <input
                          type="text"
                          placeholder="Filtrar por nombre o @usuario..."
                          value={dropdownSearch}
                          onChange={(e) => setDropdownSearch(e.target.value)}
                          autoFocus
                          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none py-1"
                        />
                        {dropdownSearch && (
                          <button
                            type="button"
                            onClick={() => setDropdownSearch('')}
                            className="text-slate-400 hover:text-white p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Lista con scrollbar limitada a max-h-48 (alrededor de 4 usuarios visibles) */}
                      <div className="max-h-48 overflow-y-auto p-1.5 space-y-1">
                        {users
                          .filter((u) => {
                            if (!dropdownSearch.trim()) return true;
                            const q = dropdownSearch.toLowerCase();
                            return (
                              u.display_name.toLowerCase().includes(q) ||
                              u.username.toLowerCase().includes(q)
                            );
                          })
                          .map((u) => {
                            const isSelected = u.id === giftUserId;
                            return (
                              <button
                                key={u.id}
                                type="button"
                                onClick={() => {
                                  setGiftUserId(u.id);
                                  setIsDropdownOpen(false);
                                  setDropdownSearch('');
                                }}
                                className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-purple-900/60 text-white border border-purple-500/50'
                                    : 'hover:bg-slate-900 text-slate-300'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-purple-950 border border-purple-500/30 shrink-0">
                                    {u.avatar_url ? (
                                      <img src={u.avatar_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-xs font-bold text-white flex items-center justify-center h-full">
                                        {u.display_name?.charAt(0) || 'U'}
                                      </span>
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-white truncate">
                                      {u.display_name}
                                    </div>
                                    <div className="text-[10px] text-purple-400 font-mono">
                                      @{u.username}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[10px] text-amber-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    {u.cardsCount || 0} cartas
                                  </span>
                                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                                </div>
                              </button>
                            );
                          })}
                        {users.filter((u) => {
                          if (!dropdownSearch.trim()) return true;
                          const q = dropdownSearch.toLowerCase();
                          return (
                            u.display_name.toLowerCase().includes(q) ||
                            u.username.toLowerCase().includes(q)
                          );
                        }).length === 0 && (
                          <div className="py-4 text-center text-xs text-slate-500">
                            No se encontraron usuarios que coincidan.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ficha Resumen del Usuario Seleccionado (Más grande y clara) */}
              {(() => {
                const target = users.find((u) => u.id === giftUserId);
                if (!target) return null;
                return (
                  <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-purple-900 border border-purple-500/50 shrink-0 shadow-md">
                      {target.avatar_url ? (
                        <img
                          src={target.avatar_url}
                          alt={target.display_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-base font-black text-white flex items-center justify-center h-full">
                          {target.display_name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-white truncate">
                        {target.display_name}
                      </div>
                      <div className="text-xs text-purple-400 font-mono">
                        @{target.username}
                      </div>
                    </div>
                    <div className="text-xs text-amber-300 font-mono font-bold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
                      Colección: {target.cardsCount || 0} cartas
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Botones de Acción del Modal */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCardToGift(null)}
                disabled={isGifting}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmGift}
                disabled={isGifting || !giftUserId}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/10 transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                {isGifting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Gift className="w-5 h-5" />
                )}
                <span>{isGifting ? 'Entregando carta...' : 'Confirmar y Regalar Carta'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
