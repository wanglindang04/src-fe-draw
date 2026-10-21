import type { ReactNode } from "react";
import AuthHero from "./AuthHero";

// Bố cục chung trang Đăng nhập / Đăng ký: panel ảnh bên trái + cột nội dung 598px bên phải
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen bg-white desktop:h-screen desktop:min-h-[720px] desktop:py-8 desktop:pl-8">
      <section className="hidden w-[47.5vw] shrink-0 desktop:block">
        <AuthHero />
      </section>

      <section className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-10 sm:py-16 desktop:px-8 desktop:pt-11 desktop:pb-8 short:pt-6 short:pb-4">
        {/* 1 cột (mobile/tablet dọc): căn giữa theo chiều dọc; 2 cột: bám trên như thiết kế */}
        <div className="my-auto flex w-full max-w-[598px] flex-col desktop:my-0">{children}</div>
      </section>
    </main>
  );
}
