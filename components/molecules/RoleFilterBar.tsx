"use client";

import SortSelect from "@/components/molecules/SortSelect";
import { STATUS_OPTIONS } from "@/lib/utils/constans";
import { RoleFilterParams } from "@/lib/utils/interface";
import { FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import PillSelector from "./PillSelector";
import RoleSearchInputGroup from "./RoleSearchInputGroup";

interface RoleFilterBarProps {
  filters: RoleFilterParams;
  onChange: (filters: Partial<RoleFilterParams>) => void;
  onReset: () => void;
}

const RoleFilterBar: React.FC<RoleFilterBarProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const hasActiveFilter =
    !!filters.name || filters.isActive !== "" || !!filters.sortBy;

  return (
    <div className="bg-card  md:sticky z-0 top-0 z-10 rounded-2xl border border-gray-100 dark:border-none shadow-sm">
      <div className="p-3">
        <div className="sm:flex space-y-2 sm:space-y-0 items-center gap-2">
          <RoleSearchInputGroup filters={filters} onChange={onChange} />
          <PillSelector
            options={STATUS_OPTIONS}
            value={filters.isActive === "" ? "" : String(filters.isActive)}
            onChange={(value) =>
              onChange({
                isActive: value === "" ? "" : value === "true",
                page: 1,
              })
            }
          />
          <SortSelect
            value={filters.sortBy ?? ""}
            isLabel={false}
            onChange={(value) => onChange({ sortBy: value, page: 1 })}
          />
          {hasActiveFilter && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              title="Reset semua filter"
              className="sm:w-10 h-10 w-full rounded-xl bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
            >
              <FiX className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleFilterBar;
