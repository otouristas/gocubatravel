import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { COPY, OFFICES, SITE, SOCIALS, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { localizedPath } from "@/lib/i18n";

function mapEmbed(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=el&output=embed`;
}

export default function ContactPage({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const hero = record.images[0] || record.thumb;

  const channels = [
    {
      icon: Phone,
      label: isEn ? "Call us" : "Τηλεφωνικά",
      value: SITE.phoneDisplay,
      href: SITE.phoneHref,
      note: isEn ? "Mon–Fri 09:00–18:00 (EET)" : "Δευ–Παρ 09:00–18:00",
    },
    {
      icon: Mail,
      label: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      note: isEn ? "We reply within 24 hours" : "Απαντάμε εντός 24 ωρών",
    },
    {
      icon: MessageCircle,
      label: "Skype",
      value: SITE.skype,
      href: `skype:${SITE.skype}?chat`,
      note: isEn ? "Video consultation on request" : "Βιντεοκλήση κατόπιν ραντεβού",
    },
  ];

  return (
    <div className="bg-white">
      <section className="relative min-h-[42vh] w-full bg-[#0b0b0b] text-white">
        {hero ? (
          <Image
            src={hero}
            alt={isEn ? "Contact GO CUBA" : "Επικοινωνία με την GO CUBA"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[42vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-3xl">
            <span className="gold-badge mb-3">
              <ShieldCheck className="h-3 w-3 text-gold" />
              <span>{isEn ? "GNTO LICENCE" : "ΑΔΕΙΑ ΕΟΤ"} {SITE.mite}</span>
            </span>
            <h1 className="font-editorial text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              {isEn ? "Contact GO CUBA" : "Επικοινωνία"}
            </h1>
            <p className="mt-3 text-base font-light leading-relaxed text-white/90 sm:text-lg">
              {isEn
                ? "Talk to a Cuba destination specialist in Athens, Nicosia or Havana. Book an appointment, call us, or send your trip brief."
                : "Μιλήστε με έναν εξειδικευμένο σύμβουλο για την Κούβα σε Αθήνα, Λευκωσία και Αβάνα. Κλείστε ραντεβού, τηλεφωνήστε ή στείλτε το αίτημά σας."}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-4 px-6 py-8 sm:grid-cols-3 lg:px-12">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.label}
                href={channel.href}
                className="luxury-card flex items-start gap-3 rounded-sm border border-line bg-white p-5 shadow-xs transition-colors hover:border-gold"
              >
                <span className="rounded-full bg-gold/15 p-2.5 text-gold-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-widest text-muted">
                    {channel.label}
                  </span>
                  <span className="mt-1 block truncate text-base font-semibold text-ink">
                    {channel.value}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{channel.note}</span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="mb-8 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
            {isEn ? "WHERE TO FIND US" : "ΠΟΥ ΘΑ ΜΑΣ ΒΡΕΙΤΕ"}
          </span>
          <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
            {t(COPY.offices, locale)}
          </h2>
          <p className="mt-3 flex flex-wrap items-center gap-2 text-base text-muted">
            <CalendarClock className="h-4 w-4 text-gold-deep" />
            <span>
              {t(COPY.appointmentPhone, locale)}:{" "}
              <a href={SITE.phoneHref} className="font-semibold text-ink hover:text-gold-deep">
                {SITE.phoneDisplay}
              </a>
            </span>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {OFFICES.map((office) => (
            <div
              key={office.id}
              className="overflow-hidden rounded-sm border border-line bg-white shadow-xs"
            >
              <div className="aspect-[16/10] w-full bg-paper">
                <iframe
                  src={mapEmbed(office.mapQuery)}
                  title={`${office.city[locale]} — ${office.street[locale]}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  {office.country[locale]}
                </span>
                <h3 className="mt-1 font-editorial text-2xl font-normal text-ink">
                  {office.city[locale]}
                </h3>
                <p className="mt-2 flex items-start gap-2 text-base text-ink/85">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  <span>
                    {office.street[locale]}, {office.postal} {office.city[locale]}
                  </span>
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={SITE.phoneHref} className="btn-luxury-outline !py-2 !px-4 !text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{SITE.phoneDisplay}</span>
                  </a>
                  <a
                    href={office.directions}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-luxury-outline !py-2 !px-4 !text-sm"
                  >
                    <span>{t(COPY.openDirections, locale)}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:px-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
              {isEn ? "PLAN WITH US" : "ΣΧΕΔΙΑΣΤΕ ΜΑΖΙ ΜΑΣ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn ? "Tell us about your Cuba trip" : "Πείτε μας για το ταξίδι σας στην Κούβα"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/85">
              {isEn
                ? "Send us your dates, travel style and the places you dream of. A destination specialist replies within 24 hours with a first itinerary proposal and pricing."
                : "Στείλτε μας ημερομηνίες, ύφος ταξιδιού και τους προορισμούς που ονειρεύεστε. Ένας σύμβουλος απαντά εντός 24 ωρών με πρώτη πρόταση διαδρομής και κοστολόγηση."}
            </p>

            <div className="mt-6 rounded-sm border border-gold/40 bg-white p-5">
              <p className="font-editorial text-xl text-ink">
                {isEn ? "Prefer to start on your own?" : "Θέλετε να ξεκινήσετε μόνοι σας;"}
              </p>
              <p className="mt-1 text-sm text-muted">
                {isEn
                  ? "Build a first draft itinerary in 30 seconds with CUBA AI, then we refine it together."
                  : "Δημιουργήστε ένα πρώτο πρόγραμμα σε 30 δευτερόλεπτα με το CUBA AI και το τελειοποιούμε μαζί."}
              </p>
              <Link
                href={localizedPath(locale, "/ai-planner/")}
                className="btn-gold mt-4 !py-2.5 !px-5 !text-sm"
              >
                <span>{isEn ? "Open CUBA AI" : "Ανοιξτε το CUBA AI"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm uppercase tracking-wider text-muted">
                {isEn ? "Follow GO CUBA:" : "Social Media:"}
              </span>
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-ink underline-offset-4 hover:text-gold-deep hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-sm border-2 border-gold/50 bg-white p-6 shadow-xl sm:p-8">
            <EnquiryForm locale={locale} subject="Contact — Cuba trip planning" />
          </div>
        </div>
      </section>
    </div>
  );
}
