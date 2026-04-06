import { urlPage } from "@/lib/utils";
import Link from "next/link";
import { IoIosFolderOpen } from "react-icons/io";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";

export const navItems = {
  left: [
    { label: "Dashboard", icon: <RiDashboardFill />, href: urlPage.DASHBOARD },
    { label: "Document", icon: <IoIosFolderOpen />, href: urlPage.DOCUMENT },
  ],
  right: [
    {
      label: "Notifications",
      icon: <IoNotifications />,
      href: urlPage.NOTIFICATION,
    },
    { label: "Settings", icon: <IoSettings />, href: urlPage.SETTING },
  ],
};

export default function NavbarFallback() {
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
