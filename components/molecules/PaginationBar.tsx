"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationResponse } from "@/lib/utils/interface";

interface PaginationBarProps {
  pagination: PaginationResponse;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOption: number[];
}

export default function PaginationBar({
  pagination,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOption,
}: PaginationBarProps) {
  const { totalPages, totalElements, hasPrevious, hasNext } = pagination;

  const getPageNumbers = () => {
    const count = Math.min(5, totalPages);
    let start: number;
    if (totalPages <= 5) start = 1;
    else if (currentPage <= 3) start = 1;
    else if (currentPage >= totalPages - 2) start = totalPages - 4;
    else start = currentPage - 2;
    return Array.from({ length: count }, (_, i) => start + i);
  };

  const startItem = totalElements === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalElements);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-t bg-background py-3 mt-6 pb-6 mx-4 md:mx-0">
      <div className="justify-center sm:justify-start sm:flex items-center space-y-3 sm:space-y-0 gap-3 order-2 md:order-1">
        {/* Page size selector */}
        <div className="flex justify-center items-center">
          <Select
            value={String(pageSize)}
            onValueChange={(val) => {
              onPageSizeChange(Number(val));
            }}
          >
            <SelectTrigger className="h-8 w-16 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOption.map((size) => (
                <SelectItem key={size} value={String(size)} className="text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:flex items-center justify-center gap-3">
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {totalElements === 0 ? (
              "Tidak ada data"
            ) : (
              <>
                Menampilkan{" "}
                <span className="font-medium text-foreground">{startItem}</span>
                {" – "}
                <span className="font-medium text-foreground">{endItem}</span>
                {" dari "}
                <span className="font-medium text-foreground">
                  {totalElements}
                </span>{" "}
                data
              </>
            )}
          </div>
        </div>
      </div>

      <Pagination className="order-1 md:order-2 w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => hasPrevious && onPageChange(currentPage - 1)}
              aria-disabled={!hasPrevious}
              className={
                !hasPrevious
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {totalPages > 1 &&
            getPageNumbers().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => onPageChange(pageNum)}
                  isActive={currentPage === pageNum}
                  className="cursor-pointer text-primary"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => hasNext && onPageChange(currentPage + 1)}
              aria-disabled={!hasNext}
              className={
                !hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
