import { LayoutToggle } from "@/components/atoms/LayoutToggle";
import { SearchInput } from "@/components/atoms/SearchInput";
import { Button } from "@/components/ui/button";
import { useSidebarOpen, useUIStore } from "@/lib/stores/useUIStore";
import { LucideAlignVerticalJustifyCenter } from "lucide-react";
import { HiOutlineChevronRight, HiPlus } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

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
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const isOpen = useSidebarOpen();

  return (
    <div className="bg-background border-b sticky top-0 pt-2 z-[550]">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center gap-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-card-text flex-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Add"
            onClick={toggleSidebar}
          >
            <HiPlus className="w-4 h-4 hidden lg:block" />
            {isOpen ? (
              <IoMdClose className="lg:hidden w-4 h-4" />
            ) : (
              <LucideAlignVerticalJustifyCenter className="lg:hidden w-4 h-4" />
            )}
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
