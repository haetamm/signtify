import { cn } from "@/lib/utils/helper";
import React from "react";

interface InfoValueProps {
  children: React.ReactNode;
  className?: string;
}

const InfoValue: React.FC<InfoValueProps> = ({ children, className }) => {
  return <div className={cn("text-xs font-medium", className)}>{children}</div>;
};

export default InfoValue;
