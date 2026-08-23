// Dev-only: run buildPackageSpec over every package record and print a compact summary.
// Requires: npx esbuild src/lib/package-spec.ts --bundle --format=esm --platform=node \
//   --outfile=/tmp/package-spec.mjs --alias:@=./src
import fs from "node:fs";

const src = fs.readFileSync(new URL("../src/content/records.ts", import.meta.url), "utf8");
const records = JSON.parse(src.slice(src.indexOf("= [") + 2, src.lastIndexOf("];") + 1));

const { buildPackageSpec } = await import("/tmp/package-spec.mjs");

const packages = records.filter(
  (r) => r.path.startsWith("/paketa-diakopon-gia-kouva/") && r.path !== "/paketa-diakopon-gia-kouva/" && !r.aliasOf,
);

for (const r of packages) {
  const s = buildPackageSpec(r, "el");
  console.log(`\n=== ${r.path}`);
  console.log(`route: ${s.route || "-"}`);
  console.log(`glance: ${s.glance.map((g) => `${g.label}=${g.value.slice(0, 40)}`).join(" ; ") || "-"}`);
  console.log(`intro(${s.intro.length}): ${(s.intro[0] || "-").slice(0, 100)}`);
  console.log(`days: ${s.days.length}, included: ${s.included.length}, highlights: ${s.highlights.length}`);
  console.log(`price: ${s.priceHeadline || "-"} tiers=${s.priceTiers.length}`);
  for (const tier of s.priceTiers.slice(0, 4)) {
    console.log(`   - ${tier.label || "(no label)"} | ${tier.period || "-"} | ${tier.price || "-"} | ${tier.notes.length} notes`);
  }
  console.log(`flights: ${s.flights.length}, notes: ${s.notes.length}`);
}
