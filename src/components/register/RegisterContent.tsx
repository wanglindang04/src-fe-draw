import { ViewTransition, type ReactNode } from "react";

// Nội dung form dưới phần đầu — khi chuyển giữa 2 trang Đăng ký thì mờ dần sang nội dung mới
export default function RegisterContent({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="register-fade" exit="register-fade" default="none">
      <div className="flex flex-col">{children}</div>
    </ViewTransition>
  );
}
