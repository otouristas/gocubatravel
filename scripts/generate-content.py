#!/usr/bin/env python3
"""Build TypeScript content modules from extracted WordPress JSON."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"

HOTEL_CATS = {
    "xenodocheia-stin-avana",
    "xenodocheia-sto-varadero",
    "xenodocheia-sto-kagio-santa-maria",
    "casas-particulares-havana",
}
TOUR_SLUGS = {
    "ekdromi-stin-koilada-viniales",
    "periigisi-istoriko-kentro-avanas",
    "geitonies-tis-avanas",
    "playas-del-este-kai-kouvaneziko-gevma-sti-choulia",
    "trinidad",
    "anakalypste-tin-avana",
    "mageia-tis-avanas",
    "i-afthentiki-kouva",
    "ta-mystika-tis-avanas-ypo-to-fos-tis-sel",
    "seafari-me-katamaran",
    "mia-mera-sto-varadero",
    "kouva-cienfuegos-trinidad-topesdecollantes",
}

TITLE_EN = {
    "archiki": "Home",
    "epikoinonia": "Contact",
    "taxidiotikes-istories": "Travel Stories",
    "taxidi-stin-kouva": "Travel to Cuba",
    "oroi-symmetochis": "Terms & Conditions",
    "cookies": "Cookies Policy",
    "visa-gia-kouva": "Cuba eVisa",
    "paketa-diakopon-gia-kouva": "Cuba Holiday Packages",
    "atomika-taxidia": "Private Trips",
    "omadika-taxidia": "Group Trips",
    "gamilia-taxidia": "Honeymoons",
    "road-trips": "Road Trips",
    "thematika-taxidia": "Thematic Trips",
    "diamoni-stin-kouva": "Stay in Cuba",
    "ekdromes-stin-kouva": "Tours in Cuba",
    "metafores-stin-kouva": "Transfers in Cuba",
    "blog-cuba-vibe": "Cuba Vibe (Blog)",
    "organosi-taxidiou-stin-kouva": "Planning a Trip to Cuba",
    "cuba-travel-documents-guide": "Cuba Travel Documents Guide",
    "kouva-ergaleia-schediasmou-taxidiou": "Cuba Travel Planning Toolkit",
    "cuba-ready-waitlist": "Cuba Ready Waitlist",
    "cuba-smart-info-o-odigos-pliroforisis-gia-to-taxidi-sou-stin-kouva": "Cuba Smart Info",
    "i-omada-mas": "Our Team",
    "hotel-melia-cohiba": "Hotel Melia Cohiba 5*",
    "hotel-iberostar-grand-packard-5": "Hotel Iberostar Grand Packard 5*",
    "hotel-paradisus-los-cayos": "Hotel Paradisus Los Cayos 5*",
    "hotel-grand-memories-cayo-santa-maria-5": "Hotel Grand Memories Cayo Santa María 5*",
    "hotel-innside-habana-catedral-5": "Hotel Innside Habana Catedral 5*",
    "casa-angel-havana-vieja": "Casa Angel | Havana Vieja",
    "luxury-rooms-havana-vieja": "Luxury Rooms | Havana Vieja",
    "luxury-suites-havana-vieja": "Luxury Suites | Havana Vieja",
    "casa-arakelis-habana-vieja": "Casa Arakelis | Habana Vieja",
    "avana-villa-me-pisina": "Havana villa with pool",
    "ekdromi-stin-koilada-viniales": "The Aroma of Habanos: Nature & Tradition in Viñales",
    "periigisi-istoriko-kentro-avanas": "Old Havana walking tour with a Greek guide",
    "geitonies-tis-avanas": "Authentic Havana neighbourhoods with a Greek guide",
    "8-imeres-stin-avana": "8 days in Havana",
    "avana-varadero": "Havana – Varadero",
    "avana-trinidad-varadero": "Havana – Trinidad – Varadero",
    "avana-trinidad-kagio-santa-maria": "Havana – Trinidad – Cayo Santa María",
    "avana-kagio-santa-maria": "Havana – Cayo Santa María",
    "avana-kagio-koko": "Havana – Cayo Coco",
    "unesco-heritage-cities": "UNESCO Heritage Cities",
    "cuba-cities-beaches": "Cuba Cities & Beaches",
    "explore-cuba-west": "Explore Cuba West",
    "la-isla-del-caribe": "La Isla del Caribe",
    "cuba-linda": "Cuba Linda",
    "me-gusta-cuba": "Me Gusta Cuba",
    "explora-cuba": "Explora Cuba",
    "cuba-linda-private": "Cuba Linda Private",
    "explora-cuba-private": "Explora Cuba Private",
    "trinidad": "Trinidad",
    "explora-cuba-topes-de-collantes-varadero": "Explora Cuba with Topes de Collantes and Varadero",
    "panorama-dytikis-kouvas-topesdecollantes": "Western Cuba panorama with Topes de Collantes",
    "panorama-dytikis-kouvas-me-varadero": "Western Cuba panorama with Varadero",
    "evisa-gia-to-taxidi-sou-stin-kouva": "How to get a Cuba eVisa",
    "exerevniste-ti-mageia-tis-kouvas": "10 reasons to visit Cuba",
    "cuba-gastronomy": "The soul of Cuba through its cuisine",
    "diamoni-kouva-casas-particulares": "Staying in Cuba: casas particulares",
    "foto-avana-gamilio-taxidi-kouva": "Havana photography on a Cuban honeymoon",
    "taxidi-stin-kouva-sosti-epilogi": "Choosing the right Cuba itinerary",
}


OLD_EMAIL = re.compile(r"sales@skydream\.gr", re.IGNORECASE)


def load(name: str) -> list:
    data = json.loads((CONTENT / name).read_text(encoding="utf-8"))
    return data


def clean(s: str) -> str:
    s = (s or "").replace("\xa0", " ").replace("&nbsp;", " ").replace("&amp;", "&")
    # The old customer-facing address is retired; GoCuba mail goes to hello@gocuba.travel.
    # Rewritten here so it survives regeneration; the raw exports keep the address they
    # were extracted with, exactly as they keep their original image URLs.
    s = OLD_EMAIL.sub("hello@gocuba.travel", s)
    s = re.sub(r"\[inlinetweet[^\]]*\]|\[/inlinetweet\]", "", s)
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def https(url: str) -> str:
    if url.startswith("http://"):
        return "https://" + url[7:]
    return url


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def split_list(blob: str) -> list[str]:
    blob = clean(blob)
    if not blob:
        return []
    parts = re.split(r",|;|\n", blob)
    out = []
    for p in parts:
        p = p.strip(" .")
        if p:
            out.append(p)
    return out


def parse_hotel(text: str) -> dict:
    text = clean(text)
    fields = {
        "intro": text,
        "facilities": [],
        "rooms": [],
        "restaurants": [],
        "address": "",
        "phone": "",
    }
    patterns = [
        ("facilities", r"Το ξενοδοχείο διαθέτει:?\s*(.+?)(?=Τα δωμάτια|Εστιατόρια|Διεύθυνση|Τηλέφωνο|$)"),
        ("rooms", r"Τα δωμάτια διαθέτουν:?\s*(.+?)(?=Εστιατόρια|Διεύθυνση|Τηλέφωνο|$)"),
        ("restaurants", r"Εστιατόρια/?Μπαρ:?\s*(.+?)(?=Διεύθυνση|Τηλέφωνο|$)"),
        ("address", r"Διεύθυνση:?\s*(.+?)(?=Τηλέφωνο|Ο χάρτης|$)"),
        ("phone", r"Τηλέφωνο:?\s*(.+?)(?=Ο χάρτης|Διεύθυνση|$)"),
    ]
    intro_end = len(text)
    for key, pat in patterns:
        m = re.search(pat, text, re.S)
        if m:
            intro_end = min(intro_end, m.start())
            val = clean(m.group(1))
            if key in ("facilities", "rooms"):
                fields[key] = split_list(val)
            elif key == "restaurants":
                fields[key] = [p.strip() for p in re.split(r",(?![^(]*\))", val) if p.strip()]
            else:
                fields[key] = val.split("\n")[0].strip()
    fields["intro"] = clean(text[:intro_end])
    return fields


def parse_tour(text: str) -> dict:
    text = clean(text)
    labels = {
        "ages": r"Ηλικίες:\s*(.+?)(?=\n\n|\n[Α-ΩA-ZΗΔΤΓΏΣΠ]|Διάρκεια:|$)",
        "duration": r"Διάρκεια:\s*(.+?)(?=\n\n|\n[Α-ΩA-ZΗΔΤΓΏΣΠ]|Τύπος|$)",
        "type": r"Τύπος(?: Εκδρομής)?:\s*(.+?)(?=\n\n|\n[Α-ΩA-ZΗΔΤΓΏΣΠ]|Γλώσσα|$)",
        "language": r"Γλώσσα:\s*(.+?)(?=\n\n|\n[Α-ΩA-ZΗΔΤΓΏΣΠ]|Τι να περιμένετε|Τιμή|$)",
        "expect": r"Τι να περιμένετε:\s*(.+?)(?=\n\n|\nΤιμή:|$)",
        "price": r"Τιμή:\s*(.+?)(?=\n\n|\nΏρα|Σημείο|Διαθεσιμότητα|$)",
        "departureTime": r"Ώρα αναχώρησης:\s*(.+?)(?=\n\n|\nΣημείο|Διαθεσιμότητα|$)",
        "departurePlace": r"Σημείο Αναχώρησης:\s*(.+?)(?=\n\n|\nΔιαθεσιμότητα|Περιλαμβανόμενα|$)",
        "availability": r"Διαθεσιμότητα:\s*(.+?)(?=\n\n|\nΠεριλαμβανόμενα|$)",
        "included": r"Περιλαμβανόμενα:\s*(.+?)(?=\n\n|\nΤι να έχετε|$)",
        "bring": r"Τι να έχετε μαζί σας:\s*(.+?)(?=\n\n|\nΣημείωση|Δραστηριότητες|$)",
        "note": r"Σημείωση:\s*(.+?)(?=\n\n|\nΔραστηριότητες|Highlights|$)",
    }
    fields = {k: "" for k in labels}
    fields["intro"] = text
    fields["activities"] = []
    fields["highlights"] = ""
    first = len(text)
    for key, pat in labels.items():
        m = re.search(pat, text, re.S)
        if m:
            first = min(first, m.start())
            fields[key] = clean(m.group(1))
    act = re.search(r"Δραστηριότητες:\s*(.+?)(?=Highlights:|Επιστροφή|$)", text, re.S)
    if act:
        first = min(first, act.start())
        lines = [clean(l).lstrip("•-– ").strip() for l in act.group(1).split("\n")]
        fields["activities"] = [l for l in lines if l and not l.startswith("&")]
    hi = re.search(r"Highlights:\s*(.+)$", text, re.S)
    if hi:
        first = min(first, hi.start())
        fields["highlights"] = clean(hi.group(1))
    fields["intro"] = clean(text[:first])
    price = fields["price"]
    adult = child = ""
    m = re.search(r"Ενήλικας\s*([0-9]+)\s*Ευρώ", price, re.I)
    if m:
        adult = m.group(1) + "€"
    m = re.search(r"Παιδ[ίι]\s*([0-9]+)\s*Ευρώ", price, re.I)
    if m:
        child = m.group(1) + "€"
    fields["priceAdult"] = adult
    fields["priceChild"] = child
    return fields


def stars_from(title: str) -> int:
    m = re.search(r"(\d)\s*\*", title)
    return int(m.group(1)) if m else 0


def kind_of(item: dict, extra_cats: list | None = None) -> str:
    slug = item.get("slug", "")
    title = item.get("title", "")
    if slug in TOUR_SLUGS or "tour template" in title.lower():
        return "tour"
    if (
        slug.startswith("hotel-")
        or "hotel template" in title.lower()
        or slug.startswith(("casa-", "luxury-", "los-frailes", "meson-"))
        or slug == "avana-villa-me-pisina"
    ):
        return "hotel"
    if "cuba-stories" in (extra_cats or []) or "gamilio-taxidi" in slug or "road-trip-kouva" in slug:
        return "story"
    if item.get("type") == "post" and slug.startswith("cuba-"):
        return "blog"
    if item.get("type") == "post":
        return "post"
    return "page"


def title_en(item: dict) -> str:
    slug = item["slug"]
    if slug in TITLE_EN:
        return TITLE_EN[slug]
    t = re.sub(r"\s*\(.*?\)\s*", " ", item["title"]).strip()
    return t


def brand_meta(s: str) -> str:
    if not s:
        return s
    s = s.replace("Skydream Travel Specialist", "GO CUBA")
    s = s.replace("Skydream Travel", "GO CUBA")
    s = s.replace("Skydream Cuba Travel Specialist", "GO CUBA")
    s = s.replace("Skydream Cuba", "GO CUBA")
    s = s.replace("| Skydream", "| GO CUBA")
    s = s.replace("%%sitename%%", "GO CUBA")
    s = s.replace("%%title%% %%page%%", "")
    return clean(s)


def paragraphs(text: str) -> list[str]:
    text = clean(text)
    chunks = [c.strip() for c in re.split(r"\n+", text) if c.strip() and c.strip() != "&nbsp;"]
    return chunks


def emit_localized(el: str, en: str) -> str:
    return f"{{ el: {ts_str(el)}, en: {ts_str(en)} }}"


def simple_en(el: str) -> str:
    """Keep Greek factual body available; provide a readable English companion."""
    el = clean(el)
    if not el:
        return ""
    # Light replacements for brand + common labels so EN pages stay useful
    en = el
    repl = [
        ("Skydream Travel", "GO CUBA"),
        ("Skydream", "GO CUBA"),
        ("Το ξενοδοχείο", "The hotel"),
        ("Διεύθυνση:", "Address:"),
        ("Τηλέφωνο:", "Phone:"),
        ("Διάρκεια:", "Duration:"),
        ("Τιμή:", "Price:"),
        ("Περιλαμβανόμενα:", "Included:"),
        ("Γλώσσα:", "Language:"),
        ("Ενήλικας", "Adult"),
        ("Παιδί", "Child"),
        ("Ευρώ", "EUR"),
    ]
    for a, b in repl:
        en = en.replace(a, b)
    return en


def main() -> None:
    hotels_tours = load("_raw_hotels_tours.json")
    drafts = load("_raw_drafts.json")
    pages = load("_raw_pages.json")
    more = load("_raw_more.json")

    records: dict[str, dict] = {}

    def add(item: dict, default_path: str | None = None) -> None:
        path = item.get("path") or default_path
        if not path:
            path = f"/{item['slug']}/"
        if path == "/" and item.get("slug") not in ("archiki", ""):
            path = f"/{item['slug']}/"
        path = path if path.endswith("/") or path == "/" else path + "/"
        key = path
        # collision: keep first published, allow unique parent paths
        if key in records and records[key]["id"] != item["id"]:
            if item.get("parent"):
                key = f"/{item['parent']}/{item['slug']}/".replace("//", "/")
                if not key.startswith("/"):
                    key = "/" + key
            else:
                return
        kind = kind_of(item)
        rec = {
            "id": item["id"],
            "slug": item["slug"],
            "path": key if key != "//" else "/",
            "kind": kind,
            "status": item.get("status", "publish"),
            "noindex": item.get("status") == "draft",
            "titleEl": re.sub(r"\s*\(.*?template.*?\)\s*", "", item["title"], flags=re.I).strip(),
            "titleEn": title_en(item),
            "excerptEl": clean(item.get("excerpt") or item.get("yd") or "")[:280],
            "excerptEn": brand_meta(clean(item.get("yd") or item.get("excerpt") or ""))[:280],
            "seoTitleEl": brand_meta(item.get("yoast_title") or item.get("yt") or item["title"]),
            "seoTitleEn": brand_meta((item.get("yoast_title") or item.get("yt") or title_en(item)))
            .replace("Ταξίδι στην Κούβα", "Travel to Cuba")
            .replace("Επικοινωνία", "Contact"),
            "seoDescEl": brand_meta(item.get("yoast_desc") or item.get("yd") or ""),
            "seoDescEn": brand_meta(item.get("yoast_desc") or item.get("yd") or ""),
            "bodyEl": paragraphs(item.get("text", "")),
            "bodyEn": paragraphs(simple_en(item.get("text", ""))),
            "images": [https(u) for u in item.get("images", []) if u],
            "thumb": https(item.get("thumb") or (item.get("images") or [""])[0] or ""),
        }
        if kind == "hotel":
            h = parse_hotel(item.get("text", ""))
            rec["hotel"] = {
                "stars": stars_from(item["title"]),
                "introEl": h["intro"],
                "introEn": simple_en(h["intro"]),
                "facilitiesEl": h["facilities"],
                "facilitiesEn": [simple_en(x) for x in h["facilities"]],
                "roomsEl": h["rooms"],
                "roomsEn": [simple_en(x) for x in h["rooms"]],
                "restaurantsEl": h["restaurants"],
                "restaurantsEn": [simple_en(x) for x in h["restaurants"]],
                "address": h["address"],
                "phone": h["phone"],
            }
        if kind == "tour":
            t = parse_tour(item.get("text", ""))
            rec["tour"] = {
                "introEl": t["intro"],
                "introEn": simple_en(t["intro"]),
                "agesEl": t["ages"],
                "agesEn": simple_en(t["ages"]),
                "durationEl": t["duration"],
                "durationEn": simple_en(t["duration"]),
                "typeEl": t["type"],
                "typeEn": simple_en(t["type"]),
                "languageEl": t["language"],
                "languageEn": simple_en(t["language"]),
                "expectEl": t["expect"],
                "expectEn": simple_en(t["expect"]),
                "priceEl": t["price"],
                "priceEn": simple_en(t["price"]),
                "priceAdult": t["priceAdult"],
                "priceChild": t["priceChild"],
                "departureTime": t["departureTime"],
                "departurePlaceEl": t["departurePlace"],
                "departurePlaceEn": simple_en(t["departurePlace"]),
                "availabilityEl": t["availability"],
                "availabilityEn": simple_en(t["availability"]),
                "includedEl": t["included"],
                "includedEn": simple_en(t["included"]),
                "bringEl": t["bring"],
                "bringEn": simple_en(t["bring"]),
                "noteEl": t["note"],
                "noteEn": simple_en(t["note"]),
                "activitiesEl": t["activities"],
                "activitiesEn": [simple_en(x) for x in t["activities"]],
                "highlightsEl": t["highlights"],
                "highlightsEn": simple_en(t["highlights"]),
            }
        records[rec["path"]] = rec

    for item in pages + more + hotels_tours:
        add(item)
    for item in drafts:
        add(item, f"/{item['slug']}/")

    # Alias paths that the live footer uses
    if "/oroi-symmetochis/" in records:
        records["/terms-conditions/"] = {**records["/oroi-symmetochis/"], "path": "/terms-conditions/", "aliasOf": "/oroi-symmetochis/"}
    if "/cookies/" in records:
        records["/cookies-policy/"] = {**records["/cookies/"], "path": "/cookies-policy/", "aliasOf": "/cookies/"}

    out = sorted(records.values(), key=lambda r: (r["kind"], r["path"]))
    ts_path = CONTENT / "records.ts"
    lines = [
        "import type { ContentRecord } from \"./types\";",
        "",
        "export const records: ContentRecord[] = " + json.dumps(out, ensure_ascii=False, indent=2) + ";",
        "",
        "export const recordsByPath = Object.fromEntries(records.map((r) => [r.path, r]));",
        "",
        "export const hotels = records.filter((r) => r.kind === \"hotel\");",
        "export const tours = records.filter((r) => r.kind === \"tour\");",
        "export const stories = records.filter((r) => r.kind === \"story\");",
        "export const blogPosts = records.filter((r) => r.kind === \"blog\" || (r.kind === \"post\" && !r.noindex));",
    ]
    ts_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {ts_path} ({len(out)} records)")
    from collections import Counter
    print(Counter(r["kind"] for r in out))
    print("noindex", sum(1 for r in out if r["noindex"]))


if __name__ == "__main__":
    main()
