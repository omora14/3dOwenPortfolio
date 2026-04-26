"use client";

import React from "react";
import type { ScreenInfo } from "./Computer";

type Props = {
  info: ScreenInfo;
  cameraStart?: [number, number, number];
};

export default function ScreenOverlay(_props: Props) {
  // Per UX request, nothing should render on the model screen pre-handoff.
  return null;
}
