import { UserQueryParam, UserResponse } from "../types/user";
import { parseErrors } from "./clientRequest";
import { serverRequest } from "./serverRequest";

export async function getUserServer({
  page,
  size,
  name,
  gender,
  phone,
  email,
  isEnable,
  sortBy,
  direction,
}: UserQueryParam): Promise<UserResponse | null> {
  const res = await serverRequest(
    `/api/user?page=${page}&size=${size}&name=${name}&phone=${phone}&gender=${gender}&email=${email}&isEnable=${isEnable}&sortBy=${sortBy}&direction=${direction}`,
    "GET",
  );

  if (res.status === 401) return null;

  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data users");
  return data as UserResponse;
}
