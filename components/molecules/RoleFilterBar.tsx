"use client";

import { RoleQueryParam } from "@/lib/types/role";
import { ROLE_SORT_OPTIONS, STATUS_OPTIONS } from "@/lib/utils/constans";
import { FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import PillSelector from "./PillSelector";
import RoleSearchInputGroup from "./RoleSearchInputGroup";
import SortSelect from "./SortSelect";

interface RoleFilterBarProps {
  filters: RoleQueryParam;
  onChange: (filters: Partial<RoleQueryParam>) => void;
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
            value={filters.isActive}
            onChange={(value) => onChange({ isActive: value, page: 1 })}
          />
          <SortSelect
            isLabel={false}
            options={ROLE_SORT_OPTIONS}
            sortBy={filters.sortBy}
            direction={filters.direction}
            onChange={(sortBy, direction) =>
              onChange({ sortBy, direction, page: 1 })
            }
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
