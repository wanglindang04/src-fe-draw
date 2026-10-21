import { ViewTransition } from "react";
import BrandLogo from "@/components/auth/BrandLogo";
import AccountTypeTabs from "./AccountTypeTabs";

// Phần đầu dùng chung của 2 trang Đăng ký (học sinh / nhà trường): logo + tab chọn loại tài khoản.
// Hai trang đặt cùng vị trí, có view-transition-name → chuyển tab thì logo/tab đứng yên, chỉ nội dung đổi.
export default function RegisterTop({ active }: { active: "school" | "student" }) {
  return (
    <>
      <ViewTransition name="register-logo" default="none">
        <div>
          <BrandLogo />
        </div>
      </ViewTransition>
      <AccountTypeTabs active={active} />
    </>
  );
}
