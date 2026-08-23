/** Pictographs, regional-indicator flag halves, ZWJ sequences and skin-tone modifiers. */
const EMOJI_RE =
  /[\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u200D\u{1F3FB}-\u{1F3FF}]/gu;

/** Decorative glyphs the WordPress editors used as bullets/dividers. */
const ORNAMENT_RE = /[★☆✪✦✧❖➺➜➔➤►▶◆♦]/g;

export function stripEmoji(value: string): string {
  if (!value) return value;
  return value
    .replace(EMOJI_RE, "")
    .replace(ORNAMENT_RE, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?)])/g, "$1")
    .replace(/^[\s\-–—|·•]+/, "")
    .replace(/[\s\-–—|·•]+$/, "")
    .trim();
}

export function isOrnamentOnly(value: string): boolean {
  return stripEmoji(value).length === 0;
}

/** "50 Ευρώ" / "50 EUR" → "50€" so prices read the same in both locales. */
export function normalizeCurrency(value: string): string {
  return value
    .replace(/(\d)\s*(?:Ευρώ|ευρώ|EUR|euros?|Euros?)(?![\p{L}])/gu, "$1€")
    .replace(/\s+€/g, "€");
}

export function firstAmount(value: string): number | undefined {
  const match = value.match(/(\d[\d.]*)\s*€/);
  if (!match) return undefined;
  const n = Number(match[1].replace(/\./g, ""));
  return Number.isFinite(n) ? n : undefined;
}
