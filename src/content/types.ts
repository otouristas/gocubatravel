export type Locale = "el" | "en";

export type ContentKind =
  | "page"
  | "hotel"
  | "tour"
  | "story"
  | "blog"
  | "post";

export type Localized = {
  el: string;
  en: string;
};

export type HotelFields = {
  stars: number;
  introEl: string;
  introEn: string;
  facilitiesEl: string[];
  facilitiesEn: string[];
  roomsEl: string[];
  roomsEn: string[];
  restaurantsEl: string[];
  restaurantsEn: string[];
  address: string;
  phone: string;
};

export type TourFields = {
  introEl: string;
  introEn: string;
  agesEl: string;
  agesEn: string;
  durationEl: string;
  durationEn: string;
  typeEl: string;
  typeEn: string;
  languageEl: string;
  languageEn: string;
  expectEl: string;
  expectEn: string;
  priceEl: string;
  priceEn: string;
  priceAdult: string;
  priceChild: string;
  departureTime: string;
  departurePlaceEl: string;
  departurePlaceEn: string;
  availabilityEl: string;
  availabilityEn: string;
  includedEl: string;
  includedEn: string;
  bringEl: string;
  bringEn: string;
  noteEl: string;
  noteEn: string;
  activitiesEl: string[];
  activitiesEn: string[];
  highlightsEl: string;
  highlightsEn: string;
};

export type ContentRecord = {
  id: number;
  slug: string;
  path: string;
  kind: ContentKind;
  status: string;
  noindex: boolean;
  titleEl: string;
  titleEn: string;
  excerptEl: string;
  excerptEn: string;
  seoTitleEl: string;
  seoTitleEn: string;
  seoDescEl: string;
  seoDescEn: string;
  bodyEl: string[];
  bodyEn: string[];
  images: string[];
  thumb: string;
  hotel?: HotelFields;
  tour?: TourFields;
  aliasOf?: string;
};
