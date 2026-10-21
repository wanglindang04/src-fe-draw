"use client";

import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  labelledBy: string;
  children: ReactNode;
};

// Popup thông báo (Figma: overlay toàn màn hình + thẻ trắng 598px, bo 24)
export default function Modal({ open, labelledBy, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-title/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="flex w-full max-w-[598px] flex-col items-center gap-6 overflow-clip rounded-3xl bg-white p-6"
      >
        {children}
      </div>
    </div>
  );
}
