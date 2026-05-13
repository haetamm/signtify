"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useFilteredNav } from "@/lib/hooks/useFilteredNav";
import { cn } from "@/lib/utils/helper";
import { NavItem } from "@/lib/utils/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from "../atoms/ThemeToggle";
import { Button } from "../ui/button";
import { SidebarSkeleton } from "./SidebarSkeleton";

interface SidebarProps {
  navItems: NavItem[];
  isLogout?: boolean;
}

export function Sidebar({ navItems, isLogout = true }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { visible, isLoading } = useFilteredNav(navItems);

  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="w-38 xl:w-56 h-full bg-background border-r border-border hidden lg:flex flex-col py-4 px-3 gap-1">
      <div className="px-3 py-2 mb-4 border-b border-border flex justify-between items-center">
        <div
          className={`${isLogout ? "text-foreground" : "text-transparent"} text-base font-medium`}
        >
          Setting
        </div>
        {isLogout && <ThemeToggle />}
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {visible.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center text-base gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {isLogout && (
        <Button
          variant="outline"
          onClick={logout}
          className="items-center text-base justify-start px-3 gap-3 h-9 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
        >
          <FiLogOut size={16} />
          <p>Logout</p>
        </Button>
      )}
    </aside>
  );
}
