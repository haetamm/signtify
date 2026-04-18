import { Sidebar } from "@/components/organisms/Sidebar";
import { SidebarDoc } from "@/components/organisms/SidebarDoc";
import { SidebarDocSkeleton } from "@/components/organisms/SidebarDocSkeleton";
import { SidebarSkeleton } from "@/components/organisms/SidebarSkeleton";
import { documentNavItems } from "@/lib/utils/helper";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full justify-center">
      <div className="flex w-full max-w-7xl h-full md:px-6">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar navItems={documentNavItems} isLogout={false} />
        </Suspense>
        <Suspense fallback={<SidebarDocSkeleton />}>
          <SidebarDoc />
        </Suspense>

        <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
      </div>
    </div>
  );
}
