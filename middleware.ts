import { decryptPermissions } from "@/lib/utils/permissionCookie";
import { NextRequest, NextResponse } from "next/server";
import { urlPage } from "./lib/utils/constans";
import { pagePermissions } from "./lib/utils/pagePermissions";

const PROTECTED_PREFIXES = [
  urlPage.DASHBOARD,
  urlPage.DOCUMENT,
  urlPage.NOTIFICATION,
  urlPage.SETTING,
];

const GUEST_ONLY = [
  urlPage.LOGIN,
  urlPage.FORGOT_PASSWORD,
  urlPage.RESET_PASSWORD,
];
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GUEST_ONLY.some((p) => pathname === p)) {
    if (request.cookies.get("isAuthenticated")?.value === "true") {
      return NextResponse.redirect(new URL(urlPage.DASHBOARD, request.url));
    }
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtected) {
    if (request.cookies.get("isAuthenticated")?.value !== "true") {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // TARUH DI SINI
    const required = pagePermissions[pathname];

    if (required) {
      const permCookie = request.cookies.get("permissions")?.value;
      console.log("[middleware] permCookie exists:", !!permCookie);

      const permissions = permCookie
        ? await decryptPermissions(permCookie)
        : null;

      const allowed = permissions?.some(
        (p) => p.url === required.url && p.action === required.action,
      );

      if (!allowed) {
        return NextResponse.redirect(new URL("/403", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img/|api/).*)"],
};
