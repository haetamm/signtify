import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { GeneralResponse } from "@/lib/utils/interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  if (!process.env.BACKEND_API_URL) {
    console.error("[rauth/oute/logout] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      "/api/profile/logout",
      undefined,
      request,
    );
    const data: GeneralResponse = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    if (backendRes.ok) {
      response.cookies.delete("token");
      response.cookies.delete("isAuthenticated");
      response.cookies.delete("refreshToken");
      response.cookies.delete("permissions");
    }

    return response;
  } catch (error) {
    console.error("[route/auth/logout] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
