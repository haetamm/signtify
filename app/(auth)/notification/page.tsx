import NotificationsClient from "@/components/organisms/NotificationsClient";
import NotificationsSkeleton from "@/components/organisms/NotificationSkeleton";
import { Suspense } from "react";

interface NotificationsPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    filter?: string;
  }>;
}

async function NotificationsContent({ searchParams }: NotificationsPageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const size = params.size ?? "5";
  const filter = (params.filter as "all" | "unread" | "read") ?? "all";

  const paginationDefault = {
    totalPages: 0,
    totalElements: 0,
    page: 1,
    size: 10,
    hasNext: false,
    hasPrevious: false,
  };

  return (
    <NotificationsClient
      initialPagination={paginationDefault}
      initialPage={Number(page)}
      initialSize={Number(size)}
      initialFilter={filter}
    />
  );
}

export default function NotificationsPage(props: NotificationsPageProps) {
  return (
    <Suspense fallback={<NotificationsSkeleton />}>
      <NotificationsContent {...props} />
    </Suspense>
  );
}
