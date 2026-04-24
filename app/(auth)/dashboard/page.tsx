import DashboardClient from "@/components/organisms/DashboardClient";
import { getDashboardServer } from "@/lib/api/dashboardApi.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  try {
    const response = await getDashboardServer();
    if (response) {
      queryClient.setQueryData(["dashboard"], response.data);
    }
  } catch (err: unknown) {
    throw new Error(JSON.stringify(err));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
