import { Archivo } from "next/font/google";

// Thay thế tạm cho font đồ hoạ "Integral CF" (font trả phí) trong tiêu đề hero.
// Archivo Expanded Black Italic có dáng gần nhất và hỗ trợ tiếng Việt.
export const displayFont = Archivo({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  style: ["italic"],
  axes: ["wdth"],
});
