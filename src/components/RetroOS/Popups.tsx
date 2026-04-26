"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import { useOS } from "./state";
import { useWindowSize } from "@/hooks/useWindowSize";

const PopupShell = styled(Window)`
  position: absolute;
  width: min(320px, calc(100vw - 16px));
  max-width: calc(100vw - 16px);
  box-sizing: border-box;
  z-index: 8500;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
  animation: popIn 220ms ease-out;
  @keyframes popIn {
    from { transform: translateY(-6px) scale(0.96); opacity: 0; }
    to   { transform: translateY(0) scale(1); opacity: 1; }
  }
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px;
  font-size: 11px;
`;

const Body = styled(WindowContent)`
  display: flex;
  gap: 10px;
  padding: 12px;
  font-size: 12px;
  line-height: 1.4;
  align-items: flex-start;
`;

const Icon = styled.div<{ $variant: PopVariant }>`
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest}
    ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.material};
  font-size: 22px;
  color: ${({ $variant }) =>
    $variant === "info" ? "#0000c0" : $variant === "warn" ? "#cc8800" : "#cc0000"};
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  padding: 6px 8px 8px;
`;

type PopVariant = "info" | "warn" | "error";
type Pop = {
  id: number;
  title: string;
  body: string;
  variant: PopVariant;
  x: number;
  y: number;
};

const POOL: Omit<Pop, "id" | "x" | "y">[] = [
  { title: "System Notice", body: "It is now safe to hire this developer.", variant: "info" },
  { title: "Reminder", body: "You can press Ctrl+Alt+Del — but you really shouldn't.", variant: "warn" },
  { title: "Norton Antivirus", body: "Threat detected: Imposter syndrome. Quarantining... [OK]", variant: "warn" },
  { title: "Active Desktop", body: "Your Costa Rica subscription is up to date.", variant: "info" },
  { title: "AOL Instant Messenger", body: "Welcome! You've got mail. (1 unread from a recruiter)", variant: "info" },
  { title: "Outlook Express", body: "New idea draft saved as 'untitled-12.txt'.", variant: "info" },
  { title: "Disk Defragmenter", body: "Optimizing your career path... 87% complete.", variant: "info" },
  { title: "Solitaire", body: "Drag-and-drop fortune favors the consistent.", variant: "info" },
];

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const BSODWrap = styled.div`
  position: absolute;
  inset: 0;
  background: #0000aa;
  color: #fff;
  font-family: "Courier New", monospace;
  z-index: 10000;
  padding: 60px 80px;
  font-size: 14px;
  line-height: 1.55;
  white-space: pre-wrap;
  cursor: pointer;
  user-select: none;
  text-shadow: 0 0 4px #1f1fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 520px) {
    padding: 20px 16px;
    font-size: 12px;
  }
`;

const BSODHeader = styled.div`
  background: #cdcdcd;
  color: #0000aa;
  padding: 1px 8px;
  margin-bottom: 18px;
  width: fit-content;
  font-weight: bold;
`;

const POPUP_APPROX_H = 200;

function ClampedPopup({
  pop,
  onDismiss,
}: {
  pop: Pop;
  onDismiss: (id: number) => void;
}) {
  const { width: vw, height: vh } = useWindowSize();
  const p = pop;
  const pw = Math.min(320, Math.max(200, vw - 16));
  const left = Math.min(p.x, Math.max(8, vw - pw - 8));
  const top = Math.min(p.y, Math.max(8, vh - POPUP_APPROX_H - 8));
  return (
    <PopupShell style={{ left, top, width: pw }}>
      <Header active>
        <span>{p.title}</span>
        <Button
          onClick={() => onDismiss(p.id)}
          style={{ width: 18, height: 16, padding: 0, minWidth: 0 }}
        >
          ×
        </Button>
      </Header>
      <Body>
        <Icon $variant={p.variant}>
          {p.variant === "warn" ? "!" : p.variant === "error" ? "✕" : "i"}
        </Icon>
        <div>{p.body}</div>
      </Body>
      <Actions>
        <Button onClick={() => onDismiss(p.id)}>OK</Button>
      </Actions>
    </PopupShell>
  );
}

export default function Popups() {
  const { booted, bsodActive, dismissBSOD, triggerBSOD, screensaverActive } = useOS();
  const [pops, setPops] = useState<Pop[]>([]);
  const idRef = useRef(1);
  const inputBufRef = useRef<string[]>([]);

  useEffect(() => {
    if (!booted || bsodActive || screensaverActive) return;
    let cancel = false;
    const schedule = () => {
      const delay = 28000 + Math.random() * 30000;
      window.setTimeout(() => {
        if (cancel) return;
        spawn();
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      cancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, bsodActive, screensaverActive]);

  // Konami code → BSOD
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const buf = inputBufRef.current;
      buf.push(e.key);
      if (buf.length > KONAMI.length) buf.shift();
      if (buf.length === KONAMI.length && buf.every((k, i) => k === KONAMI[i])) {
        inputBufRef.current = [];
        triggerBSOD();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [triggerBSOD]);

  const spawn = () => {
    const tpl = POOL[Math.floor(Math.random() * POOL.length)];
    const id = idRef.current++;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pw = Math.min(320, vw - 16);
    const maxX = Math.max(8, vw - pw - 8);
    const maxY = Math.max(8, vh - 220);
    const x = 8 + Math.random() * Math.max(1, maxX - 8);
    const y = 8 + Math.random() * Math.max(1, maxY - 8);
    setPops((prev) => [
      ...prev,
      {
        ...tpl,
        id,
        x,
        y,
      },
    ]);
  };

  const dismiss = (id: number) => setPops((prev) => prev.filter((p) => p.id !== id));

  if (bsodActive) {
    return (
      <BSODWrap onClick={dismissBSOD}>
        <BSODHeader>Windows</BSODHeader>
        {`A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
0x00010E36. The current application will be terminated.

* Press any key to terminate the current application.
* Press CTRL+ALT+DEL again to restart your computer. You will
  lose any unsaved information in all applications.

         Press any key to continue _`}
      </BSODWrap>
    );
  }

  return (
    <>
      {pops.map((p) => (
        <ClampedPopup key={p.id} pop={p} onDismiss={dismiss} />
      ))}
    </>
  );
}
