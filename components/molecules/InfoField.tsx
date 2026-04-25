"use client";

import InfoLabel from "@/components/atoms/InfoLabel";
import { cn } from "@/lib/utils/helper";
import React, { useEffect, useState } from "react";
import InfoValue from "../atoms/InfoValue";
import { Skeleton } from "../ui/skeleton";

interface InfoFieldProps {
  label: string;
  value?: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

const SkeletonValue = () => (
  <Skeleton className="mt-1 h-5 w-14 sm:w-20 rounded-md" />
);

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  isLoading,
  className,
}) => {
  const displayValue = value == null ? "-" : value;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <div className={cn("px-4 py-4 md:px-6", className)}>
      <InfoLabel>{label}</InfoLabel>
      {loading ? <SkeletonValue /> : <InfoValue>{displayValue}</InfoValue>}
    </div>
  );
};

export default InfoField;
