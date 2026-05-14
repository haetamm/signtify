import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types/user";
import { getInitials } from "@/lib/utils/helper";
import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import ContactItem from "../atoms/ContactItem";
import OrDivider from "../atoms/OrDivider";
import UserCardSkeleton from "../atoms/UserCardSkeleton";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface UserCardListProps {
  users: User[];
  isLoading?: boolean;
}

const UserCardList: React.FC<UserCardListProps> = ({ users, isLoading }) => {
  if (isLoading) {
    return <UserCardSkeleton />;
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
