import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  iconColor,
}: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="pt-5 pb-0 px-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-xl ${color}`}>
            <span className={`text-xl ${iconColor}`}>{icon}</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
      </CardContent>
      <div
        className={`h-1 w-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity`}
      />
    </Card>
  );
}
