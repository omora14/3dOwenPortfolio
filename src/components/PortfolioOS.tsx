"use client";

import React from "react";
import dynamic from "next/dynamic";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { OSProvider } from "./RetroOS/state";
import FullscreenOS from "./FullscreenOS";
import ResetViewButton from "./ResetViewButton";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function PortfolioOS() {
  return (
    <LocaleProvider>
      <OSProvider>
        <div className="canvas-fixed">
          <Scene />
        </div>
        <FullscreenOS />
        <ResetViewButton />
      </OSProvider>
    </LocaleProvider>
  );
}
