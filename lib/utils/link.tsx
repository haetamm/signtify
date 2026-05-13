import { FaUsersGear, FaUsersLine } from "react-icons/fa6";
import { FiShield, FiUser, FiUsers } from "react-icons/fi";
import { IoIosFolderOpen } from "react-icons/io";
import { IoNotifications, IoSettings, IoTrash } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { urlPage } from "./constans";
import { NavItem } from "./interface";

export const settingNavItems: NavItem[] = [
  {
    label: "Profile",
    href: "/setting/profile",
    icon: <FiUser />,
    requiredPermission: { url: "/api/profile", action: "READ" },
  },
  {
    label: "Users",
    href: "/setting/user",
    icon: <FiUsers />,
    requiredPermission: { url: "/api/user", action: "READ" },
  },
  {
    label: "Roles",
    href: "/setting/role",
    icon: <FiShield />,
    requiredPermission: { url: "/api/role", action: "READ" },
  },
];

export const documentNavItems: NavItem[] = [
  {
    label: "Public",
    href: "/document",
    icon: <FaUsersLine />,
    requiredPermission: { url: "/api/folder", action: "READ" },
  },
  {
    label: "Devision",
    href: "/document/devision",
    icon: <FaUsersGear />,
    requiredPermission: { url: "/api/folder", action: "READ" },
  },
  {
    label: "Trash",
    href: "/document/trash",
    icon: <IoTrash />,
    requiredPermission: { url: "/api/folder", action: "DELETE" },
  },
];

export const navItems: { left: NavItem[]; right: NavItem[] } = {
  left: [
    {
      label: "Dashboard",
      icon: <RiDashboardFill />,
      href: urlPage.DASHBOARD,
      requiredPermission: { url: "/api/dashboard", action: "READ" },
    },
    {
      label: "Document",
      icon: <IoIosFolderOpen />,
      href: urlPage.DOCUMENT,
      requiredPermission: { url: "/api/document", action: "READ" },
    },
  ],
  right: [
    {
      label: "Notifications",
      icon: <IoNotifications />,
      href: urlPage.NOTIFICATION,
      requiredPermission: { url: "/api/notification", action: "READ" },
    },
    {
      label: "Settings",
      icon: <IoSettings />,
      href: urlPage.SETTING,
      requiredPermission: { url: "/api/profile", action: "READ" },
    },
  ],
};
