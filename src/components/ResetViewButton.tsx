"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/LocaleProvider";

export default function ResetViewButton() {
  const t = useTranslations();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p =
        typeof window !== "undefined" ? window.__scrollProgress ?? 0 : 0;
      setVisible(p < 0.02);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const onClick = () => {
    if (typeof window === "undefined") return;
    window.__resetCameraView?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 100,
        padding: "8px 14px",
        fontSize: 12,
        fontFamily: "ms_sans_serif, system-ui, sans-serif",
        color: "#0a0a0a",
        background: "#c0c0c0",
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 200ms ease",
        boxShadow: "2px 2px 0 rgba(0,0,0,0.5)",
        userSelect: "none",
      }}
      aria-hidden={!visible}
    >
      ↺ {t("resetView.button")}
    </button>
  );
}
