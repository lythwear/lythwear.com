import Link from 'next/link';

type Params = { params?: Promise<{ locale: string }> };

const t = {
  en: {
    title: 'Thank you! Please confirm your email',
    body: 'We just sent a confirmation email. Please check your inbox (and spam folder) to confirm your subscription.',
    back: 'Back to Home',
  },
  ar: {
    title: 'شكراً لك! يرجى تأكيد بريدك الإلكتروني',
    body: 'لقد أرسلنا لك رسالة تأكيد. يرجى التحقق من صندوق الوارد (أو مجلد الرسائل غير المرغوب فيها) لتأكيد اشتراكك.',
    back: 'العودة إلى الرئيسية',
  },
} as const;

export default async function ThanksPage({ params }: Params) {
  const p = (await params) || { locale: 'ar' };
  const locale = p?.locale === 'en' ? 'en' : 'ar';
  const tr = t[locale as 'en' | 'ar'];
  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ padding: '2rem', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
      <h1>{tr.title}</h1>
      <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>{tr.body}</p>
      <p style={{ marginTop: '1.25rem' }}>
        <Link href={`/${locale}`}>{tr.back}</Link>
      </p>
    </main>
  );
}

