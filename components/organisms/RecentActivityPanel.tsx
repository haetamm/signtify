import ActivityItem from "@/components/molecules/ActivityItem";

import { FiActivity } from "react-icons/fi";
import SectionCard from "../molecules/SectionCard";

interface Activity {
  activityType: string;
  description: string;
  documentTitle: string;
  triggeredBy: string;
  createdAt: string;
}

export default function RecentActivityPanel({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <SectionCard
      icon={<FiActivity />}
      iconBg="bg-emerald-50"
      iconColor="text-emerald-500"
      title="Aktifitas Terbaru"
      countLabel={`${activities.length} Action`}
      countColor="bg-emerald-50 text-blue-600"
      headerGradient="from-emerald-50 to-white"
      isEmpty={activities.length === 0}
      emptyMessage="Belum ada aktifitas"
      contentClassName="lg:overflow-y-auto lg:max-h-96"
    >
      {activities.map((activity, idx) => (
        <ActivityItem key={idx} activity={activity} />
      ))}
    </SectionCard>
  );
}
