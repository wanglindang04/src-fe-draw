import { img } from "./assets";

// Nội dung luồng Đăng ký tài khoản nhà trường — khai báo tạm, sau này thay bằng dữ liệu từ CMS/API.
// Dropdown Tỉnh/Xã/Cấp học/Cơ sở giáo dục dùng chung dữ liệu mẫu registerOptions (content/register.ts).
export const schoolRegisterContent = {
  backText: "Quay lại",

  // Bước 1 — Thông tin nhà trường
  schoolInfo: {
    title: "Đăng ký tài khoản nhà trường",
    provinceLabel: "Tỉnh/Thành phố",
    provincePlaceholder: "Chọn tỉnh/thành phố",
    wardLabel: "Xã/Phường",
    wardPlaceholder: "Chọn xã/phường",
    levelLabel: "Cấp học",
    levelPlaceholder: "Tiểu học",
    schoolLabel: "Cơ sở giáo dục",
    schoolPlaceholder: "Chọn hoặc nhập tên trường",
    addressLabel: "Địa chỉ",
    addressPlaceholder: "Nhập địa chỉ",
    submitText: "Tiếp tục",
  },

  // Bước 2 — Thông tin người đại diện
  representative: {
    title: "Thông tin người đại diện",
    nameLabel: "Tên người đại diện",
    namePlaceholder: "Nhập họ và tên người đại diện",
    positionLabel: "Chức vụ",
    positionPlaceholder: "Nhập chức vụ",
    phoneLabel: "Số điện thoại",
    phonePlaceholder: "Nhập số điện thoại",
    invalidPhone: "Số điện thoại không hợp lệ",
    emailLabel: "Email",
    emailPlaceholder: "Nhập email",
    invalidEmail: "Email không hợp lệ",
    submitText: "Tiếp tục",
  },

  // Bước 3 — Xác nhận tham gia cuộc thi
  participation: {
    title: "Xác nhận tham gia cuộc thi",
    competitionsLabel: "CHỌN GIẢI ĐẤU THAM GIA",
    competitions: [
      { id: "robotics", name: "Robotics", groups: "Bảng A - B -C", iconSrc: img("school/robotics.svg"), color: "#f52833" },
      { id: "water-rocket", name: "Tên lửa nước", groups: "Bảng D - E", iconSrc: img("school/rocket.svg"), color: "#ffbd42" },
      { id: "drone", name: "Drone", groups: "Bảng F - G", iconSrc: img("school/drone.svg"), color: "#69bc5d" },
      { id: "ai", name: "Lập trình AI", groups: "Bảng H - I - J", iconSrc: img("school/ai-laptop.svg"), color: "#1a71ff" },
    ],
    teamCountLabel: "Số đội dự kiến",
    teamCountPlaceholder: "Nhập số đội dự kiến",
    documentLabel: "Văn bản xác nhận tham gia cuộc thi",
    downloadTemplateText: "Tải xuống mẫu",
    // TODO: thay bằng link file mẫu thật
    downloadTemplateHref: "/files/van-ban-xac-nhan-tham-gia.docx",
    uploadText: "Kéo và thả file vào đây hoặc",
    uploadLinkText: "Chọn file",
    uploadHint: "Dung lượng tối đa: 20 Mb",
    maxFileSizeMb: 20,
    acceptFileTypes: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
    fileTooLarge: "Dung lượng file vượt quá 20 Mb",
    removeFileLabel: "Xoá file",
    documentNote: "*Văn bản tải lên phải có dấu và chữ ký của Hiệu trưởng Nhà trường",
    submitText: "Đăng ký",
  },

  success: {
    iconSrc: img("icons/success-large.svg"),
    title: "Thông báo",
    lines: [
      "Hồ sơ của Nhà trường đã được gửi tới Ban Tổ chức, vui lòng đợi phê duyệt. Kết quả và thông tin kích hoạt tài khoản được gửi tới email đã đăng ký trong 5 - 7 ngày làm việc.",
    ],
    homeText: "Về trang chủ",
    homeHref: "/",
  },
};

export type Competition = (typeof schoolRegisterContent.participation.competitions)[number];
