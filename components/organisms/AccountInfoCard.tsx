import InfoField from "@/components/molecules/InfoField";
import { formatDate } from "@/lib/util/helper";
import React from "react";

interface AccountInfoCardProps {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({
  username,
  email,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className=" py-2 rounded-xl">
      <div className="px-4 py-4 md:px-6 border-b">
        <span className="font-bold tracking-[0.1em] uppercase">
          Informasi Akun
        </span>
      </div>

      <div className="grid grid-cols-2">
        <InfoField
          label="Username"
          value={<>@{username}</>}
          className="border-r"
        />
        <InfoField
          label="Email"
          value={email}
          className="[&>div:last-child]:break-all"
        />
      </div>

      <div className="grid grid-cols-2 border-t">
        <InfoField
          label="Terdaftar"
          value={formatDate(createdAt)}
          className="border-r py-3.5"
        />
        <InfoField
          label="Diperbarui"
          value={formatDate(updatedAt)}
          className="py-3.5"
        />
      </div>
    </div>
  );
};

export default AccountInfoCard;
