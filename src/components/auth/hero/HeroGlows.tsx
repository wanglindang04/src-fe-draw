import Image from "next/image";
import { loginContent } from "@/content/login";

type GlowKey = keyof typeof loginContent.hero.glowSrc;

type Glow = {
  src: GlowKey;
  left: number;
  top: number;
  width: number;
  height: number;
  count?: number;
  rotate?: boolean;
};

// Vị trí lấy từ Figma (khung 731 x 217), đã cộng phần glow tràn của SVG.
// Figma xếp chồng nhiều lớp (blend plus-lighter) để glow sáng hơn → count.
const GLOWS: Glow[] = [
  { src: "ellipse1", left: -12.93, top: 67.86, width: 286.69, height: 27.08, count: 4, rotate: true },
  { src: "star1", left: 84.24, top: 70.59, width: 91.049, height: 22.203, rotate: true },
  { src: "ellipse2", left: 34.61, top: 66.69, width: 192.917, height: 27.133, count: 4 },
  { src: "star2", left: 105.88, top: 63.2, width: 50.802, height: 33.474 },
  { src: "ellipse3", left: 441.74, top: 67.53, width: 112.557, height: 27.782, count: 4 },
  { src: "star3", left: 478.72, top: 62.26, width: 38.806, height: 37.369 },
  { src: "ellipse3", left: 542.67, top: 191.1, width: 112.557, height: 27.782, count: 8 },
  { src: "star3", left: 579.65, top: 185.83, width: 38.806, height: 37.369, count: 2 },
  { src: "ellipse4", left: 371.94, top: 190.9, width: 445.163, height: 26.444, count: 4, rotate: true },
  { src: "star4", left: 524.82, top: 195.07, width: 137.308, height: 18.388, rotate: true },
  { src: "line", left: 141.63, top: 76.27, width: 578.902, height: 9.156 },
];

// Đơn vị em: 1em = 1px thiết kế (kế thừa từ AuthHero)
export default function HeroGlows() {
  const { glowSrc } = loginContent.hero;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {GLOWS.flatMap((glow, i) =>
        Array.from({ length: glow.count ?? 1 }, (_, layer) => (
          <Image
            key={`${i}-${layer}`}
            src={glowSrc[glow.src]}
            alt=""
            width={Math.round(glow.width)}
            height={Math.round(glow.height)}
            className={`absolute max-w-none mix-blend-plus-lighter ${glow.rotate ? "rotate-180" : ""}`}
            style={{
              left: `${glow.left}em`,
              top: `${glow.top}em`,
              width: `${glow.width}em`,
              height: `${glow.height}em`,
            }}
          />
        )),
      )}
    </div>
  );
}
