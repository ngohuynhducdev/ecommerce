"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductPaginationProps {
  currentPage: number;
  pageCount: number;
}

export function ProductPagination({
  currentPage,
  pageCount,
}: ProductPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getPageUrl(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => Math.abs(p - currentPage) <= 2,
  );

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={getPageUrl(p)} isActive={p === currentPage}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < pageCount && (
          <PaginationItem>
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
