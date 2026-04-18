import { UserFilterParams } from "@/lib/utils/interface";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface RoleSearchInputGroupProps {
  filters: Pick<UserFilterParams, "name" | "email" | "phone">;
  onChange: (filters: Partial<UserFilterParams>) => void;
}

const RoleSearchInputGroup: React.FC<RoleSearchInputGroupProps> = ({
  filters,
  onChange,
}) => (
  <div className="flex-1 flex flex-col sm:flex-row gap-2">
    <Button className="hidden sm:flex w-10 h-10 shadow-md">
      <FaPlus className="w-4 h-4 text-white" />
    </Button>
    <Input
      placeholder="Nama"
      value={filters.name ?? ""}
      onChange={(e) => onChange({ name: e.target.value, page: 1 })}
      className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
    />
  </div>
);

export default RoleSearchInputGroup;
