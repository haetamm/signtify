import { Notification } from "@/lib/utils/interface";
import { IoDocumentText } from "react-icons/io5";
import NotificationItem from "../molecules/NotificationItem";

type FilterOption = "all" | "unread" | "read";

interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  filter: FilterOption;
  onMarkAsRead: (id: string) => void;
}

const emptyMessages: Record<FilterOption, string> = {
  all: "Belum ada notifikasi masuk",
  unread: "Semua notifikasi sudah dibaca",
  read: "Belum ada notifikasi yang dibaca",
};

export default function NotificationList({
  notifications,
  loading,
  filter,
  onMarkAsRead,
}: NotificationListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-xl shadow-sm mx-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <IoDocumentText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium">Tidak ada notifikasi</h3>
        <p className="text-gray-500 mt-1">{emptyMessages[filter]}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3  px-4 md:px-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
}
