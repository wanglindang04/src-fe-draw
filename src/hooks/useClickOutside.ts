import { useEffect, type RefObject } from "react";

// Gọi handler khi click ra ngoài phần tử (đóng dropdown/popover)
export function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, handler, enabled]);
}
