"use client";

import { cn, sidebarItems } from "@/lib/util/helper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiLogOut, FiUser } from "react-icons/fi";
import { Button } from "../ui/button";

export default function SidebarMobile() {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div className="flex lg:hidden w-full flex-col h-[calc(100vh-85px)] bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>
        </div>
      </div>

      {/* Konten */}
      <div className="flex-1 px-4 py-3 space-y-6">
        <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/images/avatar.png" alt="User" />
            <AvatarFallback>
              {" "}
              <FiUser size={24} className="text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              User Name
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              user@example.com
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm">
          {sidebarItems.map(({ label, href, icon: Icon }, index) => {
            const isActive = pathname === href || pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 transition-colors",
                  "hover:bg-gray-50 dark:hover:bg-gray-800/50 active:bg-gray-100 dark:active:bg-gray-800",
                  index !== sidebarItems.length - 1 &&
                    "border-b border-gray-100 dark:border-gray-800",
                  isActive && "bg-primary/5",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className={cn(
                      isActive
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[15px]",
                      isActive
                        ? "text-primary font-medium"
                        : "text-gray-700 dark:text-gray-300",
                    )}
                  >
                    {label}
                  </span>
                </div>
                <FiChevronRight size={18} className="text-gray-400" />
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="h-11 items-center justify-center w-full "
          >
            <FiLogOut size={18} />
            <span className="text-[15px] font-medium">Log Out</span>
          </Button>
        </div>

        {/* App Version (opsional) */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
