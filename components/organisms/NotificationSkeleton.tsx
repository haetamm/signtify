import { Skeleton } from "@/components/ui/skeleton";
import NotificationItemSkeleton from "./NotificationItemSkeleton";

export default function NotificationsSkeleton() {
  return (
    <div className="bg-background md:px-6">
      <div className="max-w-7xl mx-auto px-0 sm:px-3 lg:px-8">
        {/* Filter tab skeleton */}
        <div className="sticky top-0 z-10 bg-background py-4 md:pt-6 px-3 lg:px-0">
          <div className="border-b w-full">
            <div className="flex gap-2 justify-between sm:justify-start">
              {/* Tab skeletons */}
              <Skeleton className="h-10 w-20 rounded-none" />
              <Skeleton className="h-10 w-24 rounded-none" />
              <Skeleton className="h-10 w-20 rounded-none" />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-2 space-y-3 ">
          {Array.from({ length: 3 }).map((_, i) => (
            <NotificationItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
