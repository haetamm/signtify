import { Button } from "@/components/ui/button";
import { HiBars3, HiSquares2X2 } from "react-icons/hi2";

type Layout = "grid" | "list";

interface LayoutToggleProps {
  layout: Layout;
  onChange: (layout: Layout) => void;
}

export function LayoutToggle({ layout, onChange }: LayoutToggleProps) {
  return (
    <div className="flex items-center gap-0.5 bg-card rounded-lg p-0.5">
      <Button
        variant={layout === "grid" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        title="Grid"
        onClick={() => onChange("grid")}
      >
        <HiSquares2X2 className="w-4 h-4" />
      </Button>
      <Button
        variant={layout === "list" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        title="List"
        onClick={() => onChange("list")}
      >
        <HiBars3 className="w-4 h-4" />
      </Button>
    </div>
  );
}
