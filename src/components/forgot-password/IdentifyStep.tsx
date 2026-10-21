"use client";

import { useState, type FormEvent } from "react";
import StepTitle from "@/components/register/StepTitle";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { forgotPasswordContent } from "@/content/forgotPassword";
import { checkAccountExists } from "@/lib/auth";
import { detectContactChannel, type ContactChannel } from "@/lib/register";

type IdentifyStepProps = {
  value: string;
  onChange: (value: string) => void;
  onNext: (channel: ContactChannel) => void;
};

// Bước 1: nhập email/SĐT đã đăng ký để nhận OTP
export default function IdentifyStep({ value, onChange, onNext }: IdentifyStepProps) {
  const t = forgotPasswordContent.identify;
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const channel = detectContactChannel(value);
    if (!channel) {
      setError(t.invalidContact);
      return;
    }
    setSubmitting(true);
    // TODO: thay bằng API kiểm tra tài khoản + gửi OTP
    const exists = await checkAccountExists(value);
    setSubmitting(false);
    if (!exists) {
      // Giữ nguyên giá trị đã nhập, chỉ báo lỗi
      setError(channel === "phone" ? t.phoneNotFound : t.emailNotFound);
      return;
    }
    onNext(channel);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10 short:gap-6">
      <StepTitle title={t.title} description={t.description} />
      <TextField
        id="forgotContact"
        label={t.contactLabel}
        placeholder={t.contactPlaceholder}
        autoComplete="username"
        value={value}
        error={error}
        onChange={(e) => {
          onChange(e.target.value);
          setError("");
        }}
      />
      <Button type="submit" disabled={!value.trim() || submitting}>
        {submitting ? t.submittingText : t.submitText}
      </Button>
    </form>
  );
}
