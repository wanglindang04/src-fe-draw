import { img } from "./assets";

// Nội dung trang Đăng nhập — khai báo tạm, sau này thay bằng dữ liệu từ CMS.
export const loginContent = {
  logo: {
    src: img("login/logo.png"),
    alt: "VSAR - Vietnam National STEM AI Robotics",
    width: 684,
    height: 156,
  },

  hero: {
    backgroundSrc: img("login/hero-bg.png"),
    backgroundAlt: "Robot STEM bay trên nền địa cầu",
    welcomeText: "Chào mừng đến với",
    subtitle: "CUỘC THI VÔ ĐỊCH QUỐC GIA",
    titleLine1: "STEM, AI",
    titleAmpersand: "&",
    titleLine2: "ROBOTICS",
    titleAlt: "STEM, AI & ROBOTICS",
    schoolYear: "NĂM HỌC 2026-2027",
    dividerSrc: img("login/divider-line.svg"),
    // Hiệu ứng glow/ngôi sao quanh tiêu đề
    glowSrc: {
      ellipse1: img("login/glow-ellipse-1.svg"),
      ellipse2: img("login/glow-ellipse-2.svg"),
      ellipse3: img("login/glow-ellipse-3.svg"),
      ellipse4: img("login/glow-ellipse-4.svg"),
      star1: img("login/glow-star-1.svg"),
      star2: img("login/glow-star-2.svg"),
      star3: img("login/glow-star-3.svg"),
      star4: img("login/glow-star-4.svg"),
      line: img("login/glow-line.svg"),
    },
  },

  form: {
    title: "Đăng nhập",
    description: "Đăng nhập bằng tài khoản đã đăng ký hoặc được cấp",
    accountLabel: "Tài khoản đăng nhập",
    accountPlaceholder: "Nhập email, số điện thoại hoặc tên đăng nhập",
    passwordLabel: "Mật khẩu",
    passwordPlaceholder: "Nhập mật khẩu",
    showPasswordLabel: "Hiện mật khẩu",
    hidePasswordLabel: "Ẩn mật khẩu",
    forgotPasswordText: "Quên mật khẩu",
    forgotPasswordHref: "/quen-mat-khau",
    submitText: "Đăng nhập",
    submittingText: "Đang đăng nhập...",
    invalidCredentials: "Tài khoản hoặc mật khẩu không chính xác",
    successHref: "/",
    registerPrompt: "Nếu chưa có tài khoản, liên hệ với Ban tổ chức / Nhà trường hoặc",
    registerText: "Đăng ký mới",
    registerHref: "/dang-ky",
  },
};

export type LoginContent = typeof loginContent;
