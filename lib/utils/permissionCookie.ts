import { jwtVerify, SignJWT } from "jose";
import { Permissions } from "../types/role";

const SECRET = new TextEncoder().encode(process.env.PERMISSION_SECRET!);

export async function encryptPermissions(
  permissions: Permissions[],
): Promise<string> {
  const minimal = permissions.map(({ url, action }) => `${url}:${action}`);

  return await new SignJWT({ permissions: minimal })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(SECRET);
}

export async function decryptPermissions(
  token: string,
): Promise<{ url: string; action: string }[] | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const raw = payload.permissions as string[];
    return raw.map((p) => {
      const [url, action] = p.split(":");
      return { url, action };
    });
  } catch {
    return null;
  }
}
