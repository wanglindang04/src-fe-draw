"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { icons } from "@/content/icons";
import { registerContent } from "@/content/register";
import { useClickOutside } from "@/hooks/useClickOutside";

// Link "Quy định viết tên trường" + popover hướng dẫn (Figma: thẻ 384px, chữ #404d64)
export default function SchoolNameRules() {
  const { schoolRulesText } = registerContent.studentInfo;
  const { title, items } = registerContent.schoolNameRules;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex items-center gap-1 text-sm leading-5 font-medium text-primary"
      >
        {schoolRulesText}
        <Image src={icons.infoCircle} alt="" width={16} height={16} />
      </button>

      {open && (
        <div role="tooltip" className="absolute top-full right-0 z-40 mt-2 w-[384px] max-w-[calc(100vw-32px)] rounded-xl bg-white p-4 text-sm leading-5 text-secondary shadow-popover">
          <p className="font-bold">{title}</p>
          <ul className="list-disc pl-5">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
