"use client";

import { useSidebarOpen, useUIStore } from "@/lib/store/useUIStore";
import { cn, documentNavItems } from "@/lib/util/helper";
import { useEffect } from "react";
import { SidebarNavItem } from "../atoms/SidebarNavItems";

export function SidebarDoc() {
  const isOpen = useSidebarOpen();
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  // Tutup sidebar saat route berubah (mobile)
  useEffect(() => {
    closeSidebar();
  }, [closeSidebar]); // tambah dependency

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeSidebar}
        className={cn(
          "fixed inset-0 top-22 left-6 right-6 h-[calc(100vh-108px)] rounded-xl",
          "bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-sm",
          "transition-all duration-300 lg:hidden z-[100]",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-22 left-6 h-[calc(100vh-108px)] rounded-xl w-45",
          "lg:hidden z-[200]",
          "bg-gradient-to-b from-background to-background/95 backdrop-blur-xl",
          "border-r border-white/10 shadow-2xl shadow-black/20",
          "transition-all duration-300 ease-out",
          isOpen ? "block" : "hidden",
        )}
      >
        <div className="relative px-5 pt-8 pb-6" />{" "}
        {/* kosong jika tidak ada header */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {documentNavItems.map(({ label, href, icon }) => (
            <SidebarNavItem
              key={href}
              label={label}
              href={href}
              icon={icon}
              onClick={closeSidebar}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
