import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { loginSchema } from "@/lib/schemas/authSchema";
import { AuthResponse } from "@/lib/types/auth";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { encryptPermissions } from "@/lib/utils/permissionCookie";
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

  const parsed = loginSchema.safeParse(body);
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
    console.error("[route/auth/login] BACKEND_API_URL is not set");
    return errorResponse(500, "Internal Server Error");
  }

  try {
    const backendRes = await backendFetch("/api/auth/login", parsed.data);
    const data: AuthResponse = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    if (backendRes.ok) {
      response.cookies.set("token", data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      response.cookies.set("refreshToken", data.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      response.cookies.set("isAuthenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      // fetch permissions langsung ke backend pakai token baru
      try {
        const permRes = await fetch(
          `${process.env.BACKEND_API_URL}/api/profile/permission`,
          {
            headers: {
              Authorization: `Bearer ${data.data.token}`,
            },
          },
        );

        if (permRes.ok) {
          const permData = await permRes.json();
          const encrypted = await encryptPermissions(permData.data.permissions);
          response.cookies.set("permissions", encrypted, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
        } else {
          console.warn(
            "[route/auth/login] Failed to fetch permissions, status:",
            permRes.status,
          );
        }
      } catch (permError) {
        console.error(
          "[route/auth/login] Failed to fetch permissions:",
          permError,
        );
      }
    }

    console.log("[login] cookies being set:", response.cookies.getAll());
    return response;
  } catch (error) {
    console.error("[route/auth/login] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
