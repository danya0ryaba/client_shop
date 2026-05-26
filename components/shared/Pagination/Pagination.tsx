"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import style from "./Pagination.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationI {
  totalCount: number;
  pageSize: number;
  page: number; // текущая страница снаружи
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationI> = ({
  totalCount,
  pageSize,
  page,
  onPageChange,
  className = "",
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    onPageChange(next);
  };

  return (
    <div className={`${style.pagination} ${className}`}>
      <button
        className={style.arrow}
        disabled={page === 1}
        onClick={() => goTo(page - 1)}
      >
        <ChevronLeft className={style.svg} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <Button key={num} active={num === page} onClick={() => goTo(num)}>
          {num}
        </Button>
      ))}
      <button
        className={style.arrow}
        disabled={page === totalPages}
        onClick={() => goTo(page + 1)}
      >
        <ChevronRight className={style.svg} />
      </button>
    </div>
  );
};
