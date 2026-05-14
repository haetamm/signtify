import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { UserResponse } from "@/lib/types/user";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  const page = request.nextUrl.searchParams.get("page") || 1;
  const size = request.nextUrl.searchParams.get("size") || 10;
  const name = request.nextUrl.searchParams.get("name") || "";
  const phone = request.nextUrl.searchParams.get("phone") || "";
  const gender = request.nextUrl.searchParams.get("gender") || "";
  const email = request.nextUrl.searchParams.get("email") || "";
  const isEnable = request.nextUrl.searchParams.get("isEnable") || true;
  const sortBy = request.nextUrl.searchParams.get("sortBy") || "";
  const direction = request.nextUrl.searchParams.get("direction") || "";

  if (!process.env.BACKEND_API_URL) {
    console.error("[route/user] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      `/api/user?page=${page}&size=${size}&name=${name}&phone=${phone}&gender=${gender}&email=${email}&isEnable=${isEnable}&sortBy=${sortBy}&direction=${direction}`,
      undefined,
      request,
      "GET",
    );
    const data: UserResponse = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    return response;
  } catch (error) {
    console.error("[route/user] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
