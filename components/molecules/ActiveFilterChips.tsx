import FilterChip from "@/components/atoms/FilterChip";
import { UserFilterParams } from "@/lib/util/interface";

interface ActiveFilterChipsProps {
  filters: UserFilterParams;
  onChange: (filters: Partial<UserFilterParams>) => void;
}

const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  onChange,
}) => (
  <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2.5 flex flex-wrap gap-1.5">
    {filters.name && (
      <FilterChip
        label={`Nama: ${filters.name}`}
        onRemove={() => onChange({ name: "", page: 1 })}
      />
    )}
    {filters.email && (
      <FilterChip
        label={`Email: ${filters.email}`}
        onRemove={() => onChange({ email: "", page: 1 })}
      />
    )}
    {filters.phone && (
      <FilterChip
        label={`Telp: ${filters.phone}`}
        onRemove={() => onChange({ phone: "", page: 1 })}
      />
    )}
    {filters.gender && (
      <FilterChip
        label={filters.gender}
        onRemove={() => onChange({ gender: "", page: 1 })}
      />
    )}
    {filters.isEnable !== "" && (
      <FilterChip
        label={filters.isEnable ? "Aktif" : "Nonaktif"}
        onRemove={() => onChange({ isEnable: "", page: 1 })}
      />
    )}
  </div>
);

export default ActiveFilterChips;
