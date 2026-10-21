import type { PasswordRuleId } from "@/content/register";

// Logic phía client cho luồng đăng ký (chưa nối API)

export const MOCK_OTP = "123456";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^0\d{9}$/;

export type ContactChannel = "phone" | "email";

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());
export const isValidPhone = (value: string) => PHONE_REGEX.test(value.trim().replace(/[\s.]/g, ""));

export function detectContactChannel(contact: string): ContactChannel | null {
  if (isValidPhone(contact)) return "phone";
  if (isValidEmail(contact)) return "email";
  return null;
}

// 0912345789 → 091****789 ; abcdef@gmail.com → ab****@gmail.com
export function maskContact(contact: string, channel: ContactChannel) {
  const value = contact.trim();
  if (channel === "phone") {
    const digits = value.replace(/\D/g, "");
    return `${digits.slice(0, 3)}****${digits.slice(-3)}`;
  }
  const [name, domain] = value.split("@");
  return `${name.slice(0, 2)}****@${domain}`;
}

export const PASSWORD_RULES: Record<PasswordRuleId, (pw: string) => boolean> = {
  length: (pw) => pw.length >= 8,
  case: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw),
  digit: (pw) => /\d/.test(pw),
  special: (pw) => /[^A-Za-z0-9\s]/.test(pw),
};

export const isPasswordValid = (pw: string) => Object.values(PASSWORD_RULES).every((test) => test(pw));
