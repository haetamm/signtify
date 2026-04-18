import IconBox from "@/components/atoms/IconBox";
import InfoLabel from "@/components/atoms/InfoLabel";
import InfoValue from "@/components/atoms/InfoValue";
import InfoField from "@/components/molecules/InfoField";
import ProfileIdentity from "@/components/molecules/ProfileIdentity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateAge, formatDate, getInitials } from "@/lib/utils/helper";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface PersonalInfoCardProps {
  name: string;
  username: string;
  avatar?: string | null;
  gender: string;
  religion: string;
  birthPlace: string;
  birthDate: string;
  address: string;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  name,
  username,
  avatar,
  gender,
  religion,
  birthPlace,
  birthDate,
  address,
}) => {
  const age = calculateAge(birthDate);

  return (
    <>
      {/* Personal Info Card */}
      <div className=" md:flex md:gap-4 pt-3">
        {/* Avatar + Identity (mobile) */}
        <div className="flex md:flex-col items-center gap-x-4 pb-6 px-3 border-b md:border-b-0">
          <Avatar className="w-30 h-30 md:w-50 md:h-50 border-4 border-background shadow-sm">
            <AvatarImage src={avatar || undefined} alt={name} />
            <AvatarFallback className="text-5xl font-semibold bg-primary-gradient">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <ProfileIdentity name={name} username={username} />
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-3 md:grid-cols-2 w-full">
          <InfoField
            label="Nama Lengkap"
            value={name}
            className="border-b border-r md:border-t"
          />
          <InfoField
            label="Jenis Kelamin"
            value={gender}
            className="border-b border-r md:border-t md:border-r-0"
          />
          <InfoField
            label="Agama"
            value={religion}
            className="md:border-r md:border-b"
          />
          <InfoField
            label="Tempat Lahir"
            value={birthPlace}
            className="border-r md:border-r-0"
          />
          <InfoField
            label="Tanggal Lahir"
            value={
              <>
                {formatDate(birthDate)}
                <span className="ml-1">({age} tahun)</span>
              </>
            }
            className="col-span-2"
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex  items-start gap-3 px-4 py-4 md:px-6 border-t">
        <IconBox size="sm" className="mt-0.5">
          <FaMapMarkerAlt className="w-4 h-4" />
        </IconBox>
        <div>
          <InfoLabel>Alamat</InfoLabel>
          <InfoValue>{address}</InfoValue>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoCard;
