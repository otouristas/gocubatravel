"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Bus,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Phone,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { localizedPath } from "@/lib/i18n";

export default function TransfersHub({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  const options = [
    {
      icon: Car,
      title: isEn ? "Private Chauffeur & Transfers" : "Ιδιωτικές Μεταφορές με Οδηγό",
      desc: isEn
        ? "Modern air-conditioned private vehicles or vintage American classics with professional drivers. Total flexibility, door-to-door comfort, and photo stops on demand."
        : "Σύγχρονα κλιματιζόμενα οχήματα ή vintage κλασικά αυτοκίνητα με επαγγελματία οδηγό. Απόλυτη άνεση, ευελιξία στάσεων και μεταφορά από πόρτα σε πόρτα.",
      badge: isEn ? "Most Comfortable" : "Μέγιστη Άνεση",
      routes: [
        "Havana Airport (HAV) ⇄ Central Havana / Vedado / Miramar",
        "Havana ⇄ Viñales Valley (Pinar del Río)",
        "Havana ⇄ Cienfuegos & Trinidad",
        "Trinidad ⇄ Cayo Santa María / Cayo Coco",
        "Havana ⇄ Varadero Resorts",
      ],
    },
    {
      icon: Bus,
      title: isEn ? "Viazul Tourist Bus Network" : "Τουριστικό Λεωφορείο Viazul",
      desc: isEn
        ? "Scheduled intercity coach service connecting major Cuban destinations. Punctual, air-conditioned, and cost-effective for independent travelers."
        : "Προγραμματισμένα δρομολόγια υπεραστικών λεωφορείων που συνδέουν όλες τις μεγάλες πόλεις της Κούβας. Οικονομική και αξιόπιστη λύση.",
      badge: isEn ? "Budget Friendly" : "Οικονομική Επιλογή",
      routes: [
        "Havana ⇄ Viñales (Daily departures)",
        "Havana ⇄ Cienfuegos & Trinidad (Daily departures)",
        "Trinidad ⇄ Santa Clara ⇄ Varadero",
        "Havana ⇄ Santiago de Cuba",
      ],
    },
    {
      icon: Sparkles,
      title: isEn ? "Classic Vintage Car Excursions" : "Κλασικά Αυτοκίνητα του '50",
      desc: isEn
        ? "Authentic 1950s convertibles (Chevrolet, Cadillac, Buick) for panoramic city tours, Malecón sunset cruises, and day trips to Cojímar / Ernest Hemingway spots."
        : "Αυθεντικά ανοιχτά αμερικάνικα αυτοκίνητα του 1950 για πανοραμικές βόλτες στην Αβάνα, το Malecón και εξορμήσεις στο Cojímar του Ernest Hemingway.",
      badge: isEn ? "Iconic Cuba" : "Κλασική Εμπειρία",
      routes: [
        "Havana City Panoramic Tour (2h / 4h)",
        "Sunset Malecón & Miramar Mansions Cruise",
        "Ernest Hemingway Tour (Finca Vigía & Cojímar)",
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Header */}
      <section className="relative min-h-[44vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src="https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg"
          alt="Transfers in Cuba"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[44vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>CHAUFFEUR & ROAD TRANSFERS</span>
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              {isEn ? "Transfers in Cuba" : "Μεταφορές στην Κούβα"}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 font-light leading-relaxed">
              {isEn
                ? "Reliable private chauffeur transfers, Viazul bus network booking, and classic vintage convertible tours with local support."
                : "Αξιόπιστες ιδιωτικές οδικές μεταφορές, κρατήσεις δικτύου λεωφορείων Viazul και κλασικά vintage αυτοκίνητα με τοπική υποστήριξη."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                {isEn ? "FLEET & OPTIONS" : "ΕΠΙΛΟΓΕΣ ΜΕΤΑΚΙΝΗΣΗΣ"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink">
                {isEn ? "How to Get Around Cuba Safely & Comfortably" : "Πώς να μετακινηθείτε στην Κούβα με ασφάλεια & άνεση"}
              </h2>
            </div>

            <div className="space-y-6">
              {options.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={idx}
                    className="luxury-card rounded-sm border border-line bg-paper p-6 transition-all hover:border-gold/60"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-gold/15 p-2 text-gold-deep">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-editorial text-2xl font-normal text-ink">{opt.title}</h3>
                      </div>
                      <span className="rounded-full bg-gold/20 text-gold-deep border border-gold/40 px-3 py-0.5 text-[10px] font-bold uppercase">
                        {opt.badge}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-ink/85 font-light leading-relaxed">{opt.desc}</p>

                    <div className="mt-5 border-t border-line/40 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                        {isEn ? "Popular Routes & Services:" : "Δημοφιλή Δρομολόγια & Υπηρεσίες:"}
                      </p>
                      <ul className="space-y-1.5">
                        {opt.routes.map((r, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-ink font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5 text-gold-deep shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Transfer Quote Form */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <div className="border-b border-line pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                    {isEn ? "INSTANT TRANSFER INQUIRY" : "ΚΡΑΤΗΣΗ ΜΕΤΑΦΟΡΑΣ"}
                  </span>
                  <p className="mt-1 font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Request Chauffeur Quote" : "Ζητήστε Προσφορά Μεταφοράς"}
                  </p>
                </div>

                <div className="py-4">
                  <EnquiryForm locale={locale} subject="Cuba Transfers & Chauffeur Inquiry" />
                </div>
              </div>

              <div className="rounded-sm border border-line bg-white p-5 text-xs text-muted space-y-2">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{isEn ? "Licensed Drivers & Vehicles" : "Επίσημα Αδειοδοτημένα Οχήματα"}</span>
                </div>
                <p>
                  {isEn
                    ? "All drivers are vetted, experienced, and hold passenger transport insurance."
                    : "Όλοι οι οδηγοί μας διαθέτουν επαγγελματική άδεια μεταφορών και ασφάλεια επιβατών."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
