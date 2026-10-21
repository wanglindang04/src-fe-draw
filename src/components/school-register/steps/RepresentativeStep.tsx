"use client";

import { useState, type FormEvent } from "react";
import StepTitle from "@/components/register/StepTitle";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { icons } from "@/content/icons";
import { schoolRegisterContent } from "@/content/schoolRegister";
import { isValidEmail, isValidPhone } from "@/lib/register";
import type { Representative } from "../types";

type RepresentativeStepProps = {
  value: Representative;
  onChange: (value: Representative) => void;
  onNext: () => void;
};

type Errors = Partial<Record<keyof Representative, string>>;

// Bước 2: thông tin người đại diện nhà trường
export default function RepresentativeStep({ value, onChange, onNext }: RepresentativeStepProps) {
  const t = schoolRegisterContent.representative;
  const [errors, setErrors] = useState<Errors>({});

  const set = (patch: Partial<Representative>) => {
    onChange({ ...value, ...patch });
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch) as (keyof Representative)[]) delete next[key];
      return next;
    });
  };

  const canSubmit = Boolean(value.name.trim() && value.position.trim() && value.phone.trim() && value.email.trim());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Errors = {};
    if (!isValidPhone(value.phone)) nextErrors.phone = t.invalidPhone;
    if (!isValidEmail(value.email)) nextErrors.email = t.invalidEmail;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 short:gap-4">
      <StepTitle title={t.title} />

      <div className="flex flex-col gap-4 short:gap-3">
        <TextField
          id="repName"
          label={t.nameLabel}
          placeholder={t.namePlaceholder}
          required
          autoComplete="name"
          value={value.name}
          onChange={(e) => set({ name: e.target.value })}
        />
        <TextField
          id="repPosition"
          label={t.positionLabel}
          placeholder={t.positionPlaceholder}
          required
          autoComplete="organization-title"
          value={value.position}
          onChange={(e) => set({ position: e.target.value })}
        />
        <TextField
          id="repPhone"
          label={t.phoneLabel}
          placeholder={t.phonePlaceholder}
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={value.phone}
          error={errors.phone}
          onChange={(e) => set({ phone: e.target.value })}
        />
        <TextField
          id="repEmail"
          label={t.emailLabel}
          placeholder={t.emailPlaceholder}
          required
          type="email"
          autoComplete="email"
          value={value.email}
          error={errors.email}
          onChange={(e) => set({ email: e.target.value })}
        />
      </div>

      <Button type="submit" size="lg" disabled={!canSubmit} trailingIcon={icons.arrowRight}>
        {t.submitText}
      </Button>
    </form>
  );
}
