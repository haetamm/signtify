import { Button } from "@/components/ui/button";
import { ChevronLeft, Pencil } from "lucide-react";
import React from "react";

interface ProfilePageHeaderProps {
  onBack?: () => void;
  onEdit?: () => void;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({
  onBack,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 py-3 border-b md:border-none bg-card dark:rounded-xl">
      {/* Back button — mobile only */}
      <Button
        variant="default"
        size="icon"
        className="md:hidden -ml-1"
        onClick={onBack}
        aria-label="Kembali"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Title — hidden on mobile karena back button sudah ada di kiri */}
      <span className="font-semibold text-base tracking-wide hidden md:block">
        Profil Saya
      </span>

      {/* Edit Profile button */}
      <Button
        variant="default"
        size="sm"
        className="gap-1.5 text-sm"
        onClick={onEdit}
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit Profil
      </Button>
    </div>
  );
};

export default ProfilePageHeader;
