import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import BrandLogo from "@/components/auth/BrandLogo";
import LoginForm from "@/components/auth/LoginForm";
import { loginContent } from "@/content/login";

export const metadata: Metadata = {
  title: `${loginContent.form.title} | VSAR`,
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-12 desktop:mt-9 desktop:gap-[100px]">
        <BrandLogo />
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
