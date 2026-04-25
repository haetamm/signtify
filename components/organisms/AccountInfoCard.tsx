"use client";

import InfoField from "@/components/molecules/InfoField";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { formatDate } from "@/lib/utils/helper";

const AccountInfoCard = () => {
  const profile = useProfileStore((s) => s.profile);
  const isLoading = useProfileStore((s) => s.isLoading);

  const { username, email, createdAt, updatedAt, phone } = profile || {};

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
          isLoading={isLoading}
          className="border-r border-b"
        />
        <InfoField
          label="No. Hp"
          value={phone}
          isLoading={isLoading}
          className="[&>div:last-child]:break-all"
        />
      </div>

      <div className="grid grid-cols-2">
        <InfoField
          label="Email"
          value={<>{email}</>}
          isLoading={isLoading}
          className=""
        />
      </div>

      <div className="grid grid-cols-2 border-t">
        <InfoField
          label="Terdaftar"
          value={formatDate(createdAt)}
          isLoading={isLoading}
          className="border-r py-3.5"
        />
        <InfoField
          label="Diperbarui"
          value={formatDate(updatedAt)}
          isLoading={isLoading}
          className="py-3.5"
        />
      </div>
    </div>
  );
};

export default AccountInfoCard;
