"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Sun,
  Coins,
  CreditCard,
  Wifi,
  Utensils,
  ShieldCheck,
  ShoppingBag,
  HelpCircle,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Phone,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { localizedPath } from "@/lib/i18n";

export default function TravelGuideHub({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  const topics = [
    {
      icon: Sun,
      title: isEn ? "Weather & Packing Tips" : "Καιρός & Τι να πάρετε μαζί",
      desc: isEn
        ? "Year-round tropical climate (26-30°C). Lightweight breathable cotton clothing, comfortable walking shoes, and sun protection are essential."
        : "Τροπικό κλίμα όλο το χρόνο (26-30°C). Προτείνονται ελαφριά βαμβακερά ρούχα, άνετα παπούτσια περιπάτου και αντιηλιακή προστασία.",
    },
    {
      icon: Coins,
      title: isEn ? "Currency & Currency Exchange" : "Συνάλλαγμα & Χαρτονομίσματα",
      desc: isEn
        ? "Official currency is the Cuban Peso (CUP). Cash Euros (EUR) are widely accepted and best for on-ground exchange at hotels and banks (CADECA)."
        : "Επίσημο νόμισμα είναι το Πέσο Κούβας (CUP). Τα μετρητά σε Ευρώ (EUR) είναι ευρέως αποδεκτά και ιδανικά για τοπική ανταλλαγή.",
    },
    {
      icon: CreditCard,
      title: isEn ? "Credit Cards & Payments" : "Πιστωτικές Κάρτες & Πληρωμές",
      desc: isEn
        ? "Visa and Mastercard (issued by non-US banks) work at major hotels and official restaurants. Always carry sufficient cash for private casas and paladares."
        : "Κάρτες Visa και Mastercard (μη αμερικανικών τραπεζών) γίνονται δεκτές σε ξενοδοχεία. Έχετε πάντα μαζί μετρητά για casas και τοπικά εστιατόρια.",
    },
    {
      icon: Wifi,
      title: isEn ? "Internet & Roaming" : "Ίντερνετ & Επικοινωνία",
      desc: isEn
        ? "Wi-Fi is available in all 5-star hotels and central squares. Tourist eSIM / SIM cards (Cubacel Tur) can be pre-ordered for continuous mobile data."
        : "Wi-Fi διαθέσιμο σε όλα τα 5* ξενοδοχεία και πλατείες. Μπορείτε να προμηθευτείτε τουριστική κάρτα SIM (Cubacel Tur) για mobile data.",
    },
    {
      icon: Utensils,
      title: isEn ? "Fine Dining & Paladares" : "Κουβανική Γαστρονομία & Paladares",
      desc: isEn
        ? "Experience private gourmet restaurants (Paladares) such as La Guarida and San Cristóbal in Havana, offering fresh lobster, ropa vieja, and mojitos."
        : "Δοκιμάστε ιδιωτικά γκουρμέ εστιατόρια (Paladares) όπως το La Guarida και το San Cristóbal για φρέσκο αστακό, ropa vieja και αυθεντικά mojitos.",
    },
    {
      icon: FileCheck2,
      title: isEn ? "Cuba eVisa & Medical Insurance" : "Ηλεκτρονική Βίζα (eVisa) & Ασφάλεια",
      desc: isEn
        ? "Mandatory electronic visa (eVisa) and travel medical insurance covering emergency care. GO CUBA issues official eVisas with 24h approval."
        : "Υποχρεωτική ηλεκτρονική τουριστική βίζα (eVisa) και ταξιδιωτική ασφάλεια. Η GO CUBA εκδίδει άμεσα επίσημες ηλεκτρονικές βίζες.",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <section className="relative min-h-[46vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src="https://www.skydream.gr/wp-content/uploads/cuba-tours-custom-pub-cuban-drink-tasting-skydream-travel.jpg"
          alt="Cuba Travel Guide"
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
              <span>{isEn ? "COMPREHENSIVE CUBA TRAVEL GUIDE" : "ΠΛΗΡΗΣ ΟΔΗΓΟΣ ΤΑΞΙΔΙΟΥ ΣΤΗΝ ΚΟΥΒΑ"}</span>
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              {isEn ? "Travel to Cuba: Planning & VIP Insights" : "Ταξίδι στην Κούβα: Οργάνωση & Συμβουλές"}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 font-light leading-relaxed">
              {isEn
                ? "Discover the real magic of Cuba with expert on-ground guidance. Stays, chauffeur transfers, guided tours, and pre-departure briefings."
                : "Ανακαλύψτε την αληθινή μαγεία της Κούβας με εξειδικευμένη καθοδήγηση. Διαμονή, ιδιωτικές μεταφορές, εκδρομές και VIP ενημέρωση πριν την αναχώρηση."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            {/* VIP Pre-departure Briefing Topics */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                {isEn ? "ESSENTIAL BRIEFING" : "ΒΑΣΙΚΑ ΘΕΜΑΤΑ ΠΡΟΕΤΟΙΜΑΣΙΑΣ"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink">
                {isEn
                  ? "Everything You Need to Know Before Departure"
                  : "Όλα όσα πρέπει να γνωρίζετε πριν πετάξετε"}
              </h2>
              <p className="mt-3 text-sm text-muted">
                {isEn
                  ? "In our special consultation meetings we prepare you thoroughly with practical guidance for a seamless experience."
                  : "Στις ειδικές ενημερωτικές συναντήσεις μας αναλύουμε κάθε πρακτική λεπτομέρεια για να απολαύσετε το ταξίδι σας χωρίς απρόοπτα."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {topics.map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={idx}
                      className="luxury-card rounded-sm border border-line bg-paper p-5 transition-all hover:border-gold/60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-gold/15 p-2 text-gold-deep">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-editorial text-xl font-normal text-ink">{t.title}</h3>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted">{t.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Travel Essentials Download Banner */}
            <div className="rounded-sm border-2 border-gold/40 bg-[#0b0b0b] p-8 text-white shadow-xl">
              <span className="gold-badge mb-3">
                <FileCheck2 className="h-3.5 w-3.5 text-gold" />
                <span>FREE DOWNLOAD</span>
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white">
                {isEn
                  ? "Download the Cuba Travel Planning Toolkit"
                  : "Κατεβάστε τον Οδηγό Σχεδιασμού Ταξιδιού"}
              </h3>
              <p className="mt-3 text-sm text-white/80 font-light leading-relaxed">
                {isEn
                  ? "Our complete offline checklist containing emergency contacts, restaurant recommendations, currency conversion tables, and packing lists."
                  : "Το πλήρες ψηφιακό βοήθημα με τηλέφωνα ανάγκης, προτάσεις εστιατορίων, πίνακες συναλλάγματος και συμβουλές ασφαλείας."}
              </p>
              <div className="mt-6">
                <a
                  href="https://bit.ly/CubaTravelEssentials"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                >
                  <span>{isEn ? "Get Cuba Toolkit (PDF)" : "Λήψη Οδηγού (PDF)"}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Consultation Form */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <div className="border-b border-line pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                    {isEn ? "PERSONAL CONSULTATION" : "ΣΥΜΒΟΥΛΕΥΤΙΚΗ ΣΥΝΑΝΤΗΣΗ"}
                  </span>
                  <p className="mt-1 font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Plan Your Trip with Our Specialists" : "Σχεδιάστε το Ταξίδι με τους Ειδικούς"}
                  </p>
                </div>

                <div className="py-4">
                  <EnquiryForm locale={locale} subject="General Cuba Travel Consultation" />
                </div>
              </div>

              <div className="rounded-sm border border-line bg-white p-5 text-xs text-muted space-y-2">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{isEn ? "GNTO Licensed Operator" : "Επίσημη Άδεια ΕΟΤ"}</span>
                </div>
                <p>
                  {isEn
                    ? `GNTO License ${SITE.mite}. Trusted by thousands of travelers over 17+ years.`
                    : `Αρ. ΜΗΤΕ ${SITE.mite}. Εμπιστοσύνη χιλιάδων ταξιδιωτών εδώ και 17+ χρόνια.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
