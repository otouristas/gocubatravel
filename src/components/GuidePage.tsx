import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Camera, Phone, Sparkles } from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import ProseBody from "@/components/ProseBody";
import { heroOf, imagesOf, rawBodyOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { toProseBlocks } from "@/lib/prose";

export default function GuidePage({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const title = titleOf(record, locale);
  const blocks = toProseBlocks(rawBodyOf(record, locale));
  const hero = heroOf(record);
  const gallery = imagesOf(record).slice(1);

  const contents = blocks
    .filter((block): block is { type: "heading"; text: string } => block.type === "heading")
    .slice(0, 8);

  return (
    <article className="bg-white">
      <div className="border-b border-line bg-paper py-3 text-sm text-muted">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <div className="flex min-w-0 items-center gap-2">
            <Link href={localizedPath(locale, "/")} className="transition-colors hover:text-gold-deep">
              {isEn ? "Home" : "Αρχική"}
            </Link>
            <span>/</span>
            <Link
              href={localizedPath(locale, "/taxidi-stin-kouva/")}
              className="transition-colors hover:text-gold-deep"
            >
              {isEn ? "Travel guide" : "Οδηγός ταξιδιού"}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-medium text-ink">{title}</span>
          </div>

          <Link
            href={localizedPath(locale, "/taxidi-stin-kouva/")}
            className="hidden items-center gap-1 font-semibold text-gold-deep hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isEn ? "All guides" : "Όλοι οι οδηγοί"}</span>
          </Link>
        </div>
      </div>

      <section className="relative min-h-[40vh] w-full bg-[#0b0b0b] text-white">
        {hero && (
          <Image src={hero} alt={title} fill priority sizes="100vw" className="object-cover opacity-55" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />
        <div className="relative mx-auto flex min-h-[40vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <BookOpen className="h-3 w-3 text-gold" />
              <span>{isEn ? "CUBA TRAVEL GUIDE" : "ΟΔΗΓΟΣ ΤΑΞΙΔΙΟΥ"}</span>
            </span>
            <h1 className="font-editorial text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {record.noindex && (
        <div className="border-b border-gold/40 bg-gold/10 px-6 py-3 text-center text-sm font-semibold text-gold-deep">
          {t(COPY.hiddenNotice, locale)}
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <ProseBody blocks={blocks} />
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              {contents.length > 1 && (
                <nav className="rounded-sm border border-line bg-paper p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                    {isEn ? "IN THIS GUIDE" : "ΣΕ ΑΥΤΟΝ ΤΟΝ ΟΔΗΓΟ"}
                  </span>
                  <ul className="mt-3 space-y-2">
                    {contents.map((heading, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-ink/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                        <span>{heading.text}</span>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <EnquiryForm locale={locale} subject={`Guide enquiry: ${title}`} />
              </div>

              <div className="rounded-sm border border-gold/40 bg-white p-6">
                <p className="font-editorial text-xl text-ink">
                  {isEn ? "Rather see a draft itinerary?" : "Θέλετε έτοιμο πρόγραμμα;"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {isEn
                    ? "CUBA AI turns your dates and interests into a day-by-day route in seconds."
                    : "Το CUBA AI μετατρέπει ημερομηνίες και ενδιαφέροντα σε πρόγραμμα μέρα με τη μέρα."}
                </p>
                <Link
                  href={localizedPath(locale, "/ai-planner/")}
                  className="btn-gold mt-4 !px-5 !py-2.5 !text-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
                </Link>
              </div>

              <a href={SITE.phoneHref} className="btn-luxury-outline w-full !px-4 !py-2.5 !text-sm">
                <Phone className="h-4 w-4" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {gallery.length > 0 && (
        <section className="border-t border-line bg-paper py-16">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="mb-8 flex items-center gap-2">
              <Camera className="h-5 w-5 text-gold-deep" />
              <h2 className="font-editorial text-2xl font-normal text-ink">
                {t(COPY.gallery, locale)}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {gallery.slice(0, 6).map((src, i) => (
                <div
                  key={src + i}
                  className="luxury-card relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-white shadow-xs"
                >
                  <Image
                    src={src}
                    alt={`${title} photo ${i + 2}`}
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

      <section className="border-t border-line py-14">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 px-6 lg:px-12">
          <div>
            <h2 className="font-editorial text-2xl font-normal text-ink">
              {isEn ? "Ready to start planning?" : "Έτοιμοι να ξεκινήσετε τον σχεδιασμό;"}
            </h2>
            <p className="mt-1 text-base text-muted">
              {isEn
                ? "Talk to a Cuba specialist about dates, routes and budget."
                : "Μιλήστε με σύμβουλο για ημερομηνίες, διαδρομές και προϋπολογισμό."}
            </p>
          </div>
          <Link href={localizedPath(locale, "/epikoinonia/")} className="btn-gold">
            <span>{t(COPY.enquire, locale)}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
