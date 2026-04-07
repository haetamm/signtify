import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationResponse } from "@/lib/util/interface";

interface PaginationBarProps {
  pagination: PaginationResponse;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function PaginationBar({
  pagination,
  currentPage,
  pageSize,
  onPageChange,
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

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t bg-background px-4 py-3 mt-6 pb-6  mx-4 md:mx-6">
      <p className="text-sm text-gray-700 order-2 sm:order-1">
        Menampilkan{" "}
        <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span>{" "}
        ke{" "}
        <span className="font-medium">
          {Math.min(currentPage * pageSize, totalElements)}
        </span>{" "}
        dari <span className="font-medium">{totalElements}</span> hasil
      </p>

      <Pagination className="order-1 sm:order-2 w-auto mx-0 ">
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

          {getPageNumbers().map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={() => onPageChange(pageNum)}
                isActive={currentPage === pageNum}
                className="cursor-pointer "
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
