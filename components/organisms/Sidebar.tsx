"use client";

import { cn, sidebarItems } from "@/lib/util/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { Button } from "../ui/button";

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("logout");
  };

  // Desktop sidebar
  return (
    <aside className="w-56 min-w-56 h-full bg-background border-r border-border hidden lg:flex flex-col py-4 px-3 gap-1">
      <div className="px-3 py-2 mb-2 border-b border-border">
        <span className="text-sm font-medium text-foreground">Setting</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {sidebarItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
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

      <Button
        variant="destructive"
        onClick={handleLogout}
        className="items-center justify-start px-3 gap-3"
      >
        <FiLogOut size={16} />
        <p>Logout</p>
      </Button>
    </aside>
  );
}
