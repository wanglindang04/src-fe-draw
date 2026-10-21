import BackButton from "./BackButton";
import BrandLogo from "./BrandLogo";

type AuthHeaderProps = {
  backText?: string;
  onBack?: () => void;
};

// Header các bước sau: logo bên trái + nút "Quay lại" bên phải
export default function AuthHeader({ backText, onBack }: AuthHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <BrandLogo />
      {onBack && backText && <BackButton text={backText} onClick={onBack} />}
    </div>
  );
}
