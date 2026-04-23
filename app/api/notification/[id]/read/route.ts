import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  const { id } = await params;

  if (!id) {
    return errorResponse(400, "Bad Request", "Notification ID is required");
  }

  if (!process.env.BACKEND_API_URL) {
    console.error("[route/notification/read] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      `/api/notification/${id}/read`,
      undefined,
      request,
      "PATCH",
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("[route/notification/read] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
