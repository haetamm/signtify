import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  let refreshToken: string;
  try {
    const body = await request.json();
    if (!body?.refreshToken || typeof body.refreshToken !== "string") {
      return errorResponse(400, "Bad Request", "refreshToken is required");
    }
    refreshToken = body.refreshToken;
  } catch {
    return errorResponse(400, "Bad Request", "Invalid JSON body");
  }

  if (!process.env.BACKEND_API_URL) {
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch("/api/auth/refresh", {
      refreshToken,
    });
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("[route/auth/refresh] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
