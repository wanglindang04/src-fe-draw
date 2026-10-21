"use client";

import Image from "next/image";
import { useId, useRef, useState, type DragEvent } from "react";
import { icons } from "@/content/icons";

type FileUploadFieldProps = {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept: string;
  maxSizeMb: number;
  texts: {
    upload: string;
    uploadLink: string;
    hint: string;
    tooLarge: string;
    remove: string;
    note?: string;
    downloadTemplate?: string;
  };
  downloadTemplateHref?: string;
};

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)}MB` : `${Math.max(1, Math.round(bytes / 1024))}KB`;

// File Upload Area (Figma): vùng kéo-thả viền nét đứt; đã chọn → thẻ thông tin file + nút xoá
export default function FileUploadField({ label, file, onChange, accept, maxSizeMb, texts, downloadTemplateHref }: FileUploadFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const pick = (picked?: File) => {
    if (!picked) return;
    if (picked.size > maxSizeMb * 1024 * 1024) {
      setError(texts.tooLarge);
      return;
    }
    setError("");
    onChange(picked);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files[0]);
  };

  const remove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="flex-1 text-sm leading-5 font-semibold text-title">{label}</span>
        {downloadTemplateHref && texts.downloadTemplate && (
          <a
            href={downloadTemplateHref}
            download
            className="flex items-center gap-1 rounded-md bg-hover px-2 py-1.5 text-sm leading-5 font-medium text-primary hover:underline"
          >
            <Image src={icons.download} alt="" width={20} height={20} />
            {texts.downloadTemplate}
          </a>
        )}
      </div>

      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-hover p-4 short:py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Image src={icons.file} alt="" width={41} height={41} />
            <div className="flex min-w-0 flex-col gap-px">
              <p className="truncate text-lg leading-7 font-medium text-title">{file.name}</p>
              <p className="text-sm leading-5 text-muted">{formatSize(file.size)}</p>
            </div>
          </div>
          <button type="button" aria-label={texts.remove} onClick={remove} className="shrink-0">
            <Image src={icons.trash} alt="" width={20} height={20} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-primary px-4 py-4 text-center short:py-3 transition-colors ${
            dragging ? "bg-[#e1edff]" : "bg-hover"
          }`}
        >
          <Image src={icons.upload} alt="" width={32} height={32} />
          <span className="flex flex-col gap-1">
            <span className="text-sm leading-5 font-medium text-black">
              {texts.upload} <span className="text-[#006fff] underline">{texts.uploadLink}</span>
            </span>
            <span className="text-xs leading-4 text-muted">{texts.hint}</span>
          </span>
        </label>
      )}

      <input ref={inputRef} id={inputId} type="file" accept={accept} className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />

      {error && <p className="text-sm leading-5 text-danger">{error}</p>}
      {texts.note && <p className="text-sm leading-5 text-muted italic">{texts.note}</p>}
    </div>
  );
}
