"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useOS } from "./state";

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
  z-index: 9500;
  cursor: pointer;
  overflow: hidden;
`;

const Logo = styled.div`
  position: absolute;
  font-family: "ms_sans_serif", system-ui, sans-serif;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 4px;
  padding: 8px 12px;
  border: 2px solid currentColor;
  user-select: none;
  text-shadow: 0 0 6px currentColor;
  will-change: transform, color;
`;

const COLORS = ["#ff5577", "#55ddff", "#ffd24a", "#aaff66", "#cc88ff", "#ff8855"];

export default function Screensaver() {
  const { screensaverActive, setScreensaverActive, booted } = useOS();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Idle detection
  useEffect(() => {
    if (!booted) return;
    let idleTimer: number | null = null;
    const reset = () => {
      if (screensaverActive) return;
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setScreensaverActive(true), 14000);
    };
    reset();
    const events: Array<keyof DocumentEventMap> = ["pointermove", "keydown", "click"];
    events.forEach((e) => document.addEventListener(e, reset));
    return () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      events.forEach((e) => document.removeEventListener(e, reset));
    };
  }, [booted, screensaverActive, setScreensaverActive]);

  // Bounce animation
  useEffect(() => {
    if (!screensaverActive) return;
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    let dx = 2.4;
    let dy = 1.7;
    let x = 80;
    let y = 80;
    let colorIdx = 0;
    logo.style.color = COLORS[colorIdx];

    let raf = 0;
    const tick = () => {
      const oR = overlay.getBoundingClientRect();
      const lR = logo.getBoundingClientRect();
      x += dx;
      y += dy;
      let bounced = false;
      if (x <= 0) {
        x = 0;
        dx = -dx;
        bounced = true;
      } else if (x + lR.width >= oR.width) {
        x = oR.width - lR.width;
        dx = -dx;
        bounced = true;
      }
      if (y <= 0) {
        y = 0;
        dy = -dy;
        bounced = true;
      } else if (y + lR.height >= oR.height) {
        y = oR.height - lR.height;
        dy = -dy;
        bounced = true;
      }
      if (bounced) {
        colorIdx = (colorIdx + 1) % COLORS.length;
        logo.style.color = COLORS[colorIdx];
      }
      logo.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4 });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [screensaverActive]);

  if (!screensaverActive) return null;

  return (
    <Overlay
      ref={overlayRef}
      onClick={() => setScreensaverActive(false)}
      onPointerDown={() => setScreensaverActive(false)}
    >
      <Logo ref={logoRef}>OWEN95</Logo>
    </Overlay>
  );
}
