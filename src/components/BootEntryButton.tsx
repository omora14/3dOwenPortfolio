"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/LocaleProvider";

export default function BootEntryButton() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

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

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobileViewport(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const onBoot = () => {
    if (typeof window === "undefined") return;
    const max = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    window.scrollTo({ top: max, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onBoot}
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 120,
        padding: "10px 18px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.02em",
        fontFamily: "ms_sans_serif, system-ui, sans-serif",
        color: "#111",
        background: "#c0c0c0",
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        cursor: "pointer",
        opacity: visible && isMobileViewport ? 1 : 0,
        pointerEvents: visible && isMobileViewport ? "auto" : "none",
        transition: "opacity 180ms ease",
        boxShadow: "2px 2px 0 rgba(0,0,0,0.45)",
      }}
      aria-hidden={!visible || !isMobileViewport}
    >
      {t("boot.enter")}
    </button>
  );
}

