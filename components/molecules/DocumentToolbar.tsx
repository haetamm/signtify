import { LayoutToggle } from "@/components/atoms/LayoutToggle";
import { SearchInput } from "@/components/atoms/SearchInput";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronRight, HiPlus } from "react-icons/hi2";

type Layout = "grid" | "list";

interface DocumentToolbarProps {
  breadcrumb?: string;
  search: string;
  layout: Layout;
  onSearchChange: (val: string) => void;
  onLayoutChange: (layout: Layout) => void;
  onAdd?: () => void;
}

export function DocumentToolbar({
  breadcrumb = "Root",
  search,
  layout,
  onSearchChange,
  onLayoutChange,
  onAdd,
}: DocumentToolbarProps) {
  return (
    <div className="bg-background border-b sticky top-0 pt-2 z-100">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center gap-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-card-text flex-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Add"
            onClick={onAdd}
          >
            <HiPlus className="w-4 h-4" />
          </Button>
          <HiOutlineChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-300 hidden sm:block" />
          <span className="font-medium truncate hidden sm:block">
            {breadcrumb}
          </span>
        </div>

        <SearchInput value={search} onChange={onSearchChange} />
        <LayoutToggle layout={layout} onChange={onLayoutChange} />
      </div>
    </div>
  );
}
