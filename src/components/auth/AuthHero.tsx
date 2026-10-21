import Image from "next/image";
import { loginContent } from "@/content/login";
import HeroTitle from "./hero/HeroTitle";

// Panel ảnh bên trái (Figma: 912 x 1013, bo góc 40).
// Lớp nội dung đặt font-size = 1/912 chiều rộng panel → 1em = 1px thiết kế, co giãn theo panel.
// Lưu ý: phần tử tự đặt font-size thì vị trí (top/left) phải nằm ở wrapper bên ngoài.
export default function AuthHero() {
  const { hero } = loginContent;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[40px] [container-type:inline-size]">
      <Image src={hero.backgroundSrc} alt={hero.backgroundAlt} fill priority sizes="48vw" className="object-cover" />

      <div className="absolute inset-0 bg-[linear-gradient(162.08deg,rgba(0,58,152,0.78)_19.813%,rgba(1,42,109,0)_70.358%)]" />

      <div className="absolute inset-0 [font-size:calc(100cqw/912)]">
        <div className="absolute top-[60em] left-[60em]">
          <p className="text-[39.389em] leading-[normal] font-semibold whitespace-nowrap text-white [text-shadow:0_0_1.16em_rgba(0,26,112,0.98)]">
            {hero.welcomeText}
          </p>
        </div>

        <div className="absolute top-[169em] left-[60em]">
          <HeroTitle />
        </div>
      </div>
    </div>
  );
}
