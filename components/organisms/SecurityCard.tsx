import IconBox from "@/components/atoms/IconBox";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaShieldAlt } from "react-icons/fa";

interface SecurityCardProps {
  onChangePassword?: () => void;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ onChangePassword }) => {
  return (
    <div className=" py-2  border-t mt-6 dark:mt-0  px-4 py-4 md:px-6 flex items-center justify-between gap-5">
      <div className="flex items-center gap-3.5">
        <IconBox>
          <FaShieldAlt className="w-4 h-4" />
        </IconBox>
        <div>
          <div className="font-semibold text-sm">Keamanan Akun</div>
        </div>
      </div>
      <Button
        className="text-xs"
        variant="destructive"
        onClick={onChangePassword}
      >
        Ubah Password
      </Button>
    </div>
  );
};

export default SecurityCard;
