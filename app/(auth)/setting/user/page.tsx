import UsersClient from "@/components/organisms/UsersClient";
import UsersSkeleton from "@/components/organisms/UsersSkeleton";
import UserStoreHydrator from "@/components/providers/UserStoreHydrator";
import { getUserServer } from "@/lib/api/userApi.server";
import { User } from "@/lib/types/user";
import { paginationDefault } from "@/lib/utils/helper";
import { PaginationResponse } from "@/lib/utils/interface";
import { Suspense } from "react";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    name?: string;
    phone?: string;
    gender?: string;
    email?: string;
    isEnable?: string;
    sortBy?: string;
    direction?: string;
  }>;
}

async function UsersContent({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const size = params.size ?? "5";

  let initialUsers: User[] = [];
  let initialPagination: PaginationResponse = paginationDefault;

  try {
    const data = await getUserServer({
      page: Number(page),
      size: Number(size),
      name: params.name ?? "",
      phone: params.phone ?? "",
      gender: params.gender ?? "",
      email: params.email ?? "",
      isEnable: params.isEnable ?? "",
      sortBy: params.sortBy ?? "",
      direction: params.direction ?? "",
    });

    if (data) {
      initialUsers = data.data ?? [];
      initialPagination = data.paginationResponse ?? paginationDefault;
    }
  } catch {}

  return (
    <>
      <UserStoreHydrator users={initialUsers} pagination={initialPagination} />
      <UsersClient
        initialPagination={initialPagination}
        initialPage={Number(page)}
        initialSize={Number(size)}
      />
    </>
  );
}

export default function UsersPage(props: UsersPageProps) {
  return (
    <Suspense fallback={<UsersSkeleton />}>
      <UsersContent {...props} />
    </Suspense>
  );
}
