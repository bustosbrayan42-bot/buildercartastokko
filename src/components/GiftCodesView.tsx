import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Plus,
  Copy,
  Check,
  Trash2,
  PauseCircle,
  PlayCircle,
  Users,
  Package,
  Sparkles,
  RefreshCw,
  Search,
  AlertCircle,
  Shuffle,
  X
} from 'lucide-react';
import {
  fetchGiftCodesWithStats,
  createGiftCode,
  toggleGiftCodeActive,
  deleteGiftCode,
  type GiftCodeWithStats,
  type PackType
} from '../services/giftCodeService';

interface GiftCodesViewProps {
  onShowToast: (msg: string) => void;
}

export const GiftCodesView: React.FC<GiftCodesViewProps> = ({ onShowToast }) => {
  const [codes, setCodes] = useState<GiftCodeWithStats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Form State
  const [codeWord, setCodeWord] = useState<string>('');
  const [packType, setPackType] = useState<PackType>('pack_3');
  const [packQuantity, setPackQuantity] = useState<number>(1);
  const [usageLimitType, setUsageLimitType] = useState<'single' | 'limited' | 'unlimited'>('limited');
  const [maxTotalUses, setMaxTotalUses] = useState<number>(10);
  const [maxUsesPerUser, setMaxUsesPerUser] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // Selected Code for Viewing Redemptions Modal
  const [selectedCodeForHistory, setSelectedCodeForHistory] = useState<GiftCodeWithStats | null>(null);

  const loadCodes = async () => {
    try {
      setIsLoading(true);
      const data = await fetchGiftCodesWithStats();
      setCodes(data);
    } catch (err) {
      console.error('Error fetching gift codes:', err);
      onShowToast('❌ Error al cargar los códigos de regalo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCodes();
  }, []);

  // Helper to generate a random code
  const handleGenerateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 6; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCodeWord(`TOKII-${rand}`);
    setFormError(null);
  };

  // Helper to copy code to clipboard
  const handleCopyCode = async (codeStr: string, id: string) => {
    try {
      await navigator.clipboard.writeText(codeStr);
      setCopiedCodeId(id);
      onShowToast(`📋 Código "${codeStr}" copiado al portapapeles.`);
      setTimeout(() => setCopiedCodeId(null), 2500);
    } catch {
      onShowToast(`Código: ${codeStr}`);
    }
  };

  // Helper to submit new code
  const handleCreateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const clean = codeWord.trim().toUpperCase();
    if (!clean) {
      setFormError('Por favor ingresa una palabra o código.');
      return;
    }

    if (packQuantity < 1) {
      setFormError('La cantidad de sobres debe ser al menos 1.');
      return;
    }

    let calculatedMaxTotal: number | null = null;
    if (usageLimitType === 'single') {
      calculatedMaxTotal = 1;
    } else if (usageLimitType === 'limited') {
      calculatedMaxTotal = Math.max(1, maxTotalUses);
    } else {
      calculatedMaxTotal = null; // unlimited
    }

    try {
      setIsSubmitting(true);
      await createGiftCode({
        code: clean,
        pack_type: packType,
        pack_quantity: packQuantity,
        max_total_uses: calculatedMaxTotal,
        max_uses_per_user: Math.max(1, maxUsesPerUser),
        description: description.trim() || undefined,
      });

      onShowToast(`✨ ¡Código de regalo "${clean}" creado y publicado con éxito!`);
      // Reset form
      setCodeWord('');
      setDescription('');
      setPackQuantity(1);
      setPackType('pack_3');
      setUsageLimitType('limited');
      setMaxTotalUses(10);
      setMaxUsesPerUser(1);
      // Reload
      await loadCodes();
    } catch (err: any) {
      console.error('Error creating gift code:', err);
      setFormError(err?.message || 'Error al crear el código.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to toggle active status
  const handleToggleActive = async (code: GiftCodeWithStats) => {
    try {
      await toggleGiftCodeActive(code.id, !code.is_active);
      setCodes((prev) =>
        prev.map((c) => (c.id === code.id ? { ...c, is_active: !c.is_active } : c))
      );
      onShowToast(
        code.is_active
          ? `⏸️ Código "${code.code}" pausado.`
          : `▶️ Código "${code.code}" reactivado.`
      );
    } catch (err: any) {
      onShowToast(`❌ Error: ${err?.message || 'No se pudo cambiar el estado'}`);
    }
  };

  // Selected Code for Deletion Confirmation Modal
  const [codeToDelete, setCodeToDelete] = useState<GiftCodeWithStats | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Helper to confirm delete code
  const handleConfirmDelete = async () => {
    if (!codeToDelete) return;
    try {
      setIsDeleting(true);
      await deleteGiftCode(codeToDelete.id);
      setCodes((prev) => prev.filter((c) => c.id !== codeToDelete.id));
      onShowToast(`🗑️ Código "${codeToDelete.code}" eliminado con éxito.`);
      setCodeToDelete(null);
    } catch (err: any) {
      onShowToast(`❌ Error: ${err?.message || 'No se pudo eliminar'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered codes
  const filteredCodes = codes.filter((c) =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Stats
  const totalCodesCount = codes.length;
  const activeCodesCount = codes.filter((c) => c.is_active && !c.is_exhausted).length;
  const totalRedemptionsCount = codes.reduce((acc, c) => acc + c.total_used, 0);

  const getPackLabel = (type: PackType, qty: number) => {
    const nameMap: Record<PackType, string> = {
      pack_1: 'Sobre de 1 Carta',
      pack_3: 'Sobre de 3 Cartas',
      pack_5: 'Sobre de 5 Cartas',
    };
    return `${qty}x ${nameMap[type] || 'Sobre'}`;
  };

  const getPackColor = (type: PackType) => {
    switch (type) {
      case 'pack_1':
        return 'from-blue-600 to-cyan-600 border-cyan-500/40 text-cyan-300';
      case 'pack_3':
        return 'from-purple-600 to-pink-600 border-pink-500/40 text-pink-300';
      case 'pack_5':
        return 'from-amber-600 to-orange-600 border-amber-500/40 text-amber-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                GENERADOR DE CÓDIGOS DE REGALO
              </h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                PROMOS & RECOMPENSAS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Crea palabras clave o códigos con sobres de regalo para que los espectadores los canjeen en el Visor.
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Códigos</span>
            <span className="text-lg font-black text-white">{totalCodesCount}</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Activos</span>
            <span className="text-lg font-black text-emerald-400">{activeCodesCount}</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] text-amber-400 font-medium uppercase tracking-wider">Canjes Totales</span>
            <span className="text-lg font-black text-amber-400">{totalRedemptionsCount}</span>
          </div>
          <button
            onClick={loadCodes}
            disabled={isLoading}
            title="Refrescar datos"
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Generator Form (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Crear Nuevo Código de Regalo
            </h3>
          </div>

          <form onSubmit={handleCreateCode} className="space-y-5">
            {/* Field 1: Code / Word Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Palabra Clave o Código *</span>
                <button
                  type="button"
                  onClick={handleGenerateRandomCode}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Generar aleatorio</span>
                </button>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={codeWord}
                  onChange={(e) => {
                    setCodeWord(e.target.value.toUpperCase().replace(/\s+/g, ''));
                    setFormError(null);
                  }}
                  placeholder="Ej: TOKII2026, DIRECTO_HOY, MISORPRESA"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 uppercase tracking-wider"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Se guardará automáticamente en mayúsculas sin espacios.
              </p>
            </div>

            {/* Field 2: Pack Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Tipo de Sobre a Regalar *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPackType('pack_1')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    packType === 'pack_1'
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Package className={`w-5 h-5 ${packType === 'pack_1' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold leading-tight">1 Carta</span>
                  <span className="text-[9px] text-slate-400">Básico</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackType('pack_3')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    packType === 'pack_3'
                      ? 'bg-purple-950/60 border-pink-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Package className={`w-5 h-5 ${packType === 'pack_3' ? 'text-pink-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold leading-tight">3 Cartas</span>
                  <span className="text-[9px] text-slate-400">Estándar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackType('pack_5')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    packType === 'pack_5'
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Package className={`w-5 h-5 ${packType === 'pack_5' ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold leading-tight">5 Cartas</span>
                  <span className="text-[9px] text-slate-400">Premium</span>
                </button>
              </div>
            </div>

            {/* Field 3: Pack Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Cantidad de Sobres Otorgados *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={packQuantity}
                  onChange={(e) => setPackQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm font-mono font-bold text-white text-center focus:outline-none focus:border-emerald-500"
                  required
                />
                <div className="flex gap-1.5">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPackQuantity(num)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        packQuantity === num
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      +{num}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Al canjear el código, el usuario recibirá exactamente esta cantidad del sobre seleccionado.
              </p>
            </div>

            {/* Field 4: Usage Limit Options */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <label className="block text-xs font-bold text-slate-200">
                Opciones de Límite de Uso Global *
              </label>

              <div className="space-y-2">
                {/* Single use */}
                <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="usageLimit"
                    checked={usageLimitType === 'single'}
                    onChange={() => setUsageLimitType('single')}
                    className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Uso Único (1 solo canje en total)</span>
                    <span className="text-[10px] text-slate-400">
                      El primer usuario que lo ingrese se lleva el premio y el código se agota de inmediato.
                    </span>
                  </div>
                </label>

                {/* Multiple limited uses */}
                <label className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="usageLimit"
                    checked={usageLimitType === 'limited'}
                    onChange={() => setUsageLimitType('limited')}
                    className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 accent-emerald-500 mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-white block">Cantidad de Usos (Límite total)</span>
                    <span className="text-[10px] text-slate-400 block mb-2">
                      El código se podrá canjear hasta alcanzar este número total de veces.
                    </span>
                    {usageLimitType === 'limited' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Máximo total:</span>
                        <input
                          type="number"
                          min="1"
                          max="99999"
                          value={maxTotalUses}
                          onChange={(e) => setMaxTotalUses(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-white text-center focus:outline-none focus:border-emerald-500"
                        />
                        <span className="text-[11px] text-slate-400">canjes</span>
                      </div>
                    )}
                  </div>
                </label>

                {/* Unlimited uses */}
                <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="usageLimit"
                    checked={usageLimitType === 'unlimited'}
                    onChange={() => setUsageLimitType('unlimited')}
                    className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Ilimitado</span>
                    <span className="text-[10px] text-slate-400">
                      Sin límite global de canjes (ideal para eventos masivos o bienvenida).
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Field 5: Limit per user */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                Cantidad de Usos por Usuario *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={maxUsesPerUser}
                  onChange={(e) => setMaxUsesPerUser(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-white text-center focus:outline-none focus:border-emerald-500"
                  required
                />
                <span className="text-xs text-slate-400">
                  {maxUsesPerUser === 1 ? 'uso por usuario (Recomendado)' : 'usos por cada cuenta de Twitch'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Evita que un mismo usuario canjee repetidamente el mismo código.
              </p>
            </div>

            {/* Field 6: Note / Description (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Nota o Descripción (Opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Sorteo Stream Especial, Regalo Halloween, etc."
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Form Error */}
            {formError && (
              <div className="p-3 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center gap-2 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publicando Código...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Crear y Publicar Código</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: List of Existing Codes (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código o descripción..."
              className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* List of Codes */}
          {isLoading ? (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400 font-medium">Cargando códigos de regalo y estadísticas...</p>
            </div>
          ) : filteredCodes.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl">
              <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">
                {codes.length === 0 ? 'No hay códigos de regalo creados' : 'No se encontraron códigos'}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {codes.length === 0
                  ? 'Crea tu primer código en el formulario de la izquierda para comenzar a regalar sobres a tus espectadores.'
                  : 'Prueba con otro término de búsqueda.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredCodes.map((code) => {
                const percentUsed = code.max_total_uses
                  ? Math.min(100, Math.round((code.total_used / code.max_total_uses) * 100))
                  : 0;

                const isSingleUse = code.max_total_uses === 1;

                return (
                  <div
                    key={code.id}
                    className={`p-5 rounded-3xl border transition-all duration-200 bg-slate-900/70 backdrop-blur-md ${
                      !code.is_active
                        ? 'border-slate-800 opacity-60'
                        : code.is_exhausted
                        ? 'border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.05)]'
                        : 'border-slate-800 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Left: Code badge and info */}
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                          <Ticket className={`w-5 h-5 ${code.is_active && !code.is_exhausted ? 'text-emerald-400' : 'text-slate-500'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-base text-white tracking-wider">
                              {code.code}
                            </span>
                            <button
                              onClick={() => handleCopyCode(code.code, code.id)}
                              title="Copiar código al portapapeles"
                              className="p-1 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              {copiedCodeId === code.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Status badge */}
                            {!code.is_active ? (
                              <span className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded-full border border-slate-700">
                                PAUSADO
                              </span>
                            ) : code.is_exhausted ? (
                              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                                AGOTADO
                              </span>
                            ) : (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                                ACTIVO
                              </span>
                            )}
                          </div>

                          {code.description && (
                            <p className="text-[11px] text-slate-400 mt-0.5">{code.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Right: Reward Pill */}
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border bg-gradient-to-r ${getPackColor(code.pack_type)}`}>
                          🎁 {getPackLabel(code.pack_type, code.pack_quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Progress & Metrics */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 text-slate-400">
                        {/* Usage Counter */}
                        <div className="flex items-center gap-1.5 font-mono">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-white font-bold">{code.total_used}</span>
                          <span>/</span>
                          <span>
                            {code.max_total_uses === null
                              ? '∞ (Ilimitado)'
                              : isSingleUse
                              ? '1 (Uso único)'
                              : `${code.max_total_uses} usos`}
                          </span>
                        </div>

                        {/* Limit per user */}
                        <span className="text-[11px] bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800 text-slate-400">
                          {code.max_uses_per_user === 1
                            ? '1 canje máx. por usuario'
                            : `${code.max_uses_per_user} canjes máx. por usuario`}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5">
                        {/* View Redemptions History */}
                        <button
                          onClick={() => setSelectedCodeForHistory(code)}
                          title="Ver quiénes canjearon este código"
                          className="px-2.5 py-1 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Users className="w-3 h-3 text-cyan-400" />
                          <span>Ver Canjes ({code.redemptions.length})</span>
                        </button>

                        {/* Pause / Resume */}
                        <button
                          onClick={() => handleToggleActive(code)}
                          title={code.is_active ? 'Pausar código' : 'Reanudar código'}
                          className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                            code.is_active
                              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                              : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/60'
                          }`}
                        >
                          {code.is_active ? (
                            <PauseCircle className="w-3.5 h-3.5" />
                          ) : (
                            <PlayCircle className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setCodeToDelete(code)}
                          title="Eliminar código"
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-950 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Usage Progress Bar (if limited) */}
                    {code.max_total_uses !== null && (
                      <div className="mt-2.5 w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800/80">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${
                            code.is_exhausted
                              ? 'bg-amber-500'
                              : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          }`}
                          style={{ width: `${percentUsed}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Redemptions History */}
      {selectedCodeForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  Historial de Canjes: <span className="font-mono text-emerald-400">{selectedCodeForHistory.code}</span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedCodeForHistory(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Premio: <strong className="text-white">{getPackLabel(selectedCodeForHistory.pack_type, selectedCodeForHistory.pack_quantity)}</strong></span>
              <span>Total Canjeados: <strong className="text-emerald-400 font-mono">{selectedCodeForHistory.total_used}</strong></span>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {selectedCodeForHistory.redemptions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Aún ningún usuario ha canjeado este código.
                </div>
              ) : (
                selectedCodeForHistory.redemptions.map((r, idx) => (
                  <div
                    key={r.id || idx}
                    className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center overflow-hidden shrink-0">
                        {r.avatar_url ? (
                          <img src={r.avatar_url} alt={r.display_name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-bold text-white text-xs">{r.display_name?.charAt(0) || 'U'}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white leading-tight">{r.display_name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">@{r.username}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {new Date(r.redeemed_at).toLocaleDateString()} {new Date(r.redeemed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        +{selectedCodeForHistory.pack_quantity * (r.count || 1)} {(selectedCodeForHistory.pack_quantity * (r.count || 1)) === 1 ? 'Sobre' : 'Sobres'}
                        {(r.count || 1) > 1 ? ` (${r.count} canjes)` : ''}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setSelectedCodeForHistory(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Custom Centered Delete Confirmation with Builder Studio Pro Design */}
      {codeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-center animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute -top-16 -left-16 w-36 h-36 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Trash icon in red circle */}
            <div className="relative w-16 h-16 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center mx-auto text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.25)]">
              <Trash2 className="w-8 h-8" />
            </div>

            <div className="relative space-y-2">
              <h3 className="font-black text-base text-white tracking-wide">
                ¿Eliminar Código de Regalo?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                ¿Estás seguro de que deseas eliminar permanentemente el código{' '}
                <strong className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                  {codeToDelete.code}
                </strong>
                ? Los espectadores ya no podrán canjearlo.
              </p>
              {codeToDelete.total_used > 0 && (
                <div className="text-[11px] text-amber-300 bg-amber-950/60 border border-amber-500/40 rounded-xl py-2 px-3 inline-block">
                  ⚠️ Este código ya fue canjeado <strong>{codeToDelete.total_used}</strong>{' '}
                  {codeToDelete.total_used === 1 ? 'vez' : 'veces'} en total.
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="relative flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCodeToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs shadow-lg shadow-red-950/50 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Sí, Eliminar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
