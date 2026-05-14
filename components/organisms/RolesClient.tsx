"use client";

import { fetchRoles } from "@/lib/action/roleAction";
import { useRoleStore } from "@/lib/stores/useRoleStore";
import { RoleQueryParam } from "@/lib/types/role";
import { PAGE_SIZE_OPTIONS } from "@/lib/utils/constans";
import { buildRoleQuerySearchParams } from "@/lib/utils/helper";
import { PaginationResponse } from "@/lib/utils/interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import PageHeader from "../molecules/PageHeader";
import PaginationBar from "../molecules/PaginationBar";
import RoleFilterBar from "../molecules/RoleFilterBar";
import RoleTable from "./RoleTable";

interface RolesClientProps {
  initialPagination: PaginationResponse;
  initialPage: number;
  initialSize: number;
}

const DEFAULT_QUERY: Omit<RoleQueryParam, "page" | "size"> = {
  name: "",
  isActive: "",
  sortBy: "",
  direction: "",
};

export default function RolesClient({
  initialPagination,
  initialPage,
  initialSize,
}: RolesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { roles, pagination } = useRoleStore();

  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const isFirstRender = useRef(true);
  // Track previous query string untuk detect perubahan
  const prevQueryRef = useRef(searchParams.toString());

  // Initial load
  useEffect(() => {
    const store = useRoleStore.getState();
    const storeIsEmpty = store.roles.length === 0;
    const storeMatchesParams =
      store.pagination?.page === initialPage &&
      store.pagination?.size === initialSize;

    if (!storeIsEmpty && storeMatchesParams) {
      // Store sudah punya data yang sesuai → skip fetch
      setIsInitialLoad(false);
      return;
    }

    // Store kosong atau params beda → fetch ulang
    const query = buildRoleQuerySearchParams(
      searchParams,
      initialPage,
      initialSize,
    );

    setIsFetching(true);
    fetchRoles(query).finally(() => {
      setIsFetching(false);
      setIsInitialLoad(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch searchParams changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const currentQuery = searchParams.toString();
    if (currentQuery === prevQueryRef.current) return;
    prevQueryRef.current = currentQuery;

    const query = buildRoleQuerySearchParams(
      searchParams,
      initialPage,
      initialSize,
    );
    setIsFetching(true);
    fetchRoles(query).finally(() => setIsFetching(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // URL update
  const updateUrl = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });
      router.push(`?${current.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Handlers filter
  const handleFilterChange = useCallback(
    (updated: Partial<RoleQueryParam>) => {
      const params: Record<string, string> = { page: "1" };
      Object.entries(updated).forEach(([key, value]) => {
        params[key] =
          value === undefined || value === null ? "" : String(value);
      });
      updateUrl(params);
    },
    [updateUrl],
  );

  const handleReset = useCallback(() => {
    const resetParams: Record<string, string> = {
      page: "1",
      size: String(initialSize),
    };
    Object.keys(DEFAULT_QUERY).forEach((key) => {
      resetParams[key] = "";
    });
    updateUrl(resetParams);
  }, [updateUrl, initialSize]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateUrl({ page: String(newPage) });
    },
    [updateUrl],
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      updateUrl({ page: "1", size: String(newSize) });
    },
    [updateUrl],
  );

  const handleAdd = () => {
    console.log("tambah user");
  };

  // Derived state
  const currentFilters = buildRoleQuerySearchParams(
    searchParams,
    initialPage,
    initialSize,
  );
  const currentPagination = pagination ?? initialPagination;

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-6 flex flex-col gap-4">
        <div className="sm:hidden sticky z-0 top-0 z-12 bg-background ">
          <PageHeader title="Role Management" onAction={handleAdd}>
            <FaPlus className="w-3.5 h-3.5" />
            Tambah Role
          </PageHeader>
        </div>

        {/* Filter bar */}
        <RoleFilterBar
          filters={currentFilters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Table */}
        <div className="sm:px-2">
          <RoleTable roles={roles} isLoading={isFetching || isInitialLoad} />
        </div>

        {/* Pagination */}
        <PaginationBar
          pagination={currentPagination}
          currentPage={currentFilters.page}
          pageSize={currentFilters.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOption={PAGE_SIZE_OPTIONS}
        />
      </div>
    </div>
  );
}
