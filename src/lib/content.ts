import { records, recordsByPath, hotels, tours } from "@/content/records";
import type { ContentRecord, Locale } from "@/content/types";
import { isOrnamentOnly, stripEmoji } from "@/lib/text";

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

export function getRecord(path: string): ContentRecord | undefined {
  const key = normalizePath(path);
  return recordsByPath[key];
}

/** Editors decorated WP titles with flags and emoji; strip them everywhere a title renders. */
export function titleOf(record: ContentRecord, locale: Locale): string {
  return stripEmoji(locale === "en" ? record.titleEn : record.titleEl);
}

export function seoTitleOf(record: ContentRecord, locale: Locale): string {
  const seo = stripEmoji(locale === "en" ? record.seoTitleEn : record.seoTitleEl)
    // Yoast left records whose SEO title is only the separator plus the brand.
    .replace(/^[\s|\-–—]+/, "")
    .replace(/^GO CUBA\b[\s|\-–—]*/i, "")
    .trim();
  if (seo.length > 2) return seo;
  return stripEmoji(locale === "en" ? record.titleEn : record.titleEl);
}

export function excerptOf(record: ContentRecord, locale: Locale): string {
  return stripEmoji(locale === "en" ? record.excerptEn : record.excerptEl);
}

/** WP attached the ESPA/EU funding banner to several pages; it is never a usable hero or gallery shot. */
const BANNER_IMAGE = /e-banner|espa/i;

export function imagesOf(record: ContentRecord): string[] {
  return record.images.filter((src) => src && !BANNER_IMAGE.test(src));
}

export function heroOf(record: ContentRecord): string {
  const thumb = record.thumb && !BANNER_IMAGE.test(record.thumb) ? record.thumb : "";
  return imagesOf(record)[0] || thumb;
}

/** Untouched WP paragraphs, for renderers that parse the original bullet markers themselves. */
export function rawBodyOf(record: ContentRecord, locale: Locale): string[] {
  return locale === "en" ? record.bodyEn : record.bodyEl;
}

export function bodyOf(record: ContentRecord, locale: Locale): string[] {
  return (locale === "en" ? record.bodyEn : record.bodyEl)
    .map(stripEmoji)
    .filter((line) => line.length > 0 && !isOrnamentOnly(line));
}

export function visibleHotels(): ContentRecord[] {
  return hotels.filter((h) => !h.noindex && !h.aliasOf);
}

export function visibleTours(): ContentRecord[] {
  return tours.filter((t) => !t.noindex && !t.aliasOf);
}

export function indexableRecords(): ContentRecord[] {
  return records.filter((r) => !r.noindex && !r.aliasOf);
}

export function searchRecords(query: string, locale: Locale): ContentRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return records
    .filter((r) => !r.aliasOf)
    .filter((r) => {
      const hay = `${r.titleEl} ${r.titleEn} ${r.excerptEl} ${r.excerptEn} ${r.path}`.toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 12);
}

export { records, hotels, tours };
