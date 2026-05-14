import { RoleQueryParam } from "@/lib/types/role";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface RoleSearchInputGroupProps {
  filters: Pick<RoleQueryParam, "name">;
  onChange: (filters: Partial<RoleQueryParam>) => void;
}

const RoleSearchInputGroup: React.FC<RoleSearchInputGroupProps> = ({
  filters,
  onChange,
}) => {
  // Local state — tidak langsung trigger URL/fetch saat ketik
  const [localName, setLocalName] = useState(filters.name);

  // Sync local ← filters saat reset atau perubahan dari luar (tanpa useEffect)
  const [prevFilters, setPrevFilters] = useState(filters);
  if (filters.name !== prevFilters.name) {
    setPrevFilters(filters);
    setLocalName(filters.name);
  }

  // Commit ke URL hanya kalau nilai berubah
  const commitName = () => {
    if (localName !== filters.name) onChange({ name: localName, page: 1 });
  };

  const onKeyDown =
    (commit: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
        commit();
      }
    };

  return (
    <div className="flex-1 flex flex-col sm:flex-row gap-2">
      <Button className="hidden sm:flex w-10 h-10 shadow-md">
        <FaPlus className="w-4 h-4 text-white" />
      </Button>
      <Input
        placeholder="Nama"
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        onBlur={commitName}
        onKeyDown={onKeyDown(commitName)}
        className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
      />
    </div>
  );
};

export default RoleSearchInputGroup;
