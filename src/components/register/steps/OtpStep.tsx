"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import OtpInput from "@/components/ui/OtpInput";
import { registerContent } from "@/content/register";
import { useCountdown } from "@/hooks/useCountdown";
import { MOCK_OTP, maskContact, type ContactChannel } from "@/lib/register";
import StepTitle from "../StepTitle";

const OTP_LENGTH = 6;

export type OtpTexts = typeof registerContent.otp;

type OtpStepProps = {
  contact: string;
  channel: ContactChannel;
  onVerified: () => void;
  // Dùng chung cho Đăng ký và Quên mật khẩu — mặc định text của Đăng ký
  texts?: OtpTexts;
  // Khoảng cách giữa các khối (Đăng ký 24px, Quên mật khẩu 40px theo Figma)
  className?: string;
};

// Nhập mã OTP 6 số (Đăng ký: gửi tới phụ huynh; Quên mật khẩu: gửi tới tài khoản)
export default function OtpStep({ contact, channel, onVerified, texts = registerContent.otp, className = "gap-6" }: OtpStepProps) {
  const t = texts;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { remaining, restart } = useCountdown(t.resendSeconds);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: gọi API xác thực OTP — tạm dùng mã mẫu
    if (code !== MOCK_OTP) {
      setError(t.invalidCode);
      return;
    }
    onVerified();
  };

  const handleResend = () => {
    // TODO: gọi API gửi lại OTP
    setCode("");
    setError("");
    restart();
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col ${className}`}>
      <StepTitle title={t.title} description={t.description(channel, maskContact(contact, channel))} />

      <div className="flex flex-col gap-4">
        <OtpInput
          length={OTP_LENGTH}
          ariaLabel={t.inputLabel}
          value={code}
          onChange={(v) => {
            setCode(v);
            setError("");
          }}
        />
        {error && <p className="text-center text-sm leading-5 text-danger">{error}</p>}
      </div>

      <div className="flex flex-col items-center gap-6">
        <Button type="submit" size="lg" disabled={code.length < OTP_LENGTH}>
          {t.submitText}
        </Button>
        <p className="text-center text-sm leading-5 text-body">
          {t.resendPrompt}{" "}
          <button
            type="button"
            disabled={remaining > 0}
            onClick={handleResend}
            className="font-medium text-primary hover:underline disabled:cursor-default disabled:no-underline"
          >
            {remaining > 0 ? t.resendCountdown(remaining) : t.resendText}
          </button>
        </p>
      </div>
    </form>
  );
}
