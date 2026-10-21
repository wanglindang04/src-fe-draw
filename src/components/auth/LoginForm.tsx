"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import PasswordField from "@/components/ui/PasswordField";
import TextField from "@/components/ui/TextField";
import TextLink from "@/components/ui/TextLink";
import { loginContent } from "@/content/login";
import { login } from "@/lib/auth";

export default function LoginForm() {
  const { form } = loginContent;
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  const canSubmit = account.trim() !== "" && password !== "" && !submitting;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // TODO: thay bằng API đăng nhập thật
    const ok = await login(account, password);
    setSubmitting(false);
    if (!ok) {
      // Sai tài khoản/mật khẩu: giữ nguyên dữ liệu đã nhập, chỉ báo lỗi
      setFailed(true);
      return;
    }
    // Trang cũ được Next giữ lại khi chuyển trang → không để lộ mật khẩu nếu quay lại
    setPassword("");
    router.push(form.successHref);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] leading-10 font-bold text-title">{form.title}</h1>
        <p className="text-base leading-[22px] text-muted">{form.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <TextField
          id="account"
          name="account"
          label={form.accountLabel}
          placeholder={form.accountPlaceholder}
          autoComplete="username"
          value={account}
          invalid={failed}
          onChange={(e) => {
            setAccount(e.target.value);
            setFailed(false);
          }}
        />

        <div className="flex flex-col items-end gap-3">
          <PasswordField
            id="password"
            name="password"
            label={form.passwordLabel}
            placeholder={form.passwordPlaceholder}
            showLabel={form.showPasswordLabel}
            hideLabel={form.hidePasswordLabel}
            autoComplete="current-password"
            value={password}
            error={failed ? form.invalidCredentials : undefined}
            onChange={(e) => {
              setPassword(e.target.value);
              setFailed(false);
            }}
          />
          <TextLink href={form.forgotPasswordHref}>{form.forgotPasswordText}</TextLink>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <Button type="submit" disabled={!canSubmit}>
          {submitting ? form.submittingText : form.submitText}
        </Button>
        <p className="text-center text-sm leading-5 text-body">
          {form.registerPrompt} <TextLink href={form.registerHref}>{form.registerText}</TextLink>
        </p>
      </div>
    </form>
  );
}
