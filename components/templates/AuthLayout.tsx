import { Suspense } from "react";
import { Navbar } from "../organisms/Navbar";
import NavbarSkeleton from "../organisms/NavbarSkeleton";
import { SidebarDoc } from "../organisms/SidebarDoc";
import { SidebarDocSkeleton } from "../organisms/SidebarDocSkeleton";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background p-2 md:p-3 dark">
      <div className="w-full max-w-[1920px] mx-auto h-[calc(100vh-24px)] rounded-[20px] md:rounded-[28px] border-[6px] md:border-[8px] border-primary overflow-hidden bg-background flex flex-col">
        <div className="bg-primary sticky top-0 z-10 shrink-0">
          <div className="flex items-end justify-between w-full">
            <Suspense fallback={<NavbarSkeleton />}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<SidebarDocSkeleton />}>
              <SidebarDoc />
            </Suspense>
          </div>
        </div>

        <div className="bg-primary flex-1 overflow-hidden">
          <div className="bg-background text-foreground rounded-t-lg h-full overflow-y-auto no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
