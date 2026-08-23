import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRing, CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import { rawBodyOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { sanitizeLines } from "@/lib/prose";

const HERO =
  "https://www.skydream.gr/wp-content/uploads/Havana-Vintage-Cars-Gran-Teatro-and-Capitol-scaled.jpg";

/** Residue of the original ActiveCampaign embed — the real form replaces it. */
const EMBED_NOISE = /(Όνομα\s*\*?\s*Email|First Name\s*Email|>>|Θέλω να μάθω περισσότερα)/;

export default function WaitlistPage({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const title = titleOf(record, locale);
  const lines = sanitizeLines(rawBodyOf(record, locale)).filter((line) => !EMBED_NOISE.test(line));

  const benefits = isEn
    ? [
        "Be the first to know when Cuba Ready launches.",
        "One single announcement email — no spam, no newsletter.",
        "Early access to the planning tools and guides.",
      ]
    : [
        "Μάθετε πρώτοι μόλις το Cuba Ready είναι έτοιμο.",
        "Ένα και μόνο email ενημέρωσης — χωρίς spam και newsletter.",
        "Πρόωρη πρόσβαση στα εργαλεία και τους οδηγούς σχεδιασμού.",
      ];

  return (
    <article className="bg-white">
      <section className="relative min-h-[46vh] w-full bg-[#0b0b0b] text-white">
        <Image
          src={record.images[0] || record.thumb || HERO}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/50 to-black/60" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <BellRing className="h-3 w-3 text-gold" />
              <span>CUBA READY</span>
            </span>
            <h1 className="font-editorial text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {lines[0] && (
              <p className="mt-3 text-base font-light leading-relaxed text-white/90 sm:text-lg">
                {lines[0]}
              </p>
            )}
          </div>
        </div>
      </section>

      {record.noindex && (
        <div className="border-b border-gold/40 bg-gold/10 px-6 py-3 text-center text-sm font-semibold text-gold-deep">
          {t(COPY.hiddenNotice, locale)}
        </div>
      )}

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div>
          <h2 className="font-editorial text-3xl font-normal text-ink">
            {isEn ? "Join the waitlist" : "Μπείτε στη λίστα αναμονής"}
          </h2>
          <div className="mt-4 space-y-3">
            {lines.slice(1).map((line, idx) => (
              <p key={idx} className="text-lg font-light leading-relaxed text-ink/85">
                {line}
              </p>
            ))}
          </div>

          <ul className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-base text-ink/85">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              {isEn
                ? "You can unsubscribe at any time. We never share your email."
                : "Μπορείτε να διαγραφείτε όποτε θέλετε. Δεν κοινοποιούμε ποτέ το email σας."}
            </span>
          </div>
        </div>

        <div className="rounded-sm border-2 border-gold/50 bg-paper p-8 shadow-xl">
          <form className="space-y-4" action={`mailto:${SITE.email}`} method="get">
            <input type="hidden" name="subject" value="Cuba Ready waitlist" />
            <h2 className="font-editorial text-2xl font-normal text-ink">
              {isEn ? "Tell me when Cuba Ready is live" : "Ενημερώστε με μόλις είναι έτοιμο"}
            </h2>
            <p className="text-sm text-muted">
              {isEn
                ? "Leave your name and email — you will get one message, and only when it launches."
                : "Αφήστε όνομα και email — θα λάβετε ένα μόνο μήνυμα, μόλις γίνει διαθέσιμο."}
            </p>

            <input
              name="name"
              required
              placeholder={isEn ? "Full name *" : "Ονοματεπώνυμο *"}
              className="w-full rounded-sm border border-line bg-white px-3.5 py-3 text-sm text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email *"
              className="w-full rounded-sm border border-line bg-white px-3.5 py-3 text-sm text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />

            <button
              type="submit"
              className="btn-gold w-full cursor-pointer !py-3 !text-xs font-semibold uppercase tracking-widest"
            >
              <Mail className="h-4 w-4" />
              <span>{isEn ? "Join the waitlist" : "Θελω να μαθω πρωτος"}</span>
            </button>
          </form>

          <div className="mt-8 border-t border-line pt-6">
            <p className="font-editorial text-xl text-ink">
              {isEn ? "Travelling sooner?" : "Ταξιδεύετε νωρίτερα;"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {isEn
                ? "CUBA AI can draft your itinerary today, and a specialist will refine it."
                : "Το CUBA AI μπορεί να φτιάξει το πρόγραμμά σας σήμερα και ένας σύμβουλος το τελειοποιεί."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={localizedPath(locale, "/ai-planner/")}
                className="btn-gold !px-5 !py-2.5 !text-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
              </Link>
              <Link
                href={localizedPath(locale, "/epikoinonia/")}
                className="btn-luxury-outline !px-5 !py-2.5 !text-sm"
              >
                <span>{t(COPY.enquire, locale)}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
