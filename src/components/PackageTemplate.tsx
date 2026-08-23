import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Building,
  Calendar,
  Camera,
  CheckCircle2,
  Compass,
  Info,
  Moon,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { excerptOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { buildPackageSpec } from "@/lib/package-spec";

const FALLBACK_IMAGE = "https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg";

export default function PackageTemplate({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const title = titleOf(record, locale);
  const spec = buildPackageSpec(record, locale);
  const hero = record.images[0] || record.thumb || FALLBACK_IMAGE;
  const excerpt = excerptOf(record, locale);

  const categoryLabel = record.path.includes("gamilia-taxidia")
    ? isEn ? "Honeymoon package" : "Γαμήλιο ταξίδι"
    : record.path.includes("omadika-taxidia")
      ? isEn ? "Group departure" : "Ομαδικό ταξίδι"
      : record.path.includes("road-trips")
        ? "Cuba road trip"
        : record.path.includes("thematika-taxidia")
          ? isEn ? "Thematic departure" : "Θεματικό ταξίδι"
          : isEn ? "Private itinerary" : "Ατομικό ταξίδι";

  const categoryPath = `/${record.path.split("/").filter(Boolean).slice(0, 2).join("/")}/`;
  const hasItinerary = spec.days.length > 0;
  const singleDay = spec.days.length === 1;

  return (
    <article className="bg-white">
      <div className="border-b border-line bg-paper py-3 text-xs text-muted">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-2">
            <Link href={localizedPath(locale, "/")} className="transition-colors hover:text-gold-deep">
              {isEn ? "Home" : "Αρχική"}
            </Link>
            <span>/</span>
            <Link
              href={localizedPath(locale, "/paketa-diakopon-gia-kouva/")}
              className="transition-colors hover:text-gold-deep"
            >
              {isEn ? "Packages" : "Πακέτα Διακοπών"}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-medium text-ink">{title}</span>
          </div>

          <Link
            href={localizedPath(locale, categoryPath)}
            className="hidden items-center gap-1 font-semibold text-gold-deep hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>{categoryLabel}</span>
          </Link>
        </div>
      </div>

      <section className="relative min-h-[48vh] w-full bg-[#0b0b0b] text-white">
        <Image src={hero} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[48vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-4xl">
            <span className="gold-badge mb-4">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>{categoryLabel.toLocaleUpperCase(isEn ? "en-US" : "el-GR")}</span>
            </span>

            <h1 className="font-editorial text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>

            {spec.route ? <p className="mt-3 text-base text-white/90">{spec.route}</p> : null}
            {!spec.route && excerpt ? (
              <p className="mt-3 max-w-2xl text-base font-light leading-relaxed text-white/90">{excerpt}</p>
            ) : null}

            {spec.priceHeadline ? (
              <div className="mt-6 inline-flex items-baseline gap-2 rounded-sm bg-gold px-4 py-2 text-ink shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider">{t(COPY.price, locale)}:</span>
                <span className="text-xl font-bold">{spec.priceHeadline}</span>
                <span className="text-xs">{isEn ? "/ person" : "/ άτομο"}</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            {spec.glance.length > 0 && (
              <section>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {spec.glance.map((item, idx) => (
                    <div key={`${item.label}-${idx}`} className="rounded-sm border border-line bg-paper p-4">
                      <p className="text-xs uppercase tracking-wider text-muted">
                        {item.label || (isEn ? "Included" : "Παροχή")}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-ink">{item.value}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {spec.intro.length > 0 && (
              <section className="border-b border-line pb-10">
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {isEn ? "About this trip" : "Σχετικά με το ταξίδι"}
                </h2>
                <div className="mt-4 space-y-4 text-base font-light leading-relaxed text-ink/90">
                  {spec.intro.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {spec.highlights.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "What you should not miss" : "Τι δεν πρέπει να χάσετε"}
                  </h2>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {spec.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 rounded-sm border border-line bg-paper p-4 text-sm text-ink"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hasItinerary && (
              <section className="border-b border-line pb-10">
                <div className="mb-6 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Programme" : "Αναλυτικό Πρόγραμμα"}
                  </h2>
                </div>

                <div className="space-y-5">
                  {spec.days.map((day, idx) => (
                    <div key={idx} className="rounded-sm border border-line bg-paper p-5">
                      {!singleDay && (
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-deep">
                          {isEn ? `Day ${idx + 1}` : `Ημέρα ${idx + 1}`}
                        </p>
                      )}

                      <div className="space-y-3 text-sm leading-relaxed text-ink">
                        {day.steps.map((step, stepIdx) => (
                          <p key={stepIdx}>{step}</p>
                        ))}
                      </div>

                      {day.activities.length > 0 && (
                        <ul className="mt-4 space-y-2 border-t border-line/70 pt-4">
                          {day.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="flex items-start gap-2 text-sm text-ink/90">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {day.overnight && (
                        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-muted">
                          <Moon className="h-3.5 w-3.5 text-gold-deep" />
                          {day.overnight}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {spec.stays.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="mb-6 flex items-center gap-2">
                  <Building className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Where you stay" : "Διαμονή"}
                  </h2>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {spec.stays.map((stay, idx) => (
                    <li key={idx} className="rounded-sm border border-line bg-paper p-4 text-sm text-ink">
                      {stay}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {spec.included.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="mb-6 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "What is included" : "Τι Περιλαμβάνεται"}
                  </h2>
                </div>
                <div className="rounded-sm border border-emerald-900/10 bg-emerald-50/40 p-6">
                  <ul className="grid gap-3.5 sm:grid-cols-2">
                    {spec.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-ink">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{item.replace(/,$/, "")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {spec.priceTiers.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="mb-6 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Prices per person" : "Τιμές κατ' άτομο"}
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {spec.priceTiers.map((tier, idx) => (
                    <div key={idx} className="rounded-sm border border-line bg-paper p-5">
                      {tier.label ? (
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{tier.label}</p>
                      ) : null}
                      {tier.price ? (
                        <p className="mt-1.5 font-editorial text-2xl font-normal text-ink">{tier.price}</p>
                      ) : null}
                      {tier.notes.length > 0 && (
                        <ul className="mt-3 space-y-1 text-xs text-muted">
                          {tier.notes.map((note, noteIdx) => (
                            <li key={noteIdx}>{note}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-muted">
                  {isEn
                    ? "Prices are indicative and confirmed at booking, based on availability and current airfares."
                    : "Οι τιμές είναι ενδεικτικές και οριστικοποιούνται κατά την κράτηση, ανάλογα με τη διαθεσιμότητα και τους ναύλους."}
                </p>
              </section>
            )}

            {spec.flights.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="mb-6 flex items-center gap-2">
                  <Plane className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Indicative flights" : "Ενδεικτικές πτήσεις"}
                  </h2>
                </div>
                <ul className="space-y-2 rounded-sm border border-line bg-paper p-5 text-sm text-ink">
                  {spec.flights.map((flight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Plane className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                      <span>{flight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {spec.notes.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Good to know" : "Χρήσιμες σημειώσεις"}
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {spec.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <div className="border-b border-line pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                    {isEn ? "PACKAGE INQUIRY" : "ΚΡΑΤΗΣΗ & ΠΛΗΡΟΦΟΡΙΕΣ"}
                  </span>
                  <p className="mt-1 font-editorial text-2xl font-normal text-ink">{title}</p>
                  {spec.priceHeadline ? (
                    <p className="mt-1 text-sm font-semibold text-gold-deep">
                      {spec.priceHeadline} {isEn ? "/ person" : "/ άτομο"}
                    </p>
                  ) : null}
                </div>

                <div className="py-4">
                  <EnquiryForm locale={locale} subject={`Package Inquiry: ${title}`} />
                </div>

                <div className="border-t border-line pt-4 text-center">
                  <p className="text-xs text-muted">
                    {isEn
                      ? "Prefer to speak directly with our Cuba specialist?"
                      : "Θέλετε να μιλήσετε απευθείας με σύμβουλο;"}
                  </p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-2 inline-flex items-center gap-2 font-semibold text-ink hover:text-gold-deep"
                  >
                    <Phone className="h-4 w-4 text-gold-deep" />
                    <span>{SITE.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="rounded-sm border border-line bg-[#0b0b0b] p-5 text-white">
                <div className="flex items-center gap-2 text-sm font-semibold text-gold">
                  <Sparkles className="h-4 w-4" />
                  <span>CUBA AI</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  {isEn
                    ? "Want a different mix of nights, hotels or excursions? Draft your own version in 30 seconds."
                    : "Θέλετε άλλο συνδυασμό διανυκτερεύσεων, ξενοδοχείων ή εκδρομών; Φτιάξτε τη δική σας εκδοχή σε 30 δευτερόλεπτα."}
                </p>
                <Link
                  href={localizedPath(locale, "/ai-planner/")}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-white"
                >
                  <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
                </Link>
              </div>

              <div className="space-y-2 rounded-sm border border-line bg-white p-5 text-xs text-muted">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{isEn ? "Licensed tour operator (GNTO)" : "Επίσημη Άδεια ΕΟΤ"}</span>
                </div>
                <p>
                  {isEn
                    ? `GNTO licence ${SITE.mite}. Full financial protection and local support across Cuba.`
                    : `Αρ. ΜΗΤΕ ${SITE.mite}. Πλήρης ταξιδιωτική ασφάλεια και τοπική υποστήριξη.`}
                </p>
                <p className="flex items-center gap-1.5 pt-1">
                  <Calendar className="h-3.5 w-3.5 text-gold-deep" />
                  <span>{isEn ? "Answer within 24 hours" : "Απάντηση εντός 24 ωρών"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {record.images.length > 1 && (
        <section className="border-t border-line bg-paper py-16">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="mb-8 flex items-center gap-2">
              <Camera className="h-5 w-5 text-gold-deep" />
              <h2 className="font-editorial text-2xl font-normal text-ink">{t(COPY.gallery, locale)}</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {record.images.map((src, i) => (
                <div
                  key={src + i}
                  className="luxury-card relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-white shadow-xs"
                >
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
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
