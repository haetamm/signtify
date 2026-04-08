import { Badge } from "@/components/ui/badge";
import { FiX } from "react-icons/fi";

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => (
  <Badge
    variant="secondary"
    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full cursor-pointer"
  >
    {label}
    <button onClick={onRemove} className="hover:text-red-500">
      <FiX className="w-3 h-3" />
    </button>
  </Badge>
);

export default FilterChip;
