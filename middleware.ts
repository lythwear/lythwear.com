import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = new Set(["ar", "en"]);

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Skip any file with an extension (assets), Next internals and API routes
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      /\.[^/]+$/.test(pathname)
    ) {
      return NextResponse.next();
    }

    // Already prefixed with locale
    const first = pathname.split("/").filter(Boolean)[0];
    if (first && LOCALES.has(first)) {
      return NextResponse.next();
    }

    const locale =
      request.nextUrl.searchParams.get("lang") === "en" ? "en" : "ar";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    url.searchParams.delete("lang");
    return NextResponse.rewrite(url);
  } catch (e) {
    // If anything goes wrong, don't block the request
    return NextResponse.next();
  }
}

export const config = {
  // Run on all paths except Next internals, image/static assets and common public files
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|logo.svg).*)",
  ],
};
