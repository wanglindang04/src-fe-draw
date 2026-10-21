"use client";

import { useEffect, useRef } from "react";

type YearListProps = {
  fromYear: number;
  toYear: number;
  value: number;
  onSelect: (year: number) => void;
};

// Danh sách chọn năm (Figma: Dropdown Option Group 149 x 171, nổi giữa date picker)
export default function YearList({ fromYear, toYear, value, onSelect }: YearListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Cuộn tới năm đang chọn (chỉ cuộn trong danh sách, không cuộn trang)
  useEffect(() => {
    const list = listRef.current;
    const item = selectedRef.current;
    if (list && item) list.scrollTop = item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2;
  }, []);

  const years = Array.from({ length: fromYear - toYear + 1 }, (_, i) => fromYear - i);

  return (
    <div
      ref={listRef}
      role="listbox"
      className="scrollbar-thin absolute top-12 left-1/2 z-10 max-h-[171px] w-[149px] -translate-x-1/2 overflow-y-auto rounded-xl bg-white py-1.5 shadow-popover"
    >
      {years.map((year) => {
        const selected = year === value;
        return (
          <button
            key={year}
            ref={selected ? selectedRef : undefined}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(year)}
            className={`block w-full px-3 py-2 text-left text-sm leading-5 font-medium text-title hover:bg-hover ${selected ? "bg-hover" : ""}`}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}
