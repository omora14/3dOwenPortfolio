"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useOS } from "./state";

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
  color: #cdd2da;
  font-family: "Courier New", "Courier", monospace;
  font-size: 13px;
  line-height: 1.5;
  padding: 26px 30px;
  z-index: 9999;
  white-space: pre-wrap;
  cursor: pointer;
  user-select: none;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.18);
  overflow: hidden;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #cdd2da;
  vertical-align: -2px;
  animation: blinkCursor 1s steps(2, start) infinite;
`;

const Logo = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: "ms_sans_serif", system-ui, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 4px;
  text-shadow: 2px 2px 0 #4a4ad6;
  .sub {
    font-size: 11px;
    letter-spacing: 2px;
    color: #aab;
    text-shadow: none;
  }
`;

const SCRIPT: string[] = [
  "DEV3D BIOS v1.0  © 1995 Owen Industries",
  "CPU: Pentium MMX 233MHz ........... [OK]",
  "Memory Test: 32768K ............... [OK]",
  "Detecting IDE drives:",
  "  Primary Master  : OWEN95 73%",
  "  Primary Slave   : Costa Rica.iso",
  "Scanning for portfolio.dll ........ [OK]",
  "Loading kernel ................... [OK]",
  "Mounting /experience .............. [OK]",
  "Mounting /projects ................ [OK]",
  "Mounting /resume.pdf .............. [OK]",
  "Initializing Owen95 Shell .........",
  "",
  "Welcome.",
];

export default function BootSequence() {
  const { booted, setBooted, bsodActive } = useOS();
  const [printed, setPrinted] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (booted || ranRef.current) return;
    ranRef.current = true;
    let acc = 0;
    const timeouts: number[] = [];
    SCRIPT.forEach((line, i) => {
      acc += 160 + line.length * 6;
      timeouts.push(
        window.setTimeout(() => {
          setPrinted((prev) => [...prev, line]);
        }, acc),
      );
    });
    timeouts.push(
      window.setTimeout(() => {
        setDone(true);
      }, acc + 500),
    );
    timeouts.push(
      window.setTimeout(() => {
        setBooted(true);
      }, acc + 1400),
    );
    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [booted, setBooted]);

  if (booted || bsodActive) return null;

  return (
    <Overlay onClick={() => setBooted(true)}>
      {printed.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      {!done && <Cursor />}
      {done && (
        <Logo>
          <div>OWEN95</div>
          <div className="sub">A 3D PORTFOLIO BY OWEN MORALES</div>
        </Logo>
      )}
    </Overlay>
  );
}
