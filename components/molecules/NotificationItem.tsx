import NotificationIcon from "@/components/atoms/NotificationIcon";
import { Notification } from "@/lib/types/notification";
import { formatDate } from "@/lib/utils/helper";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const { id, title, message, isRead, createdAt } = notification;

  return (
    <div onClick={() => !isRead && onMarkAsRead(id)}>
      <div
        className={`flex rounded-md overflow-hidden ${
          !isRead ? "shadow-lg shadow-gray-300/50 cursor-pointer" : "shadow-sm"
        }`}
      >
        {/* vertical label */}
        <div
          className={`w-12 flex flex-col items-center justify-center py-3 text-primary-foreground ${
            !isRead ? "bg-primary" : "bg-primary-gradient"
          }`}
        >
          <span className="text-[10px] font-mono tracking-widest -rotate-90 whitespace-nowrap">
            {!isRead ? "UNREAD" : "READ"}
          </span>
        </div>

        {/* content */}
        <div className="flex-1 bg-card p-4 lg:min-h-32">
          <div className="flex gap-4 h-full items-center lg:items-start">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <NotificationIcon title={title} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3
                  className={`text-sm lg:text-base font-semibold tracking-wide ${
                    !isRead ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {title}
                </h3>
                {!isRead && (
                  <span className="text-[9px] font-mono text-stone-400 tracking-wider">
                    ● NEW
                  </span>
                )}
              </div>
              <p
                className={`text-xs lg:text-sm mt-1.5 leading-relaxed ${
                  !isRead ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {message}
              </p>
              <div className="flex justify-end mt-3">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {formatDate(createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
