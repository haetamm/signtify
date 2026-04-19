import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { loginSchema } from "@/lib/schemas/authSchema";
import { AuthResponse } from "@/lib/types/auth";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "Bad Request", "Invalid JSON body");
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        code: 422,
        status: "Validation Error",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  if (!process.env.BACKEND_API_URL) {
    console.error("[route/login] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch("/api/auth/login", parsed.data);
    const data: AuthResponse = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    // Simpan token di cookie setelah login berhasil
    if (backendRes.ok) {
      response.cookies.set("token", data.data.token, {
        httpOnly: true, // tidak bisa diakses JS browser (aman dari XSS)
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      response.cookies.set("isAuthenticated", "true", {
        httpOnly: false, // boleh dibaca JS karena hanya flag UI
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("[route/login] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
