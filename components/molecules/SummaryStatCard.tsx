import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FiFolder } from "react-icons/fi";

interface SummaryStatCardProps {
  inProgress: number;
  waitingSignature: number;
  needMySignature: number;
  completed: number;
  totalMyDocuments: number;
}

export default function SummaryStatCard({
  inProgress,
  waitingSignature,
  needMySignature,
  completed,
  totalMyDocuments,
}: SummaryStatCardProps) {
  const progressPercent =
    totalMyDocuments > 0 ? Math.round((completed / totalMyDocuments) * 100) : 0;

  const rows = [
    {
      label: "Dokumen Aktif",
      value: inProgress + waitingSignature,
      valueClass: "",
    },
    {
      label: "Perlu TTD Saya",
      value: needMySignature,
      valueClass: "text-purple-600",
    },
    {
      label: "Terselesaikan",
      value: completed,
      valueClass: "text-emerald-600",
    },
  ];

  return (
    <Card className="border-gray-100 shadow-sm flex-1">
      <CardHeader className="flex-row items-center gap-2 space-y-0 px-4 pt-4 pb-0 text-base">
        <div className="flex items-center space-x-3">
          <FiFolder className="text-gray-400" />
          <h3 className="font-semibold">Ringkasan</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map(({ label, value, valueClass }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-sm">{label}</span>
            <span className={`font-semibold ${valueClass}`}>{value}</span>
          </div>
        ))}

        <Separator />

        <div className="pb-4 lg:pb-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
          <Progress
            value={progressPercent}
            className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}
