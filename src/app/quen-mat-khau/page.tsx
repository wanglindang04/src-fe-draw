import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordFlow from "@/components/forgot-password/ForgotPasswordFlow";
import { forgotPasswordContent } from "@/content/forgotPassword";

export const metadata: Metadata = {
  title: `${forgotPasswordContent.identify.title} | VSAR`,
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordFlow />
    </AuthLayout>
  );
}
