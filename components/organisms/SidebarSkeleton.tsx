import { Skeleton } from "../ui/skeleton";

export function SidebarSkeleton() {
  return (
    <aside className="w-38 xl:w-56 h-full bg-background border-r border-border hidden lg:flex flex-col py-4 px-3 gap-1">
      {/* Header */}
      <div className="px-3 py-2 mb-4 border-b border-border">
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-3 flex-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4" style={{ width: `${60 + i * 10}%` }} />
          </div>
        ))}
      </nav>

      {/* Logout button */}
      <Skeleton className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 animate-pulse">
        <Skeleton className="h-4 w-4 bg-muted rounded" />
        <Skeleton className="h-4 w-14 bg-muted rounded" />
      </Skeleton>
    </aside>
  );
}
