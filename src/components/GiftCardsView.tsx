import React, { useState, useEffect } from 'react';
import type { CardData, CardElement, Rarity } from '../types/card';
import { RARITY_CONFIGS, ELEMENT_CONFIGS } from '../data/configs';
import { CardCanvas } from './CardCanvas';
import {
  Gift,
  Search,
  Users,
  Loader2,
  X
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
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [giftingCardId, setGiftingCardId] = useState<string | null>(null);

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
      if (data.length > 0 && !selectedUserId) {
        setSelectedUserId(data[0].id);
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

  const handleGiftCard = async (card: CardData) => {
    if (!selectedUserId) {
      alert('Por favor selecciona un usuario destinatario.');
      return;
    }

    const targetUser = users.find((u) => u.id === selectedUserId);
    const userName = targetUser?.display_name || targetUser?.username || 'Usuario';

    try {
      setGiftingCardId(card.id);
      await giftCardToUser(selectedUserId, card.id, 1);
      onShowToast(`✨ ¡Carta "${card.title}" (#${card.cardNumber}) regalada a ${userName}!`);
      // Update user count in memory
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUserId ? { ...u, cardsCount: (u.cardsCount || 0) + 1 } : u))
      );
    } catch (err: any) {
      console.error('Error gifting card:', err);
      alert(`Error al regalar carta: ${err?.message || 'Error de conexión'}`);
    } finally {
      setGiftingCardId(null);
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

  const activeUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & User Selection Bar */}
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
                Selecciona al espectador de Twitch y haz clic en "Regalar Carta" para añadirla a su álbum en vivo.
              </p>
            </div>
          </div>
        </div>

        {/* User Picker Row */}
        <div className="pt-3 border-t border-slate-800 flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Destinatario (Usuario de Twitch):
            </label>
            {users.length === 0 && !isLoadingUsers ? (
              <div className="text-xs text-slate-500">
                Aún no hay usuarios registrados con Twitch en el Visor.
              </div>
            ) : (
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.display_name} (@{u.username}) • [{u.cardsCount || 0} cartas en álbum]
                  </option>
                ))}
              </select>
            )}
          </div>

          {activeUser && (
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl shrink-0">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-purple-900 border border-purple-500/40 shrink-0">
                {activeUser.avatar_url ? (
                  <img
                    src={activeUser.avatar_url}
                    alt={activeUser.display_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-white flex items-center justify-center h-full">
                    {activeUser.display_name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <div>
                <div className="font-bold text-xs text-white">
                  {activeUser.display_name}
                </div>
                <div className="text-[10px] text-amber-400 font-mono">
                  Colección: {activeUser.cardsCount || 0} cartas
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Toolbar: Search & Rarity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-2 border-t border-slate-800/80 items-center">
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
            const isGiftingThis = giftingCardId === card.id;

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

                  {/* Gift Button */}
                  <button
                    type="button"
                    onClick={() => handleGiftCard(card)}
                    disabled={isGiftingThis || !selectedUserId}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isGiftingThis ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Gift className="w-3.5 h-3.5" />
                    )}
                    <span>{isGiftingThis ? 'Entregando...' : 'Regalar Carta'}</span>
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
    </div>
  );
};
