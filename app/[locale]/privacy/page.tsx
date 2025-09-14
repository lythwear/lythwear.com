import Link from 'next/link';

type Params = { params?: Promise<{ locale: string }> };

const content = {
  en: {
    title: 'Privacy Policy',
    updated: 'Effective date: 2025-01-01',
    intro:
      'We care about your privacy. This Privacy Policy explains how we collect, use, and protect your personal data in accordance with the Saudi Personal Data Protection Law (PDPL) and, where applicable, the EU General Data Protection Regulation (GDPR).',
    controller:
      'Data Controller: Lyth Wear ("we", "us"). Contact: privacy@lythwear.com',
    dataWeCollect: [
      'Contact data: name, email, phone (optional).',
      'Marketing preferences and language.',
      'Technical data: IP address, device/browser info, and basic analytics (aggregated where possible).',
    ],
    purposes: [
      'Send double opt-in confirmations and service emails about your subscription.',
      'Provide localized content and communicate in your preferred language.',
      'Improve our site and prevent abuse or fraud.',
    ],
    legalBases: [
      'Consent (GDPR Art. 6(1)(a)) for marketing communications and optional fields.',
      'Legitimate interests (GDPR Art. 6(1)(f)) for security, fraud prevention, and service improvement.',
      'PDPL lawful bases: processing limited to specific, clear purposes and with your knowledge/consent where required.',
    ],
    retention:
      'We keep personal data only as long as needed for the purposes above, and to comply with legal obligations. You can unsubscribe at any time to stop marketing emails.',
    sharing:
      'We may share data with service providers (e.g., email service Brevo) strictly to deliver our services. We require contractual safeguards and do not sell personal data.',
    transfers:
      'Where data is transferred outside the Kingdom of Saudi Arabia or the EEA, we take appropriate safeguards (e.g., PDPL-compliant approvals/derogations, GDPR Standard Contractual Clauses) and ensure recipients provide an adequate level of protection.',
    rights: [
      'Access and obtain a copy of your personal data.',
      'Rectify inaccurate data and request deletion where appropriate.',
      'Object to or restrict processing, and withdraw consent at any time (does not affect prior processing).',
      'Complain to a supervisory authority (e.g., SDAIA under PDPL; an EU authority under GDPR).',
    ],
    security:
      'We implement reasonable technical and organizational measures to protect your data. No method of transmission or storage is completely secure; we continuously improve our safeguards.',
    minors:
      'Our services are not directed to children. If you believe a child provided data, contact us to remove it.',
    contact:
      'Questions or requests? Email privacy@lythwear.com. We will respond in accordance with applicable law (PDPL/GDPR).',
  },
  ar: {
    title: 'سياسة الخصوصية',
    updated: 'سريان السياسة: 01-01-2025',
    intro:
      'نحن نهتم بخصوصيتك. توضح هذه السياسة كيفية جمع ومعالجة وحماية بياناتك الشخصية وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية (PDPL)، وعند الاقتضاء، اللائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR).',
    controller:
      'جهة التحكم بالبيانات: ليث وير (يُشار إليها بـ "نحن"). للتواصل: privacy@lythwear.com',
    dataWeCollect: [
      'بيانات التواصل: الاسم، البريد الإلكتروني، ورقم الجوال (اختياري).',
      'تفضيلات التسويق واللغة.',
      'بيانات تقنية: عنوان IP، معلومات الجهاز/المتصفح، وتحليلات أساسية (بصورة مجمعة قدر الإمكان).',
    ],
    purposes: [
      'إرسال رسائل التأكيد المزدوج والرسائل الخدمية المتعلقة باشتراكك.',
      'تقديم محتوى مخصص باللغة المفضلة لديك والتواصل بها.',
      'تحسين موقعنا ومنع إساءة الاستخدام أو الاحتيال.',
    ],
    legalBases: [
      'الموافقة لأغراض التواصل التسويقي والحقول الاختيارية.',
      'المصلحة المشروعة لأغراض الأمان ومنع الاحتيال وتحسين الخدمة.',
      'الالتزام بقواعد PDPL: المعالجة لأغراض محددة وواضحة وبعلمك وموافقتك حيثما يلزم.',
    ],
    retention:
      'نحتفظ بالبيانات الشخصية للمدة اللازمة فقط لتحقيق الأغراض المذكورة أعلاه والامتثال للالتزامات النظامية. يمكنك إلغاء الاشتراك في أي وقت لإيقاف رسائل التسويق.',
    sharing:
      'قد نشارك البيانات مع مزودي الخدمات (مثل خدمة البريد Brevo) فقط لتقديم خدماتنا. نفرض ضمانات تعاقدية ولا نبيع البيانات الشخصية.',
    transfers:
      'عند نقل البيانات خارج المملكة العربية السعودية أو المنطقة الاقتصادية الأوروبية، نتخذ الضمانات المناسبة (مثل الموافقات/الاستثناءات المتوافقة مع PDPL، وبنود التعاقد القياسية وفق GDPR) ونتأكد من أن الجهة المستقبلة تقدم مستوى حماية مناسب.',
    rights: [
      'الاطلاع على بياناتك والحصول على نسخة منها.',
      'تصحيح البيانات غير الدقيقة وطلب حذفها عند الاقتضاء.',
      'الاعتراض على المعالجة أو تقييدها، وسحب الموافقة في أي وقت (مع عدم تأثير ذلك على المعالجة السابقة).',
      'التقدّم بشكوى إلى الجهة المختصة (مثل SDAIA وفق PDPL، أو جهة رقابية في الاتحاد الأوروبي وفق GDPR).',
    ],
    security:
      'نطبق تدابير تقنية وتنظيمية معقولة لحماية بياناتك. لا توجد وسيلة نقل أو تخزين آمنة كليًا؛ ونعمل باستمرار على تحسين الضمانات.',
    minors:
      'خدماتنا ليست موجهة للأطفال. إن كنت تعتقد أن طفلًا قدّم بيانات، تواصل معنا لإزالتها.',
    contact:
      'للاستفسارات أو الطلبات: privacy@lythwear.com. سنقوم بالرد وفق المتطلبات النظامية (PDPL/GDPR).',
  },
} as const;

export default async function PrivacyPage({ params }: Params) {
  const p = (await params) || { locale: 'ar' };
  const locale = p?.locale === 'en' ? 'en' : 'ar';
  const t = content[locale as 'en' | 'ar'];

  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t.title}</h1>
      <p>{t.updated}</p>
      <p>{t.intro}</p>

      <h2>{locale === 'ar' ? 'الجهة المتحكمة بالبيانات' : 'Data Controller'}</h2>
      <p>{t.controller}</p>

      <h2>{locale === 'ar' ? 'البيانات التي نجمعها' : 'Data We Collect'}</h2>
      <ul>
        {t.dataWeCollect.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <h2>{locale === 'ar' ? 'أغراض المعالجة' : 'Purposes of Processing'}</h2>
      <ul>
        {t.purposes.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <h2>{locale === 'ar' ? 'الأسس النظامية/القانونية' : 'Legal Bases'}</h2>
      <ul>
        {t.legalBases.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <h2>{locale === 'ar' ? 'مدة الاحتفاظ' : 'Data Retention'}</h2>
      <p>{t.retention}</p>

      <h2>{locale === 'ar' ? 'المشاركة مع الغير' : 'Sharing with Third Parties'}</h2>
      <p>{t.sharing}</p>

      <h2>{locale === 'ar' ? 'نقل البيانات' : 'International Data Transfers'}</h2>
      <p>{t.transfers}</p>

      <h2>{locale === 'ar' ? 'حقوقك' : 'Your Rights'}</h2>
      <ul>
        {t.rights.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <h2>{locale === 'ar' ? 'الأمان' : 'Security'}</h2>
      <p>{t.security}</p>

      <h2>{locale === 'ar' ? 'القُصّر' : 'Children'}</h2>
      <p>{t.minors}</p>

      <h2>{locale === 'ar' ? 'التواصل' : 'Contact'}</h2>
      <p>{t.contact}</p>

      <p style={{ marginTop: '2rem' }}>
        <Link href={`/${locale}`}>{locale === 'ar' ? 'العودة إلى الرئيسية' : 'Back to Home'}</Link>
      </p>
    </main>
  );
}
