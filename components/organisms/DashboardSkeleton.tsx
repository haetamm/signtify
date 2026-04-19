import { cn } from "@/lib/utils/helper";
import { Skeleton } from "../ui/skeleton";

function StatCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <Skeleton className="w-10 h-7 rounded-md" />
      </div>
      <Skeleton className="w-24 h-3 rounded-md" />
    </div>
  );
}

function SummaryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

function SectionCardSkeleton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-100 shadow-sm bg-white overflow-hidden h-full flex flex-col",
        className,
      )}
    >
      <div className="px-4 py-5 sm:p-5 border-b bg-gradient-to-r from-gray-50 to-white shrink-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-40 h-4 rounded-md" />
          </div>
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
      </div>
      <div className="p-0 flex-1 overflow-hidden">
        <div className="divide-y divide-gray-50">{children}</div>
      </div>
    </div>
  );
}

function UrgentDocumentItemSkeleton() {
  return (
    <div className="px-4 sm:px-5 py-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-40 h-4 rounded-md" />
            <Skeleton className="w-20 h-5 rounded-full" />
          </div>
          <Skeleton className="w-56 h-3 rounded-md" />
          <div className="flex gap-3 mt-1">
            <Skeleton className="w-20 h-3 rounded-md" />
            <Skeleton className="w-28 h-3 rounded-md" />
            <Skeleton className="w-24 h-3 rounded-md" />
          </div>
        </div>
        <Skeleton className="ml-4 w-24 h-6 rounded-full" />
      </div>
    </div>
  );
}

function UrgentDocumentsPanelSkeleton() {
  return (
    <SectionCardSkeleton>
      {Array.from({ length: 3 }).map((_, i) => (
        <UrgentDocumentItemSkeleton key={i} />
      ))}
    </SectionCardSkeleton>
  );
}

function QuickActionCardSkeleton() {
  return (
    <div className="rounded-2xl p-5 bg-muted space-y-3">
      <Skeleton className="w-24 h-4 rounded-md" />
      <Skeleton className="w-48 h-3 rounded-md" />
      <Skeleton className="w-36 h-9 rounded-lg" />
    </div>
  );
}

function SummaryStatCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 shadow-sm bg-white flex-1 p-4 space-y-3">
      <div className="flex items-center gap-3 pb-1">
        <Skeleton className="w-5 h-5 rounded-md" />
        <Skeleton className="w-24 h-4 rounded-md" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton className="w-24 h-3 rounded-md" />
          <Skeleton className="w-8 h-3 rounded-md" />
        </div>
      ))}
      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="w-14 h-3 rounded-md" />
          <Skeleton className="w-8 h-3 rounded-md" />
        </div>
        <Skeleton className="w-full h-2 rounded-full" />
      </div>
    </div>
  );
}

function DashboardRightColumnSkeleton() {
  return (
    <div className="space-y-6 flex flex-col h-full">
      <QuickActionCardSkeleton />
      <SummaryStatCardSkeleton />
    </div>
  );
}

function ActiveDocumentItemSkeleton() {
  return (
    <div className="px-4 sm:px-5 py-5 space-y-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-36 h-4 rounded-md" />
            <Skeleton className="w-20 h-5 rounded-full" />
          </div>
          <Skeleton className="w-48 h-3 rounded-md" />
        </div>
      </div>
      <Skeleton className="w-full h-2 rounded-full" />
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Skeleton className="w-28 h-3 rounded-md" />
          <Skeleton className="w-20 h-3 rounded-md" />
        </div>
        <Skeleton className="w-24 h-3 rounded-md" />
      </div>
    </div>
  );
}

function ActiveDocumentsPanelSkeleton() {
  return (
    <SectionCardSkeleton>
      {Array.from({ length: 3 }).map((_, i) => (
        <ActiveDocumentItemSkeleton key={i} />
      ))}
    </SectionCardSkeleton>
  );
}

function ActivityItemSkeleton() {
  return (
    <div className="px-4 sm:px-5 py-5 flex items-start gap-3">
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-3/4 h-3 rounded-md" />
        <div className="flex gap-3 mt-1">
          <Skeleton className="w-24 h-3 rounded-md" />
          <Skeleton className="w-20 h-3 rounded-md" />
          <Skeleton className="w-20 h-3 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function RecentActivityPanelSkeleton() {
  return (
    <SectionCardSkeleton>
      {Array.from({ length: 4 }).map((_, i) => (
        <ActivityItemSkeleton key={i} />
      ))}
    </SectionCardSkeleton>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-2">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="w-56 h-8 rounded-md" />
          <Skeleton className="w-72 h-4 rounded-md" />
        </div>

        {/* Summary Cards */}
        <SummaryGridSkeleton />

        {/* Urgent + Right Column */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col order-2 lg:order-1">
            <UrgentDocumentsPanelSkeleton />
          </div>
          <div className="order-1 lg:order-2">
            <DashboardRightColumnSkeleton />
          </div>
        </div>

        {/* Active + Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ActiveDocumentsPanelSkeleton />
          <RecentActivityPanelSkeleton />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
          <Skeleton className="w-64 h-3 rounded-md" />
        </div>
      </div>
    </div>
  );
}
