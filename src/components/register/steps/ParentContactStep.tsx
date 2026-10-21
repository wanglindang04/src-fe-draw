"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { registerContent } from "@/content/register";
import { detectContactChannel, type ContactChannel } from "@/lib/register";
import StepTitle from "../StepTitle";

type ParentContactStepProps = {
  value: string;
  onChange: (value: string) => void;
  onNext: (channel: ContactChannel) => void;
};

// Bước 2: email hoặc số điện thoại phụ huynh để nhận OTP
export default function ParentContactStep({ value, onChange, onNext }: ParentContactStepProps) {
  const t = registerContent.parentContact;
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const channel = detectContactChannel(value);
    if (!channel) {
      setError(t.invalidContact);
      return;
    }
    // TODO: gọi API gửi OTP
    onNext(channel);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <StepTitle title={t.title} />
      <TextField
        id="parentContact"
        label={t.contactLabel}
        placeholder={t.contactPlaceholder}
        autoComplete="email"
        value={value}
        error={error}
        onChange={(e) => {
          onChange(e.target.value);
          setError("");
        }}
      />
      <Button type="submit" size="lg" disabled={!value.trim()}>
        {t.submitText}
      </Button>
    </form>
  );
}
