import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { AuthResponse } from "@/lib/types/auth";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  // Baca dari cookie, bukan body
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return errorResponse(401, "Unauthorized", "No refresh token");
  }

  try {
    const backendRes = await backendFetch("/api/auth/refresh-token", {
      refreshToken,
    });
    const data: AuthResponse = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    if (backendRes.ok) {
      response.cookies.set("token", data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      response.cookies.set("refreshToken", data.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("[route/auth/refresh] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
