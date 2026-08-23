import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Phone,
  Utensils,
  Sparkles,
  BedDouble,
  CheckCircle2,
  Camera,
  ArrowLeft,
  ShieldCheck,
  Building,
} from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import EnquiryForm from "@/components/EnquiryForm";
import { titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";

export default function HotelTemplate({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const hotel = record.hotel;
  const title = titleOf(record, locale);
  const intro = locale === "en" ? hotel?.introEn : hotel?.introEl;
  const facilities = locale === "en" ? hotel?.facilitiesEn : hotel?.facilitiesEl;
  const rooms = locale === "en" ? hotel?.roomsEn : hotel?.roomsEl;
  const restaurants = locale === "en" ? hotel?.restaurantsEn : hotel?.restaurantsEl;
  const hero = record.images[0] || record.thumb;
  const stars = hotel?.stars || 0;

  return (
    <article className="bg-white">
      {/* 1. Breadcrumb Bar */}
      <div className="border-b border-line bg-paper py-3 text-xs text-muted">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-2">
            <Link
              href={localizedPath(locale, "/")}
              className="hover:text-gold-deep transition-colors"
            >
              {locale === "el" ? "Αρχική" : "Home"}
            </Link>
            <span>/</span>
            <Link
              href={localizedPath(locale, "/diamoni-stin-kouva/")}
              className="hover:text-gold-deep transition-colors"
            >
              {locale === "el" ? "Διαμονή στην Κούβα" : "Stays in Cuba"}
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-medium text-ink">{title}</span>
          </div>

          <Link
            href={localizedPath(locale, "/diamoni-stin-kouva/")}
            className="hidden items-center gap-1 font-semibold text-gold-deep hover:text-ink sm:inline-flex"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>{locale === "el" ? "Όλα τα Καταλύματα" : "Back to Stays"}</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Header Banner */}
      <section className="relative min-h-[48vh] w-full bg-[#0b0b0b] text-white">
        {hero && (
          <Image
            src={hero}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-black/60" />

        <div className="relative mx-auto flex min-h-[48vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-20 lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {stars > 0 ? (
                <div className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
                  <span>{"★".repeat(stars)}</span>
                  <span>{stars}-Star Luxury Hotel</span>
                </div>
              ) : (
                <span className="gold-badge">
                  <Sparkles className="h-3 w-3 text-gold" />
                  <span>Boutique Colonial Casa</span>
                </span>
              )}
            </div>

            <h1 className="font-editorial text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>

            {hotel?.address && (
              <p className="mt-4 flex items-center gap-1.5 text-sm text-white/90">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span>{hotel.address}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Hidden notice if draft */}
      {record.noindex && (
        <div className="border-b border-gold/40 bg-gold/10 px-6 py-3 text-center text-xs font-semibold text-gold-deep">
          {t(COPY.hiddenNotice, locale)}
        </div>
      )}

      {/* 3. Main Hotel Layout (Details + Sticky Booking Form) */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Left Column: Stays Information */}
          <div className="space-y-12">
            {/* Overview / Introduction */}
            {intro && (
              <section className="prose-cuba border-b border-line pb-10">
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {locale === "el" ? "Πληροφορίες Καταλύματος" : "About this Property"}
                </h2>
                <div className="mt-4 text-lg font-light leading-relaxed text-[#2a2a2a] whitespace-pre-line">
                  {intro}
                </div>
              </section>
            )}

            {/* Hotel Facilities Pills */}
            {facilities && facilities.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {t(COPY.facilities, locale)}
                  </h2>
                </div>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-sm border border-line bg-paper px-3.5 py-2.5 text-xs text-ink"
                    >
                      <CheckCircle2 className="h-4 w-4 text-gold-deep shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Room Amenities */}
            {rooms && rooms.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {t(COPY.rooms, locale)}
                  </h2>
                </div>
                <div className="mt-6 rounded-sm border border-line bg-paper p-6">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {rooms.map((room, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-ink">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-deep shrink-0" />
                        <span>{room}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Dining & Restaurants */}
            {restaurants && restaurants.length > 0 && (
              <section className="border-b border-line pb-10">
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-editorial text-2xl font-normal text-ink">
                    {t(COPY.restaurants, locale)}
                  </h2>
                </div>
                <div className="mt-6 space-y-3">
                  {restaurants.map((rest, idx) => (
                    <div
                      key={idx}
                      className="rounded-sm border border-line bg-white p-4 text-sm text-ink shadow-2xs"
                    >
                      <span className="font-medium">{rest}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Direct Location & Contacts */}
            {(hotel?.address || hotel?.phone) && (
              <section className="rounded-sm border border-line bg-paper p-6">
                <h3 className="font-editorial text-xl font-normal text-ink">
                  {locale === "el" ? "Τοποθεσία & Επικοινωνία" : "Location & Contact"}
                </h3>
                <div className="mt-4 space-y-2 text-sm text-ink">
                  {hotel.address && (
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                      <span>
                        <strong>{t(COPY.address, locale)}:</strong> {hotel.address}
                      </span>
                    </p>
                  )}
                  {hotel.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gold-deep shrink-0" />
                      <span>
                        <strong>{t(COPY.phone, locale)}:</strong> {hotel.phone}
                      </span>
                    </p>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Booking & Consultation Widget */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-sm border-2 border-gold/50 bg-paper p-6 shadow-xl">
                <div className="border-b border-line pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                    {locale === "el" ? "ΔΙΑΘΕΣΙΜΟΤΗΤΑ & ΚΡΑΤΗΣΗ" : "HOTEL RESERVATION INQUIRY"}
                  </span>
                  <p className="mt-1 font-editorial text-2xl font-normal text-ink">{title}</p>
                </div>

                <div className="py-4">
                  <EnquiryForm locale={locale} subject={`Hotel Inquiry: ${title}`} />
                </div>

                <div className="border-t border-line pt-4 text-center">
                  <p className="text-xs text-muted">
                    {locale === "el"
                      ? "Θέλετε να εντάξετε αυτό το ξενοδοχείο σε ολοκληρωμένο πακέτο;"
                      : "Looking to combine this stay with a custom Cuba package?"}
                  </p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-2 inline-flex items-center gap-2 font-semibold text-ink hover:text-gold-deep"
                  >
                    <Phone className="h-4 w-4 text-gold-deep" />
                    <span>{SITE.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Verified Stays Guarantee */}
              <div className="rounded-sm border border-line bg-white p-5 text-xs text-muted space-y-2">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>
                    {locale === "el" ? "Επίσημη Συνεργασία & Εγγύηση Τιμής" : "Direct Partnership Guarantee"}
                  </span>
                </div>
                <p>
                  {locale === "el"
                    ? "Απευθείας συμβόλαια με ξενοδοχειακούς ομίλους (Melia, Iberostar, Gran Caribe) και ιδιοκτήτες casas particulares."
                    : "Direct contracts with Cuban hotel chains and private colonial property owners for confirmed room availability."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Full Photo Gallery Section */}
      {record.images.length > 1 && (
        <section className="border-t border-line bg-paper py-16">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-gold-deep" />
                <h2 className="font-editorial text-2xl font-normal text-ink">
                  {t(COPY.gallery, locale)}
                </h2>
              </div>
              <span className="text-xs font-semibold text-muted">
                {record.images.length} {locale === "el" ? "Φωτογραφίες" : "Photos"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {record.images.map((src, i) => (
                <div
                  key={src + i}
                  className="luxury-card relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-white shadow-xs"
                >
                  <Image
                    src={src}
                    alt={`${title} photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
