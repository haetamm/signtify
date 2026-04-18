import { Sidebar } from "@/components/organisms/Sidebar";
import { SidebarSkeleton } from "@/components/organisms/SidebarSkeleton";
import { settingNavItems } from "@/lib/utils/helper";
import { Suspense } from "react";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full justify-center">
      <div className="flex w-full max-w-7xl h-full md:px-6">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar navItems={settingNavItems} />
        </Suspense>

        <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
      </div>
    </div>
  );
}
