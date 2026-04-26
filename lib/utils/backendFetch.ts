import { NextRequest } from "next/server";

export async function backendFetch(
  path: string,
  body?: unknown,
  request?: NextRequest,
  method?: string,
) {
  // Ambil token dari cookie, pasang sebagai Authorization header
  const token = request?.cookies.get("token")?.value;
  const httpMethod = method ? method : "POST";
  const isFormData = body instanceof FormData || body instanceof ArrayBuffer;

  return fetch(`${process.env.BACKEND_API_URL}${path}`, {
    method: httpMethod,
    headers: {
      // Kalau FormData/ArrayBuffer, jangan set Content-Type — biar browser yg set + boundary
      ...(!isFormData && { "Content-Type": "application/json" }),
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: isFormData ? (body as FormData | ArrayBuffer) : JSON.stringify(body),
  });
}
