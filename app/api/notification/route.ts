import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { NotificationResponse } from "@/lib/types/notification";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  const page = request.nextUrl.searchParams.get("page") || 1;
  const size = request.nextUrl.searchParams.get("size") || 10;

  if (!process.env.BACKEND_API_URL) {
    console.error("[route/notification] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      `/api/notification?page=${page}&size=${size}`,
      undefined,
      request,
      "GET",
    );
    const data: NotificationResponse = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    return response;
  } catch (error) {
    console.error("[route/notification] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
