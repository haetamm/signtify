import InfoLabel from "@/components/atoms/InfoLabel";
import InfoValue from "@/components/atoms/InfoValue";
import { cn } from "@/lib/util/helper";
import React from "react";

interface InfoFieldProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, className }) => {
  return (
    <div className={cn("px-4 py-4 md:px-6", className)}>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </div>
  );
};

export default InfoField;
