import { Button } from "@/components/ui/button";
import { FiChevronDown, FiChevronUp, FiSliders } from "react-icons/fi";

interface FilterToggleButtonProps {
  isOpen: boolean;
  activeCount: number;
  onClick: () => void;
}

const FilterToggleButton: React.FC<FilterToggleButtonProps> = ({
  isOpen,
  activeCount,
  onClick,
}) => (
  <Button
    variant="outline"
    onClick={onClick}
    className={`flex-shrink-0 flex items-center gap-2 rounded-xl border dark:border-0 text-sm h-11 w-full sm:w-auto justify-start ${
      activeCount > 0
        ? "bg-blue-50 dark:bg-primary"
        : "bg-gray-50 dark:bg-primary/10"
    }`}
  >
    <FiSliders className="w-3.5 h-3.5" />
    <span>Filter</span>
    {activeCount > 0 && (
      <span className="ml-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
        {activeCount}
      </span>
    )}
    {isOpen ? (
      <FiChevronUp className="w-3.5 h-3.5" />
    ) : (
      <FiChevronDown className="w-3.5 h-3.5" />
    )}
  </Button>
);

export default FilterToggleButton;
