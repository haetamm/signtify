import { Progress } from "@/components/ui/progress";

interface SignatureProgressProps {
  signed: number;
  total: number;
}

export default function SignatureProgress({
  signed,
  total,
}: SignatureProgressProps) {
  const percent = total > 0 ? (signed / total) * 100 : 0;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progres Tanda Tangan</span>
        <span>
          {signed}/{total}
        </span>
      </div>

      <Progress
        value={percent}
        className="h-1.5 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500"
      />
    </div>
  );
}
