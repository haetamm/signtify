import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserTableSkeleton() {
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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 6 }).map((_, j) => (
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
