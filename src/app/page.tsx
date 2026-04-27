"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DebugHUD from "@/components/DebugHUD";

const PortfolioOS = dynamic(() => import("@/components/PortfolioOS"), {
  ssr: false,
});

export default function Home() {
  const [hideHint, setHideHint] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const ratio = window.scrollY / Math.max(1, window.innerHeight);
      setHideHint(ratio > 0.05);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        Scroll to boot
        <span className="arrow" />
      </div>

      <DebugHUD />
    </main>
  );
}
