"use client";

import type { FormEvent } from "react";
import SchoolNameRules from "@/components/register/SchoolNameRules";
import StepTitle from "@/components/register/StepTitle";
import Button from "@/components/ui/Button";
import ComboboxField from "@/components/ui/ComboboxField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import { icons } from "@/content/icons";
import { registerOptions } from "@/content/register";
import { schoolRegisterContent } from "@/content/schoolRegister";
import type { SchoolInfo } from "../types";

type SchoolInfoStepProps = {
  value: SchoolInfo;
  onChange: (value: SchoolInfo) => void;
  onNext: () => void;
};

// Bước 1: thông tin nhà trường
export default function SchoolInfoStep({ value, onChange, onNext }: SchoolInfoStepProps) {
  const t = schoolRegisterContent.schoolInfo;
  const set = (patch: Partial<SchoolInfo>) => onChange({ ...value, ...patch });

  const canSubmit = Boolean(value.province && value.ward && value.level && value.school.trim() && value.address.trim());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) onNext();
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 short:gap-4">
      <StepTitle title={t.title} />

      <div className="flex flex-col gap-4 short:gap-3">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="schoolProvince"
            label={t.provinceLabel}
            placeholder={t.provincePlaceholder}
            required
            options={registerOptions.provinces}
            value={value.province}
            onChange={(province) => set({ province, ward: "" })}
          />
          <SelectField
            id="schoolWard"
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
          id="schoolLevel"
          label={t.levelLabel}
          placeholder={t.levelPlaceholder}
          required
          options={registerOptions.levels}
          value={value.level}
          onChange={(level) => set({ level, school: "" })}
        />

        <ComboboxField
          id="schoolName"
          label={t.schoolLabel}
          placeholder={t.schoolPlaceholder}
          required
          labelAction={<SchoolNameRules />}
          options={registerOptions.schoolsByLevel[value.level] ?? []}
          value={value.school}
          onChange={(school) => set({ school })}
        />

        <TextAreaField
          id="schoolAddress"
          label={t.addressLabel}
          placeholder={t.addressPlaceholder}
          required
          autoComplete="street-address"
          value={value.address}
          onChange={(e) => set({ address: e.target.value })}
        />
      </div>

      <Button type="submit" size="lg" disabled={!canSubmit} trailingIcon={icons.arrowRight}>
        {t.submitText}
      </Button>
    </form>
  );
}
