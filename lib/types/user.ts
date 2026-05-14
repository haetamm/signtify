import { BaseResponse, PaginationResponse } from "../utils/interface";

export interface UserQueryParam {
  page: number;
  size: number;
  name: string;
  phone: string;
  gender: string;
  email: string;
  isEnable: string;
  sortBy: string;
  direction: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  gender: string;
  email: string;
  isEnable: boolean;
}

export interface UserResponse extends BaseResponse {
  data: User[];
  paginationResponse: PaginationResponse;
}
