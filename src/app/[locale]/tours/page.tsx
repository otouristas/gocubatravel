import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToursHub from "@/components/ToursHub";
import type { Locale } from "@/content/types";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Tours in Cuba" : "Εκδρομές στην Κούβα",
    description:
      locale === "en"
        ? "Day tours and multi-day Cuba experiences from Havana — Viñales, Old Havana, Trinidad, seafari and more."
        : "Εκδρομές και εμπειρίες στην Κούβα από την Αβάνα — Βινιάλες, ιστορικό κέντρο, Τρινιδάδ, seafari και άλλα.",
  };
}

export default async function ToursIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ToursHub locale={locale as Locale} />;
}
