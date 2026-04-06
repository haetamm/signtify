import QuickActionCard from "@/components/molecules/QuickActionCard";
import SummaryStatCard from "@/components/molecules/SummaryStatCard";

interface Summary {
  inProgress: number;
  waitingSignature: number;
  needMySignature: number;
  completed: number;
  totalMyDocuments: number;
}

export default function DashboardRightColumn({
  summary,
}: {
  summary: Summary;
}) {
  return (
    <div className="space-y-6 flex flex-col h-full">
      <QuickActionCard needMySignature={summary.needMySignature} />
      <SummaryStatCard
        inProgress={summary.inProgress}
        waitingSignature={summary.waitingSignature}
        needMySignature={summary.needMySignature}
        completed={summary.completed}
        totalMyDocuments={summary.totalMyDocuments}
      />
    </div>
  );
}
