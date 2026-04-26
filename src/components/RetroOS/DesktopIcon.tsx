"use client";

import React from "react";
import styled from "styled-components";

const Wrap = styled.button`
  appearance: none;
  background: transparent;
  border: 1px dashed transparent;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  font-family: "ms_sans_serif", system-ui, sans-serif;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78px;
  padding: 4px 2px;
  cursor: pointer;
  user-select: none;
  outline: none;
  &:focus,
  &:hover {
    border-color: #fff;
    background: rgba(0, 0, 130, 0.35);
  }
  .label {
    margin-top: 4px;
    text-align: center;
    line-height: 1.2;
    word-break: break-word;
  }
  .icon {
    width: 36px;
    height: 36px;
    image-rendering: pixelated;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    line-height: 1;
  }
`;

type Props = {
  label: string;
  icon: React.ReactNode;
  onOpen: () => void;
};

export default function DesktopIcon({ label, icon, onOpen }: Props) {
  const lastClickRef = React.useRef(0);
  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current < 360) {
      onOpen();
      lastClickRef.current = 0;
    } else {
      lastClickRef.current = now;
    }
  };
  return (
    <Wrap
      onClick={handleClick}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      <div className="icon">{icon}</div>
      <span className="label">{label}</span>
    </Wrap>
  );
}
