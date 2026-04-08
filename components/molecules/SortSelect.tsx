import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "name_asc", label: "Nama (A-Z)" },
  { value: "name_desc", label: "Nama (Z-A)" },
  { value: "created_at_desc", label: "Terbaru" },
  { value: "created_at_asc", label: "Terlama" },
];

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => (
  <div>
    <Label className="block text-xs font-medium text-gray-500 mb-1.5">
      Urutkan
    </Label>
    <Select
      value={value || "none"}
      onValueChange={(val) => onChange(val === "none" ? "" : val)}
    >
      <SelectTrigger className="w-full rounded-xl bg-white dark:bg-primary/10 py-5">
        <SelectValue placeholder="Tanpa urutan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Tanpa urutan</SelectItem>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default SortSelect;
