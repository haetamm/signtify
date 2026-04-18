import { Skeleton } from "@/components/ui/skeleton";

export function ResetPassFormSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Password Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Confirm Password Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-11 w-full rounded-full mt-5" />
    </div>
  );
}
