"use client";

import type { FormEvent } from "react";
import StepTitle from "@/components/register/StepTitle";
import Button from "@/components/ui/Button";
import FileUploadField from "@/components/ui/FileUploadField";
import TextField from "@/components/ui/TextField";
import { schoolRegisterContent } from "@/content/schoolRegister";
import CompetitionPicker from "../CompetitionPicker";
import type { Participation } from "../types";

type ParticipationStepProps = {
  value: Participation;
  onChange: (value: Participation) => void;
  onSubmit: () => void;
};

// Bước 3: chọn giải đấu, số đội dự kiến, tải lên văn bản xác nhận
export default function ParticipationStep({ value, onChange, onSubmit }: ParticipationStepProps) {
  const t = schoolRegisterContent.participation;
  const set = (patch: Partial<Participation>) => onChange({ ...value, ...patch });

  const canSubmit = value.competitions.length > 0 && Number(value.teamCount) > 0 && value.document !== null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: gọi API gửi hồ sơ nhà trường (multipart kèm file)
    if (canSubmit) onSubmit();
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 short:gap-4">
      <StepTitle title={t.title} />

      <div className="flex flex-col gap-4 short:gap-3">
        <CompetitionPicker
          label={t.competitionsLabel}
          competitions={t.competitions}
          selected={value.competitions}
          onChange={(competitions) => set({ competitions })}
        />

        <TextField
          id="teamCount"
          label={t.teamCountLabel}
          placeholder={t.teamCountPlaceholder}
          required
          inputMode="numeric"
          value={value.teamCount}
          onChange={(e) => set({ teamCount: e.target.value.replace(/\D/g, "").slice(0, 4) })}
        />

        <FileUploadField
          label={t.documentLabel}
          file={value.document}
          onChange={(document) => set({ document })}
          accept={t.acceptFileTypes}
          maxSizeMb={t.maxFileSizeMb}
          downloadTemplateHref={t.downloadTemplateHref}
          texts={{
            upload: t.uploadText,
            uploadLink: t.uploadLinkText,
            hint: t.uploadHint,
            tooLarge: t.fileTooLarge,
            remove: t.removeFileLabel,
            note: t.documentNote,
            downloadTemplate: t.downloadTemplateText,
          }}
        />
      </div>

      <Button type="submit" size="lg" disabled={!canSubmit}>
        {t.submitText}
      </Button>
    </form>
  );
}
