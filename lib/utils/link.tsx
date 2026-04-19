import { IoIosFolderOpen } from "react-icons/io";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { urlPage } from "./constans";
import { NavItem } from "./interface";

export const settingNavItems: NavItem[] = [
  { label: "Profile", href: "/setting/profile", icon: "user" },
  { label: "Users", href: "/setting/user", icon: "users" },
  { label: "Roles", href: "/setting/role", icon: "role" },
];

export const documentNavItems: NavItem[] = [
  { label: "Public", href: "/document", icon: "public" },
  { label: "Devision", href: "/document/devision", icon: "department" },
  { label: "Trash", href: "/document/trash", icon: "trash" },
];

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
