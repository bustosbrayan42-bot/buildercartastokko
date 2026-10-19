import type { GiftCodeWithStats } from './giftCodeService';

const WHATSAPP_CUSTOM_TEMPLATE_KEY = 'tokkii_whatsapp_custom_template';
export const TCG_WEB_OFFICIAL_URL = 'https://tcg.eviltokkii.online/Home';

export const DEFAULT_WHATSAPP_TEMPLATE = 
`🎁 *¡NUEVO CÓDIGO DE REGALO - EVILTOKKII TCG!* 🎁

¡Se ha liberado un nuevo código de canje para la comunidad! 🎉

🔑 *CÓDIGO:* *{codigo}*
📦 *Recompensa:* {sobre}
👥 *Límite de canjes:* {usos}
👤 *Límite por persona:* {limite_usuario}
{nota}
🌐 *¿Cómo canjearlo?*
1. Entra a: {url}
2. Inicia sesión con tu cuenta de Twitch
3. Haz clic en *"Canjear Código"* y escribe: *{codigo}*

¡Abre tus sobres antes de que se agoten! ✨`;

/**
 * Get user configured WhatsApp message template.
 */
export const getWhatsAppCustomTemplate = (): string => {
  try {
    const saved = localStorage.getItem(WHATSAPP_CUSTOM_TEMPLATE_KEY);
    if (saved !== null && saved.trim().length > 0) {
      if (saved.includes('bustosbrayan42-bot.github.io/cartastokko')) {
        const migrated = saved
          .replaceAll('https://bustosbrayan42-bot.github.io/cartastokko/', TCG_WEB_OFFICIAL_URL)
          .replaceAll('https://bustosbrayan42-bot.github.io/cartastokko', TCG_WEB_OFFICIAL_URL);
        try {
          localStorage.setItem(WHATSAPP_CUSTOM_TEMPLATE_KEY, migrated);
        } catch {}
        return migrated;
      }
      return saved;
    }
  } catch {}
  return DEFAULT_WHATSAPP_TEMPLATE;
};

/**
 * Save user configured WhatsApp message template.
 */
export const setWhatsAppCustomTemplate = (template: string): void => {
  try {
    localStorage.setItem(WHATSAPP_CUSTOM_TEMPLATE_KEY, template.trim());
  } catch (err) {
    console.warn('Could not save WhatsApp template to localStorage:', err);
  }
};

/**
 * Reset template to default.
 */
export const resetWhatsAppTemplate = (): void => {
  try {
    localStorage.removeItem(WHATSAPP_CUSTOM_TEMPLATE_KEY);
  } catch {}
};

/**
 * Format badge/label for card packs.
 */
export const getPackBadgeLabel = (packType: string, quantity: number): string => {
  if (packType === 'pack_1') {
    return `${quantity}x Sobre de 1 Carta (Básico)`;
  }
  if (packType === 'pack_3') {
    return `${quantity}x Sobre de 3 Cartas (Estándar)`;
  }
  if (packType === 'pack_5') {
    return `${quantity}x Sobre de 5 Cartas (Premium)`;
  }
  return `${quantity}x Sobre de Cartas`;
};

/**
 * Format the complete message text for WhatsApp with dynamic variables.
 */
export const formatWhatsAppMessage = (
  code: GiftCodeWithStats,
  customTemplate?: string
): string => {
  const packLabel = getPackBadgeLabel(code.pack_type, code.pack_quantity);

  const totalUsesText =
    code.max_total_uses === null
      ? 'Ilimitados (Sin tope total)'
      : code.max_total_uses === 1
      ? '¡Solo 1 uso (El más rápido gana)!'
      : `${code.max_total_uses} canjes en total`;

  const userLimitText =
    code.max_uses_per_user === 1
      ? '1 canje máx. por persona'
      : `${code.max_uses_per_user} canjes máx. por persona`;

  const noteText = code.description ? `📝 *Nota:* ${code.description}\n` : '';

  const rawTemplate = customTemplate || getWhatsAppCustomTemplate();

  let formatted = rawTemplate
    .replaceAll('{codigo}', code.code)
    .replaceAll('{sobre}', packLabel)
    .replaceAll('{usos}', totalUsesText)
    .replaceAll('{limite_usuario}', userLimitText)
    .replaceAll('{nota}', noteText)
    .replaceAll('{url}', TCG_WEB_OFFICIAL_URL)
    .replaceAll('https://bustosbrayan42-bot.github.io/cartastokko/', TCG_WEB_OFFICIAL_URL)
    .replaceAll('https://bustosbrayan42-bot.github.io/cartastokko', TCG_WEB_OFFICIAL_URL);

  return formatted.trim();
};

/**
 * Generate click-to-chat WhatsApp URL to share the code in 1 click.
 */
export const getWhatsAppShareUrl = (
  code: GiftCodeWithStats,
  customTemplate?: string
): string => {
  const message = formatWhatsAppMessage(code, customTemplate);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
};
