"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
};

// Verification code input field (Figma): 6 ô 48x48, tự nhảy ô khi nhập/xoá, hỗ trợ dán mã
export default function OtpInput({ length = 6, value, onChange, ariaLabel }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focusAt = (index: number) => inputs.current[Math.max(0, Math.min(length - 1, index))]?.focus();

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit) focusAt(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index]) focusAt(index - 1);
    if (e.key === "ArrowLeft") focusAt(index - 1);
    if (e.key === "ArrowRight") focusAt(index + 1);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    focusAt(pasted.length);
  };

  return (
    <div role="group" aria-label={ariaLabel} className="flex justify-center gap-3">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={digit}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`${ariaLabel} ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="size-12 rounded-lg border-[1.5px] border-disabled bg-white text-center text-xl leading-7 font-medium text-title outline-none transition-colors focus:border-primary"
        />
      ))}
    </div>
  );
}
