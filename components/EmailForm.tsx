"use client";
import { useState } from "react";
import Input from "./primitives/Input";
import Button from "./primitives/Button";
import CountryCodeSelect from "./CountryCodeSelect";

type Labels = {
  email: string;
  notify: string;
  subscribed: string;
  name: string;
  countryCode: string;
  phone: string;
};

export default function EmailForm({
  locale,
  labels,
}: {
  locale: "ar" | "en";
  labels: Labels;
}) {
  // Basic per-country phone rules (local part only, without country code)
  const phoneRules: Record<
    string,
    { pattern: RegExp; max: number; msgEn: string; msgAr: string }
  > = {
    // Saudi Arabia: 9 digits, must start with 5 (mobile ranges 50/53/54/55/56/57/58/59)
    "966": {
      pattern: /^5\d{8}$/,
      max: 9,
      msgEn: "Saudi numbers must be 9 digits and start with 5",
      msgAr: "الرقم السعودي يجب أن يتكون من 9 أرقام ويبدأ بـ 5",
    },
  };

  const formatPhone = (cc: string, input: string) => {
    const digitsOnly = input.replace(/\D+/g, "");
    const rule = phoneRules[cc];
    const limited = rule
      ? digitsOnly.slice(0, rule.max)
      : digitsOnly.slice(0, 15);
    // Group by 3s for readability
    return limited.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
  };
  const [name, setName] = useState("");
  // Prefill Saudi Arabia (+966)
  const [countryCode, setCountryCode] = useState("966");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validatePhone = (cc: string, val: string) => {
    const digits = val.replace(/\D+/g, "");
    const rule = phoneRules[cc];
    if (digits === "") return null; // allow empty phone (optional field)
    if (rule) {
      return rule.pattern.test(digits)
        ? null
        : locale === "ar"
        ? rule.msgAr
        : rule.msgEn;
    }
    // Fallback to ITU E.164 local-part sanity: 4..15 digits
    if (digits.length >= 4 && digits.length <= 15) return null;
    return locale === "ar" ? "رقم الهاتف غير صالح" : "Invalid phone number";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    // Client-side validation before submit
    const phoneErr = validatePhone(countryCode, phone);
    setPhoneError(phoneErr);
    if (phoneErr) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          cc: countryCode,
          phone: phone.replace(/\D+/g, ""),
          lang: locale,
          trap: "",
        }),
      });
      const isErrorResponse = (v: unknown): v is { error: string } => {
        return (
          typeof v === "object" &&
          v !== null &&
          "error" in v &&
          typeof (v as Record<string, unknown>).error === "string"
        );
      };
      const data: unknown = await res.json().catch(() => ({}));
      setStatus(
        res.ok
          ? "success"
          : isErrorResponse(data)
          ? (data as { error: string }).error
          : "error"
      );
      if (res.ok) {
        setName("");
        setCountryCode("");
        setPhone("");
        setEmail("");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} aria-busy={loading} noValidate className="form">
      <label htmlFor="name" className="visually-hidden">
        {labels.name}
      </label>
      <Input
        id="name"
        name="name"
        type="text"
        autoComplete="given-name"
        placeholder={labels.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label={labels.name}
      />

      <CountryCodeSelect
        locale={locale}
        value={countryCode}
        onChange={setCountryCode}
        placeholder={labels.countryCode}
      />

      <label htmlFor="phone" className="visually-hidden">
        {labels.phone}
      </label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={
          countryCode === "966"
            ? `${labels.phone} ${
                locale === "ar" ? "(مثال: 500 500 500)" : "(e.g., 500 500 500)"
              }`
            : labels.phone
        }
        value={phone}
        onChange={(e) => {
          const next = formatPhone(countryCode, e.target.value);
          setPhone(next);
          // Live-validate but keep errors subtle until blur/submit
          const err = validatePhone(countryCode, next);
          setPhoneError(err);
        }}
        onBlur={() => setPhoneError(validatePhone(countryCode, phone))}
        aria-invalid={!!phoneError}
        aria-describedby={phoneError ? "phone-error" : undefined}
        aria-label={labels.phone}
      />
      {phoneError && (
        <p
          id="phone-error"
          className="err"
          role="alert"
          style={{ marginTop: "-0.35rem" }}
        >
          {phoneError}
        </p>
      )}

      <label htmlFor="email" className="visually-hidden">
        {labels.email}
      </label>
      <Input
        id="email"
        name="email"
        type="email"
        required
        inputMode="email"
        autoComplete="email"
        placeholder={labels.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label={labels.email}
      />
      {/* Honeypot */}
      <input
        type="text"
        name="trap"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="trap"
      />
      <Button type="submit" disabled={loading}>
        {loading ? (locale === "ar" ? "جارٍ..." : "Loading...") : labels.notify}
      </Button>
      <div className="status" aria-live="polite">
        {status === "success" && (
          <p className="ok">
            {locale === "ar"
              ? "تحقق من بريدك لتأكيد الاشتراك"
              : "Check your email to confirm"}
          </p>
        )}
        {status && status !== "success" && <p className="err">{status}</p>}
      </div>
      <style jsx>{`
        .form {
          margin: 1rem auto;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-width: 480px;
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }
        .trap {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
        }
        .status {
          min-height: 1.5rem;
          text-align: center;
        }
        .ok {
          color: #9be79b;
          margin: 0.25rem 0 0;
        }
        .err {
          color: #ff8a8a;
          margin: 0.25rem 0 0;
        }
      `}</style>
    </form>
  );
}
