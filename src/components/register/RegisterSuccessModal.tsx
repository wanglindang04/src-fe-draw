"use client";

import NoticeModal from "@/components/ui/NoticeModal";
import { registerContent } from "@/content/register";

export default function RegisterSuccessModal({ open }: { open: boolean }) {
  const t = registerContent.success;

  return <NoticeModal open={open} iconSrc={t.iconSrc} title={t.title} lines={t.lines} buttonText={t.loginText} href={t.loginHref} />;
}
