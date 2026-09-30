import React, { useState, useEffect } from 'react';
import {
  Package,
  Send,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import {
  fetchAllUsers,
  grantPacksToUser,
  type AdminUserProfile,
} from '../services/adminUserService';

interface PackManagementViewProps {
  onShowToast: (msg: string) => void;
}

export const PackManagementView: React.FC<PackManagementViewProps> = ({ onShowToast }) => {
  const [users, setUsers] = useState<AdminUserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchUser, setSearchUser] = useState<string>('');

  // Selected User & Form
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedPackType, setSelectedPackType] = useState<'pack_1' | 'pack_3' | 'pack_5'>('pack_3');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
      if (data.length > 0 && !selectedUserId) {
        setSelectedUserId(data[0].id);
      }
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSendPacks = async (targetUserId?: string, targetType?: 'pack_1' | 'pack_3' | 'pack_5', targetQty?: number) => {
    const uId = targetUserId || selectedUserId;
    const pType = targetType || selectedPackType;
    const qty = targetQty || quantity;

    if (!uId) {
      setStatusMsg({ type: 'error', text: 'Por favor selecciona un usuario.' });
      return;
    }
    if (qty <= 0) {
      setStatusMsg({ type: 'error', text: 'La cantidad debe ser mayor a 0.' });
      return;
    }

    try {
      setIsSending(true);
      setStatusMsg(null);
      await grantPacksToUser(uId, pType, qty);

      const targetUser = users.find((u) => u.id === uId);
      const userName = targetUser?.display_name || targetUser?.username || 'Usuario';
      const typeLabel = pType === 'pack_1' ? '1 Carta' : pType === 'pack_3' ? '3 Cartas' : '5 Cartas';

      onShowToast(`🎁 ¡${qty} ${qty === 1 ? 'sobre' : 'sobres'} de ${typeLabel} enviados a ${userName}!`);
      setStatusMsg({
        type: 'success',
        text: `¡${qty} sobres de ${typeLabel} entregados con éxito a ${userName}!`,
      });

      // Refresh list to update pack counts
      await loadUsers();
    } catch (err: any) {
      console.error('Error sending packs:', err);
      setStatusMsg({
        type: 'error',
        text: `Error al enviar sobres: ${err?.message || 'Error de conexión'}`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchUser.toLowerCase().trim();
    if (!q) return true;
    return (
      u.username?.toLowerCase().includes(q) ||
      u.display_name?.toLowerCase().includes(q) ||
      u.id?.toLowerCase().includes(q)
    );
  });

  const activeUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,11,140,0.35)] shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Gestión y Envío de Sobres TCG
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/50 text-purple-300">
                {users.length} {users.length === 1 ? 'Usuario' : 'Usuarios'} Registrados
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Envía y asigna sobres de 1, 3 o 5 cartas a los espectadores de Twitch de forma instantánea.
            </p>
          </div>
        </div>

        <button
          onClick={loadUsers}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          <span>Actualizar Lista</span>
        </button>
      </div>

      {/* Main Grid: Form Panel (Left) + Users Overview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PANEL 1: Send Form (5 Columns) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Send className="w-4 h-4 text-amber-400" />
            Enviar Sobres a Usuario
          </h3>

          {statusMsg && (
            <div
              className={`p-3 rounded-2xl text-xs flex items-center gap-2.5 border animate-in fade-in ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-950/60 border-red-500/50 text-red-300'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* User Selector Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Seleccionar Usuario de Twitch:</span>
              <span className="text-[10px] text-slate-400">Total: {users.length}</span>
            </label>

            {users.length === 0 && !isLoading ? (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-400 text-center">
                Aún no hay usuarios que hayan iniciado sesión con Twitch en el Visor.
              </div>
            ) : (
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.display_name} (@{u.username}) • [Sobres: {(u.packs?.pack_1 || 0) + (u.packs?.pack_3 || 0) + (u.packs?.pack_5 || 0)}]
                  </option>
                ))}
              </select>
            )}

            {activeUser && (
              <div className="mt-2 p-3 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-purple-900 border border-purple-500/40 shrink-0">
                  {activeUser.avatar_url ? (
                    <img
                      src={activeUser.avatar_url}
                      alt={activeUser.display_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-black text-white flex items-center justify-center h-full">
                      {activeUser.display_name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-white truncate">
                    {activeUser.display_name}
                  </div>
                  <div className="text-[10px] text-purple-400 font-mono">
                    @{activeUser.username}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-[9px] font-mono text-slate-400">
                    <span className="bg-slate-800 px-1.5 py-0.2 rounded">1c: {activeUser.packs?.pack_1 || 0}</span>
                    <span className="bg-slate-800 px-1.5 py-0.2 rounded">3c: {activeUser.packs?.pack_3 || 0}</span>
                    <span className="bg-slate-800 px-1.5 py-0.2 rounded">5c: {activeUser.packs?.pack_5 || 0}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pack Type Selector (1, 3, 5 cards) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              Tipo de Sobre (Cantidad de cartas):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'pack_1' as const, label: '1 Carta', desc: 'Sobre Individual' },
                { type: 'pack_3' as const, label: '3 Cartas', desc: 'Sobre Estándar' },
                { type: 'pack_5' as const, label: '5 Cartas', desc: 'Sobre Premium' },
              ].map((p) => (
                <button
                  key={p.type}
                  type="button"
                  onClick={() => setSelectedPackType(p.type)}
                  className={`py-3 px-2 rounded-2xl text-xs font-bold flex flex-col items-center justify-center transition-all border cursor-pointer ${
                    selectedPackType === p.type
                      ? 'bg-gradient-to-b from-purple-600 to-pink-600 text-white border-pink-400 shadow-[0_0_15px_rgba(245,11,140,0.3)] scale-[1.02]'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-black">{p.label}</span>
                  <span className="text-[9px] font-medium opacity-80">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              Cantidad de Sobres a Regalar:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
              <div className="flex gap-1">
                {[1, 3, 5, 10].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-300 border border-slate-700 transition-colors"
                  >
                    +{q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => handleSendPacks()}
            disabled={isSending || users.length === 0}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-black text-sm shadow-xl shadow-pink-600/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isSending ? 'Enviando sobres...' : `Enviar ${quantity} ${quantity === 1 ? 'Sobre' : 'Sobres'}`}</span>
          </button>
        </div>

        {/* PANEL 2: Registered Users Table / Direct Action (7 Columns) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              Comunidad & Espectadores ({filteredUsers.length})
            </h3>

            {/* Search Box */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Buscar por usuario..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Users List Table */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                <span className="text-xs">Cargando usuarios desde Supabase...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                {searchUser ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No hay usuarios registrados aún.'}
              </div>
            ) : (
              filteredUsers.map((u) => {
                const isCurrentSelected = u.id === selectedUserId;

                return (
                  <div
                    key={u.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCurrentSelected
                        ? 'bg-purple-950/40 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-purple-900 border border-purple-500/40 shrink-0">
                        {u.avatar_url ? (
                          <img
                            src={u.avatar_url}
                            alt={u.display_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-black text-white flex items-center justify-center h-full">
                            {u.display_name?.charAt(0) || 'U'}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">
                          {u.display_name}
                        </div>
                        <div className="text-[10px] text-purple-400 font-mono">
                          @{u.username}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-[9px] font-mono">
                          <span className="px-1.5 py-0.2 rounded bg-slate-900 text-amber-300 border border-amber-500/30">
                            1c: {u.packs?.pack_1 || 0}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-900 text-pink-300 border border-pink-500/30">
                            3c: {u.packs?.pack_3 || 0}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-900 text-purple-300 border border-purple-500/30">
                            5c: {u.packs?.pack_5 || 0}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                            Cartas: {u.cardsCount || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Grant Actions */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleSendPacks(u.id, 'pack_1', 1)}
                        disabled={isSending}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-600 hover:text-black text-[11px] font-black font-mono text-amber-300 border border-amber-500/40 transition-colors cursor-pointer"
                        title="Regalar 1 sobre de 1 carta"
                      >
                        +1 (1c)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendPacks(u.id, 'pack_3', 1)}
                        disabled={isSending}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-pink-600 hover:text-white text-[11px] font-black font-mono text-pink-300 border border-pink-500/40 transition-colors cursor-pointer"
                        title="Regalar 1 sobre de 3 cartas"
                      >
                        +1 (3c)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendPacks(u.id, 'pack_5', 1)}
                        disabled={isSending}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-purple-600 hover:text-white text-[11px] font-black font-mono text-purple-300 border border-purple-500/40 transition-colors cursor-pointer"
                        title="Regalar 1 sobre de 5 cartas"
                      >
                        +1 (5c)
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
