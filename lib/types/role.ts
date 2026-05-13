import { BaseResponse } from "../utils/interface";

export interface Permissions {
  id: string;
  url: string;
  action: string;
}

export interface RoleResponse extends BaseResponse {
  data: {
    id: string;
    name: string;
    permissions: Permissions[];
  };
}
