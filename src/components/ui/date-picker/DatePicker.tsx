"use client";

import Image from "next/image";
import { useState } from "react";
import { datePickerContent } from "@/content/datePicker";
import { icons } from "@/content/icons";
import { addMonths, getCalendarWeeks, isSameDay, startOfDay } from "@/lib/date";
import YearList from "./YearList";

type DatePickerProps = {
  value?: Date;
  onSelect: (date: Date) => void;
  maxDate?: Date;
  minYear?: number;
};

// Date picker (Figma): header tháng/năm + lưới ngày 40x40
export default function DatePicker({ value, onSelect, maxDate = new Date(), minYear = maxDate.getFullYear() - 30 }: DatePickerProps) {
  const max = startOfDay(maxDate);
  const [viewMonth, setViewMonth] = useState(() => addMonths(value ?? max, 0));
  const [showYears, setShowYears] = useState(false);

  const canNext = addMonths(viewMonth, 1) <= max;
  const weeks = getCalendarWeeks(viewMonth);

  return (
    <div className="relative w-[312px] overflow-clip rounded-2xl bg-white shadow-popover">
      <div className="flex items-center justify-between border-b-[0.5px] border-divider p-4">
        <button type="button" aria-label={datePickerContent.previousMonth} onClick={() => setViewMonth((m) => addMonths(m, -1))}>
          <Image src={icons.chevronLeft} alt="" width={24} height={24} />
        </button>

        <button type="button" aria-label={datePickerContent.chooseYear} onClick={() => setShowYears((v) => !v)} className="flex items-center gap-1">
          <span className="text-base leading-6 font-medium text-title">
            {datePickerContent.monthLabel(viewMonth.getMonth() + 1)} {viewMonth.getFullYear()}
          </span>
          <Image src={icons.chevronDownDark} alt="" width={24} height={24} />
        </button>

        <button
          type="button"
          aria-label={datePickerContent.nextMonth}
          disabled={!canNext}
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="disabled:cursor-not-allowed"
        >
          {/* Icon "tiếp" dạng active = icon "trước" lật ngang */}
          {canNext ? (
            <Image src={icons.chevronLeft} alt="" width={24} height={24} className="-scale-x-100" />
          ) : (
            <Image src={icons.chevronRightDisabled} alt="" width={24} height={24} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 px-4 py-3">
        <div className="flex h-10">
          {datePickerContent.weekdays.map((d) => (
            <span key={d} className="flex size-10 items-center justify-center text-xs leading-4 text-placeholder">
              {d}
            </span>
          ))}
        </div>

        {weeks.map((week) => (
          <div key={week[0].toISOString()} className="flex h-10">
            {week.map((day) => {
              const inMonth = day.getMonth() === viewMonth.getMonth();
              const disabled = day > max;
              const selected = value && isSameDay(day, value);

              let colorClass = inMonth ? "text-title hover:bg-hover" : "text-placeholder hover:bg-hover";
              if (disabled) colorClass = "cursor-not-allowed text-placeholder opacity-50";
              if (selected) colorClass = "bg-primary text-white";

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelect(day)}
                  className={`flex size-10 items-center justify-center rounded-lg text-sm leading-5 transition-colors ${colorClass}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {showYears && (
        <YearList
          fromYear={max.getFullYear()}
          toYear={minYear}
          value={viewMonth.getFullYear()}
          onSelect={(year) => {
            setViewMonth(new Date(year, year === max.getFullYear() ? Math.min(viewMonth.getMonth(), max.getMonth()) : viewMonth.getMonth(), 1));
            setShowYears(false);
          }}
        />
      )}
    </div>
  );
}
