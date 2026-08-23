import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiItineraryCreator from "@/components/AiItineraryCreator";
import type { Locale } from "@/content/types";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn
    ? "CUBA AI — Custom Cuba Itinerary Creator | GO CUBA"
    : "CUBA AI — Σχεδιασμός Ταξιδιού στην Κούβα | GO CUBA";

  return {
    title: { absolute: title },
    description: isEn
      ? "Design your bespoke Cuba itinerary in 30 seconds with CUBA AI. Handpicked stays, private transfers, and instant export to your specialist."
      : "Σχεδιάστε το εξατομικευμένο σας ταξίδι στην Κούβα σε 30 δευτερόλεπτα με το CUBA AI. Επιλεγμένη διαμονή, ιδιωτικές μεταφορές και άμεση κοστολόγηση.",
  };
}

export default async function AiPlannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <AiItineraryCreator locale={locale as Locale} />;
}
