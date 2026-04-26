"use client";

import { useCallback, useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({
    width: 1280,
    height: 800,
  });

  const read = useCallback(() => {
    if (typeof window === "undefined") return;
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, [read]);

  return size;
}
