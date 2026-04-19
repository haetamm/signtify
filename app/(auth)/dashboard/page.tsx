import DashboardClient from "@/components/organisms/DashboardClient";
import { getDashboardServer } from "@/lib/api/dashboardApi.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  const response = await getDashboardServer(); // ← ini
  const data = response.data;
  queryClient.setQueryData(["dashboard"], data);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
