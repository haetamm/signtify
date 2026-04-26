import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";
import {
  CONTRIBUTOR_STATUS_COLOR,
  FALLBACK_COLOR,
  PERMISSION_COLOR,
} from "./constans";
import {
  ActivityStyleInfo,
  Contributor,
  SetErrorFn,
  StatusBadgeInfo,
} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isActivePath = (pathname: string, href: string) =>
  pathname.startsWith(href);

export const formatDate = (dateString?: string | null): string => {
  if (!dateString || dateString === "-") return "-";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

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

export const calculateAge = (birthDate?: string | null): string => {
  if (!birthDate || birthDate === "-") return "";

  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return "";

  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return `(${age} tahun)`;
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

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const formatShortDate = (iso: string) => {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export function resolveAvatarColor(contributor: Contributor): string {
  if (contributor.status) {
    return CONTRIBUTOR_STATUS_COLOR[contributor.status] ?? FALLBACK_COLOR;
  }
  if (contributor.permissionType) {
    return PERMISSION_COLOR[contributor.permissionType] ?? FALLBACK_COLOR;
  }
  return FALLBACK_COLOR;
}

export function handleFormError<T extends Record<string, unknown>>(
  error: unknown,
  setError: SetErrorFn<T>,
  setServerError: (msg: string) => void,
) {
  if (typeof error === "object" && error !== null) {
    const entries = Object.entries(error);
    const ignoredFields = ["code", "general"];
    const hasFieldError = entries.some(
      ([field]) => !ignoredFields.includes(field),
    );

    entries.forEach(([field, message]) => {
      if (ignoredFields.includes(field)) {
        if (field === "general" && !hasFieldError) {
          setServerError(message as string);
        }
      } else {
        setError(field as keyof T, {
          type: "server",
          message: message as string,
        });
      }
    });
  } else {
    setServerError("Permintaan gagal, coba lagi");
  }
}
