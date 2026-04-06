import { Badge } from "@/components/ui/badge";
import { getStatusBadgeInfo } from "@/lib/util/helper";
import { FiCheckCircle, FiClock, FiFileText, FiXCircle } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";

const iconMap: Record<string, React.ReactNode> = {
  FiClock: <FiClock className="w-3 h-3" />,
  MdOutlinePendingActions: <MdOutlinePendingActions className="w-3 h-3" />,
  FiFileText: <FiFileText className="w-3 h-3" />,
  FiCheckCircle: <FiCheckCircle className="w-3 h-3" />,
  FiXCircle: <FiXCircle className="w-3 h-3" />,
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, color, iconName } = getStatusBadgeInfo(status);
  const icon = iconMap[iconName] ?? iconMap["FiFileText"];

  return (
    <Badge variant="outline" className={`gap-1 text-xs font-normal ${color}`}>
      {icon}
      {label}
    </Badge>
  );
}
