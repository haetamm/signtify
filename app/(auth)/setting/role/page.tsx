"use client";

import PageHeader from "@/components/molecules/PageHeader";
import PaginationBar from "@/components/molecules/PaginationBar";
import RoleFilterBar from "@/components/molecules/RoleFilterBar";
import RoleTable from "@/components/organisms/RoleTable";
import { handleBack } from "@/lib/util/helper";
import {
  PaginationResponse,
  Role,
  RoleFilterParams,
} from "@/lib/util/interface";
import { roleData } from "@/lib/util/resource";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

function applyFiltersAndPaginate(
  data: Role[],
  filters: RoleFilterParams,
): { data: Role[]; pagination: PaginationResponse } {
  let result = [...data];

  if (filters.name)
    result = result.filter((u) =>
      u.name.toLowerCase().includes(filters.name!.toLowerCase()),
    );

  if (filters.isActive !== "" && filters.isActive !== undefined)
    result = result.filter((u) => u.isActive === filters.isActive);

  if (filters.sortBy) {
    result.sort((a, b) => {
      const key = filters.sortBy as keyof Role;
      return String(a[key]).localeCompare(String(b[key]));
    });
  }

  const totalElements = result.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / filters.size));
  const safePage = Math.min(filters.page, totalPages);
  const start = (safePage - 1) * filters.size;
  const paged = result.slice(start, start + filters.size);

  return {
    data: paged,
    pagination: {
      totalPages,
      totalElements,
      page: safePage,
      size: filters.size,
      hasPrevious: safePage > 1,
      hasNext: safePage < totalPages,
    },
  };
}

const DEFAULT_FILTERS: RoleFilterParams = {
  name: "",
  isActive: "",
  page: 1,
  size: 5,
  sortBy: "",
};

export default function RolePage() {
  const [filters, setFilters] = useState<RoleFilterParams>(DEFAULT_FILTERS);
  const pageSizeOption = [5, 10, 15, 20, 25];

  const [displayFilters, setDisplayFilters] =
    useState<RoleFilterParams>(DEFAULT_FILTERS);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayFilters(filters);
    }, 300);
    return () => clearTimeout(timeout);
  }, [filters]);

  const isLoading = displayFilters !== filters;

  const { data: roles, pagination } = useMemo(
    () => applyFiltersAndPaginate(roleData, displayFilters),
    [displayFilters],
  );

  const handleFilterChange = useCallback(
    (updated: Partial<RoleFilterParams>) => {
      setFilters((prev) => ({ ...prev, ...updated }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setFilters((prev) => ({ ...prev, size, page: 1 }));
  }, []);

  const handleAdd = () => {
    console.log("tambah role");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-6 flex flex-col gap-4">
        <div className="sm:hidden sticky z-0 top-0 z-12 bg-background ">
          <PageHeader
            title="Role Management"
            onBack={handleBack}
            onAction={handleAdd}
          >
            <FaPlus className="w-3.5 h-3.5" />
            Tambah Role
          </PageHeader>
        </div>

        {/* Filter bar */}
        <RoleFilterBar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Table */}
        <div className="sm:px-2">
          <RoleTable roles={roles} isLoading={isLoading} />
        </div>

        {/* Pagination */}
        <PaginationBar
          pagination={pagination}
          currentPage={displayFilters.page}
          pageSize={displayFilters.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOption={pageSizeOption}
        />
      </div>
    </div>
  );
}
