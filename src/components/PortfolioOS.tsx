"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { OSProvider } from "./RetroOS/state";
import FullscreenOS from "./FullscreenOS";
import ResetViewButton from "./ResetViewButton";
import BootEntryButton from "./BootEntryButton";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const LoaderWrap = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 35%, #10111a 0%, #050507 70%);
  color: #d7dce6;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: opacity 320ms ease, visibility 320ms ease;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
`;

const LoaderPanel = styled.div`
  width: min(420px, calc(100vw - 32px));
  border: 2px solid;
  border-color: #ffffff #777 #777 #ffffff;
  background: #c0c0c0;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.45);
  padding: 14px 14px 12px;
  font-family: "ms_sans_serif", "MS Sans Serif", system-ui, sans-serif;
`;

const LoaderTitle = styled.div`
  background: linear-gradient(90deg, #000080 0%, #0053cc 100%);
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.5px;
  padding: 4px 8px;
  margin: -14px -14px 10px;
`;

const ProgressTrack = styled.div`
  height: 18px;
  border: 2px inset #b8b8b8;
  background: #ececec;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: repeating-linear-gradient(
    90deg,
    #000080 0px,
    #000080 12px,
    #2f5dd1 12px,
    #2f5dd1 24px
  );
  transition: width 140ms ease-out;
`;

const LoaderWarning = styled.div`
  margin-top: 8px;
  padding: 8px 10px;
  border: 1px solid #9a7d00;
  background: #fff8cf;
  color: #3a2f00;
  font-size: 11px;
  line-height: 1.35;
`;

export default function PortfolioOS() {
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showStuckWarning, setShowStuckWarning] = useState(false);

  useEffect(() => {
    if (!sceneReady) return;
    const t = window.setTimeout(() => setShowLoader(false), 280);
    return () => window.clearTimeout(t);
  }, [sceneReady]);

  useEffect(() => {
    if (sceneReady || progress < 99) {
      setShowStuckWarning(false);
      return;
    }
    const t = window.setTimeout(() => {
      setShowStuckWarning(true);
    }, 4500);
    return () => window.clearTimeout(t);
  }, [progress, sceneReady]);

  return (
    <LocaleProvider>
      <OSProvider>
        <div className="canvas-fixed">
          <Scene
            onProgressChange={setProgress}
            onReadyChange={setSceneReady}
          />
        </div>
        <FullscreenOS />
        <ResetViewButton />
        <BootEntryButton />
        <LoaderWrap $visible={showLoader}>
          <LoaderPanel>
            <LoaderTitle>Booting Owen95...</LoaderTitle>
            <div style={{ fontSize: 12, marginBottom: 8 }}>
              Loading 3D assets. Please wait...
            </div>
            <ProgressTrack>
              <ProgressFill $progress={Math.max(0, Math.min(100, progress))} />
            </ProgressTrack>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
              }}
            >
              <span>Initializing scene</span>
              <strong>{Math.round(progress)}%</strong>
            </div>
            {showStuckWarning && (
              <LoaderWarning>
                Stuck at 100%? If you are using Brave/Chromium with hardware
                acceleration disabled, enable it and refresh. You can also open
                this site in another browser.
              </LoaderWarning>
            )}
          </LoaderPanel>
        </LoaderWrap>
      </OSProvider>
    </LocaleProvider>
  );
}
