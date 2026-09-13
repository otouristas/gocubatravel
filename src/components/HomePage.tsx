import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Building,
  Heart,
  Car,
  FileCheck2,
  Route,
  Lightbulb,
  UserRound,
} from "lucide-react";
import { COPY, t } from "@/content/site";
import { stayEditorial } from "@/content/stays-editorial";
import type { Locale } from "@/content/types";
import { localizedPath } from "@/lib/i18n";
import { titleOf, visibleHotels, visibleTours } from "@/lib/content";

const HERO_IMG =
  "https://www.skydream.gr/wp-content/uploads/skydream-travel-cuba-tours-cuban-man-with-cigar-cropped-2880x72ppi.jpg";
const MAP_IMG =
  "https://www.skydream.gr/wp-content/uploads/map-cuba-tours-departure-points-skydream-travel-png24.png";
const PREP_IMG =
  "https://www.skydream.gr/wp-content/uploads/Cuba-trip-planning-skydreamtravel-scaled.jpg";

/** Personal Trip Planning service page. */
const PLANNING_PATH = "/sxediasmos-taxidiou-kouva/";
/** Trip proposals / holiday packages hub. */
const PROPOSALS_PATH = "/paketa-diakopon-gia-kouva/";

/**
 * The dedicated Cuba Travel Preparation Session page has not been built yet.
 * Until it ships, the CTA uses the existing, verified contact route rather than
 * an invented URL — swap this for the service route once it is implemented.
 */
const PREP_SESSION_PATH = "/epikoinonia/";

/**
 * There is no Cuba destinations hub page yet. Left as null the section CTA is
 * simply not rendered, so no visitor lands on a 404; set the route to enable it.
 */
const DESTINATIONS_HUB_PATH: string | null = null;

/**
 * Migrated lead-magnet landing page. GoCuba is the redesign skydream.gr
 * redirects to, so this stays an internal route — linking back to the old
 * domain would bounce the visitor through a redirect to get here.
 */
const FREE_GUIDE_PATH = "/cuba-travel-documents-guide/";

/** Three equal entry points into the funnel — deliberately no "recommended" one. */
const START_OPTIONS = [
  {
    id: "ai",
    href: "/ai-planner/",
    icon: Sparkles,
    el: {
      intent: "Θέλω πρώτα να πάρω ιδέες",
      service: "GoCuba AI",
      price: "Δωρεάν",
      body: "Δημιούργησε ένα πρώτο πλάνο ταξιδιού με βάση τις ημέρες που έχεις διαθέσιμες, τα ενδιαφέροντά σου και το στιλ του ταξιδιού σου.",
      cta: "Δημιούργησε δωρεάν το πρόγραμμά σου",
    },
    en: {
      intent: "I want ideas first",
      service: "GoCuba AI",
      price: "Free",
      body: "Draft a first trip plan based on the days you have available, your interests and the style of trip you want.",
      cta: "Create your programme for free",
    },
  },
  {
    id: "proposals",
    href: PROPOSALS_PATH,
    icon: Compass,
    el: {
      intent: "Θέλω να δω ήδη έτοιμες προτάσεις",
      service: "Προτάσεις Ταξιδιών",
      price: "",
      body: "Δες διαδρομές που έχουμε ήδη σχεδιάσει και ξεκίνα από εκεί για να διαμορφώσεις το δικό σου ταξίδι.",
      cta: "Δες προτάσεις ταξιδιών",
    },
    en: {
      intent: "I want to see ready-made proposals",
      service: "Trip Proposals",
      price: "",
      body: "Look through routes we have already designed and start from there to shape your own trip.",
      cta: "See trip proposals",
    },
  },
  {
    id: "planning",
    href: PLANNING_PATH,
    icon: Route,
    el: {
      intent: "Θέλω προσωπικό σχεδιασμό",
      service: "Προσωπικός Σχεδιασμός Ταξιδιού",
      price: "€95",
      body: "Λαμβάνεις μία εξατομικευμένη πρόταση με διαδρομή, διαμονή, μεταφορές, εκδρομές και κοστολόγηση, καθώς και μία αναθεώρηση.",
      // .btn-gold uppercases the label, so this reads ΞΕΚΙΝΑ ΤΟΝ ΣΧΕΔΙΑΣΜΟ on the card.
      cta: "Ξεκίνα τον σχεδιασμό",
      note: "Αμοιβή σχεδιασμού: €95 ανά ταξίδι. Αφαιρείται πλήρως από το κόστος της κράτησης μέσω GoCuba.travel.",
    },
    en: {
      intent: "I want personal planning",
      service: "Personal Trip Planning",
      price: "€95",
      body: "A Cuba Specialist designs your route, stays, transfers and excursions around your needs and interests.",
      cta: "Start Personal Trip Planning",
      note: "The planning fee is credited against your final booking through GoCuba.",
    },
  },
] as const;

const TRIP_COLLECTIONS = [
  {
    href: "/paketa-diakopon-gia-kouva/atomika-taxidia/",
    img: "https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg",
    icon: Compass,
    el: {
      title: "Ατομικά Ταξίδια",
      sub: "Η Κούβα στον δικό σου ρυθμό",
      body: "Tailor-made διαδρομές για ζευγάρια, οικογένειες ή παρέες, με ιδιωτικές μεταφορές, τοπικούς ξεναγούς και διαμονή επιλεγμένη σύμφωνα με το στιλ του ταξιδιού σου.",
      cta: "Ανακαλυψτε τα Ατομικα",
    },
    en: {
      title: "Private Journeys",
      sub: "Cuba at your own pace",
      body: "Tailor-made routes for couples, families or friends, with private transfers, local guides and stays chosen to match the style of your trip.",
      cta: "Explore Private Trips",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/gamilia-taxidia/",
    img: "https://www.skydream.gr/wp-content/uploads/Honeymoon-in-cuba-skydream.jpg",
    icon: Heart,
    el: {
      title: "Γαμήλια Ταξίδια",
      sub: "Η Κούβα για δύο, με τον δικό σας ρυθμό",
      body: "Συνδυάζουμε ατμοσφαιρική διαμονή στην Αβάνα, ιδιωτικές εκδρομές, ιδιαίτερες δραστηριότητες και παραλίες στα Cayos, με σωστή ισορροπία ανάμεσα στην εξερεύνηση και τη χαλάρωση.",
      cta: "Δειτε τα Γαμηλια",
    },
    en: {
      title: "Honeymoons",
      sub: "Cuba for two, at your own pace",
      body: "We combine atmospheric stays in Havana, private excursions, memorable activities and the beaches of the Cayos, balancing exploration with rest.",
      cta: "View Honeymoon Packages",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/thematika-taxidia/",
    img: "https://www.skydream.gr/wp-content/uploads/cuba-group-tour-skydream-travel.jpg",
    icon: Sparkles,
    el: {
      title: "Θεματικά Ταξίδια",
      sub: "Ανακάλυψε την Κούβα με βάση τα ενδιαφέροντά σου",
      body: "Σχεδιάζουμε ταξίδια γύρω από μουσική και salsa, αρχιτεκτονική, ιστορία, πούρα Habanos, φωτογραφία και άλλες πλευρές της κουβανικής κουλτούρας.",
      cta: "Δειτε τα Θεματικα",
    },
    en: {
      title: "Thematic Trips",
      sub: "Discover Cuba through your own interests",
      body: "We build trips around music and salsa, architecture, history, Habanos cigars, photography and other sides of Cuban culture.",
      cta: "View Thematic Trips",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/road-trips/",
    img: "https://www.skydream.gr/wp-content/uploads/despoina-sotiria-cuba-road-trip-skydream-testimonial.jpg",
    icon: Car,
    el: {
      title: "Cuba Road Trips",
      sub: "Για όσους θέλουν να γνωρίσουν περισσότερες πλευρές της Κούβας",
      body: "Σχεδιάζουμε road trips που συνδυάζουν Αβάνα, Viñales, Cienfuegos, Trinidad, Cayos και την ανατολική Κούβα, με ισορροπημένη κατανομή ημερών και σωστά οργανωμένες μετακινήσεις.",
      cta: "Δειτε τα Road Trips",
    },
    en: {
      title: "Cuba Road Trips",
      sub: "For travellers who want to see more sides of Cuba",
      body: "We plan road trips linking Havana, Viñales, Cienfuegos, Trinidad, the Cayos and eastern Cuba, with a balanced split of days and well-organised drives.",
      cta: "View Road Trips",
    },
  },
];

const FEATURED_TRIPS = [
  {
    href: "/paketa-diakopon-gia-kouva/omadika-taxidia/cuba-linda/",
    img: "https://www.skydream.gr/wp-content/uploads/Caribbean-sea-sunset-from-Cienfuegos-Cuba-skydream-1024x576.jpg",
    name: "Cuba Linda",
    el: {
      route: "Αβάνα · Βινιάλες · Γουαμά · Σιενφουέγος · Τρινιδάδ · Κάγιο Σάντα Μαρία · Αβάνα",
      body: "Από τις πόλεις και την ύπαιθρο της Κούβας μέχρι τις παραλίες του Κάγιο Σάντα Μαρία, σε μια διαδρομή που συνδυάζει πολιτισμό, φύση και χαλάρωση.",
      cta: "Δες το πρόγραμμα Cuba Linda",
      alt: "Ηλιοβασίλεμα στην Καραϊβική θάλασσα από το Σιενφουέγος της Κούβας",
    },
    en: {
      route: "Havana · Viñales · Guamá · Cienfuegos · Trinidad · Cayo Santa María · Havana",
      body: "From Cuba's cities and countryside to the beaches of Cayo Santa María, on a route that combines culture, nature and rest.",
      cta: "See the Cuba Linda programme",
      alt: "Caribbean sea sunset seen from Cienfuegos, Cuba",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/omadika-taxidia/explora-cuba/",
    img: "https://www.skydream.gr/wp-content/uploads/Havana-city-panoramic-view-skydream-travel-1024x576.jpg",
    name: "Explora Cuba",
    el: {
      route: "Αβάνα · Βινιάλες · Σάντα Κλάρα · Σιενφουέγος · Τρινιδάδ · Βαραδέρο",
      body: "Μια διαδρομή που συνδυάζει τα σημαντικότερα πολιτιστικά σημεία της δυτικής και κεντρικής Κούβας με χαλάρωση στο Βαραδέρο.",
      cta: "Δες το πρόγραμμα Explora Cuba",
      alt: "Πανοραμική θέα της Αβάνας στην Κούβα",
    },
    en: {
      route: "Havana · Viñales · Santa Clara · Cienfuegos · Trinidad · Varadero",
      body: "A route linking the main cultural highlights of western and central Cuba with time to unwind in Varadero.",
      cta: "See the Explora Cuba programme",
      alt: "Panoramic view of Havana, Cuba",
    },
  },
  {
    href: "/paketa-diakopon-gia-kouva/omadika-taxidia/me-gusta-cuba/",
    img: "https://www.skydream.gr/wp-content/uploads/Family-walking-on-Varadero-beach-Cuba-1024x576.jpg",
    name: "Me Gusta Cuba",
    el: {
      route: "Αβάνα · Βινιάλες · Σάντα Κλάρα · Σιενφουέγος · Τρινιδάδ · Κάγιο Σάντα Μαρία · Βαραδέρο",
      body: "Μια πιο εκτεταμένη διαδρομή που συνδυάζει πόλεις, ιστορία και δύο διαφορετικές παραθαλάσσιες περιοχές της Κούβας.",
      cta: "Δες το πρόγραμμα Me Gusta Cuba",
      alt: "Οικογένεια περπατά στην παραλία του Βαραδέρο στην Κούβα",
    },
    en: {
      route: "Havana · Viñales · Santa Clara · Cienfuegos · Trinidad · Cayo Santa María · Varadero",
      body: "A longer route combining cities, history and two different stretches of Cuban coast.",
      cta: "See the Me Gusta Cuba programme",
      alt: "A family walking on Varadero beach, Cuba",
    },
  },
];

/**
 * Destination discovery for the map section. `href` stays null until the
 * matching destination page exists — a null entry renders as plain crawlable
 * text instead of a link, so the section never produces a 404.
 */
const DESTINATIONS: { name: string; href: string | null }[] = [
  { name: "Αβάνα", href: null },
  { name: "Viñales", href: null },
  { name: "Trinidad", href: null },
  { name: "Varadero", href: null },
  { name: "Cayo Coco", href: null },
  { name: "Cayo Santa Maria", href: null },
];

const TRUST_PILLARS = [
  {
    icon: Award,
    el: {
      title: "Εξειδίκευση στην Κούβα από το 2008",
      desc: "Πραγματική γνώση του προορισμού και πολυετής εμπειρία στον σχεδιασμό ταξιδιών σε όλη την Κούβα.",
    },
    en: {
      title: "17+ Years Specialising in Cuba",
      desc: "Real destination knowledge and years of experience planning trips across the whole of Cuba.",
    },
  },
  {
    icon: ShieldCheck,
    el: {
      title: "Πιστοποίηση ASTA Cuba Travel Specialist",
      desc: "Διεθνής πιστοποίηση εξειδίκευσης στον σχεδιασμό ταξιδιών στην Κούβα.",
    },
    en: {
      title: "GNTO Licence & International Accreditations",
      desc: "A licensed travel agency with international accreditations and a specialisation in travel to Cuba.",
    },
  },
  {
    icon: Users,
    el: {
      title: "Έλληνες & Τοπικοί Ξεναγοί",
      desc: "Έλληνες συνοδοί και τοπικοί ξεναγοί με βαθιά γνώση της κουβανικής ιστορίας & κουλτούρας.",
    },
    en: {
      title: "Greek & Local Guides",
      desc: "Greek tour leaders and local guides with deep knowledge of Cuban history and culture.",
    },
  },
  {
    icon: Building,
    el: {
      title: "Επιλεγμένη Διαμονή & Εκδρομές",
      desc: "Διαμονή που ταιριάζει στο στιλ του ταξιδιού σου, και εκδρομές επιλεγμένες με βάση τα ενδιαφέροντά σου.",
    },
    en: {
      title: "Selected Stays & Excursions",
      desc: "Accommodation that suits the style of your trip, and excursions chosen around your interests.",
    },
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
  const isEn = locale === "en";
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
              <span>CUBA TRAVEL SPECIALISTS</span>
            </div>

            <h1 className="font-editorial text-4xl font-normal leading-[1.12] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {isEn ? (
                <>
                  Travel to Cuba, with the{" "}
                  <span className="italic text-gold-light">right choices</span> for you
                </>
              ) : (
                <>
                  Ταξίδι στην Κούβα, με τις{" "}
                  <span className="italic text-gold-light">σωστές επιλογές</span> για εσένα
                </>
              )}
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/90 sm:text-xl">
              {isEn
                ? "We combine route, stays, transfers and excursions around the days you have available, your interests and the way you want to travel."
                : "Σχεδιάζουμε το ταξιδιωτικό σου πρόγραμμα: επιλέγουμε τη σωστή διαδρομή και συνδυάζουμε διαμονή, μεταφορές και εκδρομές με βάση τις ημέρες που έχεις διαθέσιμες, τα ενδιαφέροντά σου και τον τρόπο που θέλεις να ταξιδέψεις."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <Link href={localizedPath(locale, PLANNING_PATH)} className="btn-gold">
                  <span>
                    {isEn
                      ? "Plan your trip with a Cuba Specialist"
                      : "Σχεδίασε το ταξίδι σου με Cuba Specialist"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-2.5 max-w-md text-xs leading-relaxed text-white/70">
                  {isEn
                    ? "Personal Trip Planning €95 · Credited against your final booking through GoCuba."
                    : "Personal Trip Planning €95 · Συμψηφίζεται με την τελική κράτηση μέσω GoCuba."}
                </p>
              </div>
              <Link
                href={localizedPath(locale, PROPOSALS_PATH)}
                className="btn-outline-white self-start"
              >
                <Compass className="h-4 w-4" />
                <span>{isEn ? "See trip proposals" : "Δες προτάσεις ταξιδιών"}</span>
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
              const copy = isEn ? item.en : item.el;
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

      {/* 3. Three ways to start — equal entry points into the funnel */}
      <section className="bg-[#0b0b0b] py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {isEn ? "HOW TO START" : "ΠΩΣ ΞΕΚΙΝΑΣ"}
            </span>
            <h2 className="mt-3 font-editorial text-3xl font-normal leading-tight sm:text-4xl">
              {isEn
                ? "How would you like to start your trip to Cuba?"
                : "Πως θέλεις να ξεκινήσεις το ταξίδι σου στην Κούβα;"}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {START_OPTIONS.map((option) => {
              const copy = isEn ? option.en : option.el;
              const note = "note" in copy ? copy.note : undefined;
              const Icon = option.icon;
              return (
                <article
                  key={option.id}
                  className="luxury-card flex flex-col rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-xs transition-colors hover:border-gold/50 sm:p-7"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{copy.intent}</span>
                  </div>

                  <h3 className="mt-4 font-editorial text-2xl font-normal text-white">
                    {copy.service}
                    {copy.price ? (
                      <span className="ml-2 text-lg text-gold-light">— {copy.price}</span>
                    ) : null}
                  </h3>

                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-white/80">
                    {copy.body}
                  </p>

                  <Link
                    href={localizedPath(locale, option.href)}
                    className="btn-gold mt-6 w-full !px-4 !text-xs"
                  >
                    <span>{copy.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </Link>

                  {/* Reserved even when empty, so all three CTAs sit on one line. */}
                  <p className="mt-3 min-h-8 text-xs leading-relaxed text-white/60">{note}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Travel Style Collections */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                {isEn ? "TRAVEL STYLES" : "ΣΤΥΛ ΤΑΞΙΔΙΟΥ"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {isEn
                  ? "Design your trip to Cuba the way you imagine it"
                  : "Σχεδίασε το ταξίδι σου στην Κούβα όπως το ονειρεύεσαι"}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              {isEn
                ? "From private routes and honeymoons to thematic programmes and road trips, we design every trip around the way you want to get to know Cuba."
                : "Από ιδιωτικές διαδρομές και γαμήλια ταξίδια μέχρι θεματικά προγράμματα και road trips, σχεδιάζουμε κάθε ταξίδι με βάση τον τρόπο που θέλεις να γνωρίσεις την Κούβα."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRIP_COLLECTIONS.map((col) => {
              const copy = isEn ? col.en : col.el;
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
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-editorial text-2xl font-normal text-ink group-hover:text-gold-deep">
                        {copy.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                        {copy.sub}
                      </p>
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

      {/* 5. Featured trip proposals */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {isEn ? "TRIP PROPOSALS" : "ΠΡΟΤΑΣΕΙΣ ΤΑΞΙΔΙΩΝ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn ? "Popular trips to Cuba" : "Δημοφιλή ταξίδια στην Κούβα"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {isEn
                ? "Browse some of the most popular trip proposals for Cuba and find the one that suits you best."
                : "Δες μερικές από τις πιο δημοφιλείς προτάσεις ταξιδιών για την Κούβα και βρες εκείνη που σου ταιριάζει περισσότερο."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_TRIPS.map((trip) => {
              const copy = isEn ? trip.en : trip.el;
              return (
                <article
                  key={trip.href}
                  className="luxury-card group flex flex-col overflow-hidden border border-line bg-white"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={trip.img}
                      alt={copy.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-editorial text-2xl font-normal text-ink group-hover:text-gold-deep">
                        <Link href={localizedPath(locale, trip.href)}>{trip.name}</Link>
                      </h3>
                      <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                        <span>{copy.route}</span>
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-muted">{copy.body}</p>
                    </div>

                    <Link
                      href={localizedPath(locale, trip.href)}
                      className="btn-luxury-outline mt-6 !py-2.5 !px-4 !text-xs"
                    >
                      <span>{copy.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href={localizedPath(locale, PROPOSALS_PATH)} className="btn-gold">
              <span>{isEn ? "See all trip proposals" : "Δες όλες τις προτάσεις ταξιδιών"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Cuba Tours Showcase */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                {isEn ? "TOURS & EXPERIENCES" : "ΕΚΔΡΟΜΕΣ & ΞΕΝΑΓΗΣΕΙΣ"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {isEn
                  ? "Excursions in Cuba worth adding to your trip"
                  : "Εκδρομές στην Κούβα που αξίζει να προσθέσεις στο ταξίδι σου"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {isEn
                  ? "From walks through Old Havana to day and multi-day excursions, we suggest guided tours and activities based on your interests and the way you want to get to know Cuba."
                  : "Από περιπάτους στην Παλιά Αβάνα μέχρι ημερήσιες και πολυήμερες εκδρομές, προτείνουμε ξεναγήσεις και δραστηριότητες με βάση τα ενδιαφέροντά σου και τον τρόπο που θέλεις να γνωρίσεις την Κούβα."}
              </p>
            </div>
            <Link
              href={localizedPath(locale, "/ekdromes-stin-kouva/")}
              className="btn-luxury-outline !py-2.5 !px-5 !text-xs"
            >
              <span>{isEn ? "View All Tours" : "Ολες οι Εκδρομες"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => {
              const title = titleOf(tour, locale);
              const tourFields = tour.tour;
              const duration = isEn ? tourFields?.durationEn : tourFields?.durationEl;
              const price = tourFields?.priceAdult
                ? `${t(COPY.adult, locale)} ${tourFields.priceAdult}`
                : isEn
                ? tourFields?.priceEn
                : tourFields?.priceEl;

              return (
                <article
                  key={tour.path}
                  className="luxury-card group flex flex-col overflow-hidden border border-line bg-paper"
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
                        {isEn ? tour.excerptEn || tourFields?.introEn : tour.excerptEl || tourFields?.introEl}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                      <span className="text-xs font-medium text-muted">
                        {tourFields?.languageEl || (isEn ? "English / Greek" : "Ελληνικά / English")}
                      </span>
                      <Link
                        href={localizedPath(locale, `/tours/${tour.slug}/`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                      >
                        <span>{isEn ? "Product Details" : "Προβολη Εκδρομης"}</span>
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

      {/* 7. Accommodation in Cuba */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {isEn ? "STAYS IN CUBA" : "ΔΙΑΜΟΝΗ ΣΤΗΝ ΚΟΥΒΑ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn
                ? "Accommodation in Cuba, selected for your trip"
                : "Διαμονή στην Κούβα, επιλεγμένη για το ταξίδι σου"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {isEn
                ? "From city hotels and all-inclusive resorts to casas particulares, we choose accommodation based on location, the style of the trip and what each traveller needs."
                : "Από ξενοδοχεία πόλης και all-inclusive resorts μέχρι casas particulares, επιλέγουμε τη διαμονή με βάση την τοποθεσία, το στιλ του ταξιδιού και τις ανάγκες του κάθε ταξιδιώτη."}
            </p>
            <p className="mt-3 text-sm italic leading-relaxed text-ink-soft">
              {isEn
                ? "We are not simply looking for the “best” property — we are looking for the one that fits this particular trip."
                : "Δεν ψάχνουμε απλώς το “καλύτερο” κατάλυμα — ψάχνουμε αυτό που ταιριάζει καλύτερα στο συγκεκριμένο ταξίδι."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredHotels.map((hotel) => {
              const title = titleOf(hotel, locale);
              const stars = hotel.hotel?.stars;
              const notes = stayEditorial(hotel.path);
              return (
                <article
                  key={hotel.path}
                  className="luxury-card group flex flex-col overflow-hidden border border-line bg-white"
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

                      {notes ? (
                        <dl className="mt-4 space-y-3 border-t border-line/70 pt-4 text-xs leading-relaxed">
                          <div>
                            <dt className="text-[11px] font-bold uppercase tracking-wider text-gold-deep">
                              {isEn ? "Ideal for" : "Ιδανικό για"}
                            </dt>
                            <dd className="mt-0.5 text-ink-soft">
                              {isEn ? notes.idealFor.en : notes.idealFor.el}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] font-bold uppercase tracking-wider text-gold-deep">
                              {isEn ? "Why we recommend it" : "Γιατί το προτείνουμε"}
                            </dt>
                            <dd className="mt-0.5 text-muted">
                              {isEn ? notes.whyWeRecommend.en : notes.whyWeRecommend.el}
                            </dd>
                          </div>
                          <div className="rounded-sm bg-paper-warm/70 p-2.5 ring-1 ring-gold/20">
                            <dt className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gold-deep">
                              <Lightbulb className="h-3 w-3 shrink-0" />
                              <span>GoCuba Tip</span>
                            </dt>
                            <dd className="mt-0.5 text-muted">
                              {isEn ? notes.goCubaTip.en : notes.goCubaTip.el}
                            </dd>
                          </div>
                        </dl>
                      ) : null}
                    </div>

                    <Link
                      href={localizedPath(locale, hotel.path)}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                    >
                      <span>{isEn ? "Details & Booking" : "Πληροφοριες & Κρατηση"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href={localizedPath(locale, "/diamoni-stin-kouva/")} className="btn-gold">
              <span>{isEn ? "See stays in Cuba" : "Δες διαμονή στην Κούβα"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Destinations & routes — discovery plus the Cuba map */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {isEn ? "DESTINATIONS & ROUTES" : "ΠΡΟΟΡΙΣΜΟΙ & ΔΙΑΔΡΟΜΕΣ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn
                ? "Discover the destinations of Cuba and see how they can be combined in your trip."
                : "Ανακάλυψε προορισμούς της Κούβας και δες πώς μπορούν να συνδυαστούν στο ταξίδι σου."}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {isEn
                ? "Distances play a real part in planning a route through Cuba. Use the map to understand where the different destinations sit and which combinations make sense for the days you have available."
                : "Οι αποστάσεις στην Κούβα παίζουν σημαντικό ρόλο στον σχεδιασμό της διαδρομής. Χρησιμοποίησε τον χάρτη για να καταλάβεις καλύτερα πού βρίσκονται οι διαφορετικοί προορισμοί και ποιοι συνδυασμοί έχουν νόημα για τις ημέρες που έχεις διαθέσιμες."}
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {DESTINATIONS.map((destination) => (
              <li key={destination.name}>
                {destination.href ? (
                  <Link
                    href={localizedPath(locale, destination.href)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold-deep"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
                    <span>{destination.name}</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
                    <span>{destination.name}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="relative mt-10 aspect-[16/11] overflow-hidden rounded-sm border border-gold/40 bg-[#faf3e0] p-4 shadow-md ring-1 ring-gold/20 sm:aspect-[16/9]">
            <Image
              src={MAP_IMG}
              alt={
                isEn
                  ? "Map of Cuba showing Havana, Viñales, Trinidad, Varadero, Cayo Coco and Cayo Santa Maria"
                  : "Χάρτης της Κούβας με Αβάνα, Viñales, Trinidad, Varadero, Cayo Coco και Cayo Santa Maria"
              }
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>

          {DESTINATIONS_HUB_PATH ? (
            <div className="mt-10 text-center">
              <Link
                href={localizedPath(locale, DESTINATIONS_HUB_PATH)}
                className="btn-luxury-outline"
              >
                <span>
                  {isEn ? "Discover the destinations of Cuba" : "Ανακάλυψε τους προορισμούς της Κούβας"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* 9. Free travel-documents guide (lead magnet) */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="rounded-sm border border-gold/40 bg-[#0b0b0b] p-8 text-white shadow-xl sm:p-12 lg:p-14">
            <div className="max-w-3xl">
              <div className="gold-badge mb-4 w-fit">
                <FileCheck2 className="h-3.5 w-3.5 text-gold" />
                <span>{isEn ? "FREE GUIDE" : "ΔΩΡΕΑΝ ΟΔΗΓΟΣ"}</span>
              </div>

              <h2 className="font-editorial text-2xl font-normal text-white sm:text-3xl lg:text-4xl">
                {isEn
                  ? "The travel documents you need for Cuba, gathered into one guide"
                  : "Τα απαραίτητα ταξιδιωτικά έγγραφα για την Κούβα, συγκεντρωμένα σε έναν οδηγό"}
              </h2>

              <p className="mt-4 text-sm font-light leading-relaxed text-white/80 sm:text-base">
                {isEn
                  ? "Find out which documents you need for your trip to Cuba and which steps to follow so you are properly prepared before departure."
                  : "Μάθε ποια έγγραφα χρειάζεσαι για το ταξίδι σου στην Κούβα και ποια βήματα πρέπει να ακολουθήσεις για να προετοιμαστείς σωστά πριν από την αναχώρηση."}
              </p>

              <div className="mt-8">
                <Link href={localizedPath(locale, FREE_GUIDE_PATH)} className="btn-gold">
                  <span>{isEn ? "Download the free guide" : "Κατέβασε τον δωρεάν οδηγό"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Cuba Travel Preparation — paid specialist session */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                CUBA TRAVEL PREPARATION
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {isEn
                  ? "Prepare for Cuba with the help of a Cuba Specialist"
                  : "Προετοιμάσου για την Κούβα με τη βοήθεια ενός Cuba Specialist"}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {isEn
                  ? "You have already decided to travel to Cuba, but you have questions about daily life, getting around, money or what you will find there?"
                  : "Έχεις ήδη αποφασίσει να ταξιδέψεις στην Κούβα, αλλά έχεις απορίες για την καθημερινότητα, τις μετακινήσεις, τα χρήματα ή το τι θα συναντήσεις εκεί;"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {isEn
                  ? "In a personal session we go through what you need to know so you can prepare properly and travel with more confidence."
                  : "Σε μια προσωπική συνεδρία, θα συζητήσουμε όσα χρειάζεται να γνωρίζεις για να προετοιμαστείς σωστά και να ταξιδέψεις με μεγαλύτερη σιγουριά."}
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-sm border border-gold/40 bg-paper px-4 py-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Clock className="h-4 w-4 shrink-0 text-gold-deep" />
                  <span>{isEn ? "45 minutes with a Cuba Specialist" : "45 λεπτά με Cuba Specialist"}</span>
                </span>
                <span className="text-gold/50">·</span>
                <span className="font-editorial text-xl text-ink">€59</span>
              </div>

              <div className="mt-8">
                <Link
                  href={localizedPath(locale, PREP_SESSION_PATH)}
                  className="btn-gold w-full sm:w-auto"
                >
                  <span>
                    {isEn ? "Book your preparation session" : "Κλείσε τη συνεδρία προετοιμασίας σου"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {isEn
                    ? "What you need to know to travel to Cuba with confidence."
                    : "Όσα χρειάζεται να γνωρίζεις για να ταξιδέψεις στην Κούβα με σιγουριά."}
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line shadow-md">
              <Image
                src={PREP_IMG}
                alt={
                  isEn
                    ? "Preparing a trip to Cuba with a specialist"
                    : "Προετοιμασία ταξιδιού στην Κούβα με εξειδικευμένο σύμβουλο"
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Cuba eVisa — compact utility section */}
      <section className="border-t border-line bg-paper py-14">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-sm border border-line bg-white p-6 shadow-xs sm:p-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                {isEn ? "CUBA eVISA" : "eVISA ΓΙΑ ΚΟΥΒΑ"}
              </span>
              <h2 className="mt-2 font-editorial text-2xl font-normal text-ink sm:text-3xl">
                {isEn ? "Do you need an eVisa for Cuba?" : "Χρειάζεσαι eVisa για την Κούβα;"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {isEn
                  ? "Apply online and get guidance in Greek on the process and the next steps before your departure."
                  : "Κάνε online την αίτησή σου και λάβε καθοδήγηση στα ελληνικά για τη διαδικασία και τα επόμενα βήματα πριν από την αναχώρησή σου."}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                <FileCheck2 className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {isEn ? "Online application · Support in Greek" : "Online αίτηση · Υποστήριξη στα Ελληνικά"}
                </span>
              </p>
            </div>

            <Link
              href={localizedPath(locale, "/visa-gia-kouva/")}
              className="btn-gold w-full shrink-0 lg:w-auto"
            >
              <span>{isEn ? "Apply for a Cuba eVisa" : "Έκδοση eVisa για Κούβα"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Client Testimonials & Stories Section */}
      <section className="bg-[#0b0b0b] py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              CUBA STORIES / {isEn ? "TRAVELER EXPERIENCES" : "ΕΜΠΕΙΡΙΕΣ ΤΑΞΙΔΙΩΤΩΝ"}
            </span>
            <h2 className="mt-3 font-editorial text-3xl font-normal text-white sm:text-4xl md:text-5xl">
              {isEn ? "How our travellers experienced Cuba" : "Πώς έζησαν την Κούβα οι ταξιδιώτες μας"}
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
                    “{isEn ? item.en : item.el}”
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
              <span>{isEn ? "Read More Cuba Stories" : "Ολες οι Ταξιδιωτικες Ιστοριες"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Meet your specialist */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm border border-line shadow-md lg:mx-0">
              <Image
                src="/angeliki-fotopoulou.jpg"
                alt={
                  isEn
                    ? "Angeliki Fotopoulou, GoCuba Cuba Destination Specialist"
                    : "Angeliki Fotopoulou, Cuba Destination Specialist της GoCuba"
                }
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                CUBA DESTINATION SPECIALIST
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {isEn
                  ? "Behind every well-designed trip there is real knowledge of Cuba"
                  : "Πίσω από κάθε σωστά σχεδιασμένο ταξίδι υπάρχει πραγματική γνώση της Κούβας"}
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                {isEn
                  ? "For 17+ years I have been planning trips to Cuba for Greek travellers. I know how hard it is to decide which areas to visit, how many days to give each stop and which accommodation to choose, when you have so many options and limited time to combine them properly."
                  : "Εδώ και 17+ χρόνια σχεδιάζω ταξίδια στην Κούβα για Έλληνες ταξιδιώτες. Ξέρω πόσο δύσκολο είναι να αποφασίσεις ποιες περιοχές να επισκεφτείς, πόσες ημέρες να αφιερώσεις σε κάθε στάση και ποια διαμονή να επιλέξεις, όταν έχεις τόσες επιλογές και περιορισμένο χρόνο για να τις συνδυάσεις σωστά."}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {isEn
                  ? "That is why I help you clarify your options and design a trip that fits your time, your interests and your expectations."
                  : "Γι’ αυτό σε βοηθάω να ξεκαθαρίσεις τις επιλογές σου και να σχεδιάσεις ένα ταξίδι που ταιριάζει στον χρόνο, τα ενδιαφέροντα και τις προσδοκίες σου."}
              </p>

              <div className="mt-6 flex items-center gap-3 border-l-2 border-gold/50 pl-4">
                <UserRound className="h-5 w-5 shrink-0 text-gold-deep" />
                <div>
                  <p className="font-editorial text-lg text-ink">Angeliki Fotopoulou</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                    Cuba Destination Specialist
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href={localizedPath(locale, "/i-omada-mas/")} className="btn-luxury-outline">
                  <span>{isEn ? "Meet Angeliki" : "Γνώρισε την Angeliki"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
