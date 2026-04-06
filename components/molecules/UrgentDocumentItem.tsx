import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { FiAlertCircle, FiClock, FiUser, FiUsers } from "react-icons/fi";

interface UrgentDoc {
  id: string | number;
  title: string;
  fileName: string;
  ownerName: string;
  deadline: string;
  isOverdue: boolean;
  pendingContributors: number | null;
  urgentType: string;
}

export default function UrgentDocumentItem({ doc }: { doc: UrgentDoc }) {
  return (
    <div className="px-4 sm:px-5 py-5 hover:bg-primary-foreground/10 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="font-medium">{doc.title}</h3>
            {doc.isOverdue && (
              <Badge
                variant="outline"
                className="gap-1 text-xs bg-red-100 text-red-700 border-red-200"
              >
                <FiAlertCircle className="w-3 h-3" /> Terlambat
              </Badge>
            )}
          </div>
          <p className="text-sm mb-2">{doc.fileName}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FiUser className="w-3 h-3" /> {doc.ownerName}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-3 h-3" /> Deadline:{" "}
              {formatDate(doc.deadline)}
            </span>
            {doc.pendingContributors != null && doc.pendingContributors > 0 && (
              <span className="flex items-center gap-1">
                <FiUsers className="w-3 h-3" /> Menunggu{" "}
                {doc.pendingContributors} orang
              </span>
            )}
          </div>
        </div>
        <div className="ml-4">
          <Badge
            variant="secondary"
            className={
              doc.urgentType === "NEED_MY_SIGNATURE"
                ? "bg-purple-100 text-purple-700"
                : "bg-amber-100 text-amber-700"
            }
          >
            {doc.urgentType === "NEED_MY_SIGNATURE"
              ? "Butuh TTD Saya"
              : "Menunggu TTD Lain"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
