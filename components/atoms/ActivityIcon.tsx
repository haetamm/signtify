import { getActivityStyleInfo } from "@/lib/util/helper";
import {
  FiCheckCircle,
  FiFileText,
  FiTrendingUp,
  FiXCircle,
} from "react-icons/fi";

const iconMap: Record<string, React.ReactNode> = {
  FiCheckCircle: <FiCheckCircle className="text-green-500" />,
  FiXCircle: <FiXCircle className="text-red-500" />,
  FiTrendingUp: <FiTrendingUp className="text-blue-500" />,
};

interface ActivityIconProps {
  activityType: string;
}

export default function ActivityIcon({ activityType }: ActivityIconProps) {
  const { iconName, bgColor } = getActivityStyleInfo(activityType);
  const icon = iconMap[iconName] ?? <FiFileText className="text-gray-400" />;

  return <div className={`p-2 rounded-full ${bgColor} shrink-0`}>{icon}</div>;
}
