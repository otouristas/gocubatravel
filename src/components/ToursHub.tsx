import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bus, Compass, Landmark, Sparkles, Users } from "lucide-react";
import ToursGrid, { type TourCard, type TourFilter } from "@/components/ToursGrid";
import type { Locale } from "@/content/types";
import { titleOf, visibleTours } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { buildTourSpec } from "@/lib/tour-spec";

const HERO =
  "https://www.skydream.gr/wp-content/uploads/Havana-city-panoramic-view-skydream-travel-1024x576.jpg";

const SERVICES = [
  {
    icon: Landmark,
    el: {
      title: "Ξεναγήσεις στην Αβάνα",
      body: "Περπατήστε στην Habana Vieja, τις τέσσερις ιστορικές πλατείες και τις αυθεντικές γειτονιές με τοπικό ξεναγό.",
    },
    en: {
      title: "Havana walking tours",
      body: "Explore Habana Vieja, the four historic squares and the authentic neighbourhoods with a local guide.",
    },
  },
  {
    icon: Compass,
    el: {
      title: "Ημερήσιες εκδρομές",
      body: "Βινιάλες, Playas del Este, seafari με καταμαράν και γαστρονομικές εμπειρίες με επιστροφή αυθημερόν.",
    },
    en: {
      title: "Day excursions",
      body: "Viñales, Playas del Este, catamaran seafari and food experiences, back at your hotel the same day.",
    },
  },
  {
    icon: Users,
    el: {
      title: "Ιδιωτικά ή συλλογικά",
      body: "Επιλέξτε ιδιωτική εκδρομή με προσωπικό ξεναγό ή συλλογική αναχώρηση με σταθερές τιμές κατ' άτομο.",
    },
    en: {
      title: "Private or group",
      body: "Pick a private excursion with your own guide, or a group departure with fixed per-person pricing.",
    },
  },
  {
    icon: Bus,
    el: {
      title: "Πολυήμερες αποδράσεις",
      body: "Τρινιδάδ, Σιενφουέγος και Topes de Collantes με διανυκτερεύσεις, μεταφορές και διαμονή.",
    },
    en: {
      title: "Multi-day escapes",
      body: "Trinidad, Cienfuegos and Topes de Collantes with overnights, transfers and accommodation included.",
    },
  },
];

const GREEK_RE = /(έλληνα|ελληνικά|ελληνόφων|greek)/i;
const GROUP_RE = /(συλλογικ|group|ομαδικ)/i;
const MULTIDAY_RE = /(ημέρ[εα]ς?\s*\/|νύχτ|διανυκτ|\d\s*(ημέρες|days)|nights?)/i;

export default function ToursHub({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  const cards: TourCard[] = visibleTours()
    .filter((tour) => tour.status === "publish")
    // Trinidad-style records that live under the packages tree belong to PackagesHub.
    .filter((tour) => !tour.path.startsWith("/paketa-diakopon-gia-kouva/"))
    .map((tour) => {
      const spec = buildTourSpec(tour, locale);
      const title = titleOf(tour, locale);
      const filters: TourFilter[] = [];
      const haystack = `${title} ${spec.languages ?? ""} ${spec.type ?? ""} ${spec.duration ?? ""}`;

      if (GREEK_RE.test(haystack)) filters.push("greek");
      if (GROUP_RE.test(haystack)) filters.push("group");
      if (MULTIDAY_RE.test(`${spec.duration ?? ""} ${title}`)) filters.push("multiday");

      return {
        href: localizedPath(locale, tour.path),
        title,
        image: tour.images[0] || tour.thumb || HERO,
        duration: spec.duration,
        type: spec.type,
        languages: spec.languages,
        price: spec.priceHeadline,
        departurePlace: spec.departurePlace,
        filters,
      };
    });

  return (
    <div className="bg-white">
      <section className="relative min-h-[46vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src={HERO}
          alt={isEn ? "Tours in Cuba" : "Εκδρομές στην Κούβα"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[46vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>{isEn ? "GUIDED TOURS & EXCURSIONS" : "ΞΕΝΑΓΗΣΕΙΣ ΚΑΙ ΕΚΔΡΟΜΕΣ"}</span>
            </span>
            <h1 className="font-editorial text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              {isEn ? "Tours in Cuba" : "Εκδρομές στην Κούβα"}
            </h1>
            <p className="mt-3 text-base font-light leading-relaxed text-white/90 sm:text-lg">
              {isEn
                ? "Walking tours in Havana, day trips to Viñales and the coast, and multi-day escapes to Trinidad — private or in a small group, with English or Greek-speaking guides."
                : "Ξεναγήσεις στην Αβάνα, ημερήσιες εκδρομές σε Βινιάλες και ακτές, πολυήμερες αποδράσεις στο Τρινιδάδ — ιδιωτικά ή σε μικρό γκρουπ, με αγγλόφωνο ή ελληνόφωνο ξεναγό."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={localizedPath(locale, "/epikoinonia/")} className="btn-gold">
                <span>{isEn ? "Ask for availability" : "Ρωτηστε για διαθεσιμοτητα"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localizedPath(locale, "/ai-planner/")} className="btn-outline-white">
                <Sparkles className="h-4 w-4" />
                <span>CUBA AI</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-12">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const copy = isEn ? service.en : service.el;
              return (
                <div
                  key={copy.title}
                  className="rounded-sm border border-line bg-white p-6 transition-colors hover:border-gold"
                >
                  <Icon className="h-6 w-6 text-gold-deep" />
                  <h3 className="mt-3 text-base font-semibold text-ink">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{copy.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
            {isEn ? "FROM HAVANA AND BEYOND" : "ΑΠΟ ΤΗΝ ΑΒΑΝΑ ΚΑΙ ΠΕΡΑΙΤΕΡΩ"}
          </span>
          <h2 className="mt-1 font-editorial text-3xl font-normal text-ink">
            {isEn ? "Choose your excursion" : "Επιλέξτε την εκδρομή σας"}
          </h2>
        </div>

        <ToursGrid cards={cards} locale={locale} />
      </section>

      <section className="bg-[#0b0b0b] py-14 text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-12">
          <div className="max-w-2xl">
            <span className="gold-badge mb-3">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>CUBA AI</span>
            </span>
            <h2 className="font-editorial text-3xl font-normal">
              {isEn
                ? "Not sure which excursions fit your days?"
                : "Δεν είστε σίγουροι ποιες εκδρομές χωράνε στις μέρες σας;"}
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/80">
              {isEn
                ? "CUBA AI builds a day-by-day route with stays, transfers and excursions in 30 seconds. A specialist then confirms availability."
                : "Το CUBA AI φτιάχνει πρόγραμμα μέρα με τη μέρα, με διαμονή, μεταφορές και εκδρομές, σε 30 δευτερόλεπτα. Ένας σύμβουλος επιβεβαιώνει τη διαθεσιμότητα."}
            </p>
          </div>
          <Link href={localizedPath(locale, "/ai-planner/")} className="btn-gold shrink-0">
            <Sparkles className="h-4 w-4" />
            <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
