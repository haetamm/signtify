import { Suspense } from "react";
import { NavbarClient } from "../organisms/NavbarClient";
import NavbarFallback from "../organisms/NavbarFallback";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background p-2 md:p-3">
      <div className="w-full h-[calc(100vh-24px)] rounded-[20px] md:rounded-[28px] border-[6px] md:border-[8px] border-primary overflow-hidden bg-background flex flex-col">
        <div className="bg-primary sticky top-0 z-10 shrink-0">
          <div className="flex items-end justify-between w-full">
            <Suspense fallback={<NavbarFallback />}>
              <NavbarClient />
            </Suspense>
          </div>
        </div>

        <div className="bg-primary flex-1 overflow-hidden">
          <div className="p-4 md:p-6 bg-background text-foreground rounded-t-lg h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
