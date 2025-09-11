"use client";
import Countdown from "../../components/Countdown";
import EmailForm from "../../components/EmailForm";
import { useParams } from "next/navigation";

const t = {
  ar: {
    coming_soon: "قريباً",
    value_prop: "استعد لأفضل ملابس رياضية سعودية.",
    email_label: "ادخل بريدك الإلكتروني",
    notify: "أبلغني",
    subscribed: "تم الاشتراك",
    privacy: "الخصوصية",
    terms: "الشروط",
    days: "يوم",
    english: "English",
    name: "الاسم",
    country_code: "رمز الدولة",
    phone_number: "رقم الجوال",
  },
  en: {
    coming_soon: "Coming Soon",
    value_prop: "Get ready for the finest Saudi sportswear.",
    email_label: "Enter your email",
    notify: "Notify Me",
    subscribed: "Subscribed!",
    privacy: "Privacy",
    terms: "Terms",
    days: "days",
    english: "العربية",
    name: "Name",
    country_code: "Country code",
    phone_number: "Phone number",
  },
} as const;

export default function HomePage() {
  const p = useParams<{ locale: string }>();
  const locale = (p?.locale === "en" ? "en" : "ar") as "ar" | "en";
  const tr = t[locale];
  const isAR = locale === "ar";

  return (
    <main dir={isAR ? "rtl" : "ltr"}>
      <div className="hero">
        <img src="/logo.svg" alt="LYTH Logo" className="logo" />
        <h1>{tr.coming_soon}</h1>
        <p className="lead">{tr.value_prop}</p>

        <Countdown target="2025-12-01T00:00:00Z" locale={locale} />

        <EmailForm
          locale={locale}
          labels={{
            email: tr.email_label,
            notify: tr.notify,
            subscribed: tr.subscribed,
            name: tr.name,
            countryCode: tr.country_code,
            phone: tr.phone_number,
          }}
        />

        <div className="actions">
          <a
            href={isAR ? "/en" : "/ar"}
            className="toggle"
            aria-label={isAR ? "Switch to English" : "التبديل إلى العربية"}
          >
            {tr.english}
          </a>
        </div>

        <div className="footer">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/privacy">{tr.privacy}</a> • <a href="/terms">{tr.terms}</a>
        </div>
      </div>
      <style jsx>{`
        .hero {
          padding: 2rem;
          text-align: center;
          margin: 0 auto;
          max-width: 720px;
        }
        .logo {
          width: 120px;
          height: auto;
          margin: 0 auto 1rem;
          display: block;
        }
        h1 {
          font-size: 2.25rem;
          margin: 0.5rem 0;
        }
        .lead {
          opacity: 0.9;
          margin: 0.25rem 0 1.25rem;
        }
        .actions {
          margin-top: 0.5rem;
        }
        .toggle {
          font-size: 0.95rem;
          text-decoration: none;
        }
        .footer {
          margin-top: 2rem;
          font-size: 0.9rem;
        }

        @media (min-width: 768px) {
          h1 {
            font-size: 3rem;
          }
        }
      `}</style>
    </main>
  );
}
