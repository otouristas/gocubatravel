"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  Calendar,
  Users,
  Building,
  Heart,
  Car,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  MessageSquare,
  Share2,
  RefreshCw,
  Star,
  ShieldCheck,
  Check,
  Copy,
  DollarSign,
} from "lucide-react";
import { SITE } from "@/content/site";
import type { Locale } from "@/content/types";
import { localizedPath } from "@/lib/i18n";

type TravelType = "couple" | "family" | "friends" | "solo" | "honeymoon";
type StayType = "5star" | "casas" | "blend";
type DurationType = "7days" | "10days" | "14days" | "21days";
type PaceType = "relaxed" | "balanced" | "active";

export default function AiItineraryCreator({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  const [step, setStep] = useState<number>(1);
  const [travelType, setTravelType] = useState<TravelType>("couple");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([
    "havana_vintage",
    "vinales_cigar",
    "trinidad_unesco",
    "cayos_beach",
  ]);
  const [duration, setDuration] = useState<DurationType>("10days");
  const [pace, setPace] = useState<PaceType>("balanced");
  const [stay, setStay] = useState<StayType>("blend");
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [travelMonth, setTravelMonth] = useState<string>("October 2026");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Form submit state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleVibe = (id: string) => {
    setSelectedVibes((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(5); // Results step
    }, 1200);
  };

  // Dynamic itinerary computation
  const getGeneratedItinerary = () => {
    const daysCount =
      duration === "7days" ? 7 : duration === "10days" ? 10 : duration === "14days" ? 14 : 21;

    const baseRoute = isEn
      ? "Havana • Viñales Valley • Cienfuegos • Trinidad • Cayo Santa María • Varadero"
      : "Αβάνα • Κοιλάδα Βινιάλες • Σιενφουέγος • Τρινιδάδ • Κάγιο Σάντα Μαρία • Βαραδέρο";

    const days = [];

    // Day 1
    days.push({
      day: 1,
      title: isEn ? "Arrival in Havana & Vintage Malecón Welcome" : "Άφιξη στην Αβάνα & Υποδοχή στο Malecón",
      location: "Havana",
      desc: isEn
        ? "VIP arrival at José Martí Airport with private transfer. Check-in to your colonial suite. Sunset convertible classic car cruise along the iconic Malecón followed by welcome dinner at La Guarida."
        : "VIP άφιξη στο αεροδρόμιο Χοσέ Μαρτί και ιδιωτική μεταφορά. Τακτοποίηση στο κατάλυμα. Βόλτα με κλασικό vintage αυτοκίνητο στο ηλιοβασίλεμα στο Malecón και δείπνο καλωσορίσματος στο La Guarida.",
      stay: stay === "5star" ? "Hotel Iberostar Grand Packard 5*" : stay === "casas" ? "Luxury Suites Havana Vieja" : "Hotel Melia Cohiba (The Level 5*)",
      meals: isEn ? "Dinner Included" : "Περιλαμβάνεται Δείπνο",
    });

    // Day 2
    days.push({
      day: 2,
      title: isEn ? "Old Havana UNESCO Walking Discovery & Rum Secrets" : "Ιστορικό Κέντρο Αβάνας & Μυστικά του Ρουμιού",
      location: "Havana",
      desc: isEn
        ? "Private walking tour through the 4 historic plazas (Plaza de Armas, Catedral, San Francisco, Plaza Vieja) with your private guide. Authentic cocktail stop at Bodeguita del Medio and Havana Club masterclass."
        : "Ιδιωτική ξενάγηση στις 4 ιστορικές πλατείες της Παλιάς Αβάνας με τον προσωπικό σας ξεναγό. Στάση για αυθεντικό μοχίτο στο Bodeguita del Medio και γευσιγνωσία στο Μουσείο του Ρουμιού.",
      stay: stay === "5star" ? "Hotel Iberostar Grand Packard 5*" : "Luxury Suites Havana Vieja",
      meals: isEn ? "Breakfast & Lunch" : "Πρωινό & Γεύμα",
    });

    // Day 3
    days.push({
      day: 3,
      title: isEn ? "Viñales Valley Tobacco Masterclass & Mogotes" : "Κοιλάδα Βινιάλες: Πούρα Habanos & Σπήλαιο του Ινδιάνου",
      location: "Viñales Valley (Pinar del Río)",
      desc: isEn
        ? "Full-day excursion into UNESCO Viñales. Meet artisan veguero farmers for private cigar rolling demonstrations. Boat ride through Cueva del Indio underground river and organic farm-to-table lunch."
        : "Ολοήμερη εξόρμηση στο προστατευόμενο τοπίο του Βινιάλες. Επίσκεψη σε παραδοσιακή φυτεία καπνού για επίδειξη κατασκευής πούρων Habanos. Βαρκάδα στο υπόγειο ποτάμι Cueva del Indio και βιολογικό γεύμα.",
      stay: "Havana / Viñales Boutique Stay",
      meals: isEn ? "Breakfast & Farm Lunch" : "Πρωινό & Αγροτικό Γεύμα",
    });

    // Day 4
    days.push({
      day: 4,
      title: isEn ? "French Colonial Cienfuegos & Botanical Splendour" : "Σιενφουέγος: Το Γαλλικό Μαργαριτάρι του Νότου",
      location: "Cienfuegos",
      desc: isEn
        ? "Scenic drive to Cienfuegos on the Caribbean coast. Tour the neoclassical Palacio de Valle, José Martí Park and the grand Teatro Tomás Terry. Seafood dinner overlooking Jagua Bay."
        : "Διαδρομή προς τη νότια ακτή της Καραϊβικής. Περιήγηση στο νεοκλασικό Palacio de Valle, την κεντρική πλατεία και το θέατρο Tomás Terry. Δείπνο με θαλασσινά στον κόλπο Jagua.",
      stay: "Hotel Melia San Carlos / Boutique Casa Particular",
      meals: isEn ? "Breakfast & Dinner" : "Πρωινό & Δείπνο",
    });

    // Day 5
    days.push({
      day: 5,
      title: isEn ? "UNESCO Trinidad: Cobblestone Streets & Live Son Cubano" : "Τρινιδάδ: Ταξίδι στο Χρόνο & Ζωντανή Salsa",
      location: "Trinidad",
      desc: isEn
        ? "Step back in time through the pastel colonial mansions of Trinidad. Visit the Valley of the Sugar Mills (Valle de los Ingenios). Evening drinks at Casa de la Música under the open stars."
        : "Περιπλάνηση στα λιθόστρωτα σοκάκια και τα παστέλ αρχοντικά του ιστορικού Τρινιδάδ. Επίσκεψη στην Κοιλάδα των Ζαχαρόμυλων και βραδινή μουσική με ζωντανή σάλσα στα σκαλιά της Casa de la Música.",
      stay: "Iberostar Grand Hotel Trinidad / Heritage Colonial Mansion",
      meals: isEn ? "Breakfast & Lunch" : "Πρωινό & Γεύμα",
    });

    // Day 6
    days.push({
      day: 6,
      title: isEn ? "Topes de Collantes Rainforest Trek & Waterfalls" : "Βουνό Topes de Collantes: Καταρράκτες & Τροπικό Δάσος",
      location: "Topes de Collantes",
      desc: isEn
        ? "Excursion by Russian 6x6 truck into the lush Escambray mountains. Hike to El Nicho waterfalls for swimming in crystal natural pools. Traditional Creole mountain feast."
        : "Ανάβαση με ειδικά οχήματα στα βουνά Escambray. Πεζοπορία στους καταρράκτες El Nicho και μπάνιο στις κρυστάλλινες φυσικές βάθρες. Παραδοσιακό κρεολικό γεύμα στο βουνό.",
      stay: "Iberostar Grand Hotel Trinidad",
      meals: isEn ? "Breakfast & Mountain Feast" : "Πρωινό & Γεύμα",
    });

    // Day 7
    days.push({
      day: 7,
      title: isEn ? "Crossing to Cayo Santa María / Varadero Pristine Sands" : "Μετάβαση στον Εξωτικό Παράδεισο των Cayos",
      location: "Cayo Santa María / Varadero",
      desc: isEn
        ? "Scenic transfer via the impressive 48km Pedraplén causeway into Cayo Santa María. Check-in to your luxury 5-star all-inclusive beachfront bungalow."
        : "Διάσχιση του εντυπωσιακού θαλάσσιου δρόμου Pedraplén μήκους 48 χλμ. προς το Κάγιο Σάντα Μαρία. Τακτοποίηση στο πολυτελές παραθαλάσσιο 5* All-Inclusive resort.",
      stay: "Hotel Paradisus Los Cayos 5* All-Inclusive",
      meals: isEn ? "All-Inclusive Luxury" : "All-Inclusive Πολυτέλεια",
    });

    if (daysCount >= 10) {
      days.push({
        day: 8,
        title: isEn ? "Seafari Catamaran Cruise & Dolphin Sanctuary" : "Seafari με Καταμαράν & Κοραλλιογενείς Ύφαλοι",
        location: "Cayo Santa María / Cayo Ensenachos",
        desc: isEn
          ? "Sail on a private luxury catamaran across turquoise Caribbean reefs. Snorkelling with colourful marine life, lobster lunch onboard, and secluded beach anchor."
          : "Κρουαζιέρα με καταμαράν στα γαλαζοπράσινα νερά της Καραϊβικής. Snorkelling σε κοραλλιογενείς υφάλους, γεύμα με αστακό στο σκάφος και στάση σε ανέγγιχτη παρθένα παραλία.",
        stay: "Hotel Paradisus Los Cayos 5* All-Inclusive",
        meals: isEn ? "All-Inclusive & Seafood Catamaran Lunch" : "All-Inclusive & Γεύμα στο Καταμαράν",
      });

      days.push({
        day: 9,
        title: isEn ? "Pure Beach Relaxation & Spa Indulgence" : "Χαλάρωση στην Παραλία & Spa Θεραπείες",
        location: "Cayo Santa María / Varadero",
        desc: isEn
          ? "Full day at leisure on white talcum sands. Enjoy water sports, Caribbean cocktails by the infinity pool, and restorative sunset massages."
          : "Ημέρα απόλυτης χαλάρωσης στη λευκή αμμουδιά. Δραστηριότητες θαλάσσης, κοκτέιλ στην infinity πισίνα και μασάζ στο ηλιοβασίλεμα.",
        stay: "Hotel Paradisus Los Cayos 5* All-Inclusive",
        meals: isEn ? "All-Inclusive Luxury" : "All-Inclusive Πολυτέλεια",
      });

      days.push({
        day: 10,
        title: isEn ? "Return to Havana & Souvenir Markets • Flight Departure" : "Επιστροφή στην Αβάνα, Αγορά Σουβενίρ & Πτήση Επιστροφής",
        location: "Havana",
        desc: isEn
          ? "Chauffeured return to Havana. Last-minute stops at San José artisan craft market for paintings, cigars, and rum. Private VIP transfer to José Martí Airport for departure."
          : "Ιδιωτική μεταφορά πίσω στην Αβάνα. Τελευταίες αγορές στην αγορά San José για πίνακες, πούρα και ρούμι. Μεταφορά στο αεροδρόμιο για την πτήση επιστροφής.",
        stay: isEn ? "Departure Flight" : "Πτήση Επιστροφής",
        meals: isEn ? "Breakfast Included" : "Περιλαμβάνεται Πρωινό",
      });
    }

    // Estimate price range
    const basePerPerson =
      stay === "5star"
        ? (daysCount === 7 ? 2150 : daysCount === 10 ? 2750 : 3600)
        : stay === "casas"
        ? (daysCount === 7 ? 1480 : daysCount === 10 ? 1890 : 2550)
        : (daysCount === 7 ? 1790 : daysCount === 10 ? 2290 : 3100);

    return {
      daysCount,
      baseRoute,
      days,
      estimatedPerPerson: basePerPerson,
      totalEstimated: basePerPerson * travelersCount,
    };
  };

  const itinerary = getGeneratedItinerary();

  const generateWhatsAppMessage = () => {
    const text = `*CUBA AI Custom Itinerary Request*
Travelers: ${travelersCount} (${travelType.toUpperCase()})
Duration: ${itinerary.daysCount} Days
Preferred Stays: ${stay.toUpperCase()}
Pace: ${pace.toUpperCase()}
Est. Month: ${travelMonth}
Generated Route: ${itinerary.baseRoute}
Est. Budget: ~€${itinerary.estimatedPerPerson}/person

Please contact me with availability and confirmed flight details!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-[#0b0b0b] text-white py-16 px-6 lg:px-12 border-b border-gold/30">
        <div className="mx-auto max-w-4xl text-center">
          <div className="gold-badge mb-4 mx-auto w-fit">
            <Sparkles className="h-4 w-4 text-gold animate-pulse" />
            <span>CUBA AI · 2026</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight">
            {isEn ? (
              <>
                Design Your <span className="italic text-gold-light">Bespoke Cuba Itinerary</span> in Seconds
              </>
            ) : (
              <>
                Σχεδιάστε το <span className="italic text-gold-light">Προσωπικό σας Ταξίδι</span> στην Κούβα
              </>
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {isEn
              ? "CUBA AI combines 17+ years of Cuba destination expertise with real hotel availability, private transfers, and curated excursions."
              : "Το CUBA AI συνδυάζει 17+ χρόνια εξειδίκευσης με πραγματικά δεδομένα διαμονής, ιδιωτικών μεταφορών και αποκλειστικών ξεναγήσεων."}
          </p>

          {/* Step Progress Indicators */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4 text-xs font-semibold">
            {[
              { num: 1, label: isEn ? "Travelers" : "Ταξιδιώτες" },
              { num: 2, label: isEn ? "Experiences" : "Εμπειρίες" },
              { num: 3, label: isEn ? "Duration" : "Διάρκεια" },
              { num: 4, label: isEn ? "Stays" : "Διαμονή" },
              { num: 5, label: isEn ? "Proposal" : "Πρόγραμμα" },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-1.5 transition-colors ${
                  step === s.num
                    ? "text-gold font-bold"
                    : step > s.num
                    ? "text-emerald-400"
                    : "text-white/40"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    step === s.num
                      ? "bg-gold text-ink"
                      : step > s.num
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Wizard Body */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* STEP 1: Traveler Profile */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-line pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                STEP 1 OF 4
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-normal text-ink">
                {isEn ? "Who is travelling?" : "Ποιοι ταξιδεύετε;"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {isEn
                  ? "Select your travel party to adapt the pacing, room setups, and activity recommendations."
                  : "Επιλέξτε το προφίλ των ταξιδιωτών για να προσαρμόσουμε το ρυθμό, τη διαμονή και τις δραστηριότητες."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                { id: "couple", title: isEn ? "Couple" : "Ζευγάρι", desc: isEn ? "Romantic & cultural highlights" : "Ρομαντικές & πολιτιστικές στιγμές", icon: Heart },
                { id: "honeymoon", title: isEn ? "Honeymoon" : "Γαμήλιο Ταξίδι", desc: isEn ? "5* Luxury suites & beach pampering" : "VIP σουίτες, ιδιωτικά δείπνα & Cayos", icon: Star },
                { id: "family", title: isEn ? "Family with Kids" : "Οικογένεια με Παιδιά", desc: isEn ? "Comfortable pacing & nature spots" : "Άνετος ρυθμός, παραλίες & φύση", icon: Users },
                { id: "friends", title: isEn ? "Friends / Group" : "Παρέα / Φίλοι", desc: isEn ? "Salsa, road trips & vibrant nights" : "Road trip, σάλσα, νυχτερινή ζωή", icon: Sparkles },
                { id: "solo", title: isEn ? "Solo Traveler" : "Solo Explorer", desc: isEn ? "Independent discovery & local guides" : "Αυθεντική επαφή με ντόπιους & ξεναγός", icon: Compass },
              ].map((item) => {
                const Icon = item.icon;
                const active = travelType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTravelType(item.id as TravelType)}
                    className={`luxury-card flex flex-col items-start p-5 text-left rounded-sm border transition-all cursor-pointer ${
                      active
                        ? "border-gold bg-gold/5 ring-1 ring-gold"
                        : "border-line bg-paper hover:border-gold/60"
                    }`}
                  >
                    <div className={`p-2 rounded-full mb-3 ${active ? "bg-gold text-ink" : "bg-white text-gold-deep border border-line"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-editorial text-xl font-normal text-ink">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Travelers Count & Preferred Month */}
            <div className="grid gap-6 sm:grid-cols-2 bg-paper p-6 rounded-sm border border-line">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                  {isEn ? "Number of Travelers" : "Αριθμός Ταξιδιωτών"}
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelersCount(num)}
                      className={`h-10 w-10 rounded-sm border font-semibold text-sm transition-colors ${
                        travelersCount === num
                          ? "bg-gold text-ink border-gold font-bold"
                          : "bg-white text-ink border-line hover:border-gold"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                  {isEn ? "Target Travel Month" : "Επιθυμητός Μήνας Ταξιδιού"}
                </label>
                <select
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full bg-white border border-line px-3.5 py-2.5 text-sm text-ink rounded-sm outline-none focus:border-gold"
                >
                  {[
                    "October 2026", "November 2026", "December 2026", "Christmas / NYE 2026",
                    "January 2027", "February 2027", "March 2027", "April (Easter) 2027",
                    "May 2027", "June 2027", "July / August 2027", "September 2027"
                  ].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-gold cursor-pointer"
              >
                <span>{isEn ? "Next: Choose Experiences" : "Επόμενο: Εμπειρίες"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Desired Experiences & Vibe */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-line pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                STEP 2 OF 4
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-normal text-ink">
                {isEn ? "What do you want to experience in Cuba?" : "Τι εμπειρίες επιθυμείτε να ζήσετε;"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {isEn
                  ? "Select all experiences that inspire you. Our engine will weave them into an optimal route."
                  : "Επιλέξτε όσα σας εμπνέουν. Ο αλγόριθμος θα τα συνθέσει σε μία λογική και άνετη διαδρομή."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { id: "havana_vintage", title: isEn ? "Vintage Cars & Malecón" : "Κλασικά Αυτοκίνητα & Malecón", desc: isEn ? "Iconic 1950s convertibles & Havana nightlife" : "Βόλτα με ανοιχτά αυτοκίνητα του '50 & μουσική", img: "https://www.skydream.gr/wp-content/uploads/cuba-tours-custom-pub-cuban-drink-tasting-skydream-travel.jpg" },
                { id: "vinales_cigar", title: isEn ? "Viñales & Habanos Cigars" : "Κοιλάδα Βινιάλες & Πούρα", desc: isEn ? "UNESCO limestone mogotes & artisan plantations" : "Φυτείες καπνού, σπήλαια & πράσινα τοπία", img: "https://www.skydream.gr/wp-content/uploads/κοιλάδα-Βινιάλες-πανοραμική-θέα-το-σούρουπο-skydream-εκδρομή-Κούβα-1-1024x576.jpg" },
                { id: "trinidad_unesco", title: isEn ? "UNESCO Trinidad & History" : "Ιστορικό Τρινιδάδ & Σιενφουέγος", desc: isEn ? "Cobblestones, sugar baron mansions & live salsa" : "Λιθόστρωτα σοκάκια, αποικιακά αρχοντικά & σάλσα", img: "https://www.skydream.gr/wp-content/uploads/cuba-group-tour-skydream-travel.jpg" },
                { id: "cayos_beach", title: isEn ? "Cayos Pristine Beaches" : "Εξωτικά Cayos & Παραλίες", desc: isEn ? "White sand beaches, turquoise water & 5* luxury" : "Λευκή άμμος, τιρκουάζ νερά & All-Inclusive", img: "https://www.skydream.gr/wp-content/uploads/Honeymoon-in-cuba-skydream.jpg" },
                { id: "rainforest_trek", title: isEn ? "Topes de Collantes Nature" : "Βουνό Topes de Collantes & Φύση", desc: isEn ? "Waterfalls, rainforest treks & natural pools" : "Καταρράκτες El Nicho & τροπικά δάση", img: "https://www.skydream.gr/wp-content/uploads/cuba-tours-custom-nature-trips-skydream-travel.jpg" },
                { id: "catamaran_seafari", title: isEn ? "Catamaran Seafari & Reefs" : "Seafari με Καταμαράν", desc: isEn ? "Reef snorkelling, dolphin contact & lobster lunch" : "Κοράλλια, δελφίνια & γεύμα με αστακό", img: "https://www.skydream.gr/wp-content/uploads/cuba-private-tour-skydream-travel.jpg" },
              ].map((item) => {
                const active = selectedVibes.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleVibe(item.id)}
                    className={`luxury-card group relative overflow-hidden rounded-sm border p-4 cursor-pointer transition-all ${
                      active
                        ? "border-gold bg-gold/10 ring-2 ring-gold"
                        : "border-line bg-paper hover:border-gold/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-editorial text-lg font-normal text-ink">{item.title}</h3>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? "bg-gold border-gold text-ink" : "border-line bg-white"}`}>
                        {active && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs text-muted">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-line">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-luxury-outline cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{isEn ? "Back" : "Πίσω"}</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-gold cursor-pointer"
              >
                <span>{isEn ? "Next: Duration & Pace" : "Επόμενο: Διάρκεια"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Duration & Pace */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-line pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                STEP 3 OF 4
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-normal text-ink">
                {isEn ? "Trip Duration & Travel Pace" : "Διάρκεια Ταξιδιού & Ρυθμός"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {isEn
                  ? "Choose how many days you wish to spend and how intense you prefer your daily schedule."
                  : "Επιλέξτε πόσες ημέρες έχετε στη διάθεσή σας και πόσο έντονο προτιμάτε το πρόγραμμα."}
              </p>
            </div>

            {/* Duration Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { id: "7days", days: "7 Days", title: isEn ? "Express Cuba" : "Κλασική Κούβα (7 Ημέρες)", desc: isEn ? "Havana + Viñales + Beach" : "Αβάνα + Βινιάλες + Βαραδέρο", badge: isEn ? "Quick Escape" : "Σύντομη Απόδραση" },
                { id: "10days", days: "10 Days", title: isEn ? "Signature Route" : "Πανόραμα (10 Ημέρες)", desc: isEn ? "Havana + Trinidad + Cayos" : "Αβάνα + Τρινιδάδ + Κάγιο", badge: isEn ? "Most Popular" : "Δημοφιλέστερο" },
                { id: "14days", days: "14 Days", title: isEn ? "In-Depth Explorer" : "Πλήρης Γύρος (14 Ημέρες)", desc: isEn ? "West + Central Heritage" : "Δυτική & Κεντρική Κούβα", badge: isEn ? "Comprehensive" : "Ολοκληρωμένο" },
                { id: "21days", days: "21 Days", title: isEn ? "Grand Island Odyssey" : "Grand Odyssey (21 Ημέρες)", desc: isEn ? "Full Island Coast-to-Coast" : "Από Αβάνα ως Σαντιάγο", badge: isEn ? "Ultimate Trip" : "Απόλυτο Road Trip" },
              ].map((item) => {
                const active = duration === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDuration(item.id as DurationType)}
                    className={`luxury-card flex flex-col items-start p-5 text-left rounded-sm border transition-all cursor-pointer ${
                      active
                        ? "border-gold bg-gold/5 ring-1 ring-gold"
                        : "border-line bg-paper hover:border-gold/60"
                    }`}
                  >
                    <span className="rounded-full bg-gold/20 text-gold-deep border border-gold/40 px-2 py-0.5 text-[10px] font-bold uppercase mb-2">
                      {item.badge}
                    </span>
                    <h3 className="font-editorial text-xl font-normal text-ink">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Travel Pace */}
            <div className="bg-paper p-6 rounded-sm border border-line">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-3">
                {isEn ? "Travel Pace Preference" : "Επιθυμητός Ρυθμός Ταξιδιού"}
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: "relaxed", title: isEn ? "Relaxed & Leisure" : "Χαλαρός & Ξεκούραστος", desc: isEn ? "More free time & beach days" : "Περισσότερος ελεύθερος χρόνος" },
                  { id: "balanced", title: isEn ? "Balanced (Recommended)" : "Ισορροπημένος (Προτείνεται)", desc: isEn ? "Perfect mix of sights & rest" : "Ιδανικός συνδυασμός περιήγησης & χαλάρωσης" },
                  { id: "active", title: isEn ? "Active & Immersive" : "Δραστήριος & Γεμάτος", desc: isEn ? "Maximum highlights & adventures" : "Πολλές δραστηριότητες & εξερεύνηση" },
                ].map((p) => {
                  const active = pace === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id as PaceType)}
                      className={`p-3.5 text-left rounded-sm border transition-colors cursor-pointer ${
                        active
                          ? "border-gold bg-white shadow-xs ring-1 ring-gold"
                          : "border-line bg-white/60 hover:border-gold/50"
                      }`}
                    >
                      <p className="text-sm font-semibold text-ink">{p.title}</p>
                      <p className="text-xs text-muted mt-0.5">{p.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-line">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-luxury-outline cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{isEn ? "Back" : "Πίσω"}</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="btn-gold cursor-pointer"
              >
                <span>{isEn ? "Next: Accommodation Choice" : "Επόμενο: Διαμονή"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Stays Preference */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-line pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                STEP 4 OF 4
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-normal text-ink">
                {isEn ? "Where would you like to stay?" : "Πού επιθυμείτε να διαμείνετε;"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {isEn
                  ? "We offer verified 5-star international resorts as well as luxury colonial casas particulares."
                  : "Προσφέρουμε επιλεγμένα 5* ξενοδοχεία διεθνών αλυσίδων και πολυτελή παραδοσιακά αρχοντικά (casas)."}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  id: "blend",
                  title: isEn ? "Curated VIP Blend (Top Pick)" : "Ιδανικός Συνδυασμός (Top Pick)",
                  desc: isEn ? "Colonial luxury boutique casas in historic Havana & Trinidad + 5* All-Inclusive beach resort in Cayos." : "Αρχοντική boutique casa στην Αβάνα & στο Τρινιδάδ + 5* All-Inclusive Resort στις παραλίες.",
                  badge: isEn ? "Most Authentic & Luxurious" : "Η Απόλυτη Εμπειρία",
                },
                {
                  id: "5star",
                  title: isEn ? "5-Star International Luxury" : "5* Πολυτελή Ξενοδοχεία",
                  desc: isEn ? "Iberostar Grand Packard, Melia Cohiba The Level, and Paradisus Resorts throughout your trip." : "Iberostar Grand Packard, Melia Cohiba (The Level) & Paradisus σε όλη τη διαδρομή.",
                  badge: isEn ? "Premium Luxury" : "Κορυφαία Πολυτέλεια",
                },
                {
                  id: "casas",
                  title: isEn ? "Authentic Boutique Casas" : "Αποκλειστικά Casas Particulares",
                  desc: isEn ? "Private historic mansions with local Cuban hosts, home-cooked breakfasts, and high charm." : "Ιστορικά αρχοντικά με ιδιωτικά δωμάτια, ζεστή κουβανέζικη φιλοξενία και αυθεντική ατμόσφαιρα.",
                  badge: isEn ? "Local Charm" : "Αυθεντική Κούβα",
                },
              ].map((item) => {
                const active = stay === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStay(item.id as StayType)}
                    className={`luxury-card flex flex-col items-start p-6 text-left rounded-sm border transition-all cursor-pointer ${
                      active
                        ? "border-gold bg-gold/5 ring-1 ring-gold"
                        : "border-line bg-paper hover:border-gold/60"
                    }`}
                  >
                    <span className="rounded-full bg-gold/20 text-gold-deep border border-gold/40 px-2.5 py-0.5 text-[10px] font-bold uppercase mb-3">
                      {item.badge}
                    </span>
                    <h3 className="font-editorial text-2xl font-normal text-ink">{item.title}</h3>
                    <p className="mt-2 text-xs text-muted leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-line">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-luxury-outline cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{isEn ? "Back" : "Πίσω"}</span>
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-gold !py-3.5 !px-8 !text-sm cursor-pointer shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>{isEn ? "Computing Custom Itinerary..." : "Σχεδιασμός Προγράμματος..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>{isEn ? "Generate my CUBA AI itinerary" : "Δημιουργια Προγραμματος με CUBA AI"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: OUT-OF-THIS-WORLD GENERATED PROPOSAL */}
        {step === 5 && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Proposal Header Banner */}
            <div className="rounded-sm border-2 border-gold/60 bg-[#0b0b0b] p-8 text-white shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/15 pb-6">
                <div>
                  <div className="gold-badge mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                    <span>CONFIRMED CUSTOM PROPOSAL</span>
                  </div>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-white">
                    {itinerary.daysCount}-Day Bespoke Cuba Odyssey
                  </h2>
                  <p className="mt-1 text-sm text-gold-light">
                    {itinerary.baseRoute}
                  </p>
                </div>

                {/* Price Estimate Card */}
                <div className="rounded-sm border border-gold/40 bg-white/10 p-4 text-right backdrop-blur-xs shrink-0">
                  <p className="text-[11px] uppercase tracking-wider text-white/70">
                    {isEn ? "Estimated Package Price" : "Εκτιμώμενο Κόστος"}
                  </p>
                  <p className="font-editorial text-3xl font-bold text-gold">
                    ~€{itinerary.estimatedPerPerson}
                    <span className="text-xs text-white/70 font-normal"> / {isEn ? "person" : "άτομο"}</span>
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">
                    {isEn ? `Total for ${travelersCount} travelers: ~€${itinerary.totalEstimated}` : `Σύνολο για ${travelersCount} άτομα: ~€${itinerary.totalEstimated}`}
                  </p>
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/302103232522?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold !py-2.5 !px-5 !text-xs font-semibold"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{isEn ? "Send Itinerary to WhatsApp" : "Αποστολή στο WhatsApp"}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `GO CUBA Itinerary (${itinerary.daysCount} Days): ${itinerary.baseRoute}\nPrice: ~€${itinerary.estimatedPerPerson}/person`
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="btn-outline-white !py-2.5 !px-4 !text-xs cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? (isEn ? "Copied!" : "Αντιγράφηκε!") : (isEn ? "Copy Summary" : "Αντιγραφή")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline-white !py-2.5 !px-4 !text-xs cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>{isEn ? "Customize Again" : "Νέος Σχεδιασμός"}</span>
                </button>
              </div>
            </div>

            {/* Day-by-Day Timeline */}
            <div className="space-y-6">
              <h3 className="font-editorial text-2xl font-normal text-ink">
                {isEn ? "Day-by-Day Itinerary Schedule" : "Αναλυτικό Πρόγραμμα Ημέρα προς Ημέρα"}
              </h3>

              <div className="space-y-4">
                {itinerary.days.map((d) => (
                  <div
                    key={d.day}
                    className="luxury-card rounded-sm border border-line bg-paper p-6 transition-all hover:border-gold/60"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line/60 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-bold text-xs text-ink shrink-0">
                          Day {d.day}
                        </span>
                        <div>
                          <h4 className="font-editorial text-xl font-normal text-ink">{d.title}</h4>
                          <p className="flex items-center gap-1 text-xs text-gold-deep font-semibold">
                            <MapPin className="h-3 w-3" />
                            <span>{d.location}</span>
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-muted border border-line shrink-0">
                        {d.meals}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-ink/85 font-light">{d.desc}</p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-muted border-t border-line/40 pt-3">
                      <Building className="h-3.5 w-3.5 text-gold-deep shrink-0" />
                      <span><strong>{isEn ? "Recommended Stay:" : "Προτεινόμενη Διαμονή:"}</strong> {d.stay}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Official Inquiry Form */}
            <div className="rounded-sm border-2 border-gold/40 bg-paper p-8 shadow-xl">
              <div className="border-b border-line pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                  OFFICIAL CONCIERGE LOCK
                </span>
                <h3 className="mt-1 font-editorial text-2xl font-normal text-ink">
                  {isEn ? "Lock this Custom Itinerary & Get Final Flight Quote" : "Επιβεβαιώστε το Πρόγραμμα & Λάβετε Τελική Προσφορά Πτήσεων"}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {isEn
                    ? "Our Athens & Havana concierges will review availability and contact you within 24 hours."
                    : "Οι σύμβουλοι μας σε Αθήνα & Αβάνα θα ελέγξουν διαθεσιμότητες και θα επικοινωνήσουν εντός 24 ωρών."}
                </p>
              </div>

              <form
                className="mt-6 space-y-4"
                action={`mailto:${SITE.email}`}
                method="get"
              >
                <input
                  type="hidden"
                  name="subject"
                  value={`CUBA AI Itinerary (${itinerary.daysCount} Days) - ${travelMonth}`}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <input
                    name="name"
                    required
                    placeholder={isEn ? "Full Name *" : "Ονοματεπώνυμο *"}
                    className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink outline-none focus:border-gold"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={isEn ? "Email Address *" : "Email *"}
                    className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink outline-none focus:border-gold"
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder={isEn ? "Phone Number *" : "Τηλέφωνο Επικοινωνίας *"}
                    className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink outline-none focus:border-gold"
                  />
                </div>

                <textarea
                  name="body"
                  rows={3}
                  defaultValue={`Selected Route: ${itinerary.baseRoute}
Travelers: ${travelersCount} (${travelType})
Preferred Month: ${travelMonth}
Est. Budget: ~€${itinerary.estimatedPerPerson}/person`}
                  className="w-full rounded-sm border border-line bg-white p-3 text-xs text-ink outline-none focus:border-gold font-mono"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted">
                    {isEn ? "Official GNTO License MHTE 0206Ε60000737600" : "Επίσημη Άδεια ΕΟΤ ΜΗΤΕ 0206Ε60000737600"}
                  </span>
                  <button type="submit" className="btn-gold cursor-pointer">
                    <Send className="h-3.5 w-3.5" />
                    <span>{isEn ? "Submit VIP Inquiry" : "Αποστολη Αιτηματος"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
