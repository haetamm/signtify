import { getRole } from "../api/roleApi";
import { useRoleStore } from "../stores/useRoleStore";
import { RoleQueryParam } from "../types/role";

export async function fetchRoles({
  page,
  size,
  name,
  isActive,
  sortBy,
  direction,
}: RoleQueryParam) {
  const response = await getRole({
    page,
    size,
    name,
    isActive,
    sortBy,
    direction,
  });
  useRoleStore.getState().setRoles(response.data, response.paginationResponse);
  return response;
}
