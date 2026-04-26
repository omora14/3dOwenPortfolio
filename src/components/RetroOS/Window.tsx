"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import {
  Window as R95Window,
  WindowHeader,
  WindowContent,
  Button,
} from "react95";
import { useOS, type WindowId } from "./state";
import { usePointerDrag } from "./usePointerDrag";
import { useTranslations } from "@/i18n/LocaleProvider";
import type { MessageKey } from "@/i18n/messages/en";
import { useWindowSize } from "@/hooks/useWindowSize";

const TASKBAR_H = 30;
const MARGIN = 8;

const TITLE_KEY: Record<WindowId, MessageKey> = {
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

const StyledWindow = styled(R95Window)`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.material};
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: grab;
  user-select: none;
  &:active {
    cursor: grabbing;
  }
  span.title {
    font-weight: bold;
    font-size: 11px;
    letter-spacing: 0.4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 6px;
  }
  .controls {
    display: flex;
    gap: 2px;
    button {
      width: 18px;
      height: 16px;
      padding: 0 !important;
      font-size: 11px;
      line-height: 1;
      min-width: 0 !important;
    }
  }
`;

const Body = styled(WindowContent)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.material};
  opacity: 1;
`;

type Props = {
  id: WindowId;
  children: React.ReactNode;
  bodyStyle?: React.CSSProperties;
};

export default function OSWindow({ id, children, bodyStyle }: Props) {
  const { windows, closeWindow, toggleMinimize, focusWindow, moveWindow } =
    useOS();
  const t = useTranslations();
  const w = windows[id];
  const title = t(TITLE_KEY[id]);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const { width: vw, height: vh } = useWindowSize();

  const maxW = Math.max(200, vw - MARGIN * 2);
  const maxH = Math.max(160, vh - TASKBAR_H - MARGIN * 2);
  const winW = Math.min(w.width, maxW);
  const winH = Math.min(w.height, maxH);
  const left = Math.min(Math.max(MARGIN, w.x), Math.max(MARGIN, vw - winW - MARGIN));
  const top = Math.min(
    Math.max(MARGIN, w.y),
    Math.max(MARGIN, vh - winH - TASKBAR_H - MARGIN),
  );

  usePointerDrag(handleRef, {
    getCurrent: () => ({ x: w.x, y: w.y }),
    onMove: (next) => moveWindow(id, Math.max(0, next.x), Math.max(0, next.y)),
    onStart: () => focusWindow(id),
  });

  if (!w.open) return null;
  if (w.minimized) return null;

  const mergedBodyStyle: React.CSSProperties = {
    opacity: 1,
    ...bodyStyle,
  };

  return (
    <StyledWindow
      style={{
        left,
        top,
        width: winW,
        height: winH,
        maxWidth: "100%",
        boxSizing: "border-box",
        zIndex: w.z,
      }}
      onMouseDown={() => focusWindow(id)}
    >
      <Header ref={handleRef as React.RefObject<HTMLDivElement>} active>
        <span className="title">{title}</span>
        <div className="controls">
          <Button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggleMinimize(id)}
            aria-label="Minimize"
          >
            _
          </Button>
          <Button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(id)}
            aria-label="Close"
          >
            ×
          </Button>
        </div>
      </Header>
      <Body style={mergedBodyStyle}>{children}</Body>
    </StyledWindow>
  );
}
