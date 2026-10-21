import Image from "next/image";
import { loginContent } from "@/content/login";
import { displayFont } from "@/lib/fonts";
import HeroGlows from "./HeroGlows";

const TITLE_FONT = `${displayFont.className} font-black italic [font-stretch:100%] leading-[1.2] whitespace-nowrap text-transparent bg-clip-text`;
const WHITE_TO_BLUE = "bg-[linear-gradient(180deg,#fff_43.489%,#77aefa_89.583%)]";
const CYAN_TO_BLUE = "bg-[linear-gradient(190deg,rgb(196,243,251)_41.495%,rgb(4,166,246)_88.403%)]";

// Khối "CUỘC THI VÔ ĐỊCH QUỐC GIA / STEM, AI & ROBOTICS / NĂM HỌC" — Figma: rộng 731, đơn vị em = px thiết kế
export default function HeroTitle() {
  const { hero } = loginContent;

  return (
    <div className="flex w-[731em] flex-col items-center gap-[24em]">
      <div className="flex w-full flex-col items-start gap-[15em]">
        <div className="flex items-center gap-[24em]">
          <span className="text-[24em] leading-[normal] tracking-[0.12em] whitespace-nowrap text-white [text-shadow:0_0_2.19em_rgba(0,26,112,0.98)]">
            {hero.subtitle}
          </span>
          <Divider src={hero.dividerSrc} />
        </div>

        <h2 aria-label={hero.titleAlt} className="relative h-[217em] w-full">
          <span className="absolute top-[-27.84em] left-[7.55em]">
            <span className={`${TITLE_FONT} ${WHITE_TO_BLUE} text-[113.194em]`}>{hero.titleLine1}</span>
          </span>
          <span className="absolute top-[12.73em] left-[573.52em]">
            <span className={`${TITLE_FONT} ${WHITE_TO_BLUE} text-[75.463em]`}>{hero.titleAmpersand}</span>
          </span>
          <span className="absolute top-[93.85em] left-0">
            <span className={`${TITLE_FONT} ${CYAN_TO_BLUE} text-[113.194em]`}>{hero.titleLine2}</span>
          </span>
          <HeroGlows />
        </h2>
      </div>

      <div className="flex items-center gap-[16em]">
        <Divider src={hero.dividerSrc} />
        <span className="bg-[linear-gradient(180deg,#fff_22.312%,#77aefa_185.31%)] bg-clip-text text-[24em] leading-[normal] font-semibold whitespace-nowrap text-transparent">
          {hero.schoolYear}
        </span>
        <Divider src={hero.dividerSrc} />
      </div>
    </div>
  );
}

function Divider({ src }: { src: string }) {
  return <Image src={src} alt="" width={96} height={2} className="h-[2em] w-[96em] max-w-none shrink-0" />;
}
