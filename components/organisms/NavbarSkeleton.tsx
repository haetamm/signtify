import { navItems } from "@/lib/utils/helper";
import Link from "next/link";

export default function NavbarSkeleton() {
  return (
    <div className="flex items-end justify-between w-full">
      <div className="flex items-end">
        {navItems.left.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative flex items-center px-2 pt-2 pb-3 text-sm font-medium whitespace-nowrap text-primary-foreground/80 rounded-2xl"
          >
            <span className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm">
              <span className="text-sm md:text-base">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="flex items-end">
        {navItems.right.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative flex items-center px-2 pt-2 pb-3 text-sm font-medium whitespace-nowrap text-primary-foreground/80 rounded-2xl"
          >
            <span className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm">
              <span className="text-sm md:text-base">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
