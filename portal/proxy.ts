import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD || "runpod2026";

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get("ops-gateway-auth");
  if (authCookie?.value === "authenticated") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/api/auth") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/api/auth";
  url.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
