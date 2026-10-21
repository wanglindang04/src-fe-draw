"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import PasswordField from "@/components/ui/PasswordField";
import { registerContent } from "@/content/register";
import { isPasswordValid } from "@/lib/register";
import PasswordRules from "../PasswordRules";
import StepTitle from "../StepTitle";

export type PasswordTexts = typeof registerContent.password;

type PasswordStepProps = {
  onDone: () => void;
  // Dùng chung cho Đăng ký và Quên mật khẩu — mặc định text của Đăng ký
  texts?: PasswordTexts;
};

// Bước 4: đặt mật khẩu
export default function PasswordStep({ onDone, texts = registerContent.password }: PasswordStepProps) {
  const t = texts;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mismatch, setMismatch] = useState(false);

  const canSubmit = isPasswordValid(password) && confirm !== "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) {
      setMismatch(true);
      return;
    }
    // TODO: gọi API tạo tài khoản
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <StepTitle title={t.title} />

      <div className="flex flex-col gap-6">
        <PasswordField
          id="newPassword"
          label={t.passwordLabel}
          placeholder={t.passwordPlaceholder}
          showLabel={t.showPasswordLabel}
          hideLabel={t.hidePasswordLabel}
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setMismatch(false);
          }}
        />
        <PasswordField
          id="confirmPassword"
          label={t.confirmLabel}
          placeholder={t.confirmPlaceholder}
          showLabel={t.showPasswordLabel}
          hideLabel={t.hidePasswordLabel}
          autoComplete="new-password"
          value={confirm}
          error={mismatch ? t.mismatch : undefined}
          onChange={(e) => {
            setConfirm(e.target.value);
            setMismatch(false);
          }}
        />
        <PasswordRules password={password} />
      </div>

      <Button type="submit" size="lg" disabled={!canSubmit}>
        {t.submitText}
      </Button>
    </form>
  );
}
