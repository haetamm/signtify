import ActivityIcon from "@/components/atoms/ActivityIcon";
import { formatDate } from "@/lib/utils";
import { FiClock, FiFileText, FiUser } from "react-icons/fi";

interface Activity {
  activityType: string;
  description: string;
  documentTitle: string;
  triggeredBy: string;
  createdAt: string;
}

export default function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="px-4 sm:px-5 py-5 hover:bg-primary-foreground/10 transition-colors flex items-start gap-3">
      <ActivityIcon activityType={activity.activityType} />
      <div className="flex-1">
        <p className="text-sm">{activity.description}</p>
        <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FiFileText className="w-3 h-3" /> {activity.documentTitle}
          </span>
          <span className="flex items-center gap-1">
            <FiUser className="w-3 h-3" /> {activity.triggeredBy}
          </span>
          <span className="flex items-center gap-1">
            <FiClock className="w-3 h-3" /> {formatDate(activity.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
