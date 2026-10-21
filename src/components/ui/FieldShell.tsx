import Image from "next/image";
import type { ReactNode } from "react";
import { icons } from "@/content/icons";

export type FieldShellProps = {
  id?: string;
  label: string;
  required?: boolean;
  // Phần tử bên phải label (vd: link "Quy định viết tên trường")
  labelAction?: ReactNode;
  error?: string;
  // Viền đỏ nhưng không hiện dòng lỗi (vd: lỗi chung hiển thị ở ô khác)
  invalid?: boolean;
  // Đã có giá trị → viền đậm hơn (Figma: State=Filled)
  filled?: boolean;
  // Đang mở dropdown/picker → viền primary như khi focus
  active?: boolean;
  // Ô nhiều dòng: chiều cao tự giãn theo nội dung (tối thiểu 56px)
  autoHeight?: boolean;
  boxClassName?: string;
  className?: string;
  // Popover/dropdown hiển thị dưới ô nhập
  popover?: ReactNode;
  children: ReactNode;
};

// Khung chung của Text Field (label + ô nhập + help text lỗi) theo component Figma
export default function FieldShell({
  id,
  label,
  required,
  labelAction,
  error,
  invalid,
  filled,
  active,
  autoHeight,
  boxClassName = "px-4",
  className = "",
  popover,
  children,
}: FieldShellProps) {
  let borderClass = "border-border focus-within:border-primary";
  if (error || invalid) borderClass = "border-danger";
  else if (active) borderClass = "border-primary";
  else if (filled) borderClass = "border-placeholder focus-within:border-primary";

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <label htmlFor={id} className="flex items-center gap-1 text-sm leading-5 font-semibold text-title">
          {label}
          {required && <span className="font-bold text-danger">*</span>}
        </label>
        {labelAction}
      </div>

      <div className="relative">
        <div
          className={`flex w-full items-center gap-2 rounded-xl border bg-white transition-colors ${
            autoHeight ? "min-h-14 py-[15px] tiny:min-h-12 tiny:py-[11px]" : "h-14 tiny:h-12"
          } ${borderClass} ${boxClassName}`}
        >
          {children}
        </div>
        {popover}
      </div>

      {error && (
        <div className="flex items-center gap-1 px-2">
          <span className="flex size-4 shrink-0 items-center justify-center">
            <Image src={icons.alertError} alt="" width={14} height={14} />
          </span>
          <p className="text-sm leading-5 text-danger">{error}</p>
        </div>
      )}
    </div>
  );
}
