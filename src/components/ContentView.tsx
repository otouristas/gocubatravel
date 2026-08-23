import BlogHub from "@/components/BlogHub";
import CmsPage from "@/components/CmsPage";
import ContactPage from "@/components/ContactPage";
import EditorialPostTemplate from "@/components/EditorialPostTemplate";
import GuidePage from "@/components/GuidePage";
import HotelTemplate from "@/components/HotelTemplate";
import PackageCategoryPage from "@/components/PackageCategoryPage";
import PackageTemplate from "@/components/PackageTemplate";
import PackagesHub from "@/components/PackagesHub";
import StaysHub from "@/components/StaysHub";
import StoriesHub from "@/components/StoriesHub";
import TeamPage from "@/components/TeamPage";
import TourTemplate from "@/components/TourTemplate";
import ToursHub from "@/components/ToursHub";
import TransfersHub from "@/components/TransfersHub";
import TravelGuideHub from "@/components/TravelGuideHub";
import VisaHub from "@/components/VisaHub";
import WaitlistPage from "@/components/WaitlistPage";
import type { ContentRecord, Locale } from "@/content/types";
import { GUIDE_PATHS, PACKAGE_CATEGORIES, WAITLIST_PATHS } from "@/lib/routes";

const HUBS: Record<string, (locale: Locale) => React.ReactElement> = {
  "/paketa-diakopon-gia-kouva/": (locale) => <PackagesHub locale={locale} />,
  "/taxidi-stin-kouva/": (locale) => <TravelGuideHub locale={locale} />,
  "/metafores-stin-kouva/": (locale) => <TransfersHub locale={locale} />,
  "/visa-gia-kouva/": (locale) => <VisaHub locale={locale} />,
  "/diamoni-stin-kouva/": (locale) => <StaysHub locale={locale} />,
  "/taxidiotikes-istories/": (locale) => <StoriesHub locale={locale} />,
  "/ekdromes-stin-kouva/": (locale) => <ToursHub locale={locale} />,
};

export default function ContentView({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const path = record.path;

  const hub = HUBS[path];
  if (hub) return hub(locale);

  if (path === "/epikoinonia/") {
    return <ContactPage record={record} locale={locale} />;
  }
  if (path === "/blog-cuba-vibe/") {
    return <BlogHub record={record} locale={locale} />;
  }
  if (path === "/i-omada-mas/") {
    return <TeamPage record={record} locale={locale} />;
  }
  if (WAITLIST_PATHS.has(path)) {
    return <WaitlistPage record={record} locale={locale} />;
  }
  if (GUIDE_PATHS.has(path)) {
    return <GuidePage record={record} locale={locale} />;
  }

  if (path.startsWith("/paketa-diakopon-gia-kouva/")) {
    return PACKAGE_CATEGORIES.has(path) ? (
      <PackageCategoryPage record={record} locale={locale} />
    ) : (
      <PackageTemplate record={record} locale={locale} />
    );
  }

  if (record.kind === "hotel") {
    return <HotelTemplate record={record} locale={locale} />;
  }

  if (record.kind === "tour") {
    return <TourTemplate record={record} locale={locale} />;
  }

  if (
    record.kind === "story" ||
    record.kind === "blog" ||
    record.kind === "post" ||
    path.startsWith("/cuba-la-storia")
  ) {
    return <EditorialPostTemplate record={record} locale={locale} />;
  }

  return <CmsPage record={record} locale={locale} />;
}
