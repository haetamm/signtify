import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils/helper";
import { User } from "@/lib/utils/interface";
import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import ContactItem from "../atoms/ContactItem";
import OrDivider from "../atoms/OrDivider";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface UserCardListProps {
  users: User[];
  isLoading?: boolean;
}

const UserCardList: React.FC<UserCardListProps> = ({ users, isLoading }) => {
  if (isLoading) {
    return (
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border dark:border-none bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="flex-1">
                <Skeleton className="h-4 rounded w-3/4 mb-2" />
                <Skeleton className="h-3 rounded w-1/2" />
              </div>
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <Skeleton className="h-px my-3" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="h-3 rounded flex-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="lg:hidden flex items-center justify-center text-center h-48 rounded-xl border dark:border-none bg-card text-sm text-foreground">
        Tidak ada data pengguna yang ditemukan.
      </div>
    );
  }

  return (
    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {users.map((user, index) => (
        <div
          key={user.id}
          className="group rounded-xl border border-gray-200 dark:border-none bg-card p-4 hover:border-gray-300 hover:shadow-md transition-all"
        >
          {/* Header: Avatar, Name, Gender, Badge - SEMUA SEJAJAR */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-xl flex-shrink-0">
              <AvatarFallback
                className={`text-sm font-semibold rounded-xl ${
                  user.isEnable
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-foreground truncate">
                {user.gender || "Tidak disebutkan"}
              </p>
            </div>

            <Badge
              className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                user.isEnable
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : "bg-red-100 text-red-700 border-red-200"
              }`}
            >
              {user.isEnable ? "Aktif" : "Nonaktif"}
            </Badge>
          </div>

          {/* Divider with index number */}
          <OrDivider title={`#${String(index + 1).padStart(2, "0")}`} />

          {/* Contact Information */}
          <div className="space-y-2.5">
            <ContactItem icon={FiMail} text={user.email} />
            <ContactItem icon={FiPhone} text={user.phone || "-"} />
            <ContactItem
              icon={FiMapPin}
              text={user.address || "Alamat tidak tersedia"}
              isMultiline
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardList;
