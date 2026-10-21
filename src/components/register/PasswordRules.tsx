import Image from "next/image";
import { icons } from "@/content/icons";
import { registerContent } from "@/content/register";
import { PASSWORD_RULES } from "@/lib/register";

// Khối điều kiện mật khẩu (Figma: stats-summary-footer) — icon xanh khi đạt, xám khi chưa
export default function PasswordRules({ password }: { password: string }) {
  return (
    <ul className="flex flex-col gap-2 rounded-[10px] bg-surface p-3">
      {registerContent.password.rules.map((rule) => {
        const passed = PASSWORD_RULES[rule.id](password);
        return (
          <li key={rule.id} className="flex items-center gap-1 text-sm leading-5 text-body">
            <span className="flex size-4 shrink-0 items-center justify-center">
              {passed ? (
                <Image src={icons.checkSuccess} alt="" width={16} height={16} />
              ) : (
                <Image src={icons.checkPending} alt="" width={13} height={13} />
              )}
            </span>
            {rule.text}
          </li>
        );
      })}
    </ul>
  );
}
