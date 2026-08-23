import type { ContentRecord, Locale } from "@/content/types";
import { firstAmount, isOrnamentOnly, normalizeCurrency, stripEmoji } from "@/lib/text";

export type SpecHighlight = { title?: string; text: string };
export type PriceTier = { label: string; value: string };
export type TourDay = { title: string; items: string[] };

export type TourSpec = {
  intro: string[];
  ages?: string;
  duration?: string;
  type?: string;
  languages?: string;
  interests?: string;
  expect?: string;
  priceHeadline?: string;
  priceDetail?: string;
  priceTiers: PriceTier[];
  departureTime?: string;
  returnTime?: string;
  departurePlace?: string;
  availability?: string;
  included: string[];
  notIncluded: string[];
  bring: string[];
  extras: string[];
  notes: string[];
  highlights: SpecHighlight[];
  activities: string[];
  days: TourDay[];
  outro: string[];
};

type Mode =
  | "intro"
  | "highlights"
  | "activities"
  | "notes"
  | "included"
  | "notIncluded"
  | "priceTiers"
  | "day";

const SECTIONS: { re: RegExp; mode: Mode }[] = [
  { re: /^(highlights|σημεία ενδιαφέροντος)\s*:?$/i, mode: "highlights" },
  { re: /^(δραστηριότητες|πρόγραμμα|activities)\s*:?$/i, mode: "activities" },
  { re: /^(σχόλια|σημειώσεις|σημείωση|notes?)\s*:?$/i, mode: "notes" },
  {
    re: /^(τι περιλαμβάνεται|περιλαμβάνονται|είσοδοι σε μουσεία.*|included)\s*:?$/i,
    mode: "included",
  },
  { re: /^(τι δεν περιλαμβάνεται|δεν περιλαμβάνονται|not included)\s*:?$/i, mode: "notIncluded" },
  { re: /^(κόστος ανά άτομο|τιμές|τιμή ανά άτομο|prices?)\s*:?$/i, mode: "priceTiers" },
];

const LABELS: { key: string; re: RegExp }[] = [
  { key: "ages", re: /^(ηλικίες|ages)$/i },
  { key: "duration", re: /^(διάρκεια|duration)$/i },
  { key: "type", re: /^(τύπος εκδρομής|τύπος|type)$/i },
  { key: "languages", re: /^(γλώσσες|γλώσσα|languages?)$/i },
  { key: "expect", re: /^(τι να περιμένετε|what to expect)$/i },
  { key: "interests", re: /^(ενδιαφέροντα|interests)$/i },
  { key: "price", re: /^(τιμή ανά άτομο.*|τιμή|κόστος|price|cost)$/i },
  { key: "departureTime", re: /^(ώρα αναχώρησης|departure time)$/i },
  { key: "departureTime", re: /^(αναχώρηση|departure)$/i },
  { key: "returnTime", re: /^(επιστροφή|return)$/i },
  { key: "departurePlace", re: /^(σημείο αναχώρησης|pickup|meeting point)$/i },
  { key: "availability", re: /^(διαθεσιμότητα|availability)$/i },
  { key: "included", re: /^(περιλαμβανόμενα|included)$/i },
  { key: "bring", re: /^(τι να έχετε μαζί σας|what to bring)$/i },
  { key: "extras", re: /^(προαιρετική επιβάρυνση|optional)$/i },
  { key: "note", re: /^(σημείωση|note)$/i },
  { key: "booking", re: /^(κρατήσεις|bookings)$/i },
];

const DAY_RE = /^(?:★|☆|\*)?\s*(ημέρα\s*\d+.*|day\s*\d+.*)$/i;
const TIER_RE = /^(.{2,80}?):\s*(.*\d[\d.,]*\s*€.*)$/;

function clean(value: string): string {
  return normalizeCurrency(stripEmoji(value.replace(/\s+/g, " ").trim()));
}

function splitLines(source: string[]): string[] {
  return source
    .flatMap((paragraph) => paragraph.split("\n"))
    .map(clean)
    .filter((line) => line.length > 1 && !isOrnamentOnly(line));
}

function labelOf(line: string): { key: string; value: string } | undefined {
  const idx = line.indexOf(":");
  if (idx < 2 || idx > 60) return undefined;
  const head = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  const match = LABELS.find((l) => l.re.test(head));
  return match ? { key: match.key, value } : undefined;
}

function pushHighlight(list: SpecHighlight[], line: string, next?: string) {
  const looksLikeHeading =
    line.length <= 70 && !/[.!;]$/.test(line) && !line.includes(":") && Boolean(next) && next!.length > 90;

  if (looksLikeHeading) {
    list.push({ title: line, text: next! });
    return true;
  }

  const inline = line.match(/^(.{3,70}?):\s*(.{20,})$/);
  if (inline) {
    list.push({ title: inline[1].trim(), text: inline[2].trim() });
    return false;
  }

  list.push({ text: line });
  return false;
}

export function buildTourSpec(record: ContentRecord, locale: Locale): TourSpec {
  const tour = record.tour;
  const isEn = locale === "en";

  const spec: TourSpec = {
    intro: [],
    priceTiers: [],
    included: [],
    notIncluded: [],
    bring: [],
    extras: [],
    notes: [],
    highlights: [],
    activities: [],
    days: [],
    outro: [],
  };

  const bodyLines = splitLines(isEn ? record.bodyEn : record.bodyEl);
  const highlightLines = tour ? splitLines([isEn ? tour.highlightsEn : tour.highlightsEl]) : [];
  const lines = [...bodyLines, ...highlightLines];

  // The WP highlights blob repeats the body almost verbatim; only its extras matter.
  const seen = new Set(bodyLines);
  let mode: Mode = "intro";
  let currentDay: TourDay | undefined;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (i >= bodyLines.length) {
      if (seen.has(line)) continue;
      seen.add(line);
    }

    const day = line.match(DAY_RE);
    if (day) {
      currentDay = { title: clean(day[1]), items: [] };
      spec.days.push(currentDay);
      mode = "day";
      continue;
    }

    const section = SECTIONS.find((s) => s.re.test(line.replace(/\s*:\s*$/, ":")));
    if (section) {
      mode = section.mode;
      continue;
    }

    if (mode === "priceTiers") {
      const tier = line.match(TIER_RE);
      if (tier) {
        spec.priceTiers.push({ label: tier[1].trim(), value: tier[2].trim() });
        continue;
      }
    }

    const label = labelOf(line);
    if (label && label.value) {
      switch (label.key) {
        case "ages":
          spec.ages ||= label.value;
          break;
        case "duration":
          spec.duration ||= label.value;
          break;
        case "type":
          spec.type ||= label.value;
          break;
        case "languages":
          spec.languages ||= label.value;
          break;
        case "expect":
          spec.expect ||= label.value;
          break;
        case "interests":
          spec.interests ||= label.value;
          break;
        case "price":
          spec.priceDetail ||= label.value;
          break;
        case "departureTime":
          if (/\d{1,2}[.:]\d{2}/.test(label.value)) spec.departureTime ||= label.value;
          else spec.departurePlace ||= label.value;
          break;
        case "returnTime":
          spec.returnTime ||= label.value;
          break;
        case "departurePlace":
          spec.departurePlace ||= label.value;
          break;
        case "availability":
          spec.availability ||= label.value;
          break;
        case "included":
          spec.included.push(...label.value.split(/,\s(?![^(]*\))/).map((s) => s.trim()));
          break;
        case "bring":
          spec.bring.push(...label.value.split(/,\s(?![^(]*\))/).map((s) => s.trim()));
          break;
        case "extras":
          spec.extras.push(label.value);
          break;
        case "note":
          spec.notes.push(label.value);
          break;
        case "booking":
          spec.notes.push(line);
          break;
      }
      continue;
    }

    switch (mode) {
      case "day":
        currentDay?.items.push(line);
        break;
      case "activities":
        spec.activities.push(line);
        break;
      case "notes":
        if (line.length > 180) spec.outro.push(line);
        else spec.notes.push(line);
        break;
      case "included":
        spec.included.push(line);
        break;
      case "notIncluded":
        spec.notIncluded.push(line);
        break;
      case "priceTiers":
        spec.notes.push(line);
        break;
      case "highlights":
        if (pushHighlight(spec.highlights, line, lines[i + 1])) i += 1;
        break;
      default:
        spec.intro.push(line);
    }
  }

  // A trailing wall of prose is a closing pitch, not a bullet.
  while (spec.highlights.length > 1) {
    const last = spec.highlights[spec.highlights.length - 1];
    if (last.title || last.text.length < 140) break;
    spec.outro.unshift(last.text);
    spec.highlights.pop();
  }

  if (tour) {
    const fill = (key: keyof TourSpec, raw: string) => {
      const value = clean(raw);
      if (!spec[key] && value) (spec as Record<string, unknown>)[key] = value;
    };
    fill("duration", isEn ? tour.durationEn : tour.durationEl);
    fill("type", isEn ? tour.typeEn : tour.typeEl);
    fill("languages", isEn ? tour.languageEn : tour.languageEl);
    fill("ages", isEn ? tour.agesEn : tour.agesEl);
    fill("availability", isEn ? tour.availabilityEn : tour.availabilityEl);
    fill("departurePlace", isEn ? tour.departurePlaceEn : tour.departurePlaceEl);
    fill("departureTime", tour.departureTime);
    fill("expect", isEn ? tour.expectEn : tour.expectEl);

    if (spec.activities.length === 0) {
      spec.activities = (isEn ? tour.activitiesEn : tour.activitiesEl).map(clean).filter(Boolean);
    }
    if (tour.priceAdult) {
      spec.priceHeadline = normalizeCurrency(tour.priceAdult);
      if (!spec.priceDetail) spec.priceDetail = clean(isEn ? tour.priceEn : tour.priceEl);
    }
  }

  if (!spec.priceHeadline) {
    const fromDetail = spec.priceDetail ? firstAmount(spec.priceDetail) : undefined;
    if (fromDetail) {
      spec.priceHeadline = `${fromDetail}€`;
    } else if (spec.priceTiers.length > 0) {
      const amounts = spec.priceTiers
        .map((tier) => firstAmount(tier.value))
        .filter((n): n is number => typeof n === "number");
      if (amounts.length > 0) {
        spec.priceHeadline = `${isEn ? "from" : "από"} ${Math.min(...amounts)}€`;
      }
    }
  }

  // De-duplicate list entries that arrived from both body and highlights.
  spec.included = unique(spec.included);
  spec.notIncluded = unique(spec.notIncluded);
  spec.bring = unique(spec.bring);
  spec.extras = unique(spec.extras);
  spec.notes = unique(spec.notes);
  spec.activities = unique(spec.activities);
  spec.outro = unique(spec.outro);

  return spec;
}

function unique(list: string[]): string[] {
  return Array.from(new Set(list.map((s) => s.trim()).filter((s) => s.length > 1)));
}
