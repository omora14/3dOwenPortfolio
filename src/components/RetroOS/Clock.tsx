"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  height: 22px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest};
  background: ${({ theme }) => theme.material};
  font-size: 11px;
  user-select: none;
`;

const SpeakerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
    <path d="M2 4h2l3-2v8L4 8H2z" fill="#000" />
    <path d="M8 3.5c0.8 0.8 0.8 4.2 0 5" stroke="#000" fill="none" strokeWidth="1" />
    <path d="M9.5 2.5c1.5 1.5 1.5 6.5 0 7" stroke="#000" fill="none" strokeWidth="1" />
  </svg>
);

function formatTime(d: Date) {
  let hours = d.getHours();
  const mins = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${mins} ${ampm}`;
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Wrap>
      <SpeakerIcon />
      <span>{now ? formatTime(now) : "--:-- --"}</span>
    </Wrap>
  );
}
