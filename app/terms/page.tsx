import { redirect } from 'next/navigation';

type SearchParams = Record<string, string | string[] | undefined>;

export default async function TermsRedirect({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = (await searchParams) || {};
  const langParam = sp.lang;
  const lang = Array.isArray(langParam)
    ? (langParam[0] === 'en' ? 'en' : 'ar')
    : (langParam === 'en' ? 'en' : 'ar');
  redirect(`/${lang}/terms`);
}

