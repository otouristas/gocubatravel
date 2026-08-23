import { isOrnamentOnly, stripEmoji } from "@/lib/text";

export type ProseBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** WP social-share widgets left these as bare paragraphs at the end of every page. */
const SOCIAL_NOISE = /^(facebook|instagram|pinterest|twitter|x|linkedin|youtube|tiktok)$/i;
const FORM_NOISE =
  /(Marketing by ActiveCampaign|All Rights Reserved|we'll be in touch soon|Σεβόμαστε την ιδιωτικότητά σου)/i;
const SHORTCODE = /\[[a-z_]+[^\]]*\]/gi;
const BULLET = /^(?:[-–—•▪◦*➤➔➜➺►▶]|\d+[.)])\s*(.*)$/;
/** WP editors glued arrow bullets into one paragraph: "…ερωτήσεις:➤ Πρώτο➤ Δεύτερο". */
const INLINE_ARROW = /[➤➔➜➺►▶]/;

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&quot;/g, '"');
}

/** Divi icon-list shortcodes hide real copy inside text="…" attributes. */
function shortcodeText(line: string): string[] {
  const items: string[] = [];
  for (const match of line.matchAll(/text="([^"]+)"/g)) {
    const text = decodeEntities(match[1]).trim();
    if (text) items.push(text.replace(/([α-ωίϊΐόάέύϋΰήώς])([Α-ΩΆΈΉΊΌΎΏ])/, "$1 — $2"));
  }
  return items;
}

/**
 * WP editors glued arrow bullets into a single paragraph. Split them before stripEmoji
 * removes the arrows, otherwise the items run into each other.
 */
function splitArrowBullets(decoded: string): string[] {
  const firstArrow = decoded.search(INLINE_ARROW);
  if (firstArrow === -1) return [stripEmoji(decoded)];

  const lead = stripEmoji(decoded.slice(0, firstArrow));
  const items = decoded
    .slice(firstArrow)
    .split(INLINE_ARROW)
    .map(stripEmoji)
    .filter((item) => item.length > 1);

  if (items.length < 2) return [stripEmoji(decoded)];
  return [...(lead.length > 1 ? [lead] : []), ...items.map((item) => `• ${item}`)];
}

/** Legacy WP editors typed accented capitals as apostrophe + letter ("'Η θέλεις"). */
function fixGreekAccents(line: string): string {
  return line.replace(/(^|\s)['’]([ΗΟΑΕΙΥΩ])(?=\s)/g, (_, lead: string, letter: string) => {
    const accented: Record<string, string> = { Η: "Ή", Ο: "Ό", Α: "Ά", Ε: "Έ", Ι: "Ί", Υ: "Ύ", Ω: "Ώ" };
    return `${lead}${accented[letter] ?? letter}`;
  });
}

/**
 * WP lost the tag boundary between an <h3> and its paragraph, leaving
 * 'Ropa Vieja: Ένα Πιάτο που Μπορεί να "Φορεθεί"Παρόλο που το όνομα…' on one line.
 */
function splitGluedHeading(line: string): string[] {
  let letterCut = -1;
  let punctuationCut = -1;
  for (const match of line.matchAll(/[\p{Ll}»”"'’)\]](?=\p{Lu})/gu)) {
    const index = match.index + 1;
    if (index < 12 || index > 120) continue;
    // Only headings carry a colon; without one the uppercase letter is usually "'Η", "«Ο" and friends.
    const head = line.slice(0, index);
    if (!head.includes(":")) continue;
    // A word glued straight onto the next word is the real tag boundary; quotes are the fallback.
    if (/\p{Ll}/u.test(match[0])) letterCut = index;
    else punctuationCut = index;
  }

  const cut = letterCut !== -1 ? letterCut : punctuationCut;
  if (cut === -1 || line.length - cut < 40) return [line];

  let head = line.slice(0, cut);
  let body = line.slice(cut);
  // An unbalanced trailing quote opens the paragraph, it does not close the heading.
  if (head.endsWith('"') && (head.match(/"/g) ?? []).length % 2 === 1) {
    head = head.slice(0, -1);
    body = `"${body}`;
  }

  return [head.trim(), body];
}

export function sanitizeLines(lines: string[]): string[] {
  const out: string[] = [];
  for (const raw of lines) {
    if (SHORTCODE.test(raw)) {
      SHORTCODE.lastIndex = 0;
      out.push(...shortcodeText(raw));
      continue;
    }
    const decoded = fixGreekAccents(decodeEntities(raw).replace(/\s+/g, " ").trim());
    for (const piece of splitArrowBullets(decoded)) {
      const line = piece.trim();
      if (!line || line.length < 2) continue;
      if (SOCIAL_NOISE.test(line)) continue;
      if (FORM_NOISE.test(line)) continue;
      if (isOrnamentOnly(line)) continue;
      out.push(...splitGluedHeading(line));
    }
  }
  return out;
}

function isHeading(line: string, next?: string, prev?: string): boolean {
  if (!line || line.length > 90) return false;
  if (/[.!;·,]$/.test(line)) return false;
  if (!/^[Α-ΩΪΫΆΈΉΊΌΎΏA-Z0-9"«(]/.test(line)) return false;
  if (line.endsWith(":")) return true;
  if (!next) return false;
  if (line.includes(":")) return next.length > 60;
  // Without a colon, a short line only titles the next one when the previous sentence closed;
  // otherwise it is one more item in a run of short lines.
  if (prev && !/[.!;:·]$/.test(prev)) return false;
  return next.length > line.length + 40;
}

export function toProseBlocks(lines: string[]): ProseBlock[] {
  const clean = sanitizeLines(lines);
  const blocks: ProseBlock[] = [];
  let i = 0;

  while (i < clean.length) {
    const line = clean[i];

    if (BULLET.test(line)) {
      const items: string[] = [];
      while (i < clean.length) {
        const match = clean[i].match(BULLET);
        if (!match) break;
        items.push(match[1].trim());
        i += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    if (isHeading(line, clean[i + 1], clean[i - 1])) {
      blocks.push({ type: "heading", text: line.replace(/\s*:$/, "") });
      i += 1;

      if (line.endsWith(":")) {
        const items: string[] = [];
        let j = i;
        // Items of one list punctuate alike; a sentence that ends differently is closing prose.
        const endsSentence = (value: string) => /[.!]$/.test(value);
        while (
          j < clean.length &&
          clean[j].length <= 170 &&
          !isHeading(clean[j], clean[j + 1], clean[j - 1]) &&
          !BULLET.test(clean[j]) &&
          (items.length === 0 || endsSentence(clean[j]) === endsSentence(items[0]))
        ) {
          items.push(clean[j]);
          j += 1;
        }
        if (items.length >= 2) {
          blocks.push({ type: "list", items });
          i = j;
        }
      }
      continue;
    }

    const run = unpunctuatedRun(clean, i);
    if (run.length >= 3) {
      blocks.push({ type: "list", items: run.map((item) => item.replace(/[,;]$/, "")) });
      i += run.length;
      continue;
    }

    blocks.push({ type: "paragraph", text: line });
    i += 1;
  }

  return blocks;
}

/**
 * WP dropped the <ul> around some lists, leaving a run of short lines that never close a sentence.
 */
function unpunctuatedRun(lines: string[], start: number): string[] {
  const run: string[] = [];
  for (let i = start; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.length > 130 || /[.!;:·…]$/.test(line) || BULLET.test(line)) break;
    if (!/^[Α-ΩΪΫΆΈΉΊΌΎΏA-Z0-9]/.test(line)) break;
    run.push(line);
  }
  return run;
}

/** True when the source page carried a newsletter/lead-magnet form we replace with a real CTA. */
export function hasLeadForm(lines: string[]): boolean {
  return lines.some((line) => FORM_NOISE.test(line));
}
