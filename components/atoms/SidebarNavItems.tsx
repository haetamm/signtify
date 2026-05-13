"use client";

import { cn } from "@/lib/utils/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function SidebarNavItem({
  label,
  href,
  icon,
  onClick,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 text-foreground",
        isActive
          ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/5"
          : "",
      )}
    >
      {isActive && (
        <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-lg" />
      )}

      <span
        className={cn(
          "text-xl transition-all duration-200",
          isActive && "text-primary scale-110",
          !isActive && "group-hover:scale-110 group-hover:text-white",
        )}
      >
        {icon}
      </span>

      <span
        className={cn(
          "flex-1 text-sm font-medium",
          isActive && "font-semibold",
        )}
      >
        {label}
      </span>

      {isActive && (
        <div className="w-1.5 h-1.5 rounded-lg bg-primary animate-pulse" />
      )}
    </Link>
  );
}
