"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import styles from "./RouteModal.module.scss";

export function RouteModal({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const modal = (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) router.back();
      }}
      role="presentation"
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
      >
        <div className={styles.header}>
          <div className={styles.title}>{title ?? ""}</div>
          <button
            className={styles.closeBtn}
            type="button"
            onClick={() => router.back()}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
