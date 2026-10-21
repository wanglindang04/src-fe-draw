"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/auth/BackButton";
import RegisterContent from "@/components/register/RegisterContent";
import RegisterTop from "@/components/register/RegisterTop";
import NoticeModal from "@/components/ui/NoticeModal";
import { schoolRegisterContent } from "@/content/schoolRegister";
import ParticipationStep from "./steps/ParticipationStep";
import RepresentativeStep from "./steps/RepresentativeStep";
import SchoolInfoStep from "./steps/SchoolInfoStep";
import {
  EMPTY_PARTICIPATION,
  EMPTY_REPRESENTATIVE,
  EMPTY_SCHOOL_INFO,
  type Participation,
  type Representative,
  type SchoolInfo,
} from "./types";

type Step = "school" | "representative" | "participation";

const PREVIOUS_STEP: Record<Step, Step | null> = {
  school: null,
  representative: "school",
  participation: "representative",
};

// Điều phối đăng ký nhà trường: Thông tin trường → Người đại diện → Xác nhận tham gia → Popup chờ phê duyệt
export default function SchoolRegisterFlow() {
  const t = schoolRegisterContent;
  const [step, setStep] = useState<Step>("school");
  const [school, setSchool] = useState<SchoolInfo>(EMPTY_SCHOOL_INFO);
  const [representative, setRepresentative] = useState<Representative>(EMPTY_REPRESENTATIVE);
  const [participation, setParticipation] = useState<Participation>(EMPTY_PARTICIPATION);
  const [submitted, setSubmitted] = useState(false);

  // Next (cacheComponents) giữ trang cũ ẩn kèm state khi chuyển trang → đã gửi hồ sơ mà rời trang
  // thì reset về bước đầu, để lần sau vào lại là form mới. Đang điền dở thì vẫn giữ.
  useEffect(() => {
    if (!submitted) return;
    return () => {
      setStep("school");
      setSchool(EMPTY_SCHOOL_INFO);
      setRepresentative(EMPTY_REPRESENTATIVE);
      setParticipation(EMPTY_PARTICIPATION);
      setSubmitted(false);
    };
  }, [submitted]);

  const previous = PREVIOUS_STEP[step];

  return (
    // Cùng khung với trang Đăng ký học sinh (RegisterTop + RegisterContent) để chuyển tab không bị lệch
    <div className="flex flex-col gap-6 desktop:mt-2 short:mt-0 short:gap-4">
      <RegisterTop active="school" />

      <RegisterContent>
        <div className="flex flex-col gap-6 short:gap-3">
          {previous && <BackButton text={t.backText} onClick={() => setStep(previous)} />}

          {step === "school" && <SchoolInfoStep value={school} onChange={setSchool} onNext={() => setStep("representative")} />}
          {step === "representative" && (
            <RepresentativeStep value={representative} onChange={setRepresentative} onNext={() => setStep("participation")} />
          )}
          {step === "participation" && (
            <ParticipationStep value={participation} onChange={setParticipation} onSubmit={() => setSubmitted(true)} />
          )}
        </div>
      </RegisterContent>

      <NoticeModal
        open={submitted}
        iconSrc={t.success.iconSrc}
        title={t.success.title}
        lines={t.success.lines}
        buttonText={t.success.homeText}
        href={t.success.homeHref}
      />
    </div>
  );
}
