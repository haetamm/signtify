import SidebarMobile from "@/components/organisms/SidebarMobile";
import { SidebarMobileSkeleton } from "@/components/organisms/SidebarMobileSkeleton";
import { Suspense } from "react";
import { FiSettings } from "react-icons/fi";

export default function Setting() {
  return (
    <div className="min-h-full bg-background">
      {/* Sidebar mobile — hanya muncul di bawah lg */}
      <Suspense fallback={<SidebarMobileSkeleton />}>
        <SidebarMobile />
      </Suspense>

      {/* Placeholder konten kanan — hanya muncul di lg+ */}
      <div className="hidden lg:flex items-center justify-center lg:h-[calc(100vh-124px)] select-none px-6">
        {/* Full width horizontal layout */}
        <div className="w-full max-w-xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Left side - Large icon */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent rounded-full blur-2xl" />
              <div className="relative bg-gradient-to-br from-primary/15 to-primary/5 rounded-3xl p-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                  <FiSettings
                    size={52}
                    className="text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">
                MENU
              </div>
            </div>

            {/* Right side - Large text content */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-2xl xl:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Pengaturan
              </h2>

              <p className="xl:text-xl font-semibold text-muted-foreground">
                Pilih menu pengaturan
              </p>

              <p className="text-sm xl:text-base text-muted-foreground/70 max-w-md leading-relaxed">
                Gunakan sidebar di sebelah kiri untuk mengakses dan mengelola
                berbagai pengaturan
              </p>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="flex justify-center mt-10">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
