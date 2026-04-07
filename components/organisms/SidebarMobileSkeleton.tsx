import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/util/helper";

export function SidebarMobileSkeleton() {
  return (
    <div className="flex lg:hidden w-full flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4">
        <div className="flex items-center justify-center">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <div className="flex-1 px-4 py-3 space-y-6">
        {/* User card */}
        <Card className="flex flex-row items-center gap-4 p-3">
          <Skeleton className="w-12 h-12 rounded-full shrink-0" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </Card>

        {/* Nav items */}
        <Card className="overflow-hidden">
          {Array.from({ length: 3 }).map((_, index, arr) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between px-4 py-3.5",
                index !== arr.length - 1 && "border-b border-border",
              )}
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton
                  style={{ width: `${80 + index * 12}px` }}
                  className="h-4"
                />
              </div>
              <Skeleton className="w-4 h-4 rounded" />
            </div>
          ))}
        </Card>

        {/* Logout button */}
        <Card className="overflow-hidden">
          <Skeleton className="h-11 w-full rounded-none" />
        </Card>

        {/* Version */}
        <div className="text-center pt-4">
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
      </div>
    </div>
  );
}
