import { BaseResponse, PaginationResponse } from "../utils/interface";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  referenceId: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationResponse extends BaseResponse {
  data: Notification[];
  paginationResponse: PaginationResponse;
}
