import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Permissions } from "../types/role";

interface RoleState {
  roleId: string | null;
  roleName: string | null;
  permissions: Permissions[];
  isHydrated: boolean;
}

interface RoleActions {
  setRole: (
    roleId: string,
    roleName: string,
    permissions: Permissions[],
  ) => void;
  hasPermission: (url: string, action: string) => boolean;
  clearRole: () => void;
}

export const useRoleStore = create<RoleState & RoleActions>()(
  devtools(
    (set, get) => ({
      roleId: null,
      roleName: null,
      permissions: [],
      isHydrated: false,

      setRole: (roleId, roleName, permissions) => {
        set(
          { roleId, roleName, permissions, isHydrated: true },
          false,
          "role/setRole",
        );
      },

      hasPermission: (url, action) => {
        return get().permissions.some(
          (p) => p.url === url && p.action === action,
        );
      },

      clearRole: () => {
        set(
          { roleId: null, roleName: null, permissions: [], isHydrated: false },
          false,
          "role/clearRole",
        );
      },
    }),
    { name: "RoleStore" },
  ),
);
