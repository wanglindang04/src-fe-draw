"use client";

import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import ComboboxField from "@/components/ui/ComboboxField";
import DateField from "@/components/ui/date-picker/DateField";
import SelectField from "@/components/ui/SelectField";
import TextField from "@/components/ui/TextField";
import TextLink from "@/components/ui/TextLink";
import { icons } from "@/content/icons";
import { registerContent, registerOptions } from "@/content/register";
import RegisterContent from "../RegisterContent";
import RegisterTop from "../RegisterTop";
import SchoolNameRules from "../SchoolNameRules";
import StepTitle from "../StepTitle";
import type { StudentInfo } from "../types";

type StudentInfoStepProps = {
  value: StudentInfo;
  onChange: (value: StudentInfo) => void;
  onNext: () => void;
};

// Bước 1: thông tin học sinh
export default function StudentInfoStep({ value, onChange, onNext }: StudentInfoStepProps) {
  const t = registerContent.studentInfo;
  const set = (patch: Partial<StudentInfo>) => onChange({ ...value, ...patch });

  const canSubmit = Boolean(
    value.fullName.trim() && value.birthDate && value.province && value.ward && value.level && value.school.trim() && value.grade,
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) onNext();
  };

  return (
    // Cùng khung với trang Đăng ký nhà trường (RegisterTop + RegisterContent) để chuyển tab không bị lệch
    <div className="flex flex-col gap-6 desktop:mt-2 short:mt-0 short:gap-4">
      <RegisterTop active="student" />
      <RegisterContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 short:gap-4">
          <StepTitle title={t.title} />

      <div className="flex flex-col gap-4 short:gap-3">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="fullName"
            label={t.fullNameLabel}
            placeholder={t.fullNamePlaceholder}
            required
            autoComplete="name"
            value={value.fullName}
            onChange={(e) => set({ fullName: e.target.value })}
          />
          <DateField id="birthDate" label={t.birthDateLabel} required value={value.birthDate} onChange={(birthDate) => set({ birthDate })} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="province"
            label={t.provinceLabel}
            placeholder={t.provincePlaceholder}
            required
            options={registerOptions.provinces}
            value={value.province}
            onChange={(province) => set({ province, ward: "" })}
          />
          <SelectField
            id="ward"
            label={t.wardLabel}
            placeholder={t.wardPlaceholder}
            required
            disabled={!value.province}
            options={registerOptions.wardsByProvince[value.province] ?? []}
            value={value.ward}
            onChange={(ward) => set({ ward })}
          />
        </div>

        <SelectField
          id="level"
          label={t.levelLabel}
          placeholder={t.levelPlaceholder}
          required
          options={registerOptions.levels}
          value={value.level}
          onChange={(level) => set({ level, school: "", grade: "" })}
        />

        <ComboboxField
          id="school"
          label={t.schoolLabel}
          placeholder={t.schoolPlaceholder}
          required
          labelAction={<SchoolNameRules />}
          options={registerOptions.schoolsByLevel[value.level] ?? []}
          value={value.school}
          onChange={(school) => set({ school })}
        />

        <SelectField
          id="grade"
          label={t.gradeLabel}
          placeholder={t.gradePlaceholder}
          required
          disabled={!value.level}
          options={registerOptions.gradesByLevel[value.level] ?? []}
          value={value.grade}
          onChange={(grade) => set({ grade })}
        />
      </div>

      <div className="flex flex-col items-center gap-6 short:gap-4">
        <Button type="submit" size="lg" disabled={!canSubmit} trailingIcon={icons.arrowRight}>
          {t.submitText}
        </Button>
        <p className="text-center text-sm leading-5 text-body">
          {t.loginPrompt} <TextLink href={t.loginHref}>{t.loginText}</TextLink>
        </p>
      </div>
        </form>
      </RegisterContent>
    </div>
  );
}
