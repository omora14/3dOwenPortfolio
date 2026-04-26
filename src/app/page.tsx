"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DebugHUD from "@/components/DebugHUD";

const PortfolioOS = dynamic(() => import("@/components/PortfolioOS"), {
  ssr: false,
});

export default function Home() {
  const [hideHint, setHideHint] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const ratio = window.scrollY / Math.max(1, window.innerHeight);
      setHideHint(ratio > 0.05);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () => setIsTouchDevice(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <main>
      <PortfolioOS />

      <div
        id="scroll-spacer"
        style={{ height: "300vh" }}
        aria-hidden
      />

      <div
        className="scroll-hint"
        style={{ opacity: hideHint ? 0 : 0.9, pointerEvents: "none" }}
      >
        {isTouchDevice ? "1 finger: rotate · 2 fingers: scroll" : "Scroll to boot"}
        <span className="arrow" />
      </div>

      <DebugHUD />
    </main>
  );
}
