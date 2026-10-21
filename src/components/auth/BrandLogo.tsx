import Image from "next/image";
import Link from "next/link";
import { loginContent } from "@/content/login";

export default function BrandLogo() {
  const { logo } = loginContent;

  return (
    <Link href="/" className="block w-[209px]">
      <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-auto w-full" priority />
    </Link>
  );
}
