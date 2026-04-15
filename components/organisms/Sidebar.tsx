"use client";

import { cn } from "@/lib/util/helper";
import { NavItem } from "@/lib/util/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsersGear, FaUsersLine } from "react-icons/fa6";
import { FiLogOut, FiShield, FiUser, FiUsers } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { Button } from "../ui/button";

export const iconMap = {
  user: FiUser,
  users: FiUsers,
  role: FiShield,
  trash: IoMdTrash,
  public: FaUsersLine,
  department: FaUsersGear,
} as const;

export type IconKey = keyof typeof iconMap;

interface SidebarProps {
  navItems: NavItem[];
  isLogout?: boolean;
}

export function Sidebar({ navItems, isLogout = true }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("logout");
  };

  // Desktop sidebar
  return (
    <aside className="w-38 xl:w-56 h-full bg-background border-r border-border hidden lg:flex flex-col py-4 px-3 gap-1">
      <div className="px-3 py-2 mb-4 border-b border-border">
        <span
          className={`${isLogout ? "text-foreground" : "text-transparent"} text-base font-medium`}
        >
          Setting
        </span>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          const Icon = iconMap[icon];

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
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {isLogout && (
        <Button
          variant="outline"
          onClick={handleLogout}
          className="items-center text-base justify-start px-3 gap-3 h-9 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
        >
          <FiLogOut size={16} />
          <p>Logout</p>
        </Button>
      )}
    </aside>
  );
}
