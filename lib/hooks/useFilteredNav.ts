"use client";

import { useRoleStore } from "@/lib/stores/useRoleStore";
import { NavItem } from "../utils/interface";

export function useFilteredNav(items: NavItem[]): {
  visible: NavItem[];
  isLoading: boolean;
} {
  const { hasPermission, isHydrated } = useRoleStore();

  if (!isHydrated) return { visible: [], isLoading: true };

  const visible = items.filter((item) =>
    !item.requiredPermission
      ? true
      : hasPermission(
          item.requiredPermission.url,
          item.requiredPermission.action,
        ),
  );

  return { visible, isLoading: false };
}
