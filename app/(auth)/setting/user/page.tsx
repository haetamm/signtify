"use client";

import PaginationBar from "@/components/molecules/PaginationBar";
import UserFilterBar from "@/components/molecules/UserFilterBar";
import UserCardList from "@/components/organisms/UserCardList";
import UserTable from "@/components/organisms/UserTable";
import {
  PaginationResponse,
  User,
  UserFilterParams,
} from "@/lib/util/interface";
import { usersData } from "@/lib/util/resource";
import { useCallback, useEffect, useMemo, useState } from "react";

// ─── helper: filter + sort + paginate dari mock data ──────────────────────────
function applyFiltersAndPaginate(
  data: User[],
  filters: UserFilterParams,
): { data: User[]; pagination: PaginationResponse } {
  let result = [...data];

  if (filters.name)
    result = result.filter((u) =>
      u.name.toLowerCase().includes(filters.name!.toLowerCase()),
    );
  if (filters.email)
    result = result.filter((u) =>
      u.email.toLowerCase().includes(filters.email!.toLowerCase()),
    );
  if (filters.phone)
    result = result.filter((u) => u.phone.includes(filters.phone!));
  if (filters.gender)
    result = result.filter((u) => u.gender === filters.gender);
  if (filters.isEnable !== "" && filters.isEnable !== undefined)
    result = result.filter((u) => u.isEnable === filters.isEnable);

  if (filters.sortBy) {
    result.sort((a, b) => {
      const key = filters.sortBy as keyof User;
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

// ─── Default filter ────────────────────────────────────────────────────────────
const DEFAULT_FILTERS: UserFilterParams = {
  name: "",
  phone: "",
  gender: "",
  email: "",
  isEnable: "",
  page: 1,
  size: 5,
  sortBy: "",
};

// ─── Page Component ────────────────────────────────────────────────────────────
export default function UserListPage() {
  const [filters, setFilters] = useState<UserFilterParams>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(false);
  const pageSizeOption = [5, 10, 15, 20, 25];

  // Simulate async fetch delay on filter change
  const [displayFilters, setDisplayFilters] =
    useState<UserFilterParams>(DEFAULT_FILTERS);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setDisplayFilters(filters);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [filters]);

  const { data: users, pagination } = useMemo(
    () => applyFiltersAndPaginate(usersData, displayFilters),
    [displayFilters],
  );

  const handleFilterChange = useCallback(
    (updated: Partial<UserFilterParams>) => {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-6 flex flex-col gap-4">
        {/* Filter bar */}
        <UserFilterBar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Table */}
        <UserTable users={users} isLoading={isLoading} />
        <UserCardList users={users} isLoading={isLoading} />

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
