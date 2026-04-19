import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { DashboardResponse } from "@/lib/types/dashboard";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  if (!process.env.BACKEND_API_URL) {
    console.error("[route/dashboard] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      "/api/dashboard",
      undefined,
      request,
      "GET",
    );
    const data: DashboardResponse = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    return response;
  } catch (error) {
    console.error("[route/dashboard] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
