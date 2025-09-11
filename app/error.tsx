"use client";
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for observability (safe in development)
    console.error('App error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p style={{ opacity: 0.8 }}>
            An unexpected error occurred. Try again or return home.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => reset()} style={{ padding: '0.5rem 1rem' }}>
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

