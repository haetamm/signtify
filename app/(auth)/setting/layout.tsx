import { Sidebar } from "@/components/organisms/Sidebar";
import { SidebarSkeleton } from "@/components/organisms/SidebarSkeleton";
import ProfileStoreHydrator from "@/components/providers/ProfileStoreHydrator";
import { getProfileServer } from "@/lib/api/profileApi.server";
import { Profile } from "@/lib/types/profile";
import { settingNavItems } from "@/lib/utils/link";
import { Suspense } from "react";

export default async function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialProfile: Profile | null = null;

  try {
    const data = await getProfileServer();
    console.log(data);
    initialProfile = data?.data ?? null;
  } catch {}

  return (
    <>
      <ProfileStoreHydrator initialProfile={initialProfile} />
      <div className="flex h-full justify-center">
        <div className="flex w-full max-w-7xl h-full md:px-6">
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar navItems={settingNavItems} />
          </Suspense>

          <main className="flex-1 overflow-y-auto no-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
