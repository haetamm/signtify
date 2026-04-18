"use client";

import FilterToggleButton from "@/components/atoms/FilterToggleButton";
import ActiveFilterChips from "@/components/molecules/ActiveFilterChips";
import PillSelector from "@/components/molecules/PillSelector";
import SortSelect from "@/components/molecules/SortSelect";
import UserSearchInputGroup from "@/components/molecules/UserSearchInputGroup";
import { GENDER_OPTIONS, STATUS_OPTIONS } from "@/lib/utils/constans";
import { UserFilterParams } from "@/lib/utils/interface";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Button } from "../ui/button";

interface UserFilterBarProps {
  filters: UserFilterParams;
  onChange: (filters: Partial<UserFilterParams>) => void;
  onReset: () => void;
}

const UserFilterBar: React.FC<UserFilterBarProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const hasActiveFilter =
    !!filters.name ||
    !!filters.phone ||
    !!filters.gender ||
    !!filters.email ||
    filters.isEnable !== "" ||
    !!filters.sortBy;

  const activeFilterCount = [
    !!filters.name,
    !!filters.phone,
    !!filters.email,
    !!filters.gender,
    filters.isEnable !== "",
    !!filters.sortBy,
  ].filter(Boolean).length;

  return (
    <div className="bg-card  md:sticky z-0 top-0 z-10 rounded-2xl border border-gray-100 dark:border-none shadow-sm">
      <div className="p-3">
        <div className="sm:flex space-y-2 sm:space-y-0 items-center gap-2">
          <UserSearchInputGroup filters={filters} onChange={onChange} />
          <FilterToggleButton
            isOpen={isAdvancedOpen}
            activeCount={activeFilterCount}
            onClick={() => setIsAdvancedOpen((prev) => !prev)}
          />
          {hasActiveFilter && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              title="Reset semua filter"
              className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
            >
              <FiX className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {isAdvancedOpen && (
        <div className="border-t border-gray-100 rounded-b-2xl px-4 py-4 bg-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <PillSelector
              label="Gender"
              options={GENDER_OPTIONS}
              value={filters.gender ?? ""}
              onChange={(value) => onChange({ gender: value, page: 1 })}
            />
            <PillSelector
              label="Status Akun"
              options={STATUS_OPTIONS}
              value={filters.isEnable === "" ? "" : String(filters.isEnable)}
              onChange={(value) =>
                onChange({
                  isEnable: value === "" ? "" : value === "true",
                  page: 1,
                })
              }
            />
            <SortSelect
              value={filters.sortBy ?? ""}
              onChange={(value) => onChange({ sortBy: value, page: 1 })}
            />
          </div>
        </div>
      )}

      {hasActiveFilter && !isAdvancedOpen && (
        <ActiveFilterChips filters={filters} onChange={onChange} />
      )}
    </div>
  );
};

export default UserFilterBar;
