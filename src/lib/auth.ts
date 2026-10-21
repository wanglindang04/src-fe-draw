// Đăng nhập tạm (chưa nối API) — thay bằng gọi API thật sau

// Tài khoản mẫu để thử luồng đăng nhập thành công
export const MOCK_ACCOUNT = { account: "hocsinh", password: "Hocsinh@123" };

// Email/SĐT đã đăng ký mẫu — dùng thử luồng Quên mật khẩu
export const MOCK_REGISTERED_CONTACTS = ["0912345789", "hocsinh@gmail.com"];

export async function checkAccountExists(contact: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const value = contact.trim().toLowerCase().replace(/[\s.](?=\d)/g, "");
  return MOCK_REGISTERED_CONTACTS.includes(value);
}

export async function login(account: string, password: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return account.trim() === MOCK_ACCOUNT.account && password === MOCK_ACCOUNT.password;
}
