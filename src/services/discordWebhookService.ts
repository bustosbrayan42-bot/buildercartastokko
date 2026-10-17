import type { GiftCodeWithStats } from './giftCodeService';

const DISCORD_WEBHOOK_STORAGE_KEY = 'tokkii_discord_webhook_url';
const DISCORD_NOTIFY_ROLE_STORAGE_KEY = 'tokkii_discord_notify_mode';
const DISCORD_CUSTOM_MESSAGE_KEY = 'tokkii_discord_custom_message';
const DISCORD_CUSTOM_TITLE_KEY = 'tokkii_discord_custom_title';
const DISCORD_CUSTOM_DESC_KEY = 'tokkii_discord_custom_description';

export const DEFAULT_DISCORD_MESSAGE = '🎁 **¡Atención Comunidad! Nuevo Código de Regalo disponible para EvilTokkii TCG:**';
export const DEFAULT_DISCORD_TITLE = '🎉 ¡Nuevo Código de Regalo Disponible en EvilTokkii TCG!';
export const DEFAULT_DISCORD_DESCRIPTION = '¡Se ha liberado un nuevo código de canje para la comunidad! Ingrésalo en la web oficial antes de que se agote.';

export type DiscordNotifyMode = 'none' | 'here' | 'everyone';

export interface DiscordPublishResult {
  success: boolean;
  error?: string;
}

/**
 * Get the currently configured Discord Webhook URL.
 * Checks localStorage first, then fallback to Vite environment variable.
 */
export const getDiscordWebhookUrl = (): string => {
  try {
    const local = localStorage.getItem(DISCORD_WEBHOOK_STORAGE_KEY);
    if (local && local.trim().length > 0) return local.trim();
  } catch {}

  const envUrl = (import.meta.env.VITE_DISCORD_WEBHOOK_URL as string) || '';
  return envUrl.trim();
};

/**
 * Save Discord Webhook URL in localStorage.
 */
export const setDiscordWebhookUrl = (url: string): void => {
  try {
    localStorage.setItem(DISCORD_WEBHOOK_STORAGE_KEY, url.trim());
  } catch (err) {
    console.warn('Could not save Discord Webhook URL to localStorage:', err);
  }
};

/**
 * Get notification mention mode (none, @here, @everyone).
 */
export const getDiscordNotifyMode = (): DiscordNotifyMode => {
  try {
    const mode = localStorage.getItem(DISCORD_NOTIFY_ROLE_STORAGE_KEY) as DiscordNotifyMode;
    if (mode === 'here' || mode === 'everyone' || mode === 'none') return mode;
  } catch {}
  return 'none';
};

/**
 * Save notification mention mode.
 */
export const setDiscordNotifyMode = (mode: DiscordNotifyMode): void => {
  try {
    localStorage.setItem(DISCORD_NOTIFY_ROLE_STORAGE_KEY, mode);
  } catch {}
};

/**
 * Get custom notification message.
 */
export const getDiscordCustomMessage = (): string => {
  try {
    const saved = localStorage.getItem(DISCORD_CUSTOM_MESSAGE_KEY);
    if (saved !== null) return saved;
  } catch {}
  return DEFAULT_DISCORD_MESSAGE;
};

/**
 * Save custom notification message.
 */
export const setDiscordCustomMessage = (msg: string): void => {
  try {
    localStorage.setItem(DISCORD_CUSTOM_MESSAGE_KEY, msg);
  } catch {}
};

/**
 * Get custom embed card title.
 */
export const getDiscordCustomTitle = (): string => {
  try {
    const saved = localStorage.getItem(DISCORD_CUSTOM_TITLE_KEY);
    if (saved !== null) return saved;
  } catch {}
  return DEFAULT_DISCORD_TITLE;
};

/**
 * Save custom embed card title.
 */
export const setDiscordCustomTitle = (title: string): void => {
  try {
    localStorage.setItem(DISCORD_CUSTOM_TITLE_KEY, title);
  } catch {}
};

/**
 * Get custom embed card description.
 */
export const getDiscordCustomDescription = (): string => {
  try {
    const saved = localStorage.getItem(DISCORD_CUSTOM_DESC_KEY);
    if (saved !== null) return saved;
  } catch {}
  return DEFAULT_DISCORD_DESCRIPTION;
};

/**
 * Save custom embed card description.
 */
export const setDiscordCustomDescription = (desc: string): void => {
  try {
    localStorage.setItem(DISCORD_CUSTOM_DESC_KEY, desc);
  } catch {}
};

/**
 * Replace placeholders like {codigo}, {sobre}, {usos}, {nota} with real values.
 */
export const replacePlaceholders = (template: string, vars: Record<string, string>): string => {
  let result = template;
  for (const [key, val] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, val);
  }
  return result;
};

/**
 * Check if the webhook URL has a valid Discord Webhook format.
 */
export const isDiscordWebhookConfigured = (): boolean => {
  const url = getDiscordWebhookUrl();
  return Boolean(
    url &&
    (url.startsWith('https://discord.com/api/webhooks/') ||
     url.startsWith('https://discordapp.com/api/webhooks/'))
  );
};

const getPackBadgeInfo = (packType: string, quantity: number) => {
  let label = 'Sobre de Cartas';
  let color = 0xF50B8C; // Pink default

  if (packType === 'pack_1') {
    label = `${quantity}x Sobre de 1 Carta (Básico)`;
    color = 0x06B6D4; // Cyan
  } else if (packType === 'pack_3') {
    label = `${quantity}x Sobre de 3 Cartas (Estándar)`;
    color = 0xF43F5E; // Pink/Rose
  } else if (packType === 'pack_5') {
    label = `${quantity}x Sobre de 5 Cartas (Premium)`;
    color = 0xF59E0B; // Amber/Gold
  }

  return { label, color };
};

/**
 * Sends a test message to the Discord Webhook to verify credentials and connectivity.
 */
export const testDiscordWebhook = async (webhookUrl?: string): Promise<DiscordPublishResult> => {
  const targetUrl = (webhookUrl || getDiscordWebhookUrl()).trim();

  if (!targetUrl) {
    return { success: false, error: 'Por favor ingresa una URL de Webhook de Discord.' };
  }

  if (!targetUrl.startsWith('https://discord.com/api/webhooks/') && !targetUrl.startsWith('https://discordapp.com/api/webhooks/')) {
    return { success: false, error: 'La URL ingresada no parece ser un Webhook válido de Discord.' };
  }

  const payload = {
    username: 'EvilTokkii TCG Bot 🎁',
    avatar_url: 'https://raw.githubusercontent.com/bustosbrayan42-bot/cartastokko/main/public/cards/Icono.png',
    embeds: [
      {
        title: '🤖 ¡Webhook de Discord Conectado Exitosamente!',
        description: 'La integración entre **Tokkii Builder** y este canal de Discord está funcionando a la perfección. A partir de ahora podrás publicar códigos de regalo directamente con un solo clic.',
        color: 0x10B981, // Emerald Green
        fields: [
          {
            name: '📡 Estado de la Conexión',
            value: '✅ Operativa y Lista',
            inline: true,
          },
          {
            name: '🎮 Juego',
            value: 'EvilTokkii TCG',
            inline: true,
          },
        ],
        footer: {
          text: 'EvilTokkii TCG • Test de Webhook',
          icon_url: 'https://raw.githubusercontent.com/bustosbrayan42-bot/cartastokko/main/public/cards/Icono.png',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 204) {
      return { success: true };
    }

    const errorText = await res.text().catch(() => '');
    return {
      success: false,
      error: `Discord respondió con error HTTP ${res.status}: ${errorText || res.statusText}`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Error de red al conectar con Discord: ${err?.message || err}`,
    };
  }
};

/**
 * Publishes a gift code to Discord with a rich embedded card.
 */
export const publishGiftCodeToDiscord = async (
  code: GiftCodeWithStats,
  customWebhookUrl?: string
): Promise<DiscordPublishResult> => {
  const targetUrl = (customWebhookUrl || getDiscordWebhookUrl()).trim();

  if (!targetUrl) {
    return {
      success: false,
      error: 'No hay ningún Webhook de Discord configurado. Por favor ingresa la URL de tu canal.',
    };
  }

  const { label: packLabel, color: embedColor } = getPackBadgeInfo(code.pack_type, code.pack_quantity);

  const totalUsesText =
    code.max_total_uses === null
      ? 'Ilimitados (Sin tope total)'
      : code.max_total_uses === 1
      ? '¡Solo 1 uso disponible (Primer usuario gana)!'
      : `${code.max_total_uses} canjes en total`;

  const userLimitText =
    code.max_uses_per_user === 1
      ? '1 canje máximo por persona'
      : `${code.max_uses_per_user} canjes máximos por persona`;

  const templateVars: Record<string, string> = {
    codigo: code.code,
    sobre: packLabel,
    usos: totalUsesText,
    limite_usuario: userLimitText,
    nota: code.description || '',
  };

  const rawMessage = getDiscordCustomMessage() || DEFAULT_DISCORD_MESSAGE;
  const processedMessage = replacePlaceholders(rawMessage, templateVars).trim();

  const rawTitle = getDiscordCustomTitle() || DEFAULT_DISCORD_TITLE;
  const processedTitle = replacePlaceholders(rawTitle, templateVars).trim();

  const rawDescription = getDiscordCustomDescription() || DEFAULT_DISCORD_DESCRIPTION;
  const processedDescription = replacePlaceholders(rawDescription, templateVars).trim();

  const notifyMode = getDiscordNotifyMode();
  let contentMessage: string | undefined = undefined;

  if (notifyMode === 'everyone') {
    contentMessage = processedMessage.includes('@everyone')
      ? processedMessage
      : `@everyone ${processedMessage}`;
  } else if (notifyMode === 'here') {
    contentMessage = processedMessage.includes('@here')
      ? processedMessage
      : `@here ${processedMessage}`;
  } else {
    contentMessage = processedMessage || undefined;
  }

  const payload = {
    username: 'EvilTokkii TCG 🎁',
    avatar_url: 'https://raw.githubusercontent.com/bustosbrayan42-bot/cartastokko/main/public/cards/Icono.png',
    ...(contentMessage ? { content: contentMessage } : {}),
    embeds: [
      {
        title: processedTitle,
        description: processedDescription,
        color: embedColor,
        fields: [
          {
            name: '🔑 CÓDIGO DE CANJE',
            value: `\`\`\`fix\n${code.code}\n\`\`\``,
            inline: false,
          },
          {
            name: '🎁 Recompensa Otorgada',
            value: `**${packLabel}**`,
            inline: true,
          },
          {
            name: '👥 Límite de Usos',
            value: totalUsesText,
            inline: true,
          },
          {
            name: '👤 Límite por Usuario',
            value: userLimitText,
            inline: true,
          },
          ...(code.description
            ? [
                {
                  name: '📝 Nota del Creador',
                  value: `*${code.description}*`,
                  inline: false,
                },
              ]
            : []),
          {
            name: '🌐 ¿Cómo y Dónde Canjearlo?',
            value:
              '1. Abre la web: [**EvilTokkii TCG Oficial**](https://bustosbrayan42-bot.github.io/cartastokko/)\n' +
              '2. Inicia sesión con tu cuenta de Twitch.\n' +
              '3. Haz clic en el botón **"Canjear Código"** en la barra superior.\n' +
              '4. Pega el código **`' +
              code.code +
              '`** y ¡abre tus sobres!',
            inline: false,
          },
        ],
        footer: {
          text: 'EvilTokkii TCG • Sistema Oficial de Recompensas',
          icon_url: 'https://raw.githubusercontent.com/bustosbrayan42-bot/cartastokko/main/public/cards/Icono.png',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 204) {
      return { success: true };
    }

    const errBody = await res.text().catch(() => '');
    return {
      success: false,
      error: `Error al publicar en Discord (HTTP ${res.status}): ${errBody || res.statusText}`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Error de red al conectar con Discord: ${err?.message || err}`,
    };
  }
};
