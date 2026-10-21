import type { ButtonHTMLAttributes } from "react";
import MaskIcon from "./MaskIcon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // md: 60px (Đăng nhập), lg: 64px (Đăng ký)
  size?: "md" | "lg";
  trailingIcon?: string;
};

const SIZE_CLASS = {
  md: "h-[60px]",
  lg: "h-16 short:h-14",
};

// Brand button — Fill Primary. Disabled: nền xám, chữ xám.
export default function Button({ size = "md", trailingIcon, className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 text-xl font-medium leading-7 text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-disabled disabled:text-placeholder ${SIZE_CLASS[size]} ${className}`}
      {...props}
    >
      {children}
      {trailingIcon && <MaskIcon src={trailingIcon} className="size-8" />}
    </button>
  );
}
