import { NextResponse } from "next/server";
import { subscribeToBrevo } from "../../../lib/brevo";
import { subscribeToEmailOctopus } from "../../../lib/emailoctopus";
import { logToLocal } from "../../../lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Clone early so we can read the raw body later for logging even after req.json() consumes it
  const reqForLog = req.clone();
  try {
    const { email, name, cc, phone, lang: langBody, trap } = await req.json();

    if (typeof trap === "string" && trap.trim().length > 0) {
      return NextResponse.json({ error: "bot_detected" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    // Optional fields
    const safeName =
      typeof name === "string" ? name.trim().slice(0, 100) : undefined;
    let e164: string | undefined = undefined;
    if (typeof cc === "string" || typeof phone === "string") {
      const ccDigits = (typeof cc === "string" ? cc : "").replace(/\D+/g, "");
      const numDigits = (typeof phone === "string" ? phone : "").replace(
        /\D+/g,
        ""
      );
      if (ccDigits && numDigits) {
        // Basic length sanity checks
        if (
          ccDigits.length <= 4 &&
          numDigits.length >= 4 &&
          numDigits.length <= 15
        ) {
          e164 = `+${ccDigits}${numDigits}`;
        } else {
          return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
        }
      } else if (ccDigits || numDigits) {
        // If one provided without the other, treat as invalid input
        return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
      }
    }

    const lang = (langBody === "en" ? "en" : "ar") as "ar" | "en";

    // Choose provider: explicit env SUBSCRIBE_PROVIDER wins.
    // Otherwise, prefer EmailOctopus if EO env is present; fallback to Brevo.
    const provider = (process.env.SUBSCRIBE_PROVIDER || "").toLowerCase();
    const useEO =
      provider === "emailoctopus" ||
      (!provider && !!process.env.EO_API_KEY && !!process.env.EO_LIST_ID);

    if (useEO) {
      await subscribeToEmailOctopus(email, {
        name: safeName,
        lang,
        source: "homepage",
        phone: e164,
        countryCode:
          typeof cc === "string" ? cc.replace(/\D+/g, "") : undefined,
      });
    } else {
      await subscribeToBrevo(email, {
        name: safeName,
        phone: e164,
        lang,
        source: "homepage",
      });
    }
    return NextResponse.json({ status: "subscribed" }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Subscribe error:", msg);
    // Persist debug logs locally (ignored by Git)
    let body = "[unavailable]";
    try {
      body = await reqForLog.text();
    } catch {
      // ignore body read errors
    }
    try {
      logToLocal("subscribe.log", { level: "error", msg, body });
    } catch {}
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { error: "brevo_error", detail: msg },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "brevo_error" }, { status: 500 });
  }
}
