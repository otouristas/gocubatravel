import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Camera, Clock, PenLine, Sparkles } from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import ProseBody from "@/components/ProseBody";
import { getRecord, heroOf, imagesOf, rawBodyOf, titleOf } from "@/lib/content";
import { records } from "@/content/records";
import { localizedPath } from "@/lib/i18n";
import { toProseBlocks, type ProseBlock } from "@/lib/prose";
import { GUIDE_PATHS } from "@/lib/routes";

const LA_STORIA_PATHS = [
  "/cuba-la-storia-intro/",
  "/cuba-la-storia-day-1/",
  "/cuba-la-storia-day-2/",
  "/cuba-la-storia-day-3/",
];

const TRAVELER_STORY_PATHS = [
  "/gamilio-taxidi-kouva-iro-stamatis/",
  "/gamilio-taxidi-kouva-dora-fotis/",
  "/road-trip-kouva-efi-vasilis/",
  "/road-trip-kouva-despoina-sotiria/",
  "/gamilio-taxidi-kouva-apostolos-maria/",
];

function isLaStoria(path: string) {
  return path.startsWith("/cuba-la-storia");
}

function isJournal(record: ContentRecord) {
  return record.kind === "blog" || record.kind === "post";
}

function bylineOf(record: ContentRecord, locale: Locale): string {
  if (isLaStoria(record.path)) {
    return locale === "en" ? "George Spirakis" : "Γιώργος Σπυράκης";
  }
  if (isJournal(record)) {
    return locale === "en" ? "GO CUBA editorial team" : "Συντακτική ομάδα GO CUBA";
  }
  const title = titleOf(record, locale);
  const pipe = title.split("|");
  if (pipe.length > 1) return pipe[1].trim();
  return locale === "en" ? "GO CUBA travellers" : "Ταξιδιώτες GO CUBA";
}

/** WP kept the series part in the title: "Cuba: la Storia [day 1]", "Road Trip Κούβα | Έφη & Βασίλης". */
function splitTitle(title: string): { headline: string; tag?: string } {
  const bracket = title.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
  if (bracket) return { headline: bracket[1].trim(), tag: bracket[2].trim() };

  const pipe = title.split("|");
  if (pipe.length > 1) return { headline: pipe[0].trim(), tag: pipe.slice(1).join("|").trim() };

  return { headline: title };
}

/** Series siblings share a headline, so the part tag has to stay visible in the navigation. */
function seriesLabel(record: ContentRecord, locale: Locale): string {
  const { headline, tag } = splitTitle(titleOf(record, locale));
  return tag ? `${headline} — ${tag}` : headline;
}

function readingMinutes(blocks: ProseBlock[]): number {
  const words = blocks
    .map((block) => (block.type === "list" ? block.items.join(" ") : block.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function seriesOf(record: ContentRecord): ContentRecord[] {
  if (isJournal(record) && !isLaStoria(record.path)) return [];
  const paths = isLaStoria(record.path) ? LA_STORIA_PATHS : TRAVELER_STORY_PATHS;
  return paths
    .map((path) => getRecord(path))
    .filter((r): r is ContentRecord => r !== undefined && r.status === "publish" && !r.noindex);
}

function relatedFor(record: ContentRecord): ContentRecord[] {
  if (isJournal(record)) {
    return records
      .filter(
        (r) =>
          isJournal(r) &&
          r.path !== record.path &&
          r.status === "publish" &&
          !r.noindex &&
          !r.aliasOf &&
          !GUIDE_PATHS.has(r.path),
      )
      .slice(0, 3);
  }

  const fromSeries = seriesOf(record).filter((r) => r.path !== record.path);
  if (fromSeries.length > 0) return fromSeries.slice(0, 3);

  return records
    .filter((r) => r.kind === "story" && r.path !== record.path && r.status === "publish" && !r.noindex)
    .slice(0, 3);
}

const CROP_SUFFIX = /-(\d{2,4})x(\d{2,4})(\.(?:jpe?g|png|webp))$/i;

/** WP keeps the crop in the filename ("…-226x300.jpg"), so portraits can avoid a 16:9 letterbox. */
function frameOf(src: string): string {
  const size = src.match(CROP_SUFFIX);
  if (size && Number(size[2]) > Number(size[1])) return "aspect-[3/4] mx-auto w-full max-w-[520px]";
  return "aspect-[16/9]";
}

/** Article photos are stored as 300px WP thumbnails; the untouched upload is the printable one. */
function fullSize(src: string): string {
  return src.replace(CROP_SUFFIX, "$3");
}

/** Split the article so the photos we have can breathe between passages instead of a footer grid. */
function chunkBlocks(blocks: ProseBlock[], parts: number): ProseBlock[][] {
  if (parts <= 1 || blocks.length < 4) return [blocks];

  const size = Math.ceil(blocks.length / parts);
  const groups: ProseBlock[][] = [];
  for (let i = 0; i < blocks.length; i += size) groups.push(blocks.slice(i, i + size));
  return groups;
}

export default function EditorialPostTemplate({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const title = titleOf(record, locale);
  const { headline, tag } = splitTitle(title);
  const blocks = toProseBlocks(rawBodyOf(record, locale));
  const photos = imagesOf(record);
  const hero = heroOf(record);
  const inlineImages = photos.slice(1, 5);
  const gallery = photos.slice(1 + inlineImages.length);
  const byline = bylineOf(record, locale);
  const related = relatedFor(record);
  const journal = isJournal(record);
  const minutes = readingMinutes(blocks);
  const groups = chunkBlocks(blocks, inlineImages.length + 1);

  const series = seriesOf(record);
  const seriesIndex = series.findIndex((item) => item.path === record.path);
  const previous = seriesIndex > 0 ? series[seriesIndex - 1] : undefined;
  const next = seriesIndex >= 0 && seriesIndex < series.length - 1 ? series[seriesIndex + 1] : undefined;

  const hubPath = journal ? "/blog-cuba-vibe/" : "/taxidiotikes-istories/";
  const hubLabel = journal ? "Cuba Vibe" : isEn ? "Travel Stories" : "Ταξιδιωτικές Ιστορίες";
  const badge = isLaStoria(record.path)
    ? "CUBA SIN LIMON"
    : journal
      ? "CUBA VIBE"
      : isEn
        ? "TRAVELER STORY"
        : "ΙΣΤΟΡΙΑ ΤΑΞΙΔΙΩΤΗ";

  return (
    <article className="bg-white">
      <div className="border-b border-line bg-paper py-3 text-sm text-muted">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <div className="flex min-w-0 items-center gap-2">
            <Link href={localizedPath(locale, "/")} className="transition-colors hover:text-gold-deep">
              {isEn ? "Home" : "Αρχική"}
            </Link>
            <span>/</span>
            <Link href={localizedPath(locale, hubPath)} className="transition-colors hover:text-gold-deep">
              {hubLabel}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-medium text-ink">{headline}</span>
          </div>
          <Link
            href={localizedPath(locale, hubPath)}
            className="hidden items-center gap-1 font-semibold text-gold-deep hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{journal ? (isEn ? "All articles" : "Όλα τα άρθρα") : isEn ? "All stories" : "Όλες οι ιστορίες"}</span>
          </Link>
        </div>
      </div>

      {hero ? (
        <div className="relative min-h-[52vh] w-full bg-[#0b0b0b] text-white">
          <Image src={fullSize(hero)} alt={headline} fill priority sizes="100vw" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/50 to-black/50" />
          <div className="relative mx-auto flex min-h-[52vh] max-w-[860px] flex-col justify-end px-6 pb-14 pt-24 lg:px-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="gold-badge">
                <PenLine className="h-3 w-3 text-gold" />
                <span>{badge}</span>
              </span>
              {tag ? (
                <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
                  {tag}
                </span>
              ) : null}
            </div>
            <h1 className="font-editorial text-4xl font-normal leading-tight sm:text-5xl md:text-6xl">{headline}</h1>
          </div>
        </div>
      ) : (
        <header className="mx-auto max-w-[860px] px-6 pt-14">
          <h1 className="font-editorial text-4xl font-normal leading-tight text-ink sm:text-5xl">{headline}</h1>
        </header>
      )}

      {record.noindex && (
        <div className="border-b border-gold/40 bg-gold/10 px-6 py-3 text-center text-sm font-semibold text-gold-deep">
          {t(COPY.hiddenNotice, locale)}
        </div>
      )}

      <div className="mx-auto max-w-[860px] px-6 lg:px-0">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line py-5 text-sm text-muted">
          <span className="font-medium text-ink">
            {isEn ? "By" : "Γράφει"} {byline}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-deep" />
            {minutes} {isEn ? "min read" : minutes === 1 ? "λεπτό ανάγνωσης" : "λεπτά ανάγνωσης"}
          </span>
          {series.length > 1 && seriesIndex >= 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <PenLine className="h-3.5 w-3.5 text-gold-deep" />
              {isEn ? "Part" : "Μέρος"} {seriesIndex + 1}/{series.length}
            </span>
          ) : null}
        </div>

        <div className="space-y-10 py-12">
          {groups.map((group, i) => (
            <div key={i} className="space-y-10">
              <ProseBody blocks={group} lede={i === 0} />
              {inlineImages[i] ? (
                <figure className={`relative overflow-hidden rounded-sm border border-line ${frameOf(inlineImages[i])}`}>
                  <Image
                    src={fullSize(inlineImages[i])}
                    alt={`${headline} ${i + 2}`}
                    fill
                    sizes="(max-width: 860px) 100vw, 860px"
                    className="object-cover"
                  />
                </figure>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {(previous || next) && (
        <nav className="mx-auto max-w-[860px] px-6 pb-14 lg:px-0">
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={localizedPath(locale, previous.path)}
                className="group rounded-sm border border-line bg-paper p-5 transition-colors hover:border-gold"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  <ArrowLeft className="h-3 w-3" />
                  {isEn ? "Previous part" : "Προηγούμενο μέρος"}
                </span>
                <p className="mt-2 font-editorial text-xl text-ink group-hover:text-gold-deep">
                  {seriesLabel(previous, locale)}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={localizedPath(locale, next.path)}
                className="group rounded-sm border border-line bg-paper p-5 text-right transition-colors hover:border-gold"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  {isEn ? "Next part" : "Επόμενο μέρος"}
                  <ArrowRight className="h-3 w-3" />
                </span>
                <p className="mt-2 font-editorial text-xl text-ink group-hover:text-gold-deep">
                  {seriesLabel(next, locale)}
                </p>
              </Link>
            ) : null}
          </div>
        </nav>
      )}

      <section className="border-t border-line bg-[#0b0b0b] py-14 text-white">
        <div className="mx-auto flex max-w-[860px] flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-0">
          <div>
            <h2 className="font-editorial text-2xl font-normal sm:text-3xl">
              {isEn ? "Ready to write your own Cuba story?" : "Έτοιμοι να γράψετε τη δική σας ιστορία στην Κούβα;"}
            </h2>
            <p className="mt-2 text-sm text-white/75">
              {isEn
                ? "Tell us how you travel and we build the itinerary around it."
                : "Πείτε μας πώς ταξιδεύετε και σχεδιάζουμε το πρόγραμμα γύρω από εσάς."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={localizedPath(locale, "/ai-planner/")} className="btn-gold">
              <Sparkles className="h-4 w-4" />
              <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
            </Link>
            <a href={SITE.phoneHref} className="btn-outline-white">
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="border-t border-line bg-paper py-16">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="mb-8 flex items-center gap-2">
              <Camera className="h-5 w-5 text-gold-deep" />
              <h2 className="font-editorial text-2xl font-normal text-ink">{t(COPY.gallery, locale)}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {gallery.slice(0, 9).map((src, i) => (
                <div
                  key={src + i}
                  className="luxury-card relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-white shadow-xs"
                >
                  <Image
                    src={fullSize(src)}
                    alt={`${headline} ${i + 2}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line py-16">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <h2 className="mb-8 font-editorial text-2xl font-normal text-ink">
              {journal
                ? isEn
                  ? "More from Cuba Vibe"
                  : "Περισσότερα από το Cuba Vibe"
                : isEn
                  ? "More stories"
                  : "Περισσότερες ιστορίες"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const itemTitle = splitTitle(titleOf(item, locale));
                const thumb = heroOf(item);
                return (
                  <Link
                    key={item.path}
                    href={localizedPath(locale, item.path)}
                    className="luxury-card group overflow-hidden rounded-sm border border-line bg-white shadow-xs"
                  >
                    <div className="relative aspect-[16/9] bg-paper">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={itemTitle.headline}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      {itemTitle.tag ? (
                        <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                          {itemTitle.tag}
                        </span>
                      ) : null}
                      <h3 className="mt-1 font-editorial text-lg leading-snug text-ink group-hover:text-gold-deep">
                        {itemTitle.headline}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep">
                        {isEn ? "Read" : "Διαβάστε"}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
