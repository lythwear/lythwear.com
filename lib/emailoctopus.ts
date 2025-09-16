import fs from "fs";
import path from "path";

type EOAttrs = {
  name?: string;
  lang?: "ar" | "en";
  source?: string;
  phone?: string; // E.164
  countryCode?: string; // dial code digits e.g., "966"
};

type CountryItem = { dialCode: string; name_en: string; name_ar: string };
let DIAL_MAP: Map<string, { name_en: string; name_ar: string }> | null = null;

function getDialMap() {
  if (DIAL_MAP) return DIAL_MAP;
  try {
    const p = path.resolve(process.cwd(), "public", "country-codes.json");
    const raw = fs.readFileSync(p, "utf8");
    const parsed: unknown = JSON.parse(raw);
    const arr: unknown[] = Array.isArray(parsed) ? parsed : [];
    const isCountryItem = (v: unknown): v is CountryItem => {
      if (!v || typeof v !== "object") return false;
      const o = v as Record<string, unknown>;
      return (
        typeof o.dialCode === "string" &&
        typeof o.name_en === "string" &&
        typeof o.name_ar === "string"
      );
    };
    const m = new Map<string, { name_en: string; name_ar: string }>();
    for (const it of arr) {
      if (!isCountryItem(it)) continue;
      const dial = String(it.dialCode || "").replace(/[^\d]/g, "");
      const name_en = it.name_en;
      const name_ar = it.name_ar;
      if (dial) m.set(dial, { name_en, name_ar });
    }
    DIAL_MAP = m;
  } catch {
    DIAL_MAP = new Map();
  }
  return DIAL_MAP!;
}

function getCountryNameFromDial(cc?: string, lang?: "ar" | "en") {
  if (!cc) return undefined;
  const m = getDialMap();
  const rec = m.get(String(cc).replace(/[^\d]/g, ""));
  if (!rec) return undefined;
  return lang === "ar"
    ? rec.name_ar || rec.name_en
    : rec.name_en || rec.name_ar;
}

export async function subscribeToEmailOctopus(
  email: string,
  attrs: EOAttrs = {}
) {
  const apiKey = process.env.EO_API_KEY;
  const listId = process.env.EO_LIST_ID;
  if (!apiKey || !listId) {
    throw new Error("Missing EmailOctopus configuration");
  }

  const fields: Record<string, string> = {};
  if (attrs.name) fields.FirstName = attrs.name;
  if (attrs.lang) fields.Language = attrs.lang === "ar" ? "Arabic" : "English";
  if (attrs.phone) fields["Mobile Numebr"] = attrs.phone;
  const country = getCountryNameFromDial(attrs.countryCode, attrs.lang);
  if (country) fields.Country = country;

  const payload = {
    api_key: apiKey,
    email_address: email,
    ...(Object.keys(fields).length ? { fields } : {}),
    ...(attrs.source
      ? {
          tags: [attrs.source, attrs.lang ? `lang_${attrs.lang}` : ""].filter(
            Boolean
          ),
        }
      : attrs.lang
      ? { tags: [`lang_${attrs.lang}`] }
      : {}),
    // status omitted: with DOI enabled, EO sets PENDING and sends confirmation email
  };

  const res = await fetch(
    `https://emailoctopus.com/api/1.6/lists/${listId}/contacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const text = await res.text();
  let data: unknown = undefined;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {}

  if (res.ok) return; // created or updated

  type EOErrorShape = {
    error?: { code?: string; message?: string };
    code?: string;
    message?: string;
  };
  const obj: EOErrorShape | undefined =
    data && typeof data === "object" ? (data as EOErrorShape) : undefined;
  const code = obj?.error?.code ?? obj?.code;
  if (code === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") return; // idempotent success

  const msg =
    (obj?.error?.message && String(obj.error.message)) ||
    (obj?.message && String(obj.message)) ||
    text ||
    "EMAILOCTOPUS_ERROR";
  throw new Error(`[${res.status}] ${code || "EO_ERROR"} ${msg}`);
}
