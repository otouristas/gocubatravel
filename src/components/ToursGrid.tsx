"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, Compass, Languages, MapPin } from "lucide-react";

export type TourFilter = "greek" | "group" | "multiday";

export type TourCard = {
  href: string;
  title: string;
  image: string;
  duration?: string;
  type?: string;
  languages?: string;
  price?: string;
  departurePlace?: string;
  filters: TourFilter[];
};

const CHIPS: { id: TourFilter; el: string; en: string }[] = [
  { id: "greek", el: "Ελληνόφωνος ξεναγός", en: "Greek-speaking guide" },
  { id: "group", el: "Συλλογικές αναχωρήσεις", en: "Group departures" },
  { id: "multiday", el: "Πολυήμερες εκδρομές", en: "Multi-day trips" },
];

export default function ToursGrid({ cards, locale }: { cards: TourCard[]; locale: "el" | "en" }) {
  const isEn = locale === "en";
  const [active, setActive] = useState<TourFilter[]>([]);

  const visible = useMemo(
    () => (active.length === 0 ? cards : cards.filter((c) => active.every((f) => c.filters.includes(f)))),
    [cards, active],
  );

  const toggle = (id: TourFilter) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setActive([])}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
            active.length === 0
              ? "border-gold bg-gold text-white"
              : "border-line bg-white text-ink hover:border-gold hover:text-gold-deep"
          }`}
        >
          {isEn ? "All excursions" : "Όλες οι εκδρομές"}
        </button>
        {CHIPS.map((chip) => {
          const on = active.includes(chip.id);
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => toggle(chip.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                on
                  ? "border-gold bg-gold text-white"
                  : "border-line bg-white text-ink hover:border-gold hover:text-gold-deep"
              }`}
            >
              {isEn ? chip.en : chip.el}
            </button>
          );
        })}
        <span className="ml-auto text-xs text-muted">
          {visible.length} {isEn ? "excursions" : "εκδρομές"}
        </span>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-sm border border-line bg-paper p-8 text-center text-sm text-muted">
          {isEn
            ? "No excursion matches this combination yet. Clear a filter or ask us for a private option."
            : "Δεν υπάρχει εκδρομή με αυτόν τον συνδυασμό. Αφαιρέστε ένα φίλτρο ή ζητήστε μας ιδιωτική επιλογή."}
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((card) => (
            <article
              key={card.href}
              className="luxury-card group flex flex-col overflow-hidden rounded-sm border border-line bg-paper"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {card.price ? (
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
                    {card.price}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-editorial text-2xl font-normal leading-snug text-ink group-hover:text-gold-deep">
                    <Link href={card.href}>{card.title}</Link>
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
                    {card.duration ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                        {card.duration}
                      </span>
                    ) : null}
                    {card.type ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Compass className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                        {card.type}
                      </span>
                    ) : null}
                    {card.languages ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Languages className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                        <span className="line-clamp-1">{card.languages}</span>
                      </span>
                    ) : null}
                    {card.departurePlace ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                        <span className="line-clamp-1">{card.departurePlace}</span>
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                  <span className="text-xs text-muted">
                    {card.filters.includes("multiday")
                      ? isEn
                        ? "Multi-day"
                        : "Πολυήμερη"
                      : isEn
                        ? "Day tour"
                        : "Ημερήσια εκδρομή"}
                  </span>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:text-ink"
                  >
                    <span>{isEn ? "View details" : "Πληροφορίες"}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
