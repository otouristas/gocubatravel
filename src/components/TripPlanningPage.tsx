import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Car,
  ChevronDown,
  ClipboardList,
  Check,
  FileText,
  Map,
  RefreshCw,
  Route,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";
import TripPlanningQuestionnaire from "@/components/TripPlanningQuestionnaire";
import type { Locale } from "@/content/types";
import { localizedPath } from "@/lib/i18n";

/** Anchor both CTAs at the questionnaire so they lead into the same real flow. */
const FORM_ANCHOR = "#erotimatologio";

const INCLUDES = [
  {
    icon: ClipboardList,
    el: {
      title: "Αξιολόγηση των αναγκών σου",
      body: "Συζητάμε τις ημερομηνίες, τη διάρκεια, το budget, τα ενδιαφέροντα και τον τρόπο που θέλεις να ταξιδέψεις, ώστε να κατανοήσουμε τι είναι σημαντικό για εσένα.",
    },
    en: {
      title: "An assessment of your needs",
      body: "We go through your dates, duration, budget, interests and the way you want to travel, so we understand what matters to you.",
    },
  },
  {
    icon: Route,
    el: {
      title: "Σχεδιασμός διαδρομής & κατανομή ημερών",
      body: "Επιλέγουμε τους προορισμούς που ταιριάζουν στο ταξίδι σου και οργανώνουμε τη σειρά των στάσεων, λαμβάνοντας υπόψη τις αποστάσεις και τον χρόνο που χρειάζεται κάθε μετακίνηση.",
    },
    en: {
      title: "Route design & how the days are split",
      body: "We choose the destinations that suit your trip and order the stops around the distances and the time each leg actually takes.",
    },
  },
  {
    icon: BedDouble,
    el: {
      title: "Επιλογή διαμονής",
      body: "Προτείνουμε ξενοδοχεία, resorts ή casas particulares με βάση την τοποθεσία, το στιλ του ταξιδιού, τις προτιμήσεις και το διαθέσιμο budget σου.",
    },
    en: {
      title: "Choosing where you stay",
      body: "We suggest hotels, resorts or casas particulares based on location, the style of the trip, your preferences and your available budget.",
    },
  },
  {
    icon: Car,
    el: {
      title: "Μεταφορές & εκδρομές",
      body: "Συνδυάζουμε τις κατάλληλες μεταφορές και προτείνουμε εκδρομές ή δραστηριότητες που ταιριάζουν στα ενδιαφέροντά σου και στη διαδρομή που έχουμε σχεδιάσει.",
    },
    en: {
      title: "Transfers & excursions",
      body: "We match the right transfers and suggest excursions or activities that fit your interests and the route we have designed.",
    },
  },
  {
    icon: FileText,
    el: {
      title: "Εξατομικευμένη πρόταση με κόστος",
      body: "Λαμβάνεις μια οργανωμένη πρόταση με τη διαδρομή, τη διαμονή και τις προτεινόμενες υπηρεσίες, μαζί με την αντίστοιχη κοστολόγηση, ώστε να μπορείς να αξιολογήσεις το ταξίδι πριν προχωρήσεις σε κράτηση.",
    },
    en: {
      title: "A personalised proposal with costs",
      body: "You receive an organised proposal covering the route, the stays and the suggested services with their costing, so you can weigh up the trip before booking.",
    },
  },
  {
    icon: RefreshCw,
    el: {
      title: "Μία αναθεώρηση της πρότασης",
      body: "Η υπηρεσία περιλαμβάνει μία αναθεώρηση, ώστε να προσαρμόσουμε την αρχική πρόταση με βάση τα σχόλιά σου, εντός του συμφωνημένου αντικειμένου του ταξιδιού.",
    },
    en: {
      title: "One revision of the proposal",
      body: "The service includes one revision, so we can adjust the initial proposal to your feedback within the agreed scope of the trip.",
    },
  },
];

const STEPS = [
  {
    el: {
      title: "Μας λες πώς θέλεις να ταξιδέψεις",
      body: "Συμπληρώνεις το ερωτηματολόγιο προτιμήσεων με τις ημερομηνίες, τις ημέρες που έχεις διαθέσιμες, τους ταξιδιώτες, το budget και όσα θα ήθελες να ζήσεις στην Κούβα. Δεν χρειάζεται να έχεις αποφασίσει από πριν όλους τους προορισμούς ή τις λεπτομέρειες.",
    },
    en: {
      title: "You tell us how you want to travel",
      body: "You fill in the preference questionnaire with your dates, the days you have available, the travellers, the budget and what you would like to experience in Cuba. You do not need to have decided all the destinations or details in advance.",
    },
  },
  {
    el: {
      title: "Ξεκινάς τον προσωπικό σχεδιασμό",
      body: "Ενημερώνεσαι για το τι περιλαμβάνει η υπηρεσία και ολοκληρώνεις την πληρωμή του Planning Fee των €95. Από εκεί και πέρα, αναλαμβάνουμε εμείς να αξιολογήσουμε τις προτιμήσεις σου και να σχεδιάσουμε την πρόταση του ταξιδιού σου.",
    },
    en: {
      title: "You start the personal planning",
      body: "You see what the service covers and complete the €95 planning fee. From there we take over, assess your preferences and design your trip proposal.",
    },
  },
  {
    el: {
      title: "Σχεδιάζουμε την πρότασή σου",
      body: "Αξιολογούμε τις ανάγκες και τις προτιμήσεις σου και οργανώνουμε μια εξατομικευμένη πρόταση με διαδρομή, διαμονή, μεταφορές, εκδρομές και αντίστοιχη κοστολόγηση.",
    },
    en: {
      title: "We design your proposal",
      body: "We assess your needs and preferences and put together a personalised proposal with route, stays, transfers, excursions and the matching costing.",
    },
  },
  {
    el: {
      title: "Λαμβάνεις την πρόταση και αποφασίζεις πώς θα προχωρήσεις",
      body: "Εξετάζεις την πρόταση και μας στέλνεις τα σχόλιά σου. Η υπηρεσία περιλαμβάνει μία αναθεώρηση εντός του αρχικού αιτήματος, ώστε να γίνουν οι απαραίτητες προσαρμογές.",
      note: "Εφόσον αποφασίσεις να προχωρήσεις σε κράτηση μέσω GoCuba, το Planning Fee συμψηφίζεται 100% με το τελικό κόστος του ταξιδιού σου.",
    },
    en: {
      title: "You receive the proposal and decide how to proceed",
      body: "You review the proposal and send us your feedback. The service includes one revision within the original request, so the necessary adjustments can be made.",
      note: "If you decide to book through GoCuba, the planning fee is credited 100% against the final cost of your trip.",
    },
  },
];

const FEE_ITEMS = [
  {
    icon: Wallet,
    el: {
      title: "€95 ανά αίτημα ταξιδιού",
      body: "Το fee αφορά τον σχεδιασμό ενός ταξιδιού, όχι κάθε ταξιδιώτη ξεχωριστά. Περιλαμβάνει την αρχική εξατομικευμένη πρόταση και μία αναθεώρηση εντός του συμφωνημένου αντικειμένου.",
    },
    en: {
      title: "€95 per trip request",
      body: "The fee covers the planning of one trip, not each traveller separately. It includes the initial personalised proposal and one revision within the agreed scope.",
    },
  },
  {
    icon: Check,
    el: {
      title: "100% συμψηφισμός με την τελική κράτηση",
      body: "Εφόσον προχωρήσεις στην κράτηση του ταξιδιού σου μέσω GoCuba, το ποσό των €95 αφαιρείται από το τελικό κόστος της κράτησης. Δεν αποτελεί επιπλέον χρέωση πάνω στην τιμή του ταξιδιού.",
    },
    en: {
      title: "100% credited against the final booking",
      body: "If you book your trip through GoCuba, the €95 is deducted from the final cost of the booking. It is not an extra charge on top of the trip price.",
    },
  },
  {
    icon: RefreshCw,
    el: {
      title: "Περιλαμβάνεται μία αναθεώρηση",
      body: "Μπορείς να μας στείλεις τα σχόλιά σου για την αρχική πρόταση, ώστε να γίνουν οι απαραίτητες προσαρμογές. Αν προκύψει ουσιαστική αλλαγή του αρχικού αιτήματος, όπως διαφορετικός προορισμός, σημαντική αλλαγή διάρκειας ή πλήρης επανασχεδιασμός, θα συζητήσουμε πρώτα μαζί σου τυχόν πρόσθετο κόστος.",
    },
    en: {
      title: "One revision is included",
      body: "You can send us your feedback on the initial proposal so the necessary adjustments are made. If the original request changes substantially — a different destination, a major change of duration or a full redesign — we discuss any additional cost with you first.",
    },
  },
  {
    icon: Map,
    el: {
      title: "Η κράτηση είναι ξεχωριστό βήμα",
      body: "Η πληρωμή του Planning Fee δεν αποτελεί κράτηση ταξιδιού και δεν δεσμεύει αεροπορικές θέσεις, καταλύματα ή άλλες υπηρεσίες. Η διαθεσιμότητα και οι τιμές επιβεβαιώνονται κατά τη διαδικασία της τελικής κράτησης.",
    },
    en: {
      title: "Booking is a separate step",
      body: "Paying the planning fee is not a trip booking and does not hold flight seats, accommodation or other services. Availability and prices are confirmed during the final booking process.",
    },
  },
];

const FAQS = [
  {
    el: {
      q: "Τι περιλαμβάνει το Planning Fee των €95;",
      a: "Το Planning Fee καλύπτει την εξατομικευμένη εργασία σχεδιασμού του ταξιδιού σου. Περιλαμβάνει την αξιολόγηση των προτιμήσεών σου, τον σχεδιασμό της διαδρομής και της κατανομής ημερών, την επιλογή διαμονής, μεταφορών και εκδρομών, καθώς και μια οργανωμένη πρόταση με το αντίστοιχο κόστος. Περιλαμβάνεται επίσης μία αναθεώρηση της αρχικής πρότασης.",
    },
    en: {
      q: "What does the €95 planning fee include?",
      a: "The planning fee covers the personalised work of designing your trip. It includes assessing your preferences, designing the route and the split of days, choosing stays, transfers and excursions, and an organised proposal with the matching costs. One revision of the initial proposal is also included.",
    },
  },
  {
    el: {
      q: "Το Planning Fee είναι €95 ανά άτομο;",
      a: "Όχι. Το Planning Fee είναι €95 ανά αίτημα ταξιδιού και όχι ανά ταξιδιώτη. Μπορεί, για παράδειγμα, να αφορά ένα ζευγάρι, μια οικογένεια ή μια παρέα που σχεδιάζει το ίδιο ταξίδι.",
    },
    en: {
      q: "Is the planning fee €95 per person?",
      a: "No. The planning fee is €95 per trip request, not per traveller. It can cover a couple, a family or a group of friends planning the same trip.",
    },
  },
  {
    el: {
      q: "Αν προχωρήσω σε κράτηση, αφαιρούνται τα €95 από το κόστος του ταξιδιού;",
      a: "Ναι. Εφόσον προχωρήσεις στην τελική κράτηση του ταξιδιού σου μέσω GoCuba, το Planning Fee συμψηφίζεται 100% με το τελικό κόστος της κράτησης. Δεν αποτελεί επιπλέον χρέωση πάνω στην τιμή του ταξιδιού.",
    },
    en: {
      q: "If I book, is the €95 deducted from the cost of the trip?",
      a: "Yes. If you proceed with the final booking of your trip through GoCuba, the planning fee is credited 100% against the final cost of the booking. It is not an extra charge on top of the trip price.",
    },
  },
  {
    el: {
      q: "Χρειάζεται να έχω αποφασίσει τις ημερομηνίες και τη διαδρομή πριν ξεκινήσω;",
      a: "Όχι. Μπορείς να ξεκινήσεις ακόμη κι αν δεν έχεις αποφασίσει ποιες περιοχές θέλεις να επισκεφτείς ή πώς να κατανείμεις τις ημέρες σου. Μέσα από το ερωτηματολόγιο προτιμήσεων θα μας δώσεις τις πληροφορίες που έχεις ήδη διαθέσιμες, ώστε να αξιολογήσουμε τις επιλογές σου και να σχεδιάσουμε μια πρόταση που σου ταιριάζει.",
    },
    en: {
      q: "Do I need to have decided my dates and route before starting?",
      a: "No. You can start even if you have not decided which areas you want to visit or how to split your days. Through the preference questionnaire you give us the information you already have, so we can assess your options and design a proposal that suits you.",
    },
  },
  {
    el: {
      q: "Τι γίνεται αν θέλω να αλλάξω κάτι στην πρόταση;",
      a: "Η υπηρεσία περιλαμβάνει μία αναθεώρηση της αρχικής πρότασης. Μπορείς να μας στείλεις τα σχόλιά σου, ώστε να προσαρμόσουμε τις επιλογές εντός του συμφωνημένου αντικειμένου του ταξιδιού. Αν προκύψει ουσιαστική αλλαγή, όπως σημαντική αλλαγή διάρκειας ή πλήρης επανασχεδιασμός, θα συζητήσουμε μαζί σου τυχόν πρόσθετο κόστος πριν προχωρήσουμε.",
    },
    en: {
      q: "What if I want to change something in the proposal?",
      a: "The service includes one revision of the initial proposal. You can send us your feedback so we adjust the options within the agreed scope of the trip. If a substantial change comes up, such as a major change of duration or a full redesign, we will discuss any additional cost with you before proceeding.",
    },
  },
  {
    el: {
      q: "Η πληρωμή των €95 σημαίνει ότι έχει γίνει κράτηση του ταξιδιού μου;",
      a: "Όχι. Το Planning Fee αφορά αποκλειστικά την υπηρεσία σχεδιασμού. Δεν αποτελεί κράτηση ταξιδιού και δεν δεσμεύει αεροπορικές θέσεις, καταλύματα ή άλλες ταξιδιωτικές υπηρεσίες. Οι τιμές και η διαθεσιμότητα επιβεβαιώνονται κατά τη διαδικασία της τελικής κράτησης.",
    },
    en: {
      q: "Does paying the €95 mean my trip is booked?",
      a: "No. The planning fee covers the planning service only. It is not a trip booking and does not hold flight seats, accommodation or other travel services. Prices and availability are confirmed during the final booking process.",
    },
  },
  {
    el: {
      q: "Μπορώ να χρησιμοποιήσω την υπηρεσία αν έχω ήδη κλείσει μέρος του ταξιδιού μου;",
      a: "Ναι, εφόσον το αίτημά σου αφορά τον σχεδιασμό του υπόλοιπου ταξιδιού στην Κούβα. Μπορείς να μας αναφέρεις ποιες υπηρεσίες έχεις ήδη κλείσει, ώστε να αξιολογήσουμε τι χρειάζεται να οργανωθεί και να προσαρμόσουμε την πρόταση στα δεδομένα σου.",
    },
    en: {
      q: "Can I use the service if I have already booked part of my trip?",
      a: "Yes, as long as your request concerns planning the rest of your trip in Cuba. You can tell us which services you have already booked, so we can assess what still needs organising and adapt the proposal to your situation.",
    },
  },
];

export default function TripPlanningPage({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <section className="border-b border-line bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                PERSONAL TRIP PLANNING
              </span>
              <h1 className="mt-3 font-editorial text-4xl font-normal leading-[1.15] text-ink sm:text-5xl lg:text-6xl">
                {isEn ? (
                  <>
                    Design the trip to Cuba that{" "}
                    <span className="italic text-gold-deep">really suits you</span>
                  </>
                ) : (
                  <>
                    Σχεδίασε το ταξίδι στην Κούβα που{" "}
                    <span className="italic text-gold-deep">πραγματικά σου ταιριάζει</span>
                  </>
                )}
              </h1>

              <p className="mt-6 text-base leading-relaxed text-muted">
                {isEn
                  ? "You want to get to know Cuba, but you are not sure which areas to combine, how many days to give each stop or which accommodation to choose?"
                  : "Θέλεις να γνωρίσεις την Κούβα, αλλά δεν ξέρεις ποιες περιοχές να συνδυάσεις, πόσες ημέρες να αφιερώσεις σε κάθε στάση ή ποια διαμονή να επιλέξεις;"}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {isEn
                  ? "With GoCuba Personal Trip Planning, a Cuba Specialist designs your route, stays, transfers and excursions around the days you have available, your interests and the way you want to travel."
                  : "Με το GoCuba Personal Trip Planning, ένας Cuba Specialist σχεδιάζει τη διαδρομή, τη διαμονή, τις μεταφορές και τις εκδρομές με βάση τις ημέρες που έχεις διαθέσιμες, τα ενδιαφέροντά σου και τον τρόπο που θέλεις να ταξιδέψεις."}
              </p>

              <p className="mt-6 font-editorial text-2xl text-ink">Personal Trip Planning · €95</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {isEn
                  ? "The planning fee is credited 100% against the final booking of your trip through GoCuba."
                  : "Το Planning Fee συμψηφίζεται 100% με την τελική κράτηση του ταξιδιού σου μέσω GoCuba."}
              </p>

              <div className="mt-8">
                <a href={FORM_ANCHOR} className="btn-gold">
                  <span>
                    {isEn ? "Start planning your trip" : "Ξεκίνα τον σχεδιασμό του ταξιδιού σου"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Compact pricing summary */}
            <aside className="rounded-sm border border-gold/40 bg-white p-6 shadow-md sm:p-8">
              <p className="font-editorial text-5xl text-ink">€95</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gold-deep">
                {isEn
                  ? "Personal trip planning for Cuba"
                  : "Προσωπικός σχεδιασμός ταξιδιού στην Κούβα"}
              </p>

              <ul className="mt-6 space-y-3 border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  <span>
                    {isEn
                      ? "Includes one personalised trip proposal and one revision."
                      : "Περιλαμβάνει μία εξατομικευμένη πρόταση ταξιδιού και μία αναθεώρηση."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  <span>
                    {isEn
                      ? "100% credited against the final booking through GoCuba"
                      : "100% συμψηφισμός με την τελική κράτηση μέσω GoCuba"}
                  </span>
                </li>
              </ul>

              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                {isEn
                  ? "The fee is for the planning service and is deducted from the amount of the final booking through GoCuba. It is not the price of the trip."
                  : "Το fee αφορά την υπηρεσία σχεδιασμού και αφαιρείται από το ποσό της τελικής κράτησης μέσω GoCuba. Δεν αποτελεί την τιμή του ταξιδιού."}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. What the service includes */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {isEn ? "THE SERVICE" : "Η ΥΠΗΡΕΣΙΑ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn
                ? "What the personal planning of your trip includes"
                : "Τι περιλαμβάνει ο προσωπικός σχεδιασμός του ταξιδιού σου"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {isEn
                ? "We turn your ideas and preferences into a complete trip proposal for Cuba, with options weighed against what you actually need."
                : "Αναλαμβάνουμε να μετατρέψουμε τις ιδέες και τις προτιμήσεις σου σε μια ολοκληρωμένη πρόταση ταξιδιού στην Κούβα, με επιλογές που έχουν αξιολογηθεί με βάση τις ανάγκες σου."}
            </p>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDES.map((item) => {
              const copy = isEn ? item.en : item.el;
              const Icon = item.icon;
              return (
                <li key={copy.title} className="border-l-2 border-gold/40 pl-4">
                  <Icon className="h-5 w-5 text-gold-deep" />
                  <h3 className="mt-3 font-editorial text-xl font-normal text-ink">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{copy.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {isEn ? "HOW IT WORKS" : "ΠΩΣ ΛΕΙΤΟΥΡΓΕΙ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn
                ? "From your ideas to a trip designed for you"
                : "Από τις ιδέες σου, σε ένα ταξίδι σχεδιασμένο για εσένα"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {isEn
                ? "A simple process for telling us what you have in mind and letting us take on the personal planning of your trip to Cuba."
                : "Μια απλή διαδικασία για να μας πεις τι έχεις στο μυαλό σου και να αναλάβουμε εμείς τον προσωπικό σχεδιασμό του ταξιδιού σου στην Κούβα."}
            </p>
          </div>

          <ol className="mt-12 grid gap-8 lg:grid-cols-4">
            {STEPS.map((item, idx) => {
              const copy = isEn ? item.en : item.el;
              const note = "note" in copy ? copy.note : undefined;
              return (
                <li key={copy.title} className="border-t-2 border-gold/40 pt-5">
                  <span className="font-editorial text-3xl text-gold-deep">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-editorial text-xl font-normal text-ink">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{copy.body}</p>
                  {note ? (
                    <p className="mt-3 rounded-sm bg-white p-3 text-xs leading-relaxed text-ink-soft ring-1 ring-gold/20">
                      {note}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. Planning fee & service scope */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                PLANNING FEE
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {isEn
                  ? "Invest in getting your trip planned properly"
                  : "Επένδυσε στον σωστό σχεδιασμό του ταξιδιού σου"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {isEn
                  ? "GoCuba Personal Trip Planning is a bespoke planning service. The planning fee covers the time and specialist work needed to build a proposal adapted to your needs."
                  : "Το GoCuba Personal Trip Planning είναι μια υπηρεσία εξατομικευμένου σχεδιασμού. Το Planning Fee καλύπτει τον χρόνο και την εξειδικευμένη εργασία που απαιτούνται για να δημιουργήσουμε μια πρόταση προσαρμοσμένη στις ανάγκες σου."}
              </p>

              <div className="mt-8 rounded-sm border border-gold/40 bg-paper p-6">
                <p className="font-editorial text-4xl text-ink">€95</p>
                <p className="mt-2 text-sm font-semibold text-gold-deep">
                  {isEn
                    ? "100% credited against the final booking through GoCuba"
                    : "100% συμψηφισμός με την τελική κράτηση μέσω GoCuba"}
                </p>
              </div>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2">
              {FEE_ITEMS.map((item) => {
                const copy = isEn ? item.en : item.el;
                const Icon = item.icon;
                return (
                  <li
                    key={copy.title}
                    className="rounded-sm border border-line bg-paper p-5 transition-colors hover:border-gold/50"
                  >
                    <Icon className="h-5 w-5 text-gold-deep" />
                    <h3 className="mt-3 text-base font-semibold text-ink">{copy.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{copy.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Meet your specialist */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm border border-line shadow-md lg:mx-0">
              <Image
                src="/angeliki-fotopoulou.jpg"
                alt={
                  isEn
                    ? "Angeliki Fotopoulou, GoCuba Cuba Destination Specialist"
                    : "Angeliki Fotopoulou, Cuba Destination Specialist της GoCuba"
                }
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                MEET YOUR SPECIALIST
              </span>
              <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
                {isEn
                  ? "Who takes on the planning of your trip?"
                  : "Ποιος αναλαμβάνει τον σχεδιασμό του ταξιδιού σου;"}
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                {isEn
                  ? "For 17+ years I have been planning trips to Cuba for Greek travellers. That experience helps me judge which routes, stays and activities genuinely suit the needs of each trip."
                  : "Εδώ και 17+ χρόνια σχεδιάζω ταξίδια στην Κούβα για Έλληνες ταξιδιώτες. Η εμπειρία μου με βοηθά να αξιολογώ ποιες διαδρομές, επιλογές διαμονής και δραστηριότητες ταιριάζουν πραγματικά στις ανάγκες κάθε ταξιδιού."}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {isEn
                  ? "My aim is to help you clarify your options and design a trip that makes proper use of the days you have and leaves room for what really matters to you."
                  : "Στόχος μου είναι να σε βοηθήσω να ξεκαθαρίσεις τις επιλογές σου και να σχεδιάσεις ένα ταξίδι που αξιοποιεί σωστά τις ημέρες που έχεις διαθέσιμες και δίνει χώρο σε όσα είναι πραγματικά σημαντικά για εσένα."}
              </p>

              <div className="mt-6 flex items-center gap-3 border-l-2 border-gold/50 pl-4">
                <UserRound className="h-5 w-5 shrink-0 text-gold-deep" />
                <div>
                  <p className="font-editorial text-lg text-ink">Angeliki Fotopoulou</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                    Cuba Destination Specialist
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href={localizedPath(locale, "/i-omada-mas/")} className="btn-luxury-outline">
                  <span>{isEn ? "Meet Angeliki" : "Γνώρισε την Angeliki"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQs — native disclosure elements keep the accordion accessible */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {isEn ? "FAQ" : "ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn
                ? "What you should know before you start"
                : "Όσα χρειάζεται να γνωρίζεις πριν ξεκινήσεις"}
            </h2>
          </div>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {FAQS.map((faq) => {
              const copy = isEn ? faq.en : faq.el;
              return (
                <details key={copy.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-editorial text-lg text-ink transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                    <span>{copy.q}</span>
                    <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-gold-deep transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{copy.a}</p>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="bg-[#0b0b0b] py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {isEn ? "START YOUR TRIP" : "ΞΕΚΙΝΑ ΤΟ ΤΑΞΙΔΙ ΣΟΥ"}
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-editorial text-3xl font-normal sm:text-4xl md:text-5xl">
            {isEn
              ? "The Cuba you want to know, with a trip designed for you"
              : "Η Κούβα που θέλεις να γνωρίσεις, με ένα ταξίδι σχεδιασμένο για εσένα"}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-white/80">
            {isEn
              ? "Share your preferences with us and leave the personal planning of your trip to a Cuba Specialist."
              : "Μοιράσου μαζί μας τις προτιμήσεις σου και άφησε τον προσωπικό σχεδιασμό του ταξιδιού σου σε έναν Cuba Specialist."}
          </p>

          <p className="mt-8 font-editorial text-2xl text-gold-light">
            Personal Trip Planning · €95
          </p>
          <p className="mt-1.5 text-sm text-white/70">
            {isEn
              ? "The planning fee is credited 100% against the final booking of your trip through GoCuba."
              : "Το Planning Fee συμψηφίζεται 100% με την τελική κράτηση του ταξιδιού σου μέσω GoCuba."}
          </p>

          <div className="mt-8">
            <a href={FORM_ANCHOR} className="btn-gold">
              <Sparkles className="h-4 w-4" />
              <span>{isEn ? "Start the personal planning" : "Ξεκίνα τον προσωπικό σχεδιασμό"}</span>
            </a>
            <p className="mt-3 text-xs text-white/60">
              {isEn
                ? "Fill in the preference questionnaire to get started."
                : "Συμπλήρωσε το ερωτηματολόγιο προτιμήσεων για να ξεκινήσεις."}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Preference questionnaire */}
      <section id="erotimatologio" className="scroll-mt-24 border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {isEn ? "PREFERENCE QUESTIONNAIRE" : "ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΠΡΟΤΙΜΗΣΕΩΝ"}
            </span>
            <h2 className="mt-2 font-editorial text-3xl font-normal text-ink sm:text-4xl">
              {isEn
                ? "Tell us how you want to travel"
                : "Πες μας πώς θέλεις να ταξιδέψεις"}
            </h2>
          </div>

          <TripPlanningQuestionnaire locale={locale} />
        </div>
      </section>
    </div>
  );
}
