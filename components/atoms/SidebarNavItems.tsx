"use client";

import { cn } from "@/lib/util/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconMap } from "../organisms/Sidebar";

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: keyof typeof iconMap;
  onClick?: () => void;
}

export function SidebarNavItem({
  label,
  href,
  icon,
  onClick,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/5"
          : "text-white/70 hover:bg-white/5 hover:text-white",
      )}
    >
      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
      )}

      <Icon
        size={20}
        className={cn(
          "transition-all duration-200",
          isActive && "text-primary scale-110",
          !isActive && "group-hover:scale-110 group-hover:text-white",
        )}
      />

      <span
        className={cn(
          "flex-1 text-sm font-medium",
          isActive && "font-semibold",
        )}
      >
        {label}
      </span>

      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      )}
    </Link>
  );
}
