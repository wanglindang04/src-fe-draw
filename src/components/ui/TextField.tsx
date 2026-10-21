import type { InputHTMLAttributes, ReactNode } from "react";
import FieldShell, { type FieldShellProps } from "./FieldShell";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> &
  Pick<FieldShellProps, "label" | "labelAction" | "error" | "invalid"> & {
    id: string;
    trailing?: ReactNode;
  };

export default function TextField({ id, label, labelAction, error, invalid, required, trailing, className, ...inputProps }: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      labelAction={labelAction}
      error={error}
      invalid={invalid}
      filled={Boolean(inputProps.value)}
      className={className}
    >
      <input
        id={id}
        aria-invalid={Boolean(error) || invalid}
        className="min-w-0 flex-1 bg-transparent text-base leading-[22px] text-title outline-none placeholder:text-placeholder"
        {...inputProps}
      />
      {trailing}
    </FieldShell>
  );
}
