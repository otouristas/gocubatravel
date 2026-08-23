"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Phone,
  Search,
  X,
  ArrowRight,
  ShieldCheck,
  Mail,
  Sparkles,
  ChevronDown,
  Compass,
  Building,
  Car,
  FileCheck2,
  BookOpen,
  MessageCircle,
  Star,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import Logo from "@/components/Logo";
import { COPY, SITE, t } from "@/content/site";
import type { Locale } from "@/content/types";
import { localizedPath, stripLocale, switchLocale } from "@/lib/i18n";
import { searchRecords, titleOf } from "@/lib/content";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const isEn = locale === "en";

  // Lock body scroll when mobile drawer or search is open
  useEffect(() => {
    if (open || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open, searchOpen]);

  const results = useMemo(() => searchRecords(q, locale), [q, locale]);

  const NAV_SECTIONS = [
    {
      id: "packages",
      label: isEn ? "Packages" : "Πακέτα Διακοπών",
      href: "/paketa-diakopon-gia-kouva/",
      items: [
        {
          title: isEn ? "All Holiday Packages" : "Όλα τα Πακέτα Διακοπών",
          desc: isEn ? "Explore all bespoke Cuba programs" : "Πλήρης κατάλογος όλων των προγραμμάτων",
          href: "/paketa-diakopon-gia-kouva/",
          icon: Compass,
        },
        {
          title: isEn ? "Private Journeys (Ατομικά)" : "Ατομικά Ταξίδια",
          desc: isEn ? "Custom tailored with chauffeur" : "Ιδιωτικές μεταφορές & τοπικός ξεναγός",
          href: "/paketa-diakopon-gia-kouva/atomika-taxidia/",
          icon: Compass,
        },
        {
          title: isEn ? "Small Group Tours (Ομαδικά)" : "Ομαδικά Ταξίδια",
          desc: isEn ? "Curated group departures" : "Οργανωμένες αναχωρήσεις μικρών ομάδων",
          href: "/paketa-diakopon-gia-kouva/omadika-taxidia/",
          icon: Users,
        },
        {
          title: isEn ? "Luxury Honeymoons (Γαμήλια)" : "Γαμήλια Ταξίδια",
          desc: isEn ? "Colonial suites & Caribbean Cayos" : "Ρομαντικές σουίτες & εξωτικά Cayos",
          href: "/paketa-diakopon-gia-kouva/gamilia-taxidia/",
          icon: Heart,
        },
        {
          title: isEn ? "Thematic Trips (Θεματικά)" : "Θεματικά Ταξίδια",
          desc: isEn ? "Salsa, music & culture expeditions" : "Μουσική, Salsa, πούρα & φωτογραφία",
          href: "/paketa-diakopon-gia-kouva/thematika-taxidia/",
          icon: Sparkles,
        },
        {
          title: isEn ? "Cuba Road Trips" : "Cuba Road Trips",
          desc: isEn ? "Self-drive freedom coast-to-coast" : "Ελευθερία διαδρομών με αυτοκίνητο",
          href: "/paketa-diakopon-gia-kouva/road-trips/",
          icon: Car,
        },
      ],
    },
    {
      id: "tours",
      label: isEn ? "Tours" : "Εκδρομές",
      href: "/ekdromes-stin-kouva/",
      items: [
        {
          title: isEn ? "All Guided Tours" : "Όλες οι Εκδρομές",
          desc: isEn ? "Day trips & multi-day tours" : "Ημερήσιες & πολυήμερες ξεναγήσεις",
          href: "/ekdromes-stin-kouva/",
          icon: Compass,
        },
        {
          title: isEn ? "Viñales Valley Tobacco Tour" : "Κοιλάδα Βινιάλες & Πούρα",
          desc: isEn ? "UNESCO mogotes & veguero farm" : "Σπήλαια, φυτείες καπνού & άλογα",
          href: "/tours/ekdromi-stin-koilada-viniales/",
          icon: Sparkles,
        },
        {
          title: isEn ? "Old Havana Walking Tour" : "Ιστορικό Κέντρο Αβάνας",
          desc: isEn ? "With Greek/English private guide" : "Περιήγηση στις 4 ιστορικές πλατείες",
          href: "/tours/periigisi-istoriko-kentro-avanas/",
          icon: MapPin,
        },
        {
          title: isEn ? "Catamaran Seafari Cruise" : "Seafari με Καταμαράν",
          desc: isEn ? "Reef snorkelling & lobster lunch" : "Κοράλλια, δελφίνια & γεύμα αστακού",
          href: "/tours/seafari-me-katamaran/",
          icon: Star,
        },
        {
          title: isEn ? "Authentic Cuba: Rum & History" : "Η Αυθεντική Κούβα: Ρούμι & Ιστορία",
          desc: isEn ? "Tasting & cultural deep dive" : "Γευσιγνωσία ρουμιού & τοπικός πολιτισμός",
          href: "/tours/i-afthentiki-kouva/",
          icon: BookOpen,
        },
        {
          title: isEn ? "Trinidad & Topes de Collantes" : "Τρινιδάδ & Topes de Collantes",
          desc: isEn ? "2-Day expedition to waterfalls" : "2ήμερη απόδραση σε βουνό & αποικιακή πόλη",
          href: "/tours/kouva-cienfuegos-trinidad-topesdecollantes/",
          icon: Compass,
        },
      ],
    },
    {
      id: "stays-transfers",
      label: isEn ? "Stays & Transfers" : "Διαμονή & Μεταφορές",
      href: "/diamoni-stin-kouva/",
      items: [
        {
          title: isEn ? "Stays (Hotels & Casas)" : "Διαμονή στην Κούβα",
          desc: isEn ? "5* Luxury resorts & heritage casas" : "Ξενοδοχεία 5* & παραδοσιακές casas",
          href: "/diamoni-stin-kouva/",
          icon: Building,
        },
        {
          title: isEn ? "Transfers & Chauffeurs" : "Μεταφορές στην Κούβα",
          desc: isEn ? "Private cars, Viazul & vintage fleet" : "Ιδιωτικά οχήματα & λεωφορεία Viazul",
          href: "/metafores-stin-kouva/",
          icon: Car,
        },
        {
          title: isEn ? "Hotel Melia Cohiba 5*" : "Hotel Melia Cohiba 5*",
          desc: isEn ? "Vedado luxury & Havana Cafe" : "Κορυφαίο ξενοδοχείο στο Vedado",
          href: "/hotel-melia-cohiba/",
          icon: Building,
        },
        {
          title: isEn ? "Iberostar Grand Packard 5*" : "Iberostar Grand Packard 5*",
          desc: isEn ? "Paseo del Prado luxury" : "Πολυτελές 5* στο ιστορικό κέντρο",
          href: "/hotel-iberostar-grand-packard-5/",
          icon: Star,
        },
      ],
    },
    {
      id: "guide-visa",
      label: isEn ? "Guide & Visa" : "Οδηγός & Βίζα",
      href: "/taxidi-stin-kouva/",
      items: [
        {
          title: isEn ? "Cuba Travel Guide" : "Ταξίδι στην Κούβα (Οδηγός)",
          desc: isEn ? "Essential briefing & insider tips" : "Πλήρης ταξιδιωτικός οδηγός",
          href: "/taxidi-stin-kouva/",
          icon: BookOpen,
        },
        {
          title: isEn ? "Cuba Electronic Visa (eVisa)" : "Ηλεκτρονική Βίζα (eVisa)",
          desc: isEn ? "Official 24h fast-track issuance" : "Έκδοση επίσημης τουριστικής βίζας",
          href: "/visa-gia-kouva/",
          icon: FileCheck2,
        },
        {
          title: isEn ? "Trip Planning Handbook" : "Οργάνωση Ταξιδιού στην Κούβα",
          desc: isEn ? "Flights, seasons & preparation" : "Πτήσεις, εποχές & προετοιμασία",
          href: "/organosi-taxidiou-stin-kouva/",
          icon: Compass,
        },
        {
          title: isEn ? "Cuba Vibe (Blog)" : "Cuba Vibe (Blog)",
          desc: isEn ? "Stories, gastronomy & secrets" : "Άρθρα, γαστρονομία & μυστικά",
          href: "/blog-cuba-vibe/",
          icon: BookOpen,
        },
        {
          title: isEn ? "Traveler Stories" : "Ταξιδιωτικές Ιστορίες",
          desc: isEn ? "Real reviews from honeymooners" : "Εμπειρίες & αφηγήσεις ταξιδιωτών",
          href: "/taxidiotikes-istories/",
          icon: MessageCircle,
        },
      ],
    },
  ];

  return (
    <>
      {/* 1. Top Authority & Trust Bar */}
      <div className="border-b border-[#222] bg-[#0b0b0b] px-3 py-1.5 text-xs text-white/85 sm:px-6">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-gold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>
                {isEn ? "GNTO License:" : "Άδεια ΕΟΤ:"}{" "}
                <strong className="text-white font-semibold">{SITE.mite}</strong>
              </span>
            </span>
            <span className="hidden text-white/30 sm:inline">•</span>
            <span className="hidden text-white/70 md:inline">
              {isEn ? "17+ Years Cuba Destination Specialist" : "17+ Χρόνια Εξειδίκευση"}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="hidden items-center gap-1 text-white/80 transition-colors hover:text-gold sm:inline-flex"
            >
              <Mail className="h-3.5 w-3.5 text-gold" />
              <span>{SITE.email}</span>
            </a>
            <span className="hidden text-white/30 sm:inline">•</span>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-1 font-semibold text-white transition-colors hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              <span>{SITE.phoneDisplay}</span>
            </a>
            <span className="text-white/30">•</span>
            <LanguageToggle locale={locale} pathname={pathname} variant="dark" />
          </div>
        </div>
      </div>

      {/* 2. Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md transition-all duration-200 shadow-xs">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-2.5 sm:px-6">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Logo locale={locale} size="header" />
          </div>

          {/* Desktop Dropdown Navigation */}
          <nav className="hidden items-center justify-center gap-x-1 lg:flex xl:gap-x-2">
            {NAV_SECTIONS.map((section) => {
              const active = current.startsWith(section.href);
              const isOpen = activeDropdown === section.id;

              return (
                <div
                  key={section.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(section.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={localizedPath(locale, section.href)}
                    className={`inline-flex items-center gap-1 rounded-sm px-3 py-1.5 text-[15px] font-semibold tracking-wide transition-colors ${
                      active
                        ? "text-gold-deep font-bold bg-paper"
                        : "text-ink hover:text-gold-deep hover:bg-paper"
                    }`}
                  >
                    <span>{section.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-gold-deep" : "text-muted"
                      }`}
                    />
                  </Link>

                  {/* Luxury Dropdown Panel */}
                  {isOpen && (
                    <div className="absolute left-0 top-full pt-1.5 z-50 w-80 sm:w-96 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="rounded-sm border border-line bg-white p-2.5 shadow-2xl ring-1 ring-black/5">
                        <div className="space-y-0.5">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={localizedPath(locale, item.href)}
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-start gap-3 rounded-sm p-2.5 transition-colors hover:bg-paper"
                              >
                                <div className="mt-0.5 rounded-sm bg-gold/10 p-1.5 text-gold-deep group-hover:bg-gold group-hover:text-ink transition-colors shrink-0">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-ink group-hover:text-gold-deep transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-muted line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Link: Contact */}
            <Link
              href={localizedPath(locale, "/epikoinonia/")}
              className={`rounded-sm px-3 py-1.5 text-[15px] font-semibold tracking-wide transition-colors ${
                current === "/epikoinonia/"
                  ? "text-gold-deep font-bold bg-paper"
                  : "text-ink hover:text-gold-deep hover:bg-paper"
              }`}
            >
              {isEn ? "Contact" : "Επικοινωνία"}
            </Link>
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* AI Itinerary Creator Highlight Button */}
            <Link
              href={localizedPath(locale, "/ai-planner/")}
              className="relative inline-flex items-center gap-1.5 rounded-full border border-gold bg-gradient-to-r from-gold/20 via-gold/35 to-gold/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:scale-[1.03] hover:border-gold-deep hover:bg-gold hover:text-white shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-deep animate-pulse" />
              <span>CUBA AI</span>
              <span className="rounded-full bg-gold-deep px-1.5 py-0.5 text-[9px] text-white font-bold">
                VIP
              </span>
            </Link>

            {/* Search Trigger */}
            <button
              type="button"
              aria-label={t(COPY.searchPlaceholder, locale)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all hover:border-gold hover:text-gold cursor-pointer"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Quote CTA */}
            <Link
              href={localizedPath(locale, "/epikoinonia/")}
              className="btn-gold !hidden sm:!inline-flex !py-1.5 !px-3.5 !text-xs !tracking-wider"
            >
              <span>{isEn ? "Request Quote" : "Ζητηστε Προσφορα"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Full-Screen Trigger */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-gold hover:text-gold lg:hidden cursor-pointer"
              aria-label={t(COPY.selectPage, locale)}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. FULL-SCREEN EDGE-TO-EDGE LUXURY MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0b] text-white animate-in fade-in duration-200 overflow-y-auto">
          {/* Top Bar of Mobile Menu */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/15 bg-[#0b0b0b]/95 px-4 py-3 backdrop-blur-md">
            <Logo locale={locale} variant="dark" size="header" />
            <div className="flex items-center gap-2.5">
              <LanguageToggle locale={locale} pathname={pathname} variant="dark" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/90 hover:border-gold hover:text-gold cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Marketing & Trust Indicators Strip */}
          <div className="bg-gradient-to-r from-[#141414] via-[#1a1813] to-[#141414] border-b border-gold/30 px-4 py-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-gold font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                <span>{isEn ? "GNTO License:" : "Άδεια ΕΟΤ:"} <strong>{SITE.mite}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-white/80">
                <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                <span>{isEn ? "420+ Expeditions" : "420+ Αποστολές"}</span>
              </div>
            </div>
          </div>

          {/* AI Architect Hero Feature Banner inside Menu */}
          <div className="p-4">
            <Link
              href={localizedPath(locale, "/ai-planner/")}
              onClick={() => setOpen(false)}
              className="group relative block overflow-hidden rounded-sm border border-gold/70 bg-gradient-to-br from-[#1a1710] to-[#0f0e0a] p-3.5 shadow-lg transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="rounded-full bg-gold p-1 text-ink">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">
                    CUBA AI
                  </span>
                </div>
                <span className="rounded-full bg-gold/20 px-1.5 py-0.5 text-[10px] font-bold text-gold border border-gold/40">
                  VIP
                </span>
              </div>

              <h3 className="mt-1.5 font-editorial text-lg font-normal text-white group-hover:text-gold-light">
                {isEn
                  ? "Build Your Dream Cuba Itinerary in 30 Seconds"
                  : "Δημιουργήστε το Προσωπικό σας Πρόγραμμα σε 30''"}
              </h3>

              <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold">
                <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          {/* Categorized Navigation Explorer */}
          <div className="flex-1 px-4 pb-4">
            <div className="space-y-4">
              {NAV_SECTIONS.map((sec) => (
                <div key={sec.id}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold/80 border-b border-white/10 pb-1.5">
                    {sec.label}
                  </p>
                  <div className="mt-1.5 grid grid-cols-1 gap-0.5">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={localizedPath(locale, item.href)}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-2.5 text-base font-medium text-white/90 hover:text-gold transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="h-4 w-4 text-gold/70" />
                            <span>{item.title}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-white/30" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Contact Link in Mobile Menu */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold/80 border-b border-white/10 pb-1.5">
                  {isEn ? "Direct Contact" : "Επικοινωνια"}
                </p>
                <div className="mt-1.5">
                  <Link
                    href={localizedPath(locale, "/epikoinonia/")}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-2.5 text-base font-medium text-white/90 hover:text-gold transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-3.5 w-3.5 text-gold/70" />
                      <span>{isEn ? "Offices & Direct Phone" : "Γραφεία & Τηλέφωνα"}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-white/30" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Footer in Full-Screen Drawer */}
          <div className="sticky bottom-0 z-20 border-t border-white/15 bg-[#0b0b0b] p-4">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-1.5 rounded-sm border border-gold/40 bg-white/5 py-2.5 text-sm font-semibold text-white hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <Link
                href={localizedPath(locale, "/epikoinonia/")}
                onClick={() => setOpen(false)}
                className="btn-gold !py-2.5 !text-sm text-center"
              >
                <span>{isEn ? "Request Quote" : "Ζητηστε Προσφορα"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Instant Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[110] flex flex-col bg-[#0b0b0b]/95 p-4 backdrop-blur-xl animate-in fade-in duration-200 sm:p-6 md:p-12">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between border-b border-white/20 pb-4">
            <span className="font-serif text-xl tracking-wide text-gold">
              GO CUBA / {isEn ? "Search Destinations & Stays" : "Αναζήτηση Προορισμών"}
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setQ("");
              }}
              className="rounded-full border border-white/20 p-2 text-white/80 transition-colors hover:border-gold hover:text-gold cursor-pointer"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-auto mt-8 w-full max-w-4xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (results[0]) {
                  router.push(localizedPath(locale, results[0].path));
                  setSearchOpen(false);
                }
              }}
              className="relative"
            >
              <input
                autoFocus
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={
                  isEn
                    ? "Type e.g. Havana, Viñales, Melia Hotel, eVisa, Honeymoon..."
                    : "Πληκτρολογήστε π.χ. Αβάνα, Βινιάλες, Ξενοδοχείο Melia, Βίζα..."
                }
                className="w-full border-b-2 border-gold bg-transparent py-4 text-xl font-light text-white placeholder-white/40 outline-none sm:text-2xl"
              />
              <Search className="absolute right-2 top-5 h-6 w-6 text-gold" />
            </form>

            <div className="mt-8 max-h-[60vh] overflow-y-auto pr-2">
              {q.trim() && results.length === 0 && (
                <p className="py-8 text-center text-white/60">
                  {isEn
                    ? "No matching results found. Try a different search term."
                    : "Δεν βρέθηκαν αποτελέσματα. Δοκιμάστε άλλον όρο αναζήτησης."}
                </p>
              )}

              {results.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {results.map((r) => (
                    <Link
                      key={r.path}
                      href={localizedPath(locale, r.path)}
                      onClick={() => {
                        setSearchOpen(false);
                        setQ("");
                      }}
                      className="group flex flex-col rounded-sm border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-gold hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between text-xs text-gold">
                        <span className="uppercase tracking-wider">
                          {r.kind === "hotel"
                            ? isEn ? "Hotel" : "Ξενοδοχείο"
                            : r.kind === "tour"
                            ? isEn ? "Tour" : "Εκδρομή"
                            : isEn ? "Page" : "Σελίδα"}
                        </span>
                        <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <h4 className="mt-1 font-serif text-lg font-medium text-white group-hover:text-gold-light">
                        {titleOf(r, locale)}
                      </h4>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LanguageToggle({
  locale,
  pathname,
  variant = "light",
}: {
  locale: Locale;
  pathname: string;
  variant?: "light" | "dark";
}) {
  const other: Locale = locale === "el" ? "en" : "el";
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line/40 p-0.5 text-xs font-semibold">
      <Link
        href={locale === "el" ? pathname : switchLocale(pathname, "el")}
        className={`rounded-full px-2.5 py-0.5 transition-colors ${
          locale === "el"
            ? "bg-gold text-ink font-bold shadow-xs"
            : variant === "dark"
            ? "text-white/70 hover:text-white"
            : "text-ink/70 hover:text-ink"
        }`}
        hrefLang="el"
      >
        EL
      </Link>
      <Link
        href={locale === "en" ? pathname : switchLocale(pathname, "en")}
        className={`rounded-full px-2.5 py-0.5 transition-colors ${
          locale === "en"
            ? "bg-gold text-ink font-bold shadow-xs"
            : variant === "dark"
            ? "text-white/70 hover:text-white"
            : "text-ink/70 hover:text-ink"
        }`}
        hrefLang="en"
      >
        EN
      </Link>
    </div>
  );
}
