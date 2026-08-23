import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentView from "@/components/ContentView";
import type { Locale } from "@/content/types";
import { isLocale } from "@/lib/i18n";
import { excerptOf, getRecord, records, seoTitleOf } from "@/lib/content";
import { stripEmoji } from "@/lib/text";

function pathFromSlug(slug: string[]): string {
  return `/${slug.join("/")}/`;
}

export function generateStaticParams() {
  const paths = records
    .filter((r) => r.path !== "/")
    .map((r) => r.path.replace(/^\//, "").replace(/\/$/, ""))
    .filter(Boolean);
  return ["el", "en"].flatMap((locale) =>
    paths.map((p) => ({ locale, slug: p.split("/") })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const record = getRecord(pathFromSlug(slug));
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

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const record = getRecord(pathFromSlug(slug));
  if (!record) notFound();
  return <ContentView record={record} locale={locale as Locale} />;
}
