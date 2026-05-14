import { getUser } from "../api/userApi";
import { useUserStore } from "../stores/useUserStore";
import { UserQueryParam } from "../types/user";

export async function fetchUsers({
  page,
  size,
  name,
  gender,
  phone,
  email,
  isEnable,
  sortBy,
  direction,
}: UserQueryParam) {
  const response = await getUser({
    page,
    size,
    name,
    gender,
    phone,
    email,
    isEnable,
    sortBy,
    direction,
  });
  useUserStore.getState().setUsers(response.data, response.paginationResponse);
  return response;
}
