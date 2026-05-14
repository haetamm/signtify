import { UserQueryParam, UserResponse } from "../types/user";
import { ErrorResponse } from "../utils/types";
import { clientRequest, parseErrors } from "./clientRequest";

export async function getUser({
  page,
  size,
  name,
  gender,
  phone,
  email,
  isEnable,
  sortBy,
  direction,
}: UserQueryParam): Promise<UserResponse> {
  const res = await clientRequest(
    `/api/user?page=${page}&size=${size}&name=${name}&phone=${phone}&gender=${gender}&email=${email}&isEnable=${isEnable}&sortBy=${sortBy}&direction=${direction}`,
    "GET",
  );
  const data: ErrorResponse | UserResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data user");
  return data as UserResponse;
}
