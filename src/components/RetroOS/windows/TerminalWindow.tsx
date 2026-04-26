"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import OSWindow from "../Window";
import { profile, links, projects, experience } from "@/data/portfolio";

const Screen = styled.div`
  flex: 1 1 auto;
  background: #000;
  color: #33ff66;
  font-family: "Courier New", "Courier", monospace;
  font-size: 12px;
  line-height: 1.45;
  padding: 8px;
  overflow-y: auto;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest};
  height: 100%;
  text-shadow: 0 0 3px rgba(51, 255, 102, 0.55);
  white-space: pre-wrap;
`;

const Prompt = styled.span`
  color: #ffe05b;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 13px;
  background: #33ff66;
  vertical-align: middle;
  margin-left: 2px;
  animation: blinkCursor 1s steps(2, start) infinite;
`;

const InputRow = styled.form`
  display: flex;
  gap: 6px;
  align-items: baseline;
  input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: 0;
    color: #33ff66;
    font-family: inherit;
    font-size: 12px;
    text-shadow: inherit;
    caret-color: #33ff66;
  }
`;

type Line = { kind: "out" | "cmd"; text: string };

const HELP = [
  "Available commands:",
  "  whoami     — who am I",
  "  about      — short bio",
  "  experience — show roles",
  "  projects   — list projects",
  "  socials    — print links",
  "  resume     — open resume",
  "  hire       — run ./hire-me.sh",
  "  clear      — clear screen",
  "  help       — show this menu",
];

const INTRO_SEQUENCE: { delay: number; text: string }[] = [
  { delay: 250, text: "C:\\OWEN95> whoami" },
  { delay: 220, text: "owen.morales — Software Engineer · Data Scientist · ML Engineer" },
  { delay: 280, text: "C:\\OWEN95> cat /home/owen/about.txt" },
  {
    delay: 280,
    text:
      "Costa Rica → BYU-Idaho. 3.98 GPA. Verizon → BYU → FamilySearch → Impulsa. Ships fast, learns faster.",
  },
  { delay: 280, text: "C:\\OWEN95> ls ~/projects/" },
  { delay: 220, text: "phronesis  secureFileSync  centurion  roomiesChore  emotisphere  kbConnector  stardewLike  cryptoRealityCheck" },
  { delay: 280, text: "C:\\OWEN95> ./hire-me.sh" },
  { delay: 280, text: ">> Compiling reasons...      [OK]" },
  { delay: 220, text: ">> Loading impact metrics... [OK]" },
  { delay: 220, text: ">> Type `help` for commands. Try `socials` or `hire`." },
];

export default function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancel = false;
    let acc = 0;
    INTRO_SEQUENCE.forEach((step) => {
      acc += step.delay;
      window.setTimeout(() => {
        if (cancel) return;
        setLines((prev) => [
          ...prev,
          { kind: step.text.startsWith("C:\\") ? "cmd" : "out", text: step.text },
        ]);
      }, acc);
    });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [lines]);

  const append = useCallback((text: string) => {
    setLines((prev) => [...prev, { kind: "out", text }]);
  }, []);

  const handleCommand = useCallback(
    (cmd: string) => {
      const c = cmd.trim().toLowerCase();
      if (!c) return;

      setLines((prev) => [...prev, { kind: "cmd", text: `C:\\OWEN95> ${cmd}` }]);

      switch (c) {
        case "help":
          HELP.forEach(append);
          break;
        case "whoami":
          append(`${profile.name} — ${profile.roles.join(" · ")}`);
          break;
        case "about":
          append(profile.tagline);
          break;
        case "experience":
          experience.forEach((e) => append(`  ${e.period.padEnd(22)} ${e.title} @ ${e.company}`));
          break;
        case "projects":
          projects.forEach((p) =>
            append(`  ${p.title.padEnd(20)} ${p.subtitle}${p.github ? "  " + p.github : "  [private]"}`),
          );
          break;
        case "socials":
          append(`  github   ${links.github}`);
          append(`  linkedin ${links.linkedin}`);
          append(`  website  ${links.website}`);
          break;
        case "resume":
          append("Opening resume in new tab...");
          window.open(links.resume, "_blank", "noopener,noreferrer");
          break;
        case "hire":
          append("Initiating ./hire-me.sh ...");
          append("  ✓ Detected curiosity");
          append("  ✓ Verified shipping velocity");
          append("  ✓ Status: AVAILABLE");
          append("Reach out: " + links.linkedin);
          break;
        case "clear":
        case "cls":
          setLines([]);
          break;
        case "exit":
          append("Cannot exit. We are inside a 3D monitor.");
          break;
        default:
          append(`'${cmd}' is not recognized. Type 'help' for commands.`);
      }
    },
    [append],
  );

  return (
    <OSWindow id="terminal" bodyStyle={{ background: "#c0c0c0", padding: 6 }}>
      <Screen
        ref={screenRef}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div key={i}>
              <Prompt>{l.text.split(">")[0]}{">"}</Prompt>
              {l.text.split(">").slice(1).join(">")}
            </div>
          ) : (
            <div key={i}>{l.text}</div>
          ),
        )}
        <InputRow
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
            setInput("");
          }}
        >
          <Prompt>C:\OWEN95{">"}</Prompt>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
          <Cursor />
        </InputRow>
      </Screen>
    </OSWindow>
  );
}
