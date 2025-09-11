import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = new Set(["ar", "en"]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip Next.js internals, API routes, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/webhooks") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/manifest") ||
    pathname.startsWith("/logo") ||
    // Skip any file with an extension (serves assets from /public)
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already prefixed with locale
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && LOCALES.has(first)) {
    return NextResponse.next();
  }

  const locale = searchParams.get("lang") === "en" ? "en" : "ar";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  url.searchParams.delete("lang");
  return NextResponse.rewrite(url);
}
