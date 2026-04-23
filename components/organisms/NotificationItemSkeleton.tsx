import { Skeleton } from "../ui/skeleton";

export default function NotificationItemSkeleton() {
  return (
    <div className="flex rounded-md overflow-hidden shadow-sm">
      {/* vertical label skeleton */}
      <div className="w-12 bg-muted">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* content skeleton */}
      <div className="flex-1 bg-card p-4 lg:min-h-32">
        <div className="flex gap-4 h-full items-center lg:items-start">
          {/* icon skeleton */}
          <Skeleton className="w-10 h-10 rounded-full" />

          <div className="flex-1">
            {/* title and NEW badge skeleton */}
            <div className="flex items-baseline justify-between gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-12" />
            </div>

            {/* message skeleton */}
            <Skeleton className="h-3 w-full mt-1.5" />
            <Skeleton className="h-3 w-3/4 mt-1" />

            {/* date skeleton */}
            <div className="flex justify-end mt-3">
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
