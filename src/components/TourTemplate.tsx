import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Compass,
  Globe2,
  Users2,
  CalendarDays,
  MapPin,
  CheckCircle2,
  XCircle,
  Luggage,
  AlertCircle,
  ArrowLeft,
  ArrowRightLeft,
  Phone,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Camera,
  Tag,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { buildTourSpec } from "@/lib/tour-spec";

export default function TourTemplate({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const title = titleOf(record, locale);
  const hero = record.images[0] || record.thumb;
  const spec = buildTourSpec(record, locale);

  const facts = [
    { icon: Clock, label: t(COPY.duration, locale), value: spec.duration },
    { icon: Compass, label: t(COPY.type, locale), value: spec.type },
    { icon: Globe2, label: t(COPY.language, locale), value: spec.languages },
    { icon: Users2, label: t(COPY.ages, locale), value: spec.ages },
    { icon: CalendarDays, label: t(COPY.availability, locale), value: spec.availability },
    { icon: MapPin, label: t(COPY.pickup, locale), value: spec.departurePlace },
    {
      icon: ArrowRightLeft,
      label: isEn ? "Departure / return" : "Αναχώρηση / Επιστροφή",
      value: [spec.departureTime, spec.returnTime].filter(Boolean).join(" – "),
    },
    { icon: Sparkles, label: isEn ? "Interests" : "Ενδιαφέροντα", value: spec.interests },
  ].filter((fact) => Boolean(fact.value));

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
              href={localizedPath(locale, "/ekdromes-stin-kouva/")}
              className="transition-colors hover:text-gold-deep"
            >
              {isEn ? "Tours" : "Εκδρομές"}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-medium text-ink">{title}</span>
          </div>

          <Link
            href={localizedPath(locale, "/ekdromes-stin-kouva/")}
            className="hidden items-center gap-1 font-semibold text-gold-deep hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>{isEn ? "Back to tours" : "Όλες οι Εκδρομές"}</span>
          </Link>
        </div>
      </div>

      <section className="relative min-h-[45vh] w-full bg-[#0b0b0b] text-white">
        {hero && (
          <Image src={hero} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[45vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="gold-badge">
                <Sparkles className="h-3 w-3 text-gold" />
                <span>{isEn ? "CUBA EXPERIENCE" : "ΕΜΠΕΙΡΙΑ ΣΤΗΝ ΚΟΥΒΑ"}</span>
              </span>
              {spec.duration && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
                  {spec.duration}
                </span>
              )}
              {spec.languages && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
                  {spec.languages}
                </span>
              )}
            </div>

            <h1 className="font-editorial text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {spec.priceHeadline && (
                <div className="inline-flex items-baseline gap-2 rounded-sm bg-gold px-4 py-2 text-ink shadow-md">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {t(COPY.price, locale)}:
                  </span>
                  <span className="text-xl font-bold">{spec.priceHeadline}</span>
                  {spec.priceDetail && spec.priceDetail !== spec.priceHeadline && (
                    <span className="ml-1 border-l border-ink/20 pl-2 text-xs">{spec.priceDetail}</span>
                  )}
                </div>
              )}
              {spec.departureTime && (
                <span className="text-sm text-white/80">
                  {t(COPY.departure, locale)}:{" "}
                  <strong className="text-white">{spec.departureTime}</strong>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {record.noindex && (
        <div className="border-b border-gold/40 bg-gold/10 px-6 py-3 text-center text-xs font-semibold text-gold-deep">
          {t(COPY.hiddenNotice, locale)}
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            {facts.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="rounded-sm border border-line bg-paper p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
                        <Icon className="h-4 w-4 text-gold-deep" />
                        <span>{fact.label}</span>
                      </div>
                      <p className="mt-1.5 font-semibold text-ink">{fact.value}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {(spec.intro.length > 0 || spec.expect) && (
              <section className="border-b border-line pb-10">
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {isEn ? "Tour experience overview" : "Περιγραφή & Εμπειρία"}
                </h2>
                <div className="mt-4 space-y-4">
                  {spec.intro.map((paragraph, idx) => (
                    <p key={idx} className="text-lg font-light leading-relaxed text-[#2a2a2a]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {spec.expect && (
                  <p className="mt-5 border-l-2 border-gold/60 pl-4 text-base leading-relaxed text-ink/85">
                    {spec.expect}
                  </p>
                )}
              </section>
            )}

            {spec.highlights.length > 0 && (
              <section className="border-b border-line pb-10">
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {t(COPY.highlights, locale)}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {spec.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-sm border border-line bg-paper p-5 transition-colors hover:border-gold/60"
                    >
                      {item.title && (
                        <h3 className="font-serif text-lg font-medium text-ink">{item.title}</h3>
                      )}
                      <p className={`text-sm leading-relaxed text-ink/85 ${item.title ? "mt-2" : ""}`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {spec.days.length > 0 && (
              <section className="border-b border-line pb-10">
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {isEn ? "Day by day" : "Πρόγραμμα ανά ημέρα"}
                </h2>
                <div className="mt-6 space-y-5">
                  {spec.days.map((day, idx) => (
                    <div key={idx} className="rounded-sm border border-line bg-paper p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
                          {idx + 1}
                        </span>
                        <h3 className="font-serif text-lg font-medium text-ink">{day.title}</h3>
                      </div>
                      <ul className="mt-3 space-y-2 pl-11">
                        {day.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-ink/85">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {spec.activities.length > 0 && (
              <section className="border-b border-line pb-10">
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {t(COPY.activities, locale)}
                </h2>
                <div className="mt-6 space-y-4">
                  {spec.activities.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 rounded-sm border border-line bg-paper p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                        {idx + 1}
                      </span>
                      <p className="pt-0.5 text-sm leading-relaxed text-ink">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {spec.priceTiers.length > 0 && (
              <section className="border-b border-line pb-10">
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {isEn ? "Price per person" : "Κόστος ανά άτομο"}
                </h2>
                <div className="mt-6 overflow-hidden rounded-sm border border-line">
                  {spec.priceTiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/60 bg-paper px-5 py-4 last:border-b-0"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-ink">
                        <Tag className="h-4 w-4 text-gold-deep" />
                        {tier.label}
                      </span>
                      <span className="text-sm font-bold text-ink">{tier.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(spec.included.length > 0 || spec.notIncluded.length > 0) && (
              <section className="grid gap-6 border-b border-line pb-10 sm:grid-cols-2">
                {spec.included.length > 0 && (
                  <div className="rounded-sm border border-emerald-900/10 bg-emerald-50/40 p-6">
                    <h2 className="font-serif text-lg font-medium text-ink">
                      {t(COPY.included, locale)}
                    </h2>
                    <ul className="mt-4 space-y-2.5">
                      {spec.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-ink">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {spec.notIncluded.length > 0 && (
                  <div className="rounded-sm border border-line bg-paper p-6">
                    <h2 className="font-serif text-lg font-medium text-ink">
                      {isEn ? "Not included" : "Δεν περιλαμβάνονται"}
                    </h2>
                    <ul className="mt-4 space-y-2.5">
                      {spec.notIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-ink/80">
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {(spec.bring.length > 0 || spec.extras.length > 0 || spec.notes.length > 0) && (
              <section className="grid gap-6 pb-6 sm:grid-cols-2">
                {spec.bring.length > 0 && (
                  <div className="rounded-sm border border-line bg-paper p-6">
                    <div className="flex items-center gap-2 font-serif text-lg font-medium text-ink">
                      <Luggage className="h-5 w-5 text-gold-deep" />
                      <span>{t(COPY.bring, locale)}</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {spec.bring.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-ink/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {spec.notes.length > 0 && (
                  <div className="rounded-sm border border-gold/40 bg-gold/5 p-6">
                    <div className="flex items-center gap-2 font-serif text-lg font-medium text-ink">
                      <AlertCircle className="h-5 w-5 text-gold-deep" />
                      <span>{isEn ? "Good to know" : "Σχόλια & Σημειώσεις"}</span>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {spec.notes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {spec.extras.length > 0 && (
                  <div className="rounded-sm border border-line bg-white p-6 sm:col-span-2">
                    <div className="flex items-center gap-2 font-serif text-lg font-medium text-ink">
                      <PlusCircle className="h-5 w-5 text-gold-deep" />
                      <span>{isEn ? "Optional add-ons" : "Προαιρετικές Επιλογές"}</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {spec.extras.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-ink/85">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {spec.outro.length > 0 && (
              <section className="rounded-sm border-l-2 border-gold bg-paper p-6">
                {spec.outro.map((paragraph, idx) => (
                  <p key={idx} className="text-base font-light italic leading-relaxed text-ink/85">
                    {paragraph}
                  </p>
                ))}
              </section>
            )}
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <div className="border-b border-line pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                    {isEn ? "TOUR INQUIRY" : "ΑΜΕΣΗ ΚΡΑΤΗΣΗ & ΠΛΗΡΟΦΟΡΙΕΣ"}
                  </span>
                  <p className="mt-1 font-editorial text-2xl font-normal text-ink">{title}</p>
                  {spec.priceHeadline && (
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-ink">{spec.priceHeadline}</span>
                      <span className="text-xs text-muted">
                        / {isEn ? "per person" : "ανά άτομο"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="py-4">
                  <EnquiryForm locale={locale} subject={`Tour Inquiry: ${title}`} />
                </div>

                <div className="border-t border-line pt-4 text-center">
                  <p className="text-xs text-muted">
                    {isEn
                      ? "Need instant assistance or custom group pricing?"
                      : "Χρειάζεστε άμεση βοήθεια ή ειδική ομαδική τιμή;"}
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

              <div className="space-y-2 rounded-sm border border-line bg-white p-5 text-xs text-muted">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{isEn ? "Licensed operator guarantee" : "Εγγύηση Επίσημου Πρακτορείου"}</span>
                </div>
                <p>
                  {isEn
                    ? `Official GNTO License ${SITE.mite}. Full liability and passenger insurance.`
                    : `Αριθμός ΜΗΤΕ ${SITE.mite}. Ασφάλεια επαγγελματικής αστικής ευθύνης.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {record.images.length > 1 && (
        <section className="border-t border-line bg-paper py-16">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-gold-deep" />
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {t(COPY.gallery, locale)}
                </h2>
              </div>
              <span className="text-xs font-semibold text-muted">
                {record.images.length} {isEn ? "Photos" : "Φωτογραφίες"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {record.images.map((src, i) => (
                <div
                  key={src + i}
                  className="luxury-card relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-white shadow-xs"
                >
                  <Image
                    src={src}
                    alt={`${title} photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
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
