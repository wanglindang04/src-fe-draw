import { registerContent } from "./register";

// Nội dung luồng Quên mật khẩu — khai báo tạm, sau này thay bằng dữ liệu từ CMS.
// Bước OTP / Đặt mật khẩu / Popup giống luồng Đăng ký học sinh nên kế thừa text, chỉ ghi đè chỗ khác.
export const forgotPasswordContent = {
  backText: "Quay lại",
  backHref: "/login",

  // Bước 1 — nhập email/số điện thoại đã đăng ký
  identify: {
    title: "Quên mật khẩu",
    description: "Để khôi phục mật khẩu, vui lòng nhập email hoặc số điện thoại đã đăng ký",
    contactLabel: "Email hoặc số điện thoại",
    contactPlaceholder: "Nhập email hoặc số điện thoại",
    invalidContact: "Email hoặc số điện thoại không hợp lệ",
    phoneNotFound: "Số điện thoại không tồn tại",
    emailNotFound: "Email không tồn tại",
    submitText: "Tiếp tục",
    submittingText: "Đang kiểm tra...",
  },

  // Bước 2 — OTP
  otp: {
    ...registerContent.otp,
    resendPrompt: "Chưa nhận được mã?",
  },

  // Bước 3 — Đặt lại mật khẩu
  password: {
    ...registerContent.password,
    title: "Đặt lại mật khẩu",
  },

  success: registerContent.success,
};
