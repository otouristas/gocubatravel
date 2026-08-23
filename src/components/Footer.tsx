import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/Logo";
import {
  CERTIFICATIONS,
  COPY,
  FOOTER_LEGAL,
  PRIMARY_NAV,
  SITE,
  SISTER_BRANDS,
  SOCIALS,
  t,
} from "@/content/site";
import type { Locale } from "@/content/types";
import { localizedPath } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <footer id="main-footer" className="border-t border-[#222] bg-[#0b0b0b] text-white">
      {/* 1. Pre-Footer Authority & Consultation Strip */}
      <div className="border-b border-white/10 bg-[#111] py-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-12">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="rounded-full bg-gold/10 p-2.5 text-gold">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-editorial text-lg text-white">
                {isEn ? "Design Your Bespoke Cuba Experience" : "Σχεδιάστε το Δικό σας Ταξίδι στην Κούβα"}
              </p>
              <p className="text-sm text-white/60">
                {isEn
                  ? "Talk directly to our destination specialists in Athens & Havana."
                  : "Μιλήστε απευθείας με τους εξειδικευμένους συμβούλους μας σε Αθήνα & Αβάνα."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="btn-gold !py-2.5 !px-5 !text-sm font-semibold tracking-wider"
            >
              <Phone className="h-4 w-4" />
              <span>{SITE.phoneDisplay}</span>
            </a>
            <Link
              href={localizedPath(locale, "/epikoinonia/")}
              className="btn-outline-white !py-2.5 !px-5 !text-sm"
            >
              <span>{isEn ? "Contact Us" : "Επικοινωνία"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1 & 2: Brand Story & License */}
          <div className="space-y-4 lg:col-span-2">
            <Logo locale={locale} variant="dark" size="md" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              {isEn
                ? "GO CUBA is the premier destination specialist for Cuba. Bespoke itineraries, 5-star resorts, heritage casas particulares, guided tours, and official eVisa processing with 17+ years of destination expertise."
                : "Η GO CUBA είναι το κορυφαίο εξειδικευμένο ταξιδιωτικό γραφείο για την Κούβα. Ατομικά, γαμήλια και θεματικά ταξίδια, επιλεγμένη διαμονή, εκδρομές και ηλεκτρονική βίζα με 17+ χρόνια τοπικής εμπειρίας."}
            </p>

            <div className="rounded-sm border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <div className="flex items-center gap-2 font-semibold text-gold">
                <ShieldCheck className="h-4 w-4" />
                <span>{isEn ? "Official Tourism License" : "Επίσημη Άδεια ΕΟΤ (ΜΗΤΕ)"}</span>
              </div>
              <p className="mt-1 font-mono text-white/90">
                <strong>{SITE.mite}</strong>
              </p>
              <p className="mt-1 text-sm text-white/60">
                {isEn
                  ? "Licensed Greek National Tourism Organization operator."
                  : "Πιστοποιημένο τουριστικό γραφείο του Ελληνικού Οργανισμού Τουρισμού."}
              </p>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-editorial text-base font-semibold uppercase tracking-wider text-gold">
              {isEn ? "Destinations" : "Προορισμοι & Μετακινηση"}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              {PRIMARY_NAV.slice(1, 7).map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizedPath(locale, item.href)}
                    className="transition-colors hover:text-gold"
                  >
                    {t(item, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Stories & Legal */}
          <div className="space-y-4">
            <h4 className="font-editorial text-base font-semibold uppercase tracking-wider text-gold">
              {isEn ? "Stories & Guides" : "Οδηγοι & Ιστοριες"}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link
                  href={localizedPath(locale, "/blog-cuba-vibe/")}
                  className="transition-colors hover:text-gold"
                >
                  Cuba Vibe (Blog)
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/taxidiotikes-istories/")}
                  className="transition-colors hover:text-gold"
                >
                  {isEn ? "Travel Stories" : "Ταξιδιωτικές Ιστορίες"}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/organosi-taxidiou-stin-kouva/")}
                  className="transition-colors hover:text-gold"
                >
                  {isEn ? "Cuba Travel Planning" : "Οργάνωση Ταξιδιού (Οδηγός)"}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/visa-gia-kouva/")}
                  className="transition-colors hover:text-gold"
                >
                  {isEn ? "Cuba eVisa Guide" : "Ηλεκτρονική Βίζα (eVisa)"}
                </Link>
              </li>
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizedPath(locale, item.href)}
                    className="transition-colors hover:text-gold text-white/60"
                  >
                    {t(item, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Physical Offices & Direct Contact */}
          <div className="space-y-4">
            <h4 className="font-editorial text-base font-semibold uppercase tracking-wider text-gold">
              {isEn ? "Offices & Contact" : "Γραφεια & Επικοινωνια"}
            </h4>
            <div className="space-y-3 text-sm text-white/80">
              <div className="space-y-1.5">
                <p className="flex items-start gap-1.5 font-medium text-white">
                  <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                  <span>{SITE.offices[locale][0]}</span>
                </p>
                <p className="flex items-start gap-1.5 font-medium text-white">
                  <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                  <span>{SITE.offices[locale][1]}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 text-white hover:text-gold font-semibold"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  <span>{SITE.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-white/80 hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  <span>{SITE.email}</span>
                </a>
                <p className="text-sm text-white/60">Skype: {SITE.skype}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Social Media & Certifications Strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <span className="text-sm uppercase tracking-wider text-white/50">
              {isEn ? "Follow GO CUBA:" : "Social Media:"}
            </span>
            <ul className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm text-white/80 transition-all hover:border-gold hover:bg-gold hover:text-ink"
                    aria-label={s.label}
                  >
                    {s.label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications Strip */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span className="text-white/40">{t(COPY.certifications, locale)}</span>
            {CERTIFICATIONS.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1">
                {i > 0 && <span className="text-white/30">•</span>}
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-white/90 hover:text-gold underline"
                >
                  {c.label}
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* 4. Sister Brands Studio Credit */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p className="text-white/40 mb-1.5">{t(COPY.sisterIntro, locale)}</p>
          <p className="flex flex-wrap items-center justify-center gap-3">
            {SISTER_BRANDS.map((b, i) => (
              <span key={b.href} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-white/20">•</span>}
                <a
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-white/80 hover:text-gold transition-colors"
                >
                  {locale === "en" ? b.en : b.el}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* 5. Copyright Bar */}
      <div id="footer-bottom" className="border-t border-white/10 bg-black/90 py-5 text-center text-sm text-white/60">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-6 sm:flex-row lg:px-12">
          <div>{t(COPY.copyright, locale)}</div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-white/70">
            <span>
              {t(COPY.devCredit, locale)}{" "}
              <strong className="font-semibold text-white/90">{COPY.devCredit.label}</strong>
            </span>
            <span className="text-white/30">•</span>
            <span>
              {t(COPY.seoCredit, locale)}{" "}
              <a
                href={COPY.seoCredit.href}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gold hover:underline"
              >
                {COPY.seoCredit.label}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
