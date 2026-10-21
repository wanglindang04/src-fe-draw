import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import SchoolRegisterFlow from "@/components/school-register/SchoolRegisterFlow";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản nhà trường | VSAR",
};

export default function SchoolRegisterPage() {
  return (
    <AuthLayout>
      <SchoolRegisterFlow />
    </AuthLayout>
  );
}
