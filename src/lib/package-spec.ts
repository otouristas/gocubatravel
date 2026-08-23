import type { ContentRecord, Locale } from "@/content/types";
import { firstAmount, isOrnamentOnly, normalizeCurrency, stripEmoji } from "@/lib/text";

export type GlanceItem = { label: string; value: string };
export type PackagePriceTier = { label: string; period?: string; price?: string; notes: string[] };
export type PackageDay = { steps: string[]; activities: string[]; overnight?: string };

export type PackageSpec = {
  route?: string;
  intro: string[];
  glance: GlanceItem[];
  highlights: string[];
  days: PackageDay[];
  stays: string[];
  included: string[];
  priceTiers: PackagePriceTier[];
  priceHeadline?: string;
  flights: string[];
  notes: string[];
};

type Mode = "intro" | "highlights" | "itinerary" | "included" | "price" | "flights";

// Greek letters are not \w, so these patterns avoid \b entirely.
const HIGHLIGHTS_RE = /^(τι δεν πρέπει να χάσω|highlights)|τι θα δείτε/i;
const PROGRAM_RE = /^(το\s+)?πρόγραμμα/i;
const GLANCE_LABEL_RE = /^(αναχωρήσεις|αναχώρηση|οδικές μεταφορές|διαμονή|έλληνας συνοδός|τύπος εκδρομής|διάρκεια)\s*:/i;
const STAY_RE = /^(ξενοδοχείο|casa particular|boutique historic|ξενοδοχεία)/i;
const INCLUDED_RE =
  /^(αεροπορικ[άό] εισιτήρι|τουριστική βίζα|ταξιδιωτική ασφάλ|ιδιωτικές οδικές μεταφορές|ιδιωτικές μεταφορές|συλλογικές μεταφορές|διατροφή\s*:|χάρτης|ενημερωτικ|walking tour|δραστηριότητες \/ ξεναγήσεις|ταξιδιωτικά έγγραφα|διαμονή\s*:\s*(μία|δύο|τρεις|τέσσερις|πέντε|έξι|επτά|οκτώ|εννέα|δέκα|\(?\d))/i;
const PRICE_START_RE =
  /^(αναχωρήσεις? από|τιμή κατ|τιμή σε|τιμές|τιμοκατάλογος|κόστος|ανά άτομο|συμμετοχή \d|παρέα ή οικογένεια|επιπλέον διανυκτέρευση|\d{1,2}\/\d{1,2}\/\d{4})/i;
const PRICE_NOTE_RE = /^(επιβάρυνση|έλληνας ξεναγός έως|παιδική τιμή|ισχύει)/i;
const FLIGHTS_RE = /^(οι πτήσεις σας|πτήσεις σας|πτήσεις[\s:])/i;
const FLIGHT_LINE_RE = /^[A-Z]{2}\s?\d{2,4}\b/;
const NOTE_RE =
  /^\*+\s*\S|^(προσοχή|σημείωση|σημειώσεις|παρακαλούμε|η τιμή δεν περιλαμβάνει|δεν περιλαμβάνεται|το πρόγραμμα ενδέχεται)/i;
const OVERNIGHT_RE = /^διανυκτ(έρευση|ερεύσεις)/i;
const ACTIVITIES_RE = /^(δραστηριότητες|οι δραστηριότητες της ημέρας)\s*:?$/i;
const ROUTE_RE = /\(\d+\)|διανυκτερεύσ/i;
const GLANCE_HEADING_RE = /^(με μια ματιά|γιατί να επιλέξω|ομαδικά ταξίδια στην κούβα|ατομικά ταξίδια στην κούβα|θεματικά ταξίδια στην κούβα|προτάσεις για)/i;

function clean(value: string): string {
  return normalizeCurrency(stripEmoji(value.replace(/[\u200b\u200e\u00a0]/g, " ").replace(/\s+/g, " ").trim()));
}

/** Past-season promos and departures ("***Ειδική τιμή … 2024***", "Αναχώρηση από Αθήνα: 12 Απριλίου 2023"). */
function isExpired(line: string): boolean {
  const years = [...line.matchAll(/(20\d{2})/g)].map((m) => Number(m[1]));
  if (years.length === 0) return false;
  const latest = Math.max(...years);
  if (latest >= new Date().getFullYear()) return false;
  return /^\*{2,}/.test(line) || /^(αναχώρηση|αναχωρήσεις|ειδική τιμή)/i.test(line) || /^\d{1,2}\/\d{1,2}\/\d{4}/.test(line);
}

function splitGlance(line: string): GlanceItem[] {
  return line
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const idx = part.indexOf(":");
      if (idx < 2) return { label: "", value: part };
      return { label: part.slice(0, idx).trim(), value: part.slice(idx + 1).trim() };
    })
    .filter((item) => item.value.length > 1);
}

export function buildPackageSpec(record: ContentRecord, locale: Locale): PackageSpec {
  const spec: PackageSpec = {
    intro: [],
    glance: [],
    highlights: [],
    days: [],
    stays: [],
    included: [],
    priceTiers: [],
    flights: [],
    notes: [],
  };

  const title = clean(locale === "en" ? record.titleEn : record.titleEl);
  const lines = (locale === "en" ? record.bodyEn : record.bodyEl)
    .flatMap((paragraph) => paragraph.split("\n"))
    .map(clean)
    .filter((line) => line.length > 1 && !isOrnamentOnly(line) && !isExpired(line) && line !== title);

  let mode: Mode = "intro";
  let day: PackageDay | undefined;
  let inActivities = false;
  const seen = new Set<string>();

  const startDay = () => {
    day = { steps: [], activities: [] };
    spec.days.push(day);
    inActivities = false;
  };

  for (const line of lines) {
    if (GLANCE_HEADING_RE.test(line)) continue;

    if (HIGHLIGHTS_RE.test(line)) {
      mode = "highlights";
      continue;
    }
    if (PROGRAM_RE.test(line) && (line.includes("|") || line.length < 60)) {
      mode = "itinerary";
      continue;
    }
    // Remaining WP section headers: "Ομαδικό Ταξίδι στην Κούβα: Cuba Linda | Αβάνα - Τρινιδάδ:"
    if (line.includes("|") && line.endsWith(":") && !GLANCE_LABEL_RE.test(line)) continue;
    if (FLIGHTS_RE.test(line)) {
      mode = "flights";
      continue;
    }
    if (NOTE_RE.test(line)) {
      spec.notes.push(line.replace(/^\*+\s*/, ""));
      continue;
    }
    if (PRICE_START_RE.test(line)) {
      mode = "price";
    } else if (mode !== "price" && INCLUDED_RE.test(line)) {
      mode = "included";
    }

    // Glance facts only exist in the lead-in block, before the programme and inclusions.
    if (mode === "intro" && GLANCE_LABEL_RE.test(line)) {
      spec.glance.push(...splitGlance(line));
      continue;
    }

    switch (mode) {
      case "flights":
        if (FLIGHT_LINE_RE.test(line)) spec.flights.push(line);
        else spec.notes.push(line);
        break;

      case "price": {
        const amount = /\d[\d.,]*\s*€/.test(line);
        const tier = spec.priceTiers[spec.priceTiers.length - 1];
        const inline = amount ? line.match(/^(.{4,70}?):\s*(.*\d[\d.,]*\s*€.*)$/) : null;

        if (PRICE_NOTE_RE.test(line) && tier) {
          tier.notes.push(line);
        } else if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(line) && tier) {
          tier.period = line.replace(/:$/, "");
        } else if (inline) {
          spec.priceTiers.push({ label: inline[1].trim(), price: inline[2].trim(), notes: [] });
        } else if (amount && tier && !tier.price) {
          tier.price = line;
        } else if (amount) {
          spec.priceTiers.push({ label: "", price: line, notes: [] });
        } else {
          spec.priceTiers.push({ label: line.replace(/:$/, ""), notes: [] });
        }
        break;
      }

      case "included":
        if (!seen.has(line)) {
          seen.add(line);
          spec.included.push(line);
        }
        break;

      case "itinerary":
        // Standalone hotel names between the programme and the inclusions are the stay list.
        if (STAY_RE.test(line) && line.length < 90) {
          if (!seen.has(line)) {
            seen.add(line);
            spec.stays.push(line);
          }
          break;
        }
        if (!day) startDay();
        if (ACTIVITIES_RE.test(line)) {
          inActivities = true;
        } else if (OVERNIGHT_RE.test(line)) {
          day!.overnight = line;
          day = undefined;
        } else if (inActivities) {
          day!.activities.push(line);
        } else {
          day!.steps.push(line);
        }
        break;

      case "highlights":
        if (!seen.has(line)) {
          seen.add(line);
          spec.highlights.push(line);
        }
        break;

      default:
        if (!spec.route && ROUTE_RE.test(line) && line.length < 220) {
          spec.route = line.replace(/:$/, "");
        } else if (!seen.has(line)) {
          seen.add(line);
          spec.intro.push(line);
        }
    }
  }

  spec.days = spec.days.filter((d) => d.steps.length > 0 || d.activities.length > 0 || d.overnight);
  spec.priceTiers = spec.priceTiers.filter((tier) => tier.price || tier.notes.length > 0);

  const amounts = spec.priceTiers
    // Supplements ("Επιπλέον διανυκτέρευση: 40€") are not entry prices.
    .filter((tier) => !/επιπλέον|επιβάρυνση/i.test(tier.label))
    .map((tier) => (tier.price ? firstAmount(tier.price) : undefined))
    .filter((n): n is number => typeof n === "number");
  if (amounts.length > 0) {
    const min = Math.min(...amounts);
    spec.priceHeadline = `${locale === "en" ? "from" : "από"} ${min.toLocaleString("el-GR")}€`;
  }

  return spec;
}

/** Short summary line for package cards: route, or the first glance value. */
export function packageSummary(spec: PackageSpec): string | undefined {
  if (spec.route) return spec.route;
  const stay = spec.glance.find((item) => /διαμονή|stay/i.test(item.label));
  return stay?.value || spec.intro[0];
}
