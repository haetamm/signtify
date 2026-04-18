import { cn } from "@/lib/utils/helper";
import React from "react";

interface InfoLabelProps {
  children: React.ReactNode;
  className?: string;
}

const InfoLabel: React.FC<InfoLabelProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "text-sm font-semibold tracking-[0.08em] uppercase mb-1.5 text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default InfoLabel;
