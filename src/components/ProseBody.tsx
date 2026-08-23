import { CheckCircle2 } from "lucide-react";
import type { ProseBlock } from "@/lib/prose";

export default function ProseBody({
  blocks,
  lede = false,
}: {
  blocks: ProseBlock[];
  /** Editorial articles open with a larger lead paragraph. */
  lede?: boolean;
}) {
  const firstParagraph = blocks.findIndex((block) => block.type === "paragraph");

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        if (lede && idx === firstParagraph && block.type === "paragraph") {
          return (
            <p
              key={idx}
              className="border-l-2 border-gold pl-5 text-xl font-light leading-relaxed text-ink sm:text-2xl sm:leading-relaxed"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h2
              key={idx}
              className="pt-4 font-editorial text-2xl font-normal leading-snug text-ink sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={idx} className="grid gap-3 sm:grid-cols-2">
              {block.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-sm border border-line bg-paper p-4 text-base leading-relaxed text-ink/85"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="text-lg font-light leading-relaxed text-[#2a2a2a]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
