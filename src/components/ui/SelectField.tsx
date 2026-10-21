"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { icons } from "@/content/icons";
import { useClickOutside } from "@/hooks/useClickOutside";
import DropdownPanel, { type Option } from "./DropdownPanel";
import FieldShell from "./FieldShell";

type SelectFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export default function SelectField({ id, label, placeholder, options, value, onChange, required, disabled, error, className }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={className}>
      <FieldShell
        id={id}
        label={label}
        required={required}
        error={error}
        filled={Boolean(selected)}
        active={open}
        boxClassName="px-0"
        popover={
          open && (
            <DropdownPanel
              options={options}
              value={value}
              onSelect={(o) => {
                onChange(o.value);
                setOpen(false);
              }}
            />
          )
        }
      >
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-full w-full items-center gap-2 px-4 text-left outline-none disabled:cursor-not-allowed"
        >
          <span className={`min-w-0 flex-1 truncate text-base leading-[22px] ${selected ? "text-title" : "text-placeholder"}`}>
            {selected ? selected.label : placeholder}
          </span>
          <Image src={icons.chevronDown} alt="" width={24} height={24} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </FieldShell>
    </div>
  );
}
