const fs = require("fs");
const path = require("path");

(async () => {
  const url =
    "https://restcountries.com/v3.1/all?fields=cca2,idd,name,translations";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch: " + res.status);
  const data = await res.json();

  const items = [];
  for (const c of data) {
    const code = c.cca2;
    const name_en = c.name && c.name.common ? c.name.common : "";
    const name_ar =
      c.translations && c.translations.ara && c.translations.ara.common
        ? c.translations.ara.common
        : name_en;
    const root = c.idd && c.idd.root;
    const suffixes = c.idd && c.idd.suffixes;
    if (!root) continue;
    if (Array.isArray(suffixes) && suffixes.length > 0) {
      for (const s of suffixes) {
        items.push({ code, dialCode: `${root}${s}`, name_en, name_ar });
      }
    } else {
      items.push({ code, dialCode: `${root}`, name_en, name_ar });
    }
  }

  // Deduplicate by (code, dialCode)
  const map = new Map();
  for (const it of items) map.set(`${it.code}|${it.dialCode}`, it);
  const out = Array.from(map.values()).sort((a, b) =>
    a.name_en.localeCompare(b.name_en, "en")
  );

  const outPath = path.join(__dirname, "..", "public", "country-codes.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
  console.log(`Wrote ${out.length} items to ${outPath}`);
})().catch((err) => {
  console.error((err && err.stack) || err);
  process.exit(1);
});
