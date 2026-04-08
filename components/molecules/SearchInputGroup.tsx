import { UserFilterParams } from "@/lib/util/interface";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";

interface SearchInputGroupProps {
  filters: Pick<UserFilterParams, "name" | "email" | "phone">;
  onChange: (filters: Partial<UserFilterParams>) => void;
}

const SearchInputGroup: React.FC<SearchInputGroupProps> = ({
  filters,
  onChange,
}) => (
  <div className="flex-1 flex flex-col sm:flex-row gap-2">
    <div className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full bg-primary items-center justify-center shadow-md">
      <FiSearch className="w-4 h-4 text-white" />
    </div>
    <Input
      placeholder="Nama"
      value={filters.name ?? ""}
      onChange={(e) => onChange({ name: e.target.value, page: 1 })}
      className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
    />
    <Input
      placeholder="Email"
      value={filters.email ?? ""}
      onChange={(e) => onChange({ email: e.target.value, page: 1 })}
      className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
    />
    <Input
      placeholder="Nomor Telepon"
      value={filters.phone ?? ""}
      onChange={(e) => onChange({ phone: e.target.value, page: 1 })}
      className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
    />
  </div>
);

export default SearchInputGroup;
