'use client';
import { useEffect, useState } from 'react';

export default function Countdown({ target, locale }: { target: string; locale: 'ar' | 'en' }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function fmt(diffMs: number) {
      if (diffMs <= 0) return '';
      const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const h = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diffMs / (1000 * 60)) % 60);
      const s = Math.floor((diffMs / 1000) % 60);
      const daysLabel = locale === 'ar' ? 'يوم' : 'days';
      return `${d} ${daysLabel} ${h}:${m.toString().padStart(2, '0')}:${s
        .toString()
        .padStart(2, '0')}`;
    }

    const id = setInterval(() => {
      const diff = new Date(target).getTime() - Date.now();
      const s = fmt(diff);
      setTimeLeft(s);
      if (!s) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [target, locale]);

  if (!timeLeft) return null;

  return (
    <>
      <p className="countdown" role="status" aria-live="polite">{timeLeft}</p>
      <style jsx>{`
        .countdown { font-size: 1.2rem; margin: 1rem 0; }
      `}</style>
    </>
  );
}

