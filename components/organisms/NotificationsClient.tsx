"use client";

import FilterTabGroup from "@/components/molecules/FilterTabGroup";
import PaginationBar from "@/components/molecules/PaginationBar";
import NotificationList from "@/components/organisms/NotificationList";
import {
  fetchNotifications,
  markAsRead,
} from "@/lib/action/notificationActions";
import { useNotificationStore } from "@/lib/stores/useNotificationStore";
import { Notification } from "@/lib/types/notification";
import { PaginationResponse } from "@/lib/utils/interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NotificationsSkeleton from "./NotificationSkeleton";

type FilterOption = "all" | "unread" | "read";

interface NotificationsClientProps {
  initialNotifications: Notification[];
  initialPagination: PaginationResponse;
  initialPage: number;
  initialSize: number;
  initialFilter: FilterOption;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function NotificationsClient({
  initialNotifications,
  initialPagination,
  initialPage,
  initialSize,
  initialFilter,
}: NotificationsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { notifications, pagination, setNotifications, setFilter } =
    useNotificationStore();

  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const prevPageRef = useRef(String(initialPage));
  const prevSizeRef = useRef(String(initialSize));
  const isFirstRender = useRef(true);

  // Hydrate store dengan SSR data saat pertama kali mount
  useEffect(() => {
    setNotifications(initialNotifications, initialPagination);
    setFilter(initialFilter);
    setIsInitialLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const page = searchParams.get("page") ?? String(initialPage);
    const size = searchParams.get("size") ?? String(initialSize);
    const filter =
      (searchParams.get("filter") as FilterOption) ?? initialFilter;

    const pageChanged = page !== prevPageRef.current;
    const sizeChanged = size !== prevSizeRef.current;

    setFilter(filter);

    // Page atau size berubah → fetch ulang
    if (pageChanged || sizeChanged) {
      prevPageRef.current = page;
      prevSizeRef.current = size;

      setIsFetching(true);
      fetchNotifications(page, size).finally(() => setIsFetching(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateUrl = (params: Record<string, string>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => current.set(key, value));
    router.push(`?${current.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    updateUrl({ page: String(newPage) });
  };

  const handlePageSizeChange = (newSize: number) => {
    updateUrl({ page: "1", size: String(newSize) });
  };

  const handleFilterChange = (newFilter: FilterOption) => {
    updateUrl({ filter: newFilter });
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const currentFilter =
    (searchParams.get("filter") as FilterOption) ?? initialFilter;

  // Filter diterapkan dari store
  const filteredNotifications = notifications.filter((n) => {
    if (currentFilter === "unread") return !n.isRead;
    if (currentFilter === "read") return n.isRead;
    return true;
  });

  const currentPage = Number(searchParams.get("page") ?? initialPage);
  const currentSize = Number(searchParams.get("size") ?? initialSize);
  const currentPagination = pagination ?? initialPagination;

  // Tampilkan skeleton hanya saat initial load (SSR data belum siap)
  if (isInitialLoad) {
    return <NotificationsSkeleton />;
  }

  return (
    <div className="bg-background md:px-6 pb-6">
      <div className="max-w-7xl mx-auto px-0 sm:px-3 lg:px-8">
        <FilterTabGroup active={currentFilter} onChange={handleFilterChange} />
        <NotificationList
          notifications={filteredNotifications}
          loading={isFetching}
          filter={currentFilter}
          onMarkAsRead={handleMarkAsRead}
        />
        {currentPagination &&
          currentPagination.totalElements > 0 &&
          !isFetching && (
            <PaginationBar
              pagination={currentPagination}
              currentPage={currentPage}
              pageSize={currentSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              pageSizeOption={PAGE_SIZE_OPTIONS}
            />
          )}
      </div>
    </div>
  );
}
