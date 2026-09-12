import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { indexableRecords } from "@/lib/content";
import { LOCALES, localizedPath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE.domain}${localizedPath(locale, "/")}`,
      changeFrequency: "weekly",
      priority: 1,
    });
    entries.push({
      url: `${SITE.domain}${localizedPath(locale, "/tours/")}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${SITE.domain}${localizedPath(locale, "/sxediasmos-taxidiou-kouva/")}`,
      changeFrequency: "monthly",
      priority: 0.9,
    });
    for (const record of indexableRecords()) {
      if (record.path === "/") continue;
      entries.push({
        url: `${SITE.domain}${localizedPath(locale, record.path)}`,
        changeFrequency: "monthly",
        priority: record.kind === "tour" || record.kind === "hotel" ? 0.7 : 0.5,
      });
    }
  }
  return entries;
}
