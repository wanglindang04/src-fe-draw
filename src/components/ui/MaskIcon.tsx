import type { CSSProperties } from "react";

type MaskIconProps = {
  src: string;
  className?: string;
};

// Icon SVG tô theo màu chữ hiện tại (currentColor) — dùng khi icon đổi màu theo trạng thái (vd: nút disabled/enabled)
export default function MaskIcon({ src, className = "" }: MaskIconProps) {
  const style: CSSProperties = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };

  return <span aria-hidden className={`inline-block shrink-0 bg-current ${className}`} style={style} />;
}
