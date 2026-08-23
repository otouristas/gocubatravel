import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CookieNotice from "@/components/CookieNotice";
import DocumentLang from "@/components/DocumentLang";
import EspaBanner from "@/components/EspaBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE } from "@/content/site";
import type { Locale } from "@/content/types";
import { isLocale, LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: isEn
        ? "Travel to Cuba | GO CUBA"
        : "Ταξίδι στην Κούβα | GO CUBA",
      template: "%s | GO CUBA",
    },
    description: isEn
      ? "We plan your Cuba trip: stays, transfers, tours and eVisa. Private, honeymoon and thematic journeys with local knowledge."
      : "Σχεδιάζουμε το ταξίδι στην Κούβα: διαμονή, μεταφορές, εκδρομές και βίζα. Ατομικά, γαμήλια και θεματικά ταξίδια με τοπική γνώση.",
    openGraph: {
      siteName: SITE.name,
      locale: isEn ? "en_US" : "el_GR",
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-icon.svg", type: "image/svg+xml" },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;

  return (
    <div className="flex min-h-full flex-col">
      <DocumentLang locale={loc} />
      <Header locale={loc} />
      <main className="flex-1">{children}</main>
      <EspaBanner />
      <Footer locale={loc} />
      <CookieNotice locale={loc} />
    </div>
  );
}
