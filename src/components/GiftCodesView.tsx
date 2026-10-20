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
  X,
  HelpCircle
} from 'lucide-react';
import {
  fetchGiftCodesWithStats,
  createGiftCode,
  toggleGiftCodeActive,
  deleteGiftCode,
  type GiftCodeWithStats,
  type PackType
} from '../services/giftCodeService';
import {
  getDiscordWebhookUrl,
  setDiscordWebhookUrl,
  isDiscordWebhookConfigured,
  publishGiftCodeToDiscord,
  testDiscordWebhook,
  getDiscordNotifyMode,
  setDiscordNotifyMode,
  getDiscordCustomMessage,
  setDiscordCustomMessage,
  getDiscordCustomTitle,
  setDiscordCustomTitle,
  getDiscordCustomDescription,
  setDiscordCustomDescription,
  DEFAULT_DISCORD_MESSAGE,
  DEFAULT_DISCORD_TITLE,
  DEFAULT_DISCORD_DESCRIPTION,
  type DiscordNotifyMode
} from '../services/discordWebhookService';
import {
  formatWhatsAppMessage,
  getWhatsAppCustomTemplate,
  setWhatsAppCustomTemplate,
  resetWhatsAppTemplate,
  DEFAULT_WHATSAPP_TEMPLATE,
  getWhatsAppChannelUrl,
  setWhatsAppChannelUrl,
} from '../services/whatsappShareService';

const DiscordIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.031 2C6.511 2 2.025 6.486 2.025 12.006c0 1.838.498 3.633 1.445 5.209L2.01 22.01l4.945-1.428a9.98 9.98 0 0 0 5.076 1.39h.005c5.518 0 10.005-4.486 10.005-10.006C22.04 6.486 17.553 2 12.031 2zm0 18.286h-.004a8.28 8.28 0 0 1-4.214-1.155l-.302-.18-2.936.848.868-2.861-.197-.313a8.277 8.277 0 0 1-1.268-4.619c0-4.577 3.725-8.301 8.305-8.301 2.217 0 4.301.864 5.869 2.433a8.26 8.26 0 0 1 2.431 5.869c0 4.578-3.725 8.302-8.305 8.302zm4.551-6.223c-.249-.125-1.477-.729-1.706-.812-.229-.083-.396-.125-.563.125s-.646.812-.792.979-.292.188-.542.063c-.25-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.479-1.389-1.729-.146-.25-.016-.385.109-.509.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438s-.563-1.354-.771-1.854c-.203-.488-.41-.422-.563-.43-.146-.008-.313-.01-.479-.01-.167 0-.438.063-.667.313s-.875.854-.875 2.083c0 1.229.896 2.417 1.021 2.583.125.167 1.763 2.692 4.271 3.775.597.258 1.063.412 1.427.528.6.19 1.146.163 1.577.099.481-.072 1.477-.604 1.686-1.188.208-.583.208-1.083.146-1.188-.063-.104-.229-.167-.479-.292z"/>
  </svg>
);

interface GiftCodesViewProps {
  onShowToast: (msg: string) => void;
}

export const GiftCodesView: React.FC<GiftCodesViewProps> = ({ onShowToast }) => {
  const [codes, setCodes] = useState<GiftCodeWithStats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Discord Webhook State
  const [publishingCodeId, setPublishingCodeId] = useState<string | null>(null);
  const [publishedCodes, setPublishedCodes] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('tokkii_published_discord_codes');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set();
  });
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);
  const [discordWebhookUrl, setDiscordWebhookUrlState] = useState<string>(() => getDiscordWebhookUrl());
  const [discordNotifyMode, setDiscordNotifyModeState] = useState<DiscordNotifyMode>(() => getDiscordNotifyMode());
  const [discordCustomMessage, setDiscordCustomMessageState] = useState<string>(() => getDiscordCustomMessage());
  const [discordCustomTitle, setDiscordCustomTitleState] = useState<string>(() => getDiscordCustomTitle());
  const [discordCustomDesc, setDiscordCustomDescState] = useState<string>(() => getDiscordCustomDescription());
  const [isTestingDiscord, setIsTestingDiscord] = useState(false);
  const [discordTestFeedback, setDiscordTestFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [codeToPublishAfterConfig, setCodeToPublishAfterConfig] = useState<GiftCodeWithStats | null>(null);

  // WhatsApp Share State
  const [publishedWhatsAppCodes, setPublishedWhatsAppCodes] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('tokkii_published_whatsapp_codes');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set();
  });
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppTemplateInput, setWhatsAppTemplateInput] = useState<string>(() => getWhatsAppCustomTemplate());
  const [whatsAppChannelUrl, setWhatsAppChannelUrlState] = useState<string>(() => getWhatsAppChannelUrl());

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

  // Discord Publishing Handler
  const handlePublishToDiscord = async (code: GiftCodeWithStats) => {
    if (!isDiscordWebhookConfigured()) {
      setCodeToPublishAfterConfig(code);
      setDiscordTestFeedback(null);
      setIsDiscordModalOpen(true);
      return;
    }

    try {
      setPublishingCodeId(code.id);
      const result = await publishGiftCodeToDiscord(code);
      if (result.success) {
        setPublishedCodes((prev) => {
          const next = new Set(prev).add(code.id);
          try {
            localStorage.setItem('tokkii_published_discord_codes', JSON.stringify([...next]));
          } catch {}
          return next;
        });
        onShowToast(`✅ ¡Código "${code.code}" publicado en tu canal de Discord!`);
      } else {
        onShowToast(`❌ ${result.error || 'No se pudo publicar en Discord'}`);
      }
    } catch (err: any) {
      onShowToast(`❌ Error al conectar con Discord: ${err?.message || err}`);
    } finally {
      setPublishingCodeId(null);
    }
  };

  // WhatsApp Channel Share Handlers
  const handleShareWhatsApp = async (code: GiftCodeWithStats) => {
    const message = formatWhatsAppMessage(code, whatsAppTemplateInput);

    // 1. Copiar automáticamente el mensaje formateado al portapapeles (sin redirigir)
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
        copied = true;
      }
    } catch {}

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = message;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copied = true;
      } catch {}
    }

    // 2. Marcar como publicado / copiado persistentemente
    setPublishedWhatsAppCodes((prev) => {
      const next = new Set(prev).add(code.id);
      try {
        localStorage.setItem('tokkii_published_whatsapp_codes', JSON.stringify([...next]));
      } catch {}
      return next;
    });

    onShowToast(`📋 ¡Mensaje del código "${code.code}" copiado al portapapeles! Listo para pegar en tu canal.`);
  };

  const handleSaveWhatsAppTemplate = () => {
    setWhatsAppCustomTemplate(whatsAppTemplateInput);
    setWhatsAppChannelUrl(whatsAppChannelUrl);
    onShowToast('💾 Configuración y plantilla de Canal WhatsApp guardadas.');
    setIsWhatsAppModalOpen(false);
  };

  const handleResetWhatsAppTemplate = () => {
    resetWhatsAppTemplate();
    setWhatsAppTemplateInput(DEFAULT_WHATSAPP_TEMPLATE);
    onShowToast('🔄 Plantilla de WhatsApp restablecida al formato original.');
  };

  const handleInsertWhatsAppTag = (tag: string) => {
    setWhatsAppTemplateInput((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  // Discord Config Modal Handlers
  const handleSaveDiscordConfig = async (andPublish: boolean = false) => {
    if (!discordWebhookUrl.trim()) {
      setDiscordTestFeedback({ success: false, message: 'Por favor ingresa una URL de Webhook válida.' });
      return;
    }
    setDiscordWebhookUrl(discordWebhookUrl.trim());
    setDiscordNotifyMode(discordNotifyMode);
    setDiscordCustomMessage(discordCustomMessage);
    setDiscordCustomTitle(discordCustomTitle);
    setDiscordCustomDescription(discordCustomDesc);
    onShowToast('💾 Configuración de Discord guardada.');

    if (andPublish && codeToPublishAfterConfig) {
      const code = codeToPublishAfterConfig;
      setCodeToPublishAfterConfig(null);
      setIsDiscordModalOpen(false);
      await handlePublishToDiscord(code);
    } else {
      setIsDiscordModalOpen(false);
    }
  };

  const handleTestDiscordWebhook = async () => {
    if (!discordWebhookUrl.trim()) {
      setDiscordTestFeedback({ success: false, message: 'Ingresa la URL del Webhook primero.' });
      return;
    }
    try {
      setIsTestingDiscord(true);
      setDiscordTestFeedback(null);
      const res = await testDiscordWebhook(discordWebhookUrl.trim());
      if (res.success) {
        setDiscordTestFeedback({ success: true, message: '¡Prueba exitosa! Revisa el mensaje enviado a tu canal de Discord.' });
      } else {
        setDiscordTestFeedback({ success: false, message: res.error || 'Error al conectar con Discord.' });
      }
    } catch (err: any) {
      setDiscordTestFeedback({ success: false, message: err?.message || 'Error de red.' });
    } finally {
      setIsTestingDiscord(false);
    }
  };

  const handleInsertTag = (tag: string, target: 'message' | 'title' | 'desc') => {
    if (target === 'message') {
      setDiscordCustomMessageState((prev) => (prev ? `${prev} ${tag}` : tag));
    } else if (target === 'title') {
      setDiscordCustomTitleState((prev) => (prev ? `${prev} ${tag}` : tag));
    } else {
      setDiscordCustomDescState((prev) => (prev ? `${prev} ${tag}` : tag));
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0">
            <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
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
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-slate-950/80 border border-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium uppercase tracking-wider">Códigos</span>
            <span className="text-base sm:text-lg font-black text-white">{totalCodesCount}</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Activos</span>
            <span className="text-base sm:text-lg font-black text-emerald-400">{activeCodesCount}</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] text-amber-400 font-medium uppercase tracking-wider">Canjes Totales</span>
            <span className="text-base sm:text-lg font-black text-amber-400">{totalRedemptionsCount}</span>
          </div>
          <button
            onClick={loadCodes}
            disabled={isLoading}
            title="Refrescar datos"
            className="p-2.5 sm:p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Generator Form (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-2xl space-y-5 sm:space-y-6">
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
          {/* Search Bar & Discord Webhook Settings Button */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por código o descripción..."
                className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setDiscordTestFeedback(null);
                setIsDiscordModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-[#5865F2]/80 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm"
              title="Configurar el canal y Webhook de Discord"
            >
              <DiscordIcon className="w-4 h-4 text-[#5865F2]" />
              <span className="hidden sm:inline">Ajustes Discord</span>
              {isDiscordWebhookConfigured() ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Webhook Configurado" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Sin configurar" />
              )}
            </button>

            {/* Botón Ajustes/Plantilla WhatsApp */}
            <button
              type="button"
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-[#25D366]/80 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm"
              title="Configurar tu Canal de Difusión de WhatsApp y plantilla"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span className="hidden sm:inline">Canal WhatsApp</span>
              {whatsAppChannelUrl ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Canal configurado" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-500" title="Sin enlace de canal directo" />
              )}
            </button>
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
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                          <Ticket className={`w-4 h-4 ${code.is_active && !code.is_exhausted ? 'text-emerald-400' : 'text-slate-500'}`} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-nowrap">
                            <span className="font-mono font-black text-sm sm:text-base text-white tracking-wider whitespace-nowrap select-all">
                              {code.code}
                            </span>
                            <button
                              onClick={() => handleCopyCode(code.code, code.id)}
                              title="Copiar código al portapapeles"
                              className="p-1 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                            >
                              {copiedCodeId === code.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Status badge */}
                            {!code.is_active ? (
                              <span className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded-full border border-slate-700 whitespace-nowrap shrink-0">
                                PAUSADO
                              </span>
                            ) : code.is_exhausted ? (
                              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/40 whitespace-nowrap shrink-0">
                                AGOTADO
                              </span>
                            ) : (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 whitespace-nowrap shrink-0">
                                ACTIVO
                              </span>
                            )}
                          </div>

                          {code.description && (
                            <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">{code.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Right: Compact Share Buttons & Reward Pill */}
                      <div className="flex items-center gap-2 shrink-0 justify-end flex-wrap sm:flex-nowrap">
                        {/* Botón WhatsApp */}
                        <button
                          type="button"
                          onClick={() => handleShareWhatsApp(code)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm select-none active:scale-95 shrink-0 whitespace-nowrap ${
                            publishedWhatsAppCodes.has(code.id)
                              ? 'bg-[#25D366]/20 text-emerald-300 border border-[#25D366]/40 hover:bg-[#25D366]/30'
                              : 'bg-[#25D366] hover:bg-[#20ba5c] text-white border border-[#25D366]/80 shadow-[0_0_10px_rgba(37,211,102,0.3)]'
                          }`}
                          title={
                            publishedWhatsAppCodes.has(code.id)
                              ? 'Mensaje copiado para WhatsApp (Clic para volver a copiar)'
                              : 'Copiar mensaje para publicar en tu Canal de WhatsApp (sin redirigir)'
                          }
                        >
                          {publishedWhatsAppCodes.has(code.id) ? (
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                          ) : (
                            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                          )}
                          <span>
                            {publishedWhatsAppCodes.has(code.id) ? 'Copiado' : 'Canal WhatsApp'}
                          </span>
                        </button>

                        {/* Botón Discord */}
                        <button
                          type="button"
                          onClick={() => handlePublishToDiscord(code)}
                          disabled={publishingCodeId === code.id}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm select-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 whitespace-nowrap ${
                            publishedCodes.has(code.id)
                              ? 'bg-[#5865F2]/20 text-[#a5b4fc] border border-[#5865F2]/40 hover:bg-[#5865F2]/30'
                              : 'bg-[#5865F2] hover:bg-[#4752C4] text-white border border-[#5865F2]/80 shadow-[0_0_10px_rgba(88,101,242,0.3)]'
                          }`}
                          title="Publicar este código de regalo directamente en Discord"
                        >
                          {publishingCodeId === code.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : publishedCodes.has(code.id) ? (
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                          ) : (
                            <DiscordIcon className="w-3.5 h-3.5 text-white" />
                          )}
                          <span>
                            {publishingCodeId === code.id
                              ? 'Enviando...'
                              : publishedCodes.has(code.id)
                              ? 'Publicado'
                              : 'Discord'}
                          </span>
                        </button>

                        {/* Burbuja del tipo de sobre */}
                        <span className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border bg-gradient-to-r shrink-0 whitespace-nowrap ${getPackColor(code.pack_type)}`}>
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

      {/* MODAL: Discord Webhook Configuration */}
      {isDiscordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto no-scrollbar bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#5865F2]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#5865F2] flex items-center justify-center text-white shadow-[0_0_15px_rgba(88,101,242,0.4)]">
                  <DiscordIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base leading-tight">
                    Canal y Webhook de Discord
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Publicación automática de códigos en tu servidor
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsDiscordModalOpen(false);
                  setCodeToPublishAfterConfig(null);
                }}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If opening because of a pending code publication */}
            {codeToPublishAfterConfig && (
              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Configura tu Webhook para publicar:</span>
                  <span className="text-[11px] text-amber-200/90">
                    Estás a punto de publicar el código <strong className="font-mono bg-black/40 px-1 rounded">{codeToPublishAfterConfig.code}</strong>. Al guardar tu Webhook se enviará automáticamente a tu canal.
                  </span>
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-[#5865F2]" />
                ¿Cómo obtener el enlace del Webhook en Discord?
              </span>
              <ol className="space-y-1.5 text-slate-400 text-[11px] list-decimal list-inside pl-1">
                <li>En Discord, ve al canal donde publicarás y haz clic en el engranaje <strong>⚙️ Editar canal</strong>.</li>
                <li>Entra a la pestaña <strong>Integraciones</strong> y haz clic en <strong>Webhooks</strong>.</li>
                <li>Haz clic en <strong>Nuevo Webhook</strong>, asígnale el nombre que prefieras (ej: <em>EvilTokkii Bot</em>).</li>
                <li>Pulsa en <strong>Copiar URL de Webhook</strong> y pégala en el campo a continuación.</li>
              </ol>
            </div>

            {/* Webhook URL Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                URL del Webhook de Discord *
              </label>
              <input
                type="url"
                value={discordWebhookUrl}
                onChange={(e) => setDiscordWebhookUrlState(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#5865F2]"
              />
              <p className="text-[10px] text-slate-500">
                Se guardará de forma segura en tu navegador local para que no tengas que escribirlo cada vez.
              </p>
            </div>

            {/* Notify Mention Option */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                Notificación / Mención al publicar
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDiscordNotifyModeState('none')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    discordNotifyMode === 'none'
                      ? 'bg-[#5865F2]/20 border-[#5865F2] text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Sin mención
                </button>
                <button
                  type="button"
                  onClick={() => setDiscordNotifyModeState('here')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    discordNotifyMode === 'here'
                      ? 'bg-[#5865F2]/20 border-[#5865F2] text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  @here (Conectados)
                </button>
                <button
                  type="button"
                  onClick={() => setDiscordNotifyModeState('everyone')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    discordNotifyMode === 'everyone'
                      ? 'bg-[#5865F2]/20 border-[#5865F2] text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  @everyone (Todos)
                </button>
              </div>
            </div>

            {/* Custom Announcement Message Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  Mensaje de Anuncio (Chat de Discord)
                </label>
                <button
                  type="button"
                  onClick={() => setDiscordCustomMessageState(DEFAULT_DISCORD_MESSAGE)}
                  className="text-[10px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Restablecer
                </button>
              </div>
              <textarea
                rows={2}
                value={discordCustomMessage}
                onChange={(e) => setDiscordCustomMessageState(e.target.value)}
                placeholder="Escribe el mensaje de anuncio que acompañará la publicación en el chat..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#5865F2] resize-none"
              />
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400">
                <span className="text-slate-500">Variables dinámicas:</span>
                {[
                  { tag: '{codigo}', label: 'Código' },
                  { tag: '{sobre}', label: 'Sobre' },
                  { tag: '{usos}', label: 'Usos' },
                  { tag: '{nota}', label: 'Nota' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => handleInsertTag(item.tag, 'message')}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-[#5865F2]/30 hover:text-white border border-slate-700 transition-colors font-mono cursor-pointer"
                    title={`Insertar ${item.tag} en el mensaje`}
                  >
                    +{item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Title inside Embed Card */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  Título de la Tarjeta (Embed)
                </label>
                <button
                  type="button"
                  onClick={() => setDiscordCustomTitleState(DEFAULT_DISCORD_TITLE)}
                  className="text-[10px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Restablecer
                </button>
              </div>
              <input
                type="text"
                value={discordCustomTitle}
                onChange={(e) => setDiscordCustomTitleState(e.target.value)}
                placeholder="Título destacado dentro del embed..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#5865F2]"
              />
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400">
                <span className="text-slate-500">Variables dinámicas:</span>
                {[
                  { tag: '{codigo}', label: 'Código' },
                  { tag: '{sobre}', label: 'Sobre' },
                  { tag: '{usos}', label: 'Usos' },
                  { tag: '{nota}', label: 'Nota' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => handleInsertTag(item.tag, 'title')}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-[#5865F2]/30 hover:text-white border border-slate-700 transition-colors font-mono cursor-pointer"
                    title={`Insertar ${item.tag} en el título`}
                  >
                    +{item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Description inside Embed Card */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  Descripción dentro de la Tarjeta (Embed)
                </label>
                <button
                  type="button"
                  onClick={() => setDiscordCustomDescState(DEFAULT_DISCORD_DESCRIPTION)}
                  className="text-[10px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Restablecer
                </button>
              </div>
              <textarea
                rows={2}
                value={discordCustomDesc}
                onChange={(e) => setDiscordCustomDescState(e.target.value)}
                placeholder="Texto explicativo dentro del recuadro del embed..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#5865F2] resize-none"
              />
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400">
                <span className="text-slate-500">Variables dinámicas:</span>
                {[
                  { tag: '{codigo}', label: 'Código' },
                  { tag: '{sobre}', label: 'Sobre' },
                  { tag: '{usos}', label: 'Usos' },
                  { tag: '{nota}', label: 'Nota' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => handleInsertTag(item.tag, 'desc')}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-[#5865F2]/30 hover:text-white border border-slate-700 transition-colors font-mono cursor-pointer"
                    title={`Insertar ${item.tag} en la descripción`}
                  >
                    +{item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Feedback */}
            {discordTestFeedback && (
              <div
                className={`p-3 rounded-2xl border text-xs flex items-center gap-2 ${
                  discordTestFeedback.success
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/60 border-red-500/50 text-red-300'
                }`}
              >
                {discordTestFeedback.success ? (
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                )}
                <span>{discordTestFeedback.message}</span>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestDiscordWebhook}
                disabled={isTestingDiscord || !discordWebhookUrl.trim()}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
              >
                {isTestingDiscord ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <DiscordIcon className="w-3.5 h-3.5 text-[#5865F2]" />
                )}
                <span>{isTestingDiscord ? 'Probando...' : 'Probar Conexión'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDiscordModalOpen(false);
                    setCodeToPublishAfterConfig(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveDiscordConfig(Boolean(codeToPublishAfterConfig))}
                  disabled={!discordWebhookUrl.trim()}
                  className="py-2.5 px-5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs shadow-lg shadow-[#5865F2]/30 transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5 active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {codeToPublishAfterConfig ? 'Guardar y Publicar' : 'Guardar Configuración'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: WhatsApp Template & Preview */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto no-scrollbar bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#25D366]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,211,102,0.4)]">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base leading-tight">
                    Canal de Difusión de WhatsApp
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Configura tu canal y personaliza el mensaje de canje
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info Box: Explicación de cómo funciona con Canales */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
              <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="block text-emerald-200 mb-0.5">Copia directa al portapapeles (Sin redirigir)</strong>
                Al hacer clic en <strong>&ldquo;Canal WhatsApp&rdquo;</strong>, la app <strong>copia al instante todo el anuncio con el código y enlaces a tu portapapeles</strong> sin sacarte de la página ni abrir ventanas molestas. Luego solo ve a tu canal y haz <strong>Ctrl + V</strong>.
              </div>
            </div>

            {/* Input Enlace Canal de WhatsApp */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Enlace directo a tu Canal de WhatsApp</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Recomendado</span>
              </label>
              <input
                type="url"
                value={whatsAppChannelUrl}
                onChange={(e) => setWhatsAppChannelUrlState(e.target.value.trim())}
                placeholder="https://whatsapp.com/channel/0029Va..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#25D366] font-mono"
              />
              <p className="text-[11px] text-slate-400 leading-normal">
                💡 ¿Dónde obtenerlo? En WhatsApp entra a tu <strong>Canal</strong> &gt; presiona el nombre arriba &gt; <strong>&ldquo;Enlace del canal&rdquo;</strong> &gt; <strong>&ldquo;Copiar enlace&rdquo;</strong> y pégalo aquí. (Si lo dejas vacío, abrirá WhatsApp Web por defecto).
              </p>
            </div>

            {/* Editor de Plantilla */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Texto del Mensaje
                </label>
                <button
                  type="button"
                  onClick={handleResetWhatsAppTemplate}
                  className="text-[10px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Restablecer original
                </button>
              </div>
              <textarea
                rows={8}
                value={whatsAppTemplateInput}
                onChange={(e) => setWhatsAppTemplateInput(e.target.value)}
                placeholder="Escribe la plantilla del mensaje para WhatsApp..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#25D366] resize-none font-sans leading-relaxed"
              />
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400 pt-1">
                <span className="text-slate-500">Variables automáticas:</span>
                {[
                  { tag: '{codigo}', label: '🔑 Código' },
                  { tag: '{sobre}', label: '🎁 Sobre' },
                  { tag: '{usos}', label: '👥 Usos' },
                  { tag: '{limite_usuario}', label: '👤 Límite/Usuario' },
                  { tag: '{nota}', label: '📝 Nota' },
                  { tag: '{url}', label: '🌐 Link Web' },
                ].map(({ tag, label }) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleInsertWhatsAppTag(tag)}
                    className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vista Previa en tiempo real */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>Vista previa aproximada en WhatsApp:</span>
              </label>
              <div className="bg-[#0b141a] border border-[#202c33] rounded-2xl p-4 text-xs text-[#e9edef] whitespace-pre-wrap font-sans leading-relaxed shadow-inner">
                {formatWhatsAppMessage(
                  {
                    id: 'preview',
                    code: 'PROMO-TOKKII',
                    pack_type: 'pack_3',
                    pack_quantity: 1,
                    description: '¡Código de prueba para la comunidad!',
                    max_total_uses: 25,
                    max_uses_per_user: 1,
                    is_active: true,
                    created_at: new Date().toISOString(),
                    total_used: 0,
                    is_exhausted: false,
                    redemptions: [],
                  },
                  whatsAppTemplateInput
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveWhatsAppTemplate}
                className="py-2.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5c] text-white font-bold text-xs shadow-lg shadow-[#25D366]/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Guardar Plantilla</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
