import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripPlanningPage from "@/components/TripPlanningPage";
import { SITE } from "@/content/site";
import type { Locale } from "@/content/types";
import { isLocale } from "@/lib/i18n";

const SLUG = "sxediasmos-taxidiou-kouva";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: {
      absolute: isEn
        ? "Cuba Trip Planning | GO CUBA"
        : "Σχεδιασμός Ταξιδιού στην Κούβα | GoCuba",
    },
    description: isEn
      ? "Plan your trip to Cuba with a Cuba Specialist. A personalised route, stays and excursions. €95 planning fee, credited 100% against your booking."
      : "Σχεδίασε το ταξίδι σου στην Κούβα με Cuba Specialist. Εξατομικευμένη διαδρομή, διαμονή και εκδρομές. Planning Fee €95, με 100% συμψηφισμό στην κράτηση.",
    // Both locales carry genuine translated copy, so the hreflang pair is real.
    alternates: {
      canonical: `${SITE.domain}/${isEn ? "en" : "el"}/${SLUG}`,
      languages: {
        "el-GR": `${SITE.domain}/el/${SLUG}`,
        "en": `${SITE.domain}/en/${SLUG}`,
      },
    },
  };
}

export default async function CubaTripPlanningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <TripPlanningPage locale={locale as Locale} />;
}
