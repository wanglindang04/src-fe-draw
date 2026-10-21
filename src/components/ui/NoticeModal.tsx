"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId } from "react";
import Button from "./Button";
import Modal from "./Modal";

type NoticeModalProps = {
  open: boolean;
  iconSrc: string;
  title: string;
  lines: readonly string[];
  buttonText: string;
  href: string;
};

// Popup thông báo (Figma: icon 100px + tiêu đề 24px + mô tả + nút primary)
export default function NoticeModal({ open, iconSrc, title, lines, buttonText, href }: NoticeModalProps) {
  const router = useRouter();
  const titleId = useId();

  return (
    <Modal open={open} labelledBy={titleId}>
      <Image src={iconSrc} alt="" width={100} height={100} />
      <div className="flex w-full flex-col gap-2 text-center">
        <h2 id={titleId} className="text-2xl leading-8 font-bold text-title">
          {title}
        </h2>
        <p className="text-sm leading-5 text-muted">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
      <Button type="button" size="lg" onClick={() => router.push(href)}>
        {buttonText}
      </Button>
    </Modal>
  );
}
