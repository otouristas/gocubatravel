"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Calendar,
  Heart,
  Sparkles,
  Car,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import { records } from "@/content/records";
import { localizedPath } from "@/lib/i18n";
import { titleOf } from "@/lib/content";
import { PACKAGE_CATEGORIES } from "@/lib/routes";

export default function PackagesHub({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const [filter, setFilter] = useState<string>("all");

  // Actual itineraries only: category archives (/…/omadika-taxidia/) get their own landing pages.
  const allPackages = records.filter(
    (r) =>
      r.path.startsWith("/paketa-diakopon-gia-kouva/") &&
      !PACKAGE_CATEGORIES.has(r.path) &&
      r.path !== "/paketa-diakopon-gia-kouva/" &&
      !r.aliasOf
  );

  const filtered = allPackages.filter((p) => {
    if (filter === "all") return true;
    if (filter === "atomika") return p.path.includes("atomika-taxidia");
    if (filter === "omadika") return p.path.includes("omadika-taxidia");
    if (filter === "gamilia") return p.path.includes("gamilia-taxidia");
    if (filter === "road-trips") return p.path.includes("road-trips");
    if (filter === "thematika") return p.path.includes("thematika-taxidia");
    return true;
  });

  return (
    <div className="bg-white">
      {/* 1. Hero Header */}
      <section className="relative min-h-[42vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src="https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg"
          alt="Cuba Holiday Packages"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[42vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>{isEn ? "CURATED CUBA EXPEDITIONS 2026" : "ΟΛΟΚΛΗΡΩΜΕΝΑ ΠΑΚΕΤΑ ΔΙΑΚΟΠΩΝ 2026"}</span>
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              {isEn ? "Cuba Holiday Packages" : "Πακέτα Διακοπών για Κούβα"}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 font-light leading-relaxed">
              {isEn
                ? "Bespoke private journeys, small-group cultural expeditions, luxury honeymoons, and self-drive island road trips."
                : "Ατομικά ταξίδια με ιδιωτικές παροχές, ομαδικά προγράμματα, γαμήλια πακέτα και αυθεντικά road trips με τοπική καθοδήγηση."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter Tabs Bar */}
      <div className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto px-6 py-3 lg:px-12 scrollbar-none">
          {[
            { id: "all", label: isEn ? "All Packages" : "Όλα τα Πακέτα" },
            { id: "atomika", label: isEn ? "Private (Ατομικά)" : "Ατομικά Ταξίδια" },
            { id: "omadika", label: isEn ? "Group (Ομαδικά)" : "Ομαδικά Ταξίδια" },
            { id: "gamilia", label: isEn ? "Honeymoon (Γαμήλια)" : "Γαμήλια Ταξίδια" },
            { id: "thematika", label: isEn ? "Thematic (Θεματικά)" : "Θεματικά Ταξίδια" },
            { id: "road-trips", label: isEn ? "Road Trips" : "Cuba Road Trips" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-gold text-ink font-bold shadow-xs"
                  : "bg-paper text-muted hover:text-ink border border-line"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Category landings */}
      <div className="mx-auto max-w-[1400px] px-6 pt-12 lg:px-12">
        <div className="flex flex-wrap gap-3">
          {[...PACKAGE_CATEGORIES].map((categoryPath) => {
            const category = records.find((r) => r.path === categoryPath);
            if (!category) return null;
            return (
              <Link
                key={categoryPath}
                href={localizedPath(locale, categoryPath)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-gold hover:text-gold-deep"
              >
                <span>{titleOf(category, locale)}</span>
                <ArrowRight className="h-3 w-3 text-gold-deep" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Package Cards Grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg) => {
            const title = titleOf(pkg, locale);
            const isHoneymoon = pkg.path.includes("gamilia-taxidia");
            const isGroup = pkg.path.includes("omadika-taxidia");
            const isRoadTrip = pkg.path.includes("road-trips");
            const isThematic = pkg.path.includes("thematika-taxidia");

            const badge = isHoneymoon
              ? isEn ? "Honeymoon" : "Γαμήλιο"
              : isGroup
              ? isEn ? "Group Tour" : "Ομαδικό"
              : isRoadTrip
              ? isEn ? "Road Trip" : "Road Trip"
              : isThematic
              ? isEn ? "Thematic" : "Θεματικό"
              : isEn ? "Private" : "Ατομικό";

            const thumb = pkg.images[0] || pkg.thumb || "https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg";

            return (
              <article
                key={pkg.path}
                className="luxury-card group flex flex-col overflow-hidden rounded-sm border border-line bg-paper"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                  <Image
                    src={thumb}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm">
                    {badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-editorial text-2xl font-normal leading-snug text-ink group-hover:text-gold-deep">
                      <Link href={localizedPath(locale, pkg.path)}>{title}</Link>
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted">
                      {isEn ? pkg.excerptEn : pkg.excerptEl}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                    <span className="text-[11px] font-medium text-muted flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-gold-deep" />
                      <span>{isEn ? "Organised Services" : "Οργανωμένες Παροχές"}</span>
                    </span>
                    <Link
                      href={localizedPath(locale, pkg.path)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                    >
                      <span>{isEn ? "View Itinerary" : "Πρόγραμμα & Τιμές"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* AI Itinerary Creator Callout Box */}
        <div className="mt-16 rounded-sm border-2 border-gold/60 bg-[#0b0b0b] p-8 sm:p-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="gold-badge mb-3">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span>CUBA AI</span>
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-white">
                {isEn ? "Want a 100% Tailor-Made Route?" : "Επιθυμείτε Εξατομικευμένο Πρόγραμμα;"}
              </h2>
              <p className="mt-2 text-sm font-light text-white/80 leading-relaxed">
                {isEn
                  ? "Use CUBA AI to choose your preferred cities, boutique stays, and pace in 30 seconds."
                  : "Χρησιμοποιήστε το CUBA AI για να επιλέξετε πόλεις, ξενοδοχεία και ρυθμό ταξιδιού σε 30 δευτερόλεπτα."}
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
