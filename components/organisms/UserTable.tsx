import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/util/interface";
import React from "react";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, isLoading }) => {
  if (isLoading) {
    return (
      <div className="hidden lg:block rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-white dark:bg-card">
              <TableHead className="w-10">#</TableHead>
              <TableHead>Pengguna</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead className="hidden md:table-cell">Alamat</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
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

  if (users.length === 0) {
    return (
      <div className="hidden lg:block rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-white dark:bg-card">
              <TableHead className="w-10">#</TableHead>
              <TableHead>Pengguna</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead className="hidden md:table-cell">Alamat</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-40 text-center text-muted-foreground text-sm"
              >
                Tidak ada data pengguna yang ditemukan.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="hidden lg:block rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-white dark:bg-card">
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead>
              <span className="flex items-center gap-1.5">
                <FiUser className="w-3.5 h-3.5" />
                Pengguna
              </span>
            </TableHead>
            <TableHead>
              <span className="flex items-center gap-1.5">
                <FiMail className="w-3.5 h-3.5" />
                Kontak
              </span>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <span className="flex items-center gap-1.5">
                <FiMapPin className="w-3.5 h-3.5" />
                Alamat
              </span>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className="hover:bg-muted transition-colors"
            >
              {/* Nomor */}
              <TableCell className="text-center text-xs text-muted-foreground font-medium">
                {index + 1}
              </TableCell>

              {/* Pengguna: nama + gender */}
              <TableCell>
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {user.gender}
                </div>
              </TableCell>

              {/* Kontak: email + phone */}
              <TableCell>
                <div className="flex items-center gap-1.5 text-sm">
                  <FiMail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="truncate max-w-[180px]">{user.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <FiPhone className="w-3 h-3 flex-shrink-0" />
                  {user.phone}
                </div>
              </TableCell>

              {/* Alamat */}
              <TableCell className="hidden md:table-cell">
                <span className="text-xs text-muted-foreground line-clamp-2 max-w-[220px]">
                  {user.address}
                </span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={user.isEnable ? "default" : "secondary"}
                  className={
                    user.isEnable
                      ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                  }
                >
                  {user.isEnable ? "Aktif" : "Nonaktif"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
