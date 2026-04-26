"use client";

import React, { useEffect, useRef, useState } from "react";
import { RetroDesktopShell } from "./RetroOS/Desktop";
import { useTranslations } from "@/i18n/LocaleProvider";

export default function FullscreenOS() {
  const t = useTranslations();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const interactiveRef = useRef(false);
  /** OS shell mounts only once the user reaches the fullscreen handoff — not at page load. */
  const [shellReady, setShellReady] = useState(false);
  const shellMountRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const p = window.__scrollProgress ?? 0;
      if (p >= 0.9 && !shellMountRef.current) {
        shellMountRef.current = true;
        setShellReady(true);
      }
      // Fade in from 0.9 → 1.0 to dovetail with Scene's 0.9 → 1.0 fade-out.
      const fade = p < 0.9 ? 0 : Math.min(1, (p - 0.9) / 0.1);
      el.style.opacity = String(fade);
      const interactive = p >= 0.95;
      if (interactive !== interactiveRef.current) {
        interactiveRef.current = interactive;
        el.style.pointerEvents = interactive ? "auto" : "none";
      }
      el.style.visibility = fade <= 0.001 ? "hidden" : "visible";
    };

    update();
    let raf = 0;
    const loop = () => {
      update();
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const onExit = () => {
    if (typeof window === "undefined") return;
    window.__resetCameraView?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      data-fullscreen-os
      style={{
        position: "fixed",
        inset: 0,
        opacity: 0,
        pointerEvents: "none",
        visibility: "hidden",
        zIndex: 50,
        transition: "opacity 120ms linear",
      }}
    >
      {shellReady ? <RetroDesktopShell showCRTOverlay={false} /> : null}
      <button
        type="button"
        onClick={onExit}
        style={{
          position: "fixed",
          top: 14,
          right: 14,
          zIndex: 12000,
          padding: "6px 12px",
          fontSize: 12,
          fontFamily: "ms_sans_serif, system-ui, sans-serif",
          color: "#111",
          background: "#c0c0c0",
          border: "2px solid",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          boxShadow: "2px 2px 0 rgba(0,0,0,0.45)",
          cursor: "pointer",
        }}
      >
        {t("boot.exit")}
      </button>
    </div>
  );
}
