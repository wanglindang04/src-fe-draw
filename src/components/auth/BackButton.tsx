import Image from "next/image";
import { icons } from "@/content/icons";

type BackButtonProps = {
  text: string;
  onClick: () => void;
  // md: Đăng ký (icon 20, chữ 16px) · lg: Quên mật khẩu (icon 32, chữ 20px) — theo Figma
  size?: "md" | "lg";
};

// Brand button "Quay lại" (Figma: icon mũi tên trái + chữ xanh)
export default function BackButton({ text, onClick, size = "md" }: BackButtonProps) {
  const lg = size === "lg";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center self-start rounded-lg font-medium text-primary hover:bg-hover ${
        lg ? "h-16 gap-3 px-5 text-xl leading-7 short:h-12" : "gap-2 px-3 py-2 text-base leading-6"
      }`}
    >
      <Image src={lg ? icons.arrowLeftLarge : icons.arrowLeft} alt="" width={lg ? 32 : 20} height={lg ? 32 : 20} />
      {text}
    </button>
  );
}
