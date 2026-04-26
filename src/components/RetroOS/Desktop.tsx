"use client";

import React from "react";
import styled from "styled-components";
import { OSProvider, useOS } from "./state";
import { useTranslations } from "@/i18n/LocaleProvider";
import Taskbar from "./Taskbar";
import DesktopIcon from "./DesktopIcon";
import BootSequence from "./BootSequence";
import Screensaver from "./Screensaver";
import Popups from "./Popups";
import AboutWindow from "./windows/AboutWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ResumeWindow from "./windows/ResumeWindow";
import TerminalWindow from "./windows/TerminalWindow";
import ContactWindow from "./windows/ContactWindow";
import ContactFormWindow from "./windows/ContactFormWindow";
import MyComputerWindow from "./windows/MyComputerWindow";
import RecycleWindow from "./windows/RecycleWindow";

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "ms_sans_serif", "MS Sans Serif", system-ui, sans-serif;
  color: #000;
  isolation: isolate;
`;

const Wallpaper = styled.div<{ $variant: "retro" | "teal" | "beach" }>`
  position: absolute;
  inset: 0;
  background-color: #008080;
  background-image: ${({ $variant }) => {
    if ($variant === "retro") return "url('/old_wallpaper.webp')";
    if ($variant === "beach") return "url('/costarica-beach.webp')";
    return "none";
  }};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
`;

const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 9990;
  mix-blend-mode: multiply;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.0) 0px,
      rgba(0, 0, 0, 0.0) 2px,
      rgba(0, 0, 0, 0.06) 2px,
      rgba(0, 0, 0, 0.06) 3px
    );
  animation: flicker 4.5s steps(50, end) infinite;
`;

const Glare = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 9991;
  background: radial-gradient(
    ellipse at 30% 20%,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0) 50%
  );
`;

const IconGrid = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: grid;
  grid-template-columns: 78px;
  gap: 6px;
  z-index: 1;
  @media (max-width: 520px) {
    top: 8px;
    left: 8px;
    grid-template-columns: 72px;
    gap: 4px;
  }
`;

const HeroBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
  font-family: "ms_sans_serif", system-ui, sans-serif;
  font-size: 10px;
  letter-spacing: 1.5px;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  text-align: right;
  line-height: 1.3;
  user-select: none;
  background: rgba(0, 0, 80, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 4px 8px;
  max-width: min(200px, calc(100vw - 100px));
  strong {
    font-size: 13px;
    letter-spacing: 2px;
  }
  @media (max-width: 520px) {
    top: 8px;
    right: 8px;
    font-size: 9px;
    padding: 3px 6px;
    max-width: min(150px, 44vw);
    strong {
      font-size: 11px;
    }
  }
`;

type ShellProps = {
  showCRTOverlay?: boolean;
};

export function RetroDesktopShell({ showCRTOverlay = true }: ShellProps) {
  const { openWindow, wallpaper, booted } = useOS();
  const t = useTranslations();

  return (
    <Frame>
      <Wallpaper $variant={wallpaper} />

      <HeroBadge>
        <strong>OWEN95</strong>
        <br />
        {t("os.heroSubtitle")}
      </HeroBadge>

      <IconGrid>
        <DesktopIcon
          label={t("os.icons.myComputer")}
          icon={<span>🖥️</span>}
          onOpen={() => openWindow("my-computer")}
        />
        <DesktopIcon
          label={t("os.icons.about")}
          icon={<span>📄</span>}
          onOpen={() => openWindow("about")}
        />
        <DesktopIcon
          label={t("os.icons.experience")}
          icon={<span>💼</span>}
          onOpen={() => openWindow("experience")}
        />
        <DesktopIcon
          label={t("os.icons.projects")}
          icon={<span>📁</span>}
          onOpen={() => openWindow("projects")}
        />
        <DesktopIcon
          label={t("os.icons.resume")}
          icon={<span>📑</span>}
          onOpen={() => openWindow("resume")}
        />
        <DesktopIcon
          label={t("os.icons.terminal")}
          icon={<span>{">_"}</span>}
          onOpen={() => openWindow("terminal")}
        />
        <DesktopIcon
          label={t("os.icons.connect")}
          icon={<span>📧</span>}
          onOpen={() => openWindow("contact")}
        />
        <DesktopIcon
          label={t("os.icons.contactForm")}
          icon={<span>✉️</span>}
          onOpen={() => openWindow("contactForm")}
        />
        <DesktopIcon
          label={t("os.icons.recycle")}
          icon={<span>🗑️</span>}
          onOpen={() => openWindow("recycle")}
        />
      </IconGrid>

      <AboutWindow />
      <ExperienceWindow />
      <ProjectsWindow />
      <ResumeWindow />
      <TerminalWindow />
      <ContactWindow />
      <ContactFormWindow />
      <MyComputerWindow />
      <RecycleWindow />

      <Taskbar />
      <Popups />
      <Screensaver />
      {!booted && <BootSequence />}

      {showCRTOverlay && (
        <>
          <Scanlines />
          <Glare />
        </>
      )}
    </Frame>
  );
}

export default function RetroDesktop() {
  return (
    <OSProvider>
      <RetroDesktopShell />
    </OSProvider>
  );
}
