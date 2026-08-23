// Dev-only helper: print the raw WP body of one record so parsers can be designed against it.
import fs from "node:fs";

const src = fs.readFileSync(new URL("../src/content/records.ts", import.meta.url), "utf8");
const records = JSON.parse(src.slice(src.indexOf("= [") + 2, src.lastIndexOf("];") + 1));

for (const path of process.argv.slice(2)) {
  const r = records.find((rec) => rec.path === path);
  if (!r) {
    console.log(`-- ${path}: NOT FOUND`);
    continue;
  }
  console.log(`\n===== ${r.path} (${r.kind}) images=${r.images.length} =====`);
  console.log(`title: ${r.titleEl}`);
  r.bodyEl.forEach((line, i) => console.log(`${String(i).padStart(3)} | ${line}`));
}
