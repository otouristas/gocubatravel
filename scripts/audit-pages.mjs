// Dev-only audit: lists every record with the template that renders it and any raw-WordPress smells.
import fs from "node:fs";

const src = fs.readFileSync(new URL("../src/content/records.ts", import.meta.url), "utf8");
const start = src.indexOf("= [") + 2;
const end = src.lastIndexOf("];");
const records = JSON.parse(src.slice(start, end + 1));

const HUBS = new Set([
  "/paketa-diakopon-gia-kouva/",
  "/taxidi-stin-kouva/",
  "/metafores-stin-kouva/",
  "/visa-gia-kouva/",
  "/diamoni-stin-kouva/",
  "/taxidiotikes-istories/",
  "/ekdromes-stin-kouva/",
]);

const routes = fs.readFileSync(new URL("../src/lib/routes.ts", import.meta.url), "utf8");
const listOf = (name) => {
  const block = routes.slice(routes.indexOf(`export const ${name}`));
  const arr = block.slice(block.indexOf("["), block.indexOf("]") + 1);
  return new Set(JSON.parse(arr.replace(/,(\s*)\]/, "$1]")));
};
const GUIDE_PATHS = listOf("GUIDE_PATHS");
const WAITLIST_PATHS = listOf("WAITLIST_PATHS");
const PACKAGE_CATEGORIES = listOf("PACKAGE_CATEGORIES");

function template(r) {
  if (HUBS.has(r.path)) return "Hub";
  if (r.path === "/epikoinonia/") return "ContactPage";
  if (r.path === "/blog-cuba-vibe/") return "BlogHub";
  if (r.path === "/i-omada-mas/") return "TeamPage";
  if (WAITLIST_PATHS.has(r.path)) return "WaitlistPage";
  if (GUIDE_PATHS.has(r.path)) return "GuidePage";
  if (PACKAGE_CATEGORIES.has(r.path)) return "PackageCategory";
  if (r.path.startsWith("/paketa-diakopon-gia-kouva/")) return "PackageTemplate";
  if (r.kind === "hotel") return "HotelTemplate";
  if (r.kind === "tour") return "TourTemplate";
  if (["story", "blog", "post"].includes(r.kind) || r.path.startsWith("/cuba-la-storia")) return "Editorial";
  return "CmsPage";
}

const childrenOf = (path) =>
  records.filter((r) => r.path !== path && r.path.startsWith(path) && !r.noindex && !r.aliasOf);

const smell = (r) => {
  const body = r.bodyEl || [];
  const text = body.join("\n");
  const flags = [];
  if (body.length === 0) flags.push("empty-body");
  if (/\[[a-z_]+[^\]]*\]/i.test(text)) flags.push("shortcode");
  if (/&nbsp;|&#\d+;|&amp;/.test(text)) flags.push("entities");
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(text)) flags.push("emoji/ornament");
  if (/\*\*\*/.test(text)) flags.push("asterisks");
  if (/(Marketing by ActiveCampaign|ActiveCampaign|Facebook\nInstagram)/i.test(text)) flags.push("form/social-residue");
  if (new Set(body).size < body.length) flags.push("duplicate-lines");
  if (body.length > 0 && body.every((l) => l.length < 90)) flags.push("all-short-lines");
  if (/\b(202[0-4])\b/.test(text)) flags.push("stale-date");
  return flags;
};

const rows = records
  .filter((r) => !r.aliasOf && r.status === "publish")
  .map((r) => ({
    path: r.path,
    kind: r.kind,
    tpl: template(r),
    lines: (r.bodyEl || []).length,
    kids: childrenOf(r.path).length,
    flags: smell(r),
  }));

const problems = rows.filter((r) => r.flags.length > 0 || (r.kids > 0 && r.lines < 14));
console.log(`records: ${rows.length}, flagged: ${problems.length}\n`);
for (const r of problems.sort((a, b) => a.tpl.localeCompare(b.tpl) || a.path.localeCompare(b.path))) {
  console.log(`${r.tpl.padEnd(16)} ${r.path.padEnd(62)} lines=${String(r.lines).padStart(3)} kids=${r.kids} ${r.flags.join(",")}`);
}

const byTpl = {};
for (const r of rows) byTpl[r.tpl] = (byTpl[r.tpl] || 0) + 1;
console.log("\nby template:", byTpl);
