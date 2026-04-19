import { IconKey } from "@/components/organisms/Sidebar";

export interface BaseResponse {
  code: number;
  status: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: IconKey;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  referenceId: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaginationResponse {
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse {
  code: number;
  status: string;
  data: Notification[];
  paginationResponse: PaginationResponse;
}

export interface DetailResponse {
  name: string;
  phone: string;
  address: string;
  birthPlace: string;
  birthDate: string;
  religion: string;
  gender: string;
  username: string;
  email: string;
  profile_id: string;
  createdAt: string;
  updatedAt: string;
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

export interface UserListResponse {
  code: number;
  status: string;
  data: User[];
  paginationResponse: PaginationResponse;
}

export interface UserFilterParams {
  name?: string;
  phone?: string;
  gender?: string;
  email?: string;
  isEnable?: boolean | "";
  page: number;
  size: number;
  sortBy?: string;
}

export interface Permission {
  id: string;
  url: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  isActive: boolean;
}

export interface RoleDetail {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface RoleFilterParams {
  name?: string;
  isActive?: boolean | "";
  page: number;
  size: number;
  sortBy?: string;
}
