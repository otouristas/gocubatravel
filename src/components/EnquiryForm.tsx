import { Send, User, Mail, Phone, Users, Calendar, MessageSquare } from "lucide-react";
import { COPY, SITE, t } from "@/content/site";
import type { Locale } from "@/content/types";

export default function EnquiryForm({
  locale,
  subject,
}: {
  locale: Locale;
  subject: string;
}) {
  const isEn = locale === "en";
  const labels = isEn
    ? {
        header: "Request a Custom VIP Quote",
        subheader: "We respond within 24 hours with confirmed itinerary options.",
        name: "Full Name *",
        email: "Email Address *",
        phone: "Phone Number (with country code) *",
        travelers: "Number of Travelers",
        dates: "Preferred Travel Dates",
        message: "Tell us about your travel plans, wishes or preferred hotels...",
        send: "Send VIP Inquiry",
      }
    : {
        header: "Ζητήστε Προσφορά & Σχεδιασμό",
        subheader: "Απαντάμε εντός 24 ωρών με εξατομικευμένες προτάσεις διαδρομής.",
        name: "Ονοματεπώνυμο *",
        email: "Email *",
        phone: "Τηλέφωνο Επικοινωνίας *",
        travelers: "Αριθμός Ταξιδιωτών",
        dates: "Επιθυμητές Ημερομηνίες",
        message: "Γράψτε μας για τα πλάνα σας, επιθυμίες ή συγκεκριμένα καταλύματα...",
        send: "Αποστολη Αιτηματος",
      };

  return (
    <form
      className="space-y-4"
      action={`mailto:${SITE.email}`}
      method="get"
    >
      <input type="hidden" name="subject" value={`GO CUBA Inquiry: ${subject}`} />

      <div>
        <h3 className="font-editorial text-2xl font-normal text-ink">{labels.header}</h3>
        <p className="mt-1 text-xs text-muted leading-relaxed">{labels.subheader}</p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="relative">
          <input
            name="name"
            required
            placeholder={labels.name}
            className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="relative">
          <input
            name="email"
            type="email"
            required
            placeholder={labels.email}
            className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="relative">
          <input
            name="phone"
            type="tel"
            required
            placeholder={labels.phone}
            className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="travelers"
            placeholder={labels.travelers}
            className="rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          />
          <input
            name="dates"
            placeholder={labels.dates}
            className="rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="relative">
          <textarea
            name="body"
            rows={3}
            placeholder={labels.message}
            className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder-muted/70 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-gold w-full !py-3 !text-xs font-semibold tracking-widest uppercase cursor-pointer"
      >
        <span>{labels.send}</span>
        <Send className="h-3.5 w-3.5" />
      </button>

      <p className="text-[11px] text-center text-muted">
        {isEn
          ? "Your data is strictly confidential. No spam."
          : "Απόλυτη εμπιστευτικότητα στοιχείων. Χωρίς spam."}
      </p>
    </form>
  );
}
