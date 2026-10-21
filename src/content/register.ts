import { img } from "./assets";

// Nội dung luồng Đăng ký tài khoản học sinh — khai báo tạm, sau này thay bằng dữ liệu từ CMS/API.
export const registerContent = {
  backText: "Quay lại",

  accountTabs: {
    school: { label: "Tài khoản nhà trường", href: "/dang-ky/nha-truong" },
    student: { label: "Tài khoản học sinh", href: "/dang-ky" },
  },

  // Bước 1 — Thông tin học sinh
  studentInfo: {
    title: "Đăng ký tài khoản học sinh",
    fullNameLabel: "Họ và tên học sinh",
    fullNamePlaceholder: "Nhập họ và tên",
    birthDateLabel: "Ngày sinh",
    provinceLabel: "Tỉnh/Thành phố",
    provincePlaceholder: "Chọn tỉnh/thành phố",
    wardLabel: "Xã/Phường",
    wardPlaceholder: "Chọn xã/phường",
    levelLabel: "Cấp học",
    levelPlaceholder: "Tiểu học",
    schoolLabel: "Trường đang theo học",
    schoolPlaceholder: "Chọn hoặc nhập tên trường",
    schoolRulesText: "Quy định viết tên trường",
    gradeLabel: "Khối học",
    gradePlaceholder: "Lớp 1",
    submitText: "Tiếp tục",
    loginPrompt: "Em đã có tài khoản?",
    loginText: "Đăng nhập!",
    loginHref: "/login",
  },

  schoolNameRules: {
    title: "Quy định viết tên trường:",
    items: [
      'Bắt buộc có chữ "Trường".',
      "Không viết tắt, không sử dụng ký tự đặc biệt.",
      "Viết đầy đủ cấp học và viết hoa chữ cái đầu tiên.",
      "Tên riêng viết hoa mỗi chữ cái đầu.",
      "VD: Trường Tiểu học Lê Lợi, Trường Trung học cơ sở Lê Lợi, Trường Trung học phổ thông Lê Lợi, Trường Tiểu học và Trung học cơ sở Lê Lợi,...",
    ],
  },

  // Bước 2 — Thông tin liên hệ phụ huynh
  parentContact: {
    title: "Thông tin liên hệ phụ huynh",
    contactLabel: "Email hoặc số điện thoại phụ huynh",
    contactPlaceholder: "Nhập email hoặc số điện thoại phụ huynh",
    invalidContact: "Email hoặc số điện thoại không hợp lệ",
    submitText: "Gửi mã OTP",
  },

  // Bước 3 — Nhập mã OTP
  otp: {
    title: "Nhập mã xác thực",
    description: (channel: "phone" | "email", masked: string) =>
      `Mã xác thực gồm 6 chữ số đã được gửi tới ${channel === "phone" ? "số điện thoại" : "email"}: ${masked}`,
    inputLabel: "Mã xác thực",
    invalidCode: "Mã xác thực không chính xác, vui lòng thử lại",
    submitText: "Xác nhận",
    resendPrompt: "Phụ huynh chưa nhận được mã?",
    resendText: "Gửi lại mã OTP",
    resendCountdown: (seconds: number) => `Gửi lại mã OTP (${seconds}s)`,
    resendSeconds: 60,
  },

  // Bước 4 — Đặt mật khẩu
  password: {
    title: "Đặt mật khẩu",
    passwordLabel: "Mật khẩu",
    passwordPlaceholder: "Nhập mật khẩu",
    confirmLabel: "Xác nhận mật khẩu",
    confirmPlaceholder: "Nhập lại mật khẩu",
    mismatch: "Mật khẩu không khớp",
    showPasswordLabel: "Hiện mật khẩu",
    hidePasswordLabel: "Ẩn mật khẩu",
    rules: [
      { id: "length", text: "Tối thiểu 8 ký tự" },
      { id: "case", text: "Có ít nhất 1 chữ hoa và 1 chữ thường" },
      { id: "digit", text: "Có ít nhất 1 chữ số (0-9)" },
      { id: "special", text: "Có ít nhất 1 ký tự đặc biệt (@,#,$,%,...)" },
    ] as const,
    submitText: "Xác nhận",
  },

  success: {
    iconSrc: img("icons/success-large.svg"),
    title: "Đặt mật khẩu thành công",
    lines: ["Mật khẩu của bạn đã được thiết lập thành công.", "Vui lòng đăng nhập để tiếp tục."],
    loginText: "Đăng nhập",
    loginHref: "/login",
  },
};

export type PasswordRuleId = (typeof registerContent.password.rules)[number]["id"];

// Dữ liệu mẫu cho các dropdown — sau này lấy từ API
export const registerOptions = {
  provinces: [
    { value: "ha-noi", label: "Hà Nội" },
    { value: "ho-chi-minh", label: "TP. Hồ Chí Minh" },
    { value: "da-nang", label: "Đà Nẵng" },
    { value: "hai-phong", label: "Hải Phòng" },
    { value: "can-tho", label: "Cần Thơ" },
  ],
  wardsByProvince: {
    "ha-noi": [
      { value: "ba-dinh", label: "Phường Ba Đình" },
      { value: "hoan-kiem", label: "Phường Hoàn Kiếm" },
      { value: "cau-giay", label: "Phường Cầu Giấy" },
      { value: "dong-da", label: "Phường Đống Đa" },
      { value: "tay-ho", label: "Phường Tây Hồ" },
      { value: "hai-ba-trung", label: "Phường Hai Bà Trưng" },
    ],
    "ho-chi-minh": [
      { value: "ben-thanh", label: "Phường Bến Thành" },
      { value: "sai-gon", label: "Phường Sài Gòn" },
      { value: "thu-duc", label: "Phường Thủ Đức" },
    ],
    "da-nang": [
      { value: "hai-chau", label: "Phường Hải Châu" },
      { value: "thanh-khe", label: "Phường Thanh Khê" },
    ],
    "hai-phong": [
      { value: "hong-bang", label: "Phường Hồng Bàng" },
      { value: "le-chan", label: "Phường Lê Chân" },
    ],
    "can-tho": [
      { value: "ninh-kieu", label: "Phường Ninh Kiều" },
      { value: "cai-rang", label: "Phường Cái Răng" },
    ],
  } as Record<string, { value: string; label: string }[]>,
  levels: [
    { value: "tieu-hoc", label: "Tiểu học" },
    { value: "thcs", label: "Trung học cơ sở" },
    { value: "thpt", label: "Trung học phổ thông" },
  ],
  gradesByLevel: {
    "tieu-hoc": [1, 2, 3, 4, 5].map((g) => ({ value: String(g), label: `Lớp ${g}` })),
    thcs: [6, 7, 8, 9].map((g) => ({ value: String(g), label: `Lớp ${g}` })),
    thpt: [10, 11, 12].map((g) => ({ value: String(g), label: `Lớp ${g}` })),
  } as Record<string, { value: string; label: string }[]>,
  schoolsByLevel: {
    "tieu-hoc": [
      { value: "th-ai-mo", label: "Trường Tiểu học Ái Mộ" },
      { value: "th-an-hung", label: "Trường Tiểu học An Hưng" },
      { value: "th-archimedes", label: "Trường Tiểu học Archimedes Academy" },
      { value: "th-ba-dinh", label: "Trường Tiểu học Ba Đình" },
      { value: "th-le-loi", label: "Trường Tiểu học Lê Lợi" },
    ],
    thcs: [
      { value: "thcs-ba-dinh", label: "Trường Trung học cơ sở Ba Đình" },
      { value: "thcs-le-loi", label: "Trường Trung học cơ sở Lê Lợi" },
    ],
    thpt: [
      { value: "thpt-chu-van-an", label: "Trường Trung học phổ thông Chu Văn An" },
      { value: "thpt-le-loi", label: "Trường Trung học phổ thông Lê Lợi" },
    ],
  } as Record<string, { value: string; label: string }[]>,
};
