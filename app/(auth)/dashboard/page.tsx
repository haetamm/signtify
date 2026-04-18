import ActiveDocumentsPanel from "@/components/organisms/ActiveDocumentsPanel";
import DashboardRightColumn from "@/components/organisms/DashboardRightColumn";
import RecentActivityPanel from "@/components/organisms/RecentActivityPanel";
import SummaryGrid from "@/components/organisms/SummaryGrid";
import UrgentDocumentsPanel from "@/components/organisms/UrgentDocumentsPanel";
import { dashboardData } from "@/lib/utils/resource";
import React from "react";

const Dashboard: React.FC = () => {
  const { summary, urgent, myActiveDocuments, recentActivity } = dashboardData;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 ">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-2">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">Dashboard Dokumen</h1>
          <p className="text-muted-foreground mt-1">
            Kelola dan pantau semua dokumen Anda
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryGrid summary={summary} />

        {/* Layout 2: Two Column dengan Priority */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col order-2 lg:order-1">
            <UrgentDocumentsPanel docs={urgent} />
          </div>
          <div className="order-1 lg:order-2">
            <DashboardRightColumn summary={summary} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Documents */}
          <ActiveDocumentsPanel docs={myActiveDocuments} />

          {/* Recent Activity */}
          <RecentActivityPanel activities={recentActivity} />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          Terakhir diperbarui secara real-time • Semua dokumen tersimpan dengan
          aman
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
