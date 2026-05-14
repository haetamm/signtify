import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Permissions, Role } from "../types/role";
import { PaginationResponse } from "../utils/interface";

interface RoleState {
  roles: Role[];
  pagination: PaginationResponse | null;
  roleId: string | null;
  roleName: string | null;
  permissions: Permissions[];
  isHydrated: boolean;
}

interface RoleActions {
  setRoles: (roles: Role[], pagination: PaginationResponse) => void;
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
      roles: [],
      pagination: null,
      roleId: null,
      roleName: null,
      permissions: [],
      isHydrated: false,

      setRoles: (roles, pagination) => {
        set({ roles, pagination }, false, "role/setRoles");
      },

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
