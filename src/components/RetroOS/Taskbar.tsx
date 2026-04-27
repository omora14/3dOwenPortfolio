"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "react95";
import { useOS, type WindowId } from "./state";
import { useLocale, useTranslations } from "@/i18n/LocaleProvider";
import type { MessageKey } from "@/i18n/messages/en";
import Clock from "./Clock";
import StartMenu from "./StartMenu";

const PILL_KEY: Record<WindowId, MessageKey> = {
  about: "os.titles.about",
  experience: "os.titles.experience",
  projects: "os.titles.projects",
  resume: "os.titles.resume",
  terminal: "os.titles.terminal",
  contact: "os.titles.contact",
  contactForm: "os.titles.contactForm",
  "my-computer": "os.titles.myComputer",
  recycle: "os.titles.recycle",
};

const Bar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  background: ${({ theme }) => theme.material};
  border-top: 2px solid ${({ theme }) => theme.borderLightest};
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.borderLight};
  z-index: 8000;
  user-select: none;
`;

const StartBtn = styled(Button)`
  height: 24px !important;
  padding: 0 6px 0 4px !important;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const FlagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
    <rect x="1" y="1" width="5" height="5" fill="#ff0000" />
    <rect x="7" y="1" width="5" height="5" fill="#00aa00" />
    <rect x="1" y="7" width="5" height="5" fill="#0000ff" />
    <rect x="7" y="7" width="5" height="5" fill="#ffaa00" />
  </svg>
);

const Pills = styled.div`
  flex: 1;
  display: flex;
  gap: 3px;
  padding: 0 4px;
  overflow: hidden;
`;

const Pill = styled(Button)<{ $active: boolean }>`
  height: 24px !important;
  font-size: 11px !important;
  flex: 0 1 min(160px, 32vw);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  ${({ $active, theme }) =>
    $active
      ? `box-shadow: inset 1px 1px 0 ${theme.borderDark}, inset -1px -1px 0 ${theme.borderLightest}; background: ${theme.materialDark} !important;`
      : ""}
  @media (max-width: 480px) {
    flex: 0 1 min(100px, 24vw);
    font-size: 10px !important;
  }
`;

const Tray = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 2px;
`;

const LangPill = styled(Button)`
  height: 22px !important;
  font-size: 11px !important;
  padding: 0 6px !important;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const ExitPill = styled(Button)`
  height: 22px !important;
  font-size: 11px !important;
  padding: 0 7px !important;
  font-weight: bold;
`;

export default function Taskbar() {
  const { windows, focusWindow, toggleMinimize, topZ } = useOS();
  const { locale, toggleLocale } = useLocale();
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);

  const list = (Object.keys(windows) as WindowId[]).filter((k) => windows[k].open);
  const onExit = () => {
    if (typeof window === "undefined") return;
    window.__resetCameraView?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Bar onClick={() => setMenuOpen(false)}>
      <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
        <StartBtn
          data-start-button
          onClick={() => setMenuOpen((m) => !m)}
          active={menuOpen}
          aria-haspopup
          aria-expanded={menuOpen}
        >
          <FlagIcon />
          {t("os.start.button")}
        </StartBtn>
        <StartMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      <Pills>
        {list.map((id) => {
          const w = windows[id];
          const isActive = !w.minimized && w.z === topZ;
          const label = t(PILL_KEY[id]);
          return (
            <Pill
              key={id}
              $active={isActive}
              onClick={() => {
                if (w.minimized) {
                  toggleMinimize(id);
                  focusWindow(id);
                } else if (w.z === topZ) {
                  toggleMinimize(id);
                } else {
                  focusWindow(id);
                }
              }}
              title={label}
            >
              {label.length > 22 ? label.slice(0, 22) + "…" : label}
            </Pill>
          );
        })}
      </Pills>

      <Tray>
        <ExitPill
          onClick={(e) => {
            e.stopPropagation();
            onExit();
          }}
          aria-label={t("boot.exit")}
          title={t("boot.exit")}
        >
          {t("boot.exit")}
        </ExitPill>
        <LangPill
          onClick={(e) => {
            e.stopPropagation();
            toggleLocale();
          }}
          aria-label="Toggle language"
          title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
        >
          {locale === "en" ? t("os.langSwitch.toEs") : t("os.langSwitch.toEn")}
        </LangPill>
        <Clock />
      </Tray>
    </Bar>
  );
}

