import { BaseResponse } from "../utils/interface";

export interface UrgentDocument {
  id: string;
  title: string;
  fileName: string;
  documentStatus: string;
  urgentType: string;
  ownerName: string;
  pendingContributors: number | null;
  deadline: string;
  isOverdue: boolean;
}

export interface ActiveDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  status: string;
  folderName: string | null;
  totalContributors: number;
  signedContributors: number;
  pendingContributors: number;
  deadline: string;
  isOverdue: boolean;
  updatedAt: string;
}

export interface Activity {
  documentId: string;
  documentTitle: string;
  activityType: string;
  description: string;
  triggeredBy: string;
  createdAt: string;
}

export interface SummaryData {
  totalMyDocuments: number;
  draft: number;
  waitingSignature: number;
  inProgress: number;
  completed: number;
  rejected: number;
  needMySignature: number;
  overdue: number;
}

export interface DashboardResponse extends BaseResponse {
  data: {
    summary: SummaryData;
    urgent: UrgentDocument[];
    myActiveDocuments: ActiveDocument[];
    recentActivity: Activity[];
  };
}
