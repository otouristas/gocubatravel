import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine, Sparkles } from "lucide-react";
import type { ContentRecord, Locale } from "@/content/types";
import { bodyOf, getRecord, heroOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";

const CUBA_SIN_LIMON_PATHS = [
  "/cuba-la-storia-day-2/",
  "/cuba-la-storia-day-1/",
  "/cuba-la-storia-intro/",
];

const TRAVELER_STORY_PATHS = [
  "/gamilio-taxidi-kouva-iro-stamatis/",
  "/gamilio-taxidi-kouva-dora-fotis/",
  "/road-trip-kouva-efi-vasilis/",
  "/road-trip-kouva-despoina-sotiria/",
  "/gamilio-taxidi-kouva-apostolos-maria/",
];

function recordsFromPaths(paths: string[]): ContentRecord[] {
  return paths
    .map((path) => getRecord(path))
    .filter((r): r is ContentRecord => r !== undefined && r.status === "publish" && !r.noindex);
}

function excerptFrom(record: ContentRecord, locale: Locale): string {
  const excerpt = locale === "en" ? record.excerptEn : record.excerptEl;
  if (excerpt.trim()) return excerpt;
  const first = bodyOf(record, locale).find((p) => p.trim() && p.trim() !== "✪");
  return first ?? "";
}

function StoryCard({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const title = titleOf(record, locale);
  const excerpt = excerptFrom(record, locale);
  const thumb = heroOf(record);

  return (
    <Link
      href={localizedPath(locale, record.path)}
      className="luxury-card group flex flex-col overflow-hidden rounded-sm border border-line bg-white shadow-xs"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-paper">
        {thumb ? (
          <Image
            src={thumb}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-editorial text-xl font-normal leading-snug text-ink group-hover:text-gold-deep">
          {title}
        </h3>
        {excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{excerpt}</p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep">
          {locale === "en" ? "Read the story" : "Διαβάστε την ιστορία"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function StoriesHub({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const hub = getRecord("/taxidiotikes-istories/");
  const intro = hub
    ? bodyOf(hub, locale).filter(
        (p) =>
          p.trim() &&
          p !== "Cuba sin limon" &&
          p !== "Γράφει ο Γιώργος Σπυράκης" &&
          p !== "Ατομικό ταξίδι στην Κούβα"
      )
    : [];
  const series = recordsFromPaths(CUBA_SIN_LIMON_PATHS);
  const travelers = recordsFromPaths(TRAVELER_STORY_PATHS);
  const hero =
    "https://www.skydream.gr/wp-content/uploads/Cuba-la-storia-day-2-Cuba-sin-limon-Skydream-blog-editorial-1024x576.jpg";

  return (
    <div className="bg-white">
      <section className="relative min-h-[42vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src={hero}
          alt={isEn ? "Travel stories from Cuba" : "Ταξιδιωτικές ιστορίες από την Κούβα"}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <BookOpen className="h-3 w-3 text-gold" />
              <span>{isEn ? "CUBA STORIES" : "ΤΑΞΙΔΙΩΤΙΚΕΣ ΙΣΤΟΡΙΕΣ"}</span>
            </span>
            <h1 className="font-editorial text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              {isEn ? "Travel Stories" : "Ταξιδιωτικές Ιστορίες"}
            </h1>
            <p className="mt-3 text-base font-light leading-relaxed text-white/90 sm:text-lg">
              {isEn
                ? "Memories and stories from travellers who lived Cuba — from Havana’s dance halls to the quiet beaches of Cayo Santa María."
                : "Αναμνήσεις και ιστορίες από ταξιδιώτες που έζησαν την Κούβα — από τις χορευτικές αίθουσες της Αβάνας μέχρι τις ήσυχες παραλίες του Κάγιο Σάντα Μαρία."}
            </p>
          </div>
        </div>
      </section>

      {intro.length > 0 && (
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-[800px] px-6 py-14 lg:px-12">
            <div className="prose-cuba text-ink">
              {intro.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="mb-8 max-w-2xl">
          <span className="gold-badge mb-3">
            <PenLine className="h-3 w-3 text-gold" />
            <span>CUBA SIN LIMON</span>
          </span>
          <h2 className="font-editorial text-3xl font-normal text-ink sm:text-4xl">
            Cuba sin limon
          </h2>
          <p className="mt-2 text-base text-muted">
            {isEn ? "Written by George Spirakis" : "Γράφει ο Γιώργος Σπυράκης"}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((record) => (
            <StoryCard key={record.path} record={record} locale={locale} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
          <div className="mb-8 max-w-2xl">
            <span className="gold-badge mb-3">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>{isEn ? "PRIVATE JOURNEYS" : "ΑΤΟΜΙΚΑ ΤΑΞΙΔΙΑ"}</span>
            </span>
            <h2 className="font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn ? "Private journeys in Cuba" : "Ατομικό ταξίδι στην Κούβα"}
            </h2>
            <p className="mt-2 text-base text-muted">
              {isEn
                ? "Honeymoons and road trips told by the travellers who lived them."
                : "Γαμήλια ταξίδια και road trips από τους ανθρώπους που τα έζησαν."}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {travelers.map((record) => (
              <StoryCard key={record.path} record={record} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
