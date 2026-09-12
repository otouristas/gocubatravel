"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Send } from "lucide-react";
import { SITE } from "@/content/site";
import type { Locale } from "@/content/types";
import { localizedPath } from "@/lib/i18n";

/**
 * Preference questionnaire for the €95 Personal Trip Planning service.
 *
 * PRODUCTION DEPENDENCIES STILL MISSING — the flow deliberately stops short of
 * taking money because none of these are configured in the project yet:
 *   1. Payment provider (hosted checkout + server-side confirmation/webhook).
 *   2. Server-side request storage keyed to the payment reference.
 *   3. Transactional email / CRM for the confirmation and team notification.
 *   4. Approved service terms, refund and cancellation copy.
 * Until they exist the request is submitted through the same verified channel
 * the rest of the site uses (the traveller's mail client, addressed to
 * SITE.email), the fee is never collected here, and every screen says so. Do not
 * mark a request paid without the provider's authoritative confirmation.
 */

const PLANNING_FEE = "€95";

type Step = 0 | 1 | 2 | 3;

type FormState = {
  travelPeriod: string;
  availableDays: string;
  adults: string;
  children: string;
  departureCity: string;
  alreadyBooked: string;
  preferredDestinations: string;
  interests: string[];
  accommodation: string;
  pace: string;
  experiences: string;
  budget: string;
  budgetScope: string;
  requirements: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

const EMPTY: FormState = {
  travelPeriod: "",
  availableDays: "",
  adults: "",
  children: "",
  departureCity: "",
  alreadyBooked: "",
  preferredDestinations: "",
  interests: [],
  accommodation: "",
  pace: "",
  experiences: "",
  budget: "",
  budgetScope: "",
  requirements: "",
  notes: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

const FIELD =
  "w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold";
const LABEL = "block text-xs font-semibold uppercase tracking-wider text-ink";

function copy(locale: Locale) {
  const isEn = locale === "en";
  return {
    steps: isEn
      ? ["Trip details", "Preferences & budget", "Service & terms", "Planning fee"]
      : ["Στοιχεία ταξιδιού", "Προτιμήσεις & budget", "Υπηρεσία & όροι", "Planning Fee"],
    stepOf: isEn ? "Step" : "Βήμα",
    of: isEn ? "of" : "από",
    back: isEn ? "Back" : "Πίσω",
    next: isEn ? "Continue" : "Συνέχεια",
    required: isEn
      ? "Please complete the required fields before continuing."
      : "Συμπλήρωσε τα υποχρεωτικά πεδία για να συνεχίσεις.",
    optional: isEn ? "Optional" : "Προαιρετικό",
    a: {
      title: isEn ? "Tell us about your trip" : "Πες μας για το ταξίδι σου",
      intro: isEn
        ? "You do not need to know the exact route before starting."
        : "Δεν χρειάζεται να έχεις αποφασίσει τη διαδρομή σου για να ξεκινήσεις.",
      travelPeriod: isEn
        ? "Travel dates or approximate period *"
        : "Ημερομηνίες ή προσεγγιστική περίοδος ταξιδιού *",
      travelPeriodHint: isEn ? "e.g. second half of March 2027" : "π.χ. δεύτερο δεκαπενθήμερο Μαρτίου 2027",
      availableDays: isEn ? "Available travel days *" : "Ημέρες που έχεις διαθέσιμες *",
      adults: isEn ? "Adults *" : "Ενήλικες *",
      children: isEn ? "Children" : "Παιδιά",
      departureCity: isEn ? "Departure city or country *" : "Πόλη ή χώρα αναχώρησης *",
      alreadyBooked: isEn
        ? "Have you already booked any part of the trip?"
        : "Έχεις ήδη κλείσει κάποιο μέρος του ταξιδιού;",
      alreadyBookedOptions: isEn
        ? ["Nothing yet", "Flights", "Part of the accommodation", "Flights and accommodation", "Something else"]
        : ["Τίποτα ακόμη", "Αεροπορικά εισιτήρια", "Μέρος της διαμονής", "Αεροπορικά και διαμονή", "Κάτι άλλο"],
      preferredDestinations: isEn
        ? "Destinations you already have in mind"
        : "Προορισμοί που έχεις ήδη στο μυαλό σου",
      preferredDestinationsHint: isEn
        ? "Leave empty if you have not decided."
        : "Άφησέ το κενό αν δεν έχεις αποφασίσει.",
    },
    b: {
      title: isEn ? "Your preferences and budget" : "Οι προτιμήσεις και το budget σου",
      interests: isEn ? "Travel style and interests" : "Στιλ ταξιδιού και ενδιαφέροντα",
      interestOptions: isEn
        ? ["Cities & culture", "Beach & relaxation", "Nature & exploration", "Music & salsa", "Food & drink", "Photography", "History & architecture"]
        : ["Πόλεις & πολιτισμός", "Παραλία & χαλάρωση", "Φύση & εξερεύνηση", "Μουσική & salsa", "Γαστρονομία", "Φωτογραφία", "Ιστορία & αρχιτεκτονική"],
      accommodation: isEn ? "Accommodation preference" : "Προτίμηση διαμονής",
      accommodationOptions: isEn
        ? ["City hotels", "All-inclusive resorts", "Casas particulares", "A combination", "Not decided yet"]
        : ["Ξενοδοχεία πόλης", "All-inclusive resorts", "Casas particulares", "Συνδυασμός", "Δεν έχω αποφασίσει"],
      pace: isEn ? "Preferred pace" : "Ρυθμός ταξιδιού",
      paceOptions: isEn ? ["Relaxed", "Balanced", "Intensive"] : ["Χαλαρός", "Ισορροπημένος", "Εντατικός"],
      experiences: isEn
        ? "Experiences or activities you are interested in"
        : "Εμπειρίες ή δραστηριότητες που σε ενδιαφέρουν",
      budget: isEn ? "Approximate trip budget *" : "Προσεγγιστικό budget ταξιδιού *",
      budgetHint: isEn ? "In euros (€)." : "Σε ευρώ (€).",
      budgetScope: isEn ? "The budget above refers to *" : "Το παραπάνω budget αφορά *",
      budgetScopeOptions: isEn
        ? ["Total cost for all travellers", "Cost per person"]
        : ["Συνολικό κόστος για όλους τους ταξιδιώτες", "Κόστος ανά άτομο"],
      requirements: isEn
        ? "Important requirements or considerations"
        : "Σημαντικές ανάγκες ή θέματα που πρέπει να λάβουμε υπόψη",
      notes: isEn ? "Anything else you would like to add" : "Οτιδήποτε άλλο θα ήθελες να προσθέσεις",
    },
    c: {
      title: isEn ? "The service and its terms" : "Η υπηρεσία και οι όροι της",
      scope: isEn
        ? [
            "Personal Trip Planning fee: €95 per trip request.",
            "Includes an initial personalised proposal and one revision.",
            "100% credited against the final trip booking through GoCuba.",
            "The planning fee is not the price of the trip.",
            "Payment does not reserve flights, accommodation or other travel services.",
          ]
        : [
            "Planning Fee: €95 ανά αίτημα ταξιδιού.",
            "Περιλαμβάνει την αρχική εξατομικευμένη πρόταση και μία αναθεώρηση.",
            "Συμψηφίζεται 100% με την τελική κράτηση του ταξιδιού σου μέσω GoCuba.",
            "Το Planning Fee δεν αποτελεί την τιμή του ταξιδιού.",
            "Η πληρωμή δεν δεσμεύει αεροπορικές θέσεις, καταλύματα ή άλλες υπηρεσίες.",
          ],
      contact: isEn ? "How we reach you" : "Πώς θα επικοινωνήσουμε μαζί σου",
      name: isEn ? "Full name *" : "Ονοματεπώνυμο *",
      email: isEn ? "Email *" : "Email *",
      phone: isEn ? "Phone *" : "Τηλέφωνο *",
      consent: isEn
        ? "I have read the service scope above and I agree that my details are used to prepare my planning request."
        : "Έχω διαβάσει το αντικείμενο της υπηρεσίας και συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου για την προετοιμασία του αιτήματός μου.",
      termsLink: isEn ? "Terms & Conditions" : "Όροι Συμμετοχής",
      cookiesLink: isEn ? "Cookies policy" : "Πολιτική Cookies",
    },
    d: {
      title: isEn ? "Planning fee" : "Planning Fee",
      pendingTitle: isEn
        ? "Online payment is not available on the site yet"
        : "Η online πληρωμή δεν είναι ακόμη διαθέσιμη στο site",
      pendingBody: isEn
        ? "No payment is taken on this page. Send your preferences now and the GoCuba team will reply with the way to pay the €95 planning fee. Your planning request starts once that payment is confirmed."
        : "Σε αυτή τη σελίδα δεν πραγματοποιείται καμία πληρωμή. Στείλε τώρα τις προτιμήσεις σου και η ομάδα της GoCuba θα σου απαντήσει με τον τρόπο πληρωμής του Planning Fee των €95. Ο σχεδιασμός ξεκινά μόλις επιβεβαιωθεί η πληρωμή.",
      review: isEn ? "Review your answers" : "Έλεγξε τις απαντήσεις σου",
      submit: isEn ? "Send my planning request" : "Στείλε το αίτημα σχεδιασμού",
      submitHint: isEn
        ? "This opens your email app with your answers ready to send to GoCuba."
        : "Ανοίγει την εφαρμογή email σου με τις απαντήσεις σου έτοιμες προς αποστολή στη GoCuba.",
    },
    done: {
      title: isEn ? "Your request is ready to send" : "Το αίτημά σου είναι έτοιμο για αποστολή",
      body: isEn
        ? "Your answers were placed in an email addressed to GoCuba. Send that email and the team will come back to you about the €95 planning fee and the next steps."
        : "Οι απαντήσεις σου τοποθετήθηκαν σε ένα email προς τη GoCuba. Στείλε το και η ομάδα θα επικοινωνήσει μαζί σου για το Planning Fee των €95 και τα επόμενα βήματα.",
      unpaid: isEn
        ? "No payment has been made and no travel service has been reserved."
        : "Δεν έχει πραγματοποιηθεί καμία πληρωμή και δεν έχει δεσμευτεί καμία ταξιδιωτική υπηρεσία.",
      again: isEn ? "Open the email again" : "Άνοιξε ξανά το email",
      restart: isEn ? "Start a new request" : "Ξεκίνα νέο αίτημα",
    },
  };
}

export default function TripPlanningQuestionnaire({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const c = useMemo(() => copy(locale), [locale]);
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleInterest(value: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((item) => item !== value)
        : [...prev.interests, value],
    }));
  }

  const stepValid = useMemo(() => {
    if (step === 0) {
      return Boolean(
        form.travelPeriod.trim() &&
          form.availableDays.trim() &&
          form.adults.trim() &&
          form.departureCity.trim(),
      );
    }
    if (step === 1) return Boolean(form.budget.trim() && form.budgetScope);
    if (step === 2) {
      return Boolean(
        form.name.trim() && form.email.trim() && form.phone.trim() && form.consent,
      );
    }
    return true;
  }, [step, form]);

  function goNext() {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((prev) => Math.min(prev + 1, 3) as Step);
  }

  function goBack() {
    setShowErrors(false);
    setStep((prev) => Math.max(prev - 1, 0) as Step);
  }

  const summary = useMemo(() => {
    const L = isEn
      ? {
          period: "Travel period",
          days: "Available days",
          travellers: "Travellers",
          adults: "adults",
          children: "children",
          from: "Departure from",
          booked: "Already booked",
          destinations: "Destinations in mind",
          interests: "Interests",
          stay: "Accommodation",
          pace: "Pace",
          experiences: "Experiences",
          budget: "Budget",
          requirements: "Requirements",
          notes: "Notes",
          contact: "Contact",
          fee: "Planning fee not yet paid — awaiting payment instructions from GoCuba.",
        }
      : {
          period: "Περίοδος ταξιδιού",
          days: "Διαθέσιμες ημέρες",
          travellers: "Ταξιδιώτες",
          adults: "ενήλικες",
          children: "παιδιά",
          from: "Αναχώρηση από",
          booked: "Έχει ήδη κλειστεί",
          destinations: "Προορισμοί που έχει στο μυαλό του/της",
          interests: "Ενδιαφέροντα",
          stay: "Διαμονή",
          pace: "Ρυθμός",
          experiences: "Εμπειρίες",
          budget: "Budget",
          requirements: "Ανάγκες / περιορισμοί",
          notes: "Σημειώσεις",
          contact: "Επικοινωνία",
          fee: "Το Planning Fee δεν έχει πληρωθεί — αναμονή οδηγιών πληρωμής από τη GoCuba.",
        };

    const lines = [
      `${L.period}: ${form.travelPeriod}`,
      `${L.days}: ${form.availableDays}`,
      `${L.travellers}: ${form.adults} ${L.adults}${form.children ? `, ${form.children} ${L.children}` : ""}`,
      `${L.from}: ${form.departureCity}`,
      form.alreadyBooked ? `${L.booked}: ${form.alreadyBooked}` : "",
      form.preferredDestinations ? `${L.destinations}: ${form.preferredDestinations}` : "",
      form.interests.length ? `${L.interests}: ${form.interests.join(", ")}` : "",
      form.accommodation ? `${L.stay}: ${form.accommodation}` : "",
      form.pace ? `${L.pace}: ${form.pace}` : "",
      form.experiences ? `${L.experiences}: ${form.experiences}` : "",
      `${L.budget}: ${form.budget} (${form.budgetScope})`,
      form.requirements ? `${L.requirements}: ${form.requirements}` : "",
      form.notes ? `${L.notes}: ${form.notes}` : "",
      "",
      `${L.contact}: ${form.name} · ${form.email} · ${form.phone}`,
      "",
      L.fee,
    ];
    return lines.filter(Boolean).join("\n");
  }, [form, isEn]);

  const mailtoHref = useMemo(() => {
    const subject = isEn
      ? "GoCuba Personal Trip Planning request"
      : "Αίτημα GoCuba Personal Trip Planning";
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
  }, [summary, isEn]);

  if (sent) {
    return (
      <div className="rounded-sm border border-gold/40 bg-paper p-6 sm:p-10">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-gold/15 p-2 text-gold-deep">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-normal text-ink">{c.done.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.done.body}</p>
            <p className="mt-3 rounded-sm border border-line bg-white p-3 text-xs leading-relaxed text-ink-soft">
              {c.done.unpaid}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mailtoHref} className="btn-luxury-outline !py-2.5 !px-5 !text-xs">
                <span>{c.done.again}</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY);
                  setStep(0);
                  setSent(false);
                }}
                className="text-xs font-semibold uppercase tracking-wider text-gold-deep underline hover:text-ink"
              >
                {c.done.restart}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-line bg-paper p-6 shadow-xs sm:p-8 lg:p-10">
      {/* Step indicator */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
          {c.stepOf} {step + 1} {c.of} 4 — {c.steps[step]}
        </p>
        <ol className="mt-3 grid grid-cols-4 gap-1.5" aria-label={c.steps.join(", ")}>
          {c.steps.map((label, idx) => (
            <li
              key={label}
              aria-current={idx === step ? "step" : undefined}
              className={`h-1 rounded-full ${idx <= step ? "bg-gold" : "bg-line"}`}
            >
              <span className="sr-only">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Step A — trip details */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-editorial text-2xl font-normal text-ink">{c.a.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{c.a.intro}</p>
          </div>

          <div>
            <label className={LABEL} htmlFor="travelPeriod">
              {c.a.travelPeriod}
            </label>
            <input
              id="travelPeriod"
              className={`${FIELD} mt-1.5`}
              value={form.travelPeriod}
              onChange={(e) => set("travelPeriod", e.target.value)}
              placeholder={c.a.travelPeriodHint}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={LABEL} htmlFor="availableDays">
                {c.a.availableDays}
              </label>
              <input
                id="availableDays"
                type="number"
                min={1}
                className={`${FIELD} mt-1.5`}
                value={form.availableDays}
                onChange={(e) => set("availableDays", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="adults">
                {c.a.adults}
              </label>
              <input
                id="adults"
                type="number"
                min={1}
                className={`${FIELD} mt-1.5`}
                value={form.adults}
                onChange={(e) => set("adults", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="children">
                {c.a.children}
              </label>
              <input
                id="children"
                type="number"
                min={0}
                className={`${FIELD} mt-1.5`}
                value={form.children}
                onChange={(e) => set("children", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="departureCity">
                {c.a.departureCity}
              </label>
              <input
                id="departureCity"
                className={`${FIELD} mt-1.5`}
                value={form.departureCity}
                onChange={(e) => set("departureCity", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="alreadyBooked">
                {c.a.alreadyBooked}
              </label>
              <select
                id="alreadyBooked"
                className={`${FIELD} mt-1.5`}
                value={form.alreadyBooked}
                onChange={(e) => set("alreadyBooked", e.target.value)}
              >
                <option value="">—</option>
                {c.a.alreadyBookedOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={LABEL} htmlFor="preferredDestinations">
              {c.a.preferredDestinations}{" "}
              <span className="font-normal normal-case tracking-normal text-muted">
                ({c.optional})
              </span>
            </label>
            <input
              id="preferredDestinations"
              className={`${FIELD} mt-1.5`}
              value={form.preferredDestinations}
              onChange={(e) => set("preferredDestinations", e.target.value)}
              placeholder={c.a.preferredDestinationsHint}
            />
          </div>
        </div>
      )}

      {/* Step B — preferences & budget */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="font-editorial text-2xl font-normal text-ink">{c.b.title}</h3>

          <fieldset>
            <legend className={LABEL}>{c.b.interests}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {c.b.interestOptions.map((option) => {
                const active = form.interests.includes(option);
                return (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-gold bg-gold/15 text-gold-deep"
                        : "border-line bg-white text-ink hover:border-gold"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleInterest(option)}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="accommodation">
                {c.b.accommodation}
              </label>
              <select
                id="accommodation"
                className={`${FIELD} mt-1.5`}
                value={form.accommodation}
                onChange={(e) => set("accommodation", e.target.value)}
              >
                <option value="">—</option>
                {c.b.accommodationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="pace">
                {c.b.pace}
              </label>
              <select
                id="pace"
                className={`${FIELD} mt-1.5`}
                value={form.pace}
                onChange={(e) => set("pace", e.target.value)}
              >
                <option value="">—</option>
                {c.b.paceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={LABEL} htmlFor="experiences">
              {c.b.experiences}{" "}
              <span className="font-normal normal-case tracking-normal text-muted">
                ({c.optional})
              </span>
            </label>
            <textarea
              id="experiences"
              rows={3}
              className={`${FIELD} mt-1.5`}
              value={form.experiences}
              onChange={(e) => set("experiences", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="budget">
                {c.b.budget}
              </label>
              <input
                id="budget"
                className={`${FIELD} mt-1.5`}
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder={c.b.budgetHint}
                required
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="budgetScope">
                {c.b.budgetScope}
              </label>
              <select
                id="budgetScope"
                className={`${FIELD} mt-1.5`}
                value={form.budgetScope}
                onChange={(e) => set("budgetScope", e.target.value)}
                required
              >
                <option value="">—</option>
                {c.b.budgetScopeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={LABEL} htmlFor="requirements">
              {c.b.requirements}{" "}
              <span className="font-normal normal-case tracking-normal text-muted">
                ({c.optional})
              </span>
            </label>
            <textarea
              id="requirements"
              rows={2}
              className={`${FIELD} mt-1.5`}
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
            />
          </div>

          <div>
            <label className={LABEL} htmlFor="notes">
              {c.b.notes}{" "}
              <span className="font-normal normal-case tracking-normal text-muted">
                ({c.optional})
              </span>
            </label>
            <textarea
              id="notes"
              rows={2}
              className={`${FIELD} mt-1.5`}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Step C — service review & terms */}
      {step === 2 && (
        <div className="space-y-5">
          <h3 className="font-editorial text-2xl font-normal text-ink">{c.c.title}</h3>

          <ul className="space-y-2 rounded-sm border border-gold/40 bg-white p-4">
            {c.c.scope.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div>
            <h4 className="font-editorial text-lg font-normal text-ink">{c.c.contact}</h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <div>
                <label className={LABEL} htmlFor="name">
                  {c.c.name}
                </label>
                <input
                  id="name"
                  className={`${FIELD} mt-1.5`}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className={LABEL} htmlFor="email">
                  {c.c.email}
                </label>
                <input
                  id="email"
                  type="email"
                  className={`${FIELD} mt-1.5`}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className={LABEL} htmlFor="phone">
                  {c.c.phone}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`${FIELD} mt-1.5`}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-[#c5a059]"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              required
            />
            <span>
              {c.c.consent}{" "}
              <Link
                href={localizedPath(locale, "/oroi-symmetochis/")}
                className="text-gold-deep underline hover:text-ink"
              >
                {c.c.termsLink}
              </Link>
              {" · "}
              <Link
                href={localizedPath(locale, "/cookies/")}
                className="text-gold-deep underline hover:text-ink"
              >
                {c.c.cookiesLink}
              </Link>
            </span>
          </label>
        </div>
      )}

      {/* Step D — planning fee (payment provider not configured yet) */}
      {step === 3 && (
        <div className="space-y-5">
          <h3 className="font-editorial text-2xl font-normal text-ink">{c.d.title}</h3>

          <div className="flex items-start gap-3 rounded-sm border border-gold/50 bg-white p-4">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
            <div>
              <p className="text-sm font-semibold text-ink">{c.d.pendingTitle}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.d.pendingBody}</p>
              <p className="mt-3 font-editorial text-2xl text-ink">
                Personal Trip Planning · {PLANNING_FEE}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-editorial text-lg font-normal text-ink">{c.d.review}</h4>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-sm border border-line bg-white p-4 font-sans text-xs leading-relaxed text-ink-soft">
              {summary}
            </pre>
          </div>

          <div>
            <a href={mailtoHref} onClick={() => setSent(true)} className="btn-gold w-full sm:w-auto">
              <span>{c.d.submit}</span>
              <Send className="h-4 w-4" />
            </a>
            <p className="mt-2.5 text-xs leading-relaxed text-muted">{c.d.submitHint}</p>
          </div>
        </div>
      )}

      {showErrors && !stepValid ? (
        <p
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-sm border border-gold/50 bg-white px-3 py-2 text-xs text-ink"
        >
          <CircleAlert className="h-4 w-4 shrink-0 text-gold-deep" />
          <span>{c.required}</span>
        </p>
      ) : null}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{c.back}</span>
        </button>

        {step < 3 ? (
          <button type="button" onClick={goNext} className="btn-gold !py-2.5 !px-6 !text-xs">
            <span>{c.next}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
