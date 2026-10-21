import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterFlow from "@/components/register/RegisterFlow";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản | VSAR",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterFlow />
    </AuthLayout>
  );
}
