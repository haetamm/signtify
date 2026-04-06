import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

interface SectionCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  countLabel: string;
  countColor: string;
  children: React.ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
  headerGradient?: string;
  contentClassName?: string;
}

export default function SectionCard({
  icon,
  iconBg,
  iconColor,
  title,
  countLabel,
  countColor,
  children,
  emptyMessage = "Tidak ada data",
  isEmpty = false,
  headerGradient = "from-gray-50 to-white",
  contentClassName = "",
}: SectionCardProps) {
  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
      <CardHeader
        className={`px-4 py-5 sm:p-5 border-b bg-gradient-to-r ${headerGradient} shrink-0 dark:text-primary`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 ${iconBg} rounded-lg`}>
              <span className={`${iconColor} text-lg`}>{icon}</span>
            </div>
            <h2 className="font-semibold text-sm lg:text-base">{title}</h2>
          </div>
          <Badge
            variant="secondary"
            className={`text-xs font-medium ${countColor} shrink-0`}
          >
            {countLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-hidden">
        {isEmpty ? (
          <div className="p-8 text-center">{emptyMessage}</div>
        ) : (
          <div className={`divide-y divide-gray-50 ${contentClassName}`}>
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
