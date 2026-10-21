"use client";

import Image from "next/image";
import { useState, type ComponentProps } from "react";
import TextField from "./TextField";
import { icons } from "@/content/icons";

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, "type" | "trailing"> & {
  showLabel: string;
  hideLabel: string;
};

export default function PasswordField({ showLabel, hideLabel, ...fieldProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...fieldProps}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? hideLabel : showLabel}
          className="flex size-6 shrink-0 items-center justify-center outline-none"
        >
          {visible ? (
            <Image src={icons.eye} alt="" width={21} height={16} />
          ) : (
            <Image src={icons.eyeOff} alt="" width={24} height={24} />
          )}
        </button>
      }
    />
  );
}
