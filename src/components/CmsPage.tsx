import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, ScrollText, Sparkles } from "lucide-react";
import { COPY, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import ProseBody from "@/components/ProseBody";
import { heroOf, imagesOf, rawBodyOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { toProseBlocks } from "@/lib/prose";

const LEGAL_PATHS = ["/cookies/", "/oroi-symmetochis/", "/terms-conditions/"];

const FORM_PATHS = [
  "/taxidi-stin-kouva/",
  "/paketa-diakopon-gia-kouva/atomika-taxidia/",
  "/paketa-diakopon-gia-kouva/gamilia-taxidia/",
  "/paketa-diakopon-gia-kouva/thematika-taxidia/",
];

export default function CmsPage({
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
  const gallery = imagesOf(record).slice(1, 7);
  const isLegal = LEGAL_PATHS.includes(record.path);
  const showForm = !isLegal && FORM_PATHS.includes(record.path);

  return (
    <article className="bg-white">
      <div className="border-b border-line bg-paper py-3 text-sm text-muted">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <div className="flex min-w-0 items-center gap-2">
            <Link href={localizedPath(locale, "/")} className="transition-colors hover:text-gold-deep">
              {isEn ? "Home" : "Αρχική"}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-medium text-ink">{title}</span>
          </div>

          <Link
            href={localizedPath(locale, "/")}
            className="hidden items-center gap-1 font-semibold text-gold-deep hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isEn ? "Back to home" : "Επιστροφή στην Αρχική"}</span>
          </Link>
        </div>
      </div>

      {hero && !isLegal ? (
        <div className="relative min-h-[38vh] w-full bg-[#0b0b0b] text-white">
          <Image src={hero} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />
          <div className="relative mx-auto flex min-h-[38vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
            <div className="max-w-3xl">
              <span className="gold-badge mb-3">
                <Sparkles className="h-3 w-3 text-gold" />
                <span>GO CUBA</span>
              </span>
              <h1 className="font-editorial text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl">
                {title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <header className="border-b border-line bg-paper">
          <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-12">
            <span className="gold-badge mb-3">
              {isLegal ? (
                <ScrollText className="h-3 w-3 text-gold" />
              ) : (
                <Sparkles className="h-3 w-3 text-gold" />
              )}
              <span>{isLegal ? (isEn ? "LEGAL" : "ΝΟΜΙΚΑ") : "GO CUBA"}</span>
            </span>
            <h1 className="font-editorial text-3xl font-normal leading-tight text-ink sm:text-4xl md:text-5xl">
              {title}
            </h1>
          </div>
        </header>
      )}

      {record.noindex && (
        <div className="border-b border-gold/40 bg-gold/10 px-6 py-3 text-center text-sm font-semibold text-gold-deep">
          {t(COPY.hiddenNotice, locale)}
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className={`grid gap-12 ${showForm ? "lg:grid-cols-[1.6fr_1fr]" : "max-w-3xl"}`}>
          <div className={isLegal ? "legal-prose space-y-5" : ""}>
            {isLegal ? (
              blocks.map((block, idx) =>
                block.type === "heading" ? (
                  <h2 key={idx} className="pt-4 font-serif text-xl font-medium text-ink">
                    {block.text}
                  </h2>
                ) : block.type === "list" ? (
                  <ul key={idx} className="space-y-2 pl-5">
                    {block.items.map((item, i) => (
                      <li key={i} className="list-disc text-base leading-relaxed text-ink/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={idx} className="text-base leading-relaxed text-ink/85">
                    {block.text}
                  </p>
                ),
              )
            ) : (
              <ProseBody blocks={blocks} />
            )}
          </div>

          {showForm && (
            <div>
              <div className="sticky top-24 rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <EnquiryForm locale={locale} subject={`Inquiry: ${title}`} />
              </div>
            </div>
          )}
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
              {gallery.map((src, i) => (
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
    </article>
  );
}
