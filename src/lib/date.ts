// Tiện ích ngày tháng cho DatePicker (không phụ thuộc thư viện ngoài)

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const formatDate = (d: Date) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
};

// "dd/mm/yyyy" → Date; null nếu sai định dạng, ngày không tồn tại (vd 31/02) hoặc sau maxDate
export function parseDate(text: string, maxDate?: Date): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!match) return null;
  const [, dd, mm, yyyy] = match.map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  if (date.getFullYear() !== yyyy || date.getMonth() !== mm - 1 || date.getDate() !== dd) return null;
  if (yyyy < 1900 || (maxDate && date > startOfDay(maxDate))) return null;
  return date;
}

export const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);

// Các tuần hiển thị của 1 tháng (mỗi tuần 7 ngày, bắt đầu Thứ 2), gồm cả ngày tháng trước/sau
export function getCalendarWeeks(month: Date): Date[][] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7; // Thứ 2 = 0
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const weekCount = Math.ceil((offset + lastDay) / 7);

  return Array.from({ length: weekCount }, (_, w) =>
    Array.from({ length: 7 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + i)),
  );
}
