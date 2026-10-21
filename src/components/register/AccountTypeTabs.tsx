import Link from "next/link";
import { ViewTransition } from "react";
import { registerContent } from "@/content/register";

type AccountTypeTabsProps = {
  active: "school" | "student";
};

// Segmented control chọn loại tài khoản (Figma: nền xám, tab đang chọn nền trắng chữ xanh đậm).
// Nền trắng là 1 phần tử riêng có view-transition-name → khi chuyển trang nó trượt sang tab mới.
export default function AccountTypeTabs({ active }: AccountTypeTabsProps) {
  const tabs = [
    { key: "school" as const, ...registerContent.accountTabs.school },
    { key: "student" as const, ...registerContent.accountTabs.student },
  ];

  return (
    <ViewTransition name="register-tabs" default="none">
      <nav className="relative flex items-center rounded-2xl bg-surface px-1 py-[5px]">
        <ViewTransition name="register-tab-pill" share="tab-pill" default="none">
          <span
            aria-hidden
            className={`absolute top-[5px] bottom-[5px] w-[calc(50%-4px)] rounded-xl bg-white ${active === "school" ? "left-1" : "left-1/2"}`}
          />
        </ViewTransition>

        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            // Chữ tab có view-transition-name riêng (đứng sau nền trắng trong DOM) → luôn vẽ đè lên nền khi nền đang trượt
            <ViewTransition key={tab.key} name={`register-tab-${tab.key}`} share="tab-label" default="none">
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex flex-1 items-center justify-center rounded-xl px-2 py-3 text-center text-sm leading-6 transition-colors sm:p-4 sm:text-base short:py-3 ${
                  isActive ? "font-bold text-primary" : "text-body hover:text-title"
                }`}
              >
                {tab.label}
              </Link>
            </ViewTransition>
          );
        })}
      </nav>
    </ViewTransition>
  );
}
