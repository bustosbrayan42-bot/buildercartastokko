import { useState, useEffect, useRef } from 'react';
import type { CardData, BoosterPackConfig, CardEdition, Rarity, RarityConfig } from './types/card';
import { DEFAULT_CARDS, DEFAULT_PACK_CONFIG } from './data/defaultData';
import { DEFAULT_EVIL_CARDS } from './data/defaultEvilCards';
import { Header, type BuilderViewMode } from './components/Header';
import { CardCollectionView } from './components/CardCollectionView';
import { EditionSelectionView } from './components/EditionSelectionView';
import { RarityConfigModal } from './components/RarityConfigModal';
import {
  getRarityConfigsForEdition,
  saveRarityConfigsForEdition,
  resetRarityConfigsForEdition,
  getElementConfigsForEdition,
} from './data/configs';
import { CardCanvas, type CardCanvasHandle } from './components/CardCanvas';
import { CardEditorPanel } from './components/CardEditorPanel';
import { PackCanvas } from './components/PackCanvas';
import { PackEditorPanel } from './components/PackEditorPanel';
import { PackOpenerModal } from './components/PackOpenerModal';
import { PackManagementView } from './components/PackManagementView';
import { GiftCardsView } from './components/GiftCardsView';
import { GiftCodesView } from './components/GiftCodesView';
import { AdminLoginGate } from './components/AdminLoginGate';
import { BatchImageExportModal } from './components/BatchImageExportModal';
import {
  getCurrentAdmin,
  signOutAdmin,
  type AdminUser
} from './services/adminAuthService';
import {
  Sparkles,
  Flame,
  Palette,
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
  const cardCanvasRef = useRef<CardCanvasHandle>(null);

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

  // Active Edition State ('goodtokkii' vs 'eviltokkii')
  const [currentEdition, setCurrentEdition] = useState<CardEdition>(() => {
    try {
      const saved = localStorage.getItem('tokkii_builder_current_edition');
      if (saved === 'goodtokkii' || saved === 'eviltokkii') return saved;
    } catch {}
    return 'goodtokkii';
  });

  useEffect(() => {
    try {
      localStorage.setItem('tokkii_builder_current_edition', currentEdition);
    } catch {}
  }, [currentEdition]);

  // Rarity Configs State (Independiente por edición)
  const [rarityConfigs, setRarityConfigs] = useState<Record<Rarity, RarityConfig>>(() => {
    return getRarityConfigsForEdition(currentEdition);
  });
  const [isRarityModalOpen, setIsRarityModalOpen] = useState(false);

  // Element Configs (Independiente por edición: GoodTokkii vs EvilTokkii)
  const elementConfigs = getElementConfigsForEdition(currentEdition);

  useEffect(() => {
    setRarityConfigs(getRarityConfigsForEdition(currentEdition));
  }, [currentEdition]);

  const handleSaveRarityConfigs = (updated: Record<Rarity, RarityConfig>) => {
    setRarityConfigs(updated);
    saveRarityConfigsForEdition(currentEdition, updated);
  };

  const handleResetRarityConfigs = () => {
    const defaults = resetRarityConfigsForEdition(currentEdition);
    setRarityConfigs(defaults);
  };

  // GoodTokkii Cards State
  const [goodCards, setGoodCards] = useState<CardData[]>(() => {
    try {
      localStorage.removeItem('tokkii_builder_cards');
    } catch {}
    return DEFAULT_CARDS;
  });

  // EvilTokkii Cards State (140 cartas con descripciones oficiales de EvilTokkii)
  const [evilCards, setEvilCards] = useState<CardData[]>(() => {
    return DEFAULT_EVIL_CARDS;
  });

  // Helper para combinar cartas existentes/editadas con las 140 cartas base de EvilTokkii
  const mergeEvilWithDefaults = (cardsToMerge: CardData[]): CardData[] => {
    const mergedMap = new Map<string, CardData>();
    DEFAULT_EVIL_CARDS.forEach((c) => mergedMap.set(c.id, c));
    cardsToMerge.forEach((c) => mergedMap.set(c.id, c));
    const result: CardData[] = [];
    DEFAULT_EVIL_CARDS.forEach((c) => {
      result.push(mergedMap.get(c.id) || c);
      mergedMap.delete(c.id);
    });
    mergedMap.forEach((c) => result.push(c));
    return result;
  };

  // Carga cartas de EvilTokkii: primero desde la tabla dedicada 'evil_cards' de Supabase; si no existe aún, desde IndexedDB
  useEffect(() => {
    const loadEvil = async () => {
      try {
        const remoteEvil = await fetchCardsFromSupabase(true, 'evil_cards');
        if (remoteEvil && remoteEvil.length > 0) {
          const merged = mergeEvilWithDefaults(remoteEvil);
          setEvilCards(merged);
          saveCardsToIndexedDb(merged, 'builder_cards_eviltokkii');
          return;
        }
      } catch (err) {
        console.warn('Tabla evil_cards en Supabase aún no creada o sin datos, usando copia local:', err);
      }

      try {
        const savedEvil = await loadCardsFromIndexedDb('builder_cards_eviltokkii');
        if (savedEvil && savedEvil.length > 0) {
          // Si el cache local tiene los nombres viejos placeholder o repetidos, actualizar a DEFAULT_EVIL_CARDS oficiales
          const hasOldPlaceholder = savedEvil.some(
            (c) =>
              c.title?.startsWith('[EVIL]') ||
              c.title?.startsWith('Evil Tokkii #') ||
              (c.id === 'evil-tokkii-071' && c.title === 'CLIP INFERNAL')
          );
          if (hasOldPlaceholder) {
            setEvilCards(DEFAULT_EVIL_CARDS);
            saveCardsToIndexedDb(DEFAULT_EVIL_CARDS, 'builder_cards_eviltokkii');
          } else {
            const merged = mergeEvilWithDefaults(savedEvil);
            setEvilCards(merged);
            saveCardsToIndexedDb(merged, 'builder_cards_eviltokkii');
          }
        } else {
          setEvilCards(DEFAULT_EVIL_CARDS);
          saveCardsToIndexedDb(DEFAULT_EVIL_CARDS, 'builder_cards_eviltokkii');
        }
      } catch (err) {
        console.warn('Could not load EvilTokkii cards from IndexedDB:', err);
      }
    };
    loadEvil();

    const evilChannel = supabase
      .channel('builder_evil_cards_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'evil_cards' },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const updatedCard = rowToCard(payload.new as any);
            setEvilCards((prev) => {
              const existingIdx = prev.findIndex((c) => c.id === updatedCard.id);
              let next: CardData[];
              if (existingIdx >= 0) {
                next = [...prev];
                next[existingIdx] = updatedCard;
              } else {
                next = [...prev, updatedCard];
              }
              saveCardsToIndexedDb(next, 'builder_cards_eviltokkii');
              return next;
            });
          } else if (payload.eventType === 'DELETE') {
            setEvilCards((prev) => {
              const next = prev.filter((c) => c.id !== payload.old.id);
              saveCardsToIndexedDb(next, 'builder_cards_eviltokkii');
              return next;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(evilChannel);
    };
  }, []);

  // Set activo según la edición seleccionada
  const cards = currentEdition === 'eviltokkii' ? evilCards : goodCards;

  const setCards = (updater: CardData[] | ((prev: CardData[]) => CardData[])) => {
    if (currentEdition === 'eviltokkii') {
      setEvilCards((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        saveCardsToIndexedDb(next, 'builder_cards_eviltokkii');
        return next;
      });
    } else {
      setGoodCards((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        saveCardsToIndexedDb(next, 'builder_cards');
        return next;
      });
    }
  };

  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);

  // Auto load GoodTokkii from Supabase on mount & Realtime sync (NO toca EvilTokkii)
  useEffect(() => {
    const loadFromSupabase = async () => {
      try {
        const supabaseCards = await fetchCardsFromSupabase(true);
        if (supabaseCards && supabaseCards.length > 0) {
          setGoodCards((currentCards) => {
            const currentMap = new Map(currentCards.map((c) => [c.id, c]));
            const defMap = new Map(DEFAULT_CARDS.map((c) => [c.id, c]));

            // Merge Supabase cards with any unsynced local drafts and default emojis if empty
            const merged = supabaseCards.map((sbCard) => {
              const localCard = currentMap.get(sbCard.id);
              const defCard = defMap.get(sbCard.id);

              let attacks = sbCard.attacks;
              if (defCard?.attacks && (!attacks || attacks.length === 0 || !attacks[0]?.name?.includes(' '))) {
                attacks = defCard.attacks;
              }

              const localHasCustomImg = localCard?.image && !localCard.image.includes('tokkii_photographer.jpg');
              const defHasCustomImg = defCard?.image && !defCard.image.includes('tokkii_photographer.jpg');
              const sbHasDefaultImg = !sbCard.image || sbCard.image.includes('tokkii_photographer.jpg');

              const finalImage = !sbHasDefaultImg 
                ? sbCard.image 
                : (localHasCustomImg ? localCard.image : (defHasCustomImg ? defCard.image : sbCard.image));

              const finalRarity = sbCard.rarity || defCard?.rarity || 'common';
              const finalHoloStyle = sbCard.customHoloStyle || defCard?.customHoloStyle;
              const finalFoilOpacity = sbCard.customFoilOpacity ?? defCard?.customFoilOpacity;
              const finalMaskOpacity = sbCard.customMaskOpacity ?? defCard?.customMaskOpacity;
              const finalIsFullArt = defCard?.isFullArt !== undefined ? defCard.isFullArt : sbCard.isFullArt;

              return {
                ...defCard,
                ...sbCard,
                rarity: finalRarity,
                customHoloStyle: finalHoloStyle,
                customFoilOpacity: finalFoilOpacity,
                customMaskOpacity: finalMaskOpacity,
                isFullArt: finalIsFullArt,
                attacks: attacks || sbCard.attacks,
                weakness: sbCard.weakness || defCard?.weakness,
                resistance: sbCard.resistance || defCard?.resistance,
                hp: sbCard.hp || defCard?.hp || 100,
                image: finalImage,
              };
            });

            // Keep locally created cards not yet in Supabase
            const sbIdSet = new Set(supabaseCards.map((c) => c.id));
            const localOnlyCards = currentCards.filter((c) => !sbIdSet.has(c.id));
            const fullList = [...merged, ...localOnlyCards];
            saveCardsToIndexedDb(fullList, 'builder_cards');
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
            setGoodCards((prev) => {
              const existingIdx = prev.findIndex((c) => c.id === updatedCard.id);
              let next: CardData[];
              if (existingIdx >= 0) {
                next = [...prev];
                next[existingIdx] = updatedCard;
              } else {
                next = [...prev, updatedCard];
              }
              saveCardsToIndexedDb(next, 'builder_cards');
              return next;
            });
          } else if (payload.eventType === 'DELETE') {
            setGoodCards((prev) => {
              const next = prev.filter((c) => c.id !== payload.old.id);
              saveCardsToIndexedDb(next, 'builder_cards');
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

  // Limpieza periódica de cualquier caché residual
  useEffect(() => {
    try {
      localStorage.removeItem('tokkii_builder_cards');
      localStorage.removeItem('tokkii_cached_cards_v1');
      localStorage.removeItem('tokkii_cached_cards_v1_time');
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tokkii_builder_pack', JSON.stringify(packConfig));
    } catch {
      // ignore
    }
  }, [packConfig]);

const VALID_BUILDER_VIEWS: BuilderViewMode[] = [
  'card_builder',
  'pack_builder',
  'pack_management',
  'gift_cards',
  'gift_codes',
];

const getInitialBuilderView = (): BuilderViewMode => {
  try {
    const rawHash = (window.location.hash || '').replace(/^#+/, '').trim().toLowerCase();
    if (VALID_BUILDER_VIEWS.includes(rawHash as BuilderViewMode)) {
      return rawHash as BuilderViewMode;
    }
    const params = new URLSearchParams(window.location.search);
    const tabParam = (params.get('tab') || '').trim().toLowerCase();
    if (VALID_BUILDER_VIEWS.includes(tabParam as BuilderViewMode)) {
      return tabParam as BuilderViewMode;
    }
    const saved = localStorage.getItem('tokkii_builder_current_view') as BuilderViewMode;
    if (saved && VALID_BUILDER_VIEWS.includes(saved)) {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'card_builder';
};

  // Active view: card_builder vs pack_builder vs pack_management vs gift_cards
  const [currentView, setCurrentView] = useState<BuilderViewMode>(getInitialBuilderView);
  
  // Card studio mode: 'select_edition' (pantalla con las 2 versiones) vs 'collection' (visor en cuadrícula) vs 'editor' (3D + panel)
  const [cardStudioMode, setCardStudioMode] = useState<'collection' | 'editor' | 'select_edition'>(() => {
    try {
      const savedMode = localStorage.getItem('tokkii_builder_card_studio_mode');
      if (savedMode === 'editor' || savedMode === 'collection' || savedMode === 'select_edition') return savedMode;
    } catch {}
    return 'select_edition';
  });

  useEffect(() => {
    try {
      localStorage.setItem('tokkii_builder_card_studio_mode', cardStudioMode);
    } catch {}
  }, [cardStudioMode]);

  const [editorCardScale, setEditorCardScale] = useState<number>(() => {
    if (typeof window === 'undefined') return 1.18;
    const w = window.innerWidth;
    if (w < 400) return 0.8;
    if (w < 640) return 0.92;
    if (w < 1024) return 1.05;
    return 1.18;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 400) setEditorCardScale(0.8);
      else if (w < 640) setEditorCardScale(0.92);
      else if (w < 1024) setEditorCardScale(1.05);
      else setEditorCardScale(1.18);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [selectedCardId, setSelectedCardId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem('tokkii_builder_selected_card_id');
      if (savedId) return savedId;
    } catch {}
    return cards[0]?.id || 'tokkii-001';
  });

  // Keep URL hash and localStorage in sync with current view
  useEffect(() => {
    try {
      localStorage.setItem('tokkii_builder_current_view', currentView);
      if (window.location.hash.replace(/^#+/, '') !== currentView) {
        window.history.replaceState(null, '', `#${currentView}`);
      }
    } catch {}
  }, [currentView]);

  // Listen to browser forward/back buttons (hashchange)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#+/, '').trim().toLowerCase() as BuilderViewMode;
      if (VALID_BUILDER_VIEWS.includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save studio mode and selected card
  useEffect(() => {
    try {
      localStorage.setItem('tokkii_builder_card_studio_mode', cardStudioMode);
    } catch {}
  }, [cardStudioMode]);

  useEffect(() => {
    try {
      if (selectedCardId) {
        localStorage.setItem('tokkii_builder_selected_card_id', selectedCardId);
      }
    } catch {}
  }, [selectedCardId]);

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
    setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));

    // Auto-sync con la tabla correspondiente en Supabase ('evil_cards' para EvilTokkii, 'cards' para GoodTokkii)
    const targetTable = currentEdition === 'eviltokkii' ? 'evil_cards' : 'cards';
    saveCardToSupabase(updated, targetTable).catch((err) => {
      console.warn(`Auto-sync to Supabase (${targetTable}) pending:`, err);
    });
  };

  // Add New Card
  const handleAddNewCard = () => {
    const newCardNumber = String(cards.length + 1).padStart(3, '0');
    const isEvil = currentEdition === 'eviltokkii';
    const newCard: CardData = {
      id: isEvil ? `evil-tokkii-${Date.now()}` : `tokkii-${Date.now()}`,
      title: isEvil ? `EvilTokkii - Nueva Carta #${newCardNumber}` : `Tokkii - Nueva Carta #${newCardNumber}`,
      subtitle: isEvil ? 'Edición Sombra • EvilTokkii' : 'Neko Aventurera • Colección TCG',
      image: '/cards/tokkii_photographer.jpg',
      imageZoom: 1,
      imageOffsetX: 0,
      imageOffsetY: 0,
      rarity: 'rare',
      element: isEvil ? 'desafio' : 'impulso',
      hp: 120,
      cardNumber: newCardNumber,
      totalInSet: '140',
      artist: 'Tokkii Studio',
      flavorText: isEvil ? 'Una nueva carta sombría lista para la batalla.' : 'Una nueva carta creada y lista para la batalla o colección.',
      attacks: [
        {
          id: `atk-${Date.now()}`,
          name: isEvil ? 'Corte Sombrío' : 'Impacto de Impulso',
          cost: isEvil ? ['desafio', 'aura'] : ['impulso', 'rutina'],
          damage: '60',
          description: 'Inflige 60 puntos de daño al objetivo.',
        },
      ],
      retreatCost: 1,
      weakness: isEvil ? 'arte' : 'aventura',
      resistance: isEvil ? 'impulso' : 'arte',
      isFullArt: false,
      dateAdded: new Date().toISOString().split('T')[0],
      tags: isEvil ? ['EvilTokkii', 'Nueva'] : ['Tokkii', 'Nueva'],
      edition: currentEdition,
    };

    setCards([newCard, ...cards]);
    setSelectedCardId(newCard.id);
    showToast(`¡Nueva carta agregada a ${isEvil ? 'EvilTokkii' : 'GoodTokkii'}!`);
  };

  // Duplicate Card
  const handleDuplicateCard = (id: string) => {
    const target = cards.find((c) => c.id === id);
    if (!target) return;
    const isEvil = currentEdition === 'eviltokkii';
    const duplicated: CardData = {
      ...target,
      id: isEvil ? `evil-dup-${Date.now()}` : `tokkii-dup-${Date.now()}`,
      title: `${target.title} (Copia)`,
      cardNumber: String(cards.length + 1).padStart(3, '0'),
      edition: currentEdition,
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
    const filenamePrefix = currentEdition === 'eviltokkii' ? 'tokkii_eviltokkii_deck' : 'tokkii_goodtokkii_deck';
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cards, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${filenamePrefix}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Colección ${currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'} exportada en JSON`);
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
            showToast(`¡Se importaron ${imported.length} cartas a ${currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'} correctamente!`);
          }
        } catch {
          alert('El archivo JSON no tiene un formato válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Sync to Supabase ('cards' para GoodTokkii, 'evil_cards' para EvilTokkii)
  const handleSyncSupabase = async () => {
    const targetTable = currentEdition === 'eviltokkii' ? 'evil_cards' : 'cards';
    try {
      setIsSyncingSupabase(true);
      await syncAllCardsToSupabase(cards, targetTable);
      showToast(`✨ ¡Todas las cartas de ${currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'} respaldadas en Supabase (${targetTable})!`);
    } catch (err: any) {
      console.error(`Error syncing with Supabase (${targetTable}):`, err);
      showToast(`❌ Error al conectar con tabla ${targetTable}: ${err?.message || 'Crea la tabla en Supabase'}`);
    } finally {
      setIsSyncingSupabase(false);
    }
  };

  // Generate & Download SQL backup
  const handleExportSql = () => {
    const escapeSql = (str: string) => str.replace(/'/g, "''");
    const targetTable = currentEdition === 'eviltokkii' ? 'evil_cards' : 'cards';
    
    let sql = `-- Backup de Cartas Tokkii TCG (${currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'}) - Generado el ${new Date().toLocaleString()}\n`;
    sql += `-- Compatible con Supabase / PostgreSQL\n\n`;
    
    sql += `INSERT INTO public.${targetTable} (
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
    link.download = currentEdition === 'eviltokkii'
      ? `tokkii_eviltokkii_cards_backup_${Date.now()}.sql`
      : `tokkii_goodtokkii_cards_backup_${Date.now()}.sql`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(`Archivo SQL de ${currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'} generado y descargado`);
  };

  // Reset Defaults
  const handleResetDefaults = () => {
    if (confirm(`¿Restablecer la edición ${currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'} a los valores iniciales?`)) {
      if (currentEdition === 'eviltokkii') {
        setCards(DEFAULT_EVIL_CARDS);
        setSelectedCardId(DEFAULT_EVIL_CARDS[0]?.id || 'evil-tokkii-001');
      } else {
        setCards(DEFAULT_CARDS);
        setSelectedCardId(DEFAULT_CARDS[0].id);
      }
      setPackConfig(DEFAULT_PACK_CONFIG);
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
        }}
        onResetDefaults={handleResetDefaults}
        cardCount={cards.length}
        adminEmail={currentAdmin.email}
        onLogout={handleAdminLogout}
        currentEdition={currentEdition}
        onOpenEditionPicker={() => {
          setCurrentView('card_builder');
          setCardStudioMode('select_edition');
        }}
      />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-[1750px] w-full mx-auto px-2 sm:px-5 lg:px-6 py-4 sm:py-5 pb-20 lg:pb-6">
        {/* VIEW 1: CARD STUDIO */}
        {currentView === 'card_builder' && (
          <div>
            {/* MODE 0: SELECCIÓN DE EDICIÓN (VISTA CON LAS 2 VERSIONES) */}
            {cardStudioMode === 'select_edition' && (
              <EditionSelectionView
                currentEdition={currentEdition}
                goodCardCount={goodCards.length}
                evilCardCount={evilCards.length}
                onSelectEdition={(edition) => {
                  setCurrentEdition(edition);
                  const targetList = edition === 'eviltokkii' ? evilCards : goodCards;
                  setSelectedCardId(targetList[0]?.id || (edition === 'eviltokkii' ? 'evil-tokkii-001' : 'tokkii-001'));
                  setCardStudioMode('collection');
                }}
              />
            )}

            {/* MODE A: 4-COLUMN HORIZONTAL CARD COLLECTION VIEWER */}
            {cardStudioMode === 'collection' && (
              <CardCollectionView
                cards={cards}
                currentEdition={currentEdition}
                onOpenEditionPicker={() => setCardStudioMode('select_edition')}
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
                rarityConfigs={rarityConfigs}
                elementConfigs={elementConfigs}
                onOpenRarityModal={() => setIsRarityModalOpen(true)}
              />
            )}

            {/* MODE B: 2-PANEL CARD EDITOR (3D CANVAS + SETTINGS PANEL) */}
            {cardStudioMode === 'editor' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Editor Navigation Bar */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 backdrop-blur-md">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setCardStudioMode('collection')}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 border border-slate-700 hover:border-amber-400 transition-all cursor-pointer shadow"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver al Visor</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCardStudioMode('select_edition')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer shadow ${
                        currentEdition === 'eviltokkii'
                          ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 hover:bg-rose-900/80 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                          : 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60 shadow-[0_0_12px_rgba(234,179,8,0.2)]'
                      }`}
                      title="Cambiar entre Edición GoodTokkii y EvilTokkii"
                    >
                      {currentEdition === 'eviltokkii' ? (
                        <Flame className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>{currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'}</span>
                      <span className="text-[9px] opacity-70">▼</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRarityModalOpen(true)}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 hover:text-white transition-colors cursor-pointer shadow"
                      title="Configurar paletas y nombres de rarezas de esta edición"
                    >
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      <span>Paletas de Rarezas</span>
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
                  <div className="w-full lg:w-[420px] xl:w-[450px] shrink-0 flex flex-col items-center justify-center p-3 sm:p-5 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md shadow-2xl relative min-h-[440px] sm:min-h-[560px] lg:min-h-[640px]">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                      {currentEdition === 'eviltokkii' ? (
                        <Flame className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>Renderizador 3D ({currentEdition === 'eviltokkii' ? 'EvilTokkii' : 'GoodTokkii'})</span>
                    </div>

                    {currentCard ? (
                      <CardCanvas
                        ref={cardCanvasRef}
                        card={currentCard}
                        scale={editorCardScale}
                        interactive={true}
                        r2Folder={currentEdition === 'eviltokkii' ? 'cartas_renderizadas_EvilTokkii' : 'cartas_renderizadas'}
                        rarityConfigs={rarityConfigs}
                        elementConfigs={elementConfigs}
                        onExportSuccess={() => showToast('¡Imagen PNG generada y descargada!')}
                        onSaveCard={async (savedCard) => {
                          setCards((prev) => prev.map((c) => (c.id === savedCard.id ? savedCard : c)));
                          const targetTable = currentEdition === 'eviltokkii' ? 'evil_cards' : 'cards';
                          try {
                            await saveCardToSupabase(savedCard, targetTable);
                          } catch (err) {
                            console.warn(`Could not save card to Supabase table ${targetTable}:`, err);
                          }
                        }}
                        onSaveSuccess={() => {
                          showToast(
                            currentEdition === 'eviltokkii'
                              ? `¡Carta #${currentCard.cardNumber} guardada y subida a R2 (cartas_renderizadas_EvilTokkii)!`
                              : `¡Carta #${currentCard.cardNumber} guardada y subida a R2!`
                          );
                        }}
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
                        rarityConfigs={rarityConfigs}
                        elementConfigs={elementConfigs}
                        onSaveToSupabase={async (c) => {
                          const targetTable = currentEdition === 'eviltokkii' ? 'evil_cards' : 'cards';
                          await saveCardToSupabase(c, targetTable);
                        }}
                        onSaveToR2={async () => {
                          await cardCanvasRef.current?.saveToR2();
                        }}
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

        {/* VIEW 5: GIFT CODES (Generar y Administrar Códigos de Regalo de Sobres) */}
        {currentView === 'gift_codes' && (
          <GiftCodesView onShowToast={showToast} />
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
        r2Folder={currentEdition === 'eviltokkii' ? 'cartas_renderizadas_EvilTokkii' : 'cartas_renderizadas'}
        edition={currentEdition}
        rarityConfigs={rarityConfigs}
        elementConfigs={elementConfigs}
        onSaveCardSuccess={(updatedList) => {
          setCards(updatedList);
        }}
        onShowToast={showToast}
      />

      {/* Rarity Config Modal (Paletas y nombres independientes por edición) */}
      <RarityConfigModal
        isOpen={isRarityModalOpen}
        onClose={() => setIsRarityModalOpen(false)}
        edition={currentEdition}
        configs={rarityConfigs}
        onSave={handleSaveRarityConfigs}
        onReset={handleResetRarityConfigs}
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
