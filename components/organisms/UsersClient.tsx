"use client";

import PageHeader from "@/components/molecules/PageHeader";
import PaginationBar from "@/components/molecules/PaginationBar";
import UserFilterBar from "@/components/molecules/UserFilterBar";
import UserCardList from "@/components/organisms/UserCardList";
import UserTable from "@/components/organisms/UserTable";
import { fetchUsers } from "@/lib/action/userAction";
import { useUserStore } from "@/lib/stores/useUserStore";
import { UserQueryParam } from "@/lib/types/user";
import { PAGE_SIZE_OPTIONS } from "@/lib/utils/constans";
import { buildQueryFromSearchParams } from "@/lib/utils/helper";
import { PaginationResponse } from "@/lib/utils/interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

interface UsersClientProps {
  initialPagination: PaginationResponse;
  initialPage: number;
  initialSize: number;
}

const DEFAULT_QUERY: Omit<UserQueryParam, "page" | "size"> = {
  name: "",
  phone: "",
  gender: "",
  email: "",
  isEnable: "",
  sortBy: "",
  direction: "",
};

export default function UsersClient({
  initialPagination,
  initialPage,
  initialSize,
}: UsersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { users, pagination } = useUserStore();

  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const isFirstRender = useRef(true);
  // Track previous query string untuk detect perubahan
  const prevQueryRef = useRef(searchParams.toString());

  // Initial load
  useEffect(() => {
    const store = useUserStore.getState();
    const storeIsEmpty = store.users.length === 0;
    const storeMatchesParams =
      store.pagination?.page === initialPage &&
      store.pagination?.size === initialSize;

    if (!storeIsEmpty && storeMatchesParams) {
      // Store sudah punya data yang sesuai → skip fetch
      setIsInitialLoad(false);
      return;
    }

    // Store kosong atau params beda → fetch ulang
    const query = buildQueryFromSearchParams(
      searchParams,
      initialPage,
      initialSize,
    );
    setIsFetching(true);
    fetchUsers(query).finally(() => {
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

    const query = buildQueryFromSearchParams(
      searchParams,
      initialPage,
      initialSize,
    );
    setIsFetching(true);
    fetchUsers(query).finally(() => setIsFetching(false));
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
    (updated: Partial<UserQueryParam>) => {
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
  const currentFilters = buildQueryFromSearchParams(
    searchParams,
    initialPage,
    initialSize,
  );
  const currentPagination = pagination ?? initialPagination;

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-6 flex flex-col gap-4">
        <div className="sm:hidden sticky z-12 top-0 bg-background">
          <PageHeader title="User Management" onAction={handleAdd}>
            <FaPlus className="w-3.5 h-3.5" />
            Tambah User
          </PageHeader>
        </div>

        {/* Filter bar */}
        <UserFilterBar
          filters={currentFilters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Table */}
        <div className="sm:px-2">
          <UserTable users={users} isLoading={isFetching || isInitialLoad} />
          <UserCardList users={users} isLoading={isFetching || isInitialLoad} />
        </div>

        {/* Pagination */}
        {currentPagination && currentPagination.totalElements > 0 && (
          <PaginationBar
            pagination={currentPagination}
            currentPage={currentFilters.page}
            pageSize={currentFilters.size}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOption={PAGE_SIZE_OPTIONS}
          />
        )}
      </div>
    </div>
  );
}
