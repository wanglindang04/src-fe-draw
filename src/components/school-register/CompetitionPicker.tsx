import Image from "next/image";
import { icons } from "@/content/icons";
import type { Competition } from "@/content/schoolRegister";

type CompetitionPickerProps = {
  label: string;
  competitions: readonly Competition[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

// Chọn nhiều giải đấu (Figma: thẻ viền xám, chọn → viền xanh + checkbox tích)
export default function CompetitionPicker({ label, competitions, selected, onChange }: CompetitionPickerProps) {
  const toggle = (id: string) => onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  return (
    <div role="group" aria-labelledby="competition-picker-label" className="flex flex-col gap-4 short:gap-3">
      <p id="competition-picker-label" className="text-base leading-6 font-semibold text-black">
        {label}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 short:gap-3">
        {competitions.map((c) => {
          const checked = selected.includes(c.id);
          return (
            <label
              key={c.id}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition-colors short:p-2 ${
                checked ? "border-primary" : "border-border hover:border-placeholder"
              }`}
            >
              <input type="checkbox" checked={checked} onChange={() => toggle(c.id)} className="sr-only" />

              <span className="flex items-start gap-4">
                <CompetitionIcon src={c.iconSrc} color={c.color} />
                <span className="flex flex-col">
                  <span className="text-base leading-6 font-semibold text-black">{c.name}</span>
                  <span className="text-sm leading-5 text-muted">{c.groups}</span>
                </span>
              </span>

              <Image src={checked ? icons.checkboxChecked : icons.checkbox} alt="" width={24} height={24} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

// Ô icon 48px: nền màu 10% + ô 40px màu đậm chứa icon trắng
function CompetitionIcon({ src, color }: { src: string; color: string }) {
  return (
    <span className="relative size-12 shrink-0">
      <span className="absolute inset-0 rounded-xl opacity-10" style={{ backgroundColor: color }} />
      <span className="absolute inset-1 flex items-center justify-center rounded-lg" style={{ backgroundColor: color }}>
        {/* Icon 24px, phần hình nằm trong khung ~90% (giữ tỉ lệ gốc của SVG) */}
        <span className="relative size-6">
          <Image src={src} alt="" fill className="object-contain p-px" />
        </span>
      </span>
    </span>
  );
}
