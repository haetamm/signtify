import { clsx, type ClassValue } from "clsx";
import { FiShield, FiUser, FiUsers } from "react-icons/fi";
import { IoIosFolderOpen } from "react-icons/io";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { ActivityStyleInfo, StatusBadgeInfo } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urlPage = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  DOCUMENT: "/document",
  SETTING: "/setting",
  NOTIFICATION: "/notification",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};

export const sidebarItems = [
  { label: "Profile", href: "/setting/profile", icon: FiUser },
  { label: "Users", href: "/setting/user", icon: FiUsers },
  { label: "Roles", href: "/setting/role", icon: FiShield },
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

export const isActivePath = (pathname: string, href: string) =>
  pathname.startsWith(href);

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export const getStatusBadgeInfo = (status: string): StatusBadgeInfo => {
  const statusMap: Record<string, StatusBadgeInfo> = {
    IN_PROGRESS: {
      label: "Proses",
      color: "bg-blue-100 text-blue-700",
      iconName: "FiClock",
    },
    WAITING_SIGNATURE: {
      label: "Menunggu TTD",
      color: "bg-amber-100 text-amber-700",
      iconName: "MdOutlinePendingActions",
    },
    DRAFT: {
      label: "Draft",
      color: "bg-gray-100 text-gray-600",
      iconName: "FiFileText",
    },
    COMPLETED: {
      label: "Selesai",
      color: "bg-green-100 text-green-700",
      iconName: "FiCheckCircle",
    },
    REJECTED: {
      label: "Ditolak",
      color: "bg-red-100 text-red-700",
      iconName: "FiXCircle",
    },
  };
  return statusMap[status] || statusMap.IN_PROGRESS;
};

export const getActivityStyleInfo = (
  activityType: string,
): ActivityStyleInfo => {
  const styleMap: Record<string, ActivityStyleInfo> = {
    CONTRIBUTOR_SIGNED: {
      iconName: "FiCheckCircle",
      bgColor: "bg-green-50",
    },
    CONTRIBUTOR_REJECTED: {
      iconName: "FiXCircle",
      bgColor: "bg-red-50",
    },
    STATUS_CHANGED: {
      iconName: "FiTrendingUp",
      bgColor: "bg-blue-50",
    },
  };
  return (
    styleMap[activityType] || {
      iconName: "FiFileText",
      bgColor: "bg-gray-50",
    }
  );
};

export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const handleBack = () => {
  window.history.back();
};
