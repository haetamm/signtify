import { NextRequest } from "next/server";

export async function backendFetch(
  path: string,
  body?: unknown,
  request?: NextRequest,
) {
  // Ambil token dari cookie, pasang sebagai Authorization header
  const token = request?.cookies.get("token")?.value;

  return fetch(`${process.env.BACKEND_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });
}
