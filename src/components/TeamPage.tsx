import Link from "next/link";
import { ArrowRight, Award, Globe2, GraduationCap, Mail, Users } from "lucide-react";
import { COPY, t } from "@/content/site";
import type { ContentRecord, Locale } from "@/content/types";
import { rawBodyOf, titleOf } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { sanitizeLines } from "@/lib/prose";

const ROSTER = [
  {
    name: "Angeliki",
    role: { el: "Ιδρύτρια & Cuba Travel Designer", en: "Founder & Cuba travel designer" },
  },
  {
    name: "Maria Elena",
    role: { el: "Ξεναγός, Αβάνα", en: "Guide, Havana" },
  },
  {
    name: "Lorena",
    role: { el: "Ξεναγός, Κούβα", en: "Guide, Cuba" },
  },
  {
    name: "Cynthia",
    role: { el: "Εξυπηρέτηση ταξιδιωτών, Αβάνα", en: "Traveller relations, Havana" },
  },
];

type Member = {
  name: string;
  role: { el: string; en: string };
  bio: string[];
  languages?: string;
  credentials: { title: string; items: string[] }[];
};

const LANGUAGE_LABEL = /^(Γλώσσες|Languages)$/i;
const JOIN_US = /(part of our team|μέλος της ομάδας)/i;

function buildMembers(lines: string[]): { members: Member[]; joinUs?: string } {
  const starts = ROSTER.map((person) => ({
    person,
    index: lines.findIndex((line) => line.includes(person.name)),
  })).filter((entry) => entry.index >= 0);

  let joinUs: string | undefined;
  const members: Member[] = [];

  starts.forEach((entry, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].index : lines.length;
    const chunk = lines.slice(entry.index, end);

    const member: Member = {
      name: entry.person.name,
      role: entry.person.role,
      bio: [],
      credentials: [],
    };

    for (let j = 0; j < chunk.length; j += 1) {
      const line = chunk[j];

      if (JOIN_US.test(line)) {
        joinUs = line;
        continue;
      }

      if (LANGUAGE_LABEL.test(line.replace(/:$/, ""))) {
        member.languages = chunk[j + 1];
        j += 1;
        continue;
      }

      if (line.endsWith(":") && line.length < 70) {
        const items: string[] = [];
        let k = j + 1;
        while (k < chunk.length && chunk[k].length <= 120 && !chunk[k].endsWith(":")) {
          items.push(chunk[k]);
          k += 1;
        }
        member.credentials.push({ title: line.replace(/:$/, ""), items });
        j = k - 1;
        continue;
      }

      member.bio.push(line);
    }

    members.push(member);
  });

  return { members, joinUs };
}

export default function TeamPage({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const isEn = locale === "en";
  const lines = sanitizeLines(rawBodyOf(record, locale));
  const { members, joinUs } = buildMembers(lines);

  return (
    <article className="bg-white">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
          <span className="gold-badge mb-3">
            <Users className="h-3 w-3 text-gold" />
            <span>{isEn ? "THE PEOPLE BEHIND GO CUBA" : "ΟΙ ΑΝΘΡΩΠΟΙ ΤΗΣ GO CUBA"}</span>
          </span>
          <h1 className="font-editorial text-4xl font-normal leading-tight text-ink sm:text-5xl">
            {titleOf(record, locale)}
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-light leading-relaxed text-muted">
            {isEn
              ? "Planners in Athens and guides who live in Havana — the same people who design your trip are the ones who welcome you on the island."
              : "Σύμβουλοι στην Αθήνα και ξεναγοί που ζουν στην Αβάνα — οι ίδιοι άνθρωποι που σχεδιάζουν το ταξίδι σας, σας υποδέχονται στο νησί."}
          </p>
        </div>
      </header>

      {record.noindex && (
        <div className="border-b border-gold/40 bg-gold/10 px-6 py-3 text-center text-sm font-semibold text-gold-deep">
          {t(COPY.hiddenNotice, locale)}
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2">
          {members.map((member) => (
            <section
              key={member.name}
              className="luxury-card flex flex-col rounded-sm border border-line bg-paper p-7"
            >
              <div className="flex items-center gap-4 border-b border-line/60 pb-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/20 font-editorial text-xl text-gold-deep">
                  {member.name.charAt(0)}
                </span>
                <div>
                  <h2 className="font-editorial text-2xl font-normal text-ink">{member.name}</h2>
                  <p className="text-sm uppercase tracking-wider text-muted">
                    {member.role[locale]}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {member.bio.map((paragraph, idx) => (
                  <p key={idx} className="text-base leading-relaxed text-ink/85">
                    {paragraph}
                  </p>
                ))}
              </div>

              {member.languages && (
                <p className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
                  <Globe2 className="h-4 w-4 text-gold-deep" />
                  <span>
                    {isEn ? "Languages" : "Γλώσσες"}: {member.languages}
                  </span>
                </p>
              )}

              {member.credentials.map((group, idx) => (
                <div key={idx} className="mt-5 rounded-sm border border-line bg-white p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    {idx === 0 ? (
                      <Award className="h-4 w-4 text-gold-deep" />
                    ) : (
                      <GraduationCap className="h-4 w-4 text-gold-deep" />
                    )}
                    {group.title}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-sm border border-gold/40 bg-paper p-8">
          <div>
            <h2 className="font-editorial text-2xl font-normal text-ink">
              {isEn ? "Want to be part of our team?" : "Θέλετε να γίνετε μέλος της ομάδας;"}
            </h2>
            {joinUs && <p className="mt-1 text-base text-muted">{joinUs}</p>}
          </div>
          <Link href={localizedPath(locale, "/epikoinonia/")} className="btn-gold">
            <Mail className="h-4 w-4" />
            <span>{isEn ? "Contact us" : "Επικοινωνία"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
