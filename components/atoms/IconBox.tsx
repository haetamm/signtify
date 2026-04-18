import { cn } from "@/lib/utils/helper";
import React from "react";

interface IconBoxProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

const IconBox: React.FC<IconBoxProps> = ({
  children,
  className,
  size = "md",
}) => {
  return (
    <div
      className={cn(
        "bg-background rounded-lg flex items-center justify-center flex-shrink-0",
        size === "md" ? "w-10 h-10" : "w-8 h-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default IconBox;
