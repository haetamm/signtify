"use client";

import IconBox from "@/components/atoms/IconBox";
import InfoField from "@/components/molecules/InfoField";
import ProfileIdentity from "@/components/molecules/ProfileIdentity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { calculateAge, formatDate, getInitials } from "@/lib/utils/helper";
import { FaMapMarkerAlt } from "react-icons/fa";

const PersonalInfoCard = () => {
  const profile = useProfileStore((s) => s.profile);
  const isLoading = useProfileStore((s) => s.isLoading);

  const {
    name,
    username,
    profile_id: avatar,
    gender,
    religion,
    birthPlace,
    birthDate,
    address,
  } = profile || {};

  const age = calculateAge(birthDate);

  return (
    <>
      <div className=" md:flex md:gap-4 pt-3">
        {/* Avatar + Identity (mobile) */}
        <div className="flex md:flex-col items-center gap-x-4 pb-6 px-3 border-b md:border-b-0">
          <Avatar className="w-30 h-30 md:w-50 md:h-50 border-4 border-background shadow-sm">
            <AvatarImage src={avatar || undefined} alt={name ?? ""} />
            <AvatarFallback className="text-5xl font-semibold bg-primary-gradient">
              {getInitials(name ?? "")}
            </AvatarFallback>
          </Avatar>
          <ProfileIdentity
            name={name}
            username={username}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-2 w-full">
          <InfoField
            label="Nama Lengkap"
            value={name}
            isLoading={isLoading}
            className="border-b border-r md:border-t"
          />
          <InfoField
            label="Jenis Kelamin"
            value={gender}
            isLoading={isLoading}
            className="border-b border-r md:border-t md:border-r-0"
          />
          <InfoField
            label="Agama"
            value={religion}
            isLoading={isLoading}
            className="md:border-r md:border-b"
          />
          <InfoField
            label="Tempat Lahir"
            value={birthPlace}
            isLoading={isLoading}
            className="border-r md:border-r-0"
          />
          <InfoField
            label="Tanggal Lahir"
            value={
              <>
                {formatDate(birthDate)}
                <span className="ml-1">{age}</span>
              </>
            }
            isLoading={isLoading}
            className="col-span-2"
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex  items-start gap-3 px-4 py-4 md:px-6 border-t">
        <IconBox size="sm" className="mt-0.5">
          <FaMapMarkerAlt className="w-4 h-4" />
        </IconBox>
        <InfoField
          label="Alamat"
          value={address}
          isLoading={isLoading}
          className="border-none pt-0 px-0"
        />
      </div>
    </>
  );
};

export default PersonalInfoCard;
