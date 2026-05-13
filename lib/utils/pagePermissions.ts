import { Permissions } from "../types/role";

type RequiredPermission = Pick<Permissions, "url" | "action">;

export const pagePermissions: Record<string, RequiredPermission> = {
  "/dashboard": { url: "/api/dashboard", action: "READ" },
  "/document": { url: "/api/folder", action: "READ" },
  "/document/devision": { url: "/api/folder", action: "READ" },
  "/document/trash": { url: "/api/folder", action: "READ" },
  "/notification": { url: "/api/notification", action: "READ" },
  "/setting/user": { url: "/api/user", action: "READ" },
  "/setting/role": { url: "/api/role", action: "READ" },
};
