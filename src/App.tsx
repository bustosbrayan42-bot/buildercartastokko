import { useState, useEffect } from 'react';
import type { CardData, BoosterPackConfig } from './types/card';
import { DEFAULT_CARDS, DEFAULT_PACK_CONFIG } from './data/defaultData';
import { Header, type BuilderViewMode } from './components/Header';
import { CardCollectionView } from './components/CardCollectionView';
import { CardCanvas } from './components/CardCanvas';
import { CardEditorPanel } from './components/CardEditorPanel';
import { PackCanvas } from './components/PackCanvas';
import { PackEditorPanel } from './components/PackEditorPanel';
import { PackOpenerModal } from './components/PackOpenerModal';
import { PackManagementView } from './components/PackManagementView';
import { GiftCardsView } from './components/GiftCardsView';
import { AdminLoginGate } from './components/AdminLoginGate';
import { BatchImageExportModal } from './components/BatchImageExportModal';
import {
  getCurrentAdmin,
  signOutAdmin,
  type AdminUser
} from './services/adminAuthService';
import {
  Sparkles,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy
} from 'lucide-react';
import {
  fetchCardsFromSupabase,
  saveCardToSupabase,
  syncAllCardsToSupabase,
  supabase,
  rowToCard
} from './utils/supabaseClient';
import { saveCardsToIndexedDb, loadCardsFromIndexedDb } from './utils/cardStorage';

export function App() {
  // Admin Authentication State
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const admin = await getCurrentAdmin();
        if (admin) {
          setCurrentAdmin(admin);
        }
      } catch (err) {
        console.warn('Could not verify admin session:', err);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleAdminLogout = async () => {
    await signOutAdmin();
    setCurrentAdmin(null);
  };

  // Load Cards with Version Check
  const CARDS_DATA_VERSION = 'tokkii_cards_reset_all_common_v1';

  const [cards, setCards] = useState<CardData[]>(() => {
    try {
      const savedVersion = localStorage.getItem('tokkii_cards_data_ver');
      if (savedVersion !== CARDS_DATA_VERSION) {
        localStorage.setItem('tokkii_cards_data_ver', CARDS_DATA_VERSION);
        localStorage.setItem('tokkii_builder_cards', JSON.stringify(DEFAULT_CARDS));
        saveCardsToIndexedDb(DEFAULT_CARDS);
        return DEFAULT_CARDS;
      }

      const saved = localStorage.getItem('tokkii_builder_cards');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_CARDS.length) {
          return parsed;
        } else if (Array.isArray(parsed) && parsed.length > 0) {
          const localMap = new Map(parsed.map((c: CardData) => [c.id, c]));
          return DEFAULT_CARDS.map((defCard) => localMap.get(defCard.id) || defCard);
        }
      }
    } catch {
      return DEFAULT_CARDS;
    }
    return DEFAULT_CARDS;
  });

  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);

  // Load from IndexedDB on mount (handles high-res images and large storage)
  useEffect(() => {
    const loadFromIdb = async () => {
      try {
        const savedVersion = localStorage.getItem('tokkii_cards_data_ver');
        if (savedVersion !== CARDS_DATA_VERSION) {
          setCards(DEFAULT_CARDS);
          saveCardsToIndexedDb(DEFAULT_CARDS);
          return;
        }

        const idbCards = await loadCardsFromIndexedDb();
        if (idbCards && idbCards.length > 0) {
          setCards(idbCards);
        }
      } catch (err) {
        console.warn('Could not load from IndexedDB:', err);
      }
    };
    loadFromIdb();
  }, []);

  // Auto load from Supabase on mount & Realtime sync
  useEffect(() => {
    const loadFromSupabase = async () => {
      try {
        const supabaseCards = await fetchCardsFromSupabase();
        if (supabaseCards && supabaseCards.length > 0) {
          setCards((currentCards) => {
            const currentMap = new Map(currentCards.map((c) => [c.id, c]));
            const defMap = new Map(DEFAULT_CARDS.map((c) => [c.id, c]));

            // Merge Supabase cards with any unsynced local drafts and default emojis if empty
            const merged = supabaseCards.map((sbCard) => {
              const localCard = currentMap.get(sbCard.id);
              const defCard = defMap.get(sbCard.id);

              // Use local or default emojis if Supabase card attacks lack emojis
              let attacks = sbCard.attacks;
              if (defCard?.attacks && (!attacks || attacks.length === 0 || !attacks[0]?.name?.includes(' '))) {
                attacks = defCard.attacks;
              }

              // If local card has an unsynced base64 image and Supabase has default, retain base64 draft
              if (localCard?.image?.startsWith('data:') && (!sbCard.image || sbCard.image.includes('tokkii_photographer.jpg'))) {
                return {
                  ...sbCard,
                  attacks: attacks || sbCard.attacks,
                  weakness: sbCard.weakness || defCard?.weakness,
                  resistance: sbCard.resistance || defCard?.resistance,
                  hp: sbCard.hp || defCard?.hp || 100,
                  image: localCard.image,
                };
              }
              return {
                ...sbCard,
                attacks: attacks || sbCard.attacks,
                weakness: sbCard.weakness || defCard?.weakness,
                resistance: sbCard.resistance || defCard?.resistance,
                hp: sbCard.hp || defCard?.hp || 100,
              };
            });

            // Keep locally created cards not yet in Supabase
            const sbIdSet = new Set(supabaseCards.map((c) => c.id));
            const localOnlyCards = currentCards.filter((c) => !sbIdSet.has(c.id));
            const fullList = [...merged, ...localOnlyCards];
            saveCardsToIndexedDb(fullList);
            return fullList;
          });
        }
      } catch (err) {
        console.warn('Could not fetch initial cards from Supabase, using local:', err);
      }
    };
    loadFromSupabase();

    const channel = supabase
      .channel('builder_cards_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cards' },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const updatedCard = rowToCard(payload.new as any);
            setCards((prev) => {
              const existingIdx = prev.findIndex((c) => c.id === updatedCard.id);
              let next: CardData[];
              if (existingIdx >= 0) {
                // If local has active unsynced base64 and update doesn't override with a custom URL, keep base64
                next = [...prev];
                next[existingIdx] = updatedCard;
              } else {
                next = [...prev, updatedCard];
              }
              saveCardsToIndexedDb(next);
              return next;
            });
          } else if (payload.eventType === 'DELETE') {
            setCards((prev) => {
              const next = prev.filter((c) => c.id !== payload.old.id);
              saveCardsToIndexedDb(next);
              return next;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Load Pack Config
  const [packConfig, setPackConfig] = useState<BoosterPackConfig>(() => {
    const saved = localStorage.getItem('tokkii_builder_pack');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PACK_CONFIG;
      }
    }
    return DEFAULT_PACK_CONFIG;
  });

  // Save to IndexedDB (unlimited) and localStorage
  useEffect(() => {
    saveCardsToIndexedDb(cards);
    try {
      localStorage.setItem('tokkii_builder_cards', JSON.stringify(cards));
    } catch {
      // localStorage quota exceeded (safe fallback to IndexedDB)
    }
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem('tokkii_builder_pack', JSON.stringify(packConfig));
    } catch {
      // ignore
    }
  }, [packConfig]);

  // Active view: card_builder vs pack_builder vs pack_management vs gift_cards
  const [currentView, setCurrentView] = useState<BuilderViewMode>('card_builder');
  
  // Card studio mode: 'collection' (4-column grid) vs 'editor' (3D viewer + adjustment panel)
  const [cardStudioMode, setCardStudioMode] = useState<'collection' | 'editor'>('collection');
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || 'tokkii-001');
  const [isPackSimulatorOpen, setIsPackSimulatorOpen] = useState(false);
  const [isBatchImageModalOpen, setIsBatchImageModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Find currently selected card
  const currentCard = cards.find((c) => c.id === selectedCardId) || cards[0];
  const currentCardIndex = cards.findIndex((c) => c.id === selectedCardId);

  // Card update handler
  const handleCardChange = (updated: CardData) => {
    setCards((prev) => {
      const next = prev.map((c) => (c.id === updated.id ? updated : c));
      saveCardsToIndexedDb(next);
      return next;
    });

    // Auto-sync updated card with Supabase
    saveCardToSupabase(updated).catch((err) => {
      console.warn('Auto-sync to Supabase pending:', err);
    });
  };

  // Add New Card
  const handleAddNewCard = () => {
    const newCardNumber = String(cards.length + 1).padStart(3, '0');
    const newCard: CardData = {
      id: `tokkii-${Date.now()}`,
      title: `Tokkii - Nueva Carta #${newCardNumber}`,
      subtitle: 'Neko Aventurera • Colección TCG',
      image: '/cards/tokkii_photographer.jpg',
      imageZoom: 1,
      imageOffsetX: 0,
      imageOffsetY: 0,
      rarity: 'rare',
      element: 'impulso',
      hp: 120,
      cardNumber: newCardNumber,
      totalInSet: '050',
      artist: 'Tokkii Studio',
      flavorText: 'Una nueva carta creada y lista para la batalla o colección.',
      attacks: [
        {
          id: `atk-${Date.now()}`,
          name: 'Impacto de Impulso',
          cost: ['impulso', 'rutina'],
          damage: '60',
          description: 'Inflige 60 puntos de daño al objetivo.',
        },
      ],
      retreatCost: 1,
      weakness: 'aventura',
      resistance: 'arte',
      isFullArt: false,
      dateAdded: new Date().toISOString().split('T')[0],
      tags: ['Tokkii', 'Nueva'],
    };

    setCards([newCard, ...cards]);
    setSelectedCardId(newCard.id);
    showToast('¡Nueva carta agregada con éxito!');
  };

  // Duplicate Card
  const handleDuplicateCard = (id: string) => {
    const target = cards.find((c) => c.id === id);
    if (!target) return;
    const duplicated: CardData = {
      ...target,
      id: `tokkii-dup-${Date.now()}`,
      title: `${target.title} (Copia)`,
      cardNumber: String(cards.length + 1).padStart(3, '0'),
    };
    setCards([duplicated, ...cards]);
    setSelectedCardId(duplicated.id);
    showToast('Carta duplicada con éxito');
  };

  // Delete Card
  const handleDeleteCard = (id: string) => {
    if (cards.length <= 1) return;
    const remaining = cards.filter((c) => c.id !== id);
    setCards(remaining);
    setSelectedCardId(remaining[0].id);
    showToast('Carta eliminada');
  };

  // Next / Previous Card Navigation in Editor Mode
  const handlePrevCard = () => {
    if (cards.length === 0) return;
    const prevIdx = (currentCardIndex - 1 + cards.length) % cards.length;
    setSelectedCardId(cards[prevIdx].id);
  };

  const handleNextCard = () => {
    if (cards.length === 0) return;
    const nextIdx = (currentCardIndex + 1) % cards.length;
    setSelectedCardId(cards[nextIdx].id);
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cards, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tokkii_tcg_deck_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Colección exportada en JSON');
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (Array.isArray(imported) && imported.length > 0) {
            setCards(imported);
            setSelectedCardId(imported[0].id);
            showToast(`¡Se importaron ${imported.length} cartas correctamente!`);
          }
        } catch {
          alert('El archivo JSON no tiene un formato válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Sync to Supabase
  const handleSyncSupabase = async () => {
    try {
      setIsSyncingSupabase(true);
      await syncAllCardsToSupabase(cards);
      showToast('✨ ¡Todas las cartas han sido respaldadas en Supabase!');
    } catch (err: any) {
      console.error('Error syncing with Supabase:', err);
      showToast(`❌ Error al conectar con Supabase: ${err?.message || 'Revisa tu tabla sql'}`);
    } finally {
      setIsSyncingSupabase(false);
    }
  };

  // Generate & Download SQL backup
  const handleExportSql = () => {
    const escapeSql = (str: string) => str.replace(/'/g, "''");
    
    let sql = `-- Backup de Cartas Tokkii TCG - Generado el ${new Date().toLocaleString()}\n`;
    sql += `-- Compatible con Supabase / PostgreSQL\n\n`;
    
    sql += `INSERT INTO public.cards (
    id, title, subtitle, image, image_zoom, image_offset_x, image_offset_y, image_rotation, image_fit,
    rarity, element, hp, card_number, total_in_set, artist, flavor_text, attacks, retreat_cost, weakness, resistance, is_full_art, tags
) VALUES \n`;

    const values = cards.map((c) => {
      const attacksJson = JSON.stringify(c.attacks || []).replace(/'/g, "''");
      const tagsArray = (c.tags || []).map(t => `'${escapeSql(t)}'`).join(', ');
      
      return `(
    '${escapeSql(c.id)}',
    '${escapeSql(c.title || '')}',
    '${escapeSql(c.subtitle || '')}',
    '${escapeSql(c.image || '')}',
    ${c.imageZoom ?? 1},
    ${c.imageOffsetX ?? 0},
    ${c.imageOffsetY ?? 0},
    ${c.imageRotation ?? 0},
    '${escapeSql(c.imageFit || 'cover')}',
    '${escapeSql(c.rarity)}',
    '${escapeSql(c.element)}',
    ${c.hp || 100},
    '${escapeSql(c.cardNumber || '001')}',
    '${escapeSql(c.totalInSet || '050')}',
    '${escapeSql(c.artist || 'Tokkii Studio')}',
    '${escapeSql(c.flavorText || '')}',
    '${attacksJson}'::jsonb,
    ${c.retreatCost ?? 1},
    ${c.weakness ? `'${escapeSql(c.weakness)}'` : 'NULL'},
    ${c.resistance ? `'${escapeSql(c.resistance)}'` : 'NULL'},
    ${c.isFullArt ? 'true' : 'false'},
    ARRAY[${tagsArray}]::TEXT[]
)`;
    }).join(',\n');

    sql += values;
    sql += `\nON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    image = EXCLUDED.image,
    image_zoom = EXCLUDED.image_zoom,
    image_offset_x = EXCLUDED.image_offset_x,
    image_offset_y = EXCLUDED.image_offset_y,
    image_rotation = EXCLUDED.image_rotation,
    image_fit = EXCLUDED.image_fit,
    rarity = EXCLUDED.rarity,
    element = EXCLUDED.element,
    hp = EXCLUDED.hp,
    card_number = EXCLUDED.card_number,
    total_in_set = EXCLUDED.total_in_set,
    artist = EXCLUDED.artist,
    flavor_text = EXCLUDED.flavor_text,
    attacks = EXCLUDED.attacks,
    retreat_cost = EXCLUDED.retreat_cost,
    weakness = EXCLUDED.weakness,
    resistance = EXCLUDED.resistance,
    is_full_art = EXCLUDED.is_full_art,
    tags = EXCLUDED.tags,
    updated_at = NOW();\n`;

    const blob = new Blob([sql], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tokkii_cards_backup_${Date.now()}.sql`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Archivo SQL generado y descargado');
  };

  // Reset Defaults
  const handleResetDefaults = () => {
    if (confirm('¿Restablecer todas las cartas y configuraciones a los valores iniciales?')) {
      setCards(DEFAULT_CARDS);
      setPackConfig(DEFAULT_PACK_CONFIG);
      setSelectedCardId(DEFAULT_CARDS[0].id);
      localStorage.removeItem('tokkii_builder_cards');
      localStorage.removeItem('tokkii_builder_pack');
      showToast('Valores restaurados por defecto');
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-400">
        <div className="w-10 h-10 rounded-2xl border-2 border-amber-400/20 border-t-amber-400 animate-spin mb-4" />
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
          Verificando sesión de administrador...
        </p>
      </div>
    );
  }

  if (!currentAdmin) {
    return <AdminLoginGate onLoginSuccess={(admin) => setCurrentAdmin(admin)} />;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          if (view === 'card_builder') {
            // Keep collection as base overview
          }
        }}
        onResetDefaults={handleResetDefaults}
        cardCount={cards.length}
        adminEmail={currentAdmin.email}
        onLogout={handleAdminLogout}
      />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-[1750px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-5">
        {/* VIEW 1: CARD STUDIO */}
        {currentView === 'card_builder' && (
          <div>
            {/* MODE A: 4-COLUMN HORIZONTAL CARD COLLECTION VIEWER */}
            {cardStudioMode === 'collection' && (
              <CardCollectionView
                cards={cards}
                onSelectAndEditCard={(id) => {
                  setSelectedCardId(id);
                  setCardStudioMode('editor');
                }}
                onAddNewCard={() => {
                  handleAddNewCard();
                  setCardStudioMode('editor');
                }}
                onDuplicateCard={handleDuplicateCard}
                onDeleteCard={handleDeleteCard}
                onExportJson={handleExportJson}
                onImportJson={handleImportJson}
                onSyncSupabase={handleSyncSupabase}
                onExportSql={handleExportSql}
                onOpenBatchImageExport={() => setIsBatchImageModalOpen(true)}
                isSyncingSupabase={isSyncingSupabase}
              />
            )}

            {/* MODE B: 2-PANEL CARD EDITOR (3D CANVAS + SETTINGS PANEL) */}
            {cardStudioMode === 'editor' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Editor Navigation Bar */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCardStudioMode('collection')}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 border border-slate-700 hover:border-amber-400 transition-all cursor-pointer shadow"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver a la Colección (Visor)</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
                      <span className="text-xs font-bold text-white truncate max-w-xs">
                        {currentCard?.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                        #{currentCard?.cardNumber || '001'}
                      </span>
                    </div>
                  </div>

                  {/* Card Switcher & Actions */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        type="button"
                        onClick={handlePrevCard}
                        title="Carta Anterior"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] font-mono px-2 text-slate-300">
                        {currentCardIndex + 1} / {cards.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextCard}
                        title="Carta Siguiente"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleAddNewCard();
                      }}
                      className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Nueva Carta
                    </button>

                    <button
                      type="button"
                      onClick={() => currentCard && handleDuplicateCard(currentCard.id)}
                      title="Duplicar carta actual"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2-PANEL LAYOUT: 3D CARD VIEWER + ADJUSTMENT EDITOR */}
                <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
                  {/* PANEL 1: Interactive 3D Card Canvas Preview */}
                  <div className="w-full lg:w-[420px] xl:w-[450px] shrink-0 flex flex-col items-center justify-center p-5 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md shadow-2xl relative min-h-[640px]">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Renderizador en Tiempo Real 3D
                    </div>

                    {currentCard ? (
                      <CardCanvas
                        card={currentCard}
                        scale={1.18}
                        interactive={true}
                        onExportSuccess={() => showToast('¡Imagen PNG generada y descargada!')}
                        onSaveCard={async (savedCard) => {
                          setCards((prev) => {
                            const next = prev.map((c) => (c.id === savedCard.id ? savedCard : c));
                            saveCardsToIndexedDb(next);
                            return next;
                          });
                          await saveCardToSupabase(savedCard);
                        }}
                        onSaveSuccess={() => showToast(`¡Carta #${currentCard.cardNumber} guardada y subida a R2!`)}
                        onSaveError={(err) => showToast(`Error al guardar en R2: ${err}`)}
                      />
                    ) : (
                      <div className="text-slate-500">Selecciona una carta para editar</div>
                    )}
                  </div>

                  {/* PANEL 2: Granular Card Settings Editor */}
                  <div className="flex-1 min-w-0 w-full">
                    {currentCard && (
                      <CardEditorPanel
                        card={currentCard}
                        onChange={handleCardChange}
                        onSaveToSupabase={saveCardToSupabase}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: BOOSTER PACK BUILDER */}
        {currentView === 'pack_builder' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-5xl mx-auto animate-in fade-in duration-200">
            {/* LEFT: 3D Booster Pack Canvas */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md shadow-2xl">
              <PackCanvas
                config={packConfig}
                onOpenTest={() => setIsPackSimulatorOpen(true)}
              />
            </div>

            {/* RIGHT: Pack Editor Panel */}
            <div className="w-full lg:w-1/2">
              <PackEditorPanel
                config={packConfig}
                cards={cards}
                onChange={setPackConfig}
                onOpenVisualTest={() => setIsPackSimulatorOpen(true)}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: PACKS MANAGEMENT (Enviar Sobres a Usuarios de Twitch) */}
        {currentView === 'pack_management' && (
          <PackManagementView onShowToast={showToast} />
        )}

        {/* VIEW 4: GIFT CARDS (Regalar Cartas Individuales con Visor 5 columnas) */}
        {currentView === 'gift_cards' && (
          <GiftCardsView cards={cards} onShowToast={showToast} />
        )}
      </main>

      {/* Interactive Pack Opener Simulator Modal */}
      <PackOpenerModal
        cards={cards}
        config={packConfig}
        isOpen={isPackSimulatorOpen}
        onClose={() => setIsPackSimulatorOpen(false)}
      />

      {/* Batch Card Images Exporter Modal */}
      <BatchImageExportModal
        isOpen={isBatchImageModalOpen}
        onClose={() => setIsBatchImageModalOpen(false)}
        cards={cards}
        onSaveCardSuccess={(updatedList) => {
          setCards(updatedList);
          saveCardsToIndexedDb(updatedList);
        }}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
