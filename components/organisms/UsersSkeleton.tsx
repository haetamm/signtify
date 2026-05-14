import { Skeleton } from "@/components/ui/skeleton";
import UserCardSkeleton from "../atoms/UserCardSkeleton";
import UserTableSkeleton from "../atoms/UserTableSkeleton";

// Filter Bar Skeleton
function FilterBarSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-gray-100 dark:border-none shadow-sm p-3">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        {/* Button tambah */}
        <Skeleton className="hidden sm:block w-10 h-10 rounded-xl shrink-0" />
        {/* Search inputs */}
        <Skeleton className="w-full h-10 rounded-xl" />
        <Skeleton className="w-full h-10 rounded-xl" />
        <Skeleton className="w-full h-10 rounded-xl" />
        {/* Filter toggle */}
        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
      </div>
    </div>
  );
}

// Main Skeleton
export default function UsersSkeleton() {
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
          <UserTableSkeleton />
          <UserCardSkeleton />
        </div>
      </div>
    </div>
  );
}
