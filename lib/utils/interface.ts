export interface BaseResponse {
  code: number;
  status: string;
}

export interface GeneralResponse extends BaseResponse {
  data: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  requiredPermission?: {
    url: string;
    action: string;
  };
}

export interface PaginationResponse {
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
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
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
