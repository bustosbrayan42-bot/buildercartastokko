import React, { useState, useRef } from 'react';
import type { CardData } from '../types/card';
import { CardCanvas } from './CardCanvas';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import {
  Download,
  X,
  Layers,
  Sparkles,
  AlertCircle,
  Loader2,
  FileArchive,
  Image as ImageIcon
} from 'lucide-react';

interface BatchImageExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: CardData[];
  onShowToast?: (msg: string) => void;
}

export const BatchImageExportModal: React.FC<BatchImageExportModalProps> = ({
  isOpen,
  onClose,
  cards,
  onShowToast,
}) => {
  const [fromNum, setFromNum] = useState<number>(1);
  const [toNum, setToNum] = useState<number>(118);
  const [exportFormat, setExportFormat] = useState<'zip' | 'individual'>('zip');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ current: number; total: number; cardTitle: string }>({
    current: 0,
    total: 0,
    cardTitle: '',
  });
  const [currentRenderCard, setCurrentRenderCard] = useState<CardData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleStartExport = async () => {
    if (targetCards.length === 0) {
      setErrorMessage(`No se encontraron cartas en el rango de #${fromNum} a #${toNum}`);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    abortControllerRef.current = false;

    const zip = exportFormat === 'zip' ? new JSZip() : null;
    const total = targetCards.length;

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
          cardTitle: card.title,
        });

        // Small timeout to allow DOM node to mount and images to settle
        await new Promise((res) => setTimeout(res, 220));

        if (!renderContainerRef.current) continue;

        // Target the inner card element
        const cardElement = renderContainerRef.current.querySelector('.card-3d-root') as HTMLElement;
        const targetNode = cardElement || renderContainerRef.current;

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

        if (zip) {
          // Convert base64 dataUrl to pure base64
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          zip.file(filename, base64Data, { base64: true });
        } else {
          // Individual direct download
          const link = document.createElement('a');
          link.download = filename;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          link.remove();
          // Small delay between downloads to prevent browser throttling
          await new Promise((res) => setTimeout(res, 150));
        }
      }

      if (abortControllerRef.current) {
        setErrorMessage('Exportación cancelada por el usuario.');
        return;
      }

      // If ZIP format, generate and trigger download
      if (zip) {
        setProgress((prev) => ({ ...prev, cardTitle: 'Comprimiendo archivo ZIP...' }));
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

      onShowToast?.(`✨ ¡Se guardaron exitosamente ${total} imágenes de cartas!`);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      console.error('Error during batch export:', err);
      setErrorMessage(err?.message || 'Ocurrió un error al generar las imágenes.');
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
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              Guardar Imágenes de Cartas (PNG)
            </h2>
            <p className="text-xs text-slate-400">
              Exporta las cartas renderizadas en alta resolución (2.5x HD)
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
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Rango de Cartas a Exportar:</span>
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white text-center focus:outline-none focus:border-amber-400"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white text-center focus:outline-none focus:border-amber-400"
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
                  className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-amber-400 border border-amber-400/40"
                >
                  001 a 118
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFromNum(1);
                    setToNum(cards.length || 140);
                  }}
                  className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-cyan-300 border border-cyan-400/40"
                >
                  Todas (140)
                </button>
              </div>

              {/* Total Cards Pill */}
              <div className="bg-slate-900/90 rounded-xl p-2.5 text-center border border-slate-800 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-white">
                  {targetCards.length} cartas seleccionadas
                </span>
                <span className="text-[11px] text-slate-400">
                  (de #{String(fromNum).padStart(3, '0')} a #{String(toNum).padStart(3, '0')})
                </span>
              </div>
            </div>

            {/* Format Selector */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2.5">
              <label className="text-xs font-bold text-slate-300 block">
                Método de Descarga:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setExportFormat('zip')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    exportFormat === 'zip'
                      ? 'bg-purple-950/50 border-purple-500 text-white shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs mb-0.5">
                    <FileArchive className="w-4 h-4 text-purple-400" />
                    <span>Archivo ZIP (Recomendado)</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Un solo archivo comprimido con todas las cartas en PNG.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setExportFormat('individual')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    exportFormat === 'individual'
                      ? 'bg-amber-950/50 border-amber-500 text-white shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs mb-0.5">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Archivos Individuales</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Descarga directa carta por carta de forma secuencial.
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
                onClick={handleStartExport}
                disabled={targetCards.length === 0}
                className="flex-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:from-amber-400 hover:via-pink-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Comenzar Exportación</span>
              </button>
            </div>
          </div>
        ) : (
          /* Live Progress View */
          <div className="space-y-5 py-3">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-950 border border-purple-500/50 flex items-center justify-center mb-3 text-purple-400 animate-pulse">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>

              <h3 className="text-base font-black text-white">
                Exportando {progress.current} de {progress.total} cartas...
              </h3>
              <p className="text-xs text-amber-400 font-mono mt-0.5 truncate max-w-xs">
                {progress.cardTitle || 'Preparando render...'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Progreso</span>
                <span>{percentComplete}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 h-full rounded-full transition-all duration-200"
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
                <div className="truncate text-left">
                  <span className="text-[10px] text-purple-400 font-mono block">
                    #{currentRenderCard.cardNumber} • {currentRenderCard.rarity}
                  </span>
                  <span className="text-xs font-bold text-white block truncate">
                    {currentRenderCard.title}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    HP {currentRenderCard.hp} • {currentRenderCard.element}
                  </span>
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
