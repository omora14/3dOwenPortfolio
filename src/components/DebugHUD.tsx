"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __camZ?: number;
    __scrollProgress?: number;
  }
}

export default function DebugHUD() {
  const [enabled, setEnabled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [camZ, setCamZ] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.has("debug"));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let rafId = 0;
    const tick = () => {
      setScrollY(window.scrollY);
      setProgress(window.__scrollProgress ?? 0);
      setCamZ(window.__camZ ?? 0);
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 9999,
        background: "rgba(8, 10, 16, 0.85)",
        border: "1px solid #2a2f3a",
        color: "#cdd2da",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: 11,
        lineHeight: 1.5,
        padding: "10px 12px",
        borderRadius: 6,
        minWidth: 180,
        pointerEvents: "none",
        textShadow: "0 1px 0 rgba(0,0,0,0.7)",
      }}
      data-testid="debug-hud"
    >
      <div style={{ color: "#9ad", marginBottom: 4 }}>DEBUG HUD</div>
      <div>
        scrollY:{" "}
        <span data-testid="hud-scroll" style={{ color: "#fff" }}>
          {scrollY.toFixed(0)}
        </span>
      </div>
      <div>
        progress:{" "}
        <span data-testid="hud-progress" style={{ color: "#fff" }}>
          {progress.toFixed(3)}
        </span>
      </div>
      <div>
        cam.z:{" "}
        <span data-testid="hud-camz" style={{ color: "#9f9" }}>
          {camZ.toFixed(3)}
        </span>
      </div>
    </div>
  );
}
