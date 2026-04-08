"use client";

import FilterTabGroup from "@/components/molecules/FilterTabGroup";
import PaginationBar from "@/components/molecules/PaginationBar";
import NotificationList from "@/components/organisms/NotificationList";
import {
  ApiResponse,
  Notification,
  PaginationResponse,
} from "@/lib/util/interface";
import { notifications as notificationsData } from "@/lib/util/resource";
import { useEffect, useState } from "react";

type FilterOption = "all" | "unread" | "read";

const PAGE_SIZE = 7;
const TOTAL = notificationsData.length;

const fetchNotifications = async (
  page: number,
  size: number,
): Promise<ApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const totalPages = Math.ceil(TOTAL / size);
  const startIndex = (page - 1) * size;
  const paginatedData = notificationsData.slice(startIndex, startIndex + size);
  return {
    code: 200,
    status: "SUCCESS_RETRIEVE",
    data: paginatedData,
    paginationResponse: {
      totalPages,
      totalElements: TOTAL,
      page,
      size,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<FilterOption>("all");

  useEffect(() => {
    loadNotifications(currentPage);
  }, [currentPage]);

  const loadNotifications = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchNotifications(page, PAGE_SIZE);
      if (response.code === 200) {
        setNotifications(response.data);
        setPagination(response.paginationResponse);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && pagination && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  return (
    <div className="h-[calc(100vh-130px)] bg-background md:px-6">
      <div className="max-w-7xl mx-auto px-0 sm:px-3 lg:px-8 ">
        <FilterTabGroup active={filter} onChange={setFilter} />
        <NotificationList
          notifications={filtered}
          loading={loading}
          filter={filter}
          onMarkAsRead={markAsRead}
        />
        {pagination && pagination.totalPages > 1 && !loading && (
          <PaginationBar
            pagination={pagination}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
