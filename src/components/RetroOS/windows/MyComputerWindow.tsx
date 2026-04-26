"use client";

import React from "react";
import styled from "styled-components";
import { GroupBox } from "react95";
import OSWindow from "../Window";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 12px;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
  font-size: 11px;
  border-bottom: 1px dotted ${({ theme }) => theme.borderDark};
  &:last-child {
    border-bottom: 0;
  }
  .k {
    color: ${({ theme }) => theme.materialText};
  }
  .v {
    font-family: "Courier New", monospace;
  }
`;

export default function MyComputerWindow() {
  return (
    <OSWindow id="my-computer">
      <Grid>
        <GroupBox label="System">
          <Row><span className="k">OS</span><span className="v">Owen95 OSR2</span></Row>
          <Row><span className="k">Build</span><span className="v">3d.portfolio.95</span></Row>
          <Row><span className="k">Engine</span><span className="v">Three.js + GSAP</span></Row>
          <Row><span className="k">Shell</span><span className="v">react95</span></Row>
          <Row><span className="k">Uptime</span><span className="v">since you scrolled</span></Row>
        </GroupBox>
        <GroupBox label="Hardware">
          <Row><span className="k">CPU</span><span className="v">Pentium MMX 233</span></Row>
          <Row><span className="k">RAM</span><span className="v">32 MB EDO</span></Row>
          <Row><span className="k">GPU</span><span className="v">Voodoo 2 (sim.)</span></Row>
          <Row><span className="k">Display</span><span className="v">1024×768 CRT</span></Row>
          <Row><span className="k">Modem</span><span className="v">56k US Robotics</span></Row>
        </GroupBox>
        <GroupBox label="Drives">
          <Row><span className="k">A:\</span><span className="v">Floppy (empty)</span></Row>
          <Row><span className="k">C:\</span><span className="v">Owen95 — 73% used</span></Row>
          <Row><span className="k">D:\</span><span className="v">CD-ROM — Costa Rica.iso</span></Row>
        </GroupBox>
        <GroupBox label="Network">
          <Row><span className="k">Hostname</span><span className="v">owen95.local</span></Row>
          <Row><span className="k">Ping</span><span className="v">42 ms</span></Row>
          <Row><span className="k">Status</span><span className="v">CONNECTED</span></Row>
        </GroupBox>
      </Grid>
    </OSWindow>
  );
}
