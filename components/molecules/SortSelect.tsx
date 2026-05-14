import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SortOption {
  value: string;
  label: string;
  sortBy: string;
  direction: string;
}

interface SortSelectProps {
  options: SortOption[];
  sortBy: string;
  direction: string;
  isLabel?: boolean;
  onChange: (sortBy: string, direction: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({
  options,
  sortBy,
  direction,
  isLabel = true,
  onChange,
}) => {
  const compositeValue =
    sortBy && direction ? `${sortBy}_${direction}` : "none";

  const handleChange = (val: string) => {
    if (val === "none") {
      onChange("", "");
      return;
    }
    const found = options.find((o) => o.value === val);
    if (found) onChange(found.sortBy, found.direction);
  };

  return (
    <div>
      {isLabel && (
        <Label className="block text-xs font-medium text-gray-500 mb-1.5">
          Urutkan
        </Label>
      )}
      <Select value={compositeValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full rounded-xl bg-white dark:bg-primary/10 py-5">
          <SelectValue placeholder="Tanpa urutan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Tanpa urutan</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelect;
