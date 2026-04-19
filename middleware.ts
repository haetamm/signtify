import { NextRequest, NextResponse } from "next/server";
import { urlPage } from "./lib/utils/constans";

// Route yang harus dilindungi
const PROTECTED_PREFIXES = [
  urlPage.DASHBOARD,
  urlPage.DOCUMENT,
  urlPage.NOTIFICATION,
  urlPage.SETTING,
];

// Route yang hanya boleh diakses jika BELUM login
const GUEST_ONLY = [
  urlPage.LOGIN,
  urlPage.FORGOT_PASSWORD,
  urlPage.RESET_PASSWORD,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";

  // Proteksi route dashboard
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/", request.url);
    // Simpan URL tujuan agar setelah login bisa redirect kembali
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect dari login jika sudah login
  const isGuestOnly = GUEST_ONLY.some((path) => pathname === path);

  if (isGuestOnly && isAuthenticated) {
    return NextResponse.redirect(new URL(urlPage.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware hanya pada route berikut (skip static files, api)
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img/|api/).*)"],
};
