import { BaseResponse } from "../utils/interface";
export interface ProfilePayload {
  name: string;
  username: string;
  email: string;
  phone: string | null;
  address: string | null;
  birthPlace: string | null;
  birthDate: string | null;
  religion: string | null;
  gender: string;
}

export interface ChangePassPayload {
  password: string;
  confirmPassword: string;
  oldPassword: string;
}

export interface Profile {
  name: string;
  phone: string | null;
  address: string | null;
  birthPlace: string | null;
  birthDate: string | null;
  religion: string | null;
  gender: string | null;
  username: string;
  email: string;
  profile_id: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse extends BaseResponse {
  data: Profile;
}
