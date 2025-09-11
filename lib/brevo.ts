type BrevoAttrs = {
  name?: string;
  phone?: string;
  lang?: "ar" | "en";
  source?: string;
};

export async function subscribeToBrevo(email: string, attrs: BrevoAttrs = {}) {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID;
  const tmplEN = process.env.BREVO_TEMPLATE_ID_EN || "7";
  const tmplAR = process.env.BREVO_TEMPLATE_ID_AR || "6";
  const thankUrl = process.env.THANK_YOU_URL || "https://lythwear.com/thanks";

  if (!apiKey || !listIdRaw) {
    throw new Error("Missing Brevo configuration");
  }

  const listId = Number.parseInt(listIdRaw, 10);
  const lang = (attrs.lang === "en" ? "en" : "ar") as "ar" | "en";
  const templateId = Number.parseInt(lang === "ar" ? tmplAR : tmplEN, 10);

  type DoubleOptinPayload = {
    email: string;
    attributes: {
      FIRSTNAME?: string;
      SMS?: string;
      LANGUAGE: string;
      SOURCE?: string;
    };
    includeListIds: number[];
    templateId: number;
    redirectionUrl: string;
  };

  const payload: DoubleOptinPayload = {
    email,
    attributes: {
      ...(attrs.name ? { FIRSTNAME: attrs.name } : {}),
      ...(attrs.phone ? { SMS: attrs.phone } : {}),
      LANGUAGE: lang.toUpperCase(),
      ...(attrs.source ? { SOURCE: attrs.source } : {}),
    },
    includeListIds: [listId],
    templateId,
    redirectionUrl: thankUrl,
  };

  const res = await fetch(
    "https://api.brevo.com/v3/contacts/doubleOptinConfirmation",
    {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  // Success is 201 (created) or 204 (updated) for DOI
  if (res.status === 201 || res.status === 204) return;

  let msg = "BREVO_ERROR";
  try {
    const err = await res.json();
    msg = typeof err?.message === "string" ? err.message : JSON.stringify(err);
  } catch {}
  throw new Error(`[${res.status}] ${msg}`);
}
