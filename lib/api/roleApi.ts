import { RoleQueryParam, RolesResponse } from "../types/role";
import { ErrorResponse } from "../utils/types";
import { clientRequest, parseErrors } from "./clientRequest";

export async function getRole({
  page,
  size,
  name,
  isActive,
  sortBy,
  direction,
}: RoleQueryParam): Promise<RolesResponse> {
  const res = await clientRequest(
    `/api/role?page=${page}&size=${size}&name=${name}&isActive=${isActive}&sortBy=${sortBy}&direction=${direction}`,
    "GET",
  );
  const data: ErrorResponse | RolesResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data roles");
  return data as RolesResponse;
}
