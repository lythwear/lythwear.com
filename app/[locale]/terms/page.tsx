import Link from 'next/link';

type Params = { params?: Promise<{ locale: string }> };

const content = {
  en: {
    title: 'Terms of Service',
    updated: 'Effective date: 2025-01-01',
    intro:
      'Welcome to Lyth Wear. By accessing or using our website, you agree to these Terms of Service. If you do not agree, please do not use our services.',
    eligibility:
      'You must be of legal age to form a binding contract in your jurisdiction. By using our services, you represent that you meet this requirement.',
    changes:
      'We may modify these Terms. We will post the updated Terms with a new effective date. Continued use after changes means you accept the updated Terms.',
    accounts:
      'If account features are introduced, keep your credentials confidential and notify us of any unauthorized use. You are responsible for activity under your account.',
    acceptableUse: [
      'Do not use the site for unlawful, harmful, or fraudulent purposes.',
      'Do not attempt to interfere with or compromise the security of the service.',
      'Do not scrape, reverse engineer, or use automated systems beyond what is necessary for normal use.',
    ],
    ip:
      'All content, trademarks, logos, and materials are owned by Lyth Wear or its licensors. You may not use them without prior written permission.',
    communications:
      'If you subscribe, you consent to receive emails as described in our Privacy Policy. You can unsubscribe at any time.',
    disclaimers:
      'The site is provided “as is” and “as available”. We disclaim all warranties to the extent permitted by law.',
    liability:
      'To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from your use of the site.',
    governing:
      'These Terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Riyadh, Saudi Arabia.',
    privacyRef:
      'For how we collect and use personal data (including PDPL/GDPR compliance), see our Privacy Policy.',
    contact:
      'Questions? Contact us at legal@lythwear.com.',
  },
  ar: {
    title: 'شروط الاستخدام',
    updated: 'سريان الشروط: 01-01-2025',
    intro:
      'مرحبًا بك في ليث وير. باستخدامك لموقعنا فإنك توافق على شروط الاستخدام هذه. إذا لم توافق، يُرجى عدم استخدام خدماتنا.',
    eligibility:
      'يجب أن تكون بسن قانونية لإبرام عقد مُلزم في بلدك. باستخدامك للخدمة فإنك تقر بتوافر هذا الشرط لديك.',
    changes:
      'قد نقوم بتحديث هذه الشروط. سننشر النسخة المحدّثة مع تاريخ سريان جديد. استمرار استخدامك بعد التحديث يعني قبولك للشروط المعدّلة.',
    accounts:
      'في حال توفر حسابات مستقبلًا، فإنك مسؤول عن سرية بيانات الدخول وعن أي نشاط يتم من خلال حسابك، وعليك إخطارنا عن أي استخدام غير مصرح به.',
    acceptableUse: [
      'عدم استخدام الموقع لأغراض غير قانونية أو ضارة أو احتيالية.',
      'عدم محاولة اختراق أمن الخدمة أو تعطيلها.',
      'عدم القيام بعمليات سحب بيانات أو هندسة عكسية أو أتمتة تتجاوز الاستخدام العادي.',
    ],
    ip:
      'جميع المحتوى والعلامات التجارية والشعارات والمواد مملوكة لليث وير أو مرخصة لها. لا يجوز استخدامها دون إذن كتابي مسبق.',
    communications:
      'عند الاشتراك، فإنك توافق على استلام رسائل بريدية وفق سياسة الخصوصية. يمكنك إلغاء الاشتراك في أي وقت.',
    disclaimers:
      'يُقدَّم الموقع كما هو ووفق الإتاحة. نخلي مسؤوليتنا من كافة الضمانات إلى الحد الذي يسمح به النظام.',
    liability:
      'إلى أقصى حد يسمح به النظام، لا نتحمل أي مسؤولية عن أضرار غير مباشرة أو عرضية أو خاصة أو لاحقة تنشأ عن استخدامك للموقع.',
    governing:
      'تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتكون المحاكم المختصة بمدينة الرياض هي المختصة حصريًا بأي نزاع.',
    privacyRef:
      'لمعرفة كيفية جمعنا واستخدامنا لبياناتك (بما يشمل الالتزام بـ PDPL/GDPR)، يرجى الاطلاع على سياسة الخصوصية.',
    contact:
      'للاستفسارات: legal@lythwear.com.',
  },
} as const;

export default async function TermsPage({ params }: Params) {
  const p = (await params) || { locale: 'ar' };
  const locale = p?.locale === 'en' ? 'en' : 'ar';
  const t = content[locale as 'en' | 'ar'];

  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t.title}</h1>
      <p>{t.updated}</p>
      <p>{t.intro}</p>

      <h2>{locale === 'ar' ? 'الأهلية' : 'Eligibility'}</h2>
      <p>{t.eligibility}</p>

      <h2>{locale === 'ar' ? 'التغييرات على الشروط' : 'Changes to the Terms'}</h2>
      <p>{t.changes}</p>

      <h2>{locale === 'ar' ? 'الحسابات' : 'Accounts'}</h2>
      <p>{t.accounts}</p>

      <h2>{locale === 'ar' ? 'الاستخدام المقبول' : 'Acceptable Use'}</h2>
      <ul>
        {t.acceptableUse.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <h2>{locale === 'ar' ? 'الملكية الفكرية' : 'Intellectual Property'}</h2>
      <p>{t.ip}</p>

      <h2>{locale === 'ar' ? 'الاتصالات' : 'Communications'}</h2>
      <p>{t.communications}</p>

      <h2>{locale === 'ar' ? 'إخلاء المسؤولية' : 'Disclaimers'}</h2>
      <p>{t.disclaimers}</p>

      <h2>{locale === 'ar' ? 'تحديد المسؤولية' : 'Limitation of Liability'}</h2>
      <p>{t.liability}</p>

      <h2>{locale === 'ar' ? 'القانون الحاكم والاختصاص' : 'Governing Law & Jurisdiction'}</h2>
      <p>{t.governing}</p>

      <h2>{locale === 'ar' ? 'الخصوصية' : 'Privacy'}</h2>
      <p>{t.privacyRef}</p>

      <h2>{locale === 'ar' ? 'التواصل' : 'Contact'}</h2>
      <p>{t.contact}</p>

      <p style={{ marginTop: '2rem' }}>
        <Link href={`/${locale}`}>{locale === 'ar' ? 'العودة إلى الرئيسية' : 'Back to Home'}</Link>
      </p>
    </main>
  );
}
