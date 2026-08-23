import type { Locale } from "./types";

export const SITE = {
  name: "GO CUBA",
  tagline: "EASY TRAVEL PLANNING",
  domain: "https://gocuba.travel",
  phoneDisplay: "+30 210 32 32 522",
  phoneHref: "tel:+302103232522",
  email: "sales@skydream.gr",
  skype: "skydream_travel",
  mite: "0206Ε60000737600",
  offices: {
    el: [
      "ΕΛΛΑΔΑ: Πιττάκη 11, Μοναστηράκι, 105 54 Αθήνα",
      "ΚΥΠΡΟΣ: Κυριάκου Μάτση 18, 2408 Λευκωσία",
    ],
    en: [
      "GREECE: 11 Pittaki Street, Monastiraki, 105 54 Athens",
      "CYPRUS: 18 Kyriakou Matsi, 2408 Nicosia",
    ],
  },
} as const;

export type Office = {
  id: string;
  country: { el: string; en: string };
  city: { el: string; en: string };
  street: { el: string; en: string };
  postal: string;
  /** Passed to the Google Maps embed; must stay a real, geocodable address. */
  mapQuery: string;
  directions: string;
};

export const OFFICES: Office[] = [
  {
    id: "athens",
    country: { el: "ΕΛΛΑΔΑ", en: "Greece" },
    city: { el: "Αθήνα", en: "Athens" },
    street: { el: "Πιττάκη 11, Μοναστηράκι", en: "11 Pittaki Street, Monastiraki" },
    postal: "105 54",
    mapQuery: "Πιττάκη 11, Μοναστηράκι, 105 54 Αθήνα, Ελλάδα",
    directions: "https://www.google.com/maps/search/?api=1&query=%CE%A0%CE%B9%CF%84%CF%84%CE%AC%CE%BA%CE%B7+11%2C+%CE%9C%CE%BF%CE%BD%CE%B1%CF%83%CF%84%CE%B7%CF%81%CE%AC%CE%BA%CE%B9%2C+105+54+%CE%91%CE%B8%CE%AE%CE%BD%CE%B1",
  },
  {
    id: "nicosia",
    country: { el: "ΚΥΠΡΟΣ", en: "Cyprus" },
    city: { el: "Λευκωσία", en: "Nicosia" },
    street: { el: "Κυριάκου Μάτση 18", en: "18 Kyriakou Matsi Avenue" },
    postal: "2408",
    mapQuery: "Κυριάκου Μάτση 18, 2408 Λευκωσία, Κύπρος",
    directions: "https://www.google.com/maps/search/?api=1&query=%CE%9A%CF%85%CF%81%CE%B9%CE%AC%CE%BA%CE%BF%CF%85+%CE%9C%CE%AC%CF%84%CF%83%CE%B7+18%2C+2408+%CE%9B%CE%B5%CF%85%CE%BA%CF%89%CF%83%CE%AF%CE%B1",
  },
];

export const SOCIALS = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/Skydream.travel" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/skydream_travel/" },
  { id: "twitter", label: "X / Twitter", href: "https://twitter.com/skydream_travel" },
  { id: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/skydreamtravel/" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/skydream-travel/" },
] as const;

export const CERTIFICATIONS = [
  { label: "Travel Institute", href: "https://www.thetravelinstitute.com/" },
  { label: "EOT", href: "http://www.gnto.gov.gr/" },
  { label: ".travel", href: "https://www.skydream.travel/" },
] as const;

export type NavItem = {
  href: string;
  el: string;
  en: string;
};

/** Exact primary nav from skydream.gr #top-menu — same destinations, GO CUBA chrome. */
export const PRIMARY_NAV: NavItem[] = [
  { href: "/", el: "Αρχική", en: "Home" },
  { href: "/taxidi-stin-kouva/", el: "Ταξίδι στην Κούβα", en: "Travel to Cuba" },
  {
    href: "/paketa-diakopon-gia-kouva/",
    el: "Πακέτα διακοπών για Κούβα",
    en: "Cuba holiday packages",
  },
  { href: "/diamoni-stin-kouva/", el: "Διαμονή στην Κούβα", en: "Stay in Cuba" },
  { href: "/metafores-stin-kouva/", el: "Μεταφορές στην Κούβα", en: "Transfers in Cuba" },
  { href: "/ekdromes-stin-kouva/", el: "Εκδρομές στην Κούβα", en: "Tours in Cuba" },
  { href: "/visa-gia-kouva/", el: "Ηλεκτρονική Βίζα για Κούβα", en: "Cuba eVisa" },
  { href: "/blog-cuba-vibe/", el: "Cuba Vibe (Blog)", en: "Cuba Vibe (Blog)" },
  { href: "/taxidiotikes-istories/", el: "Ταξιδιωτικές Ιστορίες", en: "Travel stories" },
  { href: "/epikoinonia/", el: "Επικοινωνία", en: "Contact" },
];

export const FOOTER_LEGAL: NavItem[] = [
  { href: "/oroi-symmetochis/", el: "΄Οροι Συμμετοχής", en: "Terms & Conditions" },
  { href: "/cookies/", el: "Πολιτική Cookies", en: "Cookies policy" },
];

export const SISTER_BRANDS = [
  { href: "https://www.skydream.travel/", el: "Skydream Travel Design Studio", en: "Skydream Travel Design Studio" },
  { href: "https://www.myhoneymoon.gr/", el: "Γαμήλιο ταξίδι — myHoneymoon", en: "Honeymoon — myHoneymoon" },
] as const;

export const COPY = {
  searchPlaceholder: { el: "Αναζήτηση…", en: "Search…" },
  selectPage: { el: "Επιλέξτε σελίδα", en: "Select page" },
  certifications: { el: "Πιστοποιήσεις:", en: "Certifications:" },
  mite: { el: "Αρ. ΜΗΤΕ:", en: "GNTO licence:" },
  copyright: {
    el: "© 2026 GO CUBA | All rights reserved",
    en: "© 2026 GO CUBA | All rights reserved",
  },
  devCredit: {
    label: "Skydreams Lab",
    el: "Design and Developed by",
    en: "Design and Developed by",
  },
  seoCredit: {
    label: "AnotherSEOGuru.com",
    href: "https://anotherseoguru.com",
    el: "SEO by",
    en: "SEO by",
  },
  sisterIntro: { el: "Από το ίδιο στούντιο σχεδιασμού", en: "From the same design studio" },
  cookieText: {
    el: "Χρησιμοποιούμε cookies για καλύτερη περιήγηση, ανάλυση επισκεψιμότητας, εξατομίκευση περιεχομένου και διαφημίσεις. Αν συνεχίσετε, συναινείτε στη χρήση cookies.",
    en: "We use cookies to offer you a better browsing experience, analyze site traffic, personalize content, and serve targeted advertisements. If you continue to use this site, you consent to our use of cookies. Read about how we use cookies by clicking \"Cookie policy\".",
  },
  cookieAccept: { el: "Αποδοχή", en: "I accept" },
  cookiePolicy: { el: "Πολιτική cookies", en: "Cookie policy" },
  enquire: { el: "Ζητήστε προσφορά", en: "Request a quote" },
  readMore: { el: "Διάβασε περισσότερα…", en: "Read more…" },
  seeOptions: { el: "Δες τις επιλογές!", en: "See the options!" },
  included: { el: "Περιλαμβανόμενα", en: "Included" },
  bring: { el: "Τι να έχετε μαζί σας", en: "What to bring" },
  notes: { el: "Σημείωση", en: "Note" },
  activities: { el: "Δραστηριότητες", en: "Activities" },
  highlights: { el: "Highlights", en: "Highlights" },
  facilities: { el: "Το ξενοδοχείο διαθέτει", en: "Hotel facilities" },
  rooms: { el: "Τα δωμάτια διαθέτουν", en: "Room amenities" },
  restaurants: { el: "Εστιατόρια / Μπαρ", en: "Restaurants / Bars" },
  address: { el: "Διεύθυνση", en: "Address" },
  phone: { el: "Τηλέφωνο", en: "Phone" },
  gallery: { el: "Φωτογραφίες", en: "Gallery" },
  duration: { el: "Διάρκεια", en: "Duration" },
  type: { el: "Τύπος", en: "Type" },
  language: { el: "Γλώσσα", en: "Language" },
  ages: { el: "Ηλικίες", en: "Ages" },
  price: { el: "Τιμή", en: "Price" },
  adult: { el: "Ενήλικας", en: "Adult" },
  child: { el: "Παιδί", en: "Child" },
  departure: { el: "Αναχώρηση", en: "Departure" },
  pickup: { el: "Σημείο αναχώρησης", en: "Pickup" },
  availability: { el: "Διαθεσιμότητα", en: "Availability" },
  hiddenNotice: {
    el: "Αυτή η σελίδα είναι κρυφή και δεν εμφανίζεται στις μηχανές αναζήτησης.",
    en: "This page is hidden and is not indexed by search engines.",
  },
  offices: { el: "Τα γραφεία μας", en: "Our offices" },
  appointmentPhone: { el: "Τηλέφωνο για ραντεβού", en: "Phone for appointments" },
  openDirections: { el: "Οδηγίες πρόσβασης", en: "Get directions" },
  cubaAi: { el: "CUBA AI", en: "CUBA AI" },
} as const;

export function t<T extends Record<Locale, string>>(dict: T, locale: Locale): string {
  return dict[locale];
}
