export default function EspaBanner() {
  return (
    <aside
      className="border-t border-line bg-white py-6"
      aria-label="ΕΣΠΑ 2014–2020 — Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης"
    >
      <div className="mx-auto flex max-w-[1400px] justify-center px-4 lg:px-12">
        {/* Native img: static 728×90 funding notice, no layout shift from next/image auto-size. */}
        <img
          src="/espa-banner.jpg"
          alt="Ευρωπαϊκή Ένωση — Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης. ΕΠΑνΕΚ 2014–2020 Ανταγωνιστικότητα, Επιχειρηματικότητα, Καινοτομία. ΕΣΠΑ 2014–2020: ανάπτυξη – εργασία – αλληλεγγύη."
          width={728}
          height={90}
          className="h-auto w-full max-w-[728px] object-contain"
        />
      </div>
    </aside>
  );
}
