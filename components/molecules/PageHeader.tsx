import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface PageHeaderProps {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
  onAction?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  onBack,
  onAction,
}) => {
  return (
    <div className="flex items-center sticky z-0 top-0 z-23 bg-background justify-between px-3 sm:px-4 lg:px-8 py-3 border-b md:border-none">
      {/* Back button — mobile only */}
      <Button
        variant="default"
        size="icon"
        className="lg:hidden -ml-1"
        onClick={onBack}
        aria-label="Kembali"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Title — hidden on mobile karena back button sudah ada di kiri */}
      <span className="font-semibold text-base tracking-wide hidden lg:block">
        {title}
      </span>

      {/* Action button */}
      <Button
        variant="default"
        size="sm"
        className="gap-1.5 text-sm"
        onClick={onAction}
      >
        {children}
      </Button>
    </div>
  );
};

export default PageHeader;
