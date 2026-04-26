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
    console.error("[route/profile/avatar] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const formData = await request.formData();

    const backendRes = await backendFetch(
      `/api/profile/avatar`,
      formData,
      request,
      "POST",
    );

    if (!backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data, { status: backendRes.status });
    }

    const data: GeneralResponse = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("[route/profile/avatar] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
