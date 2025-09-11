import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 — Page Not Found</h1>
      <p style={{ opacity: 0.8 }}>
        We couldn’t find the page you were looking for.
      </p>
      <p style={{ marginTop: '1rem' }}>
        <Link href="/ar">اذهب إلى الصفحة الرئيسية (AR)</Link>
        {' '}|{' '}
        <Link href="/en">Go to homepage (EN)</Link>
      </p>
    </main>
  );
}

