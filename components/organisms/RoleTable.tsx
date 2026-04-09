import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role } from "@/lib/util/interface";
import React from "react";
import { FiShield } from "react-icons/fi";
import { Button } from "../ui/button";

interface RoleTableProps {
  roles: Role[];
  isLoading?: boolean;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-white dark:bg-card">
              <TableHead className="w-10">#</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 4 }).map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-4 bg-muted animate-pulse rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-white dark:bg-card">
              <TableHead className="w-10">#</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-40 text-center text-muted-foreground text-sm"
              >
                Tidak ada data role yang ditemukan.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-white dark:bg-card">
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead>
              <span className="flex items-center gap-1.5">
                <FiShield className="w-3.5 h-3.5" />
                Nama
              </span>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow
              key={role.id}
              className="hover:bg-muted transition-colors"
            >
              {/* Nomor */}
              <TableCell className="text-center text-xs text-muted-foreground font-medium">
                {index + 1}
              </TableCell>

              {/* Role: nama */}
              <TableCell>
                <div className="font-medium text-sm">{role.name}</div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={role.isActive ? "default" : "secondary"}
                  className={
                    role.isActive
                      ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                  }
                >
                  {role.isActive ? "Aktif" : "Nonaktif"}
                </Badge>
              </TableCell>

              {/* Action */}
              <TableCell>
                <Button
                  size="xs"
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoleTable;
