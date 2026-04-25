import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { profileSchema } from "@/lib/schemas/profileSchema";
import { ProfileResponse } from "@/lib/types/profile";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "Bad Request", "Invalid JSON body");
  }

  const parsed = profileSchema.safeParse(body);
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
    console.error("[route/profile/edit] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      "/api/profile",
      parsed.data,
      request,
      "PUT",
    );
    const data: ProfileResponse = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("[route/profile/edit] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
