"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { datePickerContent } from "@/content/datePicker";
import { icons } from "@/content/icons";
import { useClickOutside } from "@/hooks/useClickOutside";
import { parseDate } from "@/lib/date";
import FieldShell from "../FieldShell";
import DatePicker from "./DatePicker";

type DateFieldProps = {
  id: string;
  label: string;
  value?: Date;
  // undefined khi chưa nhập đủ / ngày không hợp lệ
  onChange: (date: Date | undefined) => void;
  required?: boolean;
  error?: string;
  className?: string;
};

type Parts = { day: string; month: string; year: string };
type PartKey = keyof Parts;

const SEGMENTS: { key: PartKey; length: number }[] = [
  { key: "day", length: 2 },
  { key: "month", length: 2 },
  { key: "year", length: 4 },
];

const toParts = (d?: Date): Parts =>
  d
    ? { day: String(d.getDate()).padStart(2, "0"), month: String(d.getMonth() + 1).padStart(2, "0"), year: String(d.getFullYear()) }
    : { day: "", month: "", year: "" };

// Ô ngày dạng 3 ô cố định  dd / mm / yyyy  — dấu "/" luôn hiển thị, gõ ô nào điền ô đó, tự nhảy ô.
// Bấm icon lịch để chọn trên lịch.
export default function DateField({ id, label, value, onChange, required, error, className }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const [parts, setParts] = useState<Parts>(() => toParts(value));
  const [invalid, setInvalid] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputs = useRef<Record<PartKey, HTMLInputElement | null>>({ day: null, month: null, year: null });
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  const focusSegment = (index: number) => {
    const seg = SEGMENTS[Math.max(0, Math.min(SEGMENTS.length - 1, index))];
    inputs.current[seg.key]?.focus();
  };

  const commit = (next: Parts) => {
    setParts(next);
    const complete = next.day.length === 2 && next.month.length === 2 && next.year.length === 4;
    if (!complete) {
      setInvalid(false);
      onChange(undefined);
      return;
    }
    const date = parseDate(`${next.day}/${next.month}/${next.year}`, new Date());
    setInvalid(!date);
    onChange(date ?? undefined);
  };

  const handleChange = (index: number, raw: string) => {
    const seg = SEGMENTS[index];
    const digits = raw.replace(/\D/g, "").slice(0, seg.length);
    commit({ ...parts, [seg.key]: digits });
    if (digits.length === seg.length) focusSegment(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const atStart = el.selectionStart === 0 && el.selectionEnd === 0;
    const atEnd = el.selectionStart === el.value.length;
    if (e.key === "Backspace" && el.value === "" && index > 0) {
      e.preventDefault();
      focusSegment(index - 1);
    }
    if (e.key === "ArrowLeft" && atStart) focusSegment(index - 1);
    if (e.key === "ArrowRight" && atEnd) focusSegment(index + 1);
    if (e.key === "/" || e.key === "-" || e.key === ".") {
      e.preventDefault();
      focusSegment(index + 1);
    }
  };

  // Dán "12/05/2016" hoặc "12052016" → tách vào 3 ô
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (digits.length < 8) return;
    e.preventDefault();
    commit({ day: digits.slice(0, 2), month: digits.slice(2, 4), year: digits.slice(4, 8) });
    focusSegment(2);
  };

  const filled = Boolean(parts.day || parts.month || parts.year);

  return (
    <div ref={ref} className={className}>
      <FieldShell
        id={`${id}-day`}
        label={label}
        required={required}
        error={error ?? (invalid ? datePickerContent.invalidDate : undefined)}
        filled={filled}
        active={open}
        popover={
          open && (
            <div className="absolute top-full right-0 z-30 mt-2">
              <DatePicker
                value={value}
                onSelect={(date) => {
                  commit(toParts(date));
                  setOpen(false);
                }}
              />
            </div>
          )
        }
      >
        <div
          role="group"
          aria-label={`${label} (${datePickerContent.placeholder})`}
          // Bấm vào khoảng trống trong ô → focus ô đầu tiên còn trống
          onMouseDown={(e) => {
            if (e.target !== e.currentTarget) return;
            e.preventDefault();
            const firstEmpty = SEGMENTS.findIndex((s) => parts[s.key].length < s.length);
            focusSegment(firstEmpty === -1 ? 2 : firstEmpty);
          }}
          className="flex min-w-0 flex-1 cursor-text items-center self-stretch text-base leading-[22px] tabular-nums"
        >
          {SEGMENTS.map((seg, i) => (
            <span key={seg.key} className="flex items-center">
              {i > 0 && <span className={`px-px ${filled ? "text-title" : "text-placeholder"}`}>/</span>}
              {/* Ô co theo nội dung: chữ ẩn (giá trị hoặc chữ mẫu) quyết định độ rộng, input phủ tuyệt đối lên trên */}
              <span className="relative inline-block">
                <span aria-hidden className="invisible whitespace-pre">
                  {parts[seg.key] || datePickerContent.segmentPlaceholders[seg.key]}
                </span>
                <input
                  ref={(el) => {
                    inputs.current[seg.key] = el;
                  }}
                  id={`${id}-${seg.key}`}
                  value={parts[seg.key]}
                  placeholder={datePickerContent.segmentPlaceholders[seg.key]}
                  inputMode="numeric"
                  maxLength={seg.length}
                  aria-label={datePickerContent.segmentLabels[seg.key]}
                  aria-invalid={invalid || Boolean(error)}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  className="absolute inset-0 w-full bg-transparent p-0 text-title outline-none placeholder:text-placeholder"
                />
              </span>
            </span>
          ))}
        </div>

        <button
          type="button"
          aria-label={datePickerContent.openCalendar}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 outline-none"
        >
          <Image src={icons.calendar} alt="" width={24} height={24} />
        </button>
      </FieldShell>
    </div>
  );
}
