import React, { useState } from 'react';
import type { CardData, CardElement, Rarity, HoloStyle, CardAttack } from '../types/card';
import { RARITY_CONFIGS, ELEMENT_CONFIGS } from '../data/configs';
import {
  Sparkles,
  Upload,
  Plus,
  Trash2,
  Layers,
  Zap,
  Shield,
  Palette,
  Type,
  Maximize,
  RotateCw,
  RotateCcw,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Move,
  Frame,
  Cloud,
  Loader2,
  CheckCircle2,
  AlertCircle,
  CloudUpload
} from 'lucide-react';
import { AttackEmojiPicker } from './AttackEmojiPicker';
import { uploadImageToR2 } from '../utils/r2Storage';
import { compressImageFile } from '../utils/imageCompressor';

interface CardEditorPanelProps {
  card: CardData;
  onChange: (updated: CardData) => void;
  onSaveToSupabase?: (card: CardData) => Promise<void>;
}

export const CardEditorPanel: React.FC<CardEditorPanelProps> = ({
  card,
  onChange,
  onSaveToSupabase,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'art' | 'holo' | 'attacks' | 'stats'>('info');
  const [targetAttackIndex, setTargetAttackIndex] = useState<number>(0);

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

  const rarities: Rarity[] = [
    'common',
    'uncommon',
    'rare',
    'super_rare',
    'ultra_rare',
    'secret_rare',
  ];

  const holoStyles: Array<{ id: HoloStyle; name: string }> = [
    { id: 'none', name: 'Sin Holo (Mate)' },
    { id: 'silver', name: 'Silver Sheen' },
    { id: 'prismatic', name: 'Prismático Arcoíris' },
    { id: 'gold_stars', name: 'Gold Starlight' },
    { id: 'cosmic', name: 'Cósmico Radial' },
    { id: 'secret_gold', name: 'Secret Gold Mythic' },
    { id: 'glitter', name: 'Holo Glitter Spark' },
    { id: 'wave', name: 'Wave Refraction' },
  ];

  const [isUploadingR2, setIsUploadingR2] = useState<boolean>(false);
  const [isSavingSupabase, setIsSavingSupabase] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSaveSupabase = async () => {
    if (!onSaveToSupabase) return;
    try {
      setIsSavingSupabase(true);
      await onSaveToSupabase(card);
      setUploadStatus({
        type: 'success',
        message: '¡Carta guardada y sincronizada en Supabase con éxito!',
      });
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err: any) {
      setUploadStatus({
        type: 'error',
        message: `Error al guardar en Supabase: ${err?.message || 'Error de conexión'}`,
      });
    } finally {
      setIsSavingSupabase(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file, 1000, 1400, 0.85);
      onChange({
        ...card,
        image: compressedDataUrl,
      });
      setUploadStatus({
        type: 'success',
        message: '¡Imagen cargada y optimizada en memoria local!',
      });
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err: any) {
      console.error('Error compressing image:', err);
      // Fallback to FileReader
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            ...card,
            image: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleR2Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingR2(true);
      setUploadStatus(null);
      const publicUrl = await uploadImageToR2(file, 'cards');
      onChange({
        ...card,
        image: publicUrl,
      });
      setUploadStatus({
        type: 'success',
        message: '¡Imagen subida exitosamente a Cloudflare R2!',
      });
      setTimeout(() => setUploadStatus(null), 5000);
    } catch (err: any) {
      console.error('R2 upload failed:', err);
      setUploadStatus({
        type: 'error',
        message: `Error al subir a R2: ${err?.message || 'Error de conexión'}`,
      });
    } finally {
      setIsUploadingR2(false);
    }
  };

  const handleAddAttack = () => {
    const newAttack: CardAttack = {
      id: `atk-${Date.now()}`,
      name: 'Nuevo Ataque',
      cost: [card.element],
      damage: '50',
      description: 'Efecto especial de la habilidad o ataque.',
    };
    onChange({
      ...card,
      attacks: [...(card.attacks || []), newAttack],
    });
  };

  const handleUpdateAttack = (index: number, updated: Partial<CardAttack>) => {
    const newAttacks = [...(card.attacks || [])];
    newAttacks[index] = { ...newAttacks[index], ...updated };
    onChange({ ...card, attacks: newAttacks });
  };

  const handleDeleteAttack = (index: number) => {
    const newAttacks = (card.attacks || []).filter((_, i) => i !== index);
    onChange({ ...card, attacks: newAttacks });
  };

  const handleToggleCostEnergy = (atkIndex: number, elem: CardElement) => {
    const attack = card.attacks[atkIndex];
    if (!attack) return;
    const currentCost = [...attack.cost];
    if (currentCost.length >= 5) {
      currentCost.pop();
    }
    currentCost.push(elem);
    handleUpdateAttack(atkIndex, { cost: currentCost });
  };

  const handleRemoveCostEnergy = (atkIndex: number, energyIdx: number) => {
    const attack = card.attacks[atkIndex];
    if (!attack) return;
    const currentCost = attack.cost.filter((_, i) => i !== energyIdx);
    handleUpdateAttack(atkIndex, { cost: currentCost });
  };

  const handleInsertEmojiToName = (emoji: string, atkIdx?: number) => {
    const attacks = card.attacks || [];
    if (!attacks.length) return;
    const targetIdx = atkIdx !== undefined ? atkIdx : Math.min(targetAttackIndex, attacks.length - 1);
    const atk = attacks[targetIdx];
    if (atk) {
      handleUpdateAttack(targetIdx, { name: atk.name ? `${atk.name} ${emoji}` : emoji });
    }
  };

  const handleInsertEmojiToDesc = (emoji: string, atkIdx?: number) => {
    const attacks = card.attacks || [];
    if (!attacks.length) return;
    const targetIdx = atkIdx !== undefined ? atkIdx : Math.min(targetAttackIndex, attacks.length - 1);
    const atk = attacks[targetIdx];
    if (atk) {
      handleUpdateAttack(targetIdx, {
        description: atk.description ? `${atk.description} ${emoji}` : emoji,
      });
    }
  };

  const handleSetAttackTag = (tag: string, atkIdx?: number) => {
    const attacks = card.attacks || [];
    if (!attacks.length) return;
    const targetIdx = atkIdx !== undefined ? atkIdx : Math.min(targetAttackIndex, attacks.length - 1);
    handleUpdateAttack(targetIdx, { tag });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col h-full max-h-[88vh]">
      {/* Editor Tab Navigation (All 5 tabs fully visible, no horizontal scroll) */}
      <div className="grid grid-cols-5 gap-1.5 p-2 bg-slate-950 rounded-2xl border border-slate-800 shrink-0">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'info'
              ? 'bg-slate-800 text-amber-400 border-amber-400/80 shadow-[0_0_10px_rgba(234,179,8,0.25)]'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Type className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Identidad</span>
        </button>

        <button
          onClick={() => setActiveTab('art')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'art'
              ? 'bg-slate-800 text-amber-400 border-amber-400/80 shadow-[0_0_10px_rgba(234,179,8,0.25)]'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Arte & Encuadre</span>
        </button>

        <button
          onClick={() => setActiveTab('holo')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'holo'
              ? 'bg-slate-800 text-amber-400 border-amber-400/80 shadow-[0_0_10px_rgba(234,179,8,0.25)]'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Rareza & Foil</span>
        </button>

        <button
          onClick={() => setActiveTab('attacks')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'attacks'
              ? 'bg-slate-800 text-amber-400 border-amber-400/80 shadow-[0_0_10px_rgba(234,179,8,0.25)]'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Ataques ({card.attacks?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'stats'
              ? 'bg-slate-800 text-amber-400 border-amber-400/80 shadow-[0_0_10px_rgba(234,179,8,0.25)]'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Shield className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Atributos</span>
        </button>
      </div>

      {/* Editor Tab Content */}
      <div className="flex-1 overflow-y-auto mt-4 px-1 pr-1.5 space-y-4">
        {/* TAB 1: IDENTIDAD & LORE */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Nombre de la Carta
                </label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => onChange({ ...card, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Subtítulo / Clase
                </label>
                <input
                  type="text"
                  value={card.subtitle}
                  onChange={(e) => onChange({ ...card, subtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Element (Full 10 Element Grid) & HP */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Elemento Principal (10 Elementos Temáticos)
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 p-2 bg-slate-950 rounded-2xl border border-slate-800">
                  {elements.map((elem) => {
                    const cfg = ELEMENT_CONFIGS[elem];
                    const selected = card.element === elem;
                    return (
                      <button
                        key={elem}
                        type="button"
                        onClick={() => onChange({ ...card, element: elem })}
                        className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all border ${
                          selected
                            ? 'bg-slate-800 border-2 border-amber-400 text-white shadow-[0_0_12px_rgba(234,179,8,0.3)]'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                        }`}
                        title={cfg.name}
                      >
                        <span className="text-base">{cfg.symbol}</span>
                        <span className="text-[9px] font-semibold truncate max-w-full px-0.5 mt-0.5">{cfg.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Puntos de Vida (HP)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    max="999"
                    step="10"
                    value={card.hp}
                    onChange={(e) => onChange({ ...card, hp: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <div className="flex gap-1">
                    {[100, 150, 200, 250, 300].map((quickHp) => (
                      <button
                        key={quickHp}
                        type="button"
                        onClick={() => onChange({ ...card, hp: quickHp })}
                        className="px-2 py-1 rounded-lg bg-slate-800 text-[10px] font-bold text-slate-300 hover:bg-slate-700"
                      >
                        {quickHp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lore & Collector Info */}
            <div className="space-y-3 pt-1 border-t border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Texto de Ambientación (Flavor Lore)
                </label>
                <textarea
                  rows={2}
                  value={card.flavorText}
                  onChange={(e) => onChange({ ...card, flavorText: e.target.value })}
                  placeholder="Texto descriptivo o frase célebre..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    N° Carta
                  </label>
                  <input
                    type="text"
                    value={card.cardNumber}
                    onChange={(e) => onChange({ ...card, cardNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Total del Set
                  </label>
                  <input
                    type="text"
                    value={card.totalInSet}
                    onChange={(e) => onChange({ ...card, totalInSet: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Ilustrador / Artista
                  </label>
                  <input
                    type="text"
                    value={card.artist}
                    onChange={(e) => onChange({ ...card, artist: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IMAGEN & ENCUADRE */}
        {activeTab === 'art' && (
          <div className="space-y-4">
            {/* Upload & Image Source */}
            {/* Upload & Image Source */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Cloud className="w-4 h-4 text-amber-400" />
                  Origen de la Imagen / Cloudflare R2
                </label>
                {isUploadingR2 && (
                  <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Subiendo a R2...
                  </span>
                )}
              </div>

              {uploadStatus && (
                <div
                  className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border ${
                    uploadStatus.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/60 border-red-500/40 text-red-300'
                  }`}
                >
                  {uploadStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{uploadStatus.message}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Direct R2 Upload Button */}
                <label className={`cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl shadow-lg transition-all ${
                  isUploadingR2 ? 'opacity-50 pointer-events-none' : 'active:scale-95'
                }`}>
                  <Cloud className="w-4 h-4" />
                  Subir a Cloudflare R2
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleR2Upload}
                    disabled={isUploadingR2}
                    className="hidden"
                  />
                </label>

                {/* Local Memory File (Temporary) */}
                <label className="cursor-pointer flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium py-2.5 px-3 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors">
                  <Upload className="w-4 h-4 text-slate-400" />
                  Cargar Local (Base64)
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Direct URL Input */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">URL de Imagen (R2 / Web):</span>
                  <button
                    type="button"
                    onClick={() => onChange({ ...card, image: '/cards/tokkii_photographer.jpg' })}
                    className="text-amber-400 hover:underline"
                  >
                    Usar Tokkii Default
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={card.image}
                    onChange={(e) => onChange({ ...card, image: e.target.value })}
                    placeholder="https://pub-0bf9a87cec964ff49bfd058873c948c3.r2.dev/cards/..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  {onSaveToSupabase && (
                    <button
                      type="button"
                      onClick={handleSaveSupabase}
                      disabled={isSavingSupabase}
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
                      title="Forzar guardado inmediato en Supabase"
                    >
                      {isSavingSupabase ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CloudUpload className="w-3.5 h-3.5" />
                      )}
                      <span>Guardar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Layout Mode (Standard vs Full Art) */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Modo de Diseño del Marco
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...card, isFullArt: false })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                    !card.isFullArt
                      ? 'bg-slate-800 border-amber-400 text-white shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  Marco Estándar TCG
                </button>

                <button
                  type="button"
                  onClick={() => onChange({ ...card, isFullArt: true })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                    card.isFullArt
                      ? 'bg-slate-800 border-amber-400 text-white shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Full Art Translúcido
                </button>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                {card.isFullArt
                  ? '✨ Modo Full Art: La imagen se expande en todo el fondo con paneles glassmórficos.'
                  : '📐 Marco Estándar: Diseño clásico con ventana central y panel inferior opaco.'}
              </p>
            </div>

            {/* Fit Mode Toggle */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Modo de Ajuste de la Imagen
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...card, imageFit: 'cover' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                    (card.imageFit || 'cover') === 'cover'
                      ? 'bg-slate-800 border-amber-400 text-white shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Maximize className="w-3.5 h-3.5 text-amber-400" />
                  Cubrir Fondo (Cover)
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...card, imageFit: 'contain' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                    card.imageFit === 'contain'
                      ? 'bg-slate-800 border-amber-400 text-white shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Frame className="w-3.5 h-3.5 text-cyan-400" />
                  Ajustar Completa (Contain)
                </button>
              </div>
            </div>

            {/* 360° ROTATION CONTROLS */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  Rotación 360° de la Imagen:
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                  {card.imageRotation || 0}°
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={card.imageRotation || 0}
                onChange={(e) => onChange({ ...card, imageRotation: parseInt(e.target.value) || 0 })}
                className="w-full accent-amber-500 cursor-pointer"
              />

              {/* Quick Angle Presets & Nudge Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[0, 90, 180, 270].map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => onChange({ ...card, imageRotation: angle })}
                    className={`py-1.5 rounded-lg text-[11px] font-bold transition-colors border ${
                      (card.imageRotation || 0) === angle
                        ? 'bg-amber-500 text-black border-amber-400 font-extrabold'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const current = card.imageRotation || 0;
                    const next = (current - 90 + 360) % 360;
                    onChange({ ...card, imageRotation: next });
                  }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center gap-1 border border-slate-700"
                >
                  <RotateCcw className="w-3 h-3 text-cyan-400" />
                  -90°
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = card.imageRotation || 0;
                    const next = (current - 15 + 360) % 360;
                    onChange({ ...card, imageRotation: next });
                  }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center gap-1 border border-slate-700"
                >
                  -15°
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = card.imageRotation || 0;
                    const next = (current + 15) % 360;
                    onChange({ ...card, imageRotation: next });
                  }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center gap-1 border border-slate-700"
                >
                  +15°
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = card.imageRotation || 0;
                    const next = (current + 90) % 360;
                    onChange({ ...card, imageRotation: next });
                  }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center gap-1 border border-slate-700"
                >
                  <RotateCw className="w-3 h-3 text-amber-400" />
                  +90°
                </button>
              </div>
            </div>

            {/* ZOOM CONTROLS */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-amber-400" />
                  Zoom del Arte:
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                  {Math.round((card.imageZoom || 1) * 100)}%
                </span>
              </div>

              <input
                type="range"
                min="0.3"
                max="3.5"
                step="0.02"
                value={card.imageZoom || 1}
                onChange={(e) => onChange({ ...card, imageZoom: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[0.5, 1.0, 1.5, 2.0].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => onChange({ ...card, imageZoom: z })}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors border ${
                      Math.abs((card.imageZoom || 1) - z) < 0.05
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {Math.round(z * 100)}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const current = card.imageZoom || 1;
                    onChange({ ...card, imageZoom: Math.max(0.3, parseFloat((current - 0.1).toFixed(2))) });
                  }}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  title="Reducir 10%"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = card.imageZoom || 1;
                    onChange({ ...card, imageZoom: Math.min(3.5, parseFloat((current + 0.1).toFixed(2))) });
                  }}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  title="Aumentar 10%"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* POSITIONING CONTROLS (OFFSET X & Y) */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-amber-400" />
                  Posición y Desplazamiento
                </span>
                <button
                  type="button"
                  onClick={() => onChange({ ...card, imageOffsetX: 0, imageOffsetY: 0 })}
                  className="text-[10px] font-bold text-amber-400 hover:text-amber-300 underline"
                >
                  Centrar (0,0)
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Eje X (Horizontal):</span>
                    <span className="font-mono text-amber-400 font-bold">{card.imageOffsetX || 0}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    step="2"
                    value={card.imageOffsetX || 0}
                    onChange={(e) => onChange({ ...card, imageOffsetX: parseInt(e.target.value) || 0 })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Eje Y (Vertical):</span>
                    <span className="font-mono text-amber-400 font-bold">{card.imageOffsetY || 0}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    step="2"
                    value={card.imageOffsetY || 0}
                    onChange={(e) => onChange({ ...card, imageOffsetY: parseInt(e.target.value) || 0 })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Reset All Framing Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...card,
                      imageZoom: 1,
                      imageRotation: 0,
                      imageOffsetX: 0,
                      imageOffsetY: 0,
                      imageFit: 'cover',
                    })
                  }
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  Restablecer Todo el Encuadre (Zoom, Rotación, Posición)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RAREZA & FOIL SHADERS */}
        {activeTab === 'holo' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Nivel de Rareza
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 bg-slate-950 rounded-2xl border border-slate-800">
                {rarities.map((r) => {
                  const cfg = RARITY_CONFIGS[r];
                  const selected = card.rarity === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => onChange({ ...card, rarity: r })}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all flex flex-col gap-0.5 ${
                        selected
                          ? 'bg-slate-800 border-2 border-amber-400 text-white shadow-[0_0_12px_rgba(234,179,8,0.35)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span style={{ color: cfg.color }} className="truncate">{cfg.name}</span>
                        <span className="text-[10px] text-amber-300 font-mono">{cfg.shortName}</span>
                      </div>
                      <span className="text-[8px] text-amber-400">{'★'.repeat(cfg.stars)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Holo Shader Style Override */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Estilo de Lámina Holográfica (Foil Shader)
              </label>
              <select
                value={card.customHoloStyle || RARITY_CONFIGS[card.rarity].defaultHoloStyle}
                onChange={(e) => onChange({ ...card, customHoloStyle: e.target.value as HoloStyle })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {holoStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Foil Opacity & Glare Sliders */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span>Intensidad de Lámina Foil:</span>
                  <span className="text-amber-400 font-mono">
                    {Math.round((card.customFoilOpacity !== undefined ? card.customFoilOpacity : 0.4) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={card.customFoilOpacity !== undefined ? card.customFoilOpacity : 0.4}
                  onChange={(e) => onChange({ ...card, customFoilOpacity: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span>Brillo Especular (Glare Reflection):</span>
                  <span className="text-amber-400 font-mono">
                    {Math.round((card.customGlareOpacity !== undefined ? card.customGlareOpacity : 0.28) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.02"
                  value={card.customGlareOpacity !== undefined ? card.customGlareOpacity : 0.28}
                  onChange={(e) => onChange({ ...card, customGlareOpacity: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ATAQUES Y HABILIDADES */}
        {activeTab === 'attacks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Lista de Ataques y Habilidades ({card.attacks?.length || 0})
              </span>
              <button
                type="button"
                onClick={handleAddAttack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow transition-all transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                Añadir Ataque
              </button>
            </div>

            {/* Attack Target Selector (when multiple attacks exist) */}
            {(card.attacks?.length || 0) > 1 && (
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold px-2">Editar Ataque:</span>
                {card.attacks?.map((atk, idx) => (
                  <button
                    key={atk.id || idx}
                    type="button"
                    onClick={() => setTargetAttackIndex(idx)}
                    className={`flex-1 py-1 px-2 rounded-xl text-xs font-bold truncate transition-all border ${
                      targetAttackIndex === idx
                        ? 'bg-slate-800 border-amber-400 text-amber-300 shadow'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    #{idx + 1} {atk.name || 'Sin Nombre'}
                  </button>
                ))}
              </div>
            )}

            {/* EXTENSIVE EMOJI PICKER DROPDOWN */}
            {(card.attacks?.length || 0) > 0 && (
              <AttackEmojiPicker
                onInsertToName={(emoji) => handleInsertEmojiToName(emoji)}
                onInsertToDescription={(emoji) => handleInsertEmojiToDesc(emoji)}
                onSetTag={(tag) => handleSetAttackTag(tag)}
                currentTag={card.attacks?.[Math.min(targetAttackIndex, (card.attacks?.length || 1) - 1)]?.tag}
              />
            )}

            {/* Attack Cards List */}
            {card.attacks?.map((atk, idx) => {
              const isCurrentTarget = targetAttackIndex === idx;
              return (
                <div
                  key={atk.id || idx}
                  onClick={() => setTargetAttackIndex(idx)}
                  className={`bg-slate-950 p-4 rounded-2xl border space-y-3 relative transition-all ${
                    isCurrentTarget
                      ? 'border-amber-400/80 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-amber-400/40'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Attack Title, Tag and Damage */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex-1 w-full flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded-md border border-slate-800 shrink-0">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={atk.name}
                        onChange={(e) => handleUpdateAttack(idx, { name: e.target.value })}
                        placeholder="Nombre del ataque (ej. 💥 Golpe Titánico)..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
                      {/* Tag Input */}
                      <div className="relative w-28">
                        <input
                          type="text"
                          value={atk.tag || ''}
                          onChange={(e) => handleUpdateAttack(idx, { tag: e.target.value })}
                          placeholder="Tag (ej. ⚡ ULTIMATE)"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-[10px] font-black text-amber-400 placeholder:text-slate-600 focus:outline-none text-center"
                        />
                      </div>

                      {/* Damage Input */}
                      <div className="w-20">
                        <input
                          type="text"
                          value={atk.damage}
                          onChange={(e) => handleUpdateAttack(idx, { damage: e.target.value })}
                          placeholder="Daño (120+)"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs font-black text-white text-center focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAttack(idx);
                        }}
                        className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                        title="Eliminar ataque"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Energy Cost Selector */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-900">
                    <span className="text-[10px] text-slate-400 font-bold">Coste de Energía:</span>
                    <div className="flex items-center gap-1">
                      {atk.cost?.map((c, energyIdx) => (
                        <button
                          key={energyIdx}
                          type="button"
                          onClick={() => handleRemoveCostEnergy(idx, energyIdx)}
                          title="Clic para remover"
                          className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] hover:border-red-400 transition-all hover:scale-110"
                        >
                          {ELEMENT_CONFIGS[c]?.symbol || '•'}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-1 ml-auto">
                      {elements.map((el) => (
                        <button
                          key={el}
                          type="button"
                          onClick={() => handleToggleCostEnergy(idx, el)}
                          title={`Añadir energía ${ELEMENT_CONFIGS[el].name}`}
                          className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs flex items-center justify-center transition-transform hover:scale-115"
                        >
                          {ELEMENT_CONFIGS[el].symbol}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description Textarea */}
                  <div className="space-y-1">
                    <textarea
                      rows={2}
                      value={atk.description}
                      onChange={(e) => handleUpdateAttack(idx, { description: e.target.value })}
                      placeholder="Descripción del efecto, condición o probabilidad..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
                    />

                    {/* Quick Emojis Row for Description */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                      <span className="text-[9px] text-slate-500 font-bold">Rápidos:</span>
                      {['💥', '⚡', '🔥', '🛡️', '✨', '💀', '🎯', '🪙', '🎲', '❤️', '👑', '🗡️', '🌪️', '❄️', '💤'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleInsertEmojiToDesc(emoji, idx)}
                          title={`Insertar ${emoji} en descripción`}
                          className="px-1.5 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 text-xs transition-transform hover:scale-120"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 5: ATRIBUTOS & COSTES */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Debilidad Elemental
                </label>
                <select
                  value={card.weakness || ''}
                  onChange={(e) =>
                    onChange({
                      ...card,
                      weakness: (e.target.value as CardElement) || undefined,
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="">Ninguna</option>
                  {elements.map((el) => (
                    <option key={el} value={el}>
                      {ELEMENT_CONFIGS[el].symbol} {ELEMENT_CONFIGS[el].name} (x2)
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Resistencia Elemental
                </label>
                <select
                  value={card.resistance || ''}
                  onChange={(e) =>
                    onChange({
                      ...card,
                      resistance: (e.target.value as CardElement) || undefined,
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="">Ninguna</option>
                  {elements.map((el) => (
                    <option key={el} value={el}>
                      {ELEMENT_CONFIGS[el].symbol} {ELEMENT_CONFIGS[el].name} (-30)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300 block">
                  Coste de Retirada (Energías Normales)
                </label>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  {'⚪'.repeat(card.retreatCost || 1)} ({card.retreatCost || 1})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={card.retreatCost || 1}
                onChange={(e) => onChange({ ...card, retreatCost: parseInt(e.target.value) || 0 })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
