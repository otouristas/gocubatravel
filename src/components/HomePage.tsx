import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  Building,
  Heart,
  Car,
  FileCheck2,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { Locale } from "@/content/types";
import { localizedPath } from "@/lib/i18n";
import { titleOf, visibleHotels, visibleTours } from "@/lib/content";

const HERO_IMG =
  "https://www.skydream.gr/wp-content/uploads/skydream-travel-cuba-tours-cuban-man-with-cigar-cropped-2880x72ppi.jpg";
const ESSENTIALS_IMG =
  "https://www.skydream.gr/wp-content/uploads/Cuba-Travel-Essentials-Skydream-Travel-scaled.jpg";
const MAP_IMG =
  "https://www.skydream.gr/wp-content/uploads/map-cuba-tours-departure-points-skydream-travel-png24.png";

const TRIP_COLLECTIONS = [
  {
    href: "/paketa-diakopon-gia-kouva/atomika-taxidia/",
    img: "https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg",
    icon: Compass,
    el: {
      tag: "Εξατομικευμενα Προγραμματα",
      title: "Ατομικά Ταξίδια",
      body: "Ταξιδεύετε με την οικογένεια ή την παρέα σας; Σχεδιάζουμε tailor-made διαδρομές με ιδιωτικό αυτοκίνητο, τοπικό ξεναγό και επιλεγμένη διαμονή.",
      cta: "Ανακαλυψτε τα Ατομικα",
    },
    en: {
      tag: "Bespoke Itineraries",
      title: "Private Journeys",
      body: "Travelling with family or friends? We design custom private itineraries with chauffeur transfers, local guides, and handpicked boutique stays.",
      cta: "Explore Private Trips",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/gamilia-taxidia/",
    img: "https://www.skydream.gr/wp-content/uploads/Honeymoon-in-cuba-skydream.jpg",
    icon: Heart,
    el: {
      tag: "Ρομαντικες Αποδρασεις",
      title: "Γαμήλια Ταξίδια",
      body: "Ζήστε έναν αξέχαστο μήνα του μέλιτος: colonial σουίτες στην παλιά Αβάνα, ρομαντικά δείπνα με θέα το Malecón και εξωτικά all-inclusive resorts στα Cayos.",
      cta: "Δειτε τα Γαμηλια",
    },
    en: {
      tag: "Romantic Escapes",
      title: "Luxury Honeymoons",
      body: "An unforgettable honeymoon in Cuba: colonial suites in Old Havana, romantic dinners overlooking the Malecón, and all-inclusive beachfront resorts in the Cayos.",
      cta: "View Honeymoon Packages",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/thematika-taxidia/",
    img: "https://www.skydream.gr/wp-content/uploads/cuba-group-tour-skydream-travel.jpg",
    icon: Sparkles,
    el: {
      tag: "Μουσικη, Πουρα & Φωτογραφια",
      title: "Θεματικά Ταξίδια",
      body: "Ειδικά σχεδιασμένες αποστολές για λάτρεις της Salsa, της αρχιτεκτονικής, των ιστορικών πούρων Habanos και της αυθεντικής κουβανέζικης κουλτούρας.",
      cta: "Δειτε τα Θεματικα",
    },
    en: {
      tag: "Music, Cigars & Culture",
      title: "Thematic Expeditions",
      body: "Specially curated journeys for lovers of Salsa dancing, colonial architecture, world-famous Habanos cigars, and authentic Cuban street photography.",
      cta: "View Thematic Trips",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/road-trips/",
    img: "https://www.skydream.gr/wp-content/uploads/despoina-sotiria-cuba-road-trip-skydream-testimonial.jpg",
    icon: Car,
    el: {
      tag: "Αυθεντικη Εξερευνηση",
      title: "Cuba Road Trips",
      body: "Διασχίστε την Κούβα από την Αβάνα μέχρι το Τρινιδάδ και το Σαντιάγο. Ελευθερία μετακίνησης, παραδοσιακά casas particulares και μαγευτικά τοπία.",
      cta: "Δειτε τα Road Trips",
    },
    en: {
      tag: "Authentic Exploration",
      title: "Cuba Road Trips",
      body: "Cross Cuba from Havana to Trinidad and Santiago. Ultimate freedom, self-drive routes, authentic casas particulares, and breathtaking scenery.",
      cta: "View Road Trips",
    },
  },
];

const TRUST_PILLARS = [
  {
    icon: Award,
    el: { title: "17+ Χρόνια Εξειδίκευση", desc: "Πάνω από 420 αποστολές στην Κούβα με απαράμιλλη τοπική γνώση." },
    en: { title: "17+ Years Specialty", desc: "Over 420 missions to Cuba with unparalleled local on-ground knowledge." },
  },
  {
    icon: ShieldCheck,
    el: { title: "Επίσημη Άδεια ΕΟΤ", desc: `Αριθμός ΜΗΤΕ ${SITE.mite} & πιστοποίηση Travel Institute.` },
    en: { title: "Licensed Operator", desc: `Official GNTO License ${SITE.mite} & Travel Institute accreditation.` },
  },
  {
    icon: Users,
    el: { title: "Έλληνες & Τοπικοί Ξεναγοί", desc: "Συνοδοί και ιδιωτικοί ξεναγοί με βαθιά γνώση της κουβανικής ιστορίας." },
    en: { title: "Greek & Local Guides", desc: "Professional guides and concierges with deep knowledge of Cuban culture." },
  },
  {
    icon: Building,
    el: { title: "Επιλεγμένα 5* Resorts & Casas", desc: "Αυστηρά ελεγμένα ξενοδοχεία Melia, Iberostar και πολυτελή ιδιωτικά αρχοντικά." },
    en: { title: "Handpicked 5* Hotels & Casas", desc: "Personally vetted Melia & Iberostar resorts and luxury colonial mansions." },
  },
];

const TESTIMONIALS = [
  {
    name: "Ηρώ & Σταμάτης",
    tag: { el: "Γαμήλιο Ταξίδι", en: "Honeymoon" },
    img: "https://www.skydream.gr/wp-content/uploads/Skydream-Trip-Iro-and-Stamatis-Drinks.jpg",
    el: "Ευχαριστούμε όλη την ομάδα, θα σκεφτόμαστε για χρόνια την Κούβα, ευχόμενοι να ξανα-απολαύσουμε ένα mango mojito στο πιο όμορφο και αντιθετικό νησί της Καραϊβικής!",
    en: "Thank you to the whole team — we will think of Cuba for years, hoping to enjoy another mango mojito on the most beautiful and vibrant island in the Caribbean.",
  },
  {
    name: "Μαριάννα & Απόστολος",
    tag: { el: "Γαμήλιο Ταξίδι", en: "Honeymoon" },
    img: "https://www.skydream.gr/wp-content/uploads/marianna-tolis-cuba-honeymoon-testimonial.jpg",
    el: "Θα θέλαμε να ευχαριστήσουμε το γραφείο που έκανε το γαμήλιο ταξίδι μας να μοιάζει με έναν πραγματικό μήνα του «μέλι…τος»! Όλα ήταν οργανωμένα στην εντέλεια.",
    en: "We would like to thank the team that made our honeymoon feel like a true dream month! Everything was organized to absolute perfection.",
  },
  {
    name: "Γιάννης & Ξένια",
    tag: { el: "Γαμήλιο Ταξίδι", en: "Honeymoon" },
    img: "https://www.skydream.gr/wp-content/uploads/giannis-xenia-cuba-honeymoon-testimonial-skydream.jpg",
    el: "Εξαιρετικά αξιοθέατα, πανέμορφη φύση, φανταστικοί άνθρωποι. Ένα πραγματικό ταξίδι ζωής, απολαύσαμε την κάθε μας στιγμή!",
    en: "Remarkable sights, breathtaking nature, wonderful people. A true trip of a lifetime — we enjoyed every single moment!",
  },
  {
    name: "Δέσποινα & Σωτηρία",
    tag: { el: "Road Trip", en: "Road Trip" },
    img: "https://www.skydream.gr/wp-content/uploads/despoina-sotiria-cuba-road-trip-skydream-testimonial.jpg",
    el: "H Κούβα είναι ένα μέρος στο οποίο τίποτα δεν είναι δεδομένο. Ευχαριστούμε πολύ για την αυθεντική ταξιδιωτική μας εμπειρία και το πρόγραμμα 22 ημερών που καταρτίσατε!",
    en: "Cuba is a place where nothing is taken for granted. Thank you so much for the authentic travel experience and the seamless 22-day itinerary you planned for us!",
  },
  {
    name: "Καλλιόπη & Ανδρέας",
    tag: { el: "Road Trip", en: "Road Trip" },
    img: "https://www.skydream.gr/wp-content/uploads/kalliopi-andreas-cuba-road-trip-skydream-testimonial.jpg",
    el: "Και η πιο απαιτητική ξεναγός εντυπωσιάστηκε από τον ανέμελο τρόπο ζωής των Κουβανών και την άψογη ροή του ταξιδιού μας!",
    en: "Even the most demanding guide was amazed by the Cuban joy of life and the flawless execution of our custom road trip!",
  },
  {
    name: "Δημήτρης & Ελισάβετ",
    tag: { el: "Road Trip", en: "Road Trip" },
    img: "https://www.skydream.gr/wp-content/uploads/Skydream_Cuba_Testimonials_Dimitris.jpeg",
    el: "Το ταξίδι στην Κούβα δεν είναι απλά ένα ταξίδι στο χρόνο, αλλά πολλές διαδοχικές ξεχωριστές εμπειρίες και μια χώρα όπου ό,τι δώσεις θα πάρεις!",
    en: "A journey to Cuba is not just a trip back in time, but a continuous series of rich, unique experiences with genuine warmth.",
  },
];

export default function HomePage({ locale }: { locale: Locale }) {
  const tours = visibleTours().slice(0, 6);
  const featuredHotels = visibleHotels().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* 1. Cinematic Luxury Hero Section */}
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src={HERO_IMG}
          alt="Cuba VIP Travel"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Luxury Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-[#0b0b0b]/80" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-[1400px] flex-col justify-center px-6 py-20 lg:px-12">
          <div className="max-w-3xl">
            <div className="gold-badge mb-6 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>
                {locale === "el"
                  ? "ΕΞΕΙΔΙΚΕΥΜΕΝΟΣ ΣΧΕΔΙΑΣΜΟΣ ΤΑΞΙΔΙΩΝ ΣΤΗΝ ΚΟΥΒΑ"
                  : "THE DEFINITIVE CUBA BESPOKE TRAVEL EXPERIENCE"}
              </span>
            </div>

            <h1 className="font-editorial text-4xl font-normal leading-[1.12] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {locale === "el" ? (
                <>
                  Όλα όσα χρειάζεσαι για ένα{" "}
                  <span className="italic text-gold-light">μοναδικό ταξίδι</span> στην Κούβα
                </>
              ) : (
                <>
                  Everything you need for an{" "}
                  <span className="italic text-gold-light">extraordinary journey</span> to Cuba
                </>
              )}
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/90 sm:text-xl">
              {locale === "el"
                ? "Ιδανικές προτάσεις διαμονής σε 5* Resorts & Casas Particulares, ιδιωτικές μεταφορές, αποκλειστικές εκδρομές και έκδοση eVisa με απόλυτη ασφάλεια."
                : "Handpicked 5* luxury stays, authentic colonial casas particulares, private chauffeur transfers, guided expeditions, and official Cuba eVisa services."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={localizedPath(locale, "/paketa-diakopon-gia-kouva/")} className="btn-gold">
                <span>{locale === "el" ? "Δειτε τα Πακετα Διακοπων" : "Explore Holiday Packages"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localizedPath(locale, "/ai-planner/")} className="btn-outline-white">
                <Sparkles className="h-4 w-4" />
                <span>
                  {locale === "el" ? "Σχεδιασμος Custom Ταξιδιου με CUBA AI" : "Build a custom trip with CUBA AI"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authority & Trust Pillars Bar */}
      <section className="border-y border-line bg-paper py-8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((item, idx) => {
              const Icon = item.icon;
              const copy = locale === "en" ? item.en : item.el;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 border-l-2 border-gold/40 pl-4 transition-colors hover:border-gold"
                >
                  <div className="rounded-sm bg-white p-2 shadow-xs ring-1 ring-black/5">
                    <Icon className="h-5 w-5 text-gold-deep" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{copy.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{copy.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2b. CUBA AI */}
      <section className="bg-[#0b0b0b] py-16 text-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 lg:grid-cols-[1.3fr_1fr] lg:px-12">
          <div>
            <span className="gold-badge mb-4">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>CUBA AI</span>
            </span>
            <h2 className="font-editorial text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
              {locale === "el"
                ? "Το custom ταξίδι σου στην Κούβα, σε 30 δευτερόλεπτα"
                : "Your custom Cuba trip, drafted in 30 seconds"}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/80">
              {locale === "el"
                ? "Πες στο CUBA AI πόσες μέρες έχεις, με ποιον ταξιδεύεις και τι σε ενδιαφέρει. Παίρνεις πρόγραμμα μέρα με τη μέρα με διαμονή, μεταφορές και εκδρομές — και ένας σύμβουλος το τελειοποιεί μαζί σου."
                : "Tell CUBA AI how many days you have, who you travel with and what you love. You get a day-by-day route with stays, transfers and tours — then a specialist refines it with you."}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {(locale === "el"
                ? [
                    "Πρόγραμμα μέρα με τη μέρα",
                    "Εκτίμηση κόστους ανά άτομο",
                    "Διαμονή σε ξενοδοχεία ή casas",
                    "Άμεση αποστολή στον σύμβουλό σου",
                  ]
                : [
                    "Day-by-day route",
                    "Estimated cost per person",
                    "Hotels or casas particulares",
                    "Send it straight to a specialist",
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={localizedPath(locale, "/ai-planner/")} className="btn-gold">
                <Sparkles className="h-4 w-4" />
                <span>{locale === "el" ? "Ανοιξτε το CUBA AI" : "Open CUBA AI"}</span>
              </Link>
              <Link href={localizedPath(locale, "/epikoinonia/")} className="btn-outline-white">
                <span>{t(COPY.enquire, locale)}</span>
              </Link>
            </div>
          </div>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-sm border border-gold/40 lg:block">
            <Image
              src="https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg"
              alt="CUBA AI"
              fill
              sizes="33vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 3. Travel Style Collections */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                {locale === "el" ? "ΣΤΥΛ ΤΑΞΙΔΙΟΥ" : "TRAVEL COLLECTIONS"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {locale === "el"
                  ? "Σχεδίασε το ταξίδι σου στην Κούβα όπως το ονειρεύεσαι"
                  : "Curated Cuba Journeys Tailored to Your Vision"}
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              {locale === "el"
                ? "Από ιδιωτικές περιηγήσεις με προσωπικό οδηγό μέχρι πολυτελή γαμήλια πακέτα και αυθεντικά road trips."
                : "From private chauffeured expeditions to luxury beach honeymoons and authentic island road trips."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRIP_COLLECTIONS.map((col) => {
              const copy = locale === "en" ? col.en : col.el;
              const Icon = col.icon;
              return (
                <article
                  key={col.href}
                  className="luxury-card group flex flex-col overflow-hidden border border-line bg-paper"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={col.img}
                      alt={copy.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur-xs">
                      {copy.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-editorial text-2xl font-normal text-ink group-hover:text-gold-deep">
                        {copy.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-muted">{copy.body}</p>
                    </div>

                    <Link
                      href={localizedPath(locale, col.href)}
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-deep transition-all group-hover:translate-x-1 group-hover:text-ink"
                    >
                      <span>{copy.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Cuba Tours Showcase (Cubatours Product Style Grid) */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                {locale === "el" ? "ΕΚΔΡΟΜΕΣ & ΞΕΝΑΓΗΣΕΙΣ" : "TOURS & EXPERIENCES"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {locale === "el"
                  ? "Κορυφαίες Ημερήσιες & Πολυήμερες Εκδρομές"
                  : "Signature Guided Cuba Tours & Day Trips"}
              </h2>
            </div>
            <Link
              href={localizedPath(locale, "/ekdromes-stin-kouva/")}
              className="btn-luxury-outline !py-2.5 !px-5 !text-xs"
            >
              <span>{locale === "el" ? "Ολες οι Εκδρομες" : "View All Tours"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => {
              const title = titleOf(tour, locale);
              const tourFields = tour.tour;
              const duration = locale === "en" ? tourFields?.durationEn : tourFields?.durationEl;
              const price = tourFields?.priceAdult
                ? `${t(COPY.adult, locale)} ${tourFields.priceAdult}`
                : locale === "en"
                ? tourFields?.priceEn
                : tourFields?.priceEl;

              return (
                <article
                  key={tour.path}
                  className="luxury-card group flex flex-col overflow-hidden border border-line bg-white"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper">
                    {tour.thumb ? (
                      <Image
                        src={tour.thumb}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Price & Duration Overlays */}
                    <div className="absolute top-3 right-3 rounded-sm bg-black/85 px-2.5 py-1 text-xs font-bold text-gold backdrop-blur-xs ring-1 ring-gold/40">
                      {price || "GO CUBA"}
                    </div>

                    {duration && (
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-sm bg-white/90 px-2 py-0.5 text-xs font-semibold text-ink">
                        <Clock className="h-3 w-3 text-gold-deep" />
                        <span>{duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-editorial text-xl font-normal leading-snug text-ink group-hover:text-gold-deep">
                        <Link href={localizedPath(locale, `/tours/${tour.slug}/`)}>{title}</Link>
                      </h3>
                      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted">
                        {locale === "en"
                          ? tour.excerptEn || tourFields?.introEn
                          : tour.excerptEl || tourFields?.introEl}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                      <span className="text-xs font-medium text-muted">
                        {tourFields?.languageEl || (locale === "el" ? "Ελληνικά / English" : "English / Greek")}
                      </span>
                      <Link
                        href={localizedPath(locale, `/tours/${tour.slug}/`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                      >
                        <span>{locale === "el" ? "Προβολη Εκδρομης" : "Product Details"}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Luxury Stays (Hotels & Casas) */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                {locale === "el" ? "ΔΙΑΜΟΝΗ ΣΤΗΝ ΚΟΥΒΑ" : "LUXURY STAYS & CASAS"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {locale === "el"
                  ? "Επιλεγμένα 5* Ξενοδοχεία & Πολυτελείς Casas"
                  : "Handpicked 5* Resorts & Heritage Suites"}
              </h2>
            </div>
            <Link
              href={localizedPath(locale, "/diamoni-stin-kouva/")}
              className="btn-luxury-outline !py-2.5 !px-5 !text-xs"
            >
              <span>{locale === "el" ? "Ολα τα Καταλυματα" : "Explore All Stays"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredHotels.map((hotel) => {
              const title = titleOf(hotel, locale);
              const stars = hotel.hotel?.stars;
              return (
                <article
                  key={hotel.path}
                  className="luxury-card group flex flex-col overflow-hidden border border-line bg-paper"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                    {hotel.thumb ? (
                      <Image
                        src={hotel.thumb}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {stars ? (
                      <div className="absolute top-3 left-3 flex gap-0.5 rounded-sm bg-black/80 px-2 py-0.5 text-xs text-gold">
                        {"★".repeat(stars)}
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 rounded-sm bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-ink">
                        Boutique Casa
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-editorial text-xl font-normal text-ink group-hover:text-gold-deep">
                        <Link href={localizedPath(locale, hotel.path)}>{title}</Link>
                      </h3>
                      {hotel.hotel?.address && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-muted">
                          <MapPin className="h-3 w-3 shrink-0 text-gold" />
                          <span className="line-clamp-1">{hotel.hotel.address}</span>
                        </p>
                      )}
                    </div>

                    <Link
                      href={localizedPath(locale, hotel.path)}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                    >
                      <span>{locale === "el" ? "Πληροφοριες & Κρατηση" : "Details & Booking"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Route Map & Essentials Toolkit Section */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Map Visualizer */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                {locale === "el" ? "ΧΑΡΤΗΣ ΑΝΑΧΩΡΗΣΕΩΝ" : "ROUTE MAP & HUBS"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {locale === "el"
                  ? "Σχεδιάζουμε το ταξίδι στην Κούβα με εκδρομές & αγαπημένες δραστηριότητες"
                  : "Seamless Island Connectivity from Havana to the Cayos"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {locale === "el"
                  ? "Κεντρικά σημεία εκκίνησης από την Αβάνα προς το Βινιάλες, το Σιενφουέγος, το Τρινιδάδ, το Κάγιο Σάντα Μαρία και το Βαραδέρο."
                  : "Direct departure hubs linking Havana with Viñales Valley, French colonial Cienfuegos, historic Trinidad, and idyllic Cayo beaches."}
              </p>

              <div className="relative mt-8 aspect-[16/11] overflow-hidden rounded-sm border border-gold/40 bg-[#faf3e0] p-4 shadow-md ring-1 ring-gold/20">
                <Image
                  src={MAP_IMG}
                  alt="Cuba tour departure points map"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Travel Essentials Download Banner */}
            <div className="flex flex-col justify-center rounded-sm border border-gold/40 bg-[#0b0b0b] p-8 text-white shadow-xl sm:p-12">
              <div className="gold-badge mb-4 w-fit">
                <FileCheck2 className="h-3.5 w-3.5 text-gold" />
                <span>{locale === "el" ? "ΔΩΡΕΑΝ ΟΔΗΓΟΣ" : "FREE ESSENTIALS GUIDE"}</span>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-white sm:text-3xl">
                {locale === "el"
                  ? "Τα Απαραίτητα Εργαλεία για το Σχεδιασμό του Ταξιδιού σου στην Κούβα"
                  : "The Essential Cuba Travel Planning Toolkit"}
              </h3>

              <p className="mt-4 text-sm font-light leading-relaxed text-white/80">
                {locale === "el"
                  ? "Όλα όσα πρέπει να γνωρίζετε πριν πετάξετε: ηλεκτρονική βίζα (eVisa), νόμισμα, ασφάλεια, καιρός, roaming, κάρτες και tips από ντόπιους."
                  : "Everything you need before your flight: official eVisa requirements, currency guidance, health insurance, weather, and insider local tips."}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://bit.ly/CubaTravelEssentials"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                >
                  <span>{locale === "el" ? "Κατεβαστε τον Οδηγο" : "Download Planning Guide"}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href={localizedPath(locale, "/visa-gia-kouva/")}
                  className="btn-outline-white"
                >
                  <span>{locale === "el" ? "Ηλεκτρονικη Βιζα (eVisa)" : "Cuba eVisa Info"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials & Stories Section */}
      <section className="bg-[#0b0b0b] py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              CUBA STORIES / {locale === "el" ? "ΕΜΠΕΙΡΙΕΣ ΤΑΞΙΔΙΩΤΩΝ" : "TRAVELER EXPERIENCES"}
            </span>
            <h2 className="mt-3 font-editorial text-3xl font-normal text-white sm:text-4xl md:text-5xl">
              {locale === "el" ? "Ιστορίες από το Νησί της Μαγείας" : "Stories from the Island of Rhythm"}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => (
              <figure
                key={idx}
                className="luxury-card flex flex-col justify-between rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-xs transition-colors hover:border-gold/50"
              >
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/50">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <p className="font-editorial text-lg font-medium text-white">{item.name}</p>
                      <p className="text-xs uppercase tracking-wider text-gold">
                        {t(item.tag, locale)}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-sm font-light leading-relaxed text-white/85 italic">
                    “{locale === "en" ? item.en : item.el}”
                  </blockquote>
                </div>

                <div className="mt-6 flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={localizedPath(locale, "/taxidiotikes-istories/")}
              className="btn-outline-white"
            >
              <span>{locale === "el" ? "Ολες οι Ταξιδιωτικες Ιστοριες" : "Read More Cuba Stories"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
