import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/util/helper";

export function SidebarDocSkeleton() {
  return (
    <div className="fixed top-22 left-6 h-[calc(100vh-108px)] w-45 rounded-xl bg-background/95 backdrop-blur-xl border border-white/10 lg:hidden z-[200] overflow-hidden">
      <div className="px-5 pt-8 pb-6"></div>

      {/* Nav items */}
      <div className="px-4 space-y-1.5 py-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 rounded-xl",
              i === 1 && "bg-white/5", // simulate active state
            )}
          >
            {/* Icon skeleton */}
            <Skeleton className="h-5 w-5 rounded" />

            {/* Label skeleton */}
            <Skeleton className="h-4 flex-1" />

            {/* Pulse dot (hanya untuk active) */}
            {i === 1 && <Skeleton className="h-2 w-2 rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}
