import { isActivePath } from "@/lib/utils/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavButton({
  label,
  icon,
  href,
  badgeCount,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  badgeCount?: number;
}) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      className={`relative flex items-center px-2 pt-2 pb-3 text-sm font-medium transition-all duration-150 whitespace-nowrap z-10
          ${active ? "rounded-t-2xl bg-background" : "text-primary-foreground/80 hover:text-primary-foreground rounded-2xl"}
      `}
    >
      {active && (
        <>
          <span
            className="absolute -left-5 bottom-0 w-5 h-5 bg-primary pointer-events-none"
            style={{
              borderBottomRightRadius: "16px",
              boxShadow: "5px 5px 0 5px var(--background)",
            }}
          />
          <span
            className="absolute -right-5 bottom-0 w-5 h-5 bg-primary pointer-events-none"
            style={{
              borderBottomLeftRadius: "16px",
              boxShadow: "-5px 5px 0 5px var(--background)",
            }}
          />
        </>
      )}

      <span
        className={`flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm transition-all relative
            ${
              active
                ? "bg-primary-gradient text-primary-foreground"
                : "hover:bg-primary-foreground/10"
            }`}
      >
        <span className="text-sm md:text-base">{icon}</span>
        <span className="hidden sm:inline">{label}</span>

        {/* Badge notifikasi */}
        {badgeCount !== undefined && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-md">
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        )}
      </span>
    </Link>
  );
}
