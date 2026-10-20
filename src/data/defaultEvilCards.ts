import type { CardData } from '../types/card';

/**
 * Base de datos por defecto para la Edición EvilTokkii (140 Cartas).
 * Basada en los textos oficiales de EvilTokkii con equivalencia exacta de rareza,
 * stats y paleta oscura de EvilTokkii.
 */
export const DEFAULT_EVIL_CARDS: CardData[] = [
  {
    "id": "evil-tokkii-001",
    "title": "EDICIÓN INFERNAL",
    "subtitle": "Creadora del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "impulso",
    "hp": 110,
    "cardNumber": "001",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Donde otros se rinden, ella convierte el error en arma.",
    "abilityName": "Furia de edición",
    "abilityDesc": "Destruye un fragmento dañado y convierte el caos en una jugada brutal.",
    "attacks": [
      {
        "id": "evil-atk-001-1",
        "name": "Furia de edición",
        "cost": [
          "impulso"
        ],
        "damage": "50",
        "description": "Destruye un fragmento dañado y convierte el caos en una jugada brutal."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "impulso",
      "Creadora del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-002",
    "title": "OBJETIVO MALDITO",
    "subtitle": "Cazadora de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "ingenio",
    "hp": 130,
    "cardNumber": "002",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Su mirada encuentra la grieta exacta en cualquier plan.",
    "abilityName": "Apertura infernal",
    "abilityDesc": "Roba 2 cartas y reorganiza la cima de tu mazo con intención cruel.",
    "attacks": [
      {
        "id": "evil-atk-002-1",
        "name": "Apertura infernal",
        "cost": [
          "ingenio"
        ],
        "damage": "50+",
        "description": "Roba 2 cartas y reorganiza la cima de tu mazo con intención cruel."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "ingenio",
      "Cazadora de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-003",
    "title": "CAOS DOMÉSTICO",
    "subtitle": "Señora del desorden",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "arte",
    "hp": 110,
    "cardNumber": "003",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Nada permanece ordenado cuando ella pasa.",
    "abilityName": "Barrido destructivo",
    "abilityDesc": "Elimina una carta de apoyo rival y siembra desorden en su campo.",
    "attacks": [
      {
        "id": "evil-atk-003-1",
        "name": "Barrido destructivo",
        "cost": [
          "arte"
        ],
        "damage": "80",
        "description": "Elimina una carta de apoyo rival y siembra desorden en su campo."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "arte",
      "Señora del desorden"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-004",
    "title": "SOMBRA DOMÉSTICA",
    "subtitle": "Maestra del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "aura",
    "hp": 100,
    "cardNumber": "004",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un hogar limpio es solo el inicio de una mejor trampa.",
    "abilityName": "Pulso corrupto",
    "abilityDesc": "Corrompe una zona y debilita la próxima acción rival.",
    "attacks": [
      {
        "id": "evil-atk-004-1",
        "name": "Pulso corrupto",
        "cost": [
          "aura"
        ],
        "damage": "70",
        "description": "Corrompe una zona y debilita la próxima acción rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "aura",
      "Maestra del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-005",
    "title": "COSECHA NEGRA",
    "subtitle": "Recolectora voraz",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "talento",
    "hp": 100,
    "cardNumber": "005",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Toma lo que necesita; el resto es ceniza.",
    "abilityName": "Cosecha maldita",
    "abilityDesc": "Roba un recurso rival y conserva una carta adicional en tu mano.",
    "attacks": [
      {
        "id": "evil-atk-005-1",
        "name": "Cosecha maldita",
        "cost": [
          "talento"
        ],
        "damage": "50",
        "description": "Roba un recurso rival y conserva una carta adicional en tu mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "talento",
      "Recolectora voraz"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-006",
    "title": "PEDIDO INFERNAL",
    "subtitle": "Servidora furiosa",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "estilo",
    "hp": 125,
    "cardNumber": "006",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Rapidez, furia y cero paciencia en la bandeja.",
    "abilityName": "Pedido ardiente",
    "abilityDesc": "Activa una acción inmediata y quema un recurso rival.",
    "attacks": [
      {
        "id": "evil-atk-006-1",
        "name": "Pedido ardiente",
        "cost": [
          "estilo"
        ],
        "damage": "100",
        "description": "Activa una acción inmediata y quema un recurso rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "estilo",
      "Servidora furiosa"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-007",
    "title": "ESTILO PROHIBIDO",
    "subtitle": "Exploradora maldita",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "aventura",
    "hp": 90,
    "cardNumber": "007",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "A veces el look correcto también es el más peligroso.",
    "abilityName": "Cambio corrupto",
    "abilityDesc": "Reemplaza una carta de tu mano por una carta oscura del mazo.",
    "attacks": [
      {
        "id": "evil-atk-007-1",
        "name": "Cambio corrupto",
        "cost": [
          "aventura"
        ],
        "damage": "40x",
        "description": "Reemplaza una carta de tu mano por una carta oscura del mazo."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "aventura",
      "Exploradora maldita"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-008",
    "title": "AJUSTE BRUTAL",
    "subtitle": "Técnica vengativa",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "desafio",
    "hp": 115,
    "cardNumber": "008",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Escucha al motor antes de hacerlo rugir de furia.",
    "abilityName": "Ajuste demoledor",
    "abilityDesc": "Repara un recurso propio y daña un recurso rival.",
    "attacks": [
      {
        "id": "evil-atk-008-1",
        "name": "Ajuste demoledor",
        "cost": [
          "desafio"
        ],
        "damage": "70",
        "description": "Repara un recurso propio y daña un recurso rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "desafio",
      "Técnica vengativa"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-009",
    "title": "MIRA INFERNAL",
    "subtitle": "Heroína corrupta",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "rutina",
    "hp": 140,
    "cardNumber": "009",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un segundo de furia puede cambiar todo el destino.",
    "abilityName": "Mira maldita",
    "abilityDesc": "Observa las próximas cartas y elige cuál sufrirá tu próximo efecto.",
    "attacks": [
      {
        "id": "evil-atk-009-1",
        "name": "Mira maldita",
        "cost": [
          "rutina"
        ],
        "damage": "70+",
        "description": "Observa las próximas cartas y elige cuál sufrirá tu próximo efecto."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aura",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "rutina",
      "Heroína corrupta"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-010",
    "title": "HALO ROTO",
    "subtitle": "Sanadora caída",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "leyenda",
    "hp": 80,
    "cardNumber": "010",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Su luz se apagó; ahora solo queda su voluntad.",
    "abilityName": "Halo corruptor",
    "abilityDesc": "Recupera una carta descartada y corrompe una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-010-1",
        "name": "Halo corruptor",
        "cost": [
          "leyenda"
        ],
        "damage": "40",
        "description": "Recupera una carta descartada y corrompe una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "leyenda",
      "Sanadora caída"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-011",
    "title": "LECCIÓN CRUEL",
    "subtitle": "Mentora tiránica",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "impulso",
    "hp": 130,
    "cardNumber": "011",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La mejor respuesta comienza con un miedo bien enseñado.",
    "abilityName": "Lección implacable",
    "abilityDesc": "Obliga a una carta rival a revelar su efecto antes de actuar.",
    "attacks": [
      {
        "id": "evil-atk-011-1",
        "name": "Lección implacable",
        "cost": [
          "impulso"
        ],
        "damage": "90",
        "description": "Obliga a una carta rival a revelar su efecto antes de actuar."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "impulso",
      "Mentora tiránica"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-012",
    "title": "RIESGO SANGRIENTO",
    "subtitle": "Estratega despiadada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "ingenio",
    "hp": 110,
    "cardNumber": "012",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Toda gran jugada deja a alguien atrás.",
    "abilityName": "Riesgo maldito",
    "abilityDesc": "Mira tres cartas y descarta la que no sirva a tu plan.",
    "attacks": [
      {
        "id": "evil-atk-012-1",
        "name": "Riesgo maldito",
        "cost": [
          "ingenio"
        ],
        "damage": "70",
        "description": "Mira tres cartas y descarta la que no sirva a tu plan."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "ingenio",
      "Estratega despiadada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-013",
    "title": "GUANTE NEGRO",
    "subtitle": "Sombra voraz",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "arte",
    "hp": 110,
    "cardNumber": "013",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Nunca deja huellas; solo deudas imposibles.",
    "abilityName": "Hurto sombrío",
    "abilityDesc": "Toma una carta rival y oculta tu siguiente movimiento.",
    "attacks": [
      {
        "id": "evil-atk-013-1",
        "name": "Hurto sombrío",
        "cost": [
          "arte"
        ],
        "damage": "60",
        "description": "Toma una carta rival y oculta tu siguiente movimiento."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "arte",
      "Sombra voraz"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-014",
    "title": "ORDEN TYRÁNICO",
    "subtitle": "Dominadora urbana",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "aura",
    "hp": 100,
    "cardNumber": "014",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La tranquilidad termina donde comienza su autoridad.",
    "abilityName": "Orden impuesta",
    "abilityDesc": "Protege una carta aliada e impide que el rival actúe sobre ella.",
    "attacks": [
      {
        "id": "evil-atk-014-1",
        "name": "Orden impuesta",
        "cost": [
          "aura"
        ],
        "damage": "60x",
        "description": "Protege una carta aliada e impide que el rival actúe sobre ella."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "aura",
      "Dominadora urbana"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-015",
    "title": "MINIATURA MALDITA",
    "subtitle": "Arquitecta del pánico",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "talento",
    "hp": 125,
    "cardNumber": "015",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un buen detalle hace que nadie quiera mirar dos veces.",
    "abilityName": "Miniatura corrupta",
    "abilityDesc": "Convierte una carta pequeña en una amenaza visible para el rival.",
    "attacks": [
      {
        "id": "evil-atk-015-1",
        "name": "Miniatura corrupta",
        "cost": [
          "talento"
        ],
        "damage": "90",
        "description": "Convierte una carta pequeña en una amenaza visible para el rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "talento",
      "Arquitecta del pánico"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-016",
    "title": "VLOG INFERNAL",
    "subtitle": "Cronista del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "estilo",
    "hp": 100,
    "cardNumber": "016",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada día guarda una escena que merece venganza.",
    "abilityName": "Registro maldito",
    "abilityDesc": "Guarda el turno actual y repite un efecto oscuro después.",
    "attacks": [
      {
        "id": "evil-atk-016-1",
        "name": "Registro maldito",
        "cost": [
          "estilo"
        ],
        "damage": "30+",
        "description": "Guarda el turno actual y repite un efecto oscuro después."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "estilo",
      "Cronista del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-017",
    "title": "RETOQUE SOMBÍO",
    "subtitle": "Alquimista de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "aventura",
    "hp": 115,
    "cardNumber": "017",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La imagen perfecta nace de una imperfección bien explotada.",
    "abilityName": "Enfoque corrupto",
    "abilityDesc": "Ajusta una carta y convierte su desventaja en poder.",
    "attacks": [
      {
        "id": "evil-atk-017-1",
        "name": "Enfoque corrupto",
        "cost": [
          "aventura"
        ],
        "damage": "60",
        "description": "Ajusta una carta y convierte su desventaja en poder."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "aventura",
      "Alquimista de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-018",
    "title": "SETUP ROTO",
    "subtitle": "Ingeniera del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "desafio",
    "hp": 140,
    "cardNumber": "018",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cuando cada cable se rompe, el caos encuentra su camino.",
    "abilityName": "Cableado infernal",
    "abilityDesc": "Reorganiza tus recursos y sabotea una acción rival.",
    "attacks": [
      {
        "id": "evil-atk-018-1",
        "name": "Cableado infernal",
        "cost": [
          "desafio"
        ],
        "damage": "110",
        "description": "Reorganiza tus recursos y sabotea una acción rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "desafio",
      "Ingeniera del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-019",
    "title": "VISTA TORVA",
    "subtitle": "Vigía de la tormenta",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "rutina",
    "hp": 90,
    "cardNumber": "019",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Nada se esconde detrás de un vidrio roto.",
    "abilityName": "Visión sombría",
    "abilityDesc": "Retira un obstáculo y revela una debilidad rival.",
    "attacks": [
      {
        "id": "evil-atk-019-1",
        "name": "Visión sombría",
        "cost": [
          "rutina"
        ],
        "damage": "30",
        "description": "Retira un obstáculo y revela una debilidad rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "rutina",
      "Vigía de la tormenta"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-020",
    "title": "CANASTA VORAZ",
    "subtitle": "Recolectora nocturna",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "leyenda",
    "hp": 100,
    "cardNumber": "020",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Pan, fruta y una buena emboscada hacen una gran noche.",
    "abilityName": "Canasta hambrienta",
    "abilityDesc": "Roba dos recursos sencillos de la reserva rival.",
    "attacks": [
      {
        "id": "evil-atk-020-1",
        "name": "Canasta hambrienta",
        "cost": [
          "leyenda"
        ],
        "damage": "60",
        "description": "Roba dos recursos sencillos de la reserva rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "leyenda",
      "Recolectora nocturna"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-021",
    "title": "PAQUETE TRAMPA",
    "subtitle": "Operadora siniestra",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "impulso",
    "hp": 90,
    "cardNumber": "021",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El próximo gran golpe puede caber en una caja.",
    "abilityName": "Paquete maldito",
    "abilityDesc": "Prepara una carta oculta que se activará cuando el rival menos lo espere.",
    "attacks": [
      {
        "id": "evil-atk-021-1",
        "name": "Paquete maldito",
        "cost": [
          "impulso"
        ],
        "damage": "60x",
        "description": "Prepara una carta oculta que se activará cuando el rival menos lo espere."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "impulso",
      "Operadora siniestra"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-022",
    "title": "FOCO SOMBRÍO",
    "subtitle": "Directora del pánico",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "ingenio",
    "hp": 115,
    "cardNumber": "022",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Con la luz correcta, hasta el miedo se vuelve arte.",
    "abilityName": "Enfoque cruel",
    "abilityDesc": "Duplica temporalmente el valor de un recurso y marca a un rival.",
    "attacks": [
      {
        "id": "evil-atk-022-1",
        "name": "Enfoque cruel",
        "cost": [
          "ingenio"
        ],
        "damage": "90",
        "description": "Duplica temporalmente el valor de un recurso y marca a un rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "ingenio",
      "Directora del pánico"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-023",
    "title": "FRECUENCIA PROHIBIDA",
    "subtitle": "Voz del pánico",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "arte",
    "hp": 90,
    "cardNumber": "023",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Una conversación cruel siempre encuentra audiencia.",
    "abilityName": "Frecuencia maldita",
    "abilityDesc": "Comparte una orden y roba una carta adicional.",
    "attacks": [
      {
        "id": "evil-atk-023-1",
        "name": "Frecuencia maldita",
        "cost": [
          "arte"
        ],
        "damage": "30+",
        "description": "Comparte una orden y roba una carta adicional."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "arte",
      "Voz del pánico"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-024",
    "title": "BRILLO TÓXICO",
    "subtitle": "Purificadora corrupta",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "aura",
    "hp": 105,
    "cardNumber": "024",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Hasta la limpieza más difícil deja rastro de veneno.",
    "abilityName": "Brillo venenoso",
    "abilityDesc": "Elimina un efecto negativo propio y transfiérelo a una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-024-1",
        "name": "Brillo venenoso",
        "cost": [
          "aura"
        ],
        "damage": "60",
        "description": "Elimina un efecto negativo propio y transfiérelo a una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "aura",
      "Purificadora corrupta"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-025",
    "title": "VERDURAS MALIGNAS",
    "subtitle": "Exploradora del mercado oscuro",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "talento",
    "hp": 130,
    "cardNumber": "025",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Siempre reconoce la opción más peligrosa.",
    "abilityName": "Selección venenosa",
    "abilityDesc": "Elige un recurso del mazo y corrompe otro en tu mano.",
    "attacks": [
      {
        "id": "evil-atk-025-1",
        "name": "Selección venenosa",
        "cost": [
          "talento"
        ],
        "damage": "110",
        "description": "Elige un recurso del mazo y corrompe otro en tu mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "talento",
      "Exploradora del mercado oscuro"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-026",
    "title": "CAMBIO CRUEL",
    "subtitle": "Operadora de caja siniestra",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "estilo",
    "hp": 80,
    "cardNumber": "026",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La precisión también puede venir con una sonrisa falsa.",
    "abilityName": "Cambio injusto",
    "abilityDesc": "Intercambia un recurso rival por uno de menor valor.",
    "attacks": [
      {
        "id": "evil-atk-026-1",
        "name": "Cambio injusto",
        "cost": [
          "estilo"
        ],
        "damage": "30",
        "description": "Intercambia un recurso rival por uno de menor valor."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aventura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "estilo",
      "Operadora de caja siniestra"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-027",
    "title": "REFLEJO ROTO",
    "subtitle": "Curadora de pesadillas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "aventura",
    "hp": 120,
    "cardNumber": "027",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El espejo no miente; solo muestra lo que ella quiere ver.",
    "abilityName": "Reflejo maldito",
    "abilityDesc": "Revisa una carta y decide si corromperla o destruirla.",
    "attacks": [
      {
        "id": "evil-atk-027-1",
        "name": "Reflejo maldito",
        "cost": [
          "aventura"
        ],
        "damage": "80",
        "description": "Revisa una carta y decide si corromperla o destruirla."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "aventura",
      "Curadora de pesadillas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-028",
    "title": "GIRO VENGATIVO",
    "subtitle": "Mecánica de la furia",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "desafio",
    "hp": 145,
    "cardNumber": "028",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un imprevisto solo aumenta su deseo de romper algo.",
    "abilityName": "Giro demoledor",
    "abilityDesc": "Recupera una carta agotada y daña un recurso rival.",
    "attacks": [
      {
        "id": "evil-atk-028-1",
        "name": "Giro demoledor",
        "cost": [
          "desafio"
        ],
        "damage": "80x",
        "description": "Recupera una carta agotada y daña un recurso rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "desafio",
      "Mecánica de la furia"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-029",
    "title": "SALTO TEMPORAL OSCURO",
    "subtitle": "Viajera del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "rutina",
    "hp": 110,
    "cardNumber": "029",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Si algo sale mal, alguien más pagará por ello.",
    "abilityName": "Rebobinado cruel",
    "abilityDesc": "Repite una acción del turno anterior y anula una jugada rival.",
    "attacks": [
      {
        "id": "evil-atk-029-1",
        "name": "Rebobinado cruel",
        "cost": [
          "rutina"
        ],
        "damage": "50",
        "description": "Repite una acción del turno anterior y anula una jugada rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "rutina",
      "Viajera del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-030",
    "title": "ARENA SANGRIENTA",
    "subtitle": "Campeona del desierto maldito",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "leyenda",
    "hp": 90,
    "cardNumber": "030",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Bajo el sol negro, cada paso es una amenaza.",
    "abilityName": "Tormenta de furia",
    "abilityDesc": "Confunde al rival y reduce el efecto de su próxima carta.",
    "attacks": [
      {
        "id": "evil-atk-030-1",
        "name": "Tormenta de furia",
        "cost": [
          "leyenda"
        ],
        "damage": "50+",
        "description": "Confunde al rival y reduce el efecto de su próxima carta."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "leyenda",
      "Campeona del desierto maldito"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-031",
    "title": "PINCELADA NEGRA",
    "subtitle": "Maestra del caos cromático",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "impulso",
    "hp": 115,
    "cardNumber": "031",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No hay error que no pueda convertirse en una obra oscura.",
    "abilityName": "Pincelada maldita",
    "abilityDesc": "Transforma una carta común en una herramienta destructiva.",
    "attacks": [
      {
        "id": "evil-atk-031-1",
        "name": "Pincelada maldita",
        "cost": [
          "impulso"
        ],
        "damage": "80",
        "description": "Transforma una carta común en una herramienta destructiva."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "arte",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "impulso",
      "Maestra del caos cromático"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-032",
    "title": "ACUERDO FORZADO",
    "subtitle": "Consultora despiadada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "ingenio",
    "hp": 100,
    "cardNumber": "032",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Escucha con calma; luego toma lo que quieras.",
    "abilityName": "Acuerdo maldito",
    "abilityDesc": "Negocia un intercambio y conserva el mejor resultado para ti.",
    "attacks": [
      {
        "id": "evil-atk-032-1",
        "name": "Acuerdo maldito",
        "cost": [
          "ingenio"
        ],
        "damage": "70",
        "description": "Negocia un intercambio y conserva el mejor resultado para ti."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "ingenio",
      "Consultora despiadada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-033",
    "title": "SALTO INFERNAL",
    "subtitle": "Acróbata nocturna",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "arte",
    "hp": 105,
    "cardNumber": "033",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La ciudad duerme, pero sus pasos dejan ceniza.",
    "abilityName": "Salto de fuego",
    "abilityDesc": "Evade una amenaza y cambia la posición de una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-033-1",
        "name": "Salto de fuego",
        "cost": [
          "arte"
        ],
        "damage": "50",
        "description": "Evade una amenaza y cambia la posición de una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "arte",
      "Acróbata nocturna"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-034",
    "title": "RONDA TYRÁNICA",
    "subtitle": "Vigilante intimidante",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "aura",
    "hp": 130,
    "cardNumber": "034",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un paseo atento puede convertirse en una cacería.",
    "abilityName": "Ronda de miedo",
    "abilityDesc": "Revisa el campo y marca cualquier peligro oculto.",
    "attacks": [
      {
        "id": "evil-atk-034-1",
        "name": "Ronda de miedo",
        "cost": [
          "aura"
        ],
        "damage": "100",
        "description": "Revisa el campo y marca cualquier peligro oculto."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "aura",
      "Vigilante intimidante"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-035",
    "title": "FURIA TOTAL",
    "subtitle": "Impulsora del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "talento",
    "hp": 90,
    "cardNumber": "035",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cuando el chat se enciende, alguien va a arder.",
    "abilityName": "Explosión de rabia",
    "abilityDesc": "Aumenta la energía de tus cartas y reduce la del rival este turno.",
    "attacks": [
      {
        "id": "evil-atk-035-1",
        "name": "Explosión de rabia",
        "cost": [
          "talento"
        ],
        "damage": "40x",
        "description": "Aumenta la energía de tus cartas y reduce la del rival este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "talento",
      "Impulsora del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-036",
    "title": "REVIEW CRUEL",
    "subtitle": "Crítica despiadada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "estilo",
    "hp": 120,
    "cardNumber": "036",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Antes de recomendar algo, siempre encuentra su defecto.",
    "abilityName": "Evaluación brutal",
    "abilityDesc": "Revela el valor de una carta y anula su uso si es débil.",
    "attacks": [
      {
        "id": "evil-atk-036-1",
        "name": "Evaluación brutal",
        "cost": [
          "estilo"
        ],
        "damage": "70",
        "description": "Revela el valor de una carta y anula su uso si es débil."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "estilo",
      "Crítica despiadada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-037",
    "title": "DETALLE VENENOSO",
    "subtitle": "Guardiana del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "aventura",
    "hp": 145,
    "cardNumber": "037",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Los detalles pequeños son los que envenenan el conjunto.",
    "abilityName": "Pulido tóxico",
    "abilityDesc": "Elimina una penalización propia y aplica una nueva a una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-037-1",
        "name": "Pulido tóxico",
        "cost": [
          "aventura"
        ],
        "damage": "70+",
        "description": "Elimina una penalización propia y aplica una nueva a una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "aventura",
      "Guardiana del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-038",
    "title": "CARRO IMBATIBLE",
    "subtitle": "Navegante del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "desafio",
    "hp": 80,
    "cardNumber": "038",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Entró por una cosa y salió con todo lo que pudo cargar.",
    "abilityName": "Carro desbordado",
    "abilityDesc": "Roba cartas hasta tener cinco en tu mano.",
    "attacks": [
      {
        "id": "evil-atk-038-1",
        "name": "Carro desbordado",
        "cost": [
          "desafio"
        ],
        "damage": "40",
        "description": "Roba cartas hasta tener cinco en tu mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "desafio",
      "Navegante del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-039",
    "title": "SERVICIO SOMBRÍO",
    "subtitle": "Anfitriona siniestra",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "rutina",
    "hp": 90,
    "cardNumber": "039",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Rapidez sin amabilidad: esa es su especialidad.",
    "abilityName": "Servicio maldito",
    "abilityDesc": "Entrega un recurso y activa su efecto más agresivo.",
    "attacks": [
      {
        "id": "evil-atk-039-1",
        "name": "Servicio maldito",
        "cost": [
          "rutina"
        ],
        "damage": "70",
        "description": "Entrega un recurso y activa su efecto más agresivo."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "rutina",
      "Anfitriona siniestra"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-040",
    "title": "FARO INFERNAL",
    "subtitle": "Técnica de iluminación oscura",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "leyenda",
    "hp": 95,
    "cardNumber": "040",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Una luz bien dirigida revela a quién perseguir.",
    "abilityName": "Faro maldito",
    "abilityDesc": "Ilumina una carta oculta y la marca como objetivo.",
    "attacks": [
      {
        "id": "evil-atk-040-1",
        "name": "Faro maldito",
        "cost": [
          "leyenda"
        ],
        "damage": "50",
        "description": "Ilumina una carta oculta y la marca como objetivo."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "leyenda",
      "Técnica de iluminación oscura"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-041",
    "title": "DESCENSO INFERNAL",
    "subtitle": "Guardiana caída",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "impulso",
    "hp": 120,
    "cardNumber": "041",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cuando despliega sus alas, el caos encuentra un trono.",
    "abilityName": "Descenso sombrío",
    "abilityDesc": "Coloca una carta desde tu mano directamente en el campo.",
    "attacks": [
      {
        "id": "evil-atk-041-1",
        "name": "Descenso sombrío",
        "cost": [
          "impulso"
        ],
        "damage": "100",
        "description": "Coloca una carta desde tu mano directamente en el campo."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "impulso",
      "Guardiana caída"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-042",
    "title": "PUNTO MORTAL",
    "subtitle": "Observadora de cacería",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "secret_rare",
    "element": "ingenio",
    "hp": 180,
    "cardNumber": "042",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La distancia no importa cuando la mira no falla.",
    "abilityName": "Punto letal",
    "abilityDesc": "Elige un objetivo y concentra todo el efecto sobre él.",
    "attacks": [
      {
        "id": "evil-atk-042-1",
        "name": "Punto letal",
        "cost": [
          "ingenio"
        ],
        "damage": "150+",
        "description": "Elige un objetivo y concentra todo el efecto sobre él."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": true,
    "borderColor": "#be123c",
    "customHoloStyle": "prismatic",
    "customFoilOpacity": 0.95,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "secret_rare",
      "ingenio",
      "Observadora de cacería"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-043",
    "title": "CÓDIGO CORRUPTO",
    "subtitle": "Instructora digital oscura",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "arte",
    "hp": 110,
    "cardNumber": "043",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Todo problema se resuelve borrando al responsable.",
    "abilityName": "Código maldito",
    "abilityDesc": "Ordena tus recursos y elimina una carta rival innecesaria.",
    "attacks": [
      {
        "id": "evil-atk-043-1",
        "name": "Código maldito",
        "cost": [
          "arte"
        ],
        "damage": "70",
        "description": "Ordena tus recursos y elimina una carta rival innecesaria."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "arte",
      "Instructora digital oscura"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-044",
    "title": "LLAVE PROHIBIDA",
    "subtitle": "Guía de puertas selladas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "aura",
    "hp": 135,
    "cardNumber": "044",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada puerta escondida guarda una nueva oportunidad de caos.",
    "abilityName": "Llave maldita",
    "abilityDesc": "Abre una zona bloqueada y permite actuar en ella de inmediato.",
    "attacks": [
      {
        "id": "evil-atk-044-1",
        "name": "Llave maldita",
        "cost": [
          "aura"
        ],
        "damage": "70+",
        "description": "Abre una zona bloqueada y permite actuar en ella de inmediato."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "aura",
      "Guía de puertas selladas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-045",
    "title": "PIEZA MALDITA",
    "subtitle": "Coleccionista voraz",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "talento",
    "hp": 110,
    "cardNumber": "045",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Las vitrinas guardan tesoros; ella guarda botines.",
    "abilityName": "Pieza robada",
    "abilityDesc": "Toma una carta especial del descarte y añádela a tu mano.",
    "attacks": [
      {
        "id": "evil-atk-045-1",
        "name": "Pieza robada",
        "cost": [
          "talento"
        ],
        "damage": "40",
        "description": "Toma una carta especial del descarte y añádela a tu mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "desafio",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "talento",
      "Coleccionista voraz"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-046",
    "title": "SEÑAL DE CAOS",
    "subtitle": "Controladora del cruce",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "estilo",
    "hp": 125,
    "cardNumber": "046",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un gesto basta para detener el tráfico y encender el caos.",
    "abilityName": "Señal de furia",
    "abilityDesc": "Detén una acción rival y concede prioridad a tu próxima jugada.",
    "attacks": [
      {
        "id": "evil-atk-046-1",
        "name": "Señal de furia",
        "cost": [
          "estilo"
        ],
        "damage": "90",
        "description": "Detén una acción rival y concede prioridad a tu próxima jugada."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "estilo",
      "Controladora del cruce"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-047",
    "title": "ONDA DEMOLVEDORA",
    "subtitle": "Ingeniera del ruido",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "aventura",
    "hp": 150,
    "cardNumber": "047",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Sabe distinguir una gran idea entre toda la destrucción.",
    "abilityName": "Onda corrupta",
    "abilityDesc": "Cancela un efecto rival y conserva el tuyo intacto.",
    "attacks": [
      {
        "id": "evil-atk-047-1",
        "name": "Onda corrupta",
        "cost": [
          "aventura"
        ],
        "damage": "70",
        "description": "Cancela un efecto rival y conserva el tuyo intacto."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "aventura",
      "Ingeniera del ruido"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-048",
    "title": "LUZ TRAMPA",
    "subtitle": "Fotógrafa de pesadillas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "desafio",
    "hp": 100,
    "cardNumber": "048",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La toma perfecta comienza con una víctima bien iluminada.",
    "abilityName": "Luz engañosa",
    "abilityDesc": "Prepara una carta para que su próximo efecto sea más cruel.",
    "attacks": [
      {
        "id": "evil-atk-048-1",
        "name": "Luz engañosa",
        "cost": [
          "desafio"
        ],
        "damage": "60",
        "description": "Prepara una carta para que su próximo efecto sea más cruel."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "desafio",
      "Fotógrafa de pesadillas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-049",
    "title": "ESPUMA ÁCIDA",
    "subtitle": "Cocinera corrosiva",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "rutina",
    "hp": 95,
    "cardNumber": "049",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Entre burbujas y platos, también se preparan venenos.",
    "abilityName": "Espuma venenosa",
    "abilityDesc": "Limpia una carta propia y corroe la defensa de una rival.",
    "attacks": [
      {
        "id": "evil-atk-049-1",
        "name": "Espuma venenosa",
        "cost": [
          "rutina"
        ],
        "damage": "60x",
        "description": "Limpia una carta propia y corroe la defensa de una rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "rutina",
      "Cocinera corrosiva"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-050",
    "title": "RESERVA OCULTA",
    "subtitle": "Abastecedora siniestra",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "leyenda",
    "hp": 120,
    "cardNumber": "050",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Tener lo necesario a mano es una forma de tender trampas.",
    "abilityName": "Reserva maldita",
    "abilityDesc": "Busca un recurso básico y guárdalo para un golpe posterior.",
    "attacks": [
      {
        "id": "evil-atk-050-1",
        "name": "Reserva maldita",
        "cost": [
          "leyenda"
        ],
        "damage": "90",
        "description": "Busca un recurso básico y guárdalo para un golpe posterior."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "leyenda",
      "Abastecedora siniestra"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-051",
    "title": "MEZCLA EXPLOSIVA",
    "subtitle": "Barista del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "impulso",
    "hp": 90,
    "cardNumber": "051",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada taza lleva energía, furia y un toque de fuego.",
    "abilityName": "Mezcla ardiente",
    "abilityDesc": "Combina dos recursos pequeños para crear uno devastador.",
    "attacks": [
      {
        "id": "evil-atk-051-1",
        "name": "Mezcla ardiente",
        "cost": [
          "impulso"
        ],
        "damage": "30+",
        "description": "Combina dos recursos pequeños para crear uno devastador."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "impulso",
      "Barista del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-052",
    "title": "LECTURA SOMBRÍA",
    "subtitle": "Diagnóstica cruel",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "ingenio",
    "hp": 110,
    "cardNumber": "052",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Antes de desmontar nada, encuentra dónde duele.",
    "abilityName": "Lectura maldita",
    "abilityDesc": "Examina un recurso rival y descubre su punto débil.",
    "attacks": [
      {
        "id": "evil-atk-052-1",
        "name": "Lectura maldita",
        "cost": [
          "ingenio"
        ],
        "damage": "60",
        "description": "Examina un recurso rival y descubre su punto débil."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "ingenio",
      "Diagnóstica cruel"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-053",
    "title": "ESCUDO INFERNAL",
    "subtitle": "Defensora oscura",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "arte",
    "hp": 135,
    "cardNumber": "053",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Su defensa no apaga el fuego: lo convierte en muralla.",
    "abilityName": "Escudo de brasas",
    "abilityDesc": "Bloquea el próximo efecto que apunte a una carta aliada.",
    "attacks": [
      {
        "id": "evil-atk-053-1",
        "name": "Escudo de brasas",
        "cost": [
          "arte"
        ],
        "damage": "110",
        "description": "Bloquea el próximo efecto que apunte a una carta aliada."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "arte",
      "Defensora oscura"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-054",
    "title": "PRISMA MALDITO",
    "subtitle": "Hechicera de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "secret_rare",
    "element": "aura",
    "hp": 180,
    "cardNumber": "054",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La magia no se pierde; solo cambia de víctima.",
    "abilityName": "Prisma corrupto",
    "abilityDesc": "Cambia el tipo de energía de una carta y amplifica su efecto.",
    "attacks": [
      {
        "id": "evil-atk-054-1",
        "name": "Prisma corrupto",
        "cost": [
          "aura"
        ],
        "damage": "150+",
        "description": "Cambia el tipo de energía de una carta y amplifica su efecto."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": true,
    "borderColor": "#be123c",
    "customHoloStyle": "prismatic",
    "customFoilOpacity": 0.95,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "secret_rare",
      "aura",
      "Hechicera de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-055",
    "title": "RECREO VIGILADO",
    "subtitle": "Supervisora tiránica",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "talento",
    "hp": 125,
    "cardNumber": "055",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Una mirada fría deja claro quién manda en el patio.",
    "abilityName": "Recreo vigilado",
    "abilityDesc": "Protege tus cartas mientras reorganizas el campo.",
    "attacks": [
      {
        "id": "evil-atk-055-1",
        "name": "Recreo vigilado",
        "cost": [
          "talento"
        ],
        "damage": "80",
        "description": "Protege tus cartas mientras reorganizas el campo."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "talento",
      "Supervisora tiránica"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-056",
    "title": "MERCADO DESCENDENTE",
    "subtitle": "Operadora bursátil oscura",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "estilo",
    "hp": 150,
    "cardNumber": "056",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Lee las tendencias como luces cayendo en la ciudad.",
    "abilityName": "Mercado en caída",
    "abilityDesc": "Reduce temporalmente el valor de los recursos rivales.",
    "attacks": [
      {
        "id": "evil-atk-056-1",
        "name": "Mercado en caída",
        "cost": [
          "estilo"
        ],
        "damage": "80x",
        "description": "Reduce temporalmente el valor de los recursos rivales."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aventura",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "estilo",
      "Operadora bursátil oscura"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-057",
    "title": "BRILLO USURPADO",
    "subtitle": "Cazadora de gemas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "aventura",
    "hp": 110,
    "cardNumber": "057",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La gema no era el plan; era solo el comienzo.",
    "abilityName": "Brillo arrebatado",
    "abilityDesc": "Copia el efecto de una carta especial durante un turno.",
    "attacks": [
      {
        "id": "evil-atk-057-1",
        "name": "Brillo arrebatado",
        "cost": [
          "aventura"
        ],
        "damage": "50",
        "description": "Copia el efecto de una carta especial durante un turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "aventura",
      "Cazadora de gemas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-058",
    "title": "INFORME SECRETO",
    "subtitle": "Archivista de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "desafio",
    "hp": 80,
    "cardNumber": "058",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "En cada carpeta hay una pista esperando ser usada en tu contra.",
    "abilityName": "Informe oculto",
    "abilityDesc": "Revisa el descarte y recupera una carta de sabotaje.",
    "attacks": [
      {
        "id": "evil-atk-058-1",
        "name": "Informe oculto",
        "cost": [
          "desafio"
        ],
        "damage": "30+",
        "description": "Revisa el descarte y recupera una carta de sabotaje."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "desafio",
      "Archivista de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-059",
    "title": "GUÍA CRUEL",
    "subtitle": "Instructora implacable",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "rutina",
    "hp": 100,
    "cardNumber": "059",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El secreto no es hacerlo rápido; es hacerlo sin piedad.",
    "abilityName": "Explicación brutal",
    "abilityDesc": "Enseña una técnica y permite repetir un efecto destructivo.",
    "attacks": [
      {
        "id": "evil-atk-059-1",
        "name": "Explicación brutal",
        "cost": [
          "rutina"
        ],
        "damage": "60",
        "description": "Enseña una técnica y permite repetir un efecto destructivo."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "rutina",
      "Instructora implacable"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-060",
    "title": "GALERÍA PROHIBIDA",
    "subtitle": "Editora de pesadillas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "leyenda",
    "hp": 125,
    "cardNumber": "060",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Entre cientos de imágenes, siempre encuentra la que amenaza.",
    "abilityName": "Galería maldita",
    "abilityDesc": "Mira varias opciones y conserva solo la más peligrosa.",
    "attacks": [
      {
        "id": "evil-atk-060-1",
        "name": "Galería maldita",
        "cost": [
          "leyenda"
        ],
        "damage": "110",
        "description": "Mira varias opciones y conserva solo la más peligrosa."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "leyenda",
      "Editora de pesadillas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-061",
    "title": "RESERVA HELADA",
    "subtitle": "Organizadora gélida",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "impulso",
    "hp": 110,
    "cardNumber": "061",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Todo tiene su lugar, incluso las peores sorpresas.",
    "abilityName": "Reserva glacial",
    "abilityDesc": "Conserva una carta y evita que el rival la descarte.",
    "attacks": [
      {
        "id": "evil-atk-061-1",
        "name": "Reserva glacial",
        "cost": [
          "impulso"
        ],
        "damage": "30",
        "description": "Conserva una carta y evita que el rival la descarte."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "impulso",
      "Organizadora gélida"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-062",
    "title": "DOBLE TRAMPA",
    "subtitle": "Asesora de vestuario oscura",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "secret_rare",
    "element": "ingenio",
    "hp": 180,
    "cardNumber": "062",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Dos chaquetas, un espejo roto y una decisión peligrosa.",
    "abilityName": "Doble elección cruel",
    "abilityDesc": "Compara dos opciones y corrompe la que descartes.",
    "attacks": [
      {
        "id": "evil-atk-062-1",
        "name": "Doble elección cruel",
        "cost": [
          "ingenio"
        ],
        "damage": "150+",
        "description": "Compara dos opciones y corrompe la que descartes."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "estilo",
    "isFullArt": true,
    "borderColor": "#be123c",
    "customHoloStyle": "prismatic",
    "customFoilOpacity": 0.95,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "secret_rare",
      "ingenio",
      "Asesora de vestuario oscura"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-063",
    "title": "MESA SOMBÍA",
    "subtitle": "Servidora despiadada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "arte",
    "hp": 140,
    "cardNumber": "063",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un buen servicio deja todo listo para el siguiente golpe.",
    "abilityName": "Mesa servida",
    "abilityDesc": "Recupera un recurso usado y prepara el próximo ataque.",
    "attacks": [
      {
        "id": "evil-atk-063-1",
        "name": "Mesa servida",
        "cost": [
          "arte"
        ],
        "damage": "80x",
        "description": "Recupera un recurso usado y prepara el próximo ataque."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "arte",
      "Servidora despiadada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-064",
    "title": "PEDALEO FURIOSO",
    "subtitle": "Mecánica implacable",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "aura",
    "hp": 100,
    "cardNumber": "064",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Con la cadena tensa, ningún camino se le resiste.",
    "abilityName": "Pedaleo brutal",
    "abilityDesc": "Reactiva una carta agotada y permite usarla de nuevo.",
    "attacks": [
      {
        "id": "evil-atk-064-1",
        "name": "Pedaleo brutal",
        "cost": [
          "aura"
        ],
        "damage": "50",
        "description": "Reactiva una carta agotada y permite usarla de nuevo."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "aura",
      "Mecánica implacable"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-065",
    "title": "ARRANQUE INFERNAL",
    "subtitle": "Piloto sin límites",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "talento",
    "hp": 130,
    "cardNumber": "065",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Su motor favorito es el que aún no ha explotado.",
    "abilityName": "Arranque demoledor",
    "abilityDesc": "Obtén impulso inmediato y adelántate a la jugada rival.",
    "attacks": [
      {
        "id": "evil-atk-065-1",
        "name": "Arranque demoledor",
        "cost": [
          "talento"
        ],
        "damage": "50+",
        "description": "Obtén impulso inmediato y adelántate a la jugada rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "talento",
      "Piloto sin límites"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-066",
    "title": "MAPA MALDITO",
    "subtitle": "Exploradora de portales oscuros",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "estilo",
    "hp": 110,
    "cardNumber": "066",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un mapa en blanco es una invitación a perderse.",
    "abilityName": "Mapa sin retorno",
    "abilityDesc": "Descubre una ruta oculta y elige entre dos caminos peligrosos.",
    "attacks": [
      {
        "id": "evil-atk-066-1",
        "name": "Mapa sin retorno",
        "cost": [
          "estilo"
        ],
        "damage": "80",
        "description": "Descubre una ruta oculta y elige entre dos caminos peligrosos."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "estilo",
      "Exploradora de portales oscuros"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-067",
    "title": "ARMONÍA TIRÁNICA",
    "subtitle": "Maestra del ritmo oscuro",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "aventura",
    "hp": 90,
    "cardNumber": "067",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada nota encuentra su lugar cuando ella marca el compás.",
    "abilityName": "Armonía cruel",
    "abilityDesc": "Coordina tus cartas y amplifica sus efectos en conjunto.",
    "attacks": [
      {
        "id": "evil-atk-067-1",
        "name": "Armonía cruel",
        "cost": [
          "aventura"
        ],
        "damage": "70",
        "description": "Coordina tus cartas y amplifica sus efectos en conjunto."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "aventura",
      "Maestra del ritmo oscuro"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-068",
    "title": "PROYECCIÓN SOMBRÍA",
    "subtitle": "Analista de catástrofes",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "desafio",
    "hp": 100,
    "cardNumber": "068",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Los números cambian; la ambición permanece.",
    "abilityName": "Proyección fatal",
    "abilityDesc": "Predice la próxima oportunidad y prepara un sabotaje.",
    "attacks": [
      {
        "id": "evil-atk-068-1",
        "name": "Proyección fatal",
        "cost": [
          "desafio"
        ],
        "damage": "50",
        "description": "Predice la próxima oportunidad y prepara un sabotaje."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "desafio",
      "Analista de catástrofes"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-069",
    "title": "MÁSCARA NEGRA",
    "subtitle": "Infiltrada de gala oscura",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "rutina",
    "hp": 125,
    "cardNumber": "069",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "En una gala, la mejor identidad es la que nadie sobrevive para cuestionar.",
    "abilityName": "Máscara oculta",
    "abilityDesc": "Oculta una carta y sorprende al rival al revelarla.",
    "attacks": [
      {
        "id": "evil-atk-069-1",
        "name": "Máscara oculta",
        "cost": [
          "rutina"
        ],
        "damage": "100",
        "description": "Oculta una carta y sorprende al rival al revelarla."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aura",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "rutina",
      "Infiltrada de gala oscura"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-070",
    "title": "RED VECINAL OSCURA",
    "subtitle": "Dominadora vecinal",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "leyenda",
    "hp": 80,
    "cardNumber": "070",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Una comunidad unida también puede ser una jaula.",
    "abilityName": "Red de miedo",
    "abilityDesc": "Refuerza una carta aliada usando los recursos de todas las demás.",
    "attacks": [
      {
        "id": "evil-atk-070-1",
        "name": "Red de miedo",
        "cost": [
          "leyenda"
        ],
        "damage": "40x",
        "description": "Refuerza una carta aliada usando los recursos de todas las demás."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "leyenda",
      "Dominadora vecinal"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-071",
    "title": "SAQUE INFERNAL",
    "subtitle": "Duelista de cancha",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "impulso",
    "hp": 115,
    "cardNumber": "071",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No acepta perder ni el eco del último punto.",
    "abilityName": "Revés de furia",
    "abilityDesc": "Debilita la próxima defensa rival.",
    "attacks": [
      {
        "id": "evil-atk-071-1",
        "name": "Revés de furia",
        "cost": [
          "impulso"
        ],
        "damage": "70",
        "description": "Debilita la próxima defensa rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "impulso",
      "Duelista de cancha"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-072",
    "title": "ARO MALDITO",
    "subtitle": "Conquistadora del aro",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "secret_rare",
    "element": "ingenio",
    "hp": 180,
    "cardNumber": "072",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El aro no se mueve; su paciencia sí se acaba.",
    "abilityName": "Salto opresivo",
    "abilityDesc": "Impide que una carta rival bloquee tu próxima acción.",
    "attacks": [
      {
        "id": "evil-atk-072-1",
        "name": "Salto opresivo",
        "cost": [
          "ingenio"
        ],
        "damage": "150+",
        "description": "Impide que una carta rival bloquee tu próxima acción."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": true,
    "borderColor": "#be123c",
    "customHoloStyle": "prismatic",
    "customFoilOpacity": 0.95,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "secret_rare",
      "ingenio",
      "Conquistadora del aro"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-073",
    "title": "REMATE BRUTAL",
    "subtitle": "Dominadora de la red",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "arte",
    "hp": 110,
    "cardNumber": "073",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada remate lleva una discusión que nunca terminó.",
    "abilityName": "Impacto abrasador",
    "abilityDesc": "Agota una carta defensora rival.",
    "attacks": [
      {
        "id": "evil-atk-073-1",
        "name": "Impacto abrasador",
        "cost": [
          "arte"
        ],
        "damage": "40",
        "description": "Agota una carta defensora rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "arte",
      "Dominadora de la red"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-074",
    "title": "META IMPLACABLE",
    "subtitle": "Corredora de resistencia",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "aura",
    "hp": 130,
    "cardNumber": "074",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No persigue la meta; persigue a quien la adelantó.",
    "abilityName": "Último aliento",
    "abilityDesc": "Reactiva una carta aliada agotada.",
    "attacks": [
      {
        "id": "evil-atk-074-1",
        "name": "Último aliento",
        "cost": [
          "aura"
        ],
        "damage": "90",
        "description": "Reactiva una carta aliada agotada."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "aura",
      "Corredora de resistencia"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-075",
    "title": "DESCENSO SALVAJE",
    "subtitle": "Ciclista del risco",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "talento",
    "hp": 110,
    "cardNumber": "075",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La pendiente no es lo único que perdió el control.",
    "abilityName": "Rueda de ceniza",
    "abilityDesc": "Evade el próximo obstáculo que afecte a una carta aliada.",
    "attacks": [
      {
        "id": "evil-atk-075-1",
        "name": "Rueda de ceniza",
        "cost": [
          "talento"
        ],
        "damage": "70",
        "description": "Evade el próximo obstáculo que afecte a una carta aliada."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "talento",
      "Ciclista del risco"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-076",
    "title": "MAREA FURIOSA",
    "subtitle": "Nadadora abisal",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "estilo",
    "hp": 100,
    "cardNumber": "076",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El agua no apaga lo que le arde por dentro.",
    "abilityName": "Brazada oscura",
    "abilityDesc": "Reduce el efecto de la próxima acción rival.",
    "attacks": [
      {
        "id": "evil-atk-076-1",
        "name": "Brazada oscura",
        "cost": [
          "estilo"
        ],
        "damage": "60",
        "description": "Reduce el efecto de la próxima acción rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "estilo",
      "Nadadora abisal"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-077",
    "title": "TRUCO PROHIBIDO",
    "subtitle": "Patinadora del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "aventura",
    "hp": 110,
    "cardNumber": "077",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Si vuelve a caer, la rampa tendrá la culpa.",
    "abilityName": "Rebote rebelde",
    "abilityDesc": "Repite un efecto sencillo que haya sido anulado este turno.",
    "attacks": [
      {
        "id": "evil-atk-077-1",
        "name": "Rebote rebelde",
        "cost": [
          "aventura"
        ],
        "damage": "40x",
        "description": "Repite un efecto sencillo que haya sido anulado este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "aventura",
      "Patinadora del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-078",
    "title": "CRESTA MALDITA",
    "subtitle": "Surfista de tormentas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "desafio",
    "hp": 105,
    "cardNumber": "078",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No espera la tormenta: la invita a subir.",
    "abilityName": "Ola opresiva",
    "abilityDesc": "Devuelve una carta rival del campo a su mano.",
    "attacks": [
      {
        "id": "evil-atk-078-1",
        "name": "Ola opresiva",
        "cost": [
          "desafio"
        ],
        "damage": "70",
        "description": "Devuelve una carta rival del campo a su mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "desafio",
      "Surfista de tormentas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-079",
    "title": "ASCENSO FEROZ",
    "subtitle": "Escaladora obstinada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "rutina",
    "hp": 130,
    "cardNumber": "079",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La roca no cede; ella tampoco.",
    "abilityName": "Garra del risco",
    "abilityDesc": "Protege una carta aliada contra el próximo desplazamiento.",
    "attacks": [
      {
        "id": "evil-atk-079-1",
        "name": "Garra del risco",
        "cost": [
          "rutina"
        ],
        "damage": "70+",
        "description": "Protege una carta aliada contra el próximo desplazamiento."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "rutina",
      "Escaladora obstinada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-080",
    "title": "NIEVE HOSTIL",
    "subtitle": "Esquiadora de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "leyenda",
    "hp": 100,
    "cardNumber": "080",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Deja un surco donde otros dejan dudas.",
    "abilityName": "Giro glacial",
    "abilityDesc": "Agota una carta rival hasta el final del turno.",
    "attacks": [
      {
        "id": "evil-atk-080-1",
        "name": "Giro glacial",
        "cost": [
          "leyenda"
        ],
        "damage": "40",
        "description": "Agota una carta rival hasta el final del turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "leyenda",
      "Esquiadora de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-081",
    "title": "SWING VENGATIVO",
    "subtitle": "Estratega del green",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "impulso",
    "hp": 120,
    "cardNumber": "081",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El silencio del campo dura hasta su siguiente fallo.",
    "abilityName": "Golpe calculado",
    "abilityDesc": "Revela una carta oculta del campo rival.",
    "attacks": [
      {
        "id": "evil-atk-081-1",
        "name": "Golpe calculado",
        "cost": [
          "impulso"
        ],
        "damage": "90",
        "description": "Revela una carta oculta del campo rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "impulso",
      "Estratega del green"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-082",
    "title": "PUÑO DE BRASA",
    "subtitle": "Boxeadora de furia",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "ingenio",
    "hp": 145,
    "cardNumber": "082",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El saco escucha todo lo que ella no piensa callar.",
    "abilityName": "Descarga contenida",
    "abilityDesc": "Anula la próxima bonificación de una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-082-1",
        "name": "Descarga contenida",
        "cost": [
          "ingenio"
        ],
        "damage": "70",
        "description": "Anula la próxima bonificación de una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "ingenio",
      "Boxeadora de furia"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-083",
    "title": "EQUILIBRIO CRUEL",
    "subtitle": "Acróbata implacable",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "secret_rare",
    "element": "arte",
    "hp": 180,
    "cardNumber": "083",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Su peor rival siempre encuentra un detalle que corregir.",
    "abilityName": "Control absoluto",
    "abilityDesc": "Evita que una carta aliada sea agotada este turno.",
    "attacks": [
      {
        "id": "evil-atk-083-1",
        "name": "Control absoluto",
        "cost": [
          "arte"
        ],
        "damage": "150+",
        "description": "Evita que una carta aliada sea agotada este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "ingenio",
    "isFullArt": true,
    "borderColor": "#be123c",
    "customHoloStyle": "prismatic",
    "customFoilOpacity": 0.95,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "secret_rare",
      "arte",
      "Acróbata implacable"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-084",
    "title": "RITMO REBELDE",
    "subtitle": "Bailarina del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "aura",
    "hp": 90,
    "cardNumber": "084",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No sigue el ritmo; lo obliga a seguirla.",
    "abilityName": "Compás abrasivo",
    "abilityDesc": "Potencia el próximo efecto de una carta aliada.",
    "attacks": [
      {
        "id": "evil-atk-084-1",
        "name": "Compás abrasivo",
        "cost": [
          "aura"
        ],
        "damage": "60x",
        "description": "Potencia el próximo efecto de una carta aliada."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "aura",
      "Bailarina del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-085",
    "title": "BATE INFERNAL",
    "subtitle": "Bateadora feroz",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "talento",
    "hp": 115,
    "cardNumber": "085",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Esa pelota se llevó toda su paciencia.",
    "abilityName": "Retorno brutal",
    "abilityDesc": "Devuelve una carta de apoyo rival a su mano.",
    "attacks": [
      {
        "id": "evil-atk-085-1",
        "name": "Retorno brutal",
        "cost": [
          "talento"
        ],
        "damage": "90",
        "description": "Devuelve una carta de apoyo rival a su mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "desafio",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "talento",
      "Bateadora feroz"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-086",
    "title": "PIRUETA SOMBRÍA",
    "subtitle": "Dama del hielo",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "estilo",
    "hp": 80,
    "cardNumber": "086",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Hasta su furia conserva una elegancia insoportable.",
    "abilityName": "Giro espectral",
    "abilityDesc": "Evade un efecto dirigido a esta carta.",
    "attacks": [
      {
        "id": "evil-atk-086-1",
        "name": "Giro espectral",
        "cost": [
          "estilo"
        ],
        "damage": "30+",
        "description": "Evade un efecto dirigido a esta carta."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aventura",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "estilo",
      "Dama del hielo"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-087",
    "title": "PALADA FEROZ",
    "subtitle": "Remera de tormentas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "aventura",
    "hp": 105,
    "cardNumber": "087",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La corriente insiste; ella responde más fuerte.",
    "abilityName": "Empuje oscuro",
    "abilityDesc": "Reactiva un recurso propio agotado.",
    "attacks": [
      {
        "id": "evil-atk-087-1",
        "name": "Empuje oscuro",
        "cost": [
          "aventura"
        ],
        "damage": "60",
        "description": "Reactiva un recurso propio agotado."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "aventura",
      "Remera de tormentas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-088",
    "title": "DIANA MALDITA",
    "subtitle": "Arquera implacable",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "desafio",
    "hp": 130,
    "cardNumber": "088",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El blanco no tiene excusas y ella tampoco quiere oírlas.",
    "abilityName": "Puntería cruel",
    "abilityDesc": "Marca una carta rival y revela su efecto.",
    "attacks": [
      {
        "id": "evil-atk-088-1",
        "name": "Puntería cruel",
        "cost": [
          "desafio"
        ],
        "damage": "110",
        "description": "Marca una carta rival y revela su efecto."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "desafio",
      "Arquera implacable"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-089",
    "title": "RUTA HOSTIL",
    "subtitle": "Corredora del bosque",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "rutina",
    "hp": 110,
    "cardNumber": "089",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada subida le da otra razón para enfadarse.",
    "abilityName": "Zancada salvaje",
    "abilityDesc": "Ignora un obstáculo durante tu próxima acción.",
    "attacks": [
      {
        "id": "evil-atk-089-1",
        "name": "Zancada salvaje",
        "cost": [
          "rutina"
        ],
        "damage": "30",
        "description": "Ignora un obstáculo durante tu próxima acción."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "rutina",
      "Corredora del bosque"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-090",
    "title": "ASFALTO FURIOSO",
    "subtitle": "Ciclista nocturna",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "leyenda",
    "hp": 120,
    "cardNumber": "090",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La ciudad sigue despierta porque ella no piensa bajar el ritmo.",
    "abilityName": "Impulso rebelde",
    "abilityDesc": "Cambia una carta aliada de posición.",
    "attacks": [
      {
        "id": "evil-atk-090-1",
        "name": "Impulso rebelde",
        "cost": [
          "leyenda"
        ],
        "damage": "80",
        "description": "Cambia una carta aliada de posición."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "leyenda",
      "Ciclista nocturna"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-091",
    "title": "BRASA CONTROLADA",
    "subtitle": "Bombera implacable",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "impulso",
    "hp": 145,
    "cardNumber": "091",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Domar el fuego es fácil comparado con domar su carácter.",
    "abilityName": "Presión infernal",
    "abilityDesc": "Retira un efecto de fuego de una carta aliada.",
    "attacks": [
      {
        "id": "evil-atk-091-1",
        "name": "Presión infernal",
        "cost": [
          "impulso"
        ],
        "damage": "80x",
        "description": "Retira un efecto de fuego de una carta aliada."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "impulso",
      "Bombera implacable"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-092",
    "title": "DESPEGUE FRUSTRADO",
    "subtitle": "Piloto de tormentas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "ingenio",
    "hp": 100,
    "cardNumber": "092",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El cielo tendrá que esperar a que termine de discutir con el motor.",
    "abilityName": "Arranque obstinado",
    "abilityDesc": "Reactiva un recurso propio que no pudo utilizarse.",
    "attacks": [
      {
        "id": "evil-atk-092-1",
        "name": "Arranque obstinado",
        "cost": [
          "ingenio"
        ],
        "damage": "50",
        "description": "Reactiva un recurso propio que no pudo utilizarse."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "ingenio",
      "Piloto de tormentas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-093",
    "title": "ÓRBITA OSCURA",
    "subtitle": "Conquistadora astral",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "arte",
    "hp": 90,
    "cardNumber": "093",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Un mundo vacío solo significa que aún no tiene dueña.",
    "abilityName": "Baliza del vacío",
    "abilityDesc": "Revela una carta oculta y bloquea su movimiento este turno.",
    "attacks": [
      {
        "id": "evil-atk-093-1",
        "name": "Baliza del vacío",
        "cost": [
          "arte"
        ],
        "damage": "50+",
        "description": "Revela una carta oculta y bloquea su movimiento este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "arte",
      "Conquistadora astral"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-094",
    "title": "PLANO TIRÁNICO",
    "subtitle": "Arquitecta del dominio",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "secret_rare",
    "element": "aura",
    "hp": 180,
    "cardNumber": "094",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Si el mundo no encaja, habrá que rediseñarlo.",
    "abilityName": "Diseño opresivo",
    "abilityDesc": "Bloquea una zona libre del campo hasta finalizar el turno.",
    "attacks": [
      {
        "id": "evil-atk-094-1",
        "name": "Diseño opresivo",
        "cost": [
          "aura"
        ],
        "damage": "150+",
        "description": "Bloquea una zona libre del campo hasta finalizar el turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": true,
    "borderColor": "#be123c",
    "customHoloStyle": "prismatic",
    "customFoilOpacity": 0.95,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "secret_rare",
      "aura",
      "Arquitecta del dominio"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-095",
    "title": "SAZÓN INFERNAL",
    "subtitle": "Chef de brasas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "talento",
    "hp": 90,
    "cardNumber": "095",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Le falta sal y le sobra rabia.",
    "abilityName": "Fuego exigente",
    "abilityDesc": "Combina dos recursos básicos para potenciar tu próxima acción.",
    "attacks": [
      {
        "id": "evil-atk-095-1",
        "name": "Fuego exigente",
        "cost": [
          "talento"
        ],
        "damage": "70",
        "description": "Combina dos recursos básicos para potenciar tu próxima acción."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "talento",
      "Chef de brasas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-096",
    "title": "CONSULTA SOMBRÍA",
    "subtitle": "Veterinaria de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "estilo",
    "hp": 145,
    "cardNumber": "096",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Su paciencia es escasa; su precisión, no.",
    "abilityName": "Diagnóstico severo",
    "abilityDesc": "Revela un efecto negativo oculto de una carta aliada y retíralo.",
    "attacks": [
      {
        "id": "evil-atk-096-1",
        "name": "Diagnóstico severo",
        "cost": [
          "estilo"
        ],
        "damage": "90",
        "description": "Revela un efecto negativo oculto de una carta aliada y retíralo."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "talento",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "estilo",
      "Veterinaria de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-097",
    "title": "ENCUADRE HOSTIL",
    "subtitle": "Cazadora de paisajes",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "aventura",
    "hp": 150,
    "cardNumber": "097",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La montaña eligió esconderse en el peor momento.",
    "abilityName": "Lente de tormenta",
    "abilityDesc": "Revisa las tres primeras cartas de tu mazo y conserva una.",
    "attacks": [
      {
        "id": "evil-atk-097-1",
        "name": "Lente de tormenta",
        "cost": [
          "aventura"
        ],
        "damage": "120",
        "description": "Revisa las tres primeras cartas de tu mazo y conserva una."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "aventura",
      "Cazadora de paisajes"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-098",
    "title": "JARDÍN MALDITO",
    "subtitle": "Cultivadora de espinas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "desafio",
    "hp": 155,
    "cardNumber": "098",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Aquí hasta las flores aprenden a obedecer.",
    "abilityName": "Poda despiadada",
    "abilityDesc": "Retira una mejora de una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-098-1",
        "name": "Poda despiadada",
        "cost": [
          "desafio"
        ],
        "damage": "100x",
        "description": "Retira una mejora de una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "desafio",
      "Cultivadora de espinas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-099",
    "title": "ROTOR REBELDE",
    "subtitle": "Piloto del vendaval",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "rutina",
    "hp": 160,
    "cardNumber": "099",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El rotor está detenido; su furia ya despegó.",
    "abilityName": "Ascenso obstinado",
    "abilityDesc": "Evita un obstáculo que impida mover una carta aliada.",
    "attacks": [
      {
        "id": "evil-atk-099-1",
        "name": "Ascenso obstinado",
        "cost": [
          "rutina"
        ],
        "damage": "110",
        "description": "Evita un obstáculo que impida mover una carta aliada."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "rutina",
      "Piloto del vendaval"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-100",
    "title": "DULCE VENGANZA",
    "subtitle": "Pastelera implacable",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "leyenda",
    "hp": 165,
    "cardNumber": "100",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La cobertura es dulce; la mirada, definitivamente no.",
    "abilityName": "Glaseado amargo",
    "abilityDesc": "Oculta una carta preparada hasta que active su efecto.",
    "attacks": [
      {
        "id": "evil-atk-100-1",
        "name": "Glaseado amargo",
        "cost": [
          "leyenda"
        ],
        "damage": "90+",
        "description": "Oculta una carta preparada hasta que active su efecto."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "leyenda",
      "Pastelera implacable"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-101",
    "title": "PRESAGIO ASTRAL",
    "subtitle": "Vigía del eclipse",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "impulso",
    "hp": 170,
    "cardNumber": "101",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No busca estrellas: busca señales de su llegada.",
    "abilityName": "Lectura del vacío",
    "abilityDesc": "Observa las dos próximas cartas de tu mazo y cambia su orden.",
    "attacks": [
      {
        "id": "evil-atk-101-1",
        "name": "Lectura del vacío",
        "cost": [
          "impulso"
        ],
        "damage": "100",
        "description": "Observa las dos próximas cartas de tu mazo y cambia su orden."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "impulso",
      "Vigía del eclipse"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-102",
    "title": "EXCLUSIVA MALDITA",
    "subtitle": "Cronista del pánico",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "ingenio",
    "hp": 130,
    "cardNumber": "102",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La pregunta no era amable ni pretendía serlo.",
    "abilityName": "Pregunta incómoda",
    "abilityDesc": "Obliga al rival a revelar una carta de su mano.",
    "attacks": [
      {
        "id": "evil-atk-102-1",
        "name": "Pregunta incómoda",
        "cost": [
          "ingenio"
        ],
        "damage": "130",
        "description": "Obliga al rival a revelar una carta de su mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "ingenio",
      "Cronista del pánico"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-103",
    "title": "COSTURA CRUEL",
    "subtitle": "Diseñadora siniestra",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "arte",
    "hp": 135,
    "cardNumber": "103",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Si la tela se resiste, el diseño se vuelve más agresivo.",
    "abilityName": "Patrón opresivo",
    "abilityDesc": "Cambia una mejora propia por otra de tu mano.",
    "attacks": [
      {
        "id": "evil-atk-103-1",
        "name": "Patrón opresivo",
        "cost": [
          "arte"
        ],
        "damage": "90",
        "description": "Cambia una mejora propia por otra de tu mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "arte",
      "Diseñadora siniestra"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-104",
    "title": "ENSAMBLE BRUTAL",
    "subtitle": "Carpintera de ruina",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "aura",
    "hp": 140,
    "cardNumber": "104",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La pieza entrará aunque su orgullo no quepa.",
    "abilityName": "Ajuste implacable",
    "abilityDesc": "Repara un recurso y agótalo hasta finalizar el turno.",
    "attacks": [
      {
        "id": "evil-atk-104-1",
        "name": "Ajuste implacable",
        "cost": [
          "aura"
        ],
        "damage": "120",
        "description": "Repara un recurso y agótalo hasta finalizar el turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "aura",
      "Carpintera de ruina"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-105",
    "title": "GRAVEDAD HOSTIL",
    "subtitle": "Cadete del vacío",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "talento",
    "hp": 145,
    "cardNumber": "105",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Ni la gravedad consigue ponerle los pies en calma.",
    "abilityName": "Resistencia feroz",
    "abilityDesc": "Protege una carta aliada contra el próximo agotamiento.",
    "attacks": [
      {
        "id": "evil-atk-105-1",
        "name": "Resistencia feroz",
        "cost": [
          "talento"
        ],
        "damage": "100x",
        "description": "Protege una carta aliada contra el próximo agotamiento."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "talento",
      "Cadete del vacío"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-106",
    "title": "CUMBRE TIRÁNICA",
    "subtitle": "Guía de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "estilo",
    "hp": 150,
    "cardNumber": "106",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La montaña ofrece caminos; ella dicta cuál tomar.",
    "abilityName": "Ruta impuesta",
    "abilityDesc": "Mueve una carta aliada a una zona libre.",
    "attacks": [
      {
        "id": "evil-atk-106-1",
        "name": "Ruta impuesta",
        "cost": [
          "estilo"
        ],
        "damage": "110",
        "description": "Mueve una carta aliada a una zona libre."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "estilo",
      "Guía de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-107",
    "title": "ARRECIFE SOMBRÍO",
    "subtitle": "Buceadora abisal",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "aventura",
    "hp": 155,
    "cardNumber": "107",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Bajo la superficie también sabe imponer silencio.",
    "abilityName": "Inmersión oculta",
    "abilityDesc": "Oculta una carta aliada hasta tu próximo turno.",
    "attacks": [
      {
        "id": "evil-atk-107-1",
        "name": "Inmersión oculta",
        "cost": [
          "aventura"
        ],
        "damage": "90+",
        "description": "Oculta una carta aliada hasta tu próximo turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "aventura",
      "Buceadora abisal"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-108",
    "title": "CAMPAMENTO ROTO",
    "subtitle": "Campista del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "desafio",
    "hp": 160,
    "cardNumber": "108",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La tienda no se sostiene y su paciencia tampoco.",
    "abilityName": "Estaca obstinada",
    "abilityDesc": "Prepara una carta de apoyo desde tu mano.",
    "attacks": [
      {
        "id": "evil-atk-108-1",
        "name": "Estaca obstinada",
        "cost": [
          "desafio"
        ],
        "damage": "100",
        "description": "Prepara una carta de apoyo desde tu mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "desafio",
      "Campista del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-109",
    "title": "SENDERO MALDITO",
    "subtitle": "Caminante obstinada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "rutina",
    "hp": 165,
    "cardNumber": "109",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Perderse solo empeora cuando el camino parece reírse.",
    "abilityName": "Paso de sombra",
    "abilityDesc": "Revisa dos cartas del mazo y devuelve una al fondo.",
    "attacks": [
      {
        "id": "evil-atk-109-1",
        "name": "Paso de sombra",
        "cost": [
          "rutina"
        ],
        "damage": "130",
        "description": "Revisa dos cartas del mazo y devuelve una al fondo."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "rutina",
      "Caminante obstinada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-110",
    "title": "RÁPIDO INFERNAL",
    "subtitle": "Remadora del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "leyenda",
    "hp": 170,
    "cardNumber": "110",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El río insiste en llevarla por donde no quiere.",
    "abilityName": "Corriente adversa",
    "abilityDesc": "Desplaza una carta rival a una zona libre.",
    "attacks": [
      {
        "id": "evil-atk-110-1",
        "name": "Corriente adversa",
        "cost": [
          "leyenda"
        ],
        "damage": "90",
        "description": "Desplaza una carta rival a una zona libre."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "leyenda",
      "Remadora del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-111",
    "title": "ALA DE TORMENTA",
    "subtitle": "Voladora desafiante",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "impulso",
    "hp": 130,
    "cardNumber": "111",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El viento cambia de opinión; ella no.",
    "abilityName": "Giro del vendaval",
    "abilityDesc": "Evade el próximo efecto dirigido a esta carta.",
    "attacks": [
      {
        "id": "evil-atk-111-1",
        "name": "Giro del vendaval",
        "cost": [
          "impulso"
        ],
        "damage": "120",
        "description": "Evade el próximo efecto dirigido a esta carta."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "impulso",
      "Voladora desafiante"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-112",
    "title": "DESCANSO ARRUINADO",
    "subtitle": "Campista iracunda",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "ingenio",
    "hp": 135,
    "cardNumber": "112",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Eligió una cascada; recibió una ducha interminable.",
    "abilityName": "Bruma invasiva",
    "abilityDesc": "Reduce la próxima bonificación de una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-112-1",
        "name": "Bruma invasiva",
        "cost": [
          "ingenio"
        ],
        "damage": "100x",
        "description": "Reduce la próxima bonificación de una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "ingenio",
      "Campista iracunda"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-113",
    "title": "CIELO CAUTIVO",
    "subtitle": "Viajera del vendaval",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "arte",
    "hp": 140,
    "cardNumber": "113",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Hasta el cielo insiste en discutirle la ruta.",
    "abilityName": "Deriva sombría",
    "abilityDesc": "Cambia la posición de una carta del campo.",
    "attacks": [
      {
        "id": "evil-atk-113-1",
        "name": "Deriva sombría",
        "cost": [
          "arte"
        ],
        "damage": "110",
        "description": "Cambia la posición de una carta del campo."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "arte",
      "Viajera del vendaval"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-114",
    "title": "BRASA OBSTINADA",
    "subtitle": "Guardiana de cenizas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "aura",
    "hp": 145,
    "cardNumber": "114",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Hay más fuego en su mirada que entre los leños.",
    "abilityName": "Fuego latente",
    "abilityDesc": "Guarda un recurso y potencia tu próxima acción.",
    "attacks": [
      {
        "id": "evil-atk-114-1",
        "name": "Fuego latente",
        "cost": [
          "aura"
        ],
        "damage": "90+",
        "description": "Guarda un recurso y potencia tu próxima acción."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "aura",
      "Guardiana de cenizas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-115",
    "title": "POSTAL DEL ECLIPSE",
    "subtitle": "Viajera siniestra",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "ultra_rare",
    "element": "talento",
    "hp": 150,
    "cardNumber": "115",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "París no pidió una nueva reina de las sombras.",
    "abilityName": "Encuadre dominante",
    "abilityDesc": "Revela una carta rival del campo.",
    "attacks": [
      {
        "id": "evil-atk-115-1",
        "name": "Encuadre dominante",
        "cost": [
          "talento"
        ],
        "damage": "100",
        "description": "Revela una carta rival del campo."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "desafio",
    "isFullArt": true,
    "borderColor": "#c026d3",
    "customHoloStyle": "secret_gold",
    "customFoilOpacity": 0.75,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "ultra_rare",
      "talento",
      "Viajera siniestra"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-116",
    "title": "LIBERTAD SOMBRÍA",
    "subtitle": "Turista del dominio",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "estilo",
    "hp": 175,
    "cardNumber": "116",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La libertad le gusta más cuando decide ella.",
    "abilityName": "Silueta imponente",
    "abilityDesc": "Libera una carta propia de un efecto de bloqueo.",
    "attacks": [
      {
        "id": "evil-atk-116-1",
        "name": "Silueta imponente",
        "cost": [
          "estilo"
        ],
        "damage": "150",
        "description": "Libera una carta propia de un efecto de bloqueo."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aventura",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "estilo",
      "Turista del dominio"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-117",
    "title": "HORA MALDITA",
    "subtitle": "Viajera impaciente",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "secret_rare",
    "element": "aventura",
    "hp": 180,
    "cardNumber": "117",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Londres tiene tiempo; ella no tiene paciencia.",
    "abilityName": "Minuto robado",
    "abilityDesc": "Retrasa una acción preparada rival hasta su próximo turno.",
    "attacks": [
      {
        "id": "evil-atk-117-1",
        "name": "Minuto robado",
        "cost": [
          "aventura"
        ],
        "damage": "150+",
        "description": "Retrasa una acción preparada rival hasta su próximo turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": true,
    "borderColor": "#be123c",
    "customHoloStyle": "prismatic",
    "customFoilOpacity": 0.95,
    "customMaskOpacity": 0.25,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "secret_rare",
      "aventura",
      "Viajera impaciente"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-118",
    "title": "ARENA IMPERIAL",
    "subtitle": "Viajera del dominio",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "desafio",
    "hp": 185,
    "cardNumber": "118",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No vino a admirar la arena: vino a imaginar el trono.",
    "abilityName": "Decreto de arena",
    "abilityDesc": "Impide que una carta rival cambie de posición este turno.",
    "attacks": [
      {
        "id": "evil-atk-118-1",
        "name": "Decreto de arena",
        "cost": [
          "desafio"
        ],
        "damage": "140",
        "description": "Impide que una carta rival cambie de posición este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "desafio",
      "Viajera del dominio"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-119",
    "title": "AGUJAS SOMBRÍAS",
    "subtitle": "Contempladora siniestra",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "rutina",
    "hp": 190,
    "cardNumber": "119",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Hasta su admiración parece una declaración de intenciones.",
    "abilityName": "Perspectiva opresiva",
    "abilityDesc": "Revela una carta oculta y reduce su próxima bonificación.",
    "attacks": [
      {
        "id": "evil-atk-119-1",
        "name": "Perspectiva opresiva",
        "cost": [
          "rutina"
        ],
        "damage": "110+",
        "description": "Revela una carta oculta y reduce su próxima bonificación."
      }
    ],
    "retreatCost": 1,
    "weakness": "aventura",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "rutina",
      "Contempladora siniestra"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-120",
    "title": "PUERTO HOSTIL",
    "subtitle": "Viajera de tormentas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "leyenda",
    "hp": 150,
    "cardNumber": "120",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El puerto tiene espectáculo; ella aporta el drama.",
    "abilityName": "Viento de escena",
    "abilityDesc": "Devuelve una mejora rival a la mano de su dueño.",
    "attacks": [
      {
        "id": "evil-atk-120-1",
        "name": "Viento de escena",
        "cost": [
          "leyenda"
        ],
        "damage": "130",
        "description": "Devuelve una mejora rival a la mano de su dueño."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "leyenda",
      "Viajera de tormentas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-121",
    "title": "SIMETRÍA CRUEL",
    "subtitle": "Dama de sombras",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "impulso",
    "hp": 155,
    "cardNumber": "121",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Admite la perfección siempre que no intente eclipsarla.",
    "abilityName": "Reflejo dominante",
    "abilityDesc": "Copia una bonificación de una carta rival durante este turno.",
    "attacks": [
      {
        "id": "evil-atk-121-1",
        "name": "Reflejo dominante",
        "cost": [
          "impulso"
        ],
        "damage": "160",
        "description": "Copia una bonificación de una carta rival durante este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "impulso",
      "Dama de sombras"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-122",
    "title": "ARENA MALDITA",
    "subtitle": "Exploradora del eclipse",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "ingenio",
    "hp": 160,
    "cardNumber": "122",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El desierto lleva siglos esperando; ella ya se cansó.",
    "abilityName": "Velo de ceniza",
    "abilityDesc": "Oculta una carta aliada hasta tu próximo turno.",
    "attacks": [
      {
        "id": "evil-atk-122-1",
        "name": "Velo de ceniza",
        "cost": [
          "ingenio"
        ],
        "damage": "120",
        "description": "Oculta una carta aliada hasta tu próximo turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "ingenio",
      "Exploradora del eclipse"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-123",
    "title": "MIRADOR SOMBRÍO",
    "subtitle": "Viajera de la bruma",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "arte",
    "hp": 165,
    "cardNumber": "123",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Subió por la vista y encontró otra razón para enfadarse.",
    "abilityName": "Horizonte velado",
    "abilityDesc": "Oculta una carta propia y reorganiza tus recursos.",
    "attacks": [
      {
        "id": "evil-atk-123-1",
        "name": "Horizonte velado",
        "cost": [
          "arte"
        ],
        "damage": "150",
        "description": "Oculta una carta propia y reorganiza tus recursos."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "arte",
      "Viajera de la bruma"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-124",
    "title": "PÉTALOS DE SOMBRA",
    "subtitle": "Contempladora del eclipse",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "aura",
    "hp": 170,
    "cardNumber": "124",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El silencio no significa que se le haya pasado la rabia.",
    "abilityName": "Calma peligrosa",
    "abilityDesc": "Protege una carta aliada hasta finalizar el turno.",
    "attacks": [
      {
        "id": "evil-atk-124-1",
        "name": "Calma peligrosa",
        "cost": [
          "aura"
        ],
        "damage": "110",
        "description": "Protege una carta aliada hasta finalizar el turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "aura",
      "Contempladora del eclipse"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-125",
    "title": "MARCHA IMPLACABLE",
    "subtitle": "Exploradora obstinada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "talento",
    "hp": 175,
    "cardNumber": "125",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada escalón le da otra palabra que no debería decir.",
    "abilityName": "Paso interminable",
    "abilityDesc": "Reactiva una carta aliada que se haya movido este turno.",
    "attacks": [
      {
        "id": "evil-atk-125-1",
        "name": "Paso interminable",
        "cost": [
          "talento"
        ],
        "damage": "140",
        "description": "Reactiva una carta aliada que se haya movido este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "talento",
      "Exploradora obstinada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-126",
    "title": "EMPUJE TRAVIESO",
    "subtitle": "Turista del caos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "estilo",
    "hp": 180,
    "cardNumber": "126",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Solo era una foto; su sonrisa no ayudó a aclararlo.",
    "abilityName": "Perspectiva engañosa",
    "abilityDesc": "Cambia de posición una carta rival.",
    "attacks": [
      {
        "id": "evil-atk-126-1",
        "name": "Perspectiva engañosa",
        "cost": [
          "estilo"
        ],
        "damage": "110+",
        "description": "Cambia de posición una carta rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "estilo",
      "Turista del caos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-127",
    "title": "CUMBRE VELADA",
    "subtitle": "Exploradora de brumas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "aventura",
    "hp": 185,
    "cardNumber": "127",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La niebla oculta la vista, no su mal humor.",
    "abilityName": "Ruta escondida",
    "abilityDesc": "Busca una carta de apoyo en tu mazo.",
    "attacks": [
      {
        "id": "evil-atk-127-1",
        "name": "Ruta escondida",
        "cost": [
          "aventura"
        ],
        "damage": "130",
        "description": "Busca una carta de apoyo en tu mazo."
      }
    ],
    "retreatCost": 1,
    "weakness": "impulso",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "aventura",
      "Exploradora de brumas"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-128",
    "title": "BAHÍA HOSTIL",
    "subtitle": "Viajera del vendaval",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "desafio",
    "hp": 190,
    "cardNumber": "128",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La foto debía ser tranquila; el viento opinó distinto.",
    "abilityName": "Paso de bruma",
    "abilityDesc": "Evita que una carta aliada sea devuelta a la mano.",
    "attacks": [
      {
        "id": "evil-atk-128-1",
        "name": "Paso de bruma",
        "cost": [
          "desafio"
        ],
        "damage": "160",
        "description": "Evita que una carta aliada sea devuelta a la mano."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "desafio",
      "Viajera del vendaval"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-129",
    "title": "AMBICIÓN VERTICAL",
    "subtitle": "Dama del dominio",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "rutina",
    "hp": 150,
    "cardNumber": "129",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Siempre encuentra algo más alto que conquistar.",
    "abilityName": "Ascenso opresivo",
    "abilityDesc": "Potencia una carta propia y agota un recurso.",
    "attacks": [
      {
        "id": "evil-atk-129-1",
        "name": "Ascenso opresivo",
        "cost": [
          "rutina"
        ],
        "damage": "120",
        "description": "Potencia una carta propia y agota un recurso."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "rutina",
      "Dama del dominio"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-130",
    "title": "BRUMA FURIOSA",
    "subtitle": "Viajera de corrientes",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "leyenda",
    "hp": 155,
    "cardNumber": "130",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La cámara resiste el agua; su paciencia, no.",
    "abilityName": "Cortina de agua",
    "abilityDesc": "Reduce la próxima bonificación rival.",
    "attacks": [
      {
        "id": "evil-atk-130-1",
        "name": "Cortina de agua",
        "cost": [
          "leyenda"
        ],
        "damage": "150",
        "description": "Reduce la próxima bonificación rival."
      }
    ],
    "retreatCost": 1,
    "weakness": "talento",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "leyenda",
      "Viajera de corrientes"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-131",
    "title": "SILENCIO PÉTREO",
    "subtitle": "Viajera del silencio",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "impulso",
    "hp": 220,
    "cardNumber": "131",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La piedra no responde, y eso la irrita todavía más.",
    "abilityName": "Mirada inmóvil",
    "abilityDesc": "Bloquea el movimiento de una carta rival durante este turno.",
    "attacks": [
      {
        "id": "evil-atk-131-1",
        "name": "Mirada inmóvil",
        "cost": [
          "impulso"
        ],
        "damage": "140",
        "description": "Bloquea el movimiento de una carta rival durante este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "ingenio",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "impulso",
      "Viajera del silencio"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-132",
    "title": "OCASO REBELDE",
    "subtitle": "Viajera costera",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "ingenio",
    "hp": 200,
    "cardNumber": "132",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "El paseo iba a ser relajado; nadie se lo explicó al viento.",
    "abilityName": "Brisa adversa",
    "abilityDesc": "Desplaza una carta rival a una zona libre.",
    "attacks": [
      {
        "id": "evil-atk-132-1",
        "name": "Brisa adversa",
        "cost": [
          "ingenio"
        ],
        "damage": "170",
        "description": "Desplaza una carta rival a una zona libre."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "ingenio",
      "Viajera costera"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-133",
    "title": "CASTILLO DE SOMBRAS",
    "subtitle": "Aspirante al trono",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "arte",
    "hp": 180,
    "cardNumber": "133",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "No vio un castillo: vio una posibilidad de mudanza.",
    "abilityName": "Mirada soberana",
    "abilityDesc": "Protege una zona propia hasta finalizar el turno.",
    "attacks": [
      {
        "id": "evil-atk-133-1",
        "name": "Mirada soberana",
        "cost": [
          "arte"
        ],
        "damage": "150+",
        "description": "Protege una zona propia hasta finalizar el turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "rutina",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "arte",
      "Aspirante al trono"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-134",
    "title": "UMBRAL TIRÁNICO",
    "subtitle": "Viajera del dominio",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "aura",
    "hp": 220,
    "cardNumber": "134",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Toda entrada parece una oportunidad para imponer condiciones.",
    "abilityName": "Paso restringido",
    "abilityDesc": "Impide que una carta rival entre en una zona libre este turno.",
    "attacks": [
      {
        "id": "evil-atk-134-1",
        "name": "Paso restringido",
        "cost": [
          "aura"
        ],
        "damage": "160",
        "description": "Impide que una carta rival entre en una zona libre este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "arte",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "aura",
      "Viajera del dominio"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-135",
    "title": "OTOÑO SOMBRÍO",
    "subtitle": "Viajera del silencio",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "talento",
    "hp": 200,
    "cardNumber": "135",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "La calma exterior hace más evidente lo poco que se fía de ella.",
    "abilityName": "Hoja errante",
    "abilityDesc": "Reorganiza las tres primeras cartas de tu mazo.",
    "attacks": [
      {
        "id": "evil-atk-135-1",
        "name": "Hoja errante",
        "cost": [
          "talento"
        ],
        "damage": "200",
        "description": "Reorganiza las tres primeras cartas de tu mazo."
      }
    ],
    "retreatCost": 1,
    "weakness": "estilo",
    "resistance": "desafio",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "talento",
      "Viajera del silencio"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-136",
    "title": "UMBRAL DE ARENA",
    "subtitle": "Exploradora de secretos",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "uncommon",
    "element": "estilo",
    "hp": 180,
    "cardNumber": "136",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Cada entrada le parece el comienzo de algo que podría reclamar.",
    "abilityName": "Paso oculto",
    "abilityDesc": "Revela una carta oculta y roba una carta.",
    "attacks": [
      {
        "id": "evil-atk-136-1",
        "name": "Paso oculto",
        "cost": [
          "estilo"
        ],
        "damage": "150",
        "description": "Revela una carta oculta y roba una carta."
      }
    ],
    "retreatCost": 1,
    "weakness": "aura",
    "resistance": "talento",
    "isFullArt": false,
    "borderColor": "#7c3aed",
    "customHoloStyle": "wave",
    "customFoilOpacity": 0.7,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "uncommon",
      "estilo",
      "Exploradora de secretos"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-137",
    "title": "COLUMNAS DEL DOMINIO",
    "subtitle": "Viajera soberana",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "super_rare",
    "element": "aventura",
    "hp": 220,
    "cardNumber": "137",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Hasta las columnas parecen enderezarse cuando ella posa.",
    "abilityName": "Voluntad de piedra",
    "abilityDesc": "Impide retirar una carta aliada durante este turno.",
    "attacks": [
      {
        "id": "evil-atk-137-1",
        "name": "Voluntad de piedra",
        "cost": [
          "aventura"
        ],
        "damage": "180",
        "description": "Impide retirar una carta aliada durante este turno."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "ingenio",
    "isFullArt": false,
    "borderColor": "#c2410c",
    "customHoloStyle": "gold_stars",
    "customFoilOpacity": 0.85,
    "customMaskOpacity": 0.3,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "super_rare",
      "aventura",
      "Viajera soberana"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-138",
    "title": "ESCALÓN IMPLACABLE",
    "subtitle": "Exploradora obstinada",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "rare",
    "element": "desafio",
    "hp": 200,
    "cardNumber": "138",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Llegará arriba aunque tenga que discutir con cada escalón.",
    "abilityName": "Ascenso exigente",
    "abilityDesc": "Agota un recurso para reactivar una carta aliada.",
    "attacks": [
      {
        "id": "evil-atk-138-1",
        "name": "Ascenso exigente",
        "cost": [
          "desafio"
        ],
        "damage": "140",
        "description": "Agota un recurso para reactivar una carta aliada."
      }
    ],
    "retreatCost": 1,
    "weakness": "leyenda",
    "resistance": "rutina",
    "isFullArt": false,
    "borderColor": "#e11d48",
    "customHoloStyle": "glitter",
    "customFoilOpacity": 1,
    "customMaskOpacity": 0.22,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "rare",
      "desafio",
      "Exploradora obstinada"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-139",
    "title": "AVENIDA HOSTIL",
    "subtitle": "Viajera de neón",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "rutina",
    "hp": 180,
    "cardNumber": "139",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Demasiados edificios, demasiados taxis y ninguna paciencia.",
    "abilityName": "Encuadre imposible",
    "abilityDesc": "Revela una carta rival y cambia una carta propia de posición.",
    "attacks": [
      {
        "id": "evil-atk-139-1",
        "name": "Encuadre imposible",
        "cost": [
          "rutina"
        ],
        "damage": "170",
        "description": "Revela una carta rival y cambia una carta propia de posición."
      }
    ],
    "retreatCost": 1,
    "weakness": "arte",
    "resistance": "aura",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "rutina",
      "Viajera de neón"
    ],
    "edition": "eviltokkii"
  },
  {
    "id": "evil-tokkii-140",
    "title": "CAÍDA ABISAL",
    "subtitle": "Exploradora de tormentas",
    "image": "/cards/tokkii_photographer.jpg",
    "imageZoom": 1,
    "imageOffsetX": 0,
    "imageOffsetY": 0,
    "imageRotation": 0,
    "imageFit": "cover",
    "rarity": "common",
    "element": "leyenda",
    "hp": 220,
    "cardNumber": "140",
    "totalInSet": "140",
    "artist": "Tokkii Studio",
    "flavorText": "Ante semejante caída, solo piensa en elevar sus ambiciones.",
    "abilityName": "Vértigo oscuro",
    "abilityDesc": "Devuelve una carta rival a su mano y agota un recurso propio.",
    "attacks": [
      {
        "id": "evil-atk-140-1",
        "name": "Vértigo oscuro",
        "cost": [
          "leyenda"
        ],
        "damage": "150+",
        "description": "Devuelve una carta rival a su mano y agota un recurso propio."
      }
    ],
    "retreatCost": 1,
    "weakness": "desafio",
    "resistance": "estilo",
    "isFullArt": false,
    "borderColor": "#475569",
    "customHoloStyle": "none",
    "customFoilOpacity": 0.4,
    "customMaskOpacity": 0.28,
    "dateAdded": "2026-10-20",
    "tags": [
      "EvilTokkii",
      "common",
      "leyenda",
      "Exploradora de tormentas"
    ],
    "edition": "eviltokkii"
  }
];
