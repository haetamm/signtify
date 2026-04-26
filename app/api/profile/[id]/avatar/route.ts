import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  const { id } = await params;

  if (!id) {
    return errorResponse(400, "Bad Request", "Profile ID is required");
  }

  if (!process.env.BACKEND_API_URL) {
    console.error("[route/profile/avatar] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      `/api/profile/${id}/avatar`,
      undefined,
      request,
      "GET",
    );

    if (!backendRes.ok) {
      return errorResponse(backendRes.status, "Failed to fetch avatar");
    }

    // Ambil binary data
    const imageBuffer = await backendRes.arrayBuffer();

    const contentType =
      backendRes.headers.get("content-type") ?? "application/octet-stream";
    const contentDisposition =
      backendRes.headers.get("content-disposition") ?? "";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("[route/profile/avatar] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
