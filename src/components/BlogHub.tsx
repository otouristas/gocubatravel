import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PenLine, Sparkles } from "lucide-react";
import type { ContentRecord, Locale } from "@/content/types";
import { records } from "@/content/records";
import { excerptOf, heroOf, rawBodyOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { sanitizeLines } from "@/lib/prose";
import { GUIDE_PATHS } from "@/lib/routes";

const HERO =
  "https://www.skydream.gr/wp-content/uploads/Cuba-la-storia-intro-Cuba-sin-limon-Skydream-blog-editorial.jpg";

function summaryOf(record: ContentRecord, locale: Locale): string {
  const excerpt = excerptOf(record, locale);
  if (excerpt) return excerpt;
  const body = sanitizeLines(rawBodyOf(record, locale));
  return body.find((line) => line.length > 80) || body[0] || "";
}

export default function BlogHub({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const intro = sanitizeLines(rawBodyOf(record, locale));

  const posts = records.filter(
    (item) =>
      (item.kind === "blog" || item.kind === "post") &&
      item.status === "publish" &&
      !item.noindex &&
      !item.aliasOf &&
      !GUIDE_PATHS.has(item.path),
  );

  const [lead, ...rest] = posts;

  return (
    <div className="bg-white">
      <section className="relative min-h-[42vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src={heroOf(record) || (lead ? heroOf(lead) : "") || HERO}
          alt="Cuba Vibe"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <PenLine className="h-3 w-3 text-gold" />
              <span>CUBA VIBE</span>
            </span>
            <h1 className="font-editorial text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              {titleOf(record, locale)}
            </h1>
            {intro[0] && (
              <p className="mt-3 text-base font-light leading-relaxed text-white/90 sm:text-lg">
                {intro[0]}
              </p>
            )}
          </div>
        </div>
      </section>

      {intro.length > 1 && (
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-3xl space-y-3 px-6 py-10 text-center lg:px-12">
            {intro.slice(1).map((line, idx) => (
              <p key={idx} className="text-lg font-light leading-relaxed text-ink/85">
                {line}
              </p>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        {lead && (
          <Link
            href={localizedPath(locale, lead.path)}
            className="luxury-card group mb-12 grid overflow-hidden rounded-sm border border-line bg-paper md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full bg-white md:aspect-auto md:min-h-[320px]">
              <Image
                src={heroOf(lead) || HERO}
                alt={titleOf(lead, locale)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                {isEn ? "LATEST" : "ΠΡΟΣΦΑΤΟ"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal leading-snug text-ink group-hover:text-gold-deep">
                {titleOf(lead, locale)}
              </h2>
              <p className="mt-3 line-clamp-4 text-base leading-relaxed text-muted">
                {summaryOf(lead, locale)}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep">
                {isEn ? "Read the article" : "Διαβάστε το άρθρο"}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article
              key={post.path}
              className="luxury-card group flex flex-col overflow-hidden rounded-sm border border-line bg-paper"
            >
              <Link
                href={localizedPath(locale, post.path)}
                className="relative aspect-[16/10] w-full overflow-hidden bg-white"
              >
                <Image
                  src={heroOf(post) || HERO}
                  alt={titleOf(post, locale)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-editorial text-xl font-normal leading-snug text-ink group-hover:text-gold-deep">
                    <Link href={localizedPath(locale, post.path)}>{titleOf(post, locale)}</Link>
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                    {summaryOf(post, locale)}
                  </p>
                </div>
                <Link
                  href={localizedPath(locale, post.path)}
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                >
                  <span>{isEn ? "Read" : "Διαβάστε"}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-sm border-2 border-gold/60 bg-[#0b0b0b] p-8 text-white shadow-2xl sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="gold-badge mb-3">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span>CUBA AI</span>
              </span>
              <h2 className="font-editorial text-3xl font-normal text-white">
                {isEn ? "Turn inspiration into an itinerary" : "Από την έμπνευση στο πρόγραμμα"}
              </h2>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/80">
                {isEn
                  ? "Read something you love? CUBA AI drafts a day-by-day route around it in 30 seconds."
                  : "Σας άρεσε κάτι που διαβάσατε; Το CUBA AI φτιάχνει πρόγραμμα γύρω από αυτό σε 30 δευτερόλεπτα."}
              </p>
            </div>
            <Link href={localizedPath(locale, "/ai-planner/")} className="btn-gold shrink-0">
              <Sparkles className="h-4 w-4" />
              <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
