import SignatureProgress from "@/components/atoms/SignatureProgress";
import StatusBadge from "@/components/atoms/StatusBadge";
import { formatDate, formatFileSize } from "@/lib/utils";
import { FiActivity, FiAlertCircle, FiClock, FiUsers } from "react-icons/fi";

interface ActiveDoc {
  id: string | number;
  title: string;
  fileName: string;
  fileSize: number;
  folderName?: string | null;
  status: string;
  isOverdue: boolean;
  signedContributors: number;
  totalContributors: number;
  pendingContributors: number;
  deadline: string;
  updatedAt: string;
}

export default function ActiveDocumentItem({ doc }: { doc: ActiveDoc }) {
  return (
    <div className="px-4 sm:px-5 py-5 hover:bg-primary-foreground/10 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-medium">{doc.title}</h3>
            <StatusBadge status={doc.status} />
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {doc.fileName} • {formatFileSize(doc.fileSize)}
            {doc.folderName && ` • 📁 ${doc.folderName}`}
          </p>
        </div>
        {doc.isOverdue && <FiAlertCircle className="text-red-400 w-4 h-4" />}
      </div>

      <SignatureProgress
        signed={doc.signedContributors}
        total={doc.totalContributors}
      />

      <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <FiClock className="w-3 h-3" /> Deadline: {formatDate(doc.deadline)}
          </span>
          <span className="flex items-center gap-1">
            <FiUsers className="w-3 h-3" /> {doc.pendingContributors} menunggu
          </span>
        </div>
        <span className="flex items-center gap-1">
          <FiActivity className="w-3 h-3" /> Update: {formatDate(doc.updatedAt)}
        </span>
      </div>
    </div>
  );
}
