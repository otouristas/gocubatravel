import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Car, MapPin, Sparkles, Users } from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import { records } from "@/content/records";
import EnquiryForm from "@/components/EnquiryForm";
import { excerptOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { buildPackageSpec, packageSummary } from "@/lib/package-spec";

const FALLBACK_IMAGE = "https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg";

/** Only trust a duration when the route line spells it out ("9 ημέρες / 7 διανυκτερεύσεις"). */
function durationLabel(route: string | undefined, isEn: boolean): string {
  const match = route?.match(/(\d+)\s*(ημέρες|days)/i);
  if (match) return `${match[1]} ${isEn ? "days" : "ημέρες"}`;
  const nights = route?.match(/(\d+)\s*διανυκτ/i);
  if (nights) return `${nights[1]} ${isEn ? "nights" : "διανυκτερεύσεις"}`;
  return isEn ? "Full programme" : "Πλήρες πρόγραμμα";
}

const CATEGORY_COPY: Record<
  string,
  { el: { kicker: string; lead: string }; en: { kicker: string; lead: string } }
> = {
  "/paketa-diakopon-gia-kouva/atomika-taxidia/": {
    el: {
      kicker: "ΑΤΟΜΙΚΑ ΤΑΞΙΔΙΑ",
      lead: "Ταξίδια σχεδιασμένα στα μέτρα σας, με ιδιωτικές μεταφορές, επιλεγμένη διαμονή και εκδρομές που επιλέγετε εσείς. Αναχωρήσεις καθημερινά, χωρίς γκρουπ.",
    },
    en: {
      kicker: "PRIVATE JOURNEYS",
      lead: "Trips built around you, with private transfers, handpicked stays and the excursions you choose. Daily departures, no group.",
    },
  },
  "/paketa-diakopon-gia-kouva/omadika-taxidia/": {
    el: {
      kicker: "ΟΜΑΔΙΚΑ ΤΑΞΙΔΙΑ",
      lead: "Οργανωμένα προγράμματα με σταθερές αναχωρήσεις, Έλληνα συνοδό και προκαθορισμένο πρόγραμμα ξεναγήσεων σε όλη την Κούβα.",
    },
    en: {
      kicker: "GROUP DEPARTURES",
      lead: "Scheduled programmes with fixed departures, a Greek-speaking tour leader and a set itinerary across Cuba.",
    },
  },
  "/paketa-diakopon-gia-kouva/gamilia-taxidia/": {
    el: {
      kicker: "ΓΑΜΗΛΙΑ ΤΑΞΙΔΙΑ",
      lead: "Συνδυασμός Αβάνας και Καραϊβικής: πολυτελή θέρετρα, ιδιωτικές μεταφορές και ρομαντικές εμπειρίες για τον μήνα του μέλιτος.",
    },
    en: {
      kicker: "HONEYMOONS",
      lead: "Havana plus the Caribbean: luxury resorts, private transfers and romantic experiences for your honeymoon.",
    },
  },
  "/paketa-diakopon-gia-kouva/thematika-taxidia/": {
    el: {
      kicker: "ΘΕΜΑΤΙΚΑ ΤΑΞΙΔΙΑ",
      lead: "Ταξίδια με θέμα και μικρή ομάδα έως 15 άτομα, σε συγκεκριμένες περιόδους του χρόνου, με Έλληνα ξεναγό.",
    },
    en: {
      kicker: "THEMATIC TRIPS",
      lead: "Themed departures in small groups of up to 15 travellers, on set dates, with a Greek-speaking guide.",
    },
  },
  "/paketa-diakopon-gia-kouva/road-trips/": {
    el: {
      kicker: "CUBA ROAD TRIPS",
      lead: "Διαδρομές στο νησί με δικό σας ρυθμό: διαμονή σε casas particulares, στάσεις σε πόλεις και παραλίες, μεταφορές κατ' επιλογή.",
    },
    en: {
      kicker: "CUBA ROAD TRIPS",
      lead: "Island routes at your own pace: casas particulares, stops in cities and beaches, transfers as you prefer.",
    },
  },
};

export default function PackageCategoryPage({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const title = titleOf(record, locale);
  const copy = CATEGORY_COPY[record.path]?.[isEn ? "en" : "el"];
  const lead = copy?.lead || excerptOf(record, locale);

  const isPackage = (item: ContentRecord) =>
    !item.aliasOf && !item.noindex && item.status === "publish" && item.path.split("/").filter(Boolean).length > 2;

  const children = records.filter((item) => item.path.startsWith(record.path) && item.path !== record.path && isPackage(item));

  // Two archives (road trips, thematic) have no scraped child pages; show the wider catalogue instead of an empty grid.
  const fallback = children.length === 0;
  const items = fallback
    ? records.filter((item) => item.path.startsWith("/paketa-diakopon-gia-kouva/") && isPackage(item)).slice(0, 6)
    : children;

  const hero = record.images[0] || record.thumb || items.find((c) => c.images[0])?.images[0] || FALLBACK_IMAGE;

  return (
    <div className="bg-white">
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
            href={localizedPath(locale, "/paketa-diakopon-gia-kouva/")}
            className="hidden items-center gap-1 font-semibold text-gold-deep hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>{isEn ? "All packages" : "Όλα τα Πακέτα"}</span>
          </Link>
        </div>
      </div>

      <section className="relative min-h-[42vh] w-full bg-[#0b0b0b] text-white">
        <Image src={hero} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[42vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>{copy?.kicker || title.toLocaleUpperCase(isEn ? "en-US" : "el-GR")}</span>
            </span>
            <h1 className="font-editorial text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
            {lead ? (
              <p className="mt-3 max-w-2xl text-base font-light leading-relaxed text-white/90 sm:text-lg">{lead}</p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-editorial text-3xl font-normal text-ink">
              {fallback
                ? isEn
                  ? "Programmes we can adapt for this style"
                  : "Προγράμματα που προσαρμόζονται σε αυτό το στυλ"
                : isEn
                  ? "Available programmes"
                  : "Διαθέσιμα προγράμματα"}
            </h2>
            {fallback ? (
              <p className="mt-2 max-w-2xl text-sm text-muted">
                {isEn
                  ? "These routes are planned on request with your own dates, hotels and driving distances."
                  : "Οι διαδρομές σχεδιάζονται κατόπιν αιτήματος, με δικές σας ημερομηνίες, ξενοδοχεία και αποστάσεις."}
              </p>
            ) : null}
          </div>
          <span className="text-xs text-muted">
            {items.length} {isEn ? "itineraries" : "προγράμματα"}
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((child) => {
            const spec = buildPackageSpec(child, locale);
            const summary = packageSummary(spec) || excerptOf(child, locale);
            const departures = spec.glance.find((item) => /αναχωρήσ|departure/i.test(item.label));
            const transfers = spec.glance.find((item) => /μεταφορ|transfer/i.test(item.label));
            const stay = spec.glance.find((item) => /διαμονή|stay/i.test(item.label));
            const href = localizedPath(locale, child.path);

            return (
              <article
                key={child.path}
                className="luxury-card group flex flex-col overflow-hidden rounded-sm border border-line bg-paper"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                  <Image
                    src={child.images[0] || child.thumb || FALLBACK_IMAGE}
                    alt={titleOf(child, locale)}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {spec.priceHeadline ? (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
                      {spec.priceHeadline}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-editorial text-2xl font-normal leading-snug text-ink group-hover:text-gold-deep">
                      <Link href={href}>{titleOf(child, locale)}</Link>
                    </h3>
                    {summary ? (
                      <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted">{summary}</p>
                    ) : null}

                    <ul className="mt-4 space-y-1.5 text-xs text-muted">
                      {departures ? (
                        <li className="flex items-start gap-2">
                          <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                          <span className="line-clamp-1">{departures.value}</span>
                        </li>
                      ) : null}
                      {transfers ? (
                        <li className="flex items-start gap-2">
                          <Car className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                          <span className="line-clamp-1">{transfers.value}</span>
                        </li>
                      ) : null}
                      {stay ? (
                        <li className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                          <span className="line-clamp-1">{stay.value}</span>
                        </li>
                      ) : null}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                      <Users className="h-3.5 w-3.5 text-gold-deep" />
                      <span>{durationLabel(spec.route, isEn)}</span>
                    </span>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                    >
                      <span>{isEn ? "Itinerary & prices" : "Πρόγραμμα & Τιμές"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <section className="border-t border-line bg-paper py-14">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:px-12">
          <div>
            <h2 className="font-editorial text-3xl font-normal text-ink">
              {isEn ? "Want this programme adjusted?" : "Θέλετε το πρόγραμμα προσαρμοσμένο;"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {isEn
                ? "Every itinerary can change length, hotels and excursions. Tell us your dates and we send a tailored quote within 24 hours."
                : "Κάθε πρόγραμμα προσαρμόζεται σε διάρκεια, ξενοδοχεία και εκδρομές. Στείλτε μας τις ημερομηνίες σας και λαμβάνετε προσφορά εντός 24 ωρών."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={localizedPath(locale, "/ai-planner/")} className="btn-gold">
                <Sparkles className="h-4 w-4" />
                <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
              </Link>
              <a href={SITE.phoneHref} className="btn-outline">
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="rounded-sm border border-line bg-white p-6 shadow-xs">
            <h3 className="font-editorial text-2xl font-normal text-ink">{t(COPY.enquire, locale)}</h3>
            <div className="mt-4">
              <EnquiryForm locale={locale} subject={`${title} — ${isEn ? "packages" : "πακέτα"}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
