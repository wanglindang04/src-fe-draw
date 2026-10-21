"use client";

import { useEffect, useState } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import { registerContent } from "@/content/register";
import type { ContactChannel } from "@/lib/register";
import RegisterSuccessModal from "./RegisterSuccessModal";
import OtpStep from "./steps/OtpStep";
import ParentContactStep from "./steps/ParentContactStep";
import PasswordStep from "./steps/PasswordStep";
import StudentInfoStep from "./steps/StudentInfoStep";
import { EMPTY_STUDENT_INFO, type StudentInfo } from "./types";

type Step = "student" | "contact" | "otp" | "password";

const PREVIOUS_STEP: Record<Step, Step | null> = {
  student: null,
  contact: "student",
  otp: "contact",
  password: "otp",
};

// Điều phối các bước đăng ký: Thông tin học sinh → Liên hệ phụ huynh → OTP → Đặt mật khẩu → Popup thành công
export default function RegisterFlow() {
  const [step, setStep] = useState<Step>("student");
  const [student, setStudent] = useState<StudentInfo>(EMPTY_STUDENT_INFO);
  const [contact, setContact] = useState("");
  const [channel, setChannel] = useState<ContactChannel>("phone");
  const [done, setDone] = useState(false);

  // Next (cacheComponents) giữ trang cũ ẩn kèm state khi chuyển trang → đã đăng ký xong mà rời trang
  // thì reset về bước đầu, để lần sau vào lại là form mới. Đang điền dở thì vẫn giữ.
  useEffect(() => {
    if (!done) return;
    return () => {
      setStep("student");
      setStudent(EMPTY_STUDENT_INFO);
      setContact("");
      setChannel("phone");
      setDone(false);
    };
  }, [done]);

  if (step === "student") {
    return <StudentInfoStep value={student} onChange={setStudent} onNext={() => setStep("contact")} />;
  }

  const previous = PREVIOUS_STEP[step];

  return (
    <div className="flex flex-col gap-12 desktop:gap-[124px] short:gap-16">
      <AuthHeader backText={registerContent.backText} onBack={previous ? () => setStep(previous) : undefined} />

      {step === "contact" && (
        <ParentContactStep
          value={contact}
          onChange={setContact}
          onNext={(c) => {
            setChannel(c);
            setStep("otp");
          }}
        />
      )}
      {step === "otp" && <OtpStep contact={contact} channel={channel} onVerified={() => setStep("password")} />}
      {step === "password" && <PasswordStep onDone={() => setDone(true)} />}

      <RegisterSuccessModal open={done} />
    </div>
  );
}
