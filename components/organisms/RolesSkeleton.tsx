import { Skeleton } from "@/components/ui/skeleton";
import RoleTableSkeleton from "../atoms/RoleTableSkeleton";

// Filter Bar Skeleton
function FilterBarSkeleton() {
  return (
    <div className="bg-card md:sticky top-0 z-10 rounded-2xl border border-gray-100 dark:border-none shadow-sm">
      <div className="p-3">
        <div className="sm:flex space-y-2 sm:space-y-0 items-center gap-2">
          {/* RoleSearchInputGroup Skeleton */}
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            {/* Plus Button */}
            <Skeleton className="hidden sm:flex w-10 h-10 rounded-xl" />

            {/* Search Input */}
            <Skeleton className="h-10 flex-1 rounded-xl" />
          </div>

          {/* PillSelector Skeleton */}
          <div className="flex-shrink-0">
            <div className="flex gap-1.5 bg-gray-100 dark:bg-primary/10 rounded-xl p-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="flex-1 h-9 w-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* SortSelect Skeleton */}
          <div className="w-full sm:w-48">
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Reset Button Skeleton */}
          <Skeleton className="sm:w-10 h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// Main Skeleton
export default function RolesSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-6 flex flex-col gap-4">
        {/* Page header (mobile only) */}
        <div className="sm:hidden flex items-center justify-between">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>

        <FilterBarSkeleton />

        <div className="sm:px-2 flex flex-col gap-3">
          <RoleTableSkeleton />
        </div>
      </div>
    </div>
  );
}
