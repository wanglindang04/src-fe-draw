"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { icons } from "@/content/icons";
import { useClickOutside } from "@/hooks/useClickOutside";
import DropdownPanel, { type Option } from "./DropdownPanel";
import FieldShell from "./FieldShell";

type ComboboxFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  options: Option[];
  // Giá trị là text (chọn từ danh sách hoặc tự nhập)
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  labelAction?: ReactNode;
  error?: string;
  className?: string;
};

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();

// Ô "Chọn hoặc nhập" — gõ để lọc danh sách, vẫn cho phép nhập giá trị ngoài danh sách
export default function ComboboxField({ id, label, placeholder, options, value, onChange, required, labelAction, error, className }: ComboboxFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  const keyword = normalize(value.trim());
  const filtered = keyword ? options.filter((o) => normalize(o.label).includes(keyword)) : options;

  return (
    <div ref={ref} className={className}>
      <FieldShell
        id={id}
        label={label}
        required={required}
        labelAction={labelAction}
        error={error}
        filled={Boolean(value)}
        active={open}
        popover={
          open &&
          filtered.length > 0 && (
            <DropdownPanel
              id={`${id}-listbox`}
              options={filtered}
              value={options.find((o) => o.label === value)?.value}
              onSelect={(o) => {
                onChange(o.label);
                setOpen(false);
              }}
            />
          )
        }
      >
        <input
          id={id}
          role="combobox"
          aria-controls={`${id}-listbox`}
          aria-expanded={open}
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          className="min-w-0 flex-1 bg-transparent text-base leading-[22px] text-title outline-none placeholder:text-placeholder"
        />
        <button type="button" tabIndex={-1} aria-label={label} onClick={() => setOpen((v) => !v)} className="shrink-0 outline-none">
          <Image src={icons.chevronDown} alt="" width={24} height={24} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </FieldShell>
    </div>
  );
}
