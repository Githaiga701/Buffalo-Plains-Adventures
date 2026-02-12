import { useEffect } from "react";

export default function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (e: Event) => void) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el) return;
      if (event.target instanceof Node && el.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
