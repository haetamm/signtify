import RolesClient from "@/components/organisms/RolesClient";
import RolesSkeleton from "@/components/organisms/RolesSkeleton";
import RoleStoreHydrator from "@/components/providers/RoleStoreHydrator";
import { getRoleServer } from "@/lib/api/roleApi.server";
import { Role } from "@/lib/types/role";
import { paginationDefault } from "@/lib/utils/helper";
import { PaginationResponse } from "@/lib/utils/interface";
import { Suspense } from "react";

interface RolesPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    name?: string;
    isActive?: string;
    sortBy?: string;
    direction?: string;
  }>;
}

async function RolesContent({ searchParams }: RolesPageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const size = params.size ?? "5";

  let initialRoles: Role[] = [];
  let initialPagination: PaginationResponse = paginationDefault;

  try {
    const data = await getRoleServer({
      page: Number(page),
      size: Number(size),
      name: params.name ?? "",
      isActive: params.isActive ?? "",
      sortBy: params.sortBy ?? "",
      direction: params.direction ?? "",
    });

    if (data) {
      initialRoles = data.data ?? [];
      initialPagination = data.paginationResponse ?? paginationDefault;
    }
  } catch {}

  return (
    <>
      <RoleStoreHydrator roles={initialRoles} pagination={initialPagination} />
      <RolesClient
        initialPagination={initialPagination}
        initialPage={Number(page)}
        initialSize={Number(size)}
      />
    </>
  );
}

export default function UsersPage(props: RolesPageProps) {
  return (
    <Suspense fallback={<RolesSkeleton />}>
      <RolesContent {...props} />
    </Suspense>
  );
}
