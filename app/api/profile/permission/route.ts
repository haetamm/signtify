import { validateOrigin } from "@/lib/middleware/validateOrigin";
import { RoleResponse } from "@/lib/types/role";
import { backendFetch } from "@/lib/utils/backendFetch";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const originCheck = validateOrigin(request);
  if (!originCheck.valid)
    return errorResponse(403, "Forbidden", originCheck.reason);

  try {
    const backendRes = await backendFetch(
      "/api/profile/permission",
      undefined,
      request,
      "GET",
    );
    const data: RoleResponse = await backendRes.json();
    const response = NextResponse.json(data, { status: backendRes.status });

    // if (backendRes.ok) {
    //   const permData = await backendRes.json();
    //   const encrypted = await encryptPermissions(permData.data.permissions);
    //   response.cookies.set("permissions", encrypted, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     path: "/",
    //   });
    // }

    return response;
  } catch (error) {
    console.error("[route/role] Failed to reach backend:", error);
    return errorResponse(503, "Service Unavailable", "Backend unreachable");
  }
}
