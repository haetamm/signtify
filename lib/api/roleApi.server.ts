import { RoleQueryParam, RolesResponse } from "../types/role";
import { parseErrors } from "./clientRequest";
import { serverRequest } from "./serverRequest";

export async function getRoleServer({
  page,
  size,
  name,
  isActive,
  sortBy,
  direction,
}: RoleQueryParam): Promise<RolesResponse | null> {
  const res = await serverRequest(
    `/api/role?page=${page}&size=${size}&name=${name}&isActive=${isActive}&sortBy=${sortBy}&direction=${direction}`,
    "GET",
  );

  if (res.status === 401) return null;

  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data roles");
  return data as RolesResponse;
}
