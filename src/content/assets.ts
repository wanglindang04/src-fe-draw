// Đường dẫn gốc cho ảnh tải từ Figma (public/images).
// Sau này khi nối CMS, chỉ cần thay các file content/*.ts bằng dữ liệu từ API.
export const IMAGE_BASE = "/images";

export const img = (path: string) => `${IMAGE_BASE}/${path}`;
