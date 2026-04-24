import { cookies } from "next/headers";

export async function serverRequest(
  path: string,
  method: string,
  body?: unknown,
): Promise<Response> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4000";

  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      Origin: baseUrl,
      Referer: `${baseUrl}/`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
