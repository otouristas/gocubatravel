import type { Locale } from "./types";

/**
 * Editorial notes a specialist writes per property, keyed by the record path.
 *
 * `records.ts` is regenerated from the WordPress export, so these hand-written
 * fields live beside it instead of inside it. Any accommodation card can render
 * them; a property without an entry simply renders without the extra fields.
 */
export type StayEditorial = {
  /** Very short, scannable: "Ζευγάρια · Honeymoon · Παραλία". */
  idealFor: { el: string; en: string };
  /** One sentence on why GO CUBA recommends this specific property. */
  whyWeRecommend: { el: string; en: string };
  /** One practical specialist insight — never a repeat of the description. */
  goCubaTip: { el: string; en: string };
};

export const STAYS_EDITORIAL: Record<string, StayEditorial> = {
  "/avana-villa-me-pisina/": {
    idealFor: {
      el: "Οικογένειες · Παρέες · Πολυήμερη βάση στην Αβάνα",
      en: "Families · Groups · A multi-day base in Havana",
    },
    whyWeRecommend: {
      el: "Ιδιωτική βίλα με πισίνα σε ήσυχο προάστιο της Αβάνας, με χώρο και αυλή που δύσκολα βρίσκεις σε κατάλυμα μέσα στο ιστορικό κέντρο.",
      en: "A private villa with a pool in a quiet Havana suburb, with space and outdoor living you rarely find inside the historic centre.",
    },
    goCubaTip: {
      el: "Λειτουργεί καλύτερα όταν μένεις 3+ ημέρες στην Αβάνα — υπολόγισε λίγα λεπτά με ταξί για κάθε μετακίνηση προς την Habana Vieja.",
      en: "It works best on stays of 3+ days in Havana — allow a short taxi ride each time you head into Habana Vieja.",
    },
  },
  "/casa-angel-havana-vieja/": {
    idealFor: {
      el: "Ζευγάρια · Οικογένειες · Πρώτη φορά στην Αβάνα",
      en: "Couples · Families · First time in Havana",
    },
    whyWeRecommend: {
      el: "Βρίσκεται στην Plazuela del Ángel, με τα αξιοθέατα του ιστορικού κέντρου σε 10-15 λεπτά με τα πόδια και δωμάτια τόσο για δύο άτομα όσο και για οικογένειες.",
      en: "It sits on Plazuela del Ángel, a 10-15 minute walk from the sights of the historic centre, with rooms for couples and for families alike.",
    },
    goCubaTip: {
      el: "Η σουίτα δύο δωματίων μοιράζεται ένα μπάνιο — ιδανική για οικογένεια ή παρέα, λιγότερο για δύο ζευγάρια που ταξιδεύουν μαζί.",
      en: "The two-room suite shares one bathroom — ideal for a family or close group, less so for two couples travelling together.",
    },
  },
  "/casa-arakelis-habana-vieja/": {
    idealFor: {
      el: "Λάτρεις αρχιτεκτονικής · Οικογένειες · Παρέες",
      en: "Architecture lovers · Families · Groups",
    },
    whyWeRecommend: {
      el: "Αρχοντικό του 1830 λίγα βήματα από την Plaza de la Catedral και την Plaza de Armas, με οικοδέσποινα που φροντίζει τους ταξιδιώτες προσωπικά.",
      en: "An 1830 mansion steps from Plaza de la Catedral and Plaza de Armas, with a host who looks after travellers personally.",
    },
    goCubaTip: {
      el: "Ξεκίνα τη μέρα σου με τα πόδια νωρίς το πρωί: οι δύο κεντρικές πλατείες είναι λίγα λεπτά μακριά και είναι ακόμη άδειες από κόσμο.",
      en: "Start the day on foot early: both main squares are minutes away and still empty of crowds.",
    },
  },
  "/hotel-grand-memories-cayo-santa-maria-5/": {
    idealFor: {
      el: "Ζευγάρια · Honeymoon · Παραλία",
      en: "Couples · Honeymoon · Beach",
    },
    whyWeRecommend: {
      el: "All-inclusive 5* πάνω στην παραλία με λευκή άμμο του Cayo Santa María, για τις ημέρες χαλάρωσης μετά τις πόλεις και τις μετακινήσεις.",
      en: "A 5* all-inclusive on the white-sand beach of Cayo Santa María, for the days of rest that follow the cities and the driving.",
    },
    goCubaTip: {
      el: "Τοποθέτησέ το στο τέλος της διαδρομής σου — η πρόσβαση γίνεται μέσω του pedraplén από τη Σάντα Κλάρα και θέλει χρόνο μέσα στην ημέρα.",
      en: "Place it at the end of your route — access is over the pedraplén causeway from Santa Clara and takes a good part of a day.",
    },
  },
};

export function stayEditorial(path: string): StayEditorial | undefined {
  return STAYS_EDITORIAL[path];
}

export function pick(dict: { el: string; en: string }, locale: Locale): string {
  return dict[locale];
}
