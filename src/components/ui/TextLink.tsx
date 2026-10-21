import Link from "next/link";
import type { ComponentProps } from "react";

// Brand button dạng text (link xanh, 14px medium)
export default function TextLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`text-sm font-medium leading-5 text-primary hover:underline ${className}`}
      {...props}
    />
  );
}
