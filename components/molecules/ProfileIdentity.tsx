"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

interface ProfileIdentityProps {
  name?: string;
  username?: string;
  isLoading: boolean;
}

const ProfileIdentity: React.FC<ProfileIdentityProps> = ({
  name,
  username,
  isLoading,
}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setShowSkeleton(isLoading);
  }, [isLoading]);

  // Tampilkan skeleton saat loading
  if (showSkeleton) {
    return (
      <div className="md:hidden space-y-2">
        <Skeleton className="h-8 w-34 rounded-md" />
        <Skeleton className="h-4 w-15 rounded-md" />
      </div>
    );
  }

  const displayValue = (value: string | undefined) => {
    return value === null ? "-" : value;
  };

  return (
    <div className="md:hidden">
      <div className="text-2xl font-bold tracking-tight">
        {displayValue(name)}
      </div>
      <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
        @{displayValue(username)}
      </div>
    </div>
  );
};

export default ProfileIdentity;
