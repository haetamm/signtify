import { BaseResponse, PaginationResponse } from "../utils/interface";

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

export interface Role {
  id: string;
  name: string;
  isActive: boolean;
}

export interface RolesResponse extends BaseResponse {
  data: Role[];
  paginationResponse: PaginationResponse;
}

export interface RoleQueryParam {
  page: number;
  size: number;
  name: string;
  isActive: string;
  sortBy: string;
  direction: string;
}
