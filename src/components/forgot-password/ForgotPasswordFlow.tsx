"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "@/components/auth/BackButton";
import BrandLogo from "@/components/auth/BrandLogo";
import OtpStep from "@/components/register/steps/OtpStep";
import PasswordStep from "@/components/register/steps/PasswordStep";
import NoticeModal from "@/components/ui/NoticeModal";
import { forgotPasswordContent } from "@/content/forgotPassword";
import type { ContactChannel } from "@/lib/register";
import IdentifyStep from "./IdentifyStep";

type Step = "identify" | "otp" | "password";

const PREVIOUS_STEP: Record<Step, Step | null> = {
  identify: null,
  otp: "identify",
  password: "otp",
};

// Quên mật khẩu: Nhập email/SĐT → OTP → Đặt lại mật khẩu → Popup thành công (về Đăng nhập)
export default function ForgotPasswordFlow() {
  const t = forgotPasswordContent;
  const router = useRouter();
  const [step, setStep] = useState<Step>("identify");
  const [contact, setContact] = useState("");
  const [channel, setChannel] = useState<ContactChannel>("phone");
  const [done, setDone] = useState(false);

  // Next (cacheComponents) giữ trang cũ kèm state khi chuyển trang → xong rồi rời trang thì reset
  useEffect(() => {
    if (!done) return;
    return () => {
      setStep("identify");
      setContact("");
      setChannel("phone");
      setDone(false);
    };
  }, [done]);

  const previous = PREVIOUS_STEP[step];
  const handleBack = () => (previous ? setStep(previous) : router.push(t.backHref));

  return (
    <div className="flex flex-col gap-12 desktop:mt-9 desktop:gap-[84px] short:mt-0 short:gap-10">
      <div className="flex items-center justify-between">
        <BrandLogo />
        <BackButton text={t.backText} onClick={handleBack} size="lg" />
      </div>

      {step === "identify" && (
        <IdentifyStep
          value={contact}
          onChange={setContact}
          onNext={(c) => {
            setChannel(c);
            setStep("otp");
          }}
        />
      )}
      {step === "otp" && (
        <OtpStep
          contact={contact}
          channel={channel}
          texts={t.otp}
          className="gap-10 short:gap-6"
          onVerified={() => setStep("password")}
        />
      )}
      {step === "password" && <PasswordStep texts={t.password} onDone={() => setDone(true)} />}

      <NoticeModal
        open={done}
        iconSrc={t.success.iconSrc}
        title={t.success.title}
        lines={t.success.lines}
        buttonText={t.success.loginText}
        href={t.success.loginHref}
      />
    </div>
  );
}
