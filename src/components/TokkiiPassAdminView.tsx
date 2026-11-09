import React, { useState, useEffect } from 'react';
import {
  Crown,
  Search,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  Clock,
  ShieldCheck,
  XCircle,
  Plus,
  AlertTriangle
} from 'lucide-react';
import {
  fetchAllUsers,
  activateTokkiiPassPremium,
  revokeTokkiiPassPremium,
  type AdminUserProfile,
} from '../services/adminUserService';

interface TokkiiPassAdminViewProps {
  onShowToast: (msg: string) => void;
}

export const TokkiiPassAdminView: React.FC<TokkiiPassAdminViewProps> = ({ onShowToast }) => {
  const [users, setUsers] = useState<AdminUserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'inactive'>('all');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [userToRevoke, setUserToRevoke] = useState<AdminUserProfile | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users for TokkiiPass:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Helper to determine if a user has active premium
  const getPremiumStatus = (expiresAt?: string | null) => {
    if (!expiresAt) return { isActive: false, daysRemaining: 0, formattedDate: 'No activo' };
    const expireTime = new Date(expiresAt).getTime();
    const nowTime = Date.now();
    const diffMs = expireTime - nowTime;

    if (diffMs <= 0) {
      return { isActive: false, daysRemaining: 0, formattedDate: 'Expirado' };
    }

    const daysRemaining = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const dateObj = new Date(expiresAt);
    const formattedDate = dateObj.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return { isActive: true, daysRemaining, formattedDate };
  };

  const handleActivate = async (user: AdminUserProfile, days: number = 30) => {
    try {
      setActionLoadingId(user.id);
      const isAlreadyActive = getPremiumStatus(user.tokkiipass_premium_expires_at).isActive;
      const res = await activateTokkiiPassPremium(user.id, days, user.tokkiipass_premium_expires_at);
      const userName = user.display_name || user.username || 'Usuario';
      const newStatus = getPremiumStatus(res.expiresAt);

      if (isAlreadyActive) {
        onShowToast(`👑 ¡Se sumaron +${days} días a ${userName}! Ahora tiene ${newStatus.daysRemaining} días restantes (Válido hasta ${newStatus.formattedDate}).`);
      } else {
        onShowToast(`👑 ¡TokkiiPass Premium activado por ${days} días para ${userName}! (Válido hasta ${newStatus.formattedDate}).`);
      }
      await loadUsers();
    } catch (err: any) {
      console.error('Error activating TokkiiPass Premium:', err);
      onShowToast(`Error: ${err?.message || 'No se pudo activar el pase.'}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleConfirmRevoke = async () => {
    if (!userToRevoke) return;
    const targetUser = userToRevoke;
    setUserToRevoke(null);

    try {
      setActionLoadingId(targetUser.id);
      await revokeTokkiiPassPremium(targetUser.id);
      const userName = targetUser.display_name || targetUser.username || 'Usuario';
      onShowToast(`TokkiiPass Premium desactivado para ${userName}.`);
      await loadUsers();
    } catch (err: any) {
      console.error('Error revoking TokkiiPass Premium:', err);
      onShowToast(`Error: ${err?.message || 'No se pudo revocar el pase.'}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const status = getPremiumStatus(u.tokkiipass_premium_expires_at);

    if (filterMode === 'active' && !status.isActive) return false;
    if (filterMode === 'inactive' && status.isActive) return false;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      u.username?.toLowerCase().includes(q) ||
      u.display_name?.toLowerCase().includes(q) ||
      u.id?.toLowerCase().includes(q) ||
      u.twitch_id?.toLowerCase().includes(q)
    );
  });

  const totalUsers = users.length;
  const activeCount = users.filter((u) => getPremiumStatus(u.tokkiipass_premium_expires_at).isActive).length;
  const inactiveCount = totalUsers - activeCount;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/40 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <Crown className="w-8 h-8 text-black" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Módulo de Gestión VIP
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Duración 30 Días
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                Activación de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">TokkiiPass Premium</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Activa manualmente el TokkiiPass Premium por 30 días para los usuarios que confirmen su pago directo (sin necesidad de pasarelas de pago externas). Los beneficiarios recibirán recompensas diarias duplicadas y <strong>5 sobres de 5 cartas todos los domingos</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={loadUsers}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
            <span>Refrescar Lista</span>
          </button>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 mt-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Usuarios Registrados</p>
              <p className="text-2xl font-black text-white">{totalUsers}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-amber-500/10">
            <div>
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pases Premium Activos</p>
              <p className="text-2xl font-black text-amber-300">{activeCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Usuarios Inactivos / Sin Pase</p>
              <p className="text-2xl font-black text-slate-400">{inactiveCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS: SEARCH & FILTERS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por usuario o Twitch ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({totalUsers})
          </button>
          <button
            onClick={() => setFilterMode('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterMode === 'active'
                ? 'bg-amber-500 text-slate-950 shadow font-black'
                : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Activos ({activeCount})</span>
          </button>
          <button
            onClick={() => setFilterMode('inactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'inactive'
                ? 'bg-slate-800 text-slate-300 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inactivos ({inactiveCount})
          </button>
        </div>
      </div>

      {/* USERS LIST TABLE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <span className="text-xs font-bold font-mono">Cargando base de datos de usuarios...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-sm font-bold text-slate-400">No se encontraron usuarios</p>
            <p className="text-xs text-slate-600">Prueba ajustando el término de búsqueda o el filtro.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filteredUsers.map((u) => {
              const status = getPremiumStatus(u.tokkiipass_premium_expires_at);
              const isProcessing = actionLoadingId === u.id;

              return (
                <div
                  key={u.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                    status.isActive ? 'bg-amber-950/15 hover:bg-amber-950/25' : 'hover:bg-slate-850/50'
                  }`}
                >
                  {/* User Profile Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative shrink-0">
                      {u.avatar_url ? (
                        <img
                          src={u.avatar_url}
                          alt={u.display_name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-black text-white text-lg">
                          {u.display_name?.charAt(0) || u.username?.charAt(0) || 'U'}
                        </div>
                      )}
                      {status.isActive && (
                        <div className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 p-1 rounded-full shadow-md border border-yellow-200">
                          <Crown className="w-3.5 h-3.5 fill-current" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm sm:text-base">
                          {u.display_name || u.username}
                        </span>
                        {status.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            Premium Activo
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-400 bg-slate-800 border border-slate-700">
                            Estándar
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span>@{u.username}</span>
                        <span>•</span>
                        <span className="font-mono text-[11px] text-slate-500">ID: {u.id.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Status Info Box */}
                    <div className="text-left sm:text-right space-y-0.5">
                      {status.isActive ? (
                        <>
                          <div className="flex items-center sm:justify-end gap-1.5 text-xs font-black text-amber-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Quedan {status.daysRemaining} días</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono">
                            Válido hasta: {status.formattedDate}
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-xs text-slate-400 font-medium">Sin suscripción activa</span>
                          <p className="text-[11px] text-slate-500">Listo para activación manual</p>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {status.isActive ? (
                        <>
                          {/* Agregar 30 días más */}
                          <button
                            onClick={() => handleActivate(u, 30)}
                            disabled={isProcessing}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-500/25 border-2 border-amber-400 hover:border-yellow-300 text-amber-200 hover:text-white font-black text-xs transition-all shadow-[0_0_14px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.45)] cursor-pointer disabled:opacity-50 active:scale-95"
                            title={`Suma 30 días adicionales a los ${status.daysRemaining} días restantes que ya tiene activos el usuario`}
                          >
                            {isProcessing ? (
                              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                            ) : (
                              <Plus className="w-4 h-4 text-amber-400 stroke-[3]" />
                            )}
                            <span>Agregar 30 Días Más</span>
                          </button>

                          {/* Revocar */}
                          <button
                            onClick={() => setUserToRevoke(u)}
                            disabled={isProcessing}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-50"
                            title="Desactivar TokkiiPass Premium"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        /* Activar 30 días iniciales */
                        <button
                          onClick={() => handleActivate(u, 30)}
                          disabled={isProcessing}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/40 cursor-pointer disabled:opacity-50 active:scale-95"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          ) : (
                            <Crown className="w-4 h-4 fill-current text-slate-950" />
                          )}
                          <span>Activar 30 Días</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN EN EL CENTRO CON DISEÑO DEL BUILDER */}
      {userToRevoke && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setUserToRevoke(null)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-b from-[#200d14] via-[#140b12] to-slate-950 border-2 border-rose-500/50 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(244,63,94,0.35)] space-y-5 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glow light */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Icon */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/25">
              <AlertTriangle className="w-7 h-7 text-rose-400" />
            </div>

            {/* Title & Description */}
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-white tracking-wide">
                ¿Desactivar TokkiiPass Premium?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Estás a punto de revocar la suscripción VIP para:
              </p>
            </div>

            {/* User Mini Preview Card */}
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3.5 text-left">
              {userToRevoke.avatar_url ? (
                <img
                  src={userToRevoke.avatar_url}
                  alt={userToRevoke.display_name}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-700 shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-black text-white text-base shrink-0">
                  {userToRevoke.display_name?.charAt(0) || userToRevoke.username?.charAt(0) || 'U'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">
                  {userToRevoke.display_name || userToRevoke.username}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono mt-0.5">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>
                    Quedan {getPremiumStatus(userToRevoke.tokkiipass_premium_expires_at).daysRemaining} días activos
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed px-1">
              Esta acción desactivará de inmediato los sobres dobles diarios, la bonificación dominical y el tema dorado en su perfil.
            </p>

            {/* Modal Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setUserToRevoke(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold text-xs transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmRevoke}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs transition-all shadow-lg shadow-rose-600/30 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <XCircle className="w-4 h-4" />
                <span>Sí, Desactivar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
