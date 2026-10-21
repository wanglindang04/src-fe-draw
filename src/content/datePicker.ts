// Text của bộ chọn ngày — tuần bắt đầu từ Thứ 2
export const datePickerContent = {
  weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  monthLabel: (month: number) => `Tháng ${month}`,
  previousMonth: "Tháng trước",
  nextMonth: "Tháng sau",
  chooseYear: "Chọn năm",
  placeholder: "dd/mm/yyyy",
  segmentPlaceholders: { day: "dd", month: "mm", year: "yyyy" },
  segmentLabels: { day: "Ngày", month: "Tháng", year: "Năm" },
  openCalendar: "Mở lịch chọn ngày",
  invalidDate: "Ngày không hợp lệ",
};
