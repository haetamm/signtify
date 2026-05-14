import { Skeleton } from "../ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-xl border dark:border-none bg-card p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-4 rounded w-3/4 mb-2" />
              <Skeleton className="h-3 rounded w-1/2" />
            </div>
            <Skeleton className="w-16 h-6 rounded-full" />
          </div>
          <Skeleton className="h-px my-3" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-3 rounded flex-1" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
