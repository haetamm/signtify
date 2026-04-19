import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { forgotPassSchema } from "@/lib/schemas/authSchema";
import { AuthResponse } from "@/lib/types/auth";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "Bad Request", "Invalid JSON body");
  }

  const parsed = forgotPassSchema.safeParse(body);
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
    console.error("[route/auth/forgot-password] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch(
      "/api/auth/forgot-password",
      parsed.data,
    );
    const data: AuthResponse = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error(
      "[route/auth/forgot-password] Failed to reach backend:",
      error,
    );
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
