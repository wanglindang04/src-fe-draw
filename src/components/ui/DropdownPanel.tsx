export type Option = {
  value: string;
  label: string;
};

type DropdownPanelProps = {
  id?: string;
  options: Option[];
  value?: string;
  onSelect: (option: Option) => void;
  emptyText?: string;
  className?: string;
};

// Dropdown Option Group (Figma): nền trắng, bo 12, shadow nhẹ, tối đa ~5 dòng rồi cuộn
export default function DropdownPanel({ id, options, value, onSelect, emptyText, className = "" }: DropdownPanelProps) {
  return (
    <div
      id={id}
      role="listbox"
      className={`scrollbar-thin absolute top-full right-0 left-0 z-30 mt-2 max-h-[212px] overflow-y-auto rounded-xl bg-white py-1.5 shadow-popover ${className}`}
    >
      {options.length === 0 && emptyText && <p className="px-3 py-2 text-sm leading-5 text-muted">{emptyText}</p>}

      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(option)}
            className={`block w-full px-3 py-2 text-left text-sm leading-5 font-medium text-title transition-colors hover:bg-hover ${selected ? "bg-hover" : ""}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
