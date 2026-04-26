"use client";

import React, { useEffect, useRef, useState } from "react";
import { RetroDesktopShell } from "./RetroOS/Desktop";

export default function FullscreenOS() {
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
    </div>
  );
}
