"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { MenuList, MenuListItem, Separator } from "react95";
import { useOS, type WindowId } from "./state";
import { useTranslations } from "@/i18n/LocaleProvider";

const MenuWrap = styled.div`
  position: fixed;
  bottom: 32px;
  left: 4px;
  z-index: 10500;
  background: ${({ theme }) => theme.material};
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderDarkest}
    ${({ theme }) => theme.borderDarkest}
    ${({ theme }) => theme.borderLightest};
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
`;

const Banner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 22px;
  background: linear-gradient(180deg, #00007a 0%, #4a4ad6 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  font-size: 11px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 1px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: "ms_sans_serif", system-ui, sans-serif;
`;

const StyledMenu = styled(MenuList)`
  padding-left: 28px;
  min-width: 180px;
`;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function StartMenu({ open, onClose }: Props) {
  const { openWindow, cycleWallpaper, triggerBSOD } = useOS();
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-start-menu]")) return;
      if (target?.closest("[data-start-button]")) return;
      onClose();
    };
    window.addEventListener("mousedown", onDoc);
    return () => window.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  if (!open || !mounted || typeof document === "undefined") return null;

  const launch = (id: WindowId) => {
    openWindow(id);
    onClose();
  };

  const node = (
    <MenuWrap
      data-start-menu
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <StyledMenu>
        <Banner>Owen95</Banner>
        <MenuListItem onClick={() => launch("about")}>
          <span style={{ marginRight: 8 }}>📄</span>
          {t("os.start.about")}
        </MenuListItem>
        <MenuListItem onClick={() => launch("experience")}>
          <span style={{ marginRight: 8 }}>💼</span>
          {t("os.start.experience")}
        </MenuListItem>
        <MenuListItem onClick={() => launch("projects")}>
          <span style={{ marginRight: 8 }}>📁</span>
          {t("os.start.projects")}
        </MenuListItem>
        <MenuListItem onClick={() => launch("resume")}>
          <span style={{ marginRight: 8 }}>📑</span>
          {t("os.start.resume")}
        </MenuListItem>
        <MenuListItem onClick={() => launch("terminal")}>
          <span style={{ marginRight: 8 }}>{">_"}</span>
          {t("os.start.terminal")}
        </MenuListItem>
        <MenuListItem onClick={() => launch("contact")}>
          <span style={{ marginRight: 8 }}>📧</span>
          {t("os.start.contact")}
        </MenuListItem>
        <MenuListItem onClick={() => launch("contactForm")}>
          <span style={{ marginRight: 8 }}>✉️</span>
          {t("os.start.contactForm")}
        </MenuListItem>
        <Separator />
        <MenuListItem
          onClick={() => {
            cycleWallpaper();
            onClose();
          }}
        >
          <span style={{ marginRight: 8 }}>🖼️</span>
          {t("os.start.wallpaper")}
        </MenuListItem>
        <Separator />
        <MenuListItem
          onClick={() => {
            triggerBSOD();
            onClose();
          }}
        >
          <span style={{ marginRight: 8 }}>⏻</span>
          {t("os.start.shutdown")}
        </MenuListItem>
      </StyledMenu>
    </MenuWrap>
  );

  return createPortal(node, document.body);
}
