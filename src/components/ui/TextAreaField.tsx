"use client";

import { useLayoutEffect, useRef, type TextareaHTMLAttributes } from "react";
import FieldShell, { type FieldShellProps } from "./FieldShell";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Pick<FieldShellProps, "label" | "labelAction" | "error"> & {
    id: string;
    value: string;
  };

// Ô nhập nhiều dòng tự giãn chiều cao (Figma: Địa chỉ dài xuống dòng, ô cao theo nội dung)
export default function TextAreaField({ id, label, labelAction, error, required, className, value, ...props }: TextAreaFieldProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <FieldShell id={id} label={label} required={required} labelAction={labelAction} error={error} filled={Boolean(value)} autoHeight className={className}>
      <textarea
        ref={ref}
        id={id}
        rows={1}
        value={value}
        aria-invalid={Boolean(error)}
        className="min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-base leading-[22px] text-title outline-none placeholder:text-placeholder"
        {...props}
      />
    </FieldShell>
  );
}
