"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { localizedPath } from "@/lib/i18n";

const APPLY_URL =
  "https://hello.dubsado.com/public/form/view/609057c3fa62f4365209242d";
const APPLY_USA_URL =
  "https://hello.dubsado.com/public/form/view/63f8b37b8dfab2a27a85c54d";

const PACKAGES = [
  {
    image: "/visa/visa-only.jpg",
    price: "40€",
    durationEl: "Παραμονή έως 90 ημέρες",
    durationEn: "Stay up to 90 days",
    titleEl: "Ηλεκτρονική Τουριστική Βίζα",
    titleEn: "Electronic Tourist Visa",
    bulletsEl: [
      "ΔΩΡΟ: PDF πρακτικών πληροφοριών και βίντεο D Viajeros",
      "Έκδοση αυθημερόν +10€",
    ],
    bulletsEn: [
      "Gift: practical Cuba PDF and D Viajeros video",
      "Same-day issue +10€",
    ],
  },
  {
    image: "/visa/ins-3-8.jpg",
    price: "75€",
    durationEl: "Ταξίδι 3 έως 8 ημέρες",
    durationEn: "Trip 3 to 8 days",
    titleEl: "Βίζα και ασφάλεια",
    titleEn: "Visa and insurance",
    bulletsEl: [
      "Ηλεκτρονική βίζα και ταξιδιωτική ασφάλεια",
      "Ιατροφαρμακευτική κάλυψη για τις ημέρες του ταξιδιού",
    ],
    bulletsEn: [
      "Electronic visa and travel insurance",
      "Medical cover for the travel dates",
    ],
  },
  {
    image: "/visa/ins-9-16.jpg",
    price: "95€",
    durationEl: "Ταξίδι 9 έως 16 ημέρες",
    durationEn: "Trip 9 to 16 days",
    titleEl: "Βίζα και ασφάλεια",
    titleEn: "Visa and insurance",
    bulletsEl: [
      "Ηλεκτρονική βίζα και ταξιδιωτική ασφάλεια",
      "Ιατροφαρμακευτική κάλυψη για τις ημέρες του ταξιδιού",
    ],
    bulletsEn: [
      "Electronic visa and travel insurance",
      "Medical cover for the travel dates",
    ],
  },
  {
    image: "/visa/visa-only.jpg",
    price: "140€",
    durationEl: "Ταξίδι 17 έως 30 ημέρες",
    durationEn: "Trip 17 to 30 days",
    titleEl: "Βίζα και ασφάλεια",
    titleEn: "Visa and insurance",
    bulletsEl: [
      "Ηλεκτρονική βίζα και ταξιδιωτική ασφάλεια",
      "Ιατροφαρμακευτική κάλυψη για τις ημέρες του ταξιδιού",
    ],
    bulletsEn: [
      "Electronic visa and travel insurance",
      "Medical cover for the travel dates",
    ],
  },
] as const;

export default function VisaHub({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  const steps = [
    {
      num: "1",
      title: isEn ? "Submit Passport Details Online" : "Συμπλήρωση Στοιχείων Διαβατηρίου",
      desc: isEn
        ? "Fill out our simplified visa request form with your passport details (must be valid for at least 6 months beyond travel dates)."
        : "Συμπληρώνετε τη φόρμα με τα στοιχεία του διαβατηρίου σας (απαιτείται ελάχιστη ισχύς 6 μηνών από την ημερομηνία εισόδου).",
    },
    {
      num: "2",
      title: isEn ? "Fast Official Processing (24h)" : "Επίσημη Έκδοση εντός 24 Ωρών",
      desc: isEn
        ? "Our authorized team processes your electronic tourist visa directly with Cuban immigration authorities."
        : "Το γραφείο μας προχωρά στην επίσημη καταχώρηση και έκδοση της ηλεκτρονικής βίζας (eVisa).",
    },
    {
      num: "3",
      title: isEn ? "Receive eVisa via Email & QR Code" : "Παραλαβή eVisa & Κωδικού QR στο Email",
      desc: isEn
        ? "You receive your electronic tourist card with personal QR code to present upon airline check-in and arrival in Cuba."
        : "Λαμβάνετε την ηλεκτρονική τουριστική κάρτα με το προσωπικό σας QR code για άμεση επίδειξη στο αεροδρόμιο.",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <section className="relative min-h-[44vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src="https://www.skydream.gr/wp-content/uploads/Cuba-Travel-Essentials-Skydream-Travel-scaled.jpg"
          alt="Cuba eVisa"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[44vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>OFFICIAL ELECTRONIC TOURIST VISA (eVISA)</span>
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              {isEn ? "Cuba Electronic Visa (eVisa)" : "Ηλεκτρονική Βίζα για Κούβα"}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 font-light leading-relaxed">
              {isEn
                ? "Official tourist visa processing for entry to Cuba. Fast 24-hour approval, electronic QR code delivery, and full travel document guidance."
                : "Έκδοση επίσημης ηλεκτρονικής τουριστικής βίζας για είσοδο στην Κούβα. Άμεση έγκριση εντός 24 ωρών και παράδοση με QR code στο email σας."}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
              {isEn ? "PACKAGES" : "ΠΑΚΕΤΑ ΕΚΔΟΣΗΣ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn ? "Visa and insurance packages" : "Πακέτα βίζας και ασφάλειας"}
            </h2>
            <p className="mt-4 rounded-sm border-l-4 border-gold bg-white px-4 py-3 text-sm leading-relaxed text-ink">
              {isEn ? (
                <>
                  Listed prices are <strong>per person</strong> for the listed services.
                  Cuba travel briefing when you collect your documents is an extra{" "}
                  <strong>50€</strong>.
                </>
              ) : (
                <>
                  Οι αναγραφόμενες τιμές είναι <strong>ΑΝΑ ΑΤΟΜΟ</strong> για τις
                  αναγραφόμενες υπηρεσίες. Η παροχή πληροφοριών για την Κούβα κατά την
                  παραλαβή των ταξιδιωτικών εγγράφων γίνεται με{" "}
                  <strong>επιπλέον χρέωση 50€</strong>.
                </>
              )}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {PACKAGES.map((pkg) => (
              <article
                key={`${pkg.price}-${pkg.durationEl}`}
                className="luxury-card flex flex-col overflow-hidden rounded-sm border border-line bg-white"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper">
                  <Image
                    src={pkg.image}
                    alt={isEn ? pkg.titleEn : pkg.titleEl}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold-deep">
                    {isEn ? pkg.durationEn : pkg.durationEl}
                  </p>
                  <h3 className="mt-1 font-editorial text-xl font-normal leading-snug text-ink">
                    {isEn ? pkg.titleEn : pkg.titleEl}
                  </h3>
                  <p className="mt-2 font-editorial text-3xl font-normal text-ink">
                    {pkg.price}{" "}
                    <span className="text-sm font-sans font-normal text-muted">
                      {isEn ? "/ person" : "/ άτομο"}
                    </span>
                  </p>
                  <ul className="mt-3 flex-1 space-y-1.5 text-xs leading-relaxed text-muted">
                    {(isEn ? pkg.bulletsEn : pkg.bulletsEl).map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-1 rounded-sm bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ink hover:bg-gold-light"
                  >
                    {isEn ? "Online application" : "Online Αίτηση"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <a
            href={APPLY_USA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex flex-col gap-2 rounded-sm bg-[#D00000] px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-editorial text-lg font-normal leading-snug sm:text-xl">
              {isEn
                ? "Flying via the USA? Use the separate eVisa application."
                : "Πτήσεις μέσω ΗΠΑ: ξεχωριστή αίτηση ηλεκτρονικής βίζας και ασφάλειας."}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-wide">
              {isEn ? "USA flights form" : "Αίτηση πτήσεων ΗΠΑ"}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </section>

      {/* 2. Main Grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            {/* Step-by-Step Guide */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                {isEn ? "3 SIMPLE STEPS" : "ΔΙΑΔΙΚΑΣΙΑ ΕΚΔΟΣΗΣ"}
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink">
                {isEn ? "How to Get Your Cuba eVisa Fast & Securely" : "Πώς να εκδώσετε τη βίζα σας γρήγορα & απλά"}
              </h2>

              <div className="mt-8 space-y-4">
                {steps.map((st) => (
                  <div
                    key={st.num}
                    className="luxury-card flex items-start gap-4 rounded-sm border border-line bg-paper p-6 transition-all hover:border-gold/60"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-sm text-ink">
                      {st.num}
                    </span>
                    <div>
                      <h3 className="font-editorial text-xl font-normal text-ink">{st.title}</h3>
                      <p className="mt-1.5 text-xs text-muted leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Entry Requirements Checklist */}
            <div className="rounded-sm border border-line bg-paper p-8">
              <h3 className="font-editorial text-2xl font-normal text-ink">
                {isEn ? "Mandatory Cuba Entry Requirements 2026" : "Απαραίτητα Έγγραφα Εισόδου στην Κούβα 2026"}
              </h3>
              <ul className="mt-6 space-y-3.5 text-xs text-ink">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEn ? "Valid Passport:" : "Έγκυρο Διαβατήριο:"}</strong>{" "}
                    {isEn ? "Must have at least 6 months validity from departure date." : "Τουλάχιστον 6μηνη ισχύ από την ημερομηνία εισόδου."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEn ? "Tourist eVisa QR Code:" : "Ηλεκτρονική Βίζα (eVisa):"}</strong>{" "}
                    {isEn ? "Valid for a single entry of up to 90 days (extendable on island)." : "Ισχύει για παραμονή έως 90 ημέρες (με δυνατότητα παράτασης επιτόπου)."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEn ? "Travel Medical Insurance:" : "Ταξιδιωτική Ασφάλεια:"}</strong>{" "}
                    {isEn ? "Mandatory coverage for medical emergencies and hospitalisation." : "Υποχρεωτική κάλυψη ιατροφαρμακευτικών εξόδων."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEn ? "D'Viajeros Customs Form:" : "Ηλεκτρονική Φόρμα D'Viajeros:"}</strong>{" "}
                    {isEn ? "Online customs/health declaration filled within 48h before flight." : "Συμπληρώνεται online 48 ώρες πριν την πτήση (σας παρέχουμε πλήρεις οδηγίες)."}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-sm border border-line bg-white p-8">
              <h3 className="font-editorial text-2xl font-normal text-ink">
                {isEn ? "How much does the eVisa cost?" : "Πόσο κοστίζει η έκδοση ηλεκτρονικής βίζας;"}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {isEn
                  ? "The electronic tourist visa is 40€ per person. Same-day issue is +10€. Combined visa and insurance packages start at 75€ depending on trip length. Cuba information at document collection is an extra 50€."
                  : "Το κόστος για την έκδοση της ηλεκτρονικής τουριστικής βίζας είναι 40€ ανά άτομο. Για έκδοση αυθημερόν η επιπλέον χρέωση είναι 10€. Τα πακέτα βίζας και ασφάλειας ξεκινούν από 75€ ανάλογα με τη διάρκεια του ταξιδιού. Οι αναγραφόμενες τιμές είναι ΑΝΑ ΑΤΟΜΟ. Η παροχή πληροφοριών για την Κούβα κατά την παραλαβή των ταξιδιωτικών εγγράφων γίνεται με επιπλέον χρέωση 50€."}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky eVisa Application Form */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <div className="border-b border-line pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                    {isEn ? "OFFICIAL eVISA REQUEST" : "ΑΙΤΗΣΗ ΕΚΔΟΣΗΣ ΒΙΖΑΣ"}
                  </span>
                  <p className="mt-1 font-editorial text-2xl font-normal text-ink">
                    {isEn ? "Apply for Cuba eVisa" : "Έκδοση Ηλεκτρονικής Βίζας"}
                  </p>
                </div>

                <div className="py-4">
                  <EnquiryForm locale={locale} subject="Cuba eVisa Application" />
                </div>
              </div>

              <div className="rounded-sm border border-line bg-white p-5 text-xs text-muted space-y-2">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{isEn ? "Authorized GNTO Operator" : "Επίσημη Άδεια ΕΟΤ"}</span>
                </div>
                <p>
                  {isEn
                    ? `GNTO License ${SITE.mite}. Direct electronic submission with Cuban immigration.`
                    : `Αρ. ΜΗΤΕ ${SITE.mite}. Απευθείας ηλεκτρονική υποβολή στις αρχές της Κούβας.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
