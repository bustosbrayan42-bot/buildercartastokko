import React, { useState, useRef } from 'react';
import type { CardData } from '../types/card';
import { CardCanvas } from './CardCanvas';
import { toPng } from 'html-to-image';
import { uploadRenderedCardToR2, getR2Config } from '../utils/r2Storage';
import { saveCardToSupabase } from '../utils/supabaseClient';
import JSZip from 'jszip';
import {
  Download,
  X,
  Layers,
  Sparkles,
  AlertCircle,
  Loader2,
  FileArchive,
  CloudUpload,
  CheckCircle2
} from 'lucide-react';

interface BatchImageExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: CardData[];
  onSaveCardSuccess?: (updatedCards: CardData[]) => void;
  onShowToast?: (msg: string) => void;
}

export const BatchImageExportModal: React.FC<BatchImageExportModalProps> = ({
  isOpen,
  onClose,
  cards,
  onSaveCardSuccess,
  onShowToast,
}) => {
  const [fromNum, setFromNum] = useState<number>(1);
  const [toNum, setToNum] = useState<number>(118);
  const [actionTarget, setActionTarget] = useState<'r2_and_supabase' | 'zip' | 'individual'>('r2_and_supabase');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ current: number; total: number; cardTitle: string; stageText: string }>({
    current: 0,
    total: 0,
    cardTitle: '',
    stageText: '',
  });
  const [currentRenderCard, setCurrentRenderCard] = useState<CardData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number>(0);

  const renderContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<boolean>(false);

  if (!isOpen) return null;

  // Filter cards by cardNumber range
  const sortedCards = [...cards].sort((a, b) => {
    const numA = parseInt(a.cardNumber, 10) || 0;
    const numB = parseInt(b.cardNumber, 10) || 0;
    return numA - numB;
  });

  const targetCards = sortedCards.filter((c) => {
    const num = parseInt(c.cardNumber, 10);
    return !isNaN(num) && num >= fromNum && num <= toNum;
  });

  const handleStartProcess = async () => {
    if (targetCards.length === 0) {
      setErrorMessage(`No se encontraron cartas en el rango de #${fromNum} a #${toNum}`);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessCount(0);
    abortControllerRef.current = false;

    const r2Config = getR2Config();
    const zip = actionTarget === 'zip' ? new JSZip() : null;
    const total = targetCards.length;
    const updatedCardsList: CardData[] = [...cards];

    try {
      for (let i = 0; i < total; i++) {
        if (abortControllerRef.current) {
          break;
        }

        const card = targetCards[i];
        setCurrentRenderCard(card);
        setProgress({
          current: i + 1,
          total,
          cardTitle: `#${card.cardNumber || i + 1} - ${card.title}`,
          stageText: actionTarget === 'r2_and_supabase'
            ? 'Renderizando y subiendo a R2...'
            : 'Renderizando imagen HD...',
        });

        // Small timeout to allow the CardCanvas DOM to mount and settle
        await new Promise((res) => setTimeout(res, 220));

        if (!renderContainerRef.current) continue;

        const cardElement = renderContainerRef.current.querySelector('.card-3d-root') as HTMLElement;
        const targetNode = cardElement || renderContainerRef.current;

        // Render card front face in high resolution (pixelRatio 2.5)
        const dataUrl = await toPng(targetNode, {
          cacheBust: true,
          pixelRatio: 2.5,
          style: {
            transform: 'none',
          },
        });

        const paddedNum = String(card.cardNumber || i + 1).padStart(3, '0');
        const cleanTitle = (card.title || 'Carta').replace(/[\\/:*?"<>|]/g, '_').trim();
        const filename = `Carta_${paddedNum}_${cleanTitle}.png`;

        if (actionTarget === 'r2_and_supabase') {
          // 1. Upload rendered card to Cloudflare R2 bucket: cartas_renderizadas/carta_XXX.png
          setProgress((prev) => ({
            ...prev,
            stageText: `Subiendo a R2 (carta_${paddedNum}.png)...`,
          }));

          const publicUrl = await uploadRenderedCardToR2(card.cardNumber, dataUrl, r2Config);

          // 2. Save/Sync with Supabase
          const updatedCardWithRender: CardData = {
            ...card,
            image: publicUrl,
          };

          await saveCardToSupabase(updatedCardWithRender);

          // Update local memory list
          const idx = updatedCardsList.findIndex((c) => c.id === card.id);
          if (idx >= 0) {
            updatedCardsList[idx] = updatedCardWithRender;
          }
        } else if (actionTarget === 'zip' && zip) {
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          zip.file(filename, base64Data, { base64: true });
        } else {
          // Individual PNG download
          const link = document.createElement('a');
          link.download = filename;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          link.remove();
          await new Promise((res) => setTimeout(res, 150));
        }

        setSuccessCount((prev) => prev + 1);
      }

      if (abortControllerRef.current) {
        setErrorMessage('Proceso detenido por el usuario.');
        return;
      }

      // If ZIP target, finalize compression and trigger download
      if (actionTarget === 'zip' && zip) {
        setProgress((prev) => ({
          ...prev,
          stageText: 'Empaquetando y descargando archivo ZIP...',
        }));

        const zipBlob = await zip.generateAsync({
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 },
        });

        const zipUrl = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        const startPad = String(fromNum).padStart(3, '0');
        const endPad = String(toNum).padStart(3, '0');
        link.download = `Cartas_Tokkii_${startPad}_al_${endPad}_(${total}_cartas).zip`;
        link.href = zipUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(zipUrl);
      }

      if (actionTarget === 'r2_and_supabase') {
        onSaveCardSuccess?.(updatedCardsList);
        onShowToast?.(`✨ ¡${total} cartas renderizadas y guardadas con éxito en Cloudflare R2 y Supabase!`);
      } else {
        onShowToast?.(`✨ ¡Se exportaron exitosamente ${total} imágenes de cartas!`);
      }

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error('Error during batch export/upload:', err);
      setErrorMessage(err?.message || 'Ocurrió un error al procesar las imágenes.');
    } finally {
      setIsProcessing(false);
      setCurrentRenderCard(null);
    }
  };

  const handleCancel = () => {
    if (isProcessing) {
      abortControllerRef.current = true;
    } else {
      onClose();
    }
  };

  const percentComplete = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <CloudUpload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              Guardar y Renderizar en R2 Bucket
            </h2>
            <p className="text-xs text-slate-400">
              Genera los renders HD y los sube a Cloudflare R2 para el visor
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 bg-red-950/70 border border-red-500/50 text-red-200 text-xs p-3 rounded-2xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {!isProcessing ? (
          <div className="space-y-5">
            {/* Range Selection Inputs */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Rango de Cartas a Renderizar:</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-[11px] text-slate-400 mb-1">Desde Carta N°</span>
                  <input
                    type="number"
                    min={1}
                    max={cards.length || 140}
                    value={fromNum}
                    onChange={(e) => setFromNum(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white text-center focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <span className="block text-[11px] text-slate-400 mb-1">Hasta Carta N°</span>
                  <input
                    type="number"
                    min={fromNum}
                    max={cards.length || 140}
                    value={toNum}
                    onChange={(e) => setToNum(Math.max(fromNum, parseInt(e.target.value) || fromNum))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white text-center focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Preset Quick Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setFromNum(1);
                    setToNum(50);
                  }}
                  className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 border border-slate-700"
                >
                  001 a 050
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFromNum(1);
                    setToNum(118);
                  }}
                  className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-cyan-400 border border-cyan-400/40"
                >
                  001 a 118
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFromNum(1);
                    setToNum(cards.length || 140);
                  }}
                  className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-amber-400 border border-amber-400/40"
                >
                  Todas (140)
                </button>
              </div>

              {/* Total Cards Pill */}
              <div className="bg-slate-900/90 rounded-xl p-2.5 text-center border border-slate-800 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-bold text-white">
                  {targetCards.length} cartas seleccionadas
                </span>
                <span className="text-[11px] text-slate-400">
                  (de #{String(fromNum).padStart(3, '0')} a #{String(toNum).padStart(3, '0')})
                </span>
              </div>
            </div>

            {/* Target Action Selector */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2.5">
              <label className="text-xs font-bold text-slate-300 block">
                Destino del Renderizado:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setActionTarget('r2_and_supabase')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    actionTarget === 'r2_and_supabase'
                      ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                    <CloudUpload className="w-4 h-4 text-cyan-400" />
                    <span>R2 + Supabase</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Sube a Cloudflare R2 para ver los renders en el visor.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActionTarget('zip')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    actionTarget === 'zip'
                      ? 'bg-purple-950/60 border-purple-400 text-white shadow-lg shadow-purple-950/50 ring-1 ring-purple-400/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                    <FileArchive className="w-4 h-4 text-purple-400" />
                    <span>Descargar ZIP</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Copia local comprimida con todos los PNG en tu PC.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActionTarget('individual')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    actionTarget === 'individual'
                      ? 'bg-amber-950/60 border-amber-400 text-white shadow-lg shadow-amber-950/50 ring-1 ring-amber-400/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>PNG Sueltos</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Descarga directa individual por cada carta.
                  </p>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleStartProcess}
                disabled={targetCards.length === 0}
                className="flex-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {actionTarget === 'r2_and_supabase' ? (
                  <>
                    <CloudUpload className="w-4 h-4" />
                    <span>Guardar Rango en R2 Bucket</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar Imágenes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Live Progress View */
          <div className="space-y-5 py-3">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center mb-3 text-cyan-400 animate-pulse shadow-lg shadow-cyan-500/20">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>

              <h3 className="text-base font-black text-white">
                Procesando {progress.current} de {progress.total} cartas...
              </h3>
              <p className="text-xs text-cyan-300 font-bold mt-1">
                {progress.cardTitle || 'Preparando render...'}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {progress.stageText}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Progreso ({successCount}/{progress.total})</span>
                <span className="text-cyan-400 font-bold">{percentComplete}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-200 shadow-sm"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            {/* Live Render Preview */}
            {currentRenderCard && (
              <div className="bg-slate-950/90 rounded-2xl p-3 border border-slate-800 flex items-center gap-3">
                <div className="w-12 h-16 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                  {currentRenderCard.image ? (
                    <img
                      src={currentRenderCard.image}
                      alt={currentRenderCard.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm">🃏</span>
                  )}
                </div>
                <div className="truncate text-left flex-1">
                  <span className="text-[10px] text-cyan-400 font-mono block">
                    #{currentRenderCard.cardNumber} • {currentRenderCard.rarity}
                  </span>
                  <span className="text-xs font-bold text-white block truncate">
                    {currentRenderCard.title}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    HP {currentRenderCard.hp} • {currentRenderCard.element}
                  </span>
                </div>
                <div className="shrink-0 flex items-center text-xs text-emerald-400 font-bold gap-1 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>En cola</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/50 font-bold text-xs transition-colors cursor-pointer"
            >
              Detener / Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Hidden Offscreen Container for precise HTML-to-Image Rendering */}
      {currentRenderCard && (
        <div
          style={{
            position: 'fixed',
            left: '-9999px',
            top: 0,
            width: '320px',
            height: '450px',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          <div ref={renderContainerRef}>
            <CardCanvas
              card={currentRenderCard}
              scale={1}
              interactive={false}
              showControls={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};
