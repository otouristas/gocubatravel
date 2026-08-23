import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentView from "@/components/ContentView";
import type { Locale } from "@/content/types";
import { isLocale } from "@/lib/i18n";
import { excerptOf, seoTitleOf, tours } from "@/lib/content";
import { stripEmoji } from "@/lib/text";

function findTour(slug: string) {
  return tours.find((t) => t.slug === slug && !t.aliasOf);
}

export function generateStaticParams() {
  return ["el", "en"].flatMap((locale) =>
    tours.filter((t) => !t.aliasOf).map((t) => ({ locale, slug: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const record = findTour(slug);
  if (!record) return {};
  const loc = (locale === "en" ? "en" : "el") as Locale;
  const raw = seoTitleOf(record, loc);
  const title = raw.includes("GO CUBA") ? raw : `${raw} | GO CUBA`;
  return {
    title: { absolute: title },
    description:
      stripEmoji(loc === "en" ? record.seoDescEn : record.seoDescEl) || excerptOf(record, loc),
    robots: record.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function TourProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const record = findTour(slug);
  if (!record) notFound();
  return <ContentView record={record} locale={locale as Locale} />;
}
