"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building,
  Heart,
  Star,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Phone,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { visibleHotels, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";

export default function StaysHub({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const hotels = visibleHotels();

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <section className="relative min-h-[44vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src="https://www.skydream.gr/wp-content/uploads/Melia-Cohiba-Hotel-Havana-General-View-1024x576.jpg"
          alt="Stay in Cuba"
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
              <span>HANDPICKED 5* RESORTS & CASAS PARTICULARES</span>
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              {isEn ? "Stay in Cuba: Hotels & Casas" : "Διαμονή στην Κούβα: Ξενοδοχεία & Casas"}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 font-light leading-relaxed">
              {isEn
                ? "From the pinnacle of 5-star colonial luxury in Havana to charming private casas particulares and all-inclusive Caribbean beach resorts."
                : "Από τα κορυφαία 5* ιστορικά ξενοδοχεία της Αβάνας μέχρι αυθεντικά παραδοσιακά αρχοντικά και παραθαλάσσια all-inclusive θέρετρα."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Comparison: 5* Hotels vs Casas Particulares */}
      <section className="border-b border-line bg-paper py-14">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* 5* Hotels Box */}
            <div className="rounded-sm border border-line bg-white p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold/15 p-2 text-gold-deep">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep">
                    PREMIUM LUXURY
                  </span>
                  <h3 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "5-Star International Hotels" : "5* Διεθνή Ξενοδοχεία"}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted leading-relaxed">
                {isEn
                  ? "Properties managed by top European chains (Melia, Iberostar). Executive floors with private butler service (The Level), rooftop infinity pools, gourmet dining, and high-speed Wi-Fi."
                  : "Ξενοδοχεία κορυφαίων ομίλων (Melia, Iberostar). Όροφοι The Level με προσωπικό μπάτλερ, πισίνες με θέα το Malecón, a-la-carte εστιατόρια και premium ανέσεις."}
              </p>
            </div>

            {/* Casas Particulares Box */}
            <div className="rounded-sm border border-line bg-white p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold/15 p-2 text-gold-deep">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep">
                    AUTHENTIC CUBAN CHARM
                  </span>
                  <h3 className="font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Boutique Casas Particulares" : "Boutique Casas Particulares"}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted leading-relaxed">
                {isEn
                  ? "Privately owned colonial mansions lovingly restored with high ceilings, antique tiles, and private suites. Warm Cuban hospitality, fresh breakfasts, and prime Old Havana locations."
                  : "Αναπαλαιωμένα αποικιακά αρχοντικά με ψηλά ταβάνια και ιδιωτικές σουίτες. Ζεστή φιλοξενία, σπιτικό πρωινό και άμεση επαφή με την αυθεντική καθημερινότητα της Κούβας."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Stays Catalog Grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
              {isEn ? "CURATED CATALOG" : "ΕΠΙΛΕΓΜΕΝΑ ΚΑΤΑΛΥΜΑΤΑ"}
            </span>
            <h2 className="mt-1 font-editorial text-3xl font-normal text-ink">
              {isEn ? "Explore Stays in Havana & the Cayos" : "Εξερευνήστε Καταλύματα σε Αβάνα & Cayos"}
            </h2>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((h) => {
            const title = titleOf(h, locale);
            const stars = h.hotel?.stars;
            const thumb = h.images[0] || h.thumb || "https://www.skydream.gr/wp-content/uploads/Melia-Cohiba-Hotel-Havana-General-View-1024x576.jpg";

            return (
              <article
                key={h.path}
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
                  {stars ? (
                    <div className="absolute top-3 left-3 flex gap-0.5 rounded-sm bg-black/85 px-2.5 py-1 text-xs text-gold backdrop-blur-xs ring-1 ring-gold/40">
                      {"★".repeat(stars)}
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink">
                      Boutique Casa
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-editorial text-2xl font-normal leading-snug text-ink group-hover:text-gold-deep">
                      <Link href={localizedPath(locale, h.path)}>{title}</Link>
                    </h3>
                    {h.hotel?.address && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                        <MapPin className="h-3.5 w-3.5 text-gold-deep shrink-0" />
                        <span className="line-clamp-1">{h.hotel.address}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                    <span className="text-xs text-muted">
                      {stars ? `${stars}-Star Hotel` : "Boutique Stay"}
                    </span>
                    <Link
                      href={localizedPath(locale, h.path)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                    >
                      <span>{isEn ? "View Details" : "Πληροφορίες & Κράτηση"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
