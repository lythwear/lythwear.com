import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="LYTH - Premium Saudi Sportswear. Coming Soon."
        />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://lythwear.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:title" content="LYTH - Coming Soon" />
        <meta
          property="og:description"
          content="Get ready for Saudi-born sportswear."
        />
        <meta property="og:url" content="https://lythwear.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>LYTH - Coming Soon</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
